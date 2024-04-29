import { loginDto } from './dto/signin.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from './dto/signup.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email: email } });
  }
  async validateUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
  async signup(signupDto: signupDto) {
    const userExist = await this.findUserByEmail(signupDto.email);
    if (userExist) {
      throw new BadRequestException(
        'Email is existing !!! Please try another email',
      );
    }

    const user = this.userRepository.create(signupDto);
    const token = jwt.sign({ emai: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    const hashedPassword = bcrypt.hashSync(signupDto.password, 10);
    user.password = hashedPassword;
    user.createToken = token;

    const createdUser = await this.userRepository.save(user);
    delete createdUser.password;
    return createdUser;
  }
  async login(loginDto: loginDto): Promise<any> {
    const user = await this.findUserByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('Email is incorrect!');
    }
    const comparePassword = bcrypt.compareSync(
      loginDto.password,
      user.password,
    );
    if (!comparePassword) {
      throw new BadRequestException('Password is incorrect');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Expires in one day
    });

    const { password, ...result } = user;

    return { user: result, access_token: token };
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
