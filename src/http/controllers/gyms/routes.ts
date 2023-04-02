import { type FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { register } from "./register";

export const gymsRoutes = async (app: FastifyInstance): Promise<void> => {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms", register);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);
};
