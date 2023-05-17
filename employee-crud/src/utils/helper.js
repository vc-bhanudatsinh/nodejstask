import path from "path";
import * as fsPromise from "fs/promises";
import * as fs from "fs";

const dbPath = path.join(path.resolve(), process.env.DB_PATH);

export const getDbData = async () => {
  if (!fs.existsSync(dbPath)) {
    await fsPromise.writeFile(dbPath, "[]", { encoding: "utf-8" });
  }
  let dbData = await fsPromise.readFile(dbPath, { encoding: "utf-8" });
  return (dbData = JSON.parse(dbData));
};

export const generateId = async () => {
  const dbData = await getDbData();
  if (dbData.length === 0) return 1000;
  return dbData[dbData.length - 1].empId + 1;
};

export const writeDataInDb = async (data) => {
  try {
    await fsPromise.writeFile(dbPath, JSON.stringify(data), {
      encoding: "utf-8",
    });
  } catch (error) {
    throw error.message;
  }
};
