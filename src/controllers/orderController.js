import Order from '../models/order.js';

class OrderController {
  static async createOrder(req, res) {
    const { userId, products } = req.body;

    if (!userId || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      const order = new Order({
        userId,
        products: products.map(p => ({
          productId: dbClient.ObjectID(p.productId),
          quantity: p.quantity,
        })),
      });

      const orderId = await order.save();
      return res.status(201).json({ orderId });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating order', error });
    }
  }

  static async getOrderById(req, res) {
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
}

export default OrderController;
