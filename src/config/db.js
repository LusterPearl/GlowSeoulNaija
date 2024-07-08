// src/config/db.js
import { MongoClient } from 'mongodb';

const mongoURI = process.env.MONGODB_URI;

const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on failure
  }
}

connect();

export default client;
