const express = require('express');
const controller = require('../controllers/bulletsController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/buyBullets').post(protect, controller.buyBullet);
router.route('/test').get(controller.testAuth);

router.route('/hook').post(controller.hook);

module.exports = router;
