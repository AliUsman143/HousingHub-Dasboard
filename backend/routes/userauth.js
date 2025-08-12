const express = require("express");
const router = express.Router();
const UserSign = require("../models/usersign");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs"); // Make sure to install: npm install bcryptjs
const protect = require("../middleware/authMiddleware");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ---

router.put("/profile", protect, upload.single("profileImage"), async (req, res) => {
  try {
    const user = await UserSign.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.phone) user.phone = req.body.phone;

    // Handle password update
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    // Handle profile image
    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    await user.save();

    // Return updated user data
    const updatedUser = await UserSign.findById(user._id).select('-password');
    res.json(updatedUser);

  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ 
      message: "Server error during profile update",
      error: error.message // Include the actual error message
    });
  }
});


router.post('/signup', upload.single('profileImage'), async (req, res) => {
  const { username, email, phone, password, confirmPassword } = req.body;

  // Validation
  if (!username || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user exists
    const userExists = await UserSign.findOne({ 
      $or: [{ email }, { username }, { phone }] 
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await UserSign.create({
      username,
      email,
      phone,
      password,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: error.message || 'Server error during signup' 
    });
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