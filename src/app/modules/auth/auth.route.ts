import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authControllers } from "./auth.controller";
import { authValidation } from "./auth.validation";

const router = Router();

// router.post(
//   "/register",
//   validateRequest(authValidation.registerTenantValidationSchema),
//   authControllers.registerTenant,
// );

router.post(
  "/login",
  validateRequest(authValidation.LoginBodyValidationSchema),
  authControllers.loginUser,
);

router.get("/stats", authControllers.getDashboardStats);

export const authRouter = router;
