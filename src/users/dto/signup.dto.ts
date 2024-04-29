import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  postcode: string;

  @IsString()
  @IsNotEmpty()
  nation: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
