const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const validateOwnership = require('../utils/validateOwnership');

const AdController = require('../controllers/ad.controller');

router.get('/ads', AdController.getAll);

router.get('/ads/:id', AdController.getById);

router.get('/ads/search/:searchPhrase', AdController.getBySearchPhrase);

router.post('/ads', authMiddleware, AdController.post);

router.put('/ads/:id', authMiddleware, validateOwnership, AdController.put);

router.delete('/ads/:id', authMiddleware, validateOwnership, AdController.delete);

module.exports = router;