// models/user.js
import dbClient from '../config/db';

const USERS_COLLECTION = 'users';

class User {
  constructor({
    username,
    email,
    password,
    firstName = '',
    lastName = '',
    address = '',
  }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
  }

  async save() {
    const { db } = dbClient;
    const result = await db.collection(USERS_COLLECTION).insertOne(this);
    return result.insertedId;
  }

  static async findByEmail(email) {
    const { db } = dbClient;
    return db.collection(USERS_COLLECTION).findOne({ email });
  }

  static async findById(id) {
    const { db } = dbClient;
    return db.collection(USERS_COLLECTION).findOne({ _id: dbClient.ObjectID(id) });
  }

  static async update(id, newData) {
    const { db } = dbClient;
    const result = await db.collection(USERS_COLLECTION).updateOne(
      { _id: dbClient.ObjectID(id) },
      { $set: newData },
    );
    return result.modifiedCount > 0;
  }

  static async delete(id) {
    const { db } = dbClient;
    const result = await db.collection(USERS_COLLECTION).deleteOne({ _id: dbClient.ObjectID(id) });
    return result.deletedCount > 0;
  }
}

export default User;
