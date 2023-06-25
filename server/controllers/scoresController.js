const asyncHandler = require('express-async-handler');

const Game = require('../models/gameModel.js');

// @description Get all winners and losers from mongoDB
// @route /api/scores
// @access Public
const getWinnersAndLosers = asyncHandler(async (req, res) => {
  const winnersAndLosers = await Game.find({});

  return res.json(winnersAndLosers);
});

module.exports = { getWinnersAndLosers };
