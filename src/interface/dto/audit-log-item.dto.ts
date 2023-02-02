import type { ActionTypeEnum } from "@/enum/action-type.enum";
import type { AuditlogTypeEnum } from "@/enum/auditlog-type.enum";

export interface AuditLogItemDto {
  _id: string;
  action: ActionTypeEnum;
  type: AuditlogTypeEnum;
  userName?: string;
  todoId?: string;
  executionTime?: Date;
}
