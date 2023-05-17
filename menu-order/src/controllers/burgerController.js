import * as helper from "../utils/helper.js";

export const getBurger = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    const burgerData = dbData.burger;
    res.send({ data: burgerData });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createBurgerItem = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    const burgerData = dbData.burger;
    const { name, price } = req.body;
    const isItemExist = burgerData.find(
      (order) =>
        order.name.trim().replaceAll(" ", "") ===
        name.trim().replaceAll(" ", "")
    );
    if (isItemExist)
      return res.status(200).send({ message: "Duplicate Item found" });
    const itemId = await helper.generateItemId("burger");
    burgerData.push({ itemId, name, price });
    await helper.writeDataInDb("burger", burgerData);
    return res.send({ data: burgerData });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteBurgerItem = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    let burgerData = dbData.burger;
    const { itemId } = req.body;
    const isItemExist = burgerData.find((order) => order.itemId === itemId);
    if (!isItemExist) return res.send({ message: "Item not found" });
    burgerData = burgerData.filter((order) => order.itemId !== itemId);
    await helper.writeDataInDb("burger", burgerData);
    res.send({ message: "Item Deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateBurgerItem = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    const burgerData = dbData.burger;
    const { itemId, name, price } = req.body;
    if (!itemId) return res.status(400).send({ message: "ItemId is missing" });
    const isItemExist = burgerData.find((order) => order.itemId === itemId);
    if (!isItemExist) return res.send({ message: "Item not found" });
    if (!name && !price)
      return res.status(400).send({ message: "Update Data is missing" });
    burgerData.find((food) => {
      if (food.itemId === itemId) {
        food.name = name ? name : food.name;
        food.price = price ? price : food.price;
      }
    });
    await helper.writeDataInDb("burger", burgerData);
    return res.status(200).send({ message: "Item updated Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
