const db = require('../config/db'); 

const Distribusi = {
  getAll: async () => {
    const [rows] = await db.query(
      `SELECT 
         d.*, 
         p.Nama_plat, 
         l_tujuan.Nama_Lokasi,
         u.Username AS Username_Distribusi, 
         p.stok AS PlatStok, 
         p.Lot_Batch_Number, 
         p.Status AS PlatStatus,
         lp.Nama_Lokasi AS Nama_Lokasi_Plat_Default
       FROM distribusi d
       JOIN plat p ON d.ID_Plat = p.ID_Plat
       LEFT JOIN lokasi l_tujuan ON d.ID_Lokasi_tujuan = l_tujuan.ID_Lokasi
       LEFT JOIN lokasi lp ON p.ID_Lokasi = lp.ID_Lokasi
       LEFT JOIN user u ON d.UserID = u.ID_User
       ORDER BY d.ID_Distribusi DESC`
    );
    return rows; 
  },

  getByUser: async (userId) => {
    const [rows] = await db.query(
      `SELECT 
         d.*, 
         p.Nama_plat, 
         p.Lot_Batch_Number, 
         l_tujuan.Nama_Lokasi,
         lp.Nama_Lokasi AS Nama_Lokasi_Plat_Default,
         u.Username AS Username_Distribusi
       FROM distribusi d
       JOIN plat p ON d.ID_Plat = p.ID_Plat
       LEFT JOIN lokasi l_tujuan ON d.ID_Lokasi_tujuan = l_tujuan.ID_Lokasi
       LEFT JOIN lokasi lp ON p.ID_Lokasi = lp.ID_Lokasi 
       LEFT JOIN user u ON d.UserID = u.ID_User 
       WHERE d.UserID = ?
       ORDER BY d.ID_Distribusi DESC`, 
      [userId] 
    );
    return rows; 
  },

  create: async ({ ID_Plat, ID_Lokasi_tujuan, Jumlah, UserID, Status = 'pending', Jenis_distribusi }) => { 
    try {
      const [result] = await db.query(
        `INSERT INTO distribusi (ID_Plat, ID_Lokasi_tujuan, UserID, Jumlah, Tanggal_permintaan, Status, qr_code, Jenis_distribusi)
         VALUES (?, ?, ?, ?, NOW(), ?, UUID(), ?)`, 
        [ID_Plat, Jenis_distribusi === 'keluar' ? ID_Lokasi_tujuan : null, UserID, Jumlah, Status, Jenis_distribusi]
      );
      const [dist] = await db.query(
        `SELECT qr_code FROM distribusi WHERE ID_Distribusi = ?`, 
        [result.insertId]
      );
      const qrCode = dist.length > 0 ? dist[0].qr_code : null; 

      return { ...result, qr_code: qrCode }; 
    } catch (err) {
      throw new Error(`Gagal membuat distribusi: ${err.message}`); 
    }
  },

  updateStatus: async (ID_Distribusi, status, tanggal_distribusi = null) => {
    const updateFields = []; 
    const values = []; 

    updateFields.push('Status = ?'); 
    values.push(status); 

    if (tanggal_distribusi) {
      updateFields.push('Tanggal_distribusi = ?'); 
      values.push(tanggal_distribusi); 
    }

    values.push(ID_Distribusi); 

    const [result] = await db.query(
      `UPDATE distribusi SET ${updateFields.join(', ')} WHERE ID_Distribusi = ?`, 
      values
    );
    return result; 
  },
  
  validate: async (ID_Distribusi, status) => {
    const [getDistribusi] = await db.query(
      `SELECT d.*, p.Nama_plat, p.stok AS PlatStokBefore 
       FROM distribusi d
       JOIN plat p ON d.ID_Plat = p.ID_Plat
       WHERE d.ID_Distribusi = ?`,
      [ID_Distribusi] 
    );
    if (!getDistribusi.length) throw new Error('Distribusi tidak ditemukan'); 

    const distribusi = getDistribusi[0]; 

    if (status === 'disetujui') {
      let queryUpdateStok;
      let queryInsertTransaksi;
      let sisaStokSetelah;
      let paramsInsertTransaksi;

      if (distribusi.Jenis_distribusi === 'keluar') {
        queryUpdateStok = `UPDATE plat SET stok = stok - ? WHERE ID_Plat = ?`; 
        sisaStokSetelah = distribusi.PlatStokBefore - distribusi.Jumlah;
        // Menggunakan kolom ID_User dan Status sesuai skema tabel transaksi_stok
        queryInsertTransaksi = `INSERT INTO transaksi_stok (ID_Plat, ID_User, Jumlah_keluar, Sisa_stok, Tanggal_update, Status) 
                                VALUES (?, ?, ?, ?, NOW(), 'keluar')`; // [cite: 57]
        paramsInsertTransaksi = [distribusi.ID_Plat, distribusi.UserID, distribusi.Jumlah, sisaStokSetelah]; // [cite: 57]

      } else if (distribusi.Jenis_distribusi === 'masuk') {
        queryUpdateStok = `UPDATE plat SET stok = stok + ? WHERE ID_Plat = ?`;
        sisaStokSetelah = distribusi.PlatStokBefore + distribusi.Jumlah;
        // Menggunakan kolom ID_User dan Status sesuai skema tabel transaksi_stok
        queryInsertTransaksi = `INSERT INTO transaksi_stok (ID_Plat, ID_User, Jumlah_masuk, Sisa_stok, Tanggal_update, Status)
                                VALUES (?, ?, ?, ?, NOW(), 'masuk')`;
        paramsInsertTransaksi = [distribusi.ID_Plat, distribusi.UserID, distribusi.Jumlah, sisaStokSetelah];
      } else {
        console.warn(`Jenis distribusi tidak diketahui: ${distribusi.Jenis_distribusi} untuk ID_Distribusi: ${ID_Distribusi}`);
      }
      
      if (queryUpdateStok) {
         await db.query(queryUpdateStok, [distribusi.Jumlah, distribusi.ID_Plat]);  // [cite: 56]
      }
      
      if (queryInsertTransaksi && paramsInsertTransaksi) {
        await db.query(queryInsertTransaksi, paramsInsertTransaksi);
      }
    }

    await db.query(
      `UPDATE distribusi SET Status = ?, Tanggal_validasi = NOW() WHERE ID_Distribusi = ?`,
      [status, ID_Distribusi] // [cite: 58]
    );
    return {
      message: `Distribusi berhasil ${status === 'disetujui' ? 'disetujui' : 'ditolak'}`,  // [cite: 59, 60]
      distribusiId: ID_Distribusi,  // [cite: 60]
      status: status  // [cite: 60]
    };
  },

  getById: async (ID_Distribusi) => {
    const [rows] = await db.query(
      `SELECT 
         d.*, 
         p.Nama_plat, 
         l_tujuan.Nama_Lokasi, 
         lp.Nama_Lokasi AS Nama_Lokasi_Plat_Default,
         u.Username AS Username_Distribusi
       FROM distribusi d
       JOIN plat p ON d.ID_Plat = p.ID_Plat
       LEFT JOIN lokasi l_tujuan ON d.ID_Lokasi_tujuan = l_tujuan.ID_Lokasi
       LEFT JOIN lokasi lp ON p.ID_Lokasi = lp.ID_Lokasi
       LEFT JOIN user u ON d.UserID = u.ID_User
       WHERE d.ID_Distribusi = ?`,
      [ID_Distribusi] 
    );
    return rows[0]; 
  },

  validateByQrCode: async (qr_code) => {
    const [getDistribusi] = await db.query(
      `SELECT d.*, p.Nama_plat
       FROM distribusi d
       JOIN plat p ON d.ID_Plat = p.ID_Plat
       WHERE d.qr_code = ?`,
      [qr_code]
    );
    if (!getDistribusi.length) {  // [cite: 63]
      throw new Error('Distribusi tidak ditemukan untuk QR Code ini.');  // [cite: 63]
    }

    const distribusi = getDistribusi[0];  // [cite: 64]

    if (distribusi.Status === 'terdistribusi') {  // [cite: 66]
        throw new Error(`Distribusi ini sudah pernah di-scan dan berstatus '${distribusi.Status}'.`);  // [cite: 66]
    }
    if (distribusi.Status === 'disetujui' || distribusi.Status === 'ditolak') {  // [cite: 66]
      throw new Error(`Distribusi ini sudah divalidasi oleh admin dengan status '${distribusi.Status}'. Tidak bisa diubah via scan QR.`);  // [cite: 66]
    }
    if (!['pending', 'diproses'].includes(distribusi.Status)) { // [cite: 65]
        throw new Error(`Status distribusi saat ini ('${distribusi.Status}') tidak memungkinkan untuk scan penerimaan.`);
    }

    await db.query(
      `UPDATE distribusi SET Status = ?, Tanggal_distribusi = NOW() WHERE ID_Distribusi = ?`, 
      ['terdistribusi', distribusi.ID_Distribusi] // [cite: 67]
    );
    return { // [cite: 70]
      message: `Distribusi material "${distribusi.Nama_plat}" (ID: ${distribusi.ID_Distribusi}) berhasil ditandai sebagai 'terdistribusi'.`,  // [cite: 70]
      distribusiId: distribusi.ID_Distribusi,  // [cite: 70]
      qr_code: qr_code,  // [cite: 70]
      newStatus: 'terdistribusi'  // [cite: 70]
    };
  }
};

module.exports = Distribusi; // [cite: 71]