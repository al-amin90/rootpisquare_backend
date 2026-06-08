import { model, Schema } from "mongoose";
import type { TNote } from "./note.interface";

const noteSchema = new Schema<TNote>({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: String,
    required: true,
  },

  driveLink: {
    type: String,
    required: true,
  },
});

export const NoteModel = model<TNote>("Note", noteSchema);
