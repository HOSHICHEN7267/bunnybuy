// bunnybuy\backend\src\entities\purchase-assignment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase_assignments')
export class PurchaseAssignment {
  @PrimaryGeneratedColumn('uuid')
  assignment_id: string;

  @Column()
  request_id: string;

  @Column()
  agent_id: string;

  @Column()
  status: string;

  @Column()
  delivery_method: string;

  @Column('text')
  delivery_address: string;

  @Column('date')
  delivery_date: Date;
}