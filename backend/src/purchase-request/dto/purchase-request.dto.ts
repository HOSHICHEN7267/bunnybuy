export class CreatePurchaseRequestItemDto {
  product_id: string;
  quantity: number;
  status?: string;
}

export class CreatePurchaseRequestDto {
  buyer_id: string;
  products: CreatePurchaseRequestItemDto[];
  total_price: number;
  payment: string;
  delivery_method: string;
  delivery_address: string;
  status?: string;
}

export class UpdatePurchaseRequestDto {
  buyer_id?: string;
  products?: CreatePurchaseRequestItemDto[];
  total_price?: number;
  payment?: string;
  delivery_method?: string;
  delivery_address?: string;
  status?: string;
}
