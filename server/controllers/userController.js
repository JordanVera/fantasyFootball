const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bulletRepo = require('../controllers/bulletsController');
const User = require('../models/userModel');
const { errorMonitor } = require('events');

// @description Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Create a customer in the Coinqvest API
  const customerId = await bulletRepo.createCustomer({
    customer: {
      email: user.email,
    },
  });

  user.customerId = customerId;

  await user.save();

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picks: user.picks,
      bullets: user.bullets,
      customerId: user.customerId,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// @description Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picks: user.picks,
      bullets: user.bullets,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @description get currently logged in User
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    bullets: req.user.bullets,
  };
  res.status(200).json(user);
});

// @description get all Users with active bullets
// @route /api/users/all
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ bullets: { $gt: 0 } }).select('-password');
  return res.status(200).json(users);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerUser, loginUser, getMe, getUsers };
