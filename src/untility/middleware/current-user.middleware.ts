import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/authorize-role.decorator';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //token gui tu client khong
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      req.currentUser = null;
      next();
      return;
    }
    const token = authHeader.split(' ')[1]; // checktoken by jwt.verify
    try {
      const { userId } = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as JwtPayload;
      const currentUser = await this.userService.validateUser(+userId);
      req.currentUser = currentUser;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

export interface JwtPayload {
  userId: string;
  email: string;
}
