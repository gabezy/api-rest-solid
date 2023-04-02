import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";

export const metrics = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  const checkInsMetricsuseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await checkInsMetricsuseCase.execute({
    userId: request.user.sub,
  });
  return await reply.status(200).send({
    checkInsCount,
  });
};
