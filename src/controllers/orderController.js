import Order from '../models/order.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

class OrderController {
  static async createOrder(req, res) {
    const { userId, products, status, paymentMethodId } = req.body;

    try {
      // Calculate total amount
      const amount = OrderController.calculateTotalAmount(products);

      // Add logging for the amount calculation
      console.log('Calculated Amount:', amount);
      
      // Check if amount is a valid number
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount calculated' });
      }

      // Log the payment method ID
      console.log('Payment Method ID:', paymentMethodId);

      // Validate the paymentMethodId
      if (!paymentMethodId) {
        return res.status(400).json({ message: 'Payment Method ID is required' });
      }
      
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to smallest currency unit (kobo for NGN)
        currency: 'ngn',
        payment_method: paymentMethodId,
        confirm: true, // Automatically confirm the payment
      });

      // Create an order
      const order = new Order({ userId, products, status, paymentIntentId: paymentIntent.id });
      const orderId = await order.save();

      return res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ message: 'Error creating order', error });
    }
  }

  // New method to confirm payment
  static async confirmPayment(req, res) {
    const { orderId, paymentIntentId } = req.body;

    try {
      // Find the order by ID
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // Retrieve the payment intent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (!paymentIntent) {
        return res.status(404).json({ message: 'Payment intent not found' });
      }

      // Check if the payment intent status is succeeded
      if (paymentIntent.status === 'succeeded') {
        // Update the order status
        await Order.update(orderId, { status: 'completed' });
        return res.json({ message: 'Payment confirmed and order status updated' });
      }

      return res.status(400).json({ message: 'Payment not successful' });
    } catch (error) {
      console.error('Error confirming payment:', error);
      return res.status(500).json({ message: 'Error confirming payment', error });
    }
  }

  static async getOrder(req, res) {
    const { id } = req.params;

    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching order', error });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll();
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching orders', error });
    }
  }

  static async updateOrder(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      const updated = await Order.update(id, updatedData);
      if (updated) {
        return res.json({ message: 'Order updated successfully' });
      }
      return res.status(404).json({ message: 'Order not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating order', error });
    }
  }

  static async deleteOrder(req, res) {
    const { id } = req.params;

    try {
      const deleted = await Order.delete(id);
      if (deleted) {
        return res.json({ message: 'Order deleted successfully' });
      }
      return res.status(404).json({ message: 'Order not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting order', error });
    }
  }

  static calculateTotalAmount(products) {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  }
}

export default OrderController;
