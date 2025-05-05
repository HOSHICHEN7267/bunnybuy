import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('purchase_requests')
export class PurchaseRequest {
  @PrimaryGeneratedColumn('uuid')
  request_id: string;

  @Column()
  buyer_id: string;

  @Column()
  product_id: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  total_price: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}