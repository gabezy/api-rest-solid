import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export const makeFetchNearbyGymsUseCase = (): FetchNearbyGymsUseCase => {
  const prismaGymsRepository = new PrismaGymsRepository();
  return new FetchNearbyGymsUseCase(prismaGymsRepository);
};
