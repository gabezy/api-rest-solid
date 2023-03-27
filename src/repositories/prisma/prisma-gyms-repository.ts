import { prisma } from "@/lib/prisma";
import { type Gym, type Prisma } from "@prisma/client";
import {
  type FindManyNearByParams,
  type GymsRepository,
} from "../gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    return await prisma.gym.findUnique({
      where: {
        id,
      },
    });
  }

  async findManyNearBy({
    latitude,
    longitude,
  }: FindManyNearByParams): Promise<Gym[]> {
    return await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gym 
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data });

    return gym;
  }
}
