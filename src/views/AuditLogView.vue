<template>
  <el-table
    class="about"
    :data="auditLogs"
    height="400"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column
      prop="executionTime"
      label="Execution Date"
      width="210"
      sortable
    />
    <el-table-column prop="action" label="Action" width="200" />
    <el-table-column prop="type" label="Type" />
    <el-table-column prop="userName" label="User Name" />
    <el-table-column prop="todoId" label="Todo ID" />
  </el-table>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 50, 100]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalItem"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { useAuditService } from "@/service/audit.service";
import { reactive, ref } from "vue";
import type { AuditLogItemDto } from "@/interface/dto/audit-log-item.dto";
import type { ActionTypeEnum } from "@/enum/action-type.enum";
import type { AuditlogTypeEnum } from "@/enum/auditlog-type.enum";
import type { AuditLogFilterDto } from "@/interface/dto/audit-log-filter.dto";

const auditService = useAuditService();
const currentPage = ref<number>(1);
const totalItem = ref<number>();
let auditLogs = ref<AuditLogItemDto[]>([]);

const pagination = ref({ page: 0, pageSize: 1 });

const auditFilter = reactive<AuditLogFilterDto>({
  actions: [],
  types: [],
  users: [],
  todoId: "",
  pagination: { page: 1, pageSize: 10 },
});

const getAuditLog = () => {
  auditService.getAuditLogData(auditFilter).then((response) => {
    totalItem.value = response.count;
    console.log(response.count);
    auditLogs.value = response.data.map((response) => {
      const auditLogItem: AuditLogItemDto = {
        _id: response._id,
        action: response.action,
        type: response.type,
        userName: response.userName,
        todoId: response.todoId,
        executionTime: response.executionTime,
      };
      return auditLogItem;
    });
  });
};
function handleCurrentChange(value: number) {
  auditFilter.pagination!.page = value;
  getAuditLog();
}

function handleSizeChange(value: number) {
  auditFilter.pagination!.pageSize = value;
  auditFilter.pagination!.page = 1;

  getAuditLog();
}
getAuditLog();
</script>

<style></style>
