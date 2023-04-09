import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

const start = async (): Promise<void> => {
  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: "refreshToken",
      signed: false,
    },
    sign: {
      expiresIn: "10m",
    },
  });

  await app.register(fastifyCookie);
  await app.register(usersRoutes);
  await app.register(gymsRoutes);
  await app.register(checkInsRoutes);
};

void start();

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV === "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataLog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: "Internal Server Error",
  });
});
