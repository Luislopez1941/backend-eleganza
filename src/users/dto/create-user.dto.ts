import { IsString, IsEmail, IsNotEmpty, IsOptional, IsInt, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateUserDto {
  @ApiProperty({ description: 'Primer nombre' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ description: 'Segundo nombre' })
  @IsOptional()
  @IsString()
  secondName?: string;

  @ApiProperty({ description: 'Primer apellido' })
  @IsString()
  @IsNotEmpty()
  firstLastName: string;

  @ApiProperty({ description: 'Segundo apellido' })
  @IsString()
  @IsNotEmpty()
  secondLastName: string;

  @ApiPropertyOptional({ description: 'URL de la imagen de perfil' })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Contraseña' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Número telefónico del usuario' })
  @IsString()  // Cambiado a IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Tipo de usuario' })
  @IsString()
  type: string; 

}
