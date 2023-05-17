import * as express from "express";

import * as pizzaController from "../controllers/pizzaController.js";

const pizzaRouter = express.Router();

pizzaRouter.get("/item", pizzaController.getPizza);

pizzaRouter.post("/item", pizzaController.createPizzaItem);

pizzaRouter.delete("/item", pizzaController.deletePizzaItem);

pizzaRouter.patch("/item", pizzaController.updatePizzaItem);

export default pizzaRouter;
