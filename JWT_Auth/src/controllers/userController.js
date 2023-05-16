import * as helper from "../utils/helper.js";

export const getUser = async (req, res, next) => {
  try {
    let dbData = await helper.getFileData();

    dbData = dbData.map((user) => {
      delete user["password"];
      return user;
    });
    return res.status(200).send({ data: dbData });
  } catch (error) {
    return helper.handleResponseSend(res, error.message, 500);
  }
};
