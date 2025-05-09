const db = require('../config/db');
const Plat = require('../models/platModels');
const platModel = new Plat(db);
console.log('🧠 platController loaded!');

const getAllPlat = async (req, res) => {
    try {
        const result = await platModel.getAll();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getPlatById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await platModel.getById(id);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createPlat = async (req, res) => {
    try {
        console.log('🔥 [CREATE PLAT] Request Diterima');
        console.log('Body:', req.body);

        const data = req.body;
        const result = await platModel.create(data);
        res.json({ message: 'Plat berhasil ditambahkan', id: result.insertId });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updatePlat = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await platModel.update(id, data);
        res.json({ message: 'Plat berhasil diperbarui' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deletePlat = async (req, res) => {
    try {
        const id = req.params.id;
        await platModel.delete(id);
        res.json({ message: 'Plat berhasil dihapus' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllPlat,
    getPlatById,
    createPlat,
    updatePlat,
    deletePlat
};
