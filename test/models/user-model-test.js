import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { maggie, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
   

suite("User Model tests", () => {
  setup(async () => {
    db.init("json");
    await db.userStore.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }
  });//The setup function initializes the database and ensures that it starts with a clean state by deleting all existing users. It then adds a predefined set of test users to the database, which can be used in the subsequent tests to verify the functionality of the user model.

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assertSubset(maggie, newUser);
  });   //This test verifies that a new user can be created successfully. It adds a user (maggie) to the database and asserts that the returned user object is equal to the original maggie object, confirming that the user was created correctly.

  test("delete all userApi", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });//This test checks the functionality of deleting all users from the database. It first retrieves all users and asserts that there are 3 users (the ones added in the setup). Then it calls the deleteAll method to remove all users and retrieves the users again, asserting that the length is now 0, confirming that all users were deleted successfully.

  test("get a user - success", async () => {
    const user = await db.userStore.addUser(maggie);
    const returnedUser1 = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser2);
  });//This test verifies that a user can be retrieved successfully by both their unique ID and email. It first adds a user (maggie) to the database, then retrieves the user using getUserById and asserts

  test("delete One User - success", async () => {
    await db.userStore.deleteUserById(testUsers[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(testUsers[0]._id);
    assert.isNull(deletedUser);
  });// This test checks the functionality of deleting a single user by their unique ID. It deletes the first user from the testUsers array, retrieves all users to confirm that the count has decreased by one, and then attempts to retrieve the deleted user by their ID, asserting that the result is null, confirming that the user was successfully deleted.

  test("get a user - failures", async () => {
    const noUserWithId = await db.userStore.getUserById("123");
    assert.isNull(noUserWithId);
    const noUserWithEmail = await db.userStore.getUserByEmail("no@one.com");
    assert.isNull(noUserWithEmail);
  });//This test verifies that attempting to retrieve a user with invalid parameters (a non-existent ID or email) correctly returns null. It asserts that both retrieval attempts return null, confirming that the user model handles cases where a user is not found appropriately.

  test("get a user - bad params", async () => {
    let nullUser = await db.userStore.getUserByEmail("");
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById("");
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById();
    assert.isNull(nullUser);
  });// This test checks the behavior of the user retrieval functions when provided with invalid parameters, such as an empty string or undefined. It asserts that in all cases, the functions return null, confirming that the user model correctly handles invalid input without throwing errors or returning unintended results.

  test("delete One User - fail", async () => {
    await db.userStore.deleteUserById("bad-id");
    const allUsers = await db.userStore.getAllUsers();
    assert.equal(testUsers.length, allUsers.length);
  });// This test verifies that attempting to delete a user with an invalid ID does not affect the existing users in the database. It calls deleteUserById with a non-existent ID and then retrieves all users, asserting that the number of users remains unchanged, confirming that the delete operation does not inadvertently remove any users when given invalid input.
});
