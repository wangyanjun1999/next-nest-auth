import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }
  @Post('signup')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }


  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req) {
    console.log(req.user);
    // 如果登录成功，返回jwt
    return this.authService.login(req.user.id, req.user?.name);
  }
}
