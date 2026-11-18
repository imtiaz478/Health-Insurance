
import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../src/config/database.js";

const createAdmin = async () => {
  try {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error("ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD are required.");
    }

    if (password.length < 8) {
      throw new Error("Admin password must be at least 8 characters.");
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("Admin account created successfully!");
    console.log("Admin ID:", admin.id);
    console.log("Admin Email:", admin.email);
  } catch (error) {
    console.error("Admin creation failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
