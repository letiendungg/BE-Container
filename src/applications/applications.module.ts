import { Module, forwardRef } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { TaskService } from './tasks.service';
import { UsersModule } from 'src/users/users.module';
import { TakeTask } from './entities/takeTask.entity';
import { ContainersModule } from 'src/containers/containers.module';
import { ContainersService } from 'src/containers/containers.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, TakeTask]),
    UsersModule,
    CategoriesModule,
    forwardRef(() => ContainersModule),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, TaskService],
  exports: [ApplicationsService, TaskService],
})
export class ApplicationsModule {}
