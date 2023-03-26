import { type GymsRepository } from "@/repositories/gyms-repository";
import { type Gym } from "@prisma/client";

interface SearchGymCaseRequest {
  query: string;
  page: number;
}

interface SearchGymrCaseResponse {
  gym: Gym[];
}

export class SearchGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymCaseRequest): Promise<SearchGymrCaseResponse> {
    const gym = await this.gymsRepository.searchMany(query, page);

    return { gym };
  }
}
