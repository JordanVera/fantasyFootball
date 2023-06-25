const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  makePicks,
} = require('../controllers/userController');

const { protect } = require('../middleware/auth');

const makePicksLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 MNUTES
  max: 101,
  message:
    'You are attempting to alter the picks at a high rate.  Please try again in 10 minutes.  If this is a life or death pick sitution please contact us through email we reply within 30 minutes usually.',
});

router.post('/', registerUser);

router.route('/makePicks/:week').post(makePicksLimiter, makePicks);

router.post('/login', loginUser);
router.get('/all', getUsers);
router.get('/me', protect, getMe);

module.exports = router;
