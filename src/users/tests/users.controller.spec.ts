import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userMock } from '../mocks/user.mock';
import { createUserDtoMock } from '../mocks/create-user-dto.mock';
import { updatePasswordDtoMock } from '../mocks/update-password-dto.mock';
import { ReturnUserDto } from '../dto/return-user.dto';

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockReturnValue(userMock),
            findOne: jest.fn().mockResolvedValue(userMock),
            updatePassword: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return an user', async () => {
      const user = await controller.create(createUserDtoMock);

      expect(user).toEqual(new ReturnUserDto(userMock));
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      const user = await controller.findOne(userMock.id);

      expect(user).toEqual({
        id: userMock.id,
        name: userMock.name,
        email: userMock.email,
      });
    });
  });

  describe('updatePassword', () => {
    it('should return an user', async () => {
      const user = await controller.updatePassword(
        updatePasswordDtoMock,
        userMock.id,
      );

      expect(user).toEqual(new ReturnUserDto(userMock));
    });
  });
});
