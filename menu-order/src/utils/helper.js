import dotenv from "dotenv";
import path from "path";
import * as fsPromise from "fs/promises";
import * as fs from "fs";

dotenv.config();

const dbPath = path.join(path.resolve(), process.env.DB_PATH);

export const getDbData = async () => {
  if (!fs.existsSync(dbPath)) {
    await fsPromise.writeFile(dbPath, "[]", { encoding: "utf-8" });
  }
  let dbData = await fsPromise.readFile(dbPath, { encoding: "utf-8" });
  return (dbData = JSON.parse(dbData));
};

export const generateItemId = async (foodItem) => {
  const dbData = await getDbData();
  const foodItemData = dbData[foodItem];
  if (foodItemData.length === 0) return 1000;
  return foodItemData[foodItemData.length - 1].itemId + 1;
};

export const writeDataInDb = async (foodItem, foodItemData) => {
  try {
    const dbData = await getDbData();
    dbData[foodItem] = foodItemData;
    await fsPromise.writeFile(dbPath, JSON.stringify(dbData), {
      encoding: "utf-8",
    });
  } catch (error) {
    throw error.message;
  }
};
