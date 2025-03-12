const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./auth');
const morgan = require('morgan');
const logger = require('./utils/logger'); // Import your Winston logger from the utils folder
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup Morgan to use Winston for logging HTTP requests
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Updated OAuth callback route to parse account parameters and select the real (CR) account
app.get('/callback', (req, res) => {
  // Log the full query parameters for debugging purposes
  logger.info("Callback query parameters:", req.query);

  // Extract expected parameters
  const { acct1, token1, cur1, acct2, token2, cur2 } = req.query;

  // Choose the account that is a real (CR) account.
  // We expect real accounts to have an ID starting with "CR"
  let selectedAccount = null;
  if (acct1 && acct1.startsWith("CR") && token1 && cur1) {
    selectedAccount = { account: acct1, token: token1, currency: cur1 };
  } else if (acct2 && acct2.startsWith("CR") && token2 && cur2) {
    selectedAccount = { account: acct2, token: token2, currency: cur2 };
  }

  if (!selectedAccount) {
    return res.status(400).json({ message: "Required account parameters are missing or invalid" });
  }
  
  logger.info("Selected account details:", selectedAccount);
  
  // TODO: Use the selected token to call Deriv's authorize API or complete your internal login flow.
  
  res.send("Authorization successful! You can close this page.");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`);
});
