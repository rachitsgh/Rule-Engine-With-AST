// config/db.js
const mongoose = require('mongoose');
// require('dotenv').config(); // Load environment variables from .env file

const MONGO_URI="mongodb+srv://rachitsdb:Foreverismyth@ruleengine.t2vtgzh.mongodb.net/?retryWrites=true&w=majority&appName=ruleengine"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;