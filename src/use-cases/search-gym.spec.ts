import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-respository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymUseCase } from "./search-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Search gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("should be able to search gyms by the query", async () => {
    const query = "script";

    await gymsRepository.create({
      title: `JavaScript Gym`,
      description: null,
      phone: null,
      latitude: 1,
      longitude: 1,
    });

    await gymsRepository.create({
      title: `TypeScript Gym`,
      description: null,
      phone: null,
      latitude: 1,
      longitude: 1,
    });

    const { gym } = await sut.execute({ query, page: 1 });

    expect(gym).toHaveLength(2);
    expect(gym).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
      expect.objectContaining({ title: "TypeScript Gym" }),
    ]);
  });

  it("should be able to search paginated gyms by the query", async () => {
    const query = "JavaScript";

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `${query} Gym ${i}`,
        description: null,
        phone: null,
        latitude: 1,
        longitude: 1,
      });
    }

    const { gym } = await sut.execute({ query, page: 2 });

    expect(gym).toHaveLength(2);
    expect(gym).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
