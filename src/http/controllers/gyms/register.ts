import { makeRegisterGymUseCase } from "@/use-cases/factories/make-register-gym-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, latitude, longitude, phone } =
    registerBodySchema.parse(request.body);

  const registerGymUseCase = makeRegisterGymUseCase();

  await registerGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return await reply.status(201).send();
};
