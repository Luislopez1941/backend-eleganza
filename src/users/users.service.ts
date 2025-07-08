import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUserService(dto: CreateUserDto) {

    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
  
    if (existingUser) {
      return {data: [], company: [], status: 'warning', message: 'El correo ya está registrado'};
    }
  

      // Hasheamos la contraseña
      const hashedPassword = await bcrypt.hash(dto.password, 10);
  
      // Creamos los datos del usuario natural
      const userData = {
        firstName: dto.firstName,
        secondName: dto.secondName, // Asegurándote de que lo pasas del DTO si es necesario
        firstLastName: dto.firstLastName,
        secondLastName: dto.secondLastName,
        email: dto.email,
        password: hashedPassword,
        phone: dto.phone,
        type: dto.type
      };
  
      // Creamos el nuevo usuario
      const newUser = await this.prisma.user.create({ data: userData });
  
      return { data: newUser, status: 'success', message: 'Cuenta creada exitosamente' };
    }
  

}
