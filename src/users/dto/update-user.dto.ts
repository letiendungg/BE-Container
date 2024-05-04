import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
CreateUserDto;
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  nation: string;
  @IsOptional()
  @IsString()
  postCode: string;
}
