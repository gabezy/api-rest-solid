import { InMemoryUsersRespository } from "@/repositories/in-memory/in-memory-users-respository";
import { compare } from "bcryptjs";
import { it, describe, expect, beforeEach } from "vitest";
import { UserAlreadyExistsError } from "./erros/user-already-exists-error";
import { RegisterUseCase } from "./resgister";

// Unit Tests

let usersRepository: InMemoryUsersRespository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    });

    const isPawwordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPawwordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "jonhdoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(
      async () =>
        await sut.execute({
          name: "John Doe",
          email,
          password: "123456",
        })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
