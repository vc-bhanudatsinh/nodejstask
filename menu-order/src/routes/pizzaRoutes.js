import * as express from "express";

import * as pizzaController from "../controllers/pizzaController.js";

const pizzaRouter = express.Router();

pizzaRouter.get("/getitem", pizzaController.getPizza);

pizzaRouter.post("/createitem", pizzaController.createPizzaItem);

pizzaRouter.delete("/deleteitem", pizzaController.deletePizzaItem);

pizzaRouter.patch("/updateitem", pizzaController.updatePizzaItem);

export default pizzaRouter;
