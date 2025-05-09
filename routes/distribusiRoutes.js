const express = require('express');
const router = express.Router();
const { 
  getDistribusi, 
  getUserDistribusi, 
  buatDistribusi, 
  updateDistribusiStatus, 
  validasiDistribusi,
  getDistribusiById
} = require('../controllers/distribusiController');

// Get all distributions
router.get('/', getDistribusi);

// Get specific distribution by ID
router.get('/:id', getDistribusiById);

// Get distributions for a specific user
router.get('/user/:userId', getUserDistribusi);

// Create new distribution
router.post('/', buatDistribusi);

// Update status (user marking distribution as completed)
router.put('/status/:id', updateDistribusiStatus);

// Validate distribution (admin approving or rejecting)
router.put('/validate/:id', validasiDistribusi);

module.exports = router;