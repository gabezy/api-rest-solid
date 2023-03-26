import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../resgister";

export const makeRegisterUseCase = (): RegisterUseCase => {
  const usersRepository = new PrismaUsersRepository();
  const resgisterUseCase = new RegisterUseCase(usersRepository);

  return resgisterUseCase;
};
