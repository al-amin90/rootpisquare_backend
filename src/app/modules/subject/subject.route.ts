import { Router } from "express";

import { subjectValidations } from "./subject.validation";
import { subjectControllers } from "./subject.controller";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/",
  validateRequest(subjectValidations.createSubjectSchema),
  subjectControllers.createSubject,
);

router.get("/", subjectControllers.getAllSubject);

router.get("/:id", subjectControllers.getSingleSubject);

router.patch(
  "/:id",
  validateRequest(subjectValidations.updateSubjectSchema),
  subjectControllers.updateSubject,
);

router.delete("/:id", subjectControllers.deleteSubject);

export const subjectRouter = router;
