const express = require('express');
const router = express.Router();
const platController = require('../controllers/platController');
console.log('📦 platRoutes loaded!');
console.log('platController:', platController);


router.get('/lot/:lot', platController.getPlatByLotBatch);
router.get('/', platController.getAllPlat);
router.get('/:id', platController.getPlatById);
router.post('/', platController.createPlat);
router.put('/:id', platController.updatePlat);
router.delete('/:id', platController.deletePlat);

module.exports = router;
