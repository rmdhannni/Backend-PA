const bcrypt = require('bcrypt');

class User {
    constructor(db) {
        this.db = db;
    }

    async register(data, callback) {
        try {
            const { email, username, password } = data;
            if (!email || !username || !password) {
                return callback(new Error("Email, Username, dan Password wajib diisi"));
            }

            const hash = bcrypt.hashSync(password, 10);
            const ROLE = {
                ADMIN: '1',
                USER: '2'
            };
            const defaultRole = ROLE.USER;

            const query = 'INSERT INTO User (Email, Username, Password, Role) VALUES (?, ?, ?, ?)';
            const [result] = await this.db.query(query, [email, username, hash, defaultRole]);
            callback(null, result);
        } catch (err) {
            callback(err);
        }
    }

    async login(data, callback) {
        try {
            const { email, password } = data;
            const query = 'SELECT * FROM User WHERE Email = ?';
            const [results] = await this.db.query(query, [email]);

            if (results.length === 0) {
                return callback(new Error('User tidak ditemukan'));
            }

            const user = results[0];
            const valid = bcrypt.compareSync(password, user.Password);
            if (!valid) return callback(new Error('Password salah'));

            callback(null, user);
        } catch (err) {
            callback(err);
        }
    }

    async getAll(callback) {
        try {
            const [rows] = await this.db.query('SELECT ID_User, Email, Username, Role FROM User');
            callback(null, rows);
        } catch (err) {
            callback(err);
        }
    }
}

module.exports = User;