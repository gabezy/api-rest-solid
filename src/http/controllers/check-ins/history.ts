import { makeFecthuserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export const history = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const checkInsHistoryuseCase = makeFecthuserCheckInsHistoryUseCase();

  const { checkIns } = await checkInsHistoryuseCase.execute({
    userId: request.user.sub,
    page,
  });
  return await reply.status(200).send({
    checkIns,
  });
};
