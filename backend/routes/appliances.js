const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Appliance = require("../models/Appliance");

// ========== Multer Config ==========
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ========== POST - Create Appliance ==========
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      applianceName,
      modelNumber,
      brand,
      applianceType,
      serialNumber,
      maintenanceStatus,
      purchasedFrom,
      installedBy,
      purchasedBy,
      additionalNotes,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const newAppliance = new Appliance({
      applianceName,
      modelNumber,
      brand,
      applianceType,
      serialNumber,
      maintenanceStatus,
      image,
      purchasedFrom: JSON.parse(purchasedFrom || "{}"),
      installedBy: JSON.parse(installedBy || "{}"),
      purchasedBy: JSON.parse(purchasedBy || "{}"),
      additionalNotes,
    });

    await newAppliance.save();
    res.status(201).json({ message: "Appliance created", data: newAppliance });
  } catch (error) {
    console.error("Create Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// ========== GET - All Appliances with Pagination ==========
router.get("/", async (req, res) => {
  try {
    // Query params se page & limit nikalo (defaults: page=1, limit=10)
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // Total documents count
    const total = await Appliance.countDocuments();

    // Data fetch with skip & limit
    const appliances = await Appliance.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      total,             // Total appliances
      page,              // Current page
      pages: Math.ceil(total / limit), // Total pages
      limit,             // Per page items
      data: appliances,  // Actual appliances list
    });
  } catch (error) {
    console.error("Fetching error:", error.message);
    res.status(500).json({ message: "Fetching error" });
  }
});


// ========== GET - Single Appliance by ID ==========
router.get("/:id", async (req, res) => {
  try {
    const appliance = await Appliance.findById(req.params.id);
    if (!appliance) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(appliance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appliance" });
  }
});

// ========== PUT - Update Appliance ==========
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    // Parse the nested objects from the form data
    const updates = {
      ...req.body,
      purchasedFrom: req.body.purchasedFrom ? JSON.parse(req.body.purchasedFrom) : {},
      installedBy: req.body.installedBy ? JSON.parse(req.body.installedBy) : {},
      purchasedBy: req.body.purchasedBy ? JSON.parse(req.body.purchasedBy) : {},
    };

    // Handle file upload
    if (req.file) {
      updates.image = req.file.filename;
    }

    const updated = await Appliance.findByIdAndUpdate(
      req.params.id,
      { $set: updates },  // Use $set to properly update nested objects
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appliance not found" });
    }

    res.status(200).json({ 
      message: "Appliance updated successfully", 
      data: updated 
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ 
      message: "Error updating appliance",
      error: error.message 
    });
  }
});
// ========== DELETE - Remove Appliance ==========
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Appliance.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete error" });
  }
});

module.exports = router;
