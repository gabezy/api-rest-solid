import { type GymsRepository } from "@/repositories/gyms-repository";
import { type Gym } from "@prisma/client";

interface RegisterGymCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface RegisterGymrCaseResponse {
  gym: Gym;
}

export class RegisterGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: RegisterGymCaseRequest): Promise<RegisterGymrCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
