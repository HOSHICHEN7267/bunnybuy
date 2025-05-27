import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // ✅ 改成自建 module

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CloudinaryModule, // ✅ 匯入你自己寫的 cloudinary module
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
