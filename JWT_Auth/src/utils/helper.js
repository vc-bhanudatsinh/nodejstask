import * as fs from "fs";
import * as fsPromise from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const dbFilePath = process.env.DB_PATH;

export const handleResponseSend = async (res, message, code, data = []) => {
  return res.status(code).send({ message, data });
};

export const getFileData = async (res) => {
  try {
    // check file exists or not
    if (!fs.existsSync(dbFilePath)) {
      // create a file for user data
      await fsPromise.writeFile(dbFilePath, "[]", { encoding: "utf-8" });
    }

    // return users data from file.
    const fileData = await fsPromise.readFile(dbFilePath, {
      encoding: "utf-8",
    });
    return JSON.parse(fileData);
  } catch (error) {
    return handleResponseSend(res, error.message, 500);
  }
};

export const writeDataInDb = async (data, res) => {
  try {
    return await fsPromise.writeFile(dbFilePath, JSON.stringify(data), {
      encoding: "utf-8",
    });
  } catch (error) {
    return handleResponseSend(res, error.message, 500);
  }
};
