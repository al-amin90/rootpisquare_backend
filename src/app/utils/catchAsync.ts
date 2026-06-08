import type { NextFunction, Request, RequestHandler, Response } from "express";
import fs from "fs";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      // Handle multer file errors properly
      if (req.files) {
        // If it's an object from upload.fields()
        if (typeof req.files === "object" && !Array.isArray(req.files)) {
          const filesObject = req.files as {
            [fieldname: string]: Express.Multer.File[];
          };
          Object.values(filesObject).forEach((files) => {
            files?.forEach((file) => {
              // Clean up uploaded files if there's an error
              if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
              }
            });
          });
        }
        // If it's an array from upload.array()
        else if (Array.isArray(req.files)) {
          req.files.forEach((file) => {
            if (file.path && fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
        }
      }

      // Handle single file
      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      next(err);
    });
  };
};

export default catchAsync;
