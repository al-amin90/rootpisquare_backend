import { model, Schema } from "mongoose";
import type { TVideo } from "./video.interface";

const videoSchema = new Schema<TVideo>({
  className: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },

  subjectName: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },

  youtubeURL: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
});

videoSchema.index(
  {
    className: 1,
    subjectName: 1,
    youtubeURL: 1,
  },
  {
    unique: true,
  },
);

export const VideoModel = model<TVideo>("Video", videoSchema);
