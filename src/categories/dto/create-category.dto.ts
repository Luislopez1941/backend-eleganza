import { IsNotEmpty, IsOptional, IsString, IsInt, IsBoolean, IsJSON } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  name: string;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser texto (URL o base64)' })
  image?: string;

  @IsNotEmpty({ message: 'El género es obligatorio' })
  @IsInt({ message: 'El género debe ser un número entero' })
  gender: number;

  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsBoolean({ message: 'El estado debe ser booleano' })
  status: boolean;

  @IsOptional()
  // No existe IsJSON en class-validator, pero puedes validar con IsString si mandas JSON en texto o crear validación custom.
  @IsString({ message: 'sub_menu debe ser un JSON en texto' })
  sub_menu?: string;

  @IsNotEmpty({ message: 'El store_id es obligatorio' })
  @IsInt({ message: 'store_id debe ser un número entero' })
  store_id: number;
}
