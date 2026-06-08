import { Router } from "express";
import { upload } from "../../middlewares/multer";
import validateRequest from "../../middlewares/validateRequest";
import { noteControllers } from "./note.controller";
import { noteValidations } from "./note.validation";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  validateRequest(noteValidations.createNoteSchema),
  noteControllers.createNote,
);

router.get("/", noteControllers.getAllNote);

router.get("/:id", noteControllers.getSingleNote);

router.patch(
  "/:id",
  upload.single("image"),
  validateRequest(noteValidations.updateNoteSchema),
  noteControllers.updateNote,
);

router.delete("/:id", noteControllers.deleteNote);

export const noteRouter = router;
