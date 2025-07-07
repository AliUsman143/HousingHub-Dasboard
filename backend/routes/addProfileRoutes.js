const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AddProfile = require("../models/AddProfileUser");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


// POST route
router.post("/", upload.single("profilePicture"), async (req, res) => {
  try {
    const { username, email, phoneNo, password } = req.body;
    if (!username || !email || !phoneNo || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProfile = new AddProfile({
      username,
      email,
      phoneNo,
      password,
      profilePicture: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newProfile.save();

    res.status(201).json({
      message: "Profile created successfully",
      profile: newProfile,
    });
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});





// ========== GET all profiles ==========
router.get("/", async (req, res) => {
  try {
    const profiles = await AddProfile.find().sort({ createdAt: -1 });
    res.json({ profiles });
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ error: "Error fetching profiles" });
  }
});

// ========== GET profile by ID ==========
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid profile ID" });
  }

  try {
    const profile = await AddProfile.findById(id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json({ profile });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Error fetching profile" });
  }
});


module.exports = router;
