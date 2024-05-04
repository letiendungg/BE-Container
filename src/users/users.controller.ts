import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { signupDto } from './dto/signup.dto';
import {
  Public,
  Roles,
} from 'src/untility/decorators/authorize-role.decorator';
import { loginDto } from './dto/signin.dto';
import { UserCurrent } from 'src/untility/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { ROLE } from 'src/untility/enum/role-user';
import { SerializeInterceptor } from 'src/untility/interceptor/serialize.interceptor';
import { UserList, UsersDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: signupDto) {
    return await this.usersService.signup(signupDto);
  }
  @Public()
  @Post('login')
  async login(@Body() signupDto: loginDto) {
    return await this.usersService.login(signupDto);
  }
  @Public()
  @Post('confirmCode/:token')
  async confirmCode(@Body('code') code: string, @Param('token') token: string) {
    return await this.usersService.confirmCode(code, token);
  }
  @Public()
  @Post('forgotPassword')
  async forgotSendEmail(@Body('email') email: string) {
    return await this.usersService.forgotSendEmail(email);
  }

  @Public()
  @Put('forgotPassword/:token')
  async forgotPassword(
    @Body('password') password: string,
    @Param('token') token: string,
  ) {
    return await this.usersService.forgotPassword(token, password);
  }

  @Put('changePassword')
  async changePassword(
    @UserCurrent() user: User,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.usersService.changePassword(user, password, newPassword);
  }

  @Roles(ROLE.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Roles(ROLE.ADMIN)
  @UseInterceptors(new SerializeInterceptor(UsersDTO))
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
  ): Promise<UsersDTO> {
    return await this.usersService.findAll(+page, +limit, search);
  }

  @UseInterceptors(new SerializeInterceptor(UserList))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserList> {
    return await this.usersService.findOne(+id);
  }

  @Put('delete/:id')
  async delete(
    @Param('id') id: string,
    @UserCurrent() user: User,
  ): Promise<any> {
    return await this.usersService.delete(+id, user);
  }

  @UseInterceptors(new SerializeInterceptor(UserList))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UserCurrent() user: User,
  ): Promise<UserList> {
    return await this.usersService.update(+id, updateUserDto, user);
  }
}
