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
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOneByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException('E-mail already registered');
    }

    createUserDto.password = await createPasswordHash(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
    });
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
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

    const updatedUser = await this.userRepository.save({
      ...user,
      password: await createPasswordHash(updatePasswordDto.newPassword),
    });

    return updatedUser;
  }
}
