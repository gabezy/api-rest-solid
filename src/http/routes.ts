import { type FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { register } from "./controllers/register";
import { verifyJWT } from "./middlewares/verify-jwt";

export const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  // Authencticated JWT routes
  app.get("/me", { onRequest: [verifyJWT] }, profile);
};
