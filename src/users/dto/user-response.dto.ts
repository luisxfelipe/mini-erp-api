import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;

  constructor(user: User) {
    (this.id = user.id), (this.name = user.name), (this.email = user.email);
  }
}
