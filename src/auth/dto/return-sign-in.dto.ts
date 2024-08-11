import { ReturnUserDto } from 'src/users/dto/return-user.dto';

export class ReturnSignInDto {
  access_token: string;
  user?: ReturnUserDto;

  constructor({ access_token, user }) {
    this.access_token = access_token;
    this.user = user ? new ReturnUserDto(user) : undefined;
  }
}
