import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { videoServices } from "./video.service";

const createVideo = catchAsync(async (req, res, next) => {
  const result = await videoServices.createVideoIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Video is created successfully",
    data: result,
  });
});

const getAllVideo = catchAsync(async (req, res, next) => {
  const result = await videoServices.getAllVideoFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All videos retrieved successfully",
    data: result,
  });
});

const getSingleVideo = catchAsync(async (req, res, next) => {
  const result = await videoServices.getSingleVideoFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Video retrieved successfully",
    data: result,
  });
});

const updateVideo = catchAsync(async (req, res, next) => {
  const result = await videoServices.updateVideoInDB(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Video updated successfully",
    data: result,
  });
});

const deleteVideo = catchAsync(async (req, res, next) => {
  await videoServices.deleteVideoFromDB(req.params.id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Video deleted successfully",
    data: {},
  });
});

export const videoControllers = {
  createVideo,
  getAllVideo,
  getSingleVideo,
  updateVideo,
  deleteVideo,
};
