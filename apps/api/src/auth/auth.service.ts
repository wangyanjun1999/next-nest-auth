import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { verify } from 'argon2';

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

        async validateLocalUser(email: string, password: string) {
            // 1. 检查用户是否存在
            const user = await this.userService.findByEmail(email);

            // 如果用户不存在，则抛出错误
            if (!user) {
                throw new BadRequestException('User not found');
            }

            // 2. 检查密码是否正确
            const isPasswordValid = await verify(password, user.password as string);
            // 如果密码不正确，则抛出错误
            if (!isPasswordValid) {
                throw new BadRequestException('Invalid password');
            }

            // 3. 用户名与密码正确，返回用户对象
            return {id: user.id,  name: user.name as string};
        }
    }
