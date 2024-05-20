import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Port {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  portName: string;
  @Column()
  nation: string;
}
