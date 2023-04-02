import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export const search = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  const searchGymsQuerySchema = z.object({
    query: z.coerce.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsQuerySchema.parse(request.query);

  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  });

  return await reply.status(200).send({
    gyms,
  });
};
