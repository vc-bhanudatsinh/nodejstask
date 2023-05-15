import * as express from "express";

import * as burgerController from "../controllers/burgerController.js";

const burgerRouter = express.Router();

burgerRouter.get("/getitem", burgerController.getBurger);

burgerRouter.post("/createitem", burgerController.createBurgerItem);

burgerRouter.delete("/deleteitem", burgerController.deleteBurgerItem);

burgerRouter.patch("/updateitem", burgerController.updateBurgerItem);

export default burgerRouter;
