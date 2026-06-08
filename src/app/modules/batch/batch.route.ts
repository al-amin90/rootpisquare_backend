import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../middlewares/multer";
import { batchControllers } from "./batch.controller";
import { batchValidations } from "./batch.validation";

const router = Router();

router.post(
  "/",
  upload.single("icon"),
  validateRequest(batchValidations.createBatchSchema),
  batchControllers.createBatch,
);

router.get("/", batchControllers.getAllBatch);

router.get("/:id", batchControllers.getSingleBatch);

router.patch(
  "/:id",
  upload.single("icon"),
  validateRequest(batchValidations.updateBatchSchema),
  batchControllers.updateBatch,
);

router.delete("/:id", batchControllers.deleteBatch);

export const batchRouter = router;
