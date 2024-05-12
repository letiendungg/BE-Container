import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { TaskService } from './tasks.service';
import { UsersModule } from 'src/users/users.module';
import { TakeTask } from './entities/takeTask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, TakeTask]), UsersModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, TaskService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
