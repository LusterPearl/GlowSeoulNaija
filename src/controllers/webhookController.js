import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// webhookController.js
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const payload = req.body.toString(); // Convert Buffer to string for verification

  try {
    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object; // Contains a Stripe payment intent
      console.log(`PaymentIntent ${paymentIntent.id} was successful!`);
      // Handle successful payment here
    }
    
    // Respond with 200 to acknowledge receipt of the event
    res.json({ received: true });
  } catch (err) {
    console.error('Error verifying webhook signature:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

export default handleWebhook;
