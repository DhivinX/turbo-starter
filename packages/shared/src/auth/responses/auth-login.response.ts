import { UserProfileResponse } from '../../users';

export interface AuthLoginResponse {
  token?: string;
  expirationTime: number;
  account: UserProfileResponse;
}
