import * as express from "express";

import * as pastaController from "../controllers/pastaController.js";

const pastaRouter = express.Router();

pastaRouter.get("/item", pastaController.getPasta);

pastaRouter.post("/item", pastaController.createPastaItem);

pastaRouter.delete("/item", pastaController.deletePastaItem);

pastaRouter.patch("/item", pastaController.updatePastaItem);

export default pastaRouter;
