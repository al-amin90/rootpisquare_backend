import { z } from "zod";

export const createVideoSchema = z.object({
  body: z.object({
    className: z.string({
      message: "Class is required",
    }),

    subjectName: z.string({
      message: "Subject is required",
    }),

    youtubeURL: z.string({
      message: "Youtube URL is required",
    }),

    name: z
      .string({
        message: "Video name is required",
      })
      .min(1, {
        message: "Video name cannot be empty",
      }),
  }),
});

export const updateVideoSchema = z.object({
  body: z.object({
    className: z.string().optional(),
    subjectName: z.string().optional(),
    youtubeURL: z.string().optional(),
    name: z.string().min(1).optional(),
  }),
});

export const videoValidations = {
  createVideoSchema,
  updateVideoSchema,
};
