import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { subjectServices } from "./subject.service";

const createSubject = catchAsync(async (req, res, next) => {
  const result = await subjectServices.createSubjectIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Subject is created successfully",
    data: result,
  });
});

const getAllSubject = catchAsync(async (req, res, next) => {
  const result = await subjectServices.getAllSubjectFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All subjects retrieved successfully",
    data: result,
  });
});

const getSingleSubject = catchAsync(async (req, res, next) => {
  const result = await subjectServices.getSingleSubjectFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Subject retrieved successfully",
    data: result,
  });
});

const updateSubject = catchAsync(async (req, res, next) => {
  const result = await subjectServices.updateSubjectInDB(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Subject updated successfully",
    data: result,
  });
});

const deleteSubject = catchAsync(async (req, res, next) => {
  const result = await subjectServices.deleteSubjectFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Subject deleted successfully",
    data: {},
  });
});

export const subjectControllers = {
  createSubject,
  getAllSubject,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
