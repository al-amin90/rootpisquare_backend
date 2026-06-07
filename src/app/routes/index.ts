import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { classRouter } from "../modules/class/class.route";

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
  // {
  //   path: "/category",
  //   route: categoryRouter,
  // },
  // {
  //   path: "/color",
  //   route: colorRouter,
  // },
  // {
  //   path: "/product",
  //   route: productRouter,
  // },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
