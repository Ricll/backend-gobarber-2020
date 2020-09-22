import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private omrRepository: Repository<UserToken>;

  constructor() {
    this.omrRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.omrRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.omrRepository.create({
      user_id,
    });
    await this.omrRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
