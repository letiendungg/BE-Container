import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Container } from './container.entity';

@Entity()
export class ContainerType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  typeName: string;
  @Column()
  percenPrice: number;

  @OneToMany(() => Container, (container) => container.typeContainer)
  containersType: Container[];
}
