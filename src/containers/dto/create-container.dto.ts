import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Application } from 'src/applications/entities/application.entity';
import { Category } from 'src/categories/entities/category.entity';
import { TypeEnum } from 'src/untility/enum/type.enum';

export class CreateContainerDto {
  @IsNotEmpty()
  @IsNumber()
  type: number;
  @IsOptional()
  @IsNotEmpty()
  application: Application;
  @IsNotEmpty()
  weight: number;
}
