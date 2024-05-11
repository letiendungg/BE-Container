import { User } from 'src/users/entities/user.entity';
import { Application } from '../entities/application.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  staff: User;
  @IsNotEmpty()
  application: Application;
}
