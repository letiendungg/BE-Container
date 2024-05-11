import { AreaEnum } from 'src/untility/enum/area';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
