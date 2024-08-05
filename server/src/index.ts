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
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', "true");

  // Pass to next layer of middleware
  next();
});

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
