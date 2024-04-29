import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { signupDto } from './dto/signup.dto';
import { Public } from 'src/untility/decorators/authorize-role.decorator';
import { loginDto } from './dto/signin.dto';

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
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
