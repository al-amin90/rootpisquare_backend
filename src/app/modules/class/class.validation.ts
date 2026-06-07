import { z } from "zod";

export const createClassSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Class name is required" })
      .min(1, { message: "Class name cannot be empty" }),
  }),
});

export const updateClassSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
  }),
});

export const classValidations = {
  createClassSchema,
  updateClassSchema,
};
