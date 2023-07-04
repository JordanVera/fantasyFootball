const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// @description Make picks
// @route /api/picks/:week
// @access Private
exports.makePicks = asyncHandler(async (req, res) => {
  const picks = req.body;
  const { week } = req.params;

  console.log('req.user');
  console.log(req.user);

  const result = await User.findById(req.user._id);
  const data = { [`week-${week}`]: picks };
  const allPicks = [...result.picks];

  const pickIndex = allPicks.findIndex(
    (pick) => Object.keys(pick)[0] === `week-${week}`
  );

  if (pickIndex !== -1) {
    console.log(`Updated user picks for week ${week} successfully`.cyan.bold);
    allPicks[pickIndex] = data;
  } else {
    console.log(
      `Created user picks for week ${week} for the first time`.green.bold
    );
    allPicks.push(data);
  }

  console.log('allPicks', allPicks);

  result.picks = allPicks;
  await result.save();

  return res.status(201).send(allPicks);
});
