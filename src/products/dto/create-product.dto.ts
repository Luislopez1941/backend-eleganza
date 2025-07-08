// create-product.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsObject, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class VariationDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  quantity: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  images?: string[]; // base64 strings

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  category_id?: number;

  // Ahora variations es un objeto cuyas propiedades son VariationDto
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => VariationDto)
  variations: { [key: string]: VariationDto };
}
