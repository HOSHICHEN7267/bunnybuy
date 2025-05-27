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
  image_list: string[];
}

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  image_list: string[];
}

export interface Order {
  orderId: string;
  customerName: string;
  status: string;
  total: number;
  items: {
    product: Product;
    count: number;
  }[];
};

export interface MyOrder {
  request_id: string;
  buyer_id: string;
  products: {
    product_id: string;
    quantity: number;
    status: string;
  }[];
  total_price: number;
  payment: string;
  created_at: string;
  delivery_method: string;
  delivery_address: string;

};