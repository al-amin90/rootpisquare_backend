import { z } from "zod";

const subjectEntrySchema = z.object({
  subjectName: z
    .string({ message: "Subject name is required" })
    .min(1, { message: "Subject name cannot be empty" }),
  image: z.string().optional(),
  description: z.string().optional(),
});

export const createPlaylistSchema = z.object({
  body: z.object({
    className: z
      .string({ message: "Class name is required" })
      .min(1, { message: "Class name cannot be empty" }),
    subjects: z
      .array(subjectEntrySchema)
      .min(1, { message: "At least one subject is required" }),
  }),
});

export const updatePlaylistSchema = z.object({
  body: z.object({
    className: z.string().min(1).optional(),
    subjects: z.array(subjectEntrySchema).optional(),
  }),
});

export const playlistValidations = {
  createPlaylistSchema,
  updatePlaylistSchema,
};
