
import type { Response } from "express";
import prisma from "../config/database.js";
import type { AuthenticatedAdminRequest } from "../middleware/adminAuth.middleware.js";
import { z } from "zod";

// Dashboard Overview
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

      prisma.quote.count({ where: { status: "PENDING" } }),
      prisma.claim.count({ where: { status: "PENDING" } }),
      prisma.policyApplication.count({ where: { status: "PENDING" } }),
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

// Get All Customers
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

// Get All Quotes
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

// Update Quote Status
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

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid quote status.",
      });
    }

    const existingQuote = await prisma.quote.findUnique({
      where: { id: quoteId },
    });

    if (!existingQuote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found.",
      });
    }

    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: { status: result.data.status },
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

// Get All Claims
export const getAllClaims = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const claims = await prisma.claim.findMany({
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
      count: claims.length,
      data: claims,
    });
  } catch (error) {
    console.error("Get claims error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch claims.",
    });
  }
};

// Update Claim Status
export const updateClaimStatus = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const claimId = String(req.params.id);

    const schema = z.object({
      status: z.enum([
        "PENDING",
        "UNDER_REVIEW",
        "APPROVED",
        "REJECTED",
        "COMPLETED",
      ]),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim status.",
      });
    }

    const existingClaim = await prisma.claim.findUnique({
      where: { id: claimId },
    });

    if (!existingClaim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found.",
      });
    }

    const updatedClaim = await prisma.claim.update({
      where: { id: claimId },
      data: { status: result.data.status },
    });

    return res.status(200).json({
      success: true,
      message: "Claim status updated successfully.",
      data: updatedClaim,
    });
  } catch (error) {
    console.error("Update claim status error:", error);

    return res.status(500).json({
      success: false,
      message: "Can not update claim status.",
    });
  }
};



// Get All Policy Applications
export const getAllPolicyApplications = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const applications = await prisma.policyApplication.findMany({
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
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Get policy applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch policy applications.",
    });
  }
};

// Update Policy Application Status
export const updatePolicyApplicationStatus = async (
  req: AuthenticatedAdminRequest,
  res: Response
) => {
  try {
    const applicationId = String(req.params.id);

    const schema = z.object({
      status: z.enum([
        "PENDING",
        "UNDER_REVIEW",
        "APPROVED",
        "REJECTED",
      ]),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid policy application status.",
      });
    }

    const existingApplication =
      await prisma.policyApplication.findUnique({
        where: { id: applicationId },
      });

    if (!existingApplication) {
      return res.status(404).json({
        success: false,
        message: "Policy application not found.",
      });
    }

    const updatedApplication =
      await prisma.policyApplication.update({
        where: { id: applicationId },
        data: { status: result.data.status },
      });

    return res.status(200).json({
      success: true,
      message: "Policy application status updated successfully.",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Update policy application status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update policy application status.",
    });
  }
};
