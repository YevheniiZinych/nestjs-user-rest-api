import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  state: string;

  @IsString()
  role: string;
}
