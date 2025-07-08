import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService) { }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name, image, gender, status, sub_menu, store_id } = createCategoryDto;

    // Ruta donde guardarás las imágenes
    const uploadDir = path.join(process.cwd(), 'uploads', 'categories');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let imageUrl: any = null;
    if (image) {
      // image es base64 string tipo "data:image/png;base64,...."
      // Extraemos el tipo y la data base64
      const matches = image.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!matches) {
        throw new Error('Imagen base64 inválida');
      }

      const ext = matches[1].split('/')[1]; // ejemplo: png, jpeg
      const base64Data = matches[2];
      const fileName = `${Date.now()}.${ext}`;
      const filePath = path.join(uploadDir, fileName);

      // Guardar archivo físico
      fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });

      // Guardar la URL relativa o absoluta para acceder desde front
      imageUrl = `/uploads/categories/${fileName}`;
    }

    let subMenuParsed: any = undefined;
    if (sub_menu) {
      try {
        subMenuParsed = JSON.parse(sub_menu);
      } catch {
        subMenuParsed = null;
      }
    }

    const category = await this.prisma.category.create({
      data: {
        name,
        image: imageUrl,
        gender,
        status,
        sub_menu: subMenuParsed,
        store_id,
      },
    });

    return { data: category, status: 'success', message: 'Categoria creada exitosamente' };
  }

  async findAll(store_id: number) {
    if (!store_id) {
      return {
        data: [],
        status: 'error',
        message: 'El ID de la tienda es requerido',
      };
    }

    const categories = await this.prisma.category.findMany({
      where: { store_id },
    });

    return {
      data: categories,
      status: 'success',
      message: 'Categorías encontradas exitosamente',
    };
  }


  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
