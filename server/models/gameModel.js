const mongoose = require('mongoose');

const gameSchema = mongoose.Schema(
  {
    winners: {
      type: Object,
      required: true,
    },
    losers: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
