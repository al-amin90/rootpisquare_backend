import { z } from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: "Note name is required",
      })
      .min(1),

    driveLink: z
      .string({
        message: "Drive link is required",
      })
      .url({
        message: "Invalid drive link",
      }),
  }),
});

export const updateNoteSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    driveLink: z.string().url().optional(),
    existingImage: z.string().optional(),
  }),
});

export const noteValidations = {
  createNoteSchema,
  updateNoteSchema,
};
