import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { AppError } from '../errors/AppError';
import { IUsersRepository } from '../repositories/types/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class UsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async create({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
