// src/controllers/webhook.controller.js

import Stripe from "stripe";
import  stripe  from "../config/stripe.js";
// import { processDonationWebhook } from "../services/stripe.service.js";

/**
 * Stripe webhook endpoint
 */
export const stripeWebhook = async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"];
    const rawBody = req.rawBody; // must be set in app.js middleware

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Process event
    // await processDonationWebhook(event);

    res.json({ received: true });
  } catch (err) {
    next(err);
  }
};
