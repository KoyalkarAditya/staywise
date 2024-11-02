import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/register",
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required ").isString(),
  check("email", "Email is required").isString(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        res.status(400).json({
          message: "user already exists",
        });
        return;
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({
        message: "user registered successfully!",
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "something went wrong" });
    }
  }
);

export default router;
