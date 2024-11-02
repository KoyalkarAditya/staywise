import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array(),
      });
      return;
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        res.status(400).json({
          message: "Invalid Credentials",
        });
        return;
      }
      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid Credentials" });
        return;
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user.id });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "something went wrong",
      });
    }
  }
);

export default router;
