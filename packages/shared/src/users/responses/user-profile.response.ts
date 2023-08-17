import { Role } from '../../common';

export interface UserProfileResponse {
  id: string;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
  position: string;
  avatar: string;
  isActive: boolean;
  createdAt: Date;
}
