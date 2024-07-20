import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import router from "./routes";

import expressConfig from "./config/express.config";
import { checkAccessToken, checkRefreshToken } from "./middlewares/auth.middleware";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

expressConfig(app);

app.use(checkAccessToken, checkRefreshToken);

app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/", { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("DB Connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
