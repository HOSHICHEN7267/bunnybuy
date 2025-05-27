// bunnybuy\backend\src\purchase-request\purchase-request.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRequest } from '../entities/purchase-request.entity';
import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseRequestController } from './purchase-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseRequest])],
  controllers: [PurchaseRequestController],
  providers: [PurchaseRequestService],
})
export class PurchaseRequestModule {}
