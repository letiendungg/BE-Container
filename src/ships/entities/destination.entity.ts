import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  portName: string;
  @Column()
  nation: string;
}
