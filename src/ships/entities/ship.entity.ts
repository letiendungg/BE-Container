import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { ShipSchedule } from './shipSchedule';

@Entity()
export class Ship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shipName: string;
  @Column()
  capacity: number;
  @Column()
  mass: number;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => User, (user) => user.ships)
  owner: User;
  @OneToMany(() => ShipSchedule, (shipSchedule) => shipSchedule.ship)
  schedules: ShipSchedule[];
}
