// models/product.js
import dbClient from '../config/db.js';

const PRODUCTS_COLLECTION = 'products';

class Product {
  constructor({ name, description, price, quantity, category }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
  }

  async save() {
    const { db } = dbClient;
    const result = await db.collection(PRODUCTS_COLLECTION).insertOne(this);
    return result.insertedId;
  }

  static async findById(id) {
    const { db } = dbClient;
    return db.collection(PRODUCTS_COLLECTION).findOne({ _id: dbClient.ObjectID(id) });
  }

  static async findAll() {
    const { db } = dbClient;
    return db.collection(PRODUCTS_COLLECTION).find().toArray();
  }

  static async update(id, newData) {
    const { db } = dbClient;
    const result = await db.collection(PRODUCTS_COLLECTION).updateOne(
      { _id: dbClient.ObjectID(id) },
      { $set: newData },
    );
    return result.modifiedCount > 0;
  }

  static async delete(id) {
    const { db } = dbClient;
    const result = await db.collection(PRODUCTS_COLLECTION).deleteOne({ _id: dbClient.ObjectID(id) });
    return result.deletedCount > 0;
  }
}

export default Product;
