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

  isAlive() {
    return !!this.db;
  }

  async allUsers() {
    try {
      const count = await this.client.db().collection('users').countDocuments();
      return count;
    } catch (error) {
      console.error('Error fetching user count:', error);
      throw error;
    }
  }

  async allProducts() {
    try {
      const products = await this.client.db().collection('products').find().toArray();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await this.client.db().collection('products').findOne({ _id: ObjectId(productId) });
      return product;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }

  async addProduct(productData) {
    try {
      const result = await this.client.db().collection('products').insertOne(productData);
      return result.insertedId;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      const result = await this.client.db().collection('products').updateOne({ _id: ObjectId(productId) }, { $set: productData });
      return result.modifiedCount;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const result = await this.client.db().collection('products').deleteOne({ _id: ObjectId(productId) });
      return result.deletedCount;
    } catch (error) {
      console.error('Error deleting product:', error);
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
