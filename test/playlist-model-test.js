import { assert } from "chai";
import { db } from "../src/models/db.js";

const testPlaylists = [
  { title: "Rock", userid: "user1" },
  { title: "Pop", userid: "user1" },
  { title: "Jazz", userid: "user2" },
];

suite("Playlist Model tests", () => {

  setup(async () => {
    db.init();
    await db.playlistStore.deleteAllPlaylists();
    for (let i = 0; i < testPlaylists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaylists[i] = await db.playlistStore.addPlaylist(testPlaylists[i]);
    }//The setup function initializes the database and ensures that it starts with a clean state by deleting all existing playlists. It then adds a predefined set of test playlists to the database, which can be used in the subsequent tests to verify the functionality of the playlist model.
  });

  test("create a playlist", async () => {
    const playlist = { title: "Blues", userid: "user3" };
    const newPlaylist = await db.playlistStore.addPlaylist(playlist);
    assert.equal(newPlaylist.title, playlist.title);
  });//This test verifies that a new playlist can be created successfully. It defines a new playlist object and adds it to the database using the addPlaylist method. It then asserts that the title of the newly created playlist matches the title of the original playlist object, confirming that the playlist was created correctly.

  test("get all playlists", async () => {
    const playlists = await db.playlistStore.getAllPlaylists();
    assert.equal(playlists.length, 3);
  });//This test checks the functionality of retrieving all playlists from the database. It calls the getAllPlaylists method and asserts that the length of the returned playlists array is 3, which matches the number of playlists added in the setup, confirming that all playlists are being retrieved correctly.

  test("get playlist by id - success", async () => {
    const playlist = await db.playlistStore.getPlaylistById(testPlaylists[0]._id);
    assert.equal(playlist._id, testPlaylists[0]._id);
  });//This test verifies that a playlist can be retrieved successfully by its unique ID. It retrieves the first playlist from the testPlaylists array using its _id and asserts that the _id of the returned playlist matches the _id of the original playlist, confirming that the correct playlist was retrieved.

  test("get user playlists", async () => {
    const playlists = await db.playlistStore.getUserPlaylists("user1");
    assert.equal(playlists.length, 2);
  });//This test checks the functionality of retrieving playlists associated with a specific user. It calls the getUserPlaylists method with the user ID "user1" and asserts that the length of the returned playlists array is 2, which matches the number of playlists associated with "user1" in the setup, confirming that the correct playlists are being retrieved for the specified user.

  test("delete one playlist - success", async () => {
    await db.playlistStore.deletePlaylistById(testPlaylists[0]._id);
    const playlists = await db.playlistStore.getAllPlaylists();
    assert.equal(playlists.length, 2);
  });// This test verifies that a playlist can be deleted successfully by its unique ID. It deletes the first playlist from the testPlaylists array using its _id, then retrieves all playlists and asserts that the length of the returned playlists array is now 2, confirming that the playlist was successfully deleted.

  test("delete one playlist - fail", async () => {
    await db.playlistStore.deletePlaylistById("bad-id");
    const playlists = await db.playlistStore.getAllPlaylists();
    assert.equal(playlists.length, 3);
  });// This test checks the functionality of deleting a playlist with an invalid ID. It attempts to delete a playlist using a non-existent ID ("bad-id"), then retrieves all playlists and asserts that the length of the returned playlists array is still 3, confirming that no playlists were deleted when an invalid ID was provided.

  test("get playlist - failure", async () => {
    const playlist = await db.playlistStore.getPlaylistById("bad-id");
    assert.isNull(playlist);
  });// This test verifies that attempting to retrieve a playlist with an invalid ID correctly returns null. It calls the getPlaylistById method with a non-existent ID ("bad-id") and asserts that the result is null, confirming that the playlist model handles cases where a playlist is not found appropriately.

  test("delete all playlists", async () => {
  let playlists = await db.playlistStore.getAllPlaylists();
  assert.equal(playlists.length, 3);

  await db.playlistStore.deleteAllPlaylists();

  playlists = await db.playlistStore.getAllPlaylists();
  assert.equal(playlists.length, 0);
});// This test checks the functionality of deleting all playlists from the database. It first retrieves all playlists and asserts that there are 3 playlists (the ones added in the setup). Then it calls the deleteAllPlaylists method to remove all playlists and retrieves the playlists again, asserting that the length is now 0, confirming that all playlists were deleted successfully.
 

});
