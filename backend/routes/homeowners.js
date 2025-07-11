const express = require("express");
const router = express.Router();
const Homeowner = require("../models/Homeowner");

// POST: Add new homeowner
router.post("/", async (req, res) => {
  try {
    const { name, address, status, dateAdded } = req.body;

    const newHomeowner = new Homeowner({ name, address, status, dateAdded });
    await newHomeowner.save();

    res.status(201).json({ message: "Homeowner added", homeowner: newHomeowner });
  } catch (error) {
    console.error("Add Homeowner Error:", error);
    res.status(500).json({ error: "Failed to add homeowner" });
  }
});

// GET: All homeowners
router.get("/", async (req, res) => {
  try {
    const homeowners = await Homeowner.find();
    res.status(200).json({ homeowners });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homeowners" });
  }
});

// GET /api/homeowners/:id
router.get("/:id", async (req, res) => {
  try {
    const homeowner = await Homeowner.findById(req.params.id);
    if (!homeowner) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ homeowner });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homeowner" });
  }
});

// DELETE /api/homeowners/:id
router.delete("/:id", async (req, res) => {
  try {
    const homeowner = await Homeowner.findByIdAndDelete(req.params.id);
    if (!homeowner) {
      return res.status(404).json({ message: "Homeowner not found" });
    }
    res.status(200).json({ message: "Homeowner deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting" });
  }
});

module.exports = router;

