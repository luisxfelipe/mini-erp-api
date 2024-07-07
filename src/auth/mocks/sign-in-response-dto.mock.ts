import { SignInResponseDto } from '../dto/sign-in-response.dto';
import { jwtMock } from './jwt.mock';

export const signInResponseDtoMock: SignInResponseDto = {
  access_token: jwtMock,
};
