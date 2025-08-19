const express = require("express");
const router = express.Router();
const Contractor = require("../models/contractorModel");

// GET all contractors with pagination
router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // Total contractors count
    const total = await Contractor.countDocuments();

    // Fetch with pagination
    const contractors = await Contractor.find()
      .sort({ createdAt: -1 }) // latest first (optional)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      total,                  // total contractors
      page,                   // current page
      pages: Math.ceil(total / limit), // total pages
      limit,                  // per page limit
      data: contractors,      // contractor list
    });
  } catch (error) {
    console.error("Error fetching contractors:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
});


// GET single contractor by ID
router.get("/:id", async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id);
    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }
    res.status(200).json({ contractor });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contractor", error });
  }
});

// POST - Add new contractor
router.post("/", async (req, res) => {
  const {
    name,
    companyname,
    servicetype,
    phone,
    email,
    companywebsite,
    additionalnote,
  } = req.body;

  if (
    !name ||
    !companyname ||
    !servicetype ||
    !phone ||
    !email ||
    !companywebsite ||
    !additionalnote
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newContractor = new Contractor({
      name,
      companyname,
      servicetype,
      phone,
      email,
      companywebsite,
      additionalnote,
    });

    const savedContractor = await newContractor.save();
    res
      .status(201)
      .json({ message: "Contractor added successfully", contractor: savedContractor });
  } catch (error) {
    res.status(500).json({ message: "Failed to add contractor", error });
  }
});

// PUT - Update contractor by ID
router.put("/:id", async (req, res) => {
  const {
    name,
    companyname,
    servicetype,
    phone,
    email,
    companywebsite,
    additionalnote,
  } = req.body;

  try {
    const updatedContractor = await Contractor.findByIdAndUpdate(
      req.params.id,
      {
        name,
        companyname,
        servicetype,
        phone,
        email,
        companywebsite,
        additionalnote,
      },
      { new: true, runValidators: true }
    );

    if (!updatedContractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }

    res.status(200).json({
      message: "Contractor updated successfully",
      contractor: updatedContractor,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating contractor", error });
  }
});

// DELETE contractor by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contractor.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Contractor not found" });
    }
    res.status(200).json({ message: "Contractor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contractor", error });
  }
});

module.exports = router;
