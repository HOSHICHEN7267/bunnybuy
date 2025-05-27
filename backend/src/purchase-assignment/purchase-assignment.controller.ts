// src/purchase-assignment/purchase-assignment.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PurchaseAssignmentService } from './purchase-assignment.service';
import { CreatePurchaseAssignmentDto, UpdatePurchaseAssignmentDto } from './dto/purchase-assignment.dto';

@Controller('purchase-assignments')
export class PurchaseAssignmentController {
  constructor(private readonly service: PurchaseAssignmentService) {}

  @Post()
  create(@Body() dto: CreatePurchaseAssignmentDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdatePurchaseAssignmentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
