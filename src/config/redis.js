const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
    });

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
      this.connected = false;
    });

    this.client.on('connect', () => {
      console.log('Redis connected successfully');
      this.connected = true;
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      const val = await getAsync(key);
      return val;
    } catch (error) {
      console.error('Error getting key from Redis:', error);
      return null;
    }
  }

  async setex(key, value, duration) {
    const setexAsync = promisify(this.client.setex).bind(this.client);
    try {
      await setexAsync(key, duration, value);
    } catch (error) {
      console.error('Error setting key in Redis:', error);
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
