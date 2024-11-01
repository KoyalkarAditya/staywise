import express from "express";
import cors from "cors";
import "dotenv/config";
import { Request, Response } from "express";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log("MongoDB connected");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/api/test", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Healthy server",
  });
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
