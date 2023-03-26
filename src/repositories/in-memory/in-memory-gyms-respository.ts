import { Prisma, type Gym } from "@prisma/client";
import { randomUUID } from "crypto";
import { type GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (gym === undefined) {
      return null;
    }
    return gym;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(Number(data.latitude)),
      longitude: new Prisma.Decimal(Number(data.longitude)),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
