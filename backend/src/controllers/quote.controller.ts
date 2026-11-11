
import type { Request, Response } from "express";
import { z } from "zod";
import prisma from "../config/database.js";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().trim().min(8, "Valid phone number is required"),
  insuranceType: z.enum([
    "HEALTH",
    "MOTOR",
    "FIRE",
    "MARINE",
    "ENGINEERING",
    "TRAVEL",
    "LIFE",
    "OTHER",
  ]),
  details: z.string().trim().max(2000).optional(),
});

export const createQuote = async (req: Request, res: Response) => {
  try {
    const validation = quoteSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { name, email, phone, insuranceType, details } = validation.data;

    const customer = await prisma.customer.upsert({
      where: { phone },
      update: {
        name,
        ...(email ? { email } : {}),
      },
      create: {
        name,
        phone,
        email: email || null,
      },
    });

    const quote = await prisma.quote.create({
      data: {
        customerId: customer.id,
        insuranceType,
        details: details || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Your insurance quote request has been submitted successfully!",
      data: {
        quoteId: quote.id,
        status: quote.status,
        insuranceType: quote.insuranceType,
      },
    });
  } catch (error) {
    console.error("Quote submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
