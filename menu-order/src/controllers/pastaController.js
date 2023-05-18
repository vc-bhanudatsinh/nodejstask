import * as helper from "../utils/helper.js";

export const getPasta = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    const pastaData = dbData.pasta;
    res.send({ data: pastaData });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createPastaItem = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    const pastaData = dbData.pasta;
    const { name, price } = req.body;
    const isItemExist = pastaData.find(
      (order) =>
        order.name.trim().replaceAll(" ", "") ===
        name.trim().replaceAll(" ", "")
    );
    if (isItemExist)
      return res.status(200).send({ message: "Duplicate Item found" });
    const itemId = await helper.generateItemId("pasta");
    pastaData.push({ itemId, name, price });
    await helper.writeDataInDb("pasta", pastaData);
    return res.send({ data: pastaData });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deletePastaItem = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    let pastaData = dbData.pasta;
    const { itemId } = req.body;
    const isItemExist = pastaData.find((order) => order.itemId === itemId);
    if (!isItemExist) return res.send({ message: "Item not found" });
    pastaData = pastaData.filter((order) => order.itemId !== itemId);
    await helper.writeDataInDb("pasta", pastaData);
    res.send({ message: "Item Deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updatePastaItem = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    const pastaData = dbData.pasta;
    const { itemId, name, price } = req.body;
    if (!itemId) return res.status(400).send({ message: "ItemId is missing" });
    const isItemExist = pastaData.find((order) => order.itemId === itemId);
    if (!isItemExist) return res.send({ message: "Item not found" });
    if (!name && !price)
      return res.status(400).send({ message: "Update Data is missing" });
    pastaData.find((food) => {
      if (food.itemId === itemId) {
        food.name = name ? name : food.name;
        food.price = price ? price : food.price;
      }
    });
    await helper.writeDataInDb("pasta", pastaData);
    return res.status(200).send({ message: "Item updated Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
