import type { TSubject } from "./subject.interface";
import { SubjectModel } from "./subject.model";

const createSubjectIntoDB = async (payload: TSubject) => {
  const result = await SubjectModel.create(payload);
  return result;
};

const getAllSubjectFromDB = async () => {
  const result = await SubjectModel.find();
  return result;
};

const getSingleSubjectFromDB = async (id: string) => {
  const result = await SubjectModel.findById(id);
  return result;
};

const updateSubjectInDB = async (id: string, payload: TSubject) => {
  const result = await SubjectModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSubjectFromDB = async (id: string) => {
  const result = await SubjectModel.findByIdAndDelete(id);
  return result;
};

export const subjectServices = {
  createSubjectIntoDB,
  getAllSubjectFromDB,
  getSingleSubjectFromDB,
  updateSubjectInDB,
  deleteSubjectFromDB,
};
