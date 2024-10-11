import { AuthResponse, LoginBody, RegisterBody } from '@plant-care/types';

export interface IAuth {
  signup(body: RegisterBody): Promise<AuthResponse>;
  login(body: LoginBody): Promise<AuthResponse>;
}
