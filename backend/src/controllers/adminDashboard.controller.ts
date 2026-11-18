import type { Response } from "express";
import prisma from "../config/database.js";
import type { AuthenticatedAdminRequest } from "../middleware/adminAuth.middleware.js";
import { z } from "zod";

export const getDashboardOverview = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const [
      totalCustomers,
      totalQuotes,
      totalClaims,
      totalPolicyApplications,
      pendingQuotes,
      pendingClaims,
      pendingApplications,
    ] = await Promise.all([
      prisma.customer.count(),
      prisma.quote.count(),
      prisma.claim.count(),
      prisma.policyApplication.count(),

      prisma.quote.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.claim.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.policyApplication.count({
        where: {
          status: "PENDING",
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        totalQuotes,
        totalClaims,
        totalPolicyApplications,
        pendingQuotes,
        pendingClaims,
        pendingApplications,
      },
    });
  } catch (error) {
    console.error("Dashboard overview error:", error);

    return res.status(500).json({
      success: false,
      message: "Cannot load dashboard overview.",
    });
  }
};

export const getAllCustomers = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,

        _count: {
          select: {
            quotes: true,
            claims: true,
            policyApplications: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    console.error("Get customers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers.",
    });
  }
};

export const getAllQuotes = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const quotes = await prisma.quote.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error) {
    console.error("Get quotes error:", error);

    return res.status(500).json({
      success: false,
      message: "Cannot fetch quotes.",
    });
  }
};

export const updateQuoteStatus = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const quoteId = String(req.params.id);

    const schema = z.object({
      status: z.enum([
        "PENDING",
        "PROCESSING",
        "APPROVED",
        "REJECTED",
      ]),
    });

    console.log("QUOTE STATUS BODY:", req.body);

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid quote status.",
      });
    }

    const existingQuote = await prisma.quote.findUnique({
      where: {
        id: quoteId,
      },
    });

    if (!existingQuote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found.",
      });
    }

    const updatedQuote = await prisma.quote.update({
      where: {
        id: quoteId,
      },

      data: {
        status: result.data.status,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Quote status updated successfully.",
      data: updatedQuote,
    });
  } catch (error) {
    console.error("Update quote status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update quote status.",
    });
  }
};