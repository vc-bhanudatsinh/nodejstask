import * as express from "express";

import * as burgerController from "../controllers/burgerController.js";

const burgerRouter = express.Router();

burgerRouter.get("/item", burgerController.getBurger);

burgerRouter.post("/item", burgerController.createBurgerItem);

burgerRouter.delete("/item", burgerController.deleteBurgerItem);

burgerRouter.patch("/item", burgerController.updateBurgerItem);

export default burgerRouter;
