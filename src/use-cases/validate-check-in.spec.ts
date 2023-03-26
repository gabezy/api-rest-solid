import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-respository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LateCheckInValidationError } from "./erros/late-check-in-validation-error";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { ValidateCheckInUseCase } from "./validate-check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("Should not be able to validate an inexistent check-in", async () => {
    await expect(
      async () => await sut.execute({ checkInId: "non-existent" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in after 20 minutes of it's creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40, 0));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-1",
      user_id: "user-1",
    });

    const twentyOneMinutesInMilliseconds = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMilliseconds);

    await expect(
      async () => await sut.execute({ checkInId: createdCheckIn.id })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
