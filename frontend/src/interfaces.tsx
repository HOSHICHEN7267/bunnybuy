export interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock_list: {
    store_name: string;
    stock: number;
    provider_id: string;
  }[];
  status: string;
  created_at: string;
  image: string[];
}

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  image: string[];
}