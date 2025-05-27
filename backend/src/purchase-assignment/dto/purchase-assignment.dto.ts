// src/purchase-assignment/dto/purchase-assignment.dto.ts
export class CreatePurchaseAssignmentDto {
  request_id: string;
  agent_id: string;
  delivery_method: string;
  delivery_address: string;
  delivery_date: Date;
  status?: string;
}

export class UpdatePurchaseAssignmentDto {
  status?: string;
  delivery_method?: string;
  delivery_address?: string;
  delivery_date?: Date;
}
