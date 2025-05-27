// src/dto/create-purchase-request.dto.ts
export class CreatePurchaseRequestDto {
  buyer_id: string;
  product: {
    product_id: string;
    quantity: number;
    status: string;
  };
  total_price: number;
}
// src/dto/update-purchase-request.dto.ts
export class UpdatePurchaseRequestDto {
  product?: {
    product_id?: string;
    quantity?: number;
    status?: string;
  };
  total_price?: number;
}