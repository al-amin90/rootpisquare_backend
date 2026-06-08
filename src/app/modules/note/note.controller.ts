import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import { noteServices } from "./note.service";

const createNote = catchAsync(async (req, res, next) => {
  const file = req.file;

  let imageUrl = "";

  if (file) {
    const url = await uploadOnCloudinary(file.path, "notes");
    if (url) imageUrl = url;
  }

  const noteData = {
    ...req.body,
    image: imageUrl,
  };

  const result = await noteServices.createNoteIntoDB(noteData);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Note created successfully",
    data: result,
  });
});

const updateNote = catchAsync(async (req, res, next) => {
  const result = await noteServices.updateNoteInDB(
    req.params.id as string,
    req.file,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Note updated successfully",
    data: result,
  });
});

const getAllNote = catchAsync(async (req, res, next) => {
  const result = await noteServices.getAllNoteFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All notes retrieved successfully",
    data: result,
  });
});

const getSingleNote = catchAsync(async (req, res, next) => {
  const result = await noteServices.getSingleNoteFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Note retrieved successfully",
    data: result,
  });
});

const deleteNote = catchAsync(async (req, res, next) => {
  await noteServices.deleteNoteFromDB(req.params.id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Note deleted successfully",
    data: {},
  });
});

export const noteControllers = {
  createNote,
  getAllNote,
  getSingleNote,
  updateNote,
  deleteNote,
};
