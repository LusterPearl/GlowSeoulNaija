import dbClient from '../config/db.js';

const USERS_COLLECTION = 'users';

class User {
  constructor({
    username,
    email,
    password,
    firstName = '',
    lastName = '',
    address = '',
    avatar = '',
  }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.avatar = avatar;
  }

  static async create(userData) {
    const { db } = dbClient;
    const result = await db.collection(USERS_COLLECTION).insertOne(userData);
    return result.insertedId;
  }

  static async findAll() {
    const { db } = dbClient;
    return db.collection(USERS_COLLECTION).find().toArray();
  }

  static async findById(id) {
    const { db } = dbClient;
    return db.collection(USERS_COLLECTION).findOne({ _id: dbClient.ObjectID(id) });
  }

  static async update(id, newData) {
    const { db } = dbClient;
    const result = await db.collection(USERS_COLLECTION).updateOne(
      { _id: dbClient.ObjectID(id) },
      { $set: newData }
    );
    return result.modifiedCount > 0;
  }

  static async delete(id) {
    const { db } = dbClient;
    const result = await db.collection(USERS_COLLECTION).deleteOne({ _id: dbClient.ObjectID(id) });
    return result.deletedCount > 0;
  }

  static async uploadProfilePicture(userId, avatarPath) {
    const { db } = dbClient;
    const result = await db.collection(USERS_COLLECTION).updateOne(
      { _id: dbClient.ObjectID(userId) },
      { $set: { avatar: avatarPath } }
    );
    return result.modifiedCount > 0;
  }

  // Add method to check if user is admin
  static async isAdmin(userId) {
    const { db } = dbClient;
    const user = await db.collection(USERS_COLLECTION).findOne({ _id: dbClient.ObjectID(userId) });
    return user && user.isAdmin; // Ensure 'isAdmin' field is part of the user document
  }
}

export default User;
