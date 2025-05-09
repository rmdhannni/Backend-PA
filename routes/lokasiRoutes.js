const express = require('express');
const router = express.Router();
const lokasiController = require('../controllers/lokasiController');

// lokasiRoutes.js
console.log('lokasiController:', lokasiController);
// Harus menampilkan object dengan 4 fungsi


router.get('/', lokasiController.getAllLokasi);
router.get('/:id', lokasiController.getLokasiById);
router.post('/', lokasiController.createLokasi);
router.delete('/:id', lokasiController.deleteLokasi);

module.exports = router;
