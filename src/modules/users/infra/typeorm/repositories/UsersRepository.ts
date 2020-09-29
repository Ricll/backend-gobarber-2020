import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/Users';

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

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.omrRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.omrRepository.find();
    }

    return users;
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
