import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-respository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch user check ins use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should be able to fetch the user check-ins history", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });
    await checkInsRepository.create({
      gym_id: "gym-03",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({ userId: "user-01" });

    expect(checkIns.length).toBe(3);
  });
});
