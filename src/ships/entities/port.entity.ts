import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShipSchedule } from './shipSchedule';

@Entity()
export class Port {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  slot: number;

  @OneToMany(() => ShipSchedule, (shipSchedule) => shipSchedule.port)
  ships: ShipSchedule[];
}
