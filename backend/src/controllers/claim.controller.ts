import type { Request, Response } from "express";
import { z } from "zod";
import prisma from "../config/database.js";

const claimSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().trim().min(8, "Valid phone number is required"),
  policyNumber: z.string().trim().optional(),
  description: z
    .string()
    .trim()
    .min(10, "Claim description must be at least 10 characters"),
});

export const createClaim = async (req: Request, res: Response) => {
  try {
    const validation = claimSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim form data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const {
      name,
      email,
      phone,
      policyNumber,
      description,
    } = validation.data;

    // Find existing customer or create a new one
    const customer = await prisma.customer.upsert({
      where: {
        phone,
      },
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

    // Create claim
    const claim = await prisma.claim.create({
      data: {
        customerId: customer.id,
        policyNumber: policyNumber || null,
        description,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Your claim has been submitted successfully!",
      data: {
        claimId: claim.id,
        status: claim.status,
        policyNumber: claim.policyNumber,
      },
    });
  } catch (error) {
    console.error("Claim submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


import type { AuthenticatedRequest } from "../middleware/customerAuth.middleware.js";

export const getMyClaims = async (
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

    const claims = await prisma.claim.findMany({
      where: {
        customerId: req.customerId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        policyNumber: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: claims,
    });
  } catch (error) {
    console.error("Get customer claims error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};