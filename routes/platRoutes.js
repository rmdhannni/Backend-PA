const express = require('express');
const router = express.Router();
const platController = require('../controllers/platController'); // [cite: 182]
console.log('📦 platRoutes loaded!'); // [cite: 182]
console.log('platController:', platController); // [cite: 182]


router.get('/lot/:lot', platController.getPlatByLotBatch); // [cite: 182]
router.get('/', platController.getAllPlat); // [cite: 182]
router.get('/:id', platController.getPlatById); // [cite: 182]
router.post('/', platController.createPlat); // [cite: 182]
router.put('/:id', platController.updatePlat); // [cite: 183]
router.delete('/:id', platController.deletePlat); // [cite: 183]

// **NEW** Route to add stock
router.post('/add-stock', platController.addStock);

module.exports = router; // [cite: 183]