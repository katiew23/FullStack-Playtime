import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { testPlaylists, mozart } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";

suite("Playlist API tests", () => {

  const playlists = new Array(testPlaylists.length);

  setup(async () => {
    db.init("json");
    await playtimeService.deleteAllTracks();
    await playtimeService.deleteAllPlaylists();
    for (let i = 0; i < testPlaylists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      playlists[i] = await playtimeService.createPlaylist(testPlaylists[i]);
    }
  });

  test("create a playlist", async () => {
    const newPlaylist = await playtimeService.createPlaylist(mozart);
    assertSubset(mozart, newPlaylist);
    assert.isDefined(newPlaylist._id);
  });

  test("get all playlists", async () => {
    const allPlaylists = await playtimeService.getAllPlaylists();
    assert.equal(allPlaylists.length, testPlaylists.length);
  });

  test("get one playlist - success", async () => {
    const returnedPlaylist = await playtimeService.getPlaylist(playlists[0]._id);
    assert.equal(returnedPlaylist.title, testPlaylists[0].title);
  });

  test("delete a playlist", async () => {
  const playlist = playlists[0];
  await playtimeService.deletePlaylist(playlist._id);
  const allPlaylists = await playtimeService.getAllPlaylists();
  assert.equal(allPlaylists.length, testPlaylists.length - 1);
});

test("remove non-existent playlist", async () => {
  try {
    await playtimeService.deletePlaylist("non-existent-id");
    assert.fail("should not succeed");
  } catch (err) {
    assert.equal(err.response.status, 404);
  }
});

});
