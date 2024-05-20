import { AreaEnum } from 'src/untility/enum/area';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cluster } from './cluster.entity';
import cluster from 'cluster';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  place: string;
  @Column({ default: false })
  isDeleted: boolean;
  @OneToMany(() => User, (user) => user.area)
  users: User[];
  @OneToMany(() => Cluster, (cluster) => cluster.area)
  clusters: Cluster[];
}
