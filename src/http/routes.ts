import { type FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";
import { register } from "./controllers/register";

export const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post("/users", register);
  app.post("/sessions", authenticate);
};