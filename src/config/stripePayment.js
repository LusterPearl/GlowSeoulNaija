import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27', // Specify Stripe API version
});

const processPayment = async (amount, token) => {
  try {
    const charge = await stripe.charges.create({
      amount: amount * 100, // Amount in kobo (1 NGN = 100 kobo)
      currency: 'ngn', // Currency
      source: token, // Token obtained from frontend
      description: 'Example charge', // Description
    });
    return charge;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export default processPayment;
