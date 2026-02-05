import { Track } from "./track.js";

export const trackMongoStore = {
  async getTracksByPlaylistId(id) {
    const tracks = await Track.find({ playlistid: id }).lean();
    return tracks;
  },

  async addTrack(playlistId, track) {
    track.playlistid = playlistId;
    const newTrack = new Track(track);
    await newTrack.save();
    return newTrack.toObject();
  },

  async deleteAllTracks() {
    await Track.deleteMany({});
  },
};
