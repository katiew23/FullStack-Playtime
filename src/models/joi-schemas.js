import Joi from "joi";

export const IdSpec = Joi.alternatives()
  .try(Joi.string(), Joi.object())
  .description("a valid ID");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required()
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");


export const PlaylistSpec = Joi.object()
  .keys({
    title: Joi.string().example("My Playlist").required(),
    userid: IdSpec,
    tracks: Joi.array().items(IdSpec),
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("PlaylistDetails");

export const PlaylistArray = Joi.array().items(PlaylistSpec).label("PlaylistArray");


export const TrackSpec = Joi.object()
  .keys({
    title: Joi.string().example("Track Title").required(),
    artist: Joi.string().example("Track Artist").required(),
    album: Joi.string().example("Track Album").required(),
    duration: Joi.number().example(240).required(),
    playlistid: IdSpec,
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("TrackDetails");

export const TrackArray = Joi.array().items(TrackSpec).label("TrackArray");

