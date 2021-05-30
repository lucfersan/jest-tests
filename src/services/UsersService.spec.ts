import { AppError } from '../errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { UsersService } from './UsersService';

let fakeUsersRepository: FakeUsersRepository;
let usersService: UsersService;

describe('Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    usersService = new UsersService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await usersService.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
  });

  it('should not be able to create two users with the same email', async () => {
    await usersService.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      usersService.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
