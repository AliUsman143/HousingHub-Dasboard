const express = require("express");
const router = express.Router();
const Maintenance = require("../models/maintenance");
const multer = require("multer");
const path = require("path");

// === Multer Config ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ✅ POST - Create Maintenance Record
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      maintenanceStatus,
      lastServiceDate,
      purchaseDate,
      warranty,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const newMaintenance = new Maintenance({
      name,
      maintenanceStatus,
      lastServiceDate,
      purchaseDate,
      warranty,
      image,
    });

    await newMaintenance.save();

    res.status(201).json({
      message: "✅ Maintenance record created",
      data: newMaintenance,
    });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ GET - All Maintenance Records
router.get("/", async (req, res) => {
  try {
    const data = await Maintenance.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

// ✅ GET - Single Record by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Maintenance.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving record" });
  }
});

// ✅ PUT - Update Record
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.image = req.file.filename;
    }

    const updated = await Maintenance.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.status(200).json({
      message: "✅ Record updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating record" });
  }
});

// ✅ DELETE - Remove Record
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "✅ Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting record" });
  }
});

module.exports = router;
