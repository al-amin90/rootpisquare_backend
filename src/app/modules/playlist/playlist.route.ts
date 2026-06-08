import { Router } from "express";

import { playlistValidations } from "./playlist.validation";
import { playlistControllers } from "./playlist.controller";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../middlewares/multer";
import { parseJsonBody } from "../../middlewares/parseJsonBody";

const router = Router();

router.post(
  "/",
  upload.fields([
    { name: "subjectImages", maxCount: 10 }, // matches subjects[] array by index
  ]),
  parseJsonBody(["subjects"]),
  validateRequest(playlistValidations.createPlaylistSchema),
  playlistControllers.createPlaylist,
);

router.get("/", playlistControllers.getAllPlaylist);

router.get("/:id", playlistControllers.getSinglePlaylist);

router.get("/classID/:id", playlistControllers.getPlaylistsByClassID);

router.patch(
  "/:id",
  upload.fields([{ name: "subjectImages", maxCount: 10 }]),
  parseJsonBody(["subjects"]),
  validateRequest(playlistValidations.updatePlaylistSchema),
  playlistControllers.updatePlaylist,
);

router.delete("/:id", playlistControllers.deletePlaylist);

export const playlistRouter = router;
