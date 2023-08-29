const express = require('express');
const controller = require('../controllers/bulletsController');

const router = express.Router();

router.route('/buyBullets').post(controller.buyBullet);

router.route('/hook').post(controller.hook);

module.exports = router;
