// controllers/webhookController.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handleWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Handle successful payment here
      console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
      break;
    // Handle other event types here
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

export default handleWebhook;
