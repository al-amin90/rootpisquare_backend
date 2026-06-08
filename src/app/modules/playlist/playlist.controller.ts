import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { playlistServices } from "./playlist.service";

const createPlaylist = catchAsync(async (req, res, next) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const subjectImages = files?.subjectImages ?? []; // array, index matches subjects[]

  const result = await playlistServices.createPlaylistIntoDB(
    req.body,
    subjectImages,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Playlist is created successfully",
    data: result,
  });
});

const getAllPlaylist = catchAsync(async (req, res, next) => {
  const result = await playlistServices.getAllPlaylistFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All playlists retrieved successfully",
    data: result,
  });
});

const getSinglePlaylist = catchAsync(async (req, res, next) => {
  const result = await playlistServices.getSinglePlaylistFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Playlist retrieved successfully",
    data: result,
  });
});

const updatePlaylist = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Parse deleted indices if present
  let deletedIndices: number[] = [];
  if (req.body.deletedImages) {
    deletedIndices =
      typeof req.body.deletedImages === "string"
        ? JSON.parse(req.body.deletedImages)
        : req.body.deletedImages;
  }

  const result = await playlistServices.updatePlaylistInDB(
    req.params.id,
    req.body,
    files?.subjectImages || [],
    deletedIndices,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Playlist updated successfully",
    data: result,
  });
});

const deletePlaylist = catchAsync(async (req, res, next) => {
  const result = await playlistServices.deletePlaylistFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Playlist deleted successfully",
    data: {},
  });
});

const getPlaylistsByClassID = catchAsync(async (req, res, next) => {
  const result = await playlistServices.getPlaylistsByClassIDFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Playlists retrieved successfully for the class",
    data: result,
  });
});

export const playlistControllers = {
  createPlaylist,
  getAllPlaylist,
  getSinglePlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlaylistsByClassID,
};
