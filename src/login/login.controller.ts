import { Controller, Get, Post, Body, Patch, Res, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('login')
  async login(@Body() data: LoginDto, @Res() res) {
    const user = await this.loginService.login(data);
    return res.status(200).json(user);
  }


}
