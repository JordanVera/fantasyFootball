const express = require('express');
const router = express.Router();
const { getWinnersAndLosers } = require('../controllers/scoresController.js');

router.get('/', getWinnersAndLosers);

module.exports = router;
