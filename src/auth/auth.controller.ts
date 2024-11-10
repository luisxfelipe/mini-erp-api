import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ReturnSignInDto } from './dto/return-sign-in.dto';
import { Public } from './../decorators/is-public.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<ReturnSignInDto> {
    if (!signInDto) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    return new ReturnSignInDto(await this.authService.signIn(signInDto));
  }
}
