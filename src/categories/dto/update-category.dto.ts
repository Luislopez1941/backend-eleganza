import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser texto (URL o base64)' })
  image?: string;

  @IsOptional()
  @IsInt({ message: 'El género debe ser un número entero' })
  gender?: number;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser booleano' })
  status?: boolean;

  @IsOptional()
  @IsString({ message: 'sub_menu debe ser un JSON en texto' })
  sub_menu?: string;

  @IsOptional()
  @IsInt({ message: 'store_id debe ser un número entero' })
  store_id?: number;

  // ✅ Aquí se agrega el campo delete_images
  @IsOptional()
  @IsArray({ message: 'delete_images debe ser un arreglo' })
  @IsNumber({}, { each: true, message: 'Cada ID en delete_images debe ser un número' })
  delete_image?: string;
}
