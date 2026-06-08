import { z } from "zod";

export const createBatchSchema = z.object({
  body: z.object({
    title: z.string().min(1, {
      message: "Title is required",
    }),

    className: z.string({
      message: "Class is required",
    }),

    price: z.coerce.number({
      message: "Price is required",
    }),

    discountPersent: z.coerce.number().optional(),

    description: z.string().min(1, {
      message: "Description is required",
    }),

    slots: z.string().min(1, {
      message: "Slots is required",
    }),
  }),
});

export const updateBatchSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    className: z.string().optional(),
    price: z.coerce.number().optional(),
    discountPersent: z.coerce.number().optional(),
    description: z.string().optional(),
    slots: z.string().optional(),
    existingIcon: z.string().optional(),
  }),
});

export const batchValidations = {
  createBatchSchema,
  updateBatchSchema,
};
