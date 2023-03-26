import { InMemoryGymsRespository } from "@/repositories/in-memory/in-memory-gyms-respository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterGymUseCase } from "./register-gym";

let gymsRepository: InMemoryGymsRespository;
let sut: RegisterGymUseCase;

describe("Register gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRespository();
    sut = new RegisterGymUseCase(gymsRepository);
  });

  it("should be able to register a gym", async () => {
    const { gym } = await sut.execute({
      title: "Omni",
      description: "It's a gym",
      phone: "+5527999999999",
      latitude: -15.8337195,
      longitude: -47.8328526,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
