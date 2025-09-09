import stripe from "../config/stripe.js";
import logger from "./logger.service.js";

async function createCheckoutSession({
  amount,
  currency = "usd",
  moderatorStripeAccountId,
  metadata,
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency,
          product_data: { name: "Donation" },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    payment_intent_data: moderatorStripeAccountId
      ? { transfer_data: { destination: moderatorStripeAccountId } }
      : undefined,
    success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/cancel`,
    metadata,
  });
  logger.info("Created checkout session", { sessionId: session.id });
  return session;
}

export default { createCheckoutSession };
