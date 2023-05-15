import express from "express";
import * as multer from "../middlewares/multer.js";
import * as employeeController from "../controllers/employeeController.js";

const employeeRouter = express.Router();

employeeRouter.post(
  "/create",
  multer.uploadMulter,
  employeeController.createEmployee
);

employeeRouter.patch(
  "/",
  multer.uploadMulter,
  employeeController.updateEmployeeById
);
employeeRouter.delete("/", employeeController.deleteEmployeeById);
employeeRouter.get("/", employeeController.getAllEmployee);
employeeRouter.get("/:empId", employeeController.getEmployeeById);

export default employeeRouter;
