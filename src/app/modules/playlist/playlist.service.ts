import { PlaylistModel } from "./playlist.model";
import { TPlaylist } from "./playlist.interface";

const createPlaylistIntoDB = async (payload: TPlaylist) => {
  const result = await PlaylistModel.create(payload);
  return result;
};

const getAllPlaylistFromDB = async () => {
  const result = await PlaylistModel.find();
  return result;
};

const getSinglePlaylistFromDB = async (id: string) => {
  const result = await PlaylistModel.findById(id);
  return result;
};

const updatePlaylistInDB = async (id: string, payload: TPlaylist) => {
  const result = await PlaylistModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deletePlaylistFromDB = async (id: string) => {
  const result = await PlaylistModel.findByIdAndDelete(id);
  return result;
};

export const playlistServices = {
  createPlaylistIntoDB,
  getAllPlaylistFromDB,
  getSinglePlaylistFromDB,
  updatePlaylistInDB,
  deletePlaylistFromDB,
};
