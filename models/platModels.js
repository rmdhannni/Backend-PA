const db = require('../config/db'); // [cite: 206]

class Plat {
    constructor(db) {
        this.db = db; // [cite: 206]
    }

    async getAll() {
        try {
            const [rows] = await this.db.query('SELECT * FROM plat'); // [cite: 207]
            return rows; // [cite: 208]
        } catch (err) {
            throw new Error(`Gagal mengambil data plat: ${err.message}`); // [cite: 209]
        }
    }

    async getById(id) {
        try {
            const [rows] = await this.db.query('SELECT * FROM plat WHERE ID_Plat = ?', [id]); // [cite: 209]
            return rows[0]; // [cite: 210]
        } catch (err) {
            throw new Error(`Gagal mengambil plat dengan ID ${id}: ${err.message}`); // [cite: 211]
        }
    }

    async create(data) {
        try {
            const [result] = await this.db.query('INSERT INTO plat SET ?', data); // [cite: 211]
            return result; // [cite: 212]
        } catch (err) {
            throw new Error(`Gagal menambahkan plat: ${err.message}`); // [cite: 213]
        }
    }

    async update(id, data) {
        try {
            const [result] = await this.db.query('UPDATE plat SET ? WHERE ID_Plat = ?', [data, id]); // [cite: 213]
            return result; // [cite: 214]
        } catch (err) {
            throw new Error(`Gagal memperbarui plat dengan ID ${id}: ${err.message}`); // [cite: 215]
        }
    }

    async delete(id) {
        try {
            const [result] = await this.db.query('DELETE FROM plat WHERE ID_Plat = ?', [id]); // [cite: 215]
            return result; // [cite: 216]
        } catch (err) {
            throw new Error(`Gagal menghapus plat dengan ID ${id}: ${err.message}`); // [cite: 217]
        }
    }

    // **NEW** Function to add stock to a plat and record transaction
    async addStock(ID_Plat, Jumlah, UserID) {
        try {
            // Update stock in 'plat' table
            const [updateResult] = await this.db.query(
                'UPDATE plat SET stok = stok + ? WHERE ID_Plat = ?',
                [Jumlah, ID_Plat]
            );

            if (updateResult.affectedRows === 0) {
                throw new Error('Plat tidak ditemukan atau stok tidak berubah.');
            }

            // Get current stock after update for transaksi_stok
            const [platData] = await this.db.query(
                'SELECT stok FROM plat WHERE ID_Plat = ?',
                [ID_Plat]
            );
            const sisaStok = platData[0]?.stok;

            // Record transaction in 'transaksi_stok'
            const [transactionResult] = await this.db.query(
                `INSERT INTO transaksi_stok (ID_Plat, UserID, Jumlah_masuk, Sisa_stok, Tanggal_update, Status)
                 VALUES (?, ?, ?, ?, NOW(), 'masuk')`,
                [ID_Plat, UserID, Jumlah, sisaStok]
            );

            return { updateResult, transactionResult };
        } catch (err) {
            throw new Error(`Gagal menambahkan stok plat dengan ID ${ID_Plat}: ${err.message}`);
        }
    }
}

module.exports = Plat; // [cite: 217]