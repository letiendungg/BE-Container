import { Container } from 'src/containers/entities/container.entity';
import { DirectionEnum, StatusEnum } from 'src/untility/enum/status';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from './application.entity';

@Entity()
export class TakeTask {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'datetime' })
  beginTime: Date;
  @Column({ nullable: true, type: 'datetime' })
  finishTime: Date;
  @Column({ default: false })
  isDone: boolean;
  @OneToMany(() => Application, (application) => application.staffs)
  application: Application;
  @OneToMany(() => User, (staff) => staff.worked)
  staff: User;
}
