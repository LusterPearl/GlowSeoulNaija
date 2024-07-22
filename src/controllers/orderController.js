// controllers/orderController.js
import Order from '../models/order.js';

class OrderController {
  static async createOrder(req, res) {
    const { userId, products, status } = req.body;
    console.log('Creating order with:', { userId, products, status });
    const order = new Order({ userId, products, status });

    try {
      const orderId = await order.save();
      console.log('Order created with ID:', orderId);
      return res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating order', error });
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
}

export default OrderController;
