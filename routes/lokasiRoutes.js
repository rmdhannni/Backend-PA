const express = require('express');
const router = express.Router();
const lokasiController = require('../controllers/lokasiController');

console.log('🚀 lokasiRoutes loaded!');

router.get('/', lokasiController.getAllLokasi);
router.get('/:id', lokasiController.getLokasiById);
router.post('/', lokasiController.createLokasi);
router.put('/:id', lokasiController.updateLokasi); // Added update route
router.delete('/:id', lokasiController.deleteLokasi);

module.exports = router;