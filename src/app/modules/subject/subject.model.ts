import { Schema } from "mongoose";
import { model } from "mongoose";
import type { TSubject } from "./subject.interface";

const subjectSchema = new Schema<TSubject>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

export const SubjectModel = model<TSubject>("Subject", subjectSchema);
