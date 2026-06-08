import type { Types } from "mongoose";

export type TSubjectEntry = {
  subjectName: Types.ObjectId;
  image: string;
  description: string;
};

export type TPlaylist = {
  className: Types.ObjectId;
  subjects: TSubjectEntry[];
};
