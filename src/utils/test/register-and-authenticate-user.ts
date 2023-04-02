import { type FastifyInstance } from "fastify";
import request from "supertest";

interface RegisterAndAuthenticateUserResponse {
  token: string;
}

export const registerAndAuthenticateUser = async (
  app: FastifyInstance
): Promise<RegisterAndAuthenticateUserResponse> => {
  await request(app.server).post("/users").send({
    name: "Jonh Doe",
    email: "jonhdoe@example.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "jonhdoe@example.com",
    password: "123456",
  });

  const { token }: { token: string } = authResponse.body;

  return { token };
};
