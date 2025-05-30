// src/purchase-assignment/purchase-assignment.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { PurchaseAssignmentService } from './purchase-assignment.service';
import { CreatePurchaseAssignmentDto, UpdatePurchaseAssignmentDto } from './dto/purchase-assignment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('purchase-assignments')
export class PurchaseAssignmentController {
  constructor(private readonly service: PurchaseAssignmentService) {}

  @Post()
  create(@Body() dto: CreatePurchaseAssignmentDto) {
    return this.service.create(dto);
  }

  // ✅ 安全版本：取得登入者自己的接單
  @UseGuards(JwtAuthGuard)
  @Get('my')
  getMyAssignments(@Request() req) {
    const agentId = req.user.user_id;
    return this.service.findByAgent(agentId);
  }

  // ❌ 這個可以保留給 admin，用來 debug 或列出所有紀錄
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
