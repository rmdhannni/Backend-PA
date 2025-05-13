class Lokasi {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        try {
            const [rows] = await this.db.query('SELECT * FROM lokasi');
            return rows;
        } catch (err) {
            throw new Error(`Gagal mengambil data lokasi: ${err.message}`);
        }
    }

    async getById(id) {
        try {
            const [rows] = await this.db.query('SELECT * FROM lokasi WHERE ID_Lokasi = ?', [id]);
            return rows[0];
        } catch (err) {
            throw new Error(`Gagal mengambil lokasi dengan ID ${id}: ${err.message}`);
        }
    }

    async create(data) {
        try {
            const [result] = await this.db.query('INSERT INTO lokasi SET ?', data);
            return result;
        } catch (err) {
            throw new Error(`Gagal menambahkan lokasi: ${err.message}`);
        }
    }

    async update(id, data) {
        try {
            const [result] = await this.db.query('UPDATE lokasi SET ? WHERE ID_Lokasi = ?', [data, id]);
            return result;
        } catch (err) {
            throw new Error(`Gagal memperbarui lokasi dengan ID ${id}: ${err.message}`);
        }
    }

    async delete(id) {
        try {
            const [result] = await this.db.query('DELETE FROM lokasi WHERE ID_Lokasi = ?', [id]);
            return result;
        } catch (err) {
            throw new Error(`Gagal menghapus lokasi dengan ID ${id}: ${err.message}`);
        }
    }
}

module.exports = Lokasi;