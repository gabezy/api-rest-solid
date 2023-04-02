import { type FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { register } from "./register";
import { validate } from "./validate";
import { metrics } from "./metrics";
import { history } from "./history";

export const checkInsRoutes = async (app: FastifyInstance): Promise<void> => {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", register);
  app.patch("/check-ins/:checkInId/validate", validate);
};
