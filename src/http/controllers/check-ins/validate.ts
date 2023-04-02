import { makeValidateChechInsUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export const validate = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  const validateCheckInParamSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamSchema.parse(request.params);

  const useCase = makeValidateChechInsUseCase();

  await useCase.execute({
    checkInId,
  });

  return await reply.status(204).send();
};
