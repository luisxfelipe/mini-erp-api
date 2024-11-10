import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from './../utils/password';
import { SignInPayloadDto } from './dto/sign-in-payload.dto';
import { User } from './../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user: User | undefined = await this.userService
      .findOneByEmail(signInDto.email)
      .catch(() => undefined);

    if (
      !user ||
      !(await comparePassword(signInDto.password, user.password || ''))
    ) {
      throw new UnauthorizedException('Email or password invalid!');
    }

    return {
      access_token: await this.jwtService.sign({
        ...new SignInPayloadDto(user),
      }),
      user: user,
    };
  }
}
