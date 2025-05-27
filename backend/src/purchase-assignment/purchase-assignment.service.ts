// src/purchase-assignment/purchase-assignment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseAssignment } from '../entities/purchase-assignment.entity';
import { CreatePurchaseAssignmentDto, UpdatePurchaseAssignmentDto } from "./dto/purchase-assignment.dto";

@Injectable()
export class PurchaseAssignmentService {
  constructor(
    @InjectRepository(PurchaseAssignment)
    private readonly repo: Repository<PurchaseAssignment>,
  ) {}

  create(data: CreatePurchaseAssignmentDto) {
    const assignment = this.repo.create({
      ...data,
      status: data.status ?? '已接受',  // 預設為「已接受」
    });

    return this.repo.save(assignment);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ assignment_id: id });
  }

  update(id: string, data: UpdatePurchaseAssignmentDto) {
    return this.repo.update(id, data);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
