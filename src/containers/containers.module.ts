import { Module } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { ContainersController } from './containers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Container } from './entities/container.entity';
import { ApplicationsModule } from 'src/applications/applications.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Container]),
    ApplicationsModule,
    UsersModule,
  ],
  controllers: [ContainersController],
  providers: [ContainersService],
})
export class ContainersModule {}
