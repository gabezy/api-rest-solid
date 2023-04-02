import { type GymsRepository } from "@/repositories/gyms-repository";
import { type Gym } from "@prisma/client";

interface FetchNearbyGymsCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsrCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsCaseRequest): Promise<FetchNearbyGymsrCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
