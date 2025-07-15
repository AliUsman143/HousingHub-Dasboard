const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Property = require("../models/property");

// === Multer config ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

// =======================
// ✅ POST - Create property
// =======================
router.post("/", upload.single("propertyImage"), async (req, res) => {
  try {
    const {
      colorTheme,
      propertyName,
      address,
      purchaseDate,
      purchasePrice,
      yearBuilt,
      interestRate,
      sizeSqft,
    } = req.body;

    const propertyImage = req.file ? req.file.filename : null;

    const newProperty = new Property({
      colorTheme,
      propertyName,
      address,
      purchaseDate,
      purchasePrice: Number(purchasePrice),
      yearBuilt: Number(yearBuilt),
      interestRate: Number(interestRate),
      sizeSqft: Number(sizeSqft),
      propertyImage,
    });

    await newProperty.save();

    res.status(201).json({
      message: "✅ Property saved successfully",
      data: newProperty,
    });
  } catch (error) {
    console.error("❌ Error saving property:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// =======================
// ✅ GET - All properties
// =======================
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties" });
  }
});

// =======================
// ✅ GET - Single property by ID
// =======================
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property" });
  }
});

// =======================
// ✅ PUT - Update property
// =======================
router.put("/:id", upload.single("propertyImage"), async (req, res) => {
  try {
    const updates = {
      ...req.body,
      purchasePrice: Number(req.body.purchasePrice),
      yearBuilt: Number(req.body.yearBuilt),
      interestRate: Number(req.body.interestRate),
      sizeSqft: Number(req.body.sizeSqft),
    };

    if (req.file) {
      updates.propertyImage = req.file.filename;
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "✅ Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating property" });
  }
});

// =======================
// ✅ DELETE - Remove property
// =======================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "✅ Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property" });
  }
});

module.exports = router;
