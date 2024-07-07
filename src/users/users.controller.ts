import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return new UserResponseDto(await this.usersService.findOne(id));
  }

  @Patch(':id/password')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @UserDecorator() userId: number,
  ): Promise<User> {
    return await this.usersService.updatePassword(userId, updatePasswordDto);
  }
}
