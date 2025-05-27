import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column()
  provider_id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  discount: number;

  @Column('int')
  stock: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('json', { nullable: true })
  image_list: string[];
}