import { ROLE } from 'src/untility/enum/role-user';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  password: string;
  @Column({ type: 'enum', enum: ROLE })
  role: ROLE;
  @Column()
  resetToken: string;
  @Column()
  createToken: string;
}
