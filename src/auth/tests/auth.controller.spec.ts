import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { signInResponseDtoMock } from '../mocks/sign-in-response-dto.mock';
import { signInDtoMock } from '../mocks/sign-in-dto.mock';
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue(signInResponseDtoMock),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('sigIn', () => {
    it('should return an access token', async () => {
      const signIn = await controller.signIn(signInDtoMock);

      expect(signIn).toEqual(signInResponseDtoMock);
    });
  });
});
