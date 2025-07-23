import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AuthResponseSchema, GetUserResponseSchema, LoginUserRequestSchema, RegisterUserRequestSchema } from "@common/schemas/user";
import { AppType, Input } from "@/index";
import { createUser, verifyLogin } from "@/services/userService";
import { generateAuthToken } from "@/utils/jwt";

export const getUserHandler = async (c: Context) => {
  const user = c.get("user")
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401)
  }
  const response = GetUserResponseSchema.parse({
    success: true,
    message: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
  return c.json(response)
}

export const registerUserHandler = async (c: Context<AppType, string, Input<typeof RegisterUserRequestSchema>>) => {
  const registerUserRequest = c.req.valid("json");
  const user = await createUser(c, registerUserRequest);
  if (!user) {
    const response = AuthResponseSchema.parse({
      success: false,
      message: "User already exists",
    });
    return c.json(response, 400);
  }
  const authToken = await generateAuthToken({ email: user.email }, c.env.JWT_SECRET);
  const response = AuthResponseSchema.parse({
    success: true,
    message: "Success",
    token: authToken,
  });
  return c.json(response);
}

export const loginUserHandler = async (c: Context<AppType, string, Input<typeof LoginUserRequestSchema>>) => {
  const loginUserRequest = c.req.valid("json");
  const user = await verifyLogin(c, loginUserRequest.email, loginUserRequest.password);
  if (!user) {
    throw new HTTPException(401, { message: "Invalid credentials" });
  }
  const authToken = await generateAuthToken({ email: user.email }, c.env.JWT_SECRET);
  const response = AuthResponseSchema.parse({
    success: true,
    message: "Success",
    token: authToken,
  });
  return c.json(response);
}
