
import type { Request, Response } from "express";
import { z } from "zod";
import { calculatePremium } from "../config/premiumRates.js";

const premiumSchema = z.object({
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

  coverageAmount: z
    .number()
    .positive("Coverage amount must be greater than zero")
    .max(1000000000, "Coverage amount is too large"),
});

export const calculateInsurancePremium = (
  req: Request,
  res: Response
) => {
  try {
    const validation = premiumSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid calculator data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { insuranceType, coverageAmount } = validation.data;

    const result = calculatePremium(
      coverageAmount,
      insuranceType
    );

    return res.status(200).json({
      success: true,
      message: "Estimated premium calculated successfully!",
      disclaimer:
        "This is a demo estimate, not an official insurance quotation.",
      data: {
        insuranceType,
        ...result,
        currency: "BDT",
      },
    });
  } catch (error) {
    console.error("Premium calculation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to calculate premium.",
    });
  }
};
