const express = require('express');
const router = express.Router();

const { register, login, checkUser } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/check-user', checkUser);

module.exports = router;