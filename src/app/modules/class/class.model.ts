import { model, Schema } from "mongoose";
import type { TClass } from "./class.interface";

const classSchema = new Schema<TClass>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

export const ClassModel = model<TClass>("Class", classSchema);
