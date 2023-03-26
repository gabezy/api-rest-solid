import { type GymsRepository } from "@/repositories/gyms-repository";
import { type Gym } from "@prisma/client";

interface FetchNearbyGymsCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsrCaseResponse {
  gym: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsCaseRequest): Promise<FetchNearbyGymsrCaseResponse> {
    const gym = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gym };
  }
}
