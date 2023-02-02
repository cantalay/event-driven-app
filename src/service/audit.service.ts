import { useAuditLogHttp } from "@/service/http.service";
import type { AuditLogFilterDto } from "@/interface/dto/audit-log-filter.dto";
import { reactive } from "vue";
import type { AuditLogItemDto } from "@/interface/dto/audit-log-item.dto";

class AuditService {
  constructor(private readonly httpService = useAuditLogHttp()) {}

  async getAuditLogData(auditLogFilter: AuditLogFilterDto) {
    const result = await this.httpService
      .post("auditlog", auditLogFilter)
      .then((response) => {
        return {
          data: response.data.data as AuditLogItemDto[],
          count: response.data.count as number,
        };
      });
    return result;
  }
}

let GLOBAL_AUDIT_SERVICE: AuditService | null = null;
function useAuditService() {
  if (GLOBAL_AUDIT_SERVICE === null) {
    GLOBAL_AUDIT_SERVICE = new AuditService();
  }
  return reactive<AuditService>(GLOBAL_AUDIT_SERVICE);
}

export { useAuditService };
