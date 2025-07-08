import { IsNotEmpty, IsOptional, IsString, IsInt, IsEmail } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty({ message: 'El nombre de la tienda es obligatorio' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsInt()
  user_id: number; // ID del usuario creador
}
