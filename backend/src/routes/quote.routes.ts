import { Router } from "express";
import { createQuote } from "../controllers/quote.controller.js";

const router = Router();

router.post("/", createQuote);

export default router;