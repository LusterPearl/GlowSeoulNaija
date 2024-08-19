// db.js
import pkg from 'mongodb';
const { MongoClient, ObjectId } = pkg;
import EventEmitter from 'events';
import logger from './logger.js'; // Import the logger

const { MONGO_URI } = process.env;

// Log the MongoDB URI
logger.info('MongoDB URI:', MONGO_URI); // Log the URI for tracking (make sure not to expose sensitive info in production)

class DBClient extends EventEmitter {
  constructor() {
    super();
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
    this.client.connect()
      .then((client) => {
        logger.info('MongoDB connected successfully'); // Log successful connection
        this.db = client.db('GlowSeoulNaija');
        this.emit('connected');
      })
      .catch((err) => {
        logger.error('Failed to connect to MongoDB:', err); // Log connection error
        this.emit('error', err);
      });
  }

  connect() {
    return this.client.connect();
  }

  isAlive() {
    return !!this.db;
  }

  // Handles Users
  async allUsers() {
    try {
      const count = await this.db
        .collection('users')
        .countDocuments();
      logger.info(`Fetched user count: ${count}`); // Log user count fetched
      return count;
    } catch (error) {
      logger.error('Error fetching user count:', error); // Log error details
      throw error;
    }
  }
  
  // Handles Products
  async allProducts() {
    try {
      const products = await this.db
        .collection('products')
        .find()
        .toArray();
      logger.info(`Fetched products: ${products.length}`); // Log the number of products fetched
      return products;
    } catch (error) {
      logger.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await this.db
        .collection('products')
        .findOne({ _id: ObjectId(productId) });
      logger.info(`Fetched product by ID: ${productId}`); // Log product retrieval
      return product;
    } catch (error) {
      logger.error('Error fetching product by ID:', error);
      throw error;
    }
  }

  async addProduct(productData) {
    try {
      const result = await this.db
        .collection('products')
        .insertOne(productData);
      logger.info(`Added product with ID: ${result.insertedId}`); // Log successful product addition
      return result.insertedId;
    } catch (error) {
      logger.error('Error adding product:', error);
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      const result = await this.db
        .collection('products')
        .updateOne({ _id: ObjectId(productId) }, { $set: productData });
      logger.info(`Updated product ID: ${productId}`); // Log product update
      return result.modifiedCount;
    } catch (error) {
      logger.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const result = await this.db
        .collection('products')
        .deleteOne({ _id: ObjectId(productId) });
      logger.info(`Deleted product ID: ${productId}`); // Log product deletion
      return result.deletedCount;
    } catch (error) {
      logger.error('Error deleting product:', error);
      throw error;
    }
  }
  
  // Handles Order
  async addOrder(orderData) {
    try {
      logger.info('Adding Order:', orderData); // Log order details being added
      const result = await this.db
        .collection('orders')
        .insertOne(orderData);
      logger.info(`Added order with ID: ${result.insertedId}`); // Log successful order addition
      return result.insertedId;
    } catch (error) {
      logger.error('Error adding order:', error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await this.db
        .collection('orders')
        .findOne({ _id: ObjectId(orderId) });
      logger.info(`Fetched order by ID: ${orderId}`); // Log order retrieval
      return order;
    } catch (error) {
      logger.error('Error fetching order by ID:', error);
      throw error;
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      logger.info(`Updating Order ID: ${orderId} with data:`, orderData); // Log order update details
      const result = await this.db
        .collection('orders')
        .updateOne({ _id: ObjectId(orderId) }, { $set: orderData });
      return result.modifiedCount;
    } catch (error) {
      logger.error('Error updating order:', error);
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const result = await this.db
        .collection('orders')
        .deleteOne({ _id: ObjectId(orderId) });
      logger.info(`Deleted order ID: ${orderId}`); // Log order deletion
      return result.deletedCount;
    } catch (error) {
      logger.error('Error deleting order:', error);
      throw error;
    }
  }

  ObjectID(id) {
    return new ObjectId(id);
  }
}

const dbClient = new DBClient();
dbClient.on('error', (err) => {
  logger.error('MongoDB Connection Error:', err); // Log MongoDB connection errors
});

export default dbClient;
