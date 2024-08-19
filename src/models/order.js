import dbClient from '../config/db.js';

const ORDERS_COLLECTION = 'orders';

class Order {
  constructor({ userId, products, status, paymentIntentId }) {
    this.userId = userId;
    this.products = products;
    this.status = status;
    this.paymentIntentId = paymentIntentId;
  }

  async save() {
    const { db } = dbClient;
    const result = await db.collection(ORDERS_COLLECTION).insertOne(this);
    console.log('Order saved with ID:', result.insertedId); // Add logging
    return result.insertedId;
  }

  static async findById(id) {
    const { db } = dbClient;
    const order = await db.collection(ORDERS_COLLECTION).findOne({ _id: dbClient.ObjectID(id) });
    console.log('Order found:', order); // Add logging
    return order;
  }

  static async findAll() {
    const { db } = dbClient;
    const orders = await db.collection(ORDERS_COLLECTION).find().toArray();
    console.log('All orders:', orders); // Add logging
    return orders;
  }

  static async update(id, newData) {
    const { db } = dbClient;
    const result = await db.collection(ORDERS_COLLECTION).updateOne(
      { _id: dbClient.ObjectID(id) },
      { $set: newData },
    );
    console.log('Order update result:', result); // Add logging
    return result.modifiedCount > 0;
  }

  static async delete(id) {
    const { db } = dbClient;
    const result = await db.collection(ORDERS_COLLECTION).deleteOne({ _id: dbClient.ObjectID(id) });
    console.log('Order delete result:', result); // Add logging
    return result.deletedCount > 0;
  }
}

export default Order;
