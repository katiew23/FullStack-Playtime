import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { TrackArray, TrackSpec, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "../logger.js";


export const trackApi = {
    find: {
        auth: false,
        handler: async function (request, h) {
            try {
                const tracks = await db.trackStore.getAllTracks();
                return tracks;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all tracks",
        notes: "Returns details of all tracks",
        
    },
    
    findOne: {
        auth: false,
        handler: async function (request, h) {
            try {
                const track = await db.trackStore.getTrackById(request.params.id);
                if (!track) {
                    return Boom.notFound("No track with this id");
                }
                return track;
            } catch (err) {
                return Boom.serverUnavailable("No track with this id");
            }
        },
        tags: ["api"],
        description: "Get a track",
        notes: "Returns details of a track",  
        
    },
    
    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const track = await db.trackStore.addTrack(
                    request.params.id,
                    request.payload
                );
                if (track) {
                    return h.response(track).code(201);
                }
                return Boom.badImplementation("error creating Track");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a track",
        notes: "Returns the newly created track",
        validate: { params: { id: IdSpec } }
    },
    
    deleteOne: {
        auth: false,
        async handler(request, h) {
            try {
                const track = await db.trackStore.getTrackById(request.params.id);
                if (!track) {
                    return Boom.notFound("No track with this id");
                }
                
                await db.trackStore.deleteTrack(request.params.id);
                return h.response().code(204);
                
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete a track",
        notes: "Deletes a track from the database",
        validate: { params: { id: IdSpec } } 
        
    },
    
    
    deleteAll: {
        auth: false,
        handler: async function (request, h) {
            try {
                await db.trackStore.deleteAllTracks();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all tracks",
            notes: "Deletes all tracks from the database",
           
    },
};