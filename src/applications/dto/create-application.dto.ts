import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  isString,
} from 'class-validator';
import { CreateContainerDto } from 'src/containers/dto/create-container.dto';
import { DirectionEnum } from 'src/untility/enum/status';

export class CreateApplicationDto {
  @IsEnum(DirectionEnum)
  @IsNotEmpty()
  direction: DirectionEnum;
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  phoneSent: string;

  @IsNotEmpty()
  @IsString()
  phoneReceive: string;

  @IsNotEmpty()
  @IsEmail()
  emailSent: string;

  @IsNotEmpty()
  @IsEmail()
  emailReceive: string;

  @IsNotEmpty()
  containersData: CreateContainerDto[];
}
