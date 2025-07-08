import { Controller, Post, Res, Req, UseGuards, Get, Param, Put, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 200, description: 'User created successfully.' })
  @ApiBody({ description: 'User data', type: CreateUserDto })
  async createUser(@Res() res, @Req() req) {
    const data = req.body;
    const user = await this.usersService.createUserService(data);
    res.status(200).send(user);
  }


}
