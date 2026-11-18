
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AdminTokenPayload {
  adminId: string;
}

export interface AuthenticatedAdminRequest extends Request {
  adminId?: string;
}

export const adminAuth = (
  req: AuthenticatedAdminRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication token is required.",
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

    const decoded = jwt.verify(token, jwtSecret) as AdminTokenPayload;

    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    console.error("Admin authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token.",
    });
  }
};
