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
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';
import {
  Public,
  Roles,
} from 'src/untility/decorators/authorize-role.decorator';
import { ROLE } from 'src/untility/enum/role-user';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Roles(ROLE.ADMIN)
  @Post()
  async create(@Body() createAreaDto: CreateAreaDto): Promise<Area> {
    return await this.areasService.create(createAreaDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<Area[]> {
    return await this.areasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Area> {
    return this.areasService.findOne(+id);
  }

  @Roles(ROLE.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ): Promise<Area> {
    return await this.areasService.update(+id, updateAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Area> {
    return this.areasService.remove(+id);
  }
}
