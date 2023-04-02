import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export const register = async (
  resquest: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(resquest.body);

  try {
    const resgisterUseCase = makeRegisterUseCase();

    await resgisterUseCase.execute({
      email,
      name,
      password,
    });
  } catch (err) {
    console.log({ err });
    if (err instanceof UserAlreadyExistsError) {
      return await reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
  console.log("Sucesss");
  return await reply.status(201).send();
};
