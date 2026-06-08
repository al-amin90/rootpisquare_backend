import { Types } from "mongoose";

export type TVideo = {
  className: Types.ObjectId;
  subjectName: Types.ObjectId;
  youtubeURL: string;
  name: string;
};
