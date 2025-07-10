import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      // Llamas al servicio con el DTO completo que ya valida y procesa
      return this.productsService.create(createProductDto)
    } catch (error) {

    }
  }

  @Get('category/:id')
  async getByCategory(@Param('id') id: string) {
    const categoryId = parseInt(id, 10);
    return this.productsService.findByCategory(categoryId);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

}
