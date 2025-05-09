// controllers/distribusiController.js
const Distribusi = require('../models/distribusiModels');

// Get all distributions
const getDistribusi = async (req, res) => {
  try {
    const data = await Distribusi.getAll();
    res.json(data);
  } catch (err) {
    console.error('Error fetching distribusi:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get distributions for a specific user
const getUserDistribusi = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await Distribusi.getByUser(userId);
    res.json(data);
  } catch (err) {
    console.error('Error fetching user distribusi:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create new distribution task
const buatDistribusi = async (req, res) => {
  try {
    const result = await Distribusi.create(req.body);
    res.status(201).json({ 
      message: 'Distribusi berhasil dibuat', 
      id: result.insertId 
    });
  } catch (err) {
    console.error('Error creating distribusi:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update status for a distribution
const updateDistribusiStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, tanggal_distribusi } = req.body;
    
    await Distribusi.updateStatus(id, status, tanggal_distribusi);
    
    const updatedDistribusi = await Distribusi.getById(id);
    
    res.json({ 
      message: `Status distribusi berhasil diubah menjadi ${status}`,
      distribusi: updatedDistribusi
    });
  } catch (err) {
    console.error('Error updating distribution status:', err);
    res.status(500).json({ error: err.message });
  }
};

// Validate distribution (approve or reject)
const validasiDistribusi = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['disetujui', 'ditolak'].includes(status)) {
      return res.status(400).json({ error: 'Status harus berupa disetujui atau ditolak' });
    }
    
    const result = await Distribusi.validate(id, status);
    res.json(result);
  } catch (err) {
    console.error('Error validating distribution:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get single distribution by ID
const getDistribusiById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Distribusi.getById(id);
    
    if (!data) {
      return res.status(404).json({ error: 'Distribusi tidak ditemukan' });
    }
    
    res.json(data);
  } catch (err) {
    console.error('Error fetching single distribusi:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
  getDistribusi, 
  getUserDistribusi, 
  buatDistribusi, 
  updateDistribusiStatus, 
  validasiDistribusi,
  getDistribusiById
};