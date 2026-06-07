import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,

  single_admin_email: process.env.SINGLE_ADMIN_EMAIL,
  single_admin_password: process.env.SINGLE_ADMIN_PASSWORD,

  cloudinary_url: process.env.CLOUDINARY_URL,

  db_url: process.env.DB_URL,

  jwt: {
    access_token: process.env.JWT_ACCESS_TOKEN as string,
    refresh_token: process.env.JWT_REFRESH_TOKEN as string,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,
  },
};
