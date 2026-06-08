import { model, Schema } from "mongoose";
import { type TPlaylist, type TSubjectEntry } from "./playlist.interface";

const subjectEntrySchema = new Schema<TSubjectEntry>({
  subjectName: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

const playlistSchema = new Schema<TPlaylist>({
  className: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
    index: true,
  },
  subjects: [subjectEntrySchema],
});

export const PlaylistModel = model<TPlaylist>("Playlist", playlistSchema);
