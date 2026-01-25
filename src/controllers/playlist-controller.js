import { db } from "../models/db.js";

export const playlistController = {
  index: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);

      const viewData = {
        title: "Playlist",
        playlist: playlist,
      };

      return h.view("playlist-view", viewData);
    },
  },

  addTrack: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);

      const newTrack = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };

      await db.trackStore.addTrack(playlist._id, newTrack);
      return h.redirect(`/playlist/${playlist._id}`);
    },
  },

  deleteTrack: {
  handler: async function (request, h) {
    const playlistId = request.params.id;
    const trackId = request.params.trackid;

    await db.trackStore.deleteTrack(playlistId, trackId);

    return h.redirect(`/playlist/${playlistId}`);
  },
},


  deletePlaylist: {
    handler: async function (request, h) {
      const playlistId = request.params.id;

      await db.playlistStore.deletePlaylistById(playlistId);

      return h.redirect("/dashboard");
    },
  },
};
