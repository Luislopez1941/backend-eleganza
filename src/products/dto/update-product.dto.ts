import { IsNumber, IsOptional, IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class VariationCreateDto {
  @IsString()
  color: string;

  @IsString()
  size: string;

  @IsNumber()
  quantity: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;   // precio como number para recibir desde frontend

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsNumber()
  category_id?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => VariationCreateDto)
  variations?: {
    create: VariationCreateDto[];
  };
}
