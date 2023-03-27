import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../resgister";

export const makeRegisterUseCase = (): RegisterUseCase => {
  const usersRepository = new PrismaUsersRepository();
  return new RegisterUseCase(usersRepository);
};
