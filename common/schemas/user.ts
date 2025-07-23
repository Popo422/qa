import { z } from "zod";
import { SuccessResponseSchema } from "./response";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]),
});

// Requests
export const RegisterUserRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
export const LoginUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Responses
export const GetUserResponseSchema = SuccessResponseSchema(UserSchema)
export const AuthResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
  token: z.string().optional(),
});
