import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  discount: number;

  @Column('json', { nullable: true })
  stock_list: {
    store_name: string;
    stock: number;
    provider_id: string;
  }[];

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('json', { nullable: true })
  image_list: string[];
}