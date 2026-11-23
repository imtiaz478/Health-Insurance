import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/customerAuth.middleware.js";
import type { AuthenticatedAdminRequest } from "../middleware/adminAuth.middleware.js";
import { z } from "zod";
import prisma from "../config/database.js";

const createPaymentSchema = z.object({
  policyId: z.string().uuid(),
  paymentMethod: z.enum(["BKASH", "NAGAD", "CARD"]),
});

export const createPayment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const validation = createPaymentSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment information.",
        errors: validation.error.flatten(),
      });
    }

    const { policyId, paymentMethod } = validation.data;

    const policy = await prisma.policy.findFirst({
      where: {
        id: policyId,
        customerId,
      },
    });

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    if (policy.status !== "ACTIVE") {
      return res.status(400).json({
        success: false,
        message: "Payment is not available for this policy.",
      });
    }

    const payment = await prisma.payment.create({
      data: {
        customerId,
        policyId,
        amount: policy.premiumAmount,
        paymentMethod,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Payment initiated successfully.",
      payment,
    });
  } catch (error) {
    console.error("Create payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to initiate payment.",
    });
  }
};

export const getMyPayments = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const payments = await prisma.payment.findMany({
      where: {
        customerId,
      },
      include: {
        policy: {
          select: {
            policyNumber: true,
            insuranceType: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Get my payments error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments.",
    });
  }
};

export const getAllPayments = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        policy: {
          select: {
            policyNumber: true,
            insuranceType: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      totalPayments: payments.length,
      payments,
    });
  } catch (error) {
    console.error("Get all payments error:", error);

    return res.status(500).json({
      success: false,
      message: "can not fetch payments.",
    });
  }
};

export const getPaymentById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;
    const id = String(req.params.id);

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const payment = await prisma.payment.findFirst({
      where: {
        id,
        customerId,
      },
      include: {
        policy: {
          select: {
            policyNumber: true,
            insuranceType: true,
          },
        },
      },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("Get payment by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "can not fetch payment.",
    });
  }
};

export const processMockPayment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const { paymentId, paymentMethod } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required.",
      });
    }

    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        customerId,
      },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    if (payment.status === "SUCCESS") {
      return res.status(400).json({
        success: false,
        message: "Payment is already successful.",
      });
    }

    const transactionId = `MOCK-${Date.now()}-${Math.floor(
      Math.random() * 10000
    )}`;

    const updatedPayment = await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: "SUCCESS",
        paymentMethod,
        transactionId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Mock payment completed successfully.",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Mock payment error:", error);

    return res.status(500).json({
      success: false,
      message: "can not process mock payment.",
    });
  }
};