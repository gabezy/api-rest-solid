import { type FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { register } from "./register";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export const gymsRoutes = async (app: FastifyInstance): Promise<void> => {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, register);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);
};
