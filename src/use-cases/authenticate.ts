import { type UsersRepository } from "@/repositories/users-repository";
import { type User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCretentialsError } from "./erros/invalid-cretentials-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // search the user in the database by e-mail
    // compare if the password saved in the db is the same password of the parameter
    const user = await this.usersRepository.findByEmail(email);

    if (user == null) {
      throw new InvalidCretentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCretentialsError();
    }

    return {
      user,
    };
  }
}
