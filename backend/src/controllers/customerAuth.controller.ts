import type { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "../config/database.js";
import jwt from "jsonwebtoken";

import {
  customerAuth,

} from "../middleware/customerAuth.middleware.js";

import type { AuthenticatedRequest } from "../middleware/customerAuth.middleware.js";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .min(8, "Valid phone number is required")
    .max(20, "Phone number is too long"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

export const registerCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate request body
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { name, email, phone, password } = validation.data;

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        phone,
      },
    });

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: "An account with this phone number already exists.",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        name,
        email: email || null,
        phone,
        passwordHash,
      },
    });

    // Never send password/passwordHash to frontend
    return res.status(201).json({
      success: true,
      message: "Customer account created successfully!",
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (error) {
    console.error("Customer registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


export const loginCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const loginSchema = z.object({
      phone: z
        .string()
        .trim()
        .min(8, "Valid phone number is required"),

      password: z
        .string()
        .min(1, "Password is required"),
    });

    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid login data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { phone, password } = validation.data;

    // Find customer
    const customer = await prisma.customer.findUnique({
      where: {
        phone,
      },
    });

    if (!customer || !customer.passwordHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password.",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
      password,
      customer.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password.",
      });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      {
        customerId: customer.id,
      },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      data: {
        token,
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
      },
    });
  } catch (error) {
    console.error("Customer login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


export const getCustomerProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.customerId) {
      return res.status(401).json({
        success: false,
        message: "Customer authentication required.",
      });
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: req.customerId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error("Get customer profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


export const updateCustomerProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.customerId) {
      return res.status(401).json({
        success: false,
        message: "Customer authentication required.",
      });
    }

    const updateSchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),

      email: z
        .string()
        .trim()
        .email("Please provide a valid email")
        .optional()
        .or(z.literal("")),
    });

    const validation = updateSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { name, email } = validation.data;

    const customer = await prisma.customer.update({
      where: {
        id: req.customerId,
      },
      data: {
        name,
        email: email || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: customer,
    });
  } catch (error) {
    console.error("Update customer profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};