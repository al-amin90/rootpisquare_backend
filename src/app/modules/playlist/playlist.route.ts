import { Router } from "express";

import { playlistValidations } from "./playlist.validation";
import { playlistControllers } from "./playlist.controller";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/",

  validateRequest(playlistValidations.createPlaylistSchema),
  playlistControllers.createPlaylist,
);

router.get("/", playlistControllers.getAllPlaylist);

router.get("/:id", playlistControllers.getSinglePlaylist);

router.patch(
  "/:id",
  validateRequest(playlistValidations.updatePlaylistSchema),
  playlistControllers.updatePlaylist,
);

router.delete("/:id", playlistControllers.deletePlaylist);

export const playlistRouter = router;
