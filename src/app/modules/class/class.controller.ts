import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { classServices } from "./class.service";

const createClass = catchAsync(async (req, res, next) => {
  const result = await classServices.createClassIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Class is created successfully",
    data: result,
  });
});

const getAllClass = catchAsync(async (req, res, next) => {
  const result = await classServices.getAllClassFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All classes retrieved successfully",
    data: result,
  });
});

const getSingleClass = catchAsync(async (req, res, next) => {
  const result = await classServices.getSingleClassFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Class retrieved successfully",
    data: result,
  });
});

const updateClass = catchAsync(async (req, res, next) => {
  const result = await classServices.updateClassInDB(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Class updated successfully",
    data: result,
  });
});

const deleteClass = catchAsync(async (req, res, next) => {
  const result = await classServices.deleteClassFromDB(req.params.id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Class deleted successfully",
    data: {},
  });
});

export const classControllers = {
  createClass,
  getAllClass,
  getSingleClass,
  updateClass,
  deleteClass,
};
