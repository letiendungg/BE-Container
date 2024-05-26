import { Application } from 'src/applications/entities/application.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  template: string;
  @ManyToOne(() => User, (user) => user.docs)
  company: User;
  @OneToOne(() => Application, (app) => app.document)
  application: Application;
}
