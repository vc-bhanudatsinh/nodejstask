import bcrypt from "bcryptjs";
import path from "path";
import * as helper from "../utils/helper.js";

export const signUp = async (req, res) => {
  try {
    const sessionId = req.cookies["connect.sid"];
    if (req.session.user && sessionId)
      return res.status(200).send({ message: "You are already logged In" });
    const { email, password, name, phoneNo } = req.body;
    console.log("email", email, name, password, phoneNo);
    if (!email || !password || !name || !phoneNo)
      return res.status(400).send({ message: "Some Body Params are missing" });
    req.session.user = {
      name,
      email,
      id: Math.random() * 1000,
    };
    const userData = await helper.getUserDb();
    const isUserExist = userData.find((user) => user.email === email);
    if (isUserExist)
      return res.status(409).send({ message: "User already exists" });
    // const user = { email, phoneNo, name, password };
    req.session["user"] = { email, name };
    const hashPassword = await bcrypt.hash(password, 10);
    userData.push({ name, email, password: hashPassword, phoneNo });
    await helper.writDataInDb(userData);
    return res.status(200).send({ message: "Sign Up Successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const sessionId = req.cookies["connect.sid"];
    console.log("req.session.user", req.session.user);
    if (!req.session.user && !sessionId)
      return res.status(403).send({ message: "Please Log-In First" });
    const userData = await helper.getUserDb();
    console.log("req.session.user", req.session.user.email);
    const user = userData.find((user) => {
      if (user.email === req.session.user.email) {
        delete user.password;
        return user;
      }
    });
    console.log("user", user);
    return res.status(200).send({ data: user });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export const renderLogin = async (req, res) => {
  try {
    res
      .status(200)
      .sendFile(path.join(path.resolve(), "./src/public/login.html"));
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: error.message });
  }
};

export const renderDashboard = async (req, res) => {
  try {
    res
      .status(200)
      .sendFile(path.join(path.resolve(), "./src/public/home.html"));
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const sessionId = req.cookies["connect.sid"];
    console.log("user logged in already", req.session.user);
    if (req.session.user && sessionId)
      return res.status(200).send({ message: "You are already logged In" });

    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: "Some Body Params are missing" });

    const getUserDb = await helper.getUserDb();
    const userFound = getUserDb.find((user) => (user.email = email));
    if (!userFound) return res.status(404).send({ message: "No User found" });

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    console.log("isPasswordMatch", isPasswordMatch);
    if (!isPasswordMatch)
      return res.status(403).send({ message: "Password is incorrect" });

    req.session["user"] = { email: userFound.email, name: userFound.name };

    return res.status(200).redirect("dashboard");
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message: error.message,
    });
  }
};
