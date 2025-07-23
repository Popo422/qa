import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";
import { z, ZodType } from "zod";
import { PrismaClient, User } from "@prisma/client";
import { authMiddleware } from "@/middleware/auth";
import { corsMiddleware } from "@/middleware/cors";
import { databaseMiddleware } from "@/middleware/database";
import { handleError } from "@/utils/handleError";
import userRoutes from "@/routes/user";

type Bindings = {
  [key: string]: string;
}
type Variables = {
  user: User;
  db: PrismaClient;
}
type JsonInputSchema<T extends ZodType> = {
  in: { json: z.input<T>; };
  out: { json: z.infer<T>; };
};
export type AppType = {
  Bindings: Bindings;
  Variables: Variables;
}
export type Input<T extends ZodType> = JsonInputSchema<T>;
const app = new Hono<AppType>();

app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "API",
        version: "1.0.0",
        description: "API Documentation",
      },
    },
  })
);
app.use("/api/*", corsMiddleware, databaseMiddleware, authMiddleware);
app.route("/api/user", userRoutes);
app.onError(handleError);

export default app;
