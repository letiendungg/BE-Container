import { AreaEnum } from 'src/untility/enum/area';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
