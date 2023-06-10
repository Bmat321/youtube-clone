import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import authsRoutes from "./routes/auths.js";
import usersRoutes from "./routes/users.js";
import videosRoutes from "./routes/videos.js";
import commentsRoutes from "./routes/comments.js";
import cookieParser from "cookie-parser";

const app = express();

const connect = () =>
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auths", authsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/comments", commentsRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to Server");
});
