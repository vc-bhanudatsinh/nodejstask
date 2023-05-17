import * as helper from "../utils/helper.js";

export const getPizza = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    const pizzaData = dbData.pizza;
    res.send({ data: pizzaData });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createPizzaItem = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    const pizzaData = dbData.pizza;
    const { name, price } = req.body;
    const isItemExist = pizzaData.find(
      (order) =>
        order.name.trim().replaceAll(" ", "") ===
        name.trim().replaceAll(" ", "")
    );
    if (isItemExist)
      return res.status(200).send({ message: "Duplicate Item found" });
    const itemId = await helper.generateItemId("pizza");
    pizzaData.push({ itemId, name, price });
    await helper.writeDataInDb("pizza", pizzaData);
    return res.send({ message: "Item Added Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deletePizzaItem = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    let pizzaData = dbData.pizza;
    const { itemId } = req.body;
    const isItemExist = pizzaData.find((order) => order.itemId === itemId);
    if (!isItemExist) return res.send({ message: "Item not found" });
    pizzaData = pizzaData.filter((order) => order.itemId !== itemId);
    await helper.writeDataInDb("pizza", pizzaData);
    return res.send({ message: "Item Deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updatePizzaItem = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    const pizzaData = dbData.pizza;
    const { itemId, name, price } = req.body;
    if (!itemId) return res.status(400).send({ message: "ItemId is missing" });
    const isItemExist = pizzaData.find((order) => order.itemId === itemId);
    if (!isItemExist) return res.send({ message: "Item not found" });
    if (!name && !price)
      return res.status(400).send({ message: "Update Data is missing" });
    pizzaData.find((food) => {
      if (food.itemId === itemId) {
        food.name = name ? name : food.name;
        food.price = price ? price : food.price;
      }
    });
    await helper.writeDataInDb("pizza", pizzaData);
    return res.status(200).send({ message: "Item updated Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
