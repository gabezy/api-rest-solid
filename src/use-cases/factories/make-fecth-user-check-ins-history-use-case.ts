import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";

export const makeFecthuserCheckInsHistoryUseCase =
  (): FetchUserCheckInsHistoryUseCase => {
    const checkInsRepository = new PrismaCheckInsRepository();
    return new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  };
