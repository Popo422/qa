import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { GetUserResponseSchema, RegisterUserRequestSchema, AuthResponseSchema, LoginUserRequestSchema } from "@common/schemas/user";
import { FailedResponseSchema } from "@common/schemas/response";
import { AppType } from "@/index";
import { validate } from "@/middleware/validate";
import { getUserHandler, loginUserHandler, registerUserHandler } from "@/controllers/userController";

const app = new Hono<AppType>();

app.get(
  "/me",
  describeRoute({
    summary: "Retrieve the current user",
    responses: {
      200: {
        description: "User retrieved successfully",
        content: {
          "application/json": {
            schema: resolver(GetUserResponseSchema),
          },
        },
      },
    },
  }),
  getUserHandler
);

app.post(
  "/register",
  describeRoute({
    summary: "Register a new user",
    responses: {
      200: {
        description: "User registered successfully",
        content: {
          "application/json": {
            schema: resolver(AuthResponseSchema),
          },
        },
      },
      400: {
        description: "Bad request",
        content: {
          "application/json": {
            schema: resolver(FailedResponseSchema),
          },
        },
      },
    },
  }),
  validate(RegisterUserRequestSchema),
  registerUserHandler
);

app.post(
  "/login",
  describeRoute({
    summary: "Login a user",
    responses: {
      200: {
        description: "User logged in successfully",
        content: {
          "application/json": {
            schema: resolver(AuthResponseSchema),
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: resolver(FailedResponseSchema),
          },
        },
      },
      400: {
        description: "Bad request",
        content: {
          "application/json": {
            schema: resolver(FailedResponseSchema),
          },
        },
      },
    },
  }),
  validate(LoginUserRequestSchema),
  loginUserHandler
);

export default app;
