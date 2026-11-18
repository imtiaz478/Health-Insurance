
import type { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";
import type { AuthenticatedAdminRequest } from "../middleware/adminAuth.middleware.js";

const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Admin Login
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const validation = adminLoginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid email and password.",
      });
    }

    const { email, password } = validation.data;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "JWT configuration is missing.",
      });
    }

    const token = jwt.sign(
      { adminId: admin.id },
      jwtSecret,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      data: {
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Admin login failed.",
    });
  }
};

// Get Admin Profile
export const getAdminProfile = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: req.adminId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Admin profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin profile.",
    });
  }
};
