const express = require("express");
const router = express.Router();
const User = require("../models/User"); // aapke model ka path

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // ✅ return users to frontend
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching users" });
  }
});

// ✅ GET single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

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
    const { name, propertyAddress } = req.body;

    // Validation
    if (!name || !propertyAddress) {
      return res
        .status(400)
        .json({ error: "Name and Property Address are required" });
    }

    const newUser = new User({
      name,
      propertyAddress,
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
  const { name, propertyAddress } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, propertyAddress },
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
    const deletedUser = await User.findByIdAndDelete(req.params.id);

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
