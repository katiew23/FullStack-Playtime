import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const userJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

   async getUserById(id) {
    await db.read();
    let u = db.data.users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },//retrieves a user from the database by their unique ID. It reads the database, searches for a user with the specified ID, and returns the user object if found. If no user is found with the given ID, it returns null.

 async getUserByEmail(email) {
    await db.read();
    let u = db.data.users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u;
  },//adding null to standardize the return value when a user is not found, making it easier for the calling code to handle the case where a user does not exist in the database.

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);//only delete  if the user is found in the database, preventing unintended consequences of trying to delete a non-existent user. 
    await db.write();
  },//deletes a user from the database by their unique ID. It reads the database, finds the index of the user with the specified ID, and if found, removes that user from the array. Finally, it writes the updated database back to storage.

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};