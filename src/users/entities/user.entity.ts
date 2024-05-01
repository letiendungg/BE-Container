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

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
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
}
