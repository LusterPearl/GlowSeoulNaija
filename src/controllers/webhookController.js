import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Pb04SRqiqspksZPLGJjsw6tA0HuWfUj5UL5jvK1dfE3du6xhstk2qbmAtkGXyTJd9VMSxmAiWLNCOaRidG67NDH00PDmFM9KV', {
  apiVersion: '2020-08-27',
});

const endpointSecret = 'whsec_pI7OGiJQ2Mjb9Hl6OsvSxXWKW9pmP13o'; // Ensure this matches your Stripe webhook secret

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
