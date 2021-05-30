import { container } from 'tsyringe';

import { IUsersRepository } from '../repositories/types/IUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
