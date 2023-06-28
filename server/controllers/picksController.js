const User = require('../models/userModel');
var _ = require('lodash');
const asyncHandler = require('express-async-handler');

// @description Make picks
// @route /api/users/makePicks/:week
// @access Private
exports.makePicks = async (req, res) => {
  const picks = req.body;
  const { week } = req.params;

  try {
    const result = await User.findById(req.user._id);
    const data = { [`week-${week}`]: picks };
    const allPicks = [...result.picks];

    if (allPicks.length > 0) {
      // Search index of pick
      const pickIndex = _.findIndex(
        allPicks,
        (pick) => Object.keys(pick)[0] == `week-${week}`
      );

      // If found, update it
      if (pickIndex !== -1) {
        console.log(
          `Updated user picks for week ${week} succesfully`.cyan.bold
        );
        allPicks[pickIndex] = data;
      }

      // Otherwise, push new pick
      else {
        console.log(
          `Created user picks for week ${week} for the first time`.green.bold
        );
        allPicks.push(data);
      }
    } else {
      allPicks.push(data);
      console.log('results.picks is empty'.yellow);
    }

    result.picks = allPicks;

    console.log('allPicks', allPicks);
    await result.save();

    return res.status(201).json({ msg: 'successfully added picks' });
  } catch (error) {
    console.log(error);
  }
};
