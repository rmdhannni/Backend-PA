const express = require('express');
const router = express.Router();
const stokController = require('../controllers/stokController');

router.get('/', stokController.getAllStok);
router.get('/:id', stokController.getStokByPlat);
router.post('/masuk', stokController.tambahStok);
router.post('/keluar', stokController.kurangiStok);
router.get('/laporan/masuk', stokController.getLaporanMasuk);
router.get('/laporan/keluar', stokController.getLaporanKeluar);
router.get('/laporan/rekap', stokController.getLaporanRekap);

module.exports = router;
