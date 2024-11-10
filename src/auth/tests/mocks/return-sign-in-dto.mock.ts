import { ReturnSignInDto } from './../../dto/return-sign-in.dto';
import { jwtMock } from './jwt.mock';

export const returnSignInDtoMock: ReturnSignInDto = {
  access_token: jwtMock,
};
