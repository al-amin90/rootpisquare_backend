import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { videoValidations } from "./video.validation";
import { videoControllers } from "./video.controller";

const router = Router();

router.post(
  "/",
  validateRequest(videoValidations.createVideoSchema),
  videoControllers.createVideo,
);

router.get("/", videoControllers.getAllVideo);

router.get("/:id", videoControllers.getSingleVideo);

router.patch(
  "/:id",
  validateRequest(videoValidations.updateVideoSchema),
  videoControllers.updateVideo,
);

router.delete("/:id", videoControllers.deleteVideo);

export const videoRouter = router;
