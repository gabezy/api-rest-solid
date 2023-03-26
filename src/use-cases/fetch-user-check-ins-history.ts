import { type CheckInsRepository } from "@/repositories/check-in-repository";
import { type CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
}
interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId);

    return {
      checkIns,
    };
  }
}
