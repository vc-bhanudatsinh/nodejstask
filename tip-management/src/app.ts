import express from "express";
import config from "./config/envConfig";
import dbConnection from "./db/connection";
import router from "./routes/index";
import { errorConverter, errorHandler } from "./middlewares/error";
const app = express();

app.use(express.json({ limit: "5kb" }));
app.use("/api", router);

app.use(async (req, res) => {
  return res
    .status(404)
    .send({ statusCode: 404, message: "NOT FOUND", data: [] });
});
app.use(errorConverter);
app.use(errorHandler);
dbConnection();
app.listen(config.port, () =>
  console.log("Server is running on port", config.port)
);
