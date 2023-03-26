import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCretentialsError } from "@/use-cases/erros/invalid-cretentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export const authenticate = async (
  resquest: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(resquest.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    console.log({ err });
    if (err instanceof InvalidCretentialsError) {
      return await reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
  console.log("Sucesss");
  return await reply.status(200).send();
};
