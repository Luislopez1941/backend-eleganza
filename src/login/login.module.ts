import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [PrismaModule, JwtModule.register({
    secret: 'Luis2001',
    signOptions:{
        expiresIn: '24 h'
    }
  }), PrismaModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule { }
