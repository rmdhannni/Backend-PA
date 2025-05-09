class Stok {
    constructor(db) {
        this.db = db;
    }

    tambahStok(data, callback) {
        const { ID_Plat, ID_User, Jumlah_masuk } = data;
        const getLastStok = 'SELECT Sisa_stok FROM Stok WHERE ID_Plat = ? ORDER BY ID_Transaksi DESC LIMIT 1';

        this.db.query(getLastStok, [ID_Plat], (err, result) => {
            if (err) return callback(err);
            const sisaTerakhir = result.length > 0 ? result[0].Sisa_stok : 0;
            const sisaBaru = sisaTerakhir + Jumlah_masuk;

            const query = `
                INSERT INTO Stok (ID_Plat, ID_User, Jumlah_masuk, Jumlah_Keluar, Sisa_stok, Tanggal_update, Status)
                VALUES (?, ?, ?, 0, ?, CURDATE(), 'Masuk')
            `;
            this.db.query(query, [ID_Plat, ID_User, Jumlah_masuk, sisaBaru], callback);
        });
    }

    kurangiStok(data, callback) {
        const { ID_Plat, ID_User, Jumlah_Keluar } = data;
        const getLastStok = 'SELECT Sisa_stok FROM Stok WHERE ID_Plat = ? ORDER BY ID_Transaksi DESC LIMIT 1';

        this.db.query(getLastStok, [ID_Plat], (err, result) => {
            if (err) return callback(err);
            if (result.length === 0) return callback(new Error('Stok tidak ditemukan'));

            const sisaTerakhir = result[0].Sisa_stok;
            const sisaBaru = sisaTerakhir - Jumlah_Keluar;

            if (sisaBaru < 0) return callback(new Error('Stok tidak mencukupi untuk pengeluaran'));

            const query = `
                INSERT INTO Stok (ID_Plat, ID_User, Jumlah_masuk, Jumlah_Keluar, Sisa_stok, Tanggal_update, Status)
                VALUES (?, ?, 0, ?, ?, CURDATE(), 'Keluar')
            `;
            this.db.query(query, [ID_Plat, ID_User, Jumlah_Keluar, sisaBaru], callback);
        });
    }

    getAll(callback) {
        this.db.query('SELECT * FROM Stok', callback);
    }

    getByPlatId(ID_Plat, callback) {
        this.db.query('SELECT * FROM Stok WHERE ID_Plat = ? ORDER BY ID_Transaksi DESC', [ID_Plat], callback);
    }

    getLaporanMasuk(callback) {
        const query = `
            SELECT s.Tanggal_update, p.Nama_plat, p.Lot_Batch_Number, s.Jumlah_masuk, l.Nama_Lokasi, u.Email
            FROM Stok s
            JOIN Plat p ON s.ID_Plat = p.ID_Plat
            JOIN Lokasi l ON p.ID_Lokasi = l.ID_Lokasi
            JOIN User u ON s.ID_User = u.ID_User
            WHERE s.Status = 'Masuk'
            ORDER BY s.Tanggal_update DESC
        `;
        this.db.query(query, callback);
    }
    
    getLaporanKeluar(callback) {
        const query = `
            SELECT s.Tanggal_update, p.Nama_plat, p.Lot_Batch_Number, s.Jumlah_Keluar, l.Nama_Lokasi, u.Email
            FROM Stok s
            JOIN Plat p ON s.ID_Plat = p.ID_Plat
            JOIN Lokasi l ON p.ID_Lokasi = l.ID_Lokasi
            JOIN User u ON s.ID_User = u.ID_User
            WHERE s.Status = 'Keluar'
            ORDER BY s.Tanggal_update DESC
        `;
        this.db.query(query, callback);
    }
    
    getLaporanRekap(callback) {
        const query = `
            SELECT p.Nama_plat, p.Lot_Batch_Number, l.Nama_Lokasi,
                (SELECT Sisa_stok FROM Stok s2 WHERE s2.ID_Plat = p.ID_Plat ORDER BY s2.ID_Transaksi DESC LIMIT 1) AS Sisa_stok
            FROM Plat p
            JOIN Lokasi l ON p.ID_Lokasi = l.ID_Lokasi
        `;
        this.db.query(query, callback);
    }
}

module.exports = Stok;