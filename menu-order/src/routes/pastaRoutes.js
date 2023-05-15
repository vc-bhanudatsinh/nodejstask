import * as express from "express";

import * as pastaController from "../controllers/pastaController.js";

const pastaRouter = express.Router();

pastaRouter.get("/getitem", pastaController.getPasta);

pastaRouter.post("/createitem", pastaController.createPastaItem);

pastaRouter.delete("/deleteitem", pastaController.deletePastaItem);

pastaRouter.patch("/updateitem", pastaController.updatePastaItem);

export default pastaRouter;
