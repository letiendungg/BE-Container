import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Roles } from 'src/untility/decorators/authorize-role.decorator';
import { ROLE } from 'src/untility/enum/role-user';
import { UserCurrent } from 'src/untility/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Roles(ROLE.USER, ROLE.ADMIN)
  @Post()
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
    @UserCurrent() currentUser: User,
  ) {
    return await this.applicationsService.create(
      createApplicationDto,
      currentUser,
    );
  }
  @Roles(ROLE.USER, ROLE.ADMIN)
  @Get()
  async findAll(
    @UserCurrent() currentUser: User,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return await this.applicationsService.findAll(+page, +limit, currentUser);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.applicationsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return await this.applicationsService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}
