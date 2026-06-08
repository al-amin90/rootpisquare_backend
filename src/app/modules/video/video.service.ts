import type { TVideo } from "./video.interface";
import { VideoModel } from "./video.model";

const createVideoIntoDB = async (payload: TVideo) => {
  const result = await VideoModel.create(payload);
  return result;
};

const getAllVideoFromDB = async () => {
  const result = await VideoModel.find()
    .populate("className")
    .populate("subjectName");

  return result;
};

const getSingleVideoFromDB = async (id: string) => {
  const result = await VideoModel.findById(id)
    .populate("className")
    .populate("subjectName");

  return result;
};

const updateVideoInDB = async (id: string, payload: Partial<TVideo>) => {
  const result = await VideoModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteVideoFromDB = async (id: string) => {
  const result = await VideoModel.findByIdAndDelete(id);
  return result;
};

export const videoServices = {
  createVideoIntoDB,
  getAllVideoFromDB,
  getSingleVideoFromDB,
  updateVideoInDB,
  deleteVideoFromDB,
};
