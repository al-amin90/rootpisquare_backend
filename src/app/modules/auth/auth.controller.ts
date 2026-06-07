/* eslint-disable @typescript-eslint/no-unused-vars */

import sendResponse from "../../utils/SendResponse";

import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import config from "../../config";

// const registerTenant = catchAsync(async (req, res, next) => {
//   const result = await authServices.registerTenantRequest(req.body);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Your Request is successful",
//     data: result,
//   });
// });

const loginUser = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUser(req.body);

  if (!result) {
    throw new Error("Login failed");
  }

  const { refreshToken, accessToken } = result;

  res.cookie("accessToken", accessToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User is logged in Successfully!",
    data: {
      accessToken,
      //   needsPasswordChange,
    },
  });
});

export const authControllers = {
  loginUser,
  // registerTenant,
};
