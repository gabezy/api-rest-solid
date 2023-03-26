import { type CheckInsRepository } from "@/repositories/check-in-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-respository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: CheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get user metrics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get the user check-ins count from metrics", async () => {
    for (let i = 1; i <= 5; i++) {
      await checkInsRepository.create({
        gym_id: "gym-01",
        user_id: "user-01",
      });
    }
    const { checkInsCount } = await sut.execute({ userId: "user-01" });
    expect(checkInsCount).toEqual(5);
  });
});
