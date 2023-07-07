const axios = require('axios');

const { MongoClient } = require('mongodb');
const colors = require('colors');
const util = require('util');
const Game = require('../models/gameModel');
// const scoresRepo = require('../controllers/scoresController.js');
const connectDB = require('./db');

require('dotenv').config();

function getWinnnersLosers() {
  const winners = {
    week1: [],
    week2: [],
    week3: [],
    week4: [],
    week5: [],
    week6: [],
    week7: [],
    week8: [],
    week9: [],
    week10: [],
    week11: [],
    week12: [],
    week13: [],
    week14: [],
    week15: [],
    week16: [],
    week17: [],
    week18: [],
  };

  const losers = {
    week1: [],
    week2: [],
    week3: [],
    week4: [],
    week5: [],
    week6: [],
    week7: [],
    week8: [],
    week9: [],
    week10: [],
    week11: [],
    week12: [],
    week13: [],
    week14: [],
    week15: [],
    week16: [],
    week17: [],
    week18: [],
  };

  return new Promise((resolve, reject) => {
    axios
      .all([
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/1?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/2?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/3?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/4?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/5?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/6?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/7?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/8?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/9?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/10?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/11?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/12?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/13?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/14?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/15?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/16?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/17?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/18?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/19?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/20?key=${process.env.API_KEY}`
        ),
        axios.get(
          `https://fly.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/21?key=${process.env.API_KEY}`
        ),
      ])
      .then(async (responseArr) => {
        for (let i = 0; i < 18; i++) {
          const weekN = `week${i + 1}`;
          const winnerWeek = winners[weekN];
          const loserWeek = losers[weekN];

          responseArr[i].data.forEach((element) => {
            if (element.AwayScore > element.HomeScore) {
              console.log('Away team won'.red);
              winnerWeek.push(element.AwayTeam);
              loserWeek.push(element.HomeTeam);
            } else if (element.AwayScore === element.HomeScore) {
              console.log('Game was a tie, both teams lost'.blue);
              loserWeek.push(element.HomeTeam);
              loserWeek.push(element.AwayTeam);
            } else {
              console.log('Home Team won'.green);
              winnerWeek.push(element.HomeTeam);
              loserWeek.push(element.AwayTeam);
            }
          });
        }

        // console.log('WINNERS OBJECT'.green);
        // console.log(util.inspect(winners, { showHidden: false, depth: null }));
        // console.log('LOSERS OBJECT'.red);
        // console.log(util.inspect(losers, { showHidden: false, depth: null }));

        resolve({ winners, losers });

        await seedDb(winners, losers);
      })
      .catch((err) => console.log(err));
  });
}

async function seedDb(winners, losers) {
  connectDB();

  await Game.deleteMany({});

  await Game.create({
    winners,
    losers,
  });

  console.log(
    `Scores seeded with data from season ${process.env.SEASON} of NFL`.america
  );
}

getWinnnersLosers();
