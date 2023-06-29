import mongoose from "mongoose";
import config from "../config/envConfig";

const url = `${config.dbString}/${config.db}`;

const dbConnection = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB is connected successfully");
  } catch (error) {
    console.log("error", error);
  }
};

export default dbConnection;
