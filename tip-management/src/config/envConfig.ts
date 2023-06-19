import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

interface Config {
  port: String | undefined;
  db: String | undefined;
  dbString: String | undefined;
  env: String | undefined;
  accessSecret: jwt.Secret;
}
const config: Config = {
  port: process.env.PORT,
  db: process.env.DB_NAME,
  dbString: process.env.DB_CONNECTION,
  env: process.env.ENV,
  accessSecret:
    process.env.ACCESS_SECRET === undefined ? "" : process.env.ACCESS_SECRET,
};

export default config;
