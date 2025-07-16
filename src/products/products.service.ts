import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) { }

  // *** NO TOCAR EL CREATE ***

  async create(createProductDto: CreateProductDto) {
    const {
      name,
      images: base64Images = [],
      image,
      status,
      price,
      category,
      variations,
    } = createProductDto;

    // Carpeta donde guardar las imágenes
    const uploadDir = path.join(process.cwd(), 'uploads', 'products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Guardar imágenes base64 en archivos y devolver URLs relativas
    const savedImagePaths = base64Images.map((base64Str: string) => {
      const matches = base64Str.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!matches) throw new Error('Invalid base64 image string');

      const ext = matches[1].split('/')[1];
      const data = matches[2];
      const buffer = Buffer.from(data, 'base64');

      const filename = `${uuidv4()}.${ext}`;
      const filepath = path.join(uploadDir, filename);

      fs.writeFileSync(filepath, buffer);

      return `/uploads/products/${filename}`;
    });

    // Generar array de variaciones
    const variationsArray = (variations?.create || []).map((v) => ({
      color: v.color,
      size: v.size,
      quantity: v.quantity,
    }));

    // Preparar objeto para Prisma
    const productData: any = {
      name,
      price: new Decimal(price),
      images: savedImagePaths,
      status,
      variations: {
        create: variationsArray,
      },
      category: category ? { connect: { id: category } } : undefined,
    };


    if (image) {
      productData.image = image;
    }

    if (category) {
      productData.category = category;
    }

    const product = await this.prisma.product.create({
      data: productData,
      include: {
        variations: true,
      },
    });

    return {
      data: product,
      status: 'success',
      message: 'Producto creado exitosamente',
    };
  }

  async findByCategory(categoryId: number) {
    return await this.prisma.product.findMany({
      where: {
        category_id: categoryId,
      },     
      include: {
        variations: true,
      },
    });
  }

  async findAll() {
  return await this.prisma.product.findMany({
    include: {
      variations: true,
    },
  });
}

async findThreeByCategory(categoryId: number) {
    return await this.prisma.product.findMany({
      where: {
        category_id: categoryId,
      },
      take: 3,
      include: {
        variations: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { variations: true },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no existe`);
    }

    const uploadDir = path.join(process.cwd(), 'uploads', 'products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let newImagePaths: any = product.images;

    if (updateProductDto.images?.length) {
      // Borrar imágenes anteriores
      if (product.images && Array.isArray(product.images)) {
        product.images.forEach((imgUrl: string) => {
          const imgPath = path.join(process.cwd(), imgUrl);
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        });
      }

      // Guardar nuevas imágenes
      newImagePaths = updateProductDto.images.map((base64Str: string) => {
        const matches = base64Str.match(/^data:(image\/\w+);base64,(.+)$/);
        if (!matches) throw new Error('Invalid base64 image string');

        const ext = matches[1].split('/')[1];
        const data = matches[2];
        const buffer = Buffer.from(data, 'base64');

        const filename = `${uuidv4()}.${ext}`;
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, buffer);

        return `/uploads/products/${filename}`;
      });
    }

    const updateData: any = {
      name: updateProductDto.name ?? product.name,
      price: updateProductDto.price,
      images: newImagePaths,
      status: updateProductDto.status ?? product.status,
      category_id: updateProductDto.category_id ?? product.category_id,
    };

    if (updateProductDto.variations?.create?.length) {
      await this.prisma.product_variation.deleteMany({
        where: { product_id: id },
      });

      updateData.variations = {
        create: updateProductDto.variations.create.map((v) => ({
          color: v.color,
          size: v.size,
          quantity: v.quantity,
        })),
      };
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateData,
      include: { variations: true },
    });

    return {
      data: updatedProduct,
      status: 'success',
      message: 'Producto actualizado exitosamente',
    };
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no existe`);
    }

    if (product.images && Array.isArray(product.images)) {
      product.images.forEach((imgUrl: string) => {
        const imgPath = path.join(process.cwd(), imgUrl);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      });
    }

    await this.prisma.product_variation.deleteMany({
      where: { product_id: id },
    });

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      status: 'success',
      message: 'Producto eliminado exitosamente',
    };
  }
}






