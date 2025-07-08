import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {}

 async create(createProductDto: CreateProductDto) {
    const { name, images: base64Images = [], status, category_id, variations = {} } = createProductDto;

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

    // Convertir variations objeto a array
    const variationsArray = Object.values(variations);

    // Preparar datos para crear producto
    const productData: any = {
      name,
      images: savedImagePaths,
      status,
      variations: {
        create: variationsArray.map((v) => ({
          color: v.color,
          size: v.size,
          quantity: v.quantity,
        })),
      },
    };

    if (category_id) {
      productData.category = { connect: { id: category_id } };
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


  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
