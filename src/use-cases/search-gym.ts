import { type PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { type Gym } from "@prisma/client";

interface SearchGymCaseRequest {
  query: string;
  page: number;
}

interface SearchGymrCaseResponse {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private readonly gymsRepository: PrismaGymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymCaseRequest): Promise<SearchGymrCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
