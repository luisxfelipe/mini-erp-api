import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { userMock } from './../../users/mocks/user.mock';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../mocks/jwt.mock';
import { signInDtoMock } from '../mocks/sign-in-dto.mock';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return a user', async () => {
      const user = await service.signIn(signInDtoMock);
      expect(user).toEqual({
        access_token: jwtMock,
      });
    });

    it('should return null if password is invalid', async () => {
      expect(
        service.signIn({ ...signInDtoMock, password: 'invalid' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return null if email is invalid', async () => {
      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockResolvedValueOnce(undefined);
      expect(service.signIn(signInDtoMock)).rejects.toThrow();
    });

    it('should return an error', async () => {
      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockRejectedValueOnce(new Error());

      expect(service.signIn(signInDtoMock)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
