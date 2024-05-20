import { Application } from 'src/applications/entities/application.entity';
import { TakeTask } from 'src/applications/entities/takeTask.entity';
import { Area } from 'src/areas/entities/area.entity';
import { Document } from 'src/documents/entities/document.entity';
import { Ship } from 'src/ships/entities/ship.entity';
import { ROLE } from 'src/untility/enum/role-user';
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

@Entity() // Khai bao doi tuong trong sql
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '/defaultAvatar.png' })
  avatar: string;
  @Column({ default: '' })
  nation: string;

  @Column({ default: '' })
  postcode: string;
  @Column({ default: false })
  isActive: boolean;
  @Column()
  password: string;
  @Column({ default: '' })
  code: string;
  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;
  @Column({ default: '' })
  resetToken: string;
  @Column({ default: '' })
  createToken: string;

  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updated: Timestamp;

  @ManyToOne(() => Area, (area) => area.users, { nullable: true })
  area: Area;
  @OneToMany(() => Ship, (ship) => ship.owner)
  ships: Ship[];

  @OneToMany(() => Application, (application) => application.company)
  applications: Application[];

  @ManyToOne(() => TakeTask, (task) => task.staff)
  worked: TakeTask[];
  @OneToMany(() => Document, (doc) => doc.company)
  docs: Document[];
}
