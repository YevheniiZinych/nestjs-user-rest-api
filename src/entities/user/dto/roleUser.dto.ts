import { IsEnum } from 'class-validator';
import { Role_User } from '../types';

export class UserRole {
  @IsEnum(Role_User)
  role: Role_User;
}
