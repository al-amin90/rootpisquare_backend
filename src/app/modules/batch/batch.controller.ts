import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import { batchServices } from "./batch.service";

const createBatch = catchAsync(async (req, res, next) => {
  let iconUrl = "";

  const file = req.file;

  if (file) {
    const url = await uploadOnCloudinary(file.buffer, "batch");

    if (url) {
      iconUrl = url;
    }
  }

  const batchData = {
    ...req.body,
    price: Number(req.body.price),
    discountPersent: Number(req.body.discountPersent || 0),
    icon: iconUrl,
  };

  const result = await batchServices.createBatchIntoDB(batchData);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Batch created successfully",
    data: result,
  });
});
const updateBatch = catchAsync(async (req, res, next) => {
  const result = await batchServices.updateBatchInDB(
    req.params.id as string,
    req.file,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Batch updated successfully",
    data: result,
  });
});

const getAllBatch = catchAsync(async (req, res, next) => {
  const result = await batchServices.getAllBatchFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All batches retrieved successfully",
    data: result,
  });
});

const getSingleBatch = catchAsync(async (req, res, next) => {
  const result = await batchServices.getSingleBatchFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Batch retrieved successfully",
    data: result,
  });
});

const deleteBatch = catchAsync(async (req, res, next) => {
  await batchServices.deleteBatchFromDB(req.params.id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Batch deleted successfully",
    data: {},
  });
});

export const batchControllers = {
  createBatch,
  getAllBatch,
  getSingleBatch,
  updateBatch,
  deleteBatch,
};
