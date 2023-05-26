import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as helper from "../utils/helper.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const dbData = await helper.getFileData();
    const user = dbData.find((user) => user.email === email);
    if (!user) return res.status(404).send({ message: "Email not found" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return helper.handleResponseSend(res, "Password does not match", 401);
    const accessToken = jwt.sign(
      { name: user.name, email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    return helper.handleResponseSend(res, error.message, 500, { accessToken });
  } catch (error) {
    return helper.handleResponseSend(res, error.message, 500);
  }
};

export const signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const dbData = await helper.getFileData();
    const isEmailExist = dbData.find((user) => user.email === email);
    if (isEmailExist)
      return res.status(200).send({ message: "User already exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    dbData.push({ name, email, password: hashPassword });
    await helper.writeDataInDb(dbData, res);
    return helper.handleResponseSend(res, "User created Successfully", 200);
  } catch (error) {
    return helper.handleResponseSend(res, error.message, 500);
  }
};
