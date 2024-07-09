const redis = require('redis');
const { promisify } = require('util');

/**
 *  A class to manage a redis client connection and operations
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    
    this.client.on('error', (err) => {
      console.error('Redis error:', err);
      this.connected = false;
    });

    this.client.on('connect', () => {
      console.log('Redis connected successfully');
      this.connected = true;
    });
  }

  /**
     * checks if redis client is currenlty connected
     * @returns {boolen} True if connected, false otherwise
     */
  isAlive() {
    return this.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      const value = await getAsync(key);
      return value;
    } catch (error) {
      console.error('Error getting key from Redis:', error);
      return null;
    }
  }

  /**
     * Asunchronsoly sets a key-value pair in redis
     * @param {string} key
     * @param {*} value
     * @param {number} duration
     * @returns {Promise} resolves when the key is set
     */
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
