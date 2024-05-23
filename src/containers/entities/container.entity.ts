import { Application } from 'src/applications/entities/application.entity';
import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { ContainerType } from './containerType.entity';
import { Location } from 'src/areas/entities/location.entity';

@Entity()
export class Container {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  weight: number;
  @Column()
  code: string;
  @Column({ default: false })
  isDeleted: boolean;
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => Category, (category) => category.containers)
  type: Category;
  @ManyToOne(() => Application, (application) => application.containers)
  application: Application;
  @ManyToOne(
    () => ContainerType,
    (containerType) => containerType.containersType,
  )
  typeContainer: ContainerType;
  @ManyToOne(() => Location, (location) => location.containers)
  location: Location;
}
