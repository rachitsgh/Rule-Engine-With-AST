// server.js or app.js
const express = require('express');
const connectDB = require('./database/config');
const router = require('./routes/ruleRoutes')

const app = express();

// Load environment variables
// require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/rules', router);

const PORT = 5004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

