import express from "express";
import dotenv from "dotenv";

import router from "./routes/index.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);
app.listen(port, () => console.log(`Server is running on ${port}`));
