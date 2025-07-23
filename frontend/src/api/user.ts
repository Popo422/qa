import { AuthResponseSchema, GetUserResponseSchema } from "@common/schemas/user";
import { apiFetch } from "./client";

export function getUser() {
  return apiFetch(
    "user/me",
    {
      method: "GET"
    },
    GetUserResponseSchema
  );
}

export function loginUser(email: string, password: string) {
  return apiFetch(
    "user/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    AuthResponseSchema
  );
}

export function registerUser(name: string, email: string, password: string) {
  return apiFetch(
    "user/register",
    {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    },
    AuthResponseSchema
  );
}
