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

const getPlatByLotBatch = async (req, res) => {
    try {
        const lot = req.params.lot;
        const [result] = await db.query(
            `SELECT 
                p.ID_Plat,
                p.Nama_plat,
                p.Lot_Batch_Number,
                p.Kuantitas,
                l.Nama_Lokasi,
                l.latitude,
                l.longitude
             FROM plat p
             JOIN lokasi l ON p.ID_Lokasi = l.ID_Lokasi
             WHERE p.Lot_Batch_Number = ?`,
            [lot]
        );

        if (!result.length) {
            return res.status(404).json({ 
                success: false,
                message: 'Material tidak ditemukan' 
            });
        }

        const platData = result[0];
        
        // Pastikan tipe data numerik
        const responseData = {
            ...platData,
            latitude: parseFloat(platData.latitude),
            longitude: parseFloat(platData.longitude),
            Kuantitas: parseInt(platData.Kuantitas)
        };

        res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};``

module.exports = {
    getAllPlat,
    getPlatById,
    createPlat,
    updatePlat,
    deletePlat,
    getPlatByLotBatch
};
