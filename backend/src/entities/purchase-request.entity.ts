// bunnybuy\backend\src\entities\purchase-request.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('purchase_requests')
export class PurchaseRequest {
  @PrimaryGeneratedColumn('uuid')
  request_id: string;

  @Column()
  buyer_id: string;

  @Column('json')  // 👈 這是關鍵：JSON 欄位存複合資料
  product: {
    product_id: string;
    quantity: number;
    status: string;  // '待處理'、'進行中'、'完成'、'取消'
  };

  @Column('decimal')
  total_price: number;

  @CreateDateColumn()
  created_at: Date;
}
