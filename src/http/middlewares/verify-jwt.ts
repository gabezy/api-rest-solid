import { type FastifyReply, type FastifyRequest } from "fastify";

export const verifyJWT = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<undefined> => {
  try {
    await request.jwtVerify();
  } catch (err) {
    return await reply.status(401).send({ message: "Unauthozied" });
  }
};
