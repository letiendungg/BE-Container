import { Container } from 'src/containers/entities/container.entity';
import { DirectionEnum, StatusEnum } from 'src/untility/enum/status';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { TakeTask } from './takeTask.entity';
import { Location } from 'src/areas/entities/location.entity';
import { Document } from 'src/documents/entities/document.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;
  @Column({ type: 'enum', enum: DirectionEnum })
  direction: DirectionEnum;
  @Column()
  from: string;
  @Column()
  to: string;
  @Column()
  sentDate: Date;
  @Column({ nullable: true })
  estimatedDate: Date;
  @Column()
  phoneSent: string;
  @Column()
  phoneReceive: string;
  @Column()
  emailSent: string;
  @Column()
  emailReceive: string;

  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;

  @OneToMany(() => Container, (container) => container.application)
  containers: Container[];

  @ManyToOne(() => User, (user) => user.applications)
  company: User;

  @ManyToOne(() => TakeTask, (takeTask) => takeTask.application)
  staffs: TakeTask[];
  @OneToOne(() => Document, (doc) => doc.application)
  document: Document;
}
