import { userMock } from './../../../users/tests/mocks/user.mock';
import { SignInDto } from './../../dto/sign-in.dto';

export const signInDtoMock: SignInDto = {
  email: userMock.email,
  password: '123456',
};
