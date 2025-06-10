// backend yang sudah saya buat.txt (distribusiController.js)
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
    const { ID_Plat, ID_Lokasi_tujuan, Jumlah, UserID, Jenis_distribusi } = req.body; // Ambil Jenis_distribusi dari body

    // Validasi tambahan untuk Jenis_distribusi
    if (!Jenis_distribusi || !['masuk', 'keluar'].includes(Jenis_distribusi)) {
      return res.status(400).json({ error: 'Jenis distribusi harus berupa "masuk" atau "keluar".' });
    }

    const result = await Distribusi.create({ // Kirim Jenis_distribusi ke model
      ID_Plat,
      ID_Lokasi_tujuan,
      Jumlah,
      UserID,
      Jenis_distribusi,
      Status: 'pending' // Status awal selalu pending saat dibuat
    });

    res.status(201).json({
      message: 'Distribusi berhasil dibuat',
      id: result.insertId,
      qr_code: result.qr_code // Mengembalikan qr_code ke frontend
    });
  } catch (err) {
    console.error('Error creating distribusi:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update status for a distribution (used by user app to mark as 'terdistribusi')
const updateDistribusiStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, tanggal_distribusi } = req.body;

    // Pastikan status yang diizinkan untuk update oleh user
    if (!['diproses', 'terdistribusi'].includes(status)) {
        return res.status(400).json({ error: 'Status tidak valid untuk pembaruan pengguna.' });
    }

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

// Validate distribution (admin approving or rejecting)
const validasiDistribusi = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['disetujui', 'ditolak'].includes(status)) {
      return res.status(400).json({ error: 'Status harus berupa disetujui atau ditolak' });
    }

    // Panggil model validate yang sekarang akan menangani stok berdasarkan Jenis_distribusi
    const result = await Distribusi.validate(id, status);
    res.json(result);
  } catch (err) {
    console.error('Error validating distribution:', err);
    // Tangani error khusus untuk stok tidak cukup
    if (err.message.includes('Stok plat') && err.message.includes('tidak mencukupi')) {
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
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

// Controller function for QR code validation (for mobile app)
const validateDistribusiByQrCode = async (req, res) => {
  try {
    const { qr_code } = req.body;
    if (!qr_code) {
      return res.status(400).json({ error: 'QR Code tidak boleh kosong' });
    }

    // Panggil model yang sudah diubah
    const result = await Distribusi.validateByQrCode(qr_code);
    res.json(result);
  } catch (err) {
    console.error('Error validating distribution by QR code:', err);
    res.status(400).json({ error: err.message }); // Mengembalikan error dari model
  }
};

module.exports = {
  getDistribusi,
  getUserDistribusi,
  buatDistribusi,
  updateDistribusiStatus,
  validasiDistribusi,
  getDistribusiById,
  validateDistribusiByQrCode
};