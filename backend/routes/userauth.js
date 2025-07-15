const express = require("express");
const router = express.Router();
const User = require("../models/usersign");


router.post("/", async (req, res) => {
  console.log("🚀 POST /api/auth hit"); // ✅ add this
  console.log("🧠 Body:", req.body);     // ✅ add this

  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    const newUser = new User({ username, email, phone, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
