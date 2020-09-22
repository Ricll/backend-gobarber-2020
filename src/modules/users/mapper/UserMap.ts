import User from '@modules/users/infra/typeorm/entities/Users';

export default class UserMap {
  public static toDTO(user: User): Record<string, unknown> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
