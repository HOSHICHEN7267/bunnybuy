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
  buyer_name: string;
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

export interface YourOrder {
  assignment_id: string;
  product_id: string;
  quantity: number;
  request_id: string;
  agent_id: string;
  status: string;
  delivery_date: string;
};

export interface User {
  user_id: string;
  email: string;
  username: string;
  role?: string;
  points?: number; // ✅ 新增這行
}


export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}
