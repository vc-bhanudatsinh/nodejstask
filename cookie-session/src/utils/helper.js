import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";

const dbPath = path.join(path.resolve(), "./db/db.json");
export const getUserDb = async () => {
  try {
    if (!fs.existsSync(dbPath)) {
      await fsPromises.writeFile(dbPath, "[]", { encoding: "utf-8" });
    }
    const fileData = await fsPromises.readFile(dbPath, { encoding: "utf-8" });
    return JSON.parse(fileData);
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const writDataInDb = async (data) => {
  try {
    return await fsPromises.writeFile(dbPath, JSON.stringify(data), {
      encoding: "utf-8",
    });
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
