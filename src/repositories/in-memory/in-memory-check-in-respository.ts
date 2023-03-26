import { type CheckIn, type Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { type CheckInsRepository } from "../check-in-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.id === id);

    return checkIn ?? null;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const chechInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDay =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDay;
    });

    if (chechInOnSameDate == null) {
      return null;
    }
    return chechInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.user_id === userId).length;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at:
        data.validated_at != null ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async update(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
