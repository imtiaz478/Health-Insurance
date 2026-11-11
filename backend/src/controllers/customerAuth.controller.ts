import type { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "../config/database.js";

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