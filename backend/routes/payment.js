// backend/routes/payment.js
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "sk_test_YOUR_TEST_KEY_HERE"); // Fallback for development
const Package = require("../models/Package");

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, paymentMethodId, packageId } = req.body;

    // Validate the amount
    if (amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
  amount,
  currency,
  payment_method: paymentMethodId,
  confirmation_method: "manual",
  confirm: true,
  metadata: { packageId },
});

// Save the payment in DB
const Payment = require("../models/Payment");

await Payment.create({
  userId: req.user?._id || "6650b0e4ef01e9e0d3c05dc5", // fallback if user not in req
  packageId: packageId,
  amount: amount / 100, // convert back to dollars
  currency,
  stripePaymentId: paymentIntent.id,
  status: paymentIntent.status,
});


    // Here you would typically save the payment info to your database
    // For example:
    // await savePaymentToDatabase(req.user.id, packageId, amount, paymentIntent.id);

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: err.message });
  }
});

// backend/routes/payment.js
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // Update your database here
        break;
      // Add other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

module.exports = router;
