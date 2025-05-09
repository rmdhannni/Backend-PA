const db = require('../config/db');
const Lokasi = require('../models/lokasiModels');
const lokasiModel = new Lokasi(db);
console.log('🧠 lokasiController loaded!');

const getAllLokasi = async (req, res) => {
    try {
        const result = await lokasiModel.getAll();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getLokasiById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await lokasiModel.getById(id);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createLokasi = async (req, res) => {
    try {
        const data = req.body;
        const result = await lokasiModel.create(data);
        res.json({ message: 'Lokasi berhasil ditambahkan', id: result.insertId });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteLokasi = async (req, res) => {
    try {
        const id = req.params.id;
        await lokasiModel.delete(id);
        res.json({ message: 'Lokasi berhasil dihapus' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllLokasi,
    getLokasiById,
    createLokasi,
    deleteLokasi
};
