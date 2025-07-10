import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // <-- importar aquí

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // <-- agregar aquí
    LoginModule,
    CategoriesModule,
    UsersModule,
    ProductsModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
