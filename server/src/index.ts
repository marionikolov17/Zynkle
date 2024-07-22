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
import { checkAccessToken, checkRefreshToken } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { checkCommentId, checkPostId, checkReplyId } from "./middlewares/params.middleware";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

expressConfig(app);

app.use(checkAccessToken, checkRefreshToken);

// Params middlewares
app.param("postId", checkPostId);
app.param("commentId", checkCommentId);
app.param("replyId", checkReplyId);

app.use("/api/v1", router);

app.use(errorHandler);

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
