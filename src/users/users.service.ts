import { loginDto, loginGoogleDto } from './dto/signin.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { signupDto } from './dto/signup.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { uid } from 'uid';
import { JwtPayload } from 'src/untility/middleware/current-user.middleware';
import { UserList, UsersDTO } from './dto/users.dto';
import { ROLE } from 'src/untility/enum/role-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email: email, isActive: true },
      relations: { area: true },
    });
  }
  async validateUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
  async signup(signupDto: signupDto) {
    const userExist = await this.findUserByEmail(signupDto.email);
    if (userExist) {
      throw new BadRequestException(
        'Email is existing !!! Please t1ry another email',
      );
    }

    const user = this.userRepository.create(signupDto);
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    const hashedPassword = bcrypt.hashSync(signupDto.password, 10);
    user.password = hashedPassword;
    user.createToken = token;
    user.code = uid(6); //eusqk1
    const createdUser = await this.userRepository.save(user); // da tao user o dtb
    delete createdUser.password;
    delete createdUser.code;
    //send email to confirm code; noi dung: http//localhost:3000/api/v1/users/confirmCode/user.createToken + ma code

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
  async loginGoogle(loginGoogleDto: loginGoogleDto) {
    const user = await this.findUserByEmail(loginGoogleDto.email);
    if (user) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      const { password, ...result } = user;
      return { user: result, access_token: token };
    }
    const newUser = new User();
    newUser.email = loginGoogleDto.email;
    newUser.avatar = loginGoogleDto.googlePhoto;
    newUser.fullName = loginGoogleDto.name;
    const passwordRadom = uid(8);
    const hashedPassword = bcrypt.hashSync(passwordRadom, 10);
    newUser.password = hashedPassword;
    newUser.isActive = true;
    const createdUser = await this.userRepository.save(newUser);
    const token = jwt.sign(
      { email: createdUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );
    const { password, ...result } = createdUser;
    return { user: result, access_token: token };
  }
  async validateUserByToken(token: string): Promise<any> {
    try {
      const decode = jwt.decode(token) as JwtPayload;
      return decode.email;
    } catch (error) {
      throw new BadRequestException('token invalid');
    }
  }
  async confirmCode(code: string, token: string): Promise<any> {
    const email = await this.validateUserByToken(token);
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    if (code !== user.code) {
      throw new BadRequestException('OTP Code is incorrect');
    }
    user.isActive = true;
    user.code = '';
    user.createToken = '';
    await this.userRepository.save(user);
    return 'Confirm success!!!';
  }

  async forgotSendEmail(email: string): Promise<any> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found!!!');
    }
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    user.resetToken = token;
    await this.userRepository.save(user);
    //send email to change password
    return 'Check your email to reset password';
  }
  async forgotPassword(token: string, password: string): Promise<any> {
    const email = await this.validateUserByToken(token);
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Token is expired !!');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;
    user.resetToken = '';
    await this.userRepository.save(user);
    return 'Update password success';
  }

  async changePassword(
    user: User,
    password: string,
    newPassword: string,
  ): Promise<any> {
    if (!user) {
      throw new BadRequestException('Unauthentication !!!');
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect!!!');
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return 'Change password success!!!';
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const userExisting = await this.findUserByEmail(createUserDto.email);
    if (userExisting) {
      throw new BadRequestException(
        'Email is existing!!!! Please give another email',
      );
    }
    const user = new User();
    Object.assign(user, createUserDto);
    const password = uid(8);
    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;
    user.isActive = true;
    //send email for user to login includes password and email

    await this.userRepository.save(user);
    return 'Created success user';
  }

  async findAll(
    page: number,
    limit: number,
    search: string,
  ): Promise<UsersDTO> {
    const skip = (page - 1) * limit;
    const [users, total] = await this.userRepository.findAndCount({
      where: { isActive: true, fullName: Like(`%${search}%`) },
      relations: { area: true },
      skip: skip,
      take: limit,
    });
    const totalPage = Math.ceil(total / limit);
    return { total, totalPage, page, limit, users: users };
  }

  async findOne(id: number): Promise<UserList> {
    return await this.userRepository.findOne({
      where: { id, isActive: true },
      relations: {
        area: true,
      },
    });
  }

  async delete(id: number, user: User): Promise<any> {
    const isAllow = this.checkAuthor(id, user);
    if (!isAllow) {
      throw new ForbiddenException('You are not allowed for this action');
    }
    const userFound = await this.findOne(id);
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    userFound.isActive = false;
    await this.userRepository.save(userFound);
    return 'Delete success user';
  }

  checkAuthor(id: number, user: User) {
    return user.id === id || user.role === ROLE.ADMIN;
  }
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: User,
  ): Promise<UserList> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isAllowed = this.checkAuthor(id, currentUser);
    if (!isAllowed) {
      throw new ForbiddenException('You not allowed update user');
    }
    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    delete updatedUser.password;
    return updatedUser;
  }
}
