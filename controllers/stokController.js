const db = require('../config/db');
const Stok = require('../models/stokModels');
console.log('DEBUG typeof Stok:', typeof Stok); // Harusnya 'function'
console.log('DEBUG Stok:', Stok);
const stokModel = new Stok(db);

exports.tambahStok = (req, res) => {
    const data = req.body;
    stokModel.tambahStok(data, (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Stok berhasil ditambahkan', id: result.insertId });
    });
};

exports.kurangiStok = (req, res) => {
    const data = req.body;
    stokModel.kurangiStok(data, (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Stok berhasil dikurangi', id: result.insertId });
    });
};

exports.getAllStok = (req, res) => {
    stokModel.getAll((err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.getStokByPlat = (req, res) => {
    const { id } = req.params;
    stokModel.getByPlatId(id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.getLaporanMasuk = (req, res) => {
    stokModel.getLaporanMasuk((err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.getLaporanKeluar = (req, res) => {
    stokModel.getLaporanKeluar((err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.getLaporanRekap = (req, res) => {
    stokModel.getLaporanRekap((err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};
