// models/product.js
import dbClient from '../config/db';

const PRODUCTS_COLLECTION = 'products';

class Product {
  constructor({
    name,
    description,
    price,
    quantity,
    category,
  }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.category = category; // Added category field
  }

  async save() {
    const { db } = dbClient;
    const result = await db.collection(PRODUCTS_COLLECTION).insertOne(this);
    return result.insertedId;
  }

  static async findById(id) {
    const { db } = dbClient;
    return db.collection(PRODUCTS_COLLECTION).findOne({ _id: dbClient.ObjectId(id) });
  }

  static async findAll() {
    const { db } = dbClient;
    return db.collection(PRODUCTS_COLLECTION).find().toArray();
  }

  static async update(id, newData) {
    const { db } = dbClient;
    const result = await db.collection(PRODUCTS_COLLECTION).updateOne(
      { _id: dbClient.ObjectId(id) },
      { $set: newData },
    );
    return result.modifiedCount > 0;
  }

  static async delete(id) {
    const { db } = dbClient;
    const objectId = dbClient.ObjectId(id); // Define objectId first
    const result = await db.collection(PRODUCTS_COLLECTION).deleteOne({
      _id: objectId,
    });

    return result.deletedCount > 0;
  }
}

export default Product;
