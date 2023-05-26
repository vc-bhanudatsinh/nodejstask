import express from "express";
import cors from "cors";
import path from "path";
import session from "express-session";
import sessionStoreFile from "session-file-store";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";
const storeFile = sessionStoreFile(session);
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(cookieParser());
const getCookieSecret = () => {
  return JSON.stringify(Math.round(Math.random() * 100000 + Date.now()));
};
app.use(
  session({
    secret: getCookieSecret(),
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 900000000,
    },
    store: new storeFile({
      path: path.join(path.resolve(), ".../sessions"),
    }),
  })
);

app.use("/api", router);
app.listen(3000, () => console.log("Server is running on port 3000"));
