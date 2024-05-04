import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShipDto {
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
  @IsNotEmpty()
  @IsString()
  shipName: string;
  @IsNotEmpty()
  @IsNumber()
  mass: number;
}
