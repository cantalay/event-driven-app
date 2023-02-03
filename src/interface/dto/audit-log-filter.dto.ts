import type { ActionTypeEnum } from "@/enum/action-type.enum";
import type { AuditlogTypeEnum } from "@/enum/auditlog-type.enum";

export interface AuditLogFilterDto {
  actions?: ActionTypeEnum[];
  type?: AuditlogTypeEnum[];
  userName?: string;
  todoId?: string;
  pagination?: { page: number; pageSize: number };
}
