import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  postcode: string;

  @IsString()
  @IsNotEmpty()
  nation: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
