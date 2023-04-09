import { type FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { register } from "./register";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";

export const usersRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  // Authencticated JWT routes
  app.get("/me", { onRequest: [verifyJWT] }, profile);
};
