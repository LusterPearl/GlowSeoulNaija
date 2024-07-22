/// Database
import pkg from 'mongodb';
const { MongoClient, ObjectId } = pkg;
import EventEmitter from 'events';

const { MONGO_URI } = process.env;

// Log the MongoDB URI
console.log('MongoDB URI:', MONGO_URI);

class DBClient extends EventEmitter {
  constructor() {
    super();
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
    this.client.connect()
      .then((client) => {
        console.log('MongoDB connected successfully');
        this.db = client.db('GlowSeoulNaija');
        this.emit('connected');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        this.emit('error', err);
      });
  }

  connect() {
    return this.client.connect();
  }

  isAlive() {
    return !!this.db;
  }

  async allUsers() {
    try {
      const count = await this.db // Updated to use this.db
        .collection('users')
        .countDocuments();
      return count;
    } catch (error) {
      console.error('Error fetching user count:', error);
      throw error;
    }
  }

  async allProducts() {
    try {
      const products = await this.db // Updated to use this.db
        .collection('products')
        .find()
        .toArray();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await this.db // Updated to use this.db
        .collection('products')
        .findOne({ _id: ObjectId(productId) });
      return product;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }

  async addProduct(productData) {
    try {
      const result = await this.db // Updated to use this.db
        .collection('products')
        .insertOne(productData);
      return result.insertedId;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      const result = await this.db // Updated to use this.db
        .collection('products')
        .updateOne({ _id: ObjectId(productId) }, { $set: productData });
      return result.modifiedCount;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const result = await this.db // Updated to use this.db
        .collection('products')
        .deleteOne({ _id: ObjectId(productId) });
      return result.deletedCount;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async addOrder(orderData) {
    try {
      const result = await this.db // Updated to use this.db
        .collection('orders')
        .insertOne(orderData);
      return result.insertedId;
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await this.db // Updated to use this.db
        .collection('orders')
        .findOne({ _id: ObjectId(orderId) });
      return order;
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      throw error;
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      const result = await this.db // Updated to use this.db
        .collection('orders')
        .updateOne({ _id: ObjectId(orderId) }, { $set: orderData });
      return result.modifiedCount;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  ObjectID(id) {
    return new ObjectId(id);
  }
}

const dbClient = new DBClient();
dbClient.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});

export default dbClient;
