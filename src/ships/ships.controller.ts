import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { Roles } from 'src/untility/decorators/authorize-role.decorator';
import { ROLE } from 'src/untility/enum/role-user';
import { UserCurrent } from 'src/untility/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Ship } from './entities/ship.entity';
import { ShipDTO } from './dto/ship.dto';
import { SerializeInterceptor } from 'src/untility/interceptor/serialize.interceptor';

@Controller('ships')
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @Roles(ROLE.SHIP)
  @UseInterceptors(new SerializeInterceptor(ShipDTO))
  @Post()
  async create(
    @Body() createShipDto: CreateShipDto,
    @UserCurrent() currentUser: User,
  ): Promise<Ship> {
    return await this.shipsService.create(createShipDto, currentUser);
  }

  @Get()
  async findAll(): Promise<Ship[]> {
    return await this.shipsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ship> {
    return await this.shipsService.findOne(+id);
  }

  @Roles(ROLE.SHIP)
  @Get('owner/:ownerId')
  async findByOwner(@Param('ownerId') ownerId: string): Promise<Ship[]> {
    return await this.shipsService.findByOwner(+ownerId);
  }
  @Roles(ROLE.SHIP)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShipDto: UpdateShipDto,
    @UserCurrent() currentUser: User,
  ): Promise<Ship> {
    return await this.shipsService.update(+id, updateShipDto, currentUser);
  }
  @Roles(ROLE.SHIP)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @UserCurrent() currentUser: User,
  ): Promise<Ship> {
    return await this.shipsService.remove(+id, currentUser);
  }
}
