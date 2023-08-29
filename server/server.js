const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8888;
const { errorHandler } = require('./middleware/error');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hello' });
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/scores', require('./routes/scoresRoutes'));
app.use('/api/picks', require('./routes/picksRoutes'));
app.use('/api/bullets', require('./routes/bulletsRoutes'));

app.use(errorHandler);

app.listen(PORT, (_) =>
  console.log(`Server is running on port ${PORT}`.america.bold)
);
