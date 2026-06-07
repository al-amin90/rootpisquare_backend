import AppError from "../../errors/AppError";

import config from "../../config";
import { createToken } from "./auth.utils";
import type { LoginBody } from "./auth.interface";

// const registerTenantRequest = async (payload: TRegisterTenant) => {
//   const { subdomain } = payload;

//   const centralConn = dbManager.getCentralConnection();

//   if (!centralConn) throw new AppError(500, "Central DB not available");

//   const TenantRequest = ModelFactory.getModel(centralConn, "TenantRequest");

//   const existing = await TenantRequest.findOne({
//     subdomain: subdomain,
//   });

//   if (existing) {
//     throw new AppError(409, `This subdomain is already registered`);
//   }

//   const request = await TenantRequest.create(payload);

//   return request;
// };

const loginUser = async (payload: LoginBody) => {
  const { email, password, subdomain } = payload;

  const envEmail = config.single_admin_email;
  const envPassword = config.single_admin_password;

  if (!envEmail || !envPassword) {
    throw new AppError(404, "No Admin Credential");
  }

  if (email === envEmail && password === envPassword) {
    const jwtPayload = {
      id: null,
      email: envEmail as string,
      role: "super_admin",
      subdomain: "bazar",
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt.access_token as string,
      config.jwt.access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt.refresh_token as string,
      config.jwt.refresh_expires_in as string,
    );

    return {
      accessToken,
      refreshToken,
      // needsPasswordChange: user.needsPasswordChange,
    };
  }

  // const UserModel = ModelFactory.getModel<IUser>(
  //   tenantConn,
  //   "User",
  // ) as IUserModel;

  // const user = await UserModel.findOne({ email }).select("+password");

  // if (!user) {
  //   throw new AppError(403, "Invalid email or password");
  // }

  // if (!user.isActive) {
  //   throw new AppError(403, "Your account has been deactivated.");
  // }

  // if (!(await UserModel.isPasswordMatch(password, user.password))) {
  //   throw new AppError(401, "Invalid credentials");
  // }

  // const jwtPayload = {
  //   id: user._id,
  //   email: user.email,
  //   role: user?.role || null,
  // };

  // const accessToken = createToken(
  //   jwtPayload,
  //   config.jwt.access_token as string,
  //   config.jwt.access_expires_in as string,
  // );

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.jwt.refresh_token as string,
  //   config.jwt.refresh_expires_in as string,
  // );

  // return {
  //   accessToken,
  //   refreshToken,
  //   // needsPasswordChange: user.needsPasswordChange,
  // };
};

export const authServices = {
  loginUser,
};
