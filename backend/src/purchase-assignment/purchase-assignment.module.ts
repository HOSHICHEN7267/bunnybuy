// src/purchase-assignment/purchase-assignment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseAssignment } from '../entities/purchase-assignment.entity';
import { PurchaseAssignmentService } from "./purchase-assignment.service";
import { PurchaseAssignmentController } from "./purchase-assignment.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseAssignment])],
  providers: [PurchaseAssignmentService],
  controllers: [PurchaseAssignmentController],
})
export class PurchaseAssignmentModule {}
