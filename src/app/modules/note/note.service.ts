import status from "http-status";
import AppError from "../../errors/AppError";
import { deleteFromCloudinary } from "../../utils/cloudinary";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import type { TNote } from "./note.interface";
import { NoteModel } from "./note.model";

const createNoteIntoDB = async (payload: TNote) => {
  const result = await NoteModel.create(payload);

  return result;
};

const getAllNoteFromDB = async () => {
  return await NoteModel.find();
};

const getSingleNoteFromDB = async (id: string) => {
  return await NoteModel.findById(id);
};

const updateNoteInDB = async (
  id: string,
  file?: Express.Multer.File,
  payload?: Partial<TNote>,
) => {
  const note = await NoteModel.findById(id);

  if (!note) {
    throw new AppError(status.NOT_FOUND, "Note not found");
  }

  if (file) {
    const imageUrl = await uploadOnCloudinary(file.path, "notes");

    if (imageUrl) {
      if (note.image) {
        await deleteFromCloudinary(note.image);
      }

      payload!.image = imageUrl;
    }
  }

  delete payload?.existingImage;

  const result = await NoteModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteNoteFromDB = async (id: string) => {
  const note = await NoteModel.findById(id);

  if (!note) {
    throw new AppError(status.NOT_FOUND, "Note not found");
  }

  if (note.image) {
    await deleteFromCloudinary(note.image);
  }

  return await NoteModel.findByIdAndDelete(id);
};

export const noteServices = {
  createNoteIntoDB,
  getAllNoteFromDB,
  getSingleNoteFromDB,
  updateNoteInDB,
  deleteNoteFromDB,
};
