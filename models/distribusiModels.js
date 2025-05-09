const db = require('../config/db');

const Distribusi = {
  // Get all distributions with joined data from plat, lokasi, and users tables
  getAll: async () => {
    const [rows] = await db.query(
      `SELECT d.*, p.Nama_plat, l.Nama_Lokasi, u.Username 
       FROM distribusi d
       JOIN plat p ON d.ID_Plat = p.ID_Plat
       JOIN lokasi l ON d.ID_Lokasi_tujuan = l.ID_Lokasi
       LEFT JOIN user u ON d.UserID = u.ID_User
       ORDER BY d.Tanggal_permintaan DESC`
    );
    return rows;
  },

  // Get distributions for a specific user
  getByUser: async (userId) => {
    const [rows] = await db.query(
      `SELECT d.*, p.Nama_plat, l.Nama_Lokasi 
       FROM distribusi d
       JOIN plat p ON d.ID_Plat = p.ID_Plat
       JOIN lokasi l ON d.ID_Lokasi_tujuan = l.ID_Lokasi
       WHERE d.UserID = ?
       ORDER BY d.Tanggal_permintaan DESC`,
      [userId]
    );
    return rows;
  },

  // Create a new distribution task
  create: async ({ ID_Plat, ID_Lokasi_tujuan, Jumlah, UserID, Status = 'pending' }) => {
    try {
      const [result] = await db.query(
        `INSERT INTO distribusi (ID_Plat, UserID, ID_Lokasi_tujuan, Jumlah, Tanggal_permintaan, Status)
         VALUES (?, ?, ?, ?, NOW(), ?)`,
        [ID_Plat, UserID, ID_Lokasi_tujuan, Jumlah, Status]
      );
      return result;
    } catch (err) {
      throw new Error(`Gagal membuat distribusi: ${err.message}`);
    }
  },
  

  // Update status for a distribution
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

  // Validate a distribution (approve or reject)
  validate: async (ID_Distribusi, status) => {
    const [getDistribusi] = await db.query(
      `SELECT d.*, p.Nama_plat 
       FROM distribusi d
       JOIN plat p ON d.ID_Plat = p.ID_Plat
       WHERE d.ID_Distribusi = ?`, 
      [ID_Distribusi]
    );
    
    if (!getDistribusi.length) throw new Error('Distribusi tidak ditemukan');

    const distribusi = getDistribusi[0];

    if (status === 'disetujui') {
      // Check and update stock
      const [latest] = await db.query(
        `SELECT Sisa_stok FROM transaksi_stok WHERE ID_Plat = ? ORDER BY Tanggal_update DESC LIMIT 1`,
        [distribusi.ID_Plat]
      );
      
      const sisaStok = latest.length ? latest[0].Sisa_stok : 0;
      const sisaBaru = sisaStok - distribusi.Jumlah;

      if (sisaBaru < 0) throw new Error(`Stok tidak mencukupi untuk ${distribusi.Nama_plat}. Sisa stok: ${sisaStok}`);

      // Record stock transaction
      await db.query(
        `INSERT INTO transaksi_stok (ID_Plat, UserID, Jumlah_masuk, Jumlah_keluar, Sisa_stok, Tanggal_update, Status)
         VALUES (?, ?, 0, ?, ?, NOW(), 'keluar')`,
        [distribusi.ID_Plat, distribusi.UserID, distribusi.Jumlah, sisaBaru]
      );
    }

    // Update distribution status
    await db.query(
      `UPDATE distribusi SET Status = ? WHERE ID_Distribusi = ?`, 
      [status, ID_Distribusi]
    );
    
    return { 
      message: `Distribusi berhasil ${status === 'disetujui' ? 'disetujui' : 'ditolak'}`,
      distribusiId: ID_Distribusi,
      status: status
    };
  },

  // Get a single distribution by ID
  getById: async (ID_Distribusi) => {
    const [rows] = await db.query(
      `SELECT d.*, p.Nama_plat, l.Nama_Lokasi, u.Username 
       FROM distribusi d
       JOIN plat p ON d.ID_Plat = p.ID_Plat
       JOIN lokasi l ON d.ID_Lokasi_tujuan = l.ID_Lokasi
       LEFT JOIN user u ON d.UserID = u.ID_User
       WHERE d.ID_Distribusi = ?`,
      [ID_Distribusi]
    );
    return rows[0];
  }
};

module.exports = Distribusi;
