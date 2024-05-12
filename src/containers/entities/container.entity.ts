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
}
