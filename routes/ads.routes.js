const express = require('express');
const router = express.Router();

const AdController = require('../controllers/ad.controller');

router.get('/ads', AdController.getAll);

router.get('/ads/:id', AdController.getById);

router.get('/ads/search/:searchPhrase', AdController.getBySearchPhrase);

router.post('/ads', AdController.post);

router.put('/ads/:id', AdController.put);

router.delete('/ads/:id', AdController.delete);

module.exports = router;