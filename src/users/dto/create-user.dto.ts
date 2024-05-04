import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Area } from 'src/areas/entities/area.entity';
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
  @IsOptional()
  @IsNumber()
  area: Area;
}
