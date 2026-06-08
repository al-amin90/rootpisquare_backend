import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { classRouter } from "../modules/class/class.route";
import { subjectRouter } from "../modules/subject/subject.route";
import { playlistRouter } from "../modules/playlist/playlist.route";
import { batchRouter } from "../modules/batch/batch.route";
import { videoRouter } from "../modules/video/video.route";
import { noteRouter } from "../modules/note/note.route";

const router = Router();

const moduleRouters = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/class",
    route: classRouter,
  },
  {
    path: "/subject",
    route: subjectRouter,
  },
  {
    path: "/playlist",
    route: playlistRouter,
  },
  {
    path: "/batch",
    route: batchRouter,
  },
  {
    path: "/video",
    route: videoRouter,
  },
  {
    path: "/note",
    route: noteRouter,
  },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
