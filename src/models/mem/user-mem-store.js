import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    if (!id) return null;
    const user = users.find((user) => user._id === id);
    return user || null;
  },

  async getUserByEmail(email) {
    if (!email) return null;
    const user = users.find((user) => user.email === email);
    return user || null;
  },

  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    if (index !== -1) {//only delete  if the user is found in the database, preventing unintended consequences of trying to delete a non-existent user.
      users.splice(index, 1);
    }
  },

  async deleteAll() {
    users = [];
  },
};
