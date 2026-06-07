import { z } from "zod";

export const createSubjectSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Subject name is required" })
      .min(1, { message: "Subject name cannot be empty" }),
  }),
});

export const updateSubjectSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
  }),
});

export const subjectValidations = {
  createSubjectSchema,
  updateSubjectSchema,
};
