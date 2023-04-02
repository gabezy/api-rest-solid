import { makeChechInsUseCase } from "@/use-cases/factories/make-check-ins-use-case";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  const RegisterCheckInParams = z.object({
    gymId: z.string().uuid(),
  });

  const registerCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = RegisterCheckInParams.parse(request.params);

  const { latitude, longitude } = registerCheckInBodySchema.parse(request.body);

  const checkInUseCase = makeChechInsUseCase();

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return await reply.status(201).send();
};
