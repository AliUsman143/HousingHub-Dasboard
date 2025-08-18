const express = require('express');
const router  = express.Router();
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);

const UserSign = require('../models/usersign');
const Payment  = require('../models/Payment');
const Package  = require('../models/Package');

// 1️⃣  Create checkout session ---------------------------------------------
router.post('/create', async (req, res) => {
  try {
    const { userId, packageId } = req.body;               // sent from front-end

    const user     = await UserSign.findById(userId);
    const pack     = await Package.findById(packageId);
    if (!user || !pack) return res.status(404).json({error: 'User or package not found'});

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: pack.stripePriceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.FRONTEND_URL}/cancel`,
      client_reference_id: userId,            // handy later in webhook
      metadata: {
        packageId:   packageId,
        packageType: pack.packageType,
        propertiesIncluded: pack.propertyCount
      }
    });

    // save **pending** payment
    await Payment.create({
      userId,
      packageId,
      stripePaymentId: session.id,
      status: 'pending'
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 2️⃣  Webhook to finalise payment -----------------------------------------
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // 1. mark payment completed
    await Payment.findOneAndUpdate({ stripePaymentId: session.id }, { status: 'completed' });

    // 2. push subscription to user
    await UserSign.findByIdAndUpdate(session.client_reference_id, {
      $set: { payment: true },
      $push: {
        subscriptions: {
          packageId: session.metadata.packageId,
          stripePriceId: session.display_items?.[0]?.price?.id || null,
          packageType: session.metadata.packageType,
          price: session.amount_total / 100,
          propertiesIncluded: session.metadata.propertiesIncluded,
          stripeSessionId: session.id,
          status: 'active',
          createdAt: new Date()
        }
      }
    });
  }
  res.json({ received: true });
});

module.exports = router;