import dbClient from '../config/db.js';

const ORDERS_COLLECTION = 'orders';

class Order {
  constructor({ userId, products, status = 'pending', createdAt = new Date(), updatedAt = new Date() }) {
    this.userId = userId;
    this.products = products;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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

  static async update(id, newData) {
    const { db } = dbClient;
    const result = await db.collection(ORDERS_COLLECTION).updateOne(
      { _id: dbClient.ObjectID(id) },
      { $set: newData },
    );
    return result.modifiedCount > 0;
  }
}

export default Order;
