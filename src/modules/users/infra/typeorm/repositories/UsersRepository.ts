import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/Users'; // Modelo dos dados recebidos

class UsersRepository implements IUsersRepository {
  private omrRepository: Repository<User>;

  constructor() {
    this.omrRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.omrRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.omrRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.omrRepository.create(userData);

    await this.omrRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.omrRepository.save(user);
  }
}

export default UsersRepository;
