
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

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/contact", contactRoutes);

app.use("/api/quotes", quoteRoutes);

app.use("/api/claims", claimRoutes);

app.use("/api/auth", customerAuthRoutes);

app.use("/api/premium", premiumRoutes);

app.use("/api/policy-applications", policyApplicationRoutes);

app.use("/api/admin", adminRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Purabi Insurance API is running!",
  });
});

// Health check + Database connection test
app.get("/api/health", async (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
