import { Router } from "express";

import { playlistValidations } from "./playlist.validation";
import { playlistControllers } from "./playlist.controller";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../middlewares/multer";

const router = Router();

router.post(
  "/",
  upload.fields([
    { name: "subjectImages", maxCount: 10 }, // matches subjects[] array by index
  ]),
  validateRequest(playlistValidations.createPlaylistSchema),
  playlistControllers.createPlaylist,
);

router.get("/", playlistControllers.getAllPlaylist);

router.get("/:id", playlistControllers.getSinglePlaylist);

router.patch(
  "/:id",
  upload.fields([{ name: "subjectImages", maxCount: 10 }]),
  validateRequest(playlistValidations.updatePlaylistSchema),
  playlistControllers.updatePlaylist,
);

router.delete("/:id", playlistControllers.deletePlaylist);

export const playlistRouter = router;
