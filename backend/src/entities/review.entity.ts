// bunnybuy\backend\src\entities\review.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  review_id: string;

  @Column()
  user_id: string;

  @Column()
  agent_id: string;

  @Column('tinyint')
  rating: number;

  @Column('text')
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
