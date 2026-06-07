import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { classValidations } from "./class.validation";
import { classControllers } from "./class.controller";

const router = Router();

router.post(
  "/",
  validateRequest(classValidations.createClassSchema),
  classControllers.createClass,
);

router.get("/", classControllers.getAllClass);

router.get("/:id", classControllers.getSingleClass);

router.patch(
  "/:id",
  validateRequest(classValidations.updateClassSchema),
  classControllers.updateClass,
);

router.delete("/:id", classControllers.deleteClass);

export const classRouter = router;
