import { Request, Response } from "express";
import prisma from "../config/database.js";
import { z } from "zod";

// Contact form validation
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please provide a valid email"),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

// Submit contact form
export const createContact = async (req: Request, res: Response) => {
  try {
    const validation = contactSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { name, email, subject, message } = validation.data;

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully!",
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
      },
    });
  } catch (error) {
    console.error("Contact submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};