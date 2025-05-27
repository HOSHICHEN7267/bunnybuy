// bunnybuy\backend\src\purchase-request\purchase-request.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';
import { CreatePurchaseRequestDto, UpdatePurchaseRequestDto } from './dto/purchase-request.dto';

@Controller('purchase-requests')
export class PurchaseRequestController {
  constructor(private readonly service: PurchaseRequestService) {}

  @Post()
  create(@Body() dto: CreatePurchaseRequestDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePurchaseRequestDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
