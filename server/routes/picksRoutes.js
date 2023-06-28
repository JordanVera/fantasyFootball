const express = require('express');
const router = express.Router();
const { makePicks } = require('../controllers/picksController.js');
const { protect } = require('../middleware/auth');

router.post('/:week', protect, makePicks);

module.exports = router;
