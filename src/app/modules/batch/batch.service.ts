import status from "http-status";
import AppError from "../../errors/AppError";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary";
import type { TBatch } from "./batch.interface";
import { BatchModel } from "./batch.model";

const createBatchIntoDB = async (payload: TBatch) => {
  const result = await BatchModel.create(payload);
  return result;
};
const updateBatchInDB = async (
  id: string,
  file?: Express.Multer.File,
  payload?: Partial<TBatch> & {
    existingIcon?: string;
  },
) => {
  const batch = await BatchModel.findById(id);

  if (!batch) {
    throw new AppError(status.NOT_FOUND, "Batch not found");
  }

  if (payload?.price) {
    payload.price = Number(payload.price);
  }

  if (payload?.discountPersent) {
    payload.discountPersent = Number(payload.discountPersent);
  }

  if (file) {
    const iconUrl = await uploadOnCloudinary(file.buffer, "batch");

    if (iconUrl) {
      if (batch.icon) {
        await deleteFromCloudinary(batch.icon);
      }

      payload!.icon = iconUrl;
    }
  }

  delete payload?.existingIcon;

  const result = await BatchModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getAllBatchFromDB = async () => {
  const result = await BatchModel.find().populate("className");

  return result;
};

const getSingleBatchFromDB = async (id: string) => {
  const result = await BatchModel.findById(id).populate("className");

  return result;
};

const deleteBatchFromDB = async (id: string) => {
  const batch = await BatchModel.findById(id);

  if (!batch) {
    throw new AppError(status.NOT_FOUND, "Batch not found");
  }

  if (batch.icon) {
    await deleteFromCloudinary(batch.icon);
  }

  return await BatchModel.findByIdAndDelete(id);
};

export const batchServices = {
  createBatchIntoDB,
  getAllBatchFromDB,
  getSingleBatchFromDB,
  updateBatchInDB,
  deleteBatchFromDB,
};
