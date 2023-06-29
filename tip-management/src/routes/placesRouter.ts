import express from "express";

import catchWraper from "../utils/catchWraper";
import verfiyJwtToken from "../middlewares/verifyJwt";
import validate from "../middlewares/validation";

import * as placesValidation from "../validation/placesValidationSchema";
import * as placesController from "../controllers/placesController";

const placesRouter = express.Router();

placesRouter.post(
  "/",
  validate(placesValidation.creatPlaceSchema),
  verfiyJwtToken,
  catchWraper(placesController.createPlace)
);
placesRouter.get(
  "/tips/",
  verfiyJwtToken,
  catchWraper(placesController.getTipsOfUser)
);
placesRouter.get(
  "/repeated-tip/",
  verfiyJwtToken,
  catchWraper(placesController.getTipsOfUser)
);
placesRouter.get(
  "/repeated-place/",
  validate(placesValidation.getRepeatedPlaces),
  verfiyJwtToken,
  catchWraper(placesController.getRepeatedPlacesByUser)
);
placesRouter.get(
  "/repeated-tip-percent/",
  validate(placesValidation.getRepeatedPlaces),
  verfiyJwtToken,
  catchWraper(placesController.getRepeatedTipPercentage)
);

export default placesRouter;
