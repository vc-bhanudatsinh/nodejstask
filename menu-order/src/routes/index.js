import * as express from "express";

import pizzaRouter from "./pizzaRoutes.js";
import pastaRouter from "./pastaRoutes.js";
import burgerRouter from "./burgerRoutes.js";

const router = express.Router();

router.use("/pizza", pizzaRouter);
router.use("/pasta", pastaRouter);
router.use("/burger", burgerRouter);

export default router;
