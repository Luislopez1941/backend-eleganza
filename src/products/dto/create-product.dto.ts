// src/products/dto/create-product.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  ValidateNested,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class VariationDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  quantity: number;
}

export class VariationCreateDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariationDto)
  create: VariationDto[];
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsObject()
  category?: {
    connect: { id: number };
  };

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => VariationCreateDto)
  variations?: VariationCreateDto;
}
