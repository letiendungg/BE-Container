import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Container } from './container.entity';
import { Location } from 'src/areas/entities/location.entity';

@Entity()
export class ContainerType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  typeName: string;
  @Column()
  percenPrice: number;

  @Column({ default: false })
  isDeleted: boolean;
  @OneToMany(() => Container, (container) => container.typeContainer)
  containersType: Container[];
}
