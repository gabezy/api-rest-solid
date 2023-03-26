import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-respository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-respository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { MaxDistanceError } from "./erros/max-distance-erro";
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-check-ins-error";

let checkinsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use case", () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkinsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "SmartFit Academy",
      description: "",
      latitude: -15.8337195,
      longitude: -47.8328526,
      phone: "",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -15.8337195,
      userLongitude: -47.8328526,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -15.8337195,
      userLongitude: -47.8328526,
    });

    await expect(async () => {
      await sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -15.8337195,
        userLongitude: -47.8328526,
      });
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -15.8337195,
      userLongitude: -47.8328526,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -15.8337195,
      userLongitude: -47.8328526,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be not able to check in on distant gym", async () => {
    // -15.8172453,-47.7995074,

    await gymsRepository.create({
      id: "gym-02",
      title: "SmartFit Academy",
      description: "",
      latitude: -15.8172453,
      longitude: -47.7995074,
      phone: "",
    });

    await expect(
      async () =>
        await sut.execute({
          gymId: "gym-02",
          userId: "user-01",
          userLatitude: -15.8337195,
          userLongitude: -47.8328526,
        })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
