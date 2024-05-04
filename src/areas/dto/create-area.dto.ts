import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AreaEnum } from 'src/untility/enum/area';

export class CreateAreaDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  place: string;
}
