import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: any) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return { data: undefined, status: 'warning', message: 'El correo electrónico no está registrado' };
    }
    const compare = await bcrypt.compare(data.password, user.password);
    if (!compare) {
      return { data: undefined, status: 'warning', message: 'La contraseña es incorrecta' };
    }
    return { data: user, status: 'success', message: 'Inicio de sesión exitoso'};
  }
}
