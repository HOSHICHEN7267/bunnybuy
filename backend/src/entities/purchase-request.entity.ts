// bunnybuy\backend\src\entities\purchase-request.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('purchase_requests')
export class PurchaseRequest {
  @PrimaryGeneratedColumn('uuid')
  request_id: string;

  @Column()
  buyer_id: string;

  @Column()
  buyer_name: string;

  @Column('json')
  products: {
    product_id: string;
    quantity: number;
    status: string;
  }[];

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  payment: string;

  @Column({
    type: 'enum',
    enum: ['面交', '店到店'],
  })
  delivery_method: string;

  @Column({ nullable: true })
  delivery_address: string;

  @Column()
  status: string;
}
