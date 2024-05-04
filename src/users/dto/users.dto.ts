import { Exclude, Expose, Type } from 'class-transformer';
import { ROLE } from 'src/untility/enum/role-user';
import { Timestamp } from 'typeorm';

export class UsersDTO {
  total: number;
  totalPage: number;
  page: number;
  limit: number;
  @Expose()
  @Type(() => UserList)
  users: UserList[];
}
export class UserList {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  nation: string;
  postcode: string;
  isActive: boolean;
  role: ROLE;

  @Exclude()
  code: string;
  @Exclude()
  password: string;
  @Exclude()
  resetToken: string;
  @Exclude()
  createToken: string;
  @Exclude()
  createdAt: Timestamp;
  @Exclude()
  updated: Timestamp;
}
