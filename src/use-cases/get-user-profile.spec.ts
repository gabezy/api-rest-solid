import { InMemoryUsersRespository } from "@/repositories/in-memory/in-memory-users-respository";
import { type UsersRepository } from "@/repositories/users-repository";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

let usersRepository: UsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get the user profile by id", async () => {
    const createdUser = await usersRepository.create({
      name: "Jonh Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });
    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("Jonh Doe");
  });

  it("should not be able to get user profile  with wrong id", async () => {
    await expect(async () => {
      await sut.execute({ userId: "non-existing-id" });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
