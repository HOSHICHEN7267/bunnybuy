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

  /* --------- 建立 --------- */
  async create(data: CreatePurchaseRequestDto) {
    const productsWithStatus = data.products.map(p => ({
      ...p,
      status: p.status ?? '幫你找',   // ✅ 僅對商品預設
    }));

    const entity = this.repo.create({
      ...data,
      products: productsWithStatus,
      // ⛔ 不再有 entity.status
    });

    return this.repo.save(entity);
  }

  /* --------- 讀 --------- */
  findAll() {
    return this.repo.find();
  }

  async findByBuyerId(buyerId: string) {
    return this.repo.find({
      where: { buyer_id: buyerId },
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { request_id: id } });
  }

  /* --------- 更新 --------- */
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

  /* --------- 刪 --------- */
  remove(id: string) {
    return this.repo.delete(id);
  }
}
