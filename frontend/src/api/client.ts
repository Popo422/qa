import { z } from "zod";
import { FailedResponse, FailedResponseSchema } from "@common/schemas/response";

export type APIResponse<T> = {
  data?: T;
  error?: FailedResponse;
};

export async function apiFetch(
  path: string,
  options: RequestInit,
  responseSchema: z.ZodSchema
): Promise<APIResponse<z.infer<typeof responseSchema>>> {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const apiBasePath = import.meta.env.VITE_API_BASE_PATH;
  if (!apiBaseUrl || !apiBasePath) {
    throw new Error("API configuration environment variables are missing");
  }
  const apiUrl = `${apiBaseUrl}${apiBasePath}/${path}`;
  const authToken = localStorage.getItem("authToken");
  const res = await fetch(apiUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(options.headers || {}),
    },
  });

  const json = await res.json();
  let successResponse;
  let failedResponse;

  if (res.ok) {
    successResponse = responseSchema.safeParse(json);
  } else {
    failedResponse = FailedResponseSchema.safeParse(json);
  }

  if (successResponse && !successResponse.success) {
    throw new Error("Invalid response format");
  }
  if (failedResponse && !failedResponse.success) {
    throw new Error("Invalid error format");
  }

  return {
    data: successResponse?.data,
    error: failedResponse?.data,
  };
}
