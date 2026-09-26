const express = require('express');
const router = express.Router();

const {
  register,
  login,
  checkUser,
  getMe,
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/check-user', checkUser);
router.get('/me', authenticateToken, getMe);

module.exports = router;