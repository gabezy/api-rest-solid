import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";

export const profile = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  const getUserProfile = makeGetUserProfileUseCase();
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  Reflect.deleteProperty(user, "password_hash");

  return await reply.status(200).send({
    user,
  });
};
