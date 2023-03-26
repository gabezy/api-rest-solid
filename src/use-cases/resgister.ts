import { type UsersRepository } from "@/repositories/users-repository";
import { type User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./erros/user-already-exists-error";

interface ResgisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface ResgisterUserCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: ResgisterUseCaseRequest): Promise<ResgisterUserCaseResponse> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail !== null) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
