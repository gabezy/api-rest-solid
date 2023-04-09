import { type FastifyReply, type FastifyRequest } from "fastify";
export const refresh = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> => {
  await request.jwtVerify({ onlyCookie: true });

  const { role, email } = request.user;

  const token = await reply.jwtSign(
    { role, email },
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    { role, email },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return await reply
    .status(200)
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({ token });
};
