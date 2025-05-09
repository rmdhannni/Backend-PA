class Plat {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        try {
            const [rows] = await this.db.query('SELECT * FROM plat');
            return rows;
        } catch (err) {
            throw new Error(`Gagal mengambil data plat: ${err.message}`);
        }
    }

    async getById(id) {
        try {
            const [rows] = await this.db.query('SELECT * FROM plat WHERE ID_Plat = ?', [id]);
            return rows[0];
        } catch (err) {
            throw new Error(`Gagal mengambil plat dengan ID ${id}: ${err.message}`);
        }
    }

    async create(data) {
        try {
            const [result] = await this.db.query('INSERT INTO plat SET ?', data);
            return result;
        } catch (err) {
            throw new Error(`Gagal menambahkan plat: ${err.message}`);
        }
    }

    async update(id, data) {
        try {
            const [result] = await this.db.query('UPDATE plat SET ? WHERE ID_Plat = ?', [data, id]);
            return result;
        } catch (err) {
            throw new Error(`Gagal memperbarui plat dengan ID ${id}: ${err.message}`);
        }
    }

    async delete(id) {
        try {
            const [result] = await this.db.query('DELETE FROM plat WHERE ID_Plat = ?', [id]);
            return result;
        } catch (err) {
            throw new Error(`Gagal menghapus plat dengan ID ${id}: ${err.message}`);
        }
    }
}

module.exports = Plat;
