import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { RegisterGymUseCase } from "../register-gym";

export const makeRegisterGymUseCase = (): RegisterGymUseCase => {
  const gymRepository = new PrismaGymsRepository();
  return new RegisterGymUseCase(gymRepository);
};
