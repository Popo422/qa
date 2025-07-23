import { z, ZodTypeAny } from "zod";

export const SuccessResponseSchema = <T extends ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.optional(),
  });

export const FailedResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type FailedResponse = z.infer<typeof FailedResponseSchema>;