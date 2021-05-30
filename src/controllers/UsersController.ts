import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UsersService } from '../services/UsersService';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersService = container.resolve(UsersService);

    const user = await usersService.create({ name, email, password });

    delete user.password;

    return response.status(201).json(user);
  }
}
