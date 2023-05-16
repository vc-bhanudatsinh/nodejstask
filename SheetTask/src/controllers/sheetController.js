import * as helper from "../utils/helper.js";
export const addUser = async (req, res, next) => {
  try {
    const { name, email, sheetName, id } = req.body;
    if (!name || !email || !sheetName || !id)
      return res.status(400).send({ message: "Some Body Params are missing" });
    if (isNaN(id) || typeof id === "string")
      return res.status(400).send({ message: "id should be number only" });
    const dbData = await helper.getFileData();
    const sheetData = dbData.filter((user) => user.sheetName === sheetName);
    console.log("sheetData", sheetData);
    if (sheetData === []) {
      dbData.push({ sheetName, name, email, id });
      await helper.writeDataInDb(dbData, res);
      return res.status(200).send({ message: "User added Successfully" });
    }
    const emailData = sheetData.find((user) => user.email === email);
    if (emailData)
      return res.status(409).send({ message: "Email already exists" });
    const idData = sheetData.find((user) => user.id === id);
    if (idData) return res.status(409).send({ message: "id already exists" });
    dbData.push({ sheetName, name, email, id });
    await helper.writeDataInDb(dbData, res);
    res.send({ message: "User added Successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const dbData = await helper.getFileData();
    return res.status(200).send({ data: dbData });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ message: error.message });
  }
};
