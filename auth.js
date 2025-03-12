const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config();

const router = express.Router();

// User Registration (Signup)
router.post('/register', async (req, res) => {
  const { name, email, phone_number, password, deriv_account_id } = req.body;

  if (!name || !email || !phone_number || !password || !deriv_account_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for an existing user with the same deriv_account_id
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE deriv_account_id = ?",
      [deriv_account_id]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User with this deriv_account_id already exists" });
    }

    // Hash the password using bcrypt (10 salt rounds is typical)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const [result] = await db.query(
      "INSERT INTO users (name, email, phone_number, password_hash, deriv_account_id) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone_number, hashedPassword, deriv_account_id]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Error registering user", error });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Database error", error });
  }
});

module.exports = router;
