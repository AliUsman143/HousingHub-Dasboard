// backend/routes/userauth.js
const express = require("express");
const router = express.Router();
const UserSign = require("../models/usersign");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
router.post("/signup", async (req, res) => {
  const { username, email, phone, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Check if user already exists
    const userExists = await UserSign.findOne({ $or: [{ email }, { username }, { phone }] });

    if (userExists) {
      return res.status(400).json({ message: "User with this email, username, or phone already exists." });
    }

    const user = await UserSign.create({
      username,
      email,
      phone,
      password, // Password will be hashed by the pre-save hook
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data." });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username (or email, depending on your login strategy)
    const user = await UserSign.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;