import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt";


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  
  
  
  async create(createUserDto: CreateUserDto) {
    const { password , ...rest } = createUserDto;
    console.log("🚀 ~ UserService ~ create ~ password:", password)
    console.log("🚀 ~ UserService ~ create ~ rest:", rest)

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🚀 ~ UserService ~ create ~ hashedPassword:", hashedPassword)

    const user = await this.prisma.users.create({
      data: {
        ...rest,  
        password: hashedPassword,
      },
    });
    return user;
  }



  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: { email: email },
    });
  }
  


  findAll() {
    return `This action returns all user`;
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
