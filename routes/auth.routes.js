const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.delete('/logout', authMiddleware, AuthController.logout);

router.get('/user', authMiddleware, AuthController.getUser);

module.exports = router;