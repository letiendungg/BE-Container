import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ship } from './ship.entity';
import { Cluster } from 'src/areas/entities/cluster.entity';
import { Port } from './port.entity';

@Entity()
export class ShipSchedule {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  arriveDate: Date;
  @Column()
  leaveDate: Date;
  @Column('json')
  destinations: { portName: string; dateArrive: Date }[];
  @ManyToOne(() => Ship, (ship) => ship.schedules)
  ship: Ship;
  @ManyToOne(() => Port, (port) => port.ships)
  port: Port;
}
