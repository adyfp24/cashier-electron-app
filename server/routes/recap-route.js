const express = require('express');
const recapController = require('../controllers/recap-controller');
const router = express.Router();

router.get('/recap', recapController.getAllRecapData);

module.exports = router;