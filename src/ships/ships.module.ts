import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from './entities/ship.entity';
import { UsersModule } from 'src/users/users.module';
import { Destination } from './entities/destination.entity';
import { ShipSchedule } from './entities/shipSchedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ship, Destination, ShipSchedule]),
    UsersModule,
  ],
  controllers: [ShipsController],
  providers: [ShipsService],
  exports: [ShipsService],
})
export class ShipsModule {}
