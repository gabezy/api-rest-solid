import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-respository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fecth nearby gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch all gyms nearby", async () => {
    await gymsRepository.create({
      id: "gym-01",
      title: "Near Gym",
      description: null,
      latitude: -15.8337195,
      longitude: -47.8328526,
      phone: null,
    });

    await gymsRepository.create({
      id: "gym-01",
      title: "Far Gym",
      description: null,
      latitude: -15.8143962,
      longitude: -48.0249417,
      phone: null,
    });

    const { gyms } = await sut.execute({
      userLatitude: -15.8337195,
      userLongitude: -47.8328526,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
