import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(productData: Partial<Product>) {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOneBy({ product_id: id });
  }

  async update(id: string, updateData: Partial<Product>) {
    const product = await this.productRepository.findOneBy({ product_id: id });
    if (!product) throw new NotFoundException('Product not found');
    Object.assign(product, updateData);
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const result = await this.productRepository.delete({ product_id: id });
    if (result.affected === 0) throw new NotFoundException('Product not found');
    return { deleted: true };
  }
}
