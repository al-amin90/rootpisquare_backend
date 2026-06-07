export type TSubjectEntry = {
  subjectName: string;
  image: string;
  description: string;
};

export type TPlaylist = {
  className: string;
  subjects: TSubjectEntry[];
};
