import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface CustomerTokenPayload {
  customerId: string;
}

export interface AuthenticatedRequest extends Request {
  customerId?: string;
}

export const customerAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "JWT configuration is missing.",
      });
    }

    const decoded = jwt.verify(
      token,
      jwtSecret
    ) as CustomerTokenPayload;

    req.customerId = decoded.customerId;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};