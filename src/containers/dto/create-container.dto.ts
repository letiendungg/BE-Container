import { IsNotEmpty } from 'class-validator';
import { Application } from 'src/applications/entities/application.entity';
import { Category } from 'src/categories/entities/category.entity';

export class CreateContainerDto {
  @IsNotEmpty()
  type: Category;
  @IsNotEmpty()
  application: Application;
  @IsNotEmpty()
  weight: number;
}
