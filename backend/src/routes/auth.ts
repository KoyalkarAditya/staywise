import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

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
      res.cookie("auth_token", token, {
        httpOnly: true, // can't be able to parse the cookie in the client side
        secure: process.env.NODE_ENV === "production", //allows only https production
        maxAge: 86400000, //expires after a day as the cookie age is 1d
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

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.sendStatus(200);
});
export default router;
