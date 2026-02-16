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
    let u = users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },
  
  
  async getUserByEmail(email) {
    let u = users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u;
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
