const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// Create/Update packages
router.post('/', async (req, res) => {
  try {
    const { packages } = req.body;

    if (!Array.isArray(packages)) {
      return res.status(400).json({ 
        success: false,
        message: 'Packages must be an array' 
      });
    }

    const session = await Package.startSession();
    session.startTransaction();

    try {
      // Delete existing packages of these types
      const packageTypes = packages.map(p => p.packageType);
      await Package.deleteMany({ 
        packageType: { $in: packageTypes } 
      }).session(session);

      // Insert new packages
      const createdPackages = await Package.insertMany(packages, { session });

      await session.commitTransaction();
      res.status(200).json({
        success: true,
        message: 'Packages saved successfully',
        data: createdPackages
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('Error saving packages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save packages',
      error: error.message
    });
  }
});

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ packageType: 1 });
    res.json({
      success: true,
      data: packages
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch packages',
      error: error.message
    });
  }
});

module.exports = router;