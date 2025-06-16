import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
    export class AuthService {
        constructor(private userService: UserService) {}

        async registerUser(createUserDto: CreateUserDto) {
       // 1. 检查用户是否存在
       const user = await this.userService.findByEmail(createUserDto.email);
       if (user) {
        throw new BadRequestException('User already exists');
       }
       // 2. 创建用户
       return this.userService.create(createUserDto);
        }
    }
