import { bearerAuth } from "hono/bearer-auth";
import { verifyToken } from "@/utils/jwt";
import { Context } from "hono";
import { PrismaClient } from "@prisma/client";

export const authMiddleware = async (c: Context, next: () => Promise<any>) => {
  const path = c.req.path;
  const excludedPaths = [
    "/api/user/login",
    "/api/user/register",
  ];
  if (excludedPaths.some((excludedPath) => path.startsWith(excludedPath))) {
    return next();
  }
  const bearer = bearerAuth({
    verifyToken: async (token, c) => {
      const prisma: PrismaClient = c.get("db");
      const verified = await verifyToken(token, c.env.JWT_SECRET)
      if (!verified) {
        return false
      }
      const payload = JSON.parse(atob(token.split(".")[1]))
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      })
      if (user) {
        c.set("user", user)
        return true
      } else {
        return false
      }
    },
  });
  return bearer(c, next);
};
