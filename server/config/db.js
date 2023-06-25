const mongoose = require('mongoose');

const connectDB = async (_) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected: `.yellow.bold +
        `${conn.connection.host}`.brightCyan.underline
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
