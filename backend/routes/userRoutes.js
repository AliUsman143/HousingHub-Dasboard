const express = require("express");
const router = express.Router();
const UserSign = require("../models/usersign");
const Property = require("../models/property");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await UserSign.find().populate('properties');
    res.json(users); // ✅ return users to frontend
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching users" });
  }
});

// ✅ GET single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await UserSign.findById(req.params.id).populate('properties');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Server error while fetching user" });
  }
});


// ✅ POST: Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    const newUser = new UserSign({
      username,
      email,
      password,
      dateAdded: new Date().toLocaleDateString(), // optional
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error while creating user" });
  }
});



// PUT: Update a user by ID
router.put('/:id', async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await UserSign.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true } // return updated user
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Update Error:', error.message);
    res.status(500).json({ error: 'Server error during update' });
  }
});




// DELETE user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await UserSign.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error while deleting user' });
  }
});


module.exports = router;
