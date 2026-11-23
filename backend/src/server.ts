
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import prisma from "./config/database.js";

import contactRoutes from "./routes/contact.routes.js";
import quoteRoutes from "./routes/quote.routes.js";
import claimRoutes from "./routes/claim.routes.js";
import customerAuthRoutes from "./routes/customerAuth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import premiumRoutes from "./routes/premium.routes.js";
import policyApplicationRoutes from "./routes/policyApplication.routes.js";
import policyRoutes from "./routes/policy.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import documentRoutes from "./routes/document.routes.js";
import adminDocumentRoutes from "./routes/adminDocument.routes.js";
import policyPdfRoutes from "./routes/policyPdf.routes.js";
import policyRenewalRoutes from "./routes/policyRenewal.routes.js";
import adminPolicyRenewalRoutes from "./routes/adminPolicyRenewal.routes.js";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:5173"
)
  .split(",")
  .map((url) => url.trim());

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/auth", customerAuthRoutes);
app.use("/api/premium", premiumRoutes);
app.use("/api/policy-applications", policyApplicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/admin/documents", adminDocumentRoutes);
app.use("/api/policy-pdf", policyPdfRoutes);
app.use("/api/policy-renewal", policyRenewalRoutes);
app.use("/api/admin/policy-renewals", adminPolicyRenewalRoutes);

// Welcome Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Purabi Insurance API is running!",
  });
});

// Health Check + Database Connection
app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Backend and PostgreSQL connected successfully!",
      database: "Connected",
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful Shutdown
const shutdown = async () => {
  console.log("Shutting down server...");

  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
