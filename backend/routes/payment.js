// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const UserSign = require('../models/usersign');
const mongoose = require('mongoose');

// Add this new route
router.post('/verify', async (req, res) => {
  try {
    const { sessionId, sessionData } = req.body;

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Find user (check both metadata and customer email)
    const user = await UserSign.findOne({
      $or: [
        { _id: sessionData.metadata?.userId },
        { email: sessionData.customer_details?.email }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if subscription already exists
    const existingSub = user.subscriptions?.find(
      sub => sub.stripeSessionId === sessionId
    );

    if (!existingSub) {
      const subscription = {
        packageId: sessionData.metadata?.packageId || 'unknown',
        stripePriceId: sessionData.metadata?.priceId,
        packageType: sessionData.metadata?.packageType || 'Basic',
        price: sessionData.amount_total / 100,
        propertiesIncluded: sessionData.metadata?.propertiesIncluded || '1',
        stripeSessionId: sessionId,
        status: 'active',
        createdAt: new Date()
      };

      await UserSign.findByIdAndUpdate(user._id, {
        $push: { subscriptions: subscription }
      });
    }

    return res.json({ 
      success: true,
      message: 'Payment verified and subscription recorded'
    });

  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});
// backend/routes/payment.js
router.post('/confirm', async (req, res) => {
  try {
    const { userId, packageId, amount, sessionId } = req.body;

    await UserSign.findByIdAndUpdate(userId, {
      $set: { 
        hasPaid: true,
        activePackage: packageId,
        lastPayment: {
          amount,
          date: new Date(),
          sessionId
        }
      }
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;