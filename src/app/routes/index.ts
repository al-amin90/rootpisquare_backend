import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { classRouter } from "../modules/class/class.route";
import { subjectRouter } from "../modules/subject/subject.route";
import { playlistRouter } from "../modules/playlist/playlist.route";
import { batchRouter } from "../modules/batch/batch.route";

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
  // {
  //   path: "/product",
  //   route: productRouter,
  // },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
