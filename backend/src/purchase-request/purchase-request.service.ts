// bunnybuy\backend\src\purchase-request\purchase-request.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseRequest } from '../entities/purchase-request.entity';
import { CreatePurchaseRequestDto, UpdatePurchaseRequestDto } from './dto/purchase-request.dto';


@Injectable()
export class PurchaseRequestService {
  constructor(
    @InjectRepository(PurchaseRequest)
    private readonly repo: Repository<PurchaseRequest>,
  ) {}

  create(data: CreatePurchaseRequestDto) {
    const entity = this.repo.create({ ...data, status: data.status ?? '待處理' });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ request_id: id });
  }

  update(id: string, data: UpdatePurchaseRequestDto) {
    return this.repo.update(id, data);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
