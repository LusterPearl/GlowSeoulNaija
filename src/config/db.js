// dbClient.js

import { MongoClient, ObjectID } from 'mongodb';
import EventEmitter from 'events';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/GlowSeoulNaija'; // Update with your MongoDB URI

class DBClient extends EventEmitter {
  constructor() {
    super();
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });

    this.client.connect()
      .then((client) => {
        console.log('MongoDB connected successfully');
        this.db = client.db('GlowSeoulNaija'); // Replace with your database name
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

  getObjectId(id) {
    return new ObjectID(id);
  }

  close() {
    if (this.client) {
      this.client.close();
      console.log('MongoDB connection closed');
    }
  }
}

const dbClient = new DBClient();

dbClient.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});

export default dbClient;
