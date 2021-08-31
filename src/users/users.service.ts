// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserReturnDto } from './dto/user.return.dto';
import { QueryDto } from './dto/query.dto';
import { MessageReturnDto } from './dto/message-return.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(obj: LoginDto): Promise<MessageReturnDto> {
    const body = JSON.parse(JSON.stringify(obj));
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { username: body.username, password: body.password },
      });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      const token = this.generateToken(user.id);
      return {
        message: token,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signup(body: SignupDto): Promise<User> {
    try {
      const check = await this.checkDuplicate(body);
      if (check) {
        throw new ForbiddenException('username is not Available');
      }
      const newuser = this.userRepository.create(body)
      const user = await this.userRepository.save(newuser);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteUser(Token): Promise<MessageReturnDto> {
    await this.getMatch(Token);
    try {
      const deleteUser = await this.userRepository.delete({ id: Token.id });
      if (deleteUser) {
        return {
          message: 'user is deleted',
        };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async listUsers(Token, query: QueryDto): Promise<UserReturnDto[]> {
    await this.getMatch(Token);
    const page = query.page || 1;
    const limit = query.limit || 5;
    const skip = (page - 1) * limit;
    try {
      const users = await this.userRepository.find({
        select: ['name', 'username', 'email'],
        order: { id: 'ASC' },
        skip: skip,
        take: limit,
      });
      if (users.length === 0) {
        throw new NotFoundException('user not found');
      } else {
        return users;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUser(Token): Promise<UserReturnDto> {
    await this.getMatch(Token);
    try {
      const user = await this.userRepository.findOne({
        where: { id: Token.id },
        select: ['name', 'username', 'email'],
      });
      if (user) {
        return user;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async getMatch(Token) {
    try {
      const match = await this.userRepository.findOne({
        where: { id: Token.id },
      });
      if (match) {
        return match;
      }
      throw new UnauthorizedException('Authentication Failed');
    } catch (error) {}
  }

  private async checkDuplicate(body: any) {
    const match = await this.userRepository.findOne({
      where: { username: body.username },
    });
    return match;
  }
  private generateToken(id: any) {
    return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: '1hr' });
  }
}
