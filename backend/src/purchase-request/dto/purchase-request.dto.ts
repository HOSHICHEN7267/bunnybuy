export class CreatePurchaseRequestItemDto {
  product_id: string;
  quantity: number;
  status?: string;
}


// 建立
export class CreatePurchaseRequestDto {
  buyer_id: string;
  buyer_name: string;
  products: {
    product_id: string;
    quantity: number;
    status?: string;          // ✔ 可選，後端預設 '幫你找'
  }[];
  total_price: number;
  payment: string;
  delivery_method: '面交' | '店到店';
  delivery_address?: string;
}

// 更新
export class UpdatePurchaseRequestDto {
  products?: {
    product_id: string;
    quantity?: number;
    status?: string;
  }[];
  total_price?: number;
  payment?: string;
  delivery_method?: '面交' | '店到店';
  delivery_address?: string;
}