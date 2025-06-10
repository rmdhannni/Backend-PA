const db = require('../config/db'); // [cite: 183]
const Plat = require('../models/platModels'); // [cite: 183]
const platModel = new Plat(db); // [cite: 183]
console.log('🧠 platController loaded!'); // [cite: 184]

const getAllPlat = async (req, res) => {
    try {
        const result = await platModel.getAll(); // [cite: 184]
        res.json(result); // [cite: 185]
    } catch (err) {
        res.status(500).send(err.message); // [cite: 185]
    }
};
const getPlatById = async (req, res) => {
    try {
        const id = req.params.id; // [cite: 186]
        const result = await platModel.getById(id); // [cite: 187]
        res.json(result); // [cite: 187]
    } catch (err) {
        res.status(500).send(err.message); // [cite: 187]
    }
};
const createPlat = async (req, res) => {
    try {
        console.log('🔥 [CREATE PLAT] Request Diterima'); // [cite: 188]
        console.log('Body:', req.body); // [cite: 189]

        const data = req.body; // [cite: 189]
        const result = await platModel.create(data); // [cite: 189]
        res.json({ message: 'Plat berhasil ditambahkan', id: result.insertId }); // [cite: 190]
    } catch (err) {
        res.status(500).send(err.message); // [cite: 190]
    }
};
const updatePlat = async (req, res) => {
    try {
        const id = req.params.id; // [cite: 191]
        const data = req.body; // [cite: 192]
        await platModel.update(id, data); // [cite: 192]
        res.json({ message: 'Plat berhasil diperbarui' }); // [cite: 192]
    } catch (err) {
        res.status(500).send(err.message); // [cite: 193]
    }
};
const deletePlat = async (req, res) => {
    try {
        const id = req.params.id; // [cite: 194]
        await platModel.delete(id); // [cite: 195]
        res.json({ message: 'Plat berhasil dihapus' }); // [cite: 195]
    } catch (err) {
        res.status(500).send(err.message); // [cite: 196]
    }
};

const getPlatByLotBatch = async (req, res) => {
    try {
        const lot = req.params.lot; // [cite: 196]
        const [result] = await db.query(
            `SELECT
                p.ID_Plat,
                p.Nama_plat,
                p.Lot_Batch_Number,
                p.Kuantitas,
                p.stok,  /* **ADD THIS** to get current stock */
                l.Nama_Lokasi,
                l.latitude,
                l.longitude
             FROM plat p
             JOIN lokasi l ON p.ID_Lokasi = l.ID_Lokasi
             WHERE p.Lot_Batch_Number = ?`, // [cite: 197, 198]
            [lot]
        ); // [cite: 199]
        if (!result.length) {
            return res.status(404).json({
                success: false,
                message: 'Material tidak ditemukan'
            }); // [cite: 200]
        }

        const platData = result[0]; // [cite: 200]
        // Pastikan tipe data numerik
        const responseData = {
            ...platData,
            latitude: parseFloat(platData.latitude),
            longitude: parseFloat(platData.longitude),
            Kuantitas: parseInt(platData.Kuantitas),
            stok: parseInt(platData.stok) // **ADD THIS** to parse stock
        }; // [cite: 201]
        res.status(200).json({
            success: true,
            data: responseData
        }); // [cite: 202]
    } catch (err) {
        console.error('Error:', err); // [cite: 203]
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        }); // [cite: 204]
    }
};

// **NEW** Add stock to a plat
const addStock = async (req, res) => {
    try {
        const { ID_Plat, Jumlah, UserID } = req.body;
        if (!ID_Plat || !Jumlah || !UserID) {
            return res.status(400).json({ message: 'ID Plat, Jumlah, dan UserID wajib diisi.' });
        }

        const result = await platModel.addStock(ID_Plat, Jumlah, UserID);
        res.status(200).json({ message: 'Stok berhasil ditambahkan', result });
    } catch (err) {
        console.error('Error adding stock:', err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllPlat, // [cite: 205]
    getPlatById, // [cite: 205]
    createPlat, // [cite: 205]
    updatePlat, // [cite: 205]
    deletePlat, // [cite: 205]
    getPlatByLotBatch, // [cite: 205]
    addStock // **ADD THIS LINE**
};