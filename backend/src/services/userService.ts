import { hashPassword } from "@/utils/jwt";
import { z } from "zod";
import { RegisterUserRequestSchema } from "@common/schemas/user";
import { PrismaClient, User } from "@prisma/client";
import { Context } from "hono";

export const createUser = async (c: Context, registerUserRequest: z.infer<typeof RegisterUserRequestSchema>): Promise<User | null> => {
  const { name, email, password } = registerUserRequest;
  const hashedPassword = await hashPassword(password);
  const prisma: PrismaClient = c.get("db");
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return null;
  }
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return user;
}

export const verifyLogin = async (c: Context, email: string, password: string): Promise<User | null> => {
  const prisma: PrismaClient = c.get("db");
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return null;
  }
  const hashedPassword = await hashPassword(password);
  const storedHashedPassword = user.password;
  if (!storedHashedPassword || storedHashedPassword !== hashedPassword) {
    return null;
  }
  return user;
}
