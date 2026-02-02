import { assert } from "chai";
import { db } from "../src/models/db.js";
import { playlist1, testPlaylists } from "./playlist-fixtures.js";

suite("Playlist Model tests", () => {
  let testUser;

  setup(async () => {
    db.init();
    await db.userStore.deleteAll();
    await db.playlistStore.deleteAllPlaylists();

    testUser = await db.userStore.addUser({
      firstName: "Kate",
      lastName: "Test",
      email: "kate@test.com",
      password: "secret",
    });
  });

  test("create a playlist", async () => {
    const newPlaylist = {
      userid: testUser._id,
      title: playlist1.title,
    };

    const addedPlaylist = await db.playlistStore.addPlaylist(newPlaylist);
    assert.equal(addedPlaylist.title, playlist1.title);
  });

  test("get all playlists", async () => {
    for (let i = 0; i < testPlaylists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.playlistStore.addPlaylist({
        userid: testUser._id,
        title: testPlaylists[i].title,
      });
    }

    const playlists = await db.playlistStore.getAllPlaylists();
    assert.equal(playlists.length, testPlaylists.length);
  });

  test("get playlists by user", async () => {
    await db.playlistStore.addPlaylist({
      userid: testUser._id,
      title: "User Playlist",
    });

    const userPlaylists = await db.playlistStore.getUserPlaylists(testUser._id);
    assert.equal(userPlaylists.length, 1);
  });

  test("delete one playlist", async () => {
    const playlist = await db.playlistStore.addPlaylist({
      userid: testUser._id,
      title: "Delete Me",
    });

    await db.playlistStore.deletePlaylistById(playlist._id);
    const playlists = await db.playlistStore.getAllPlaylists();
    assert.equal(playlists.length, 0);
  });

  test("delete playlist with bad id does nothing", async () => {
    await db.playlistStore.addPlaylist({
      userid: testUser._id,
      title: "Safe",
    });

    await db.playlistStore.deletePlaylistById("bad-id");
    const playlists = await db.playlistStore.getAllPlaylists();
    assert.equal(playlists.length, 1);
  });
});
