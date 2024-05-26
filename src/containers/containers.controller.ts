import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ContainersService } from './containers.service';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';
import {
  Public,
  Roles,
} from 'src/untility/decorators/authorize-role.decorator';
import { ROLE } from 'src/untility/enum/role-user';
import { UserCurrent } from 'src/untility/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ContainerType } from './entities/containerType.entity';

@Controller('containers')
export class ContainersController {
  constructor(private readonly containersService: ContainersService) {}

  @Public()
  @Get(':applicationId')
  async findAllByApplication(@Param('applicationId') applicationId: string) {
    return await this.containersService.findAllByApplication(+applicationId);
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.containersService.findOne(id);
  }
  @Public()
  @Get('getAlltypeContainer')
  async getTypeContainer(): Promise<ContainerType[]> {
    return await this.containersService.getTypeContainer();
  }
  @Public()
  @Get('typeContainer/:id')
  async getTypeContainerById(@Param('id') id: string): Promise<ContainerType> {
    return await this.containersService.findTypeContainerById(+id);
  }
  @Roles(ROLE.USER, ROLE.ADMIN)
  @Post()
  async create(@Body() createContainerDto: CreateContainerDto) {
    return await this.containersService.create(createContainerDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateContainerDto: UpdateContainerDto,
    @UserCurrent() currentUser: User,
  ) {
    return this.containersService.update(id, updateContainerDto, currentUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @UserCurrent() currentUser: User) {
    return await this.containersService.delete(id, currentUser);
  }
}
