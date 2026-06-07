import { Router } from "express";

const router = Router();

const moduleRouters = [
  // {
  //   path: "/auth",
  //   route: authRouter,
  // },
  // {
  //   path: "/user",
  //   route: userRouter,
  // },
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
