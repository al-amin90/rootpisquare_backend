import { model, Schema } from "mongoose";
import { type TPlaylist, type TSubjectEntry } from "./playlist.interface";

const subjectEntrySchema = new Schema<TSubjectEntry>({
  subjectName: {
    type: String,
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
    type: String,
    required: true,
    index: true,
  },
  subjects: [subjectEntrySchema],
});

export const PlaylistModel = model<TPlaylist>("Playlist", playlistSchema);
