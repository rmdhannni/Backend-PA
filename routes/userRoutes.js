const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
// Hanya untuk admin: melihat semua user
router.get('/', authenticate, authorize(['admin']), userController.getAllUsers);

// Baru: user juga boleh ambil data berdasarkan role tertentu
router.get('/by-role',
    authenticate,
    authorize(['admin','user']),   // siapa pun yang login
    userController.getByRole
  );
  


module.exports = router;