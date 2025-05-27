// src/dto/create-purchase-request.dto.ts
export class CreatePurchaseRequestDto {
  buyer_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  status?: string; // optional: 預設為 '待處理'
}

// src/dto/update-purchase-request.dto.ts
export class UpdatePurchaseRequestDto {
  quantity?: number;
  total_price?: number;
  status?: string;
}
