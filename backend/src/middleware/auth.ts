import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({
      message: "unauthorized",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (e) {
    res.status(401).json({
      message: "unauthorized",
    });
    return;
  }
};

export default verifyToken;