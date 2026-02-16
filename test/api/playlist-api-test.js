import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { testPlaylists, mozart } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Playlist API tests", () => {

  setup(async () => {
    await playtimeService.deleteAllPlaylists();
    for (let i = 0; i < testPlaylists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaylists[i] = await playtimeService.createPlaylist(testPlaylists[i]);
    }
  });

  test("create a playlist", async () => {
    const newPlaylist = await playtimeService.createPlaylist(mozart);
    assertSubset(mozart, newPlaylist);
    assert.isDefined(newPlaylist._id);
  });

  test("get all playlists", async () => {
    const playlists = await playtimeService.getAllPlaylists();
    assert.equal(playlists.length, testPlaylists.length);
  });

  test("get one playlist - success", async () => {
    const returnedPlaylist = await playtimeService.getPlaylist(testPlaylists[0]._id);
    assert.equal(returnedPlaylist.title, testPlaylists[0].title);
  });

});
