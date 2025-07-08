import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreService {

  constructor(private prisma: PrismaService) {}

  async createStore(createStoreDto: CreateStoreDto) {
    const store = await this.prisma.store.create({ data: createStoreDto });
    return { data: store, status: 'success', message: 'Tienda creda exitosamente' };
  }

  async getStore(userId?: number) {
    if (!userId) {
      return { data: [], status: 'error', message: 'User ID is required' };
    }

    const stores = await this.prisma.store.findMany({
      where: {
        user_id: userId,
      }
    });

    return {
      data: stores,
      status: 'success',
      message: 'Tiendas encontradas exitosamente',
    };
  }



}
