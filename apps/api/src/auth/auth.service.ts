import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthJwtPayload } from './types/auth-jwtPayload';
@Injectable()
    export class AuthService {
        constructor(private userService: UserService, private jwtService: JwtService) {}

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
            const isPasswordValid = await verify(user.password as string,   password);
            // 如果密码不正确，则抛出错误
            if (!isPasswordValid) {
                throw new BadRequestException('Invalid password');
            }

            // 3. 用户名与密码正确，返回用户对象
            return {id: user.id,  name: user.name as string};
        }

        async login(userId:number, name?: string) {
            const { accessToken } = await this.generateToken(userId);           
            return { 
                id:userId,
                name:name,
                accessToken };
          
        }



        async generateToken(userId:number) {
            const payload: AuthJwtPayload = { sub: userId};
              // 同时生成accessToken和refreshToken
              const [accessToken] = await Promise.all([
                this.jwtService.signAsync(payload, ),

            ]);
            return { accessToken,  };
        }

    }