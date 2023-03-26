import { InMemoryUsersRespository } from "@/repositories/in-memory/in-memory-users-respository";
import { hash } from "bcryptjs";
import { it, describe, expect, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCretentialsError } from "./erros/invalid-cretentials-error";

// Unit Tests

let usersRepository: InMemoryUsersRespository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "jonhdoe@example.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    await expect(async () => {
      await sut.execute({
        email: "jonhdoe@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCretentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(async () => {
      await sut.execute({
        email: "jonhdoe@example.com",
        password: "123123",
      });
    }).rejects.toBeInstanceOf(InvalidCretentialsError);
  });
});
