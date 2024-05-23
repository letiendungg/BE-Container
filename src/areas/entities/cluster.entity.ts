import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';
import { Location } from './location.entity';
import { ShipSchedule } from 'src/ships/entities/shipSchedule';

@Entity()
export class Cluster {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  place: string;

  @ManyToOne(() => Area, (area) => area.clusters)
  area: Area;
  @OneToMany(() => Location, (location) => location.cluser)
  locations: Location[];
}
