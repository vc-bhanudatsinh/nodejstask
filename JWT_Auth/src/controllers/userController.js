import * as helper from "../utils/helper.js";

export const getUser = async (req, res, next) => {
  try {
    let dbData = await helper.getFileData();

    dbData = dbData.map((user) => {
      delete user["password"];
      return user;
    });
    return handleResponseSend(res, "User Fetched Successfully", 200, dbData);
  } catch (error) {
    return helper.handleResponseSend(res, error.message, 500);
  }
};
