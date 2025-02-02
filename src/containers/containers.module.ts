import { Module, forwardRef } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { ContainersController } from './containers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Container } from './entities/container.entity';
import { ApplicationsModule } from 'src/applications/applications.module';
import { UsersModule } from 'src/users/users.module';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { ContainerType } from './entities/containerType.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Location } from 'src/areas/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Container, ContainerType, Application, Location]),
    forwardRef(() => ApplicationsModule),
    UsersModule,
    CategoriesModule,
  ],
  controllers: [ContainersController],
  providers: [ContainersService],
  exports: [ContainersService],
})
export class ContainersModule {}
