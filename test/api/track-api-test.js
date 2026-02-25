import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { testTracks, concerto } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";

suite("Track API tests", () => {
  
  let playlist;
  
  setup(async () => {
    db.init("json");
    await playtimeService.deleteAllTracks();
    await playtimeService.deleteAllPlaylists();
    
    playlist = await playtimeService.createPlaylist({ title: "Test Playlist" });
    
    for (let i = 0; i < testTracks.length; i += 1) {
      testTracks[i] = await playtimeService.createTrack(
        playlist._id,
        testTracks[i]
      );
    }
  });
  
  test("create a track", async () => {
    const newTrack = await playtimeService.createTrack(
      playlist._id,
      concerto
    );
    assertSubset(concerto, newTrack);
    assert.isDefined(newTrack._id);
  });
  
  test("get all tracks", async () => {
    const tracks = await playtimeService.getAllTracks();
    assert.equal(tracks.length, testTracks.length);
  });
  
  test("get one track - success", async () => {
    const returnedTrack = await playtimeService.getTrack(testTracks[0]._id);
    assert.equal(returnedTrack.title, testTracks[0].title);
    assert.equal(returnedTrack.artist, testTracks[0].artist);
  });
  
  test("get one track - bad id", async () => {
    try {
      await playtimeService.getTrack("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 404);
    }
  });
  
  test("get one track - deleted track", async () => {
    await playtimeService.deleteAllTracks();
    try {
      await playtimeService.getTrack(testTracks[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 404);
    }
  });
  
  test("delete a track", async () => {
    const track = testTracks[0];
    await playtimeService.deleteTrack(track._id);
    try{
      await playtimeService.getTrack(track._id);
      assert.fail("Should not return a response");  
    } catch (error) {
      assert.equal(error.response.data.statusCode, 404);    
    }
  });
  
  test("remove non-existent track", async () => {
    try {
      await playtimeService.deleteTrack("non-existent-id");
      assert.fail("should not succeed");
    } catch (err) {
      assert.equal(err.response.status, 404);
    }   
  });
  
});
