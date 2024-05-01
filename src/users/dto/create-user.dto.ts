import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLE } from 'src/untility/enum/role-user';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsEnum(ROLE)
  role: ROLE;
}
