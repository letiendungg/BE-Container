import { Exclude } from 'class-transformer';
import { UserList } from 'src/users/dto/users.dto';
import { User } from 'src/users/entities/user.entity';
import { Timestamp } from 'typeorm';

export class ShipDTO {
  shipName: string;
  mass: number;
  capacity: number;
  id: number;
  ownner: UserList;
  @Exclude()
  createdAt: Timestamp;
  @Exclude()
  updatedAt: Timestamp;
}
