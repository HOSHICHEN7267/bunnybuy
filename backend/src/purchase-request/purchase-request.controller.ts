// bunnybuy\backend\src\purchase-request\purchase-request.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards ,
  Request,
} from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';
import {
  CreatePurchaseRequestDto,
  UpdatePurchaseRequestDto,
} from './dto/purchase-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 確保這路由有登入保護


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

  @Get('my') // 👈 加上這個 API 只拿自己的訂單
  @UseGuards(JwtAuthGuard) // 🔐 僅限登入用戶
  getMyOrders(@Request() req) {
    const userId = req.user.user_id; // 假設 JWT payload 裡有 user_id
    return this.service.findByBuyerId(userId);
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
