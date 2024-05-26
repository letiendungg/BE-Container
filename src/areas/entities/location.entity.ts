import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cluster } from './cluster.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Container } from 'src/containers/entities/container.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nameLocation: string;
  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => Cluster, (clusterr) => clusterr.locations)
  cluser: Cluster;
  @OneToMany(() => Container, (container) => container.location)
  containers: Application[];
}
