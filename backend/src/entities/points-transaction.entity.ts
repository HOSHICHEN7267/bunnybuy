import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('points_transactions')
export class PointsTransaction {
  @PrimaryGeneratedColumn('uuid')
  transaction_id: string;

  @Column()
  user_id: string;

  @Column('int')
  points: number;

  @Column()
  transaction_type: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
