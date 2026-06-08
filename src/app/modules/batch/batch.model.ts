import { model, Schema } from "mongoose";
import type { TBatch } from "./batch.interface";

const batchSchema = new Schema<TBatch>({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  className: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discountPersent: {
    type: Number,
    default: 0,
  },

  description: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: true,
  },

  slots: {
    type: String,
    required: true,
  },
});

export const BatchModel = model<TBatch>("Batch", batchSchema);
