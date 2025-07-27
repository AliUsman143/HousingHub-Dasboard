// routes/packageRoutes.js
const express = require("express");
const router = express.Router();
const Package = require("../models/Package");

router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json({ data: packages });
  } catch (err) {
    console.error("Package fetch error:", err);
    res.status(500).json({ message: "Server error in fetching packages" });
  }
});

router.post("/", async (req, res) => {
  const { packages } = req.body;

  if (!Array.isArray(packages)) {
    return res.status(400).json({ message: "Packages should be an array." });
  }

  try {
    const createdPackages = await Package.insertMany(packages, { ordered: false }); // insert all
    return res.status(201).json({ message: "Packages created", data: createdPackages });
  } catch (err) {
    console.error("Create package error:", err);
    return res.status(500).json({ message: err.message });
  }
});


module.exports = router;
