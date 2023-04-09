import { type FastifyReply, type FastifyRequest } from "fastify";

export const verifyUserRole = (roleToVerify: "ADMIN" | "MEMBER") => {
  return async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<undefined> => {
    const { role } = request.user;
    if (role !== roleToVerify) {
      return await reply.status(401).send({ message: "Unauthozied" });
    }
  };
};
