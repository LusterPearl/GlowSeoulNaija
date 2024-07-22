// models/order.js
import dbClient from '../config/db.js';

const ORDERS_COLLECTION = 'orders';

class Order {
  constructor({ userId, products, status }) {
    this.userId = userId;
    this.products = products;
    this.status = status;
  }

  async save() {
    const { db } = dbClient;
    const result = await db.collection(ORDERS_COLLECTION).insertOne(this);
    return result.insertedId;
  }

  static async findById(id) {
    const { db } = dbClient;
    return db.collection(ORDERS_COLLECTION).findOne({ _id: dbClient.ObjectID(id) });
  }

  static async findAll() {
    const { db } = dbClient;
    return db.collection(ORDERS_COLLECTION).find().toArray();
  }

  static async update(id, newData) {
    const { db } = dbClient;
    const result = await db.collection(ORDERS_COLLECTION).updateOne(
      { _id: dbClient.ObjectID(id) },
      { $set: newData },
    );
    return result.modifiedCount > 0;
  }

  static async delete(id) {
    const { db } = dbClient;
    const result = await db.collection(ORDERS_COLLECTION).deleteOne({ _id: dbClient.ObjectID(id) });
    return result.deletedCount > 0;
  }
}

export default Order;
