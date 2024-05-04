import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ship } from './entities/ship.entity';
import { join } from 'path';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ShipsService {
  constructor(
    @InjectRepository(Ship)
    private readonly shipRepository: Repository<Ship>,
    private readonly userService: UsersService,
  ) {}
  async create(createShipDto: CreateShipDto, currentUser: User): Promise<Ship> {
    const ship = new Ship();
    Object.assign(ship, createShipDto);
    ship.owner = currentUser;
    return await this.shipRepository.save(ship);
  }

  async findAll(): Promise<Ship[]> {
    return await this.shipRepository.find({
      where: { isDeleted: false },
      relations: { owner: true },
      select: {
        owner: {
          fullName: true,
          email: true,
          address: true,
          nation: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Ship> {
    const ship = await this.shipRepository.findOne({
      where: { id, isDeleted: false },
      relations: { owner: true },
      select: {
        owner: {
          fullName: true,
          email: true,
          address: true,
          nation: true,
          id: true,
        },
      },
    });
    if (!ship) {
      throw new NotFoundException('Ship not found!!!!');
    }
    return ship;
  }
  async findByOwner(ownerId: number): Promise<Ship[]> {
    const user = await this.userService.findOne(ownerId);
    if (!user) {
      throw new NotFoundException('User not found!!!');
    }
    return this.shipRepository.find({
      where: {
        owner: {
          id: ownerId,
        },
        isDeleted: false,
      },
    });
  }
  async update(
    id: number,
    updateShipDto: UpdateShipDto,
    currentUser: User,
  ): Promise<Ship> {
    const ship = await this.findOne(id);
    const isAllowed = this.userService.checkAuthor(ship.owner.id, currentUser);
    if (!isAllowed) {
      throw new BadRequestException('You not allowed update this Ship!!!');
    }
    Object.assign(ship, updateShipDto);
    const updatedShip = await this.shipRepository.save(ship);
    return updatedShip;
  }

  async remove(id: number, currentUser: User): Promise<Ship> {
    const ship = await this.findOne(id);
    const isAllowed = this.userService.checkAuthor(ship.owner.id, currentUser);
    if (!isAllowed) {
      throw new BadRequestException('You not allowed update this Ship!!!');
    }
    ship.isDeleted = true;
    const deletedShip = await this.shipRepository.save(ship);
    return deletedShip;
  }
}
