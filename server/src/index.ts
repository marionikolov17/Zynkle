import "dotenv/config";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebase.config";

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import router from "./routes";

import expressConfig from "./config/express.config";
import {
  checkAccessToken,
  checkRefreshToken,
} from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());

expressConfig(app);

app.use(checkAccessToken, checkRefreshToken);

app.use("/api/v1", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const DB_URL =
  process.env.NODE_ENV == "development"
    ? `mongodb://localhost:27017/`
    : `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qgebwbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB_URL, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("DB Connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
