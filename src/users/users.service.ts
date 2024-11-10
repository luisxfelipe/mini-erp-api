import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { comparePassword, createPasswordHash } from '../utils/password';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userReceved = await this.findOneByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (userReceved) {
      throw new BadGatewayException('E-mail already registered');
    }

    createUserDto.password = await createPasswordHash(createUserDto.password);

    return await this.repository.save(this.repository.create(createUserDto));
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.repository.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.findOne(id);

    if (
      !(await comparePassword(
        updatePasswordDto.oldPassword,
        user?.password || '',
      ))
    ) {
      throw new BadRequestException('Old password does not match');
    }

    const updatedUser = await this.repository.save({
      ...user,
      password: await createPasswordHash(updatePasswordDto.newPassword),
    });

    return updatedUser;
  }
}
