const db = require('../config/db');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
console.log("ISI User:", User);

const userModel = new User(db);

exports.register = (req, res) => {
    console.log('REQ BODY REGISTER:', req.body);
    userModel.register(req.body, (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'User berhasil diregistrasi', id: result.insertId });
    });
};

exports.login = (req, res) => {
    userModel.login(req.body, (err, user) => {
      if (err) return res.status(401).send(err.message);
  
      // map angka ke string
      const mappedRole = user.Role === '1' ? 'admin' : 'user';
  
      const token = jwt.sign({
        id: user.ID_User,
        username: user.Username,
        role: mappedRole        // <— gunakan mappedRole
      }, 'secret_key', { expiresIn: '1d' });
  
      res.json({ message: 'Login berhasil', token });
    });
  };
  
exports.getAllUsers = (req, res) => {
    userModel.getAll((err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.getByRole = (req, res) => {
    const role = req.query.role;
    if (!role) return res.status(400).send('Parameter role dibutuhkan');
  
    const query = 'SELECT ID_User, Email, Username FROM User WHERE Role = ?';
    db.query(query, [ role === 'admin' ? '1' : '2' ], (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    });
  };
  