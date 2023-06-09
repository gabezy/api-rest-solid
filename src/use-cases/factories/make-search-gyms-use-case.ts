import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "../search-gym";

export const makeSearchGymsUseCase = (): SearchGymUseCase => {
  const gymRepository = new PrismaGymsRepository();
  return new SearchGymUseCase(gymRepository);
};
