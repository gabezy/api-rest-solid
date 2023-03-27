import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export const makeGetUserMetricsUseCase = (): GetUserMetricsUseCase => {
  const checkInsRepository = new PrismaCheckInsRepository();
  return new GetUserMetricsUseCase(checkInsRepository);
};
