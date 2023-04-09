import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { type FastifyInstance } from "fastify";
import request from "supertest";

interface RegisterAndAuthenticateUserResponse {
  token: string;
}

export const registerAndAuthenticateUser = async (
  app: FastifyInstance,
  isAdmin = false
): Promise<RegisterAndAuthenticateUserResponse> => {
  await prisma.user.create({
    data: {
      name: "Jonh Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "jonhdoe@example.com",
    password: "123456",
  });

  const { token }: { token: string } = authResponse.body;

  return { token };
};
