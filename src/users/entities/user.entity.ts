import { ROLE } from 'src/untility/enum/role-user';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  nation: string;

  @Column()
  postcode: string;
  @Column()
  password: string;
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
}
