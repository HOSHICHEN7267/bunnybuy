// bunnybuy\backend\src\purchase-request\purchase-request.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseRequest } from '../entities/purchase-request.entity';
import {
  CreatePurchaseRequestDto,
  UpdatePurchaseRequestDto,
} from './dto/purchase-request.dto';

@Injectable()
export class PurchaseRequestService {
  constructor(
    @InjectRepository(PurchaseRequest)
    private readonly repo: Repository<PurchaseRequest>,
  ) {}

  async create(data: CreatePurchaseRequestDto) {
    const productsWithStatus = data.products.map(p => ({
      ...p,
      status: p.status ?? '幫你找',
    }));

    const entity = this.repo.create({
      ...data,
      products: productsWithStatus,
      status: data.status ?? '幫你找',
    });

    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }
    // ✅ 新增：根據 buyer_id 過濾
  async findByBuyerId(buyerId: string) {
    return this.repo.find({
      where: { buyer_id: buyerId },
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { request_id: id },
    });
  }

  async update(id: string, data: Partial<UpdatePurchaseRequestDto>) {
    if (data.products) {
      data.products = data.products.map(p => ({
        ...p,
        status: p.status ?? '幫你找',
      }));
    }
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}

