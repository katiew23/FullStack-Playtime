import { assert } from "chai";
import { db } from "../src/models/db.js";
import { track1, track2, testTracks } from "./track-fixtures.js";

suite("Track Model tests", () => {
  let testUser;
  let testPlaylist;

  setup(async () => {
    db.init("mongo");

    await db.userStore.deleteAll();
    await db.playlistStore.deleteAllPlaylists();
    await db.trackStore.deleteAllTracks();

    testUser = await db.userStore.addUser({
      firstName: "Track",
      lastName: "Tester",
      email: "track@test.com",
      password: "secret",
    });

    testPlaylist = await db.playlistStore.addPlaylist({
      userid: testUser._id,
      title: "Track Playlist",
    });

    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.trackStore.addTrack(testPlaylist._id, testTracks[i]);
    }
  });

  test("add a track", async () => {
    const tracks = await db.trackStore.getTracksByPlaylistId(testPlaylist._id);
    assert.equal(tracks.length, testTracks.length);
  });

  test("delete all tracks", async () => {
    await db.trackStore.deleteAllTracks();
    const tracks = await db.trackStore.getTracksByPlaylistId(testPlaylist._id);
    assert.equal(tracks.length, 0);
  });
});
