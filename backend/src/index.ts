import express from "express";
import cors from "cors";
import "dotenv/config";
import { Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log("MongoDB connected");
});

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // allows only req from this url
    credentials: true, // allows to set the cookie in the browser and allows client to send the cookie along with each req
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/api/test", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Healthy server",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("server started at 3000");
});
