import type { TClass } from "./class.interface";
import { ClassModel } from "./class.model";

const createClassIntoDB = async (payload: TClass) => {
  const result = await ClassModel.create(payload);
  return result;
};

const getAllClassFromDB = async () => {
  const result = await ClassModel.find();
  return result;
};

const getSingleClassFromDB = async (id: string) => {
  const result = await ClassModel.findById(id);
  return result;
};

const updateClassInDB = async (id: string, payload: TClass) => {
  const result = await ClassModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteClassFromDB = async (id: string) => {
  const result = await ClassModel.findByIdAndDelete(id);
  return result;
};

export const classServices = {
  createClassIntoDB,
  getAllClassFromDB,
  getSingleClassFromDB,
  updateClassInDB,
  deleteClassFromDB,
};
