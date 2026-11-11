import { Router } from "express";
import {
  createQuote,
  getMyQuotes,
} from "../controllers/quote.controller.js";
import { customerAuth } from "../middleware/customerAuth.middleware.js";

const router = Router();

router.post("/", createQuote);

router.get("/my-quotes", customerAuth, getMyQuotes);

export default router;