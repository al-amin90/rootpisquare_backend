// middlewares/parseJsonBody.ts
import type { NextFunction, Request, Response } from "express";

export const parseJsonBody = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fields.forEach((field) => {
        if (req.body[field] && typeof req.body[field] === "string") {
          req.body[field] = JSON.parse(req.body[field]);
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
