// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'warehouse_ptpal'
// });

// connection.connect(err => {
//     if (err) throw err;
//     console.log('Database terkoneksi');
// });

// module.exports = connection;

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'warehousePtpal'
});

// Hapus .connect() karena .promise() sudah mengelola koneksi otomatis
const db = connection.promise(); // Ini yang penting

module.exports = db;