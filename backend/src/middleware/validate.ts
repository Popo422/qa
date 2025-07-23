import { validator as zValidator } from "hono-openapi/zod";
import { Context } from "hono";
import { ZodType } from "zod";

export const validate = (schema: ZodType) => async (c: Context, next: () => Promise<any>) => {
  return zValidator("json", schema, (result: any) => {
    if (result.error) {
      throw result.error;
    }
  })(c, next);
};
