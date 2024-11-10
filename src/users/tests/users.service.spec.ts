import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { userMock } from './mocks/user.mock';
import { UsersService } from '../users.service';
import { Repository } from 'typeorm';
import {
  BadGatewayException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { createUserDtoMock } from './mocks/create-user-dto.mock';
import { updatePasswordDtoMock } from './mocks/update-password-dto.mock';

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(userMock),
            findOneByOrFail: jest.fn().mockResolvedValue(userMock),
            create: jest.fn().mockReturnValue(userMock),
            save: jest.fn().mockReturnValue(userMock),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Find a user by id', () => {
    it('should return an user', async () => {
      const user = await service.findOne(userMock.id);

      expect(user).toEqual(userMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findOne(userMock.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('find a user by email', () => {
    it('should return an user', async () => {
      const user = await service.findOneByEmail(userMock.email);

      expect(user).toEqual(userMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findOneByEmail(userMock.email)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should return an error when email already exists', async () => {
      expect(service.create(createUserDtoMock)).rejects.toThrow(
        BadGatewayException,
      );
    });

    it('should return an user', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockResolvedValueOnce(undefined);

      const user = await service.create(createUserDtoMock);

      expect(user).toEqual(userMock);
    });
  });

  describe('updatePasswod', () => {
    it('should return an user', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockResolvedValueOnce(undefined);

      const user = await service.updatePassword(
        userMock.id,
        updatePasswordDtoMock,
      );

      expect(user).toEqual(userMock);
    });

    it('should return an error when old password is wrong', async () => {
      jest.spyOn(repository, 'findOneByOrFail').mockResolvedValueOnce(userMock);

      expect(
        service.updatePassword(userMock.id, {
          ...updatePasswordDtoMock,
          oldPassword: 'wrong_password',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return an error when user not exists', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockResolvedValueOnce(undefined);

      expect(
        service.updatePassword(userMock.id, updatePasswordDtoMock),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
