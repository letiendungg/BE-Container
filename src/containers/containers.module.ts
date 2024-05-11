import { Module } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { ContainersController } from './containers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Container } from './entities/container.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Container])],
  controllers: [ContainersController],
  providers: [ContainersService],
})
export class ContainersModule {}
