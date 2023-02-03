<template>
  <el-container class="audit-container" style="height: 100vh">
    <el-aside width="250px">
      <el-scrollbar style="padding-left: 10px">
        <div
          style="
            height: 50px;
            text-align: inherit;
            margin-top: 10px;
            margin-left: 10px;
          "
        >
          <h2>Filter</h2>
        </div>

        <el-row>
          <el-row>
            <h4 class="filter-header">Username Filter</h4>
            <el-input
              v-model="auditFilter.userName"
              @input="(auditFilter.pagination.page = 1), getAuditLog()"
              placeholder="Please Search Username"
              :prefix-icon="Search"
            ></el-input>
            <div style="font-style: italic; font-size: 10px; color: darkgray">
              Please write some text for searching username and press enter
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <h4 class="filter-header">TodoID Filter</h4>
            <el-input
              placeholder="Please Search TodoID"
              v-model="auditFilter.todoId"
              @input="(auditFilter.pagination.page = 1), getAuditLog()"
              :prefix-icon="Search"
            ></el-input>
            <div style="font-style: italic; font-size: 10px; color: darkgray">
              Please write some text for searching username and press enter
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <h4 class="filter-header">Action Filter</h4>
            <el-select
              v-model="auditFilter.actions"
              multiple
              filterable
              allow-create
              default-first-option
              @change="(auditFilter.pagination.page = 1), getAuditLog()"
              :reserve-keyword="false"
              placeholder="Choose action for your query"
            >
              <el-option
                v-for="item in Object.values(ActionTypeEnum)"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <div style="font-style: italic; font-size: 10px; color: darkgray">
              Please write some text for searching username and press enter
            </div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <h4 class="filter-header">Type Filter</h4>
            <el-select
              v-model="auditFilter.type"
              filterable
              allow-create
              clearable
              default-first-option
              :reserve-keyword="false"
              @change="(auditFilter.pagination.page = 1), getAuditLog()"
              placeholder="Choose type for your query"
            >
              <el-option
                v-for="item in Object.keys(AuditlogTypeEnum)"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <div style="font-style: italic; font-size: 10px; color: darkgray">
              Please write some text for searching username and press enter
            </div>
          </el-row>
        </el-row>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header
        style="
          text-align: right;
          justify-content: space-between;
          font-size: 12px;
        "
      >
        <div class="toolbar">
          <h2>Audit</h2>
          <div>
            <el-button
              v-if="authStore.user"
              class="custom-icon-button"
              style="margin-bottom: 5px"
              :icon="SwitchButton"
              size="large"
              circle
              @click="authStore.logout()"
            />
            <span v-if="authStore.user">{{ authStore.user.userName }}</span>
            <el-dropdown v-else>
              <el-icon style="margin-right: 8px; margin-top: 1px">
                <user-filled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    icon="UserFilled"
                    @click="dialogStore.openLoginDialog()"
                    >Login
                  </el-dropdown-item>
                  <el-dropdown-item @click="dialogStore.openRegisterDialog()"
                    >Register
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <el-table
            class="about"
            v-loading="loading"
            stripe
            :data="auditLogs"
            :default-sort="{ prop: 'date', order: 'descending' }"
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
            <el-table-column prop="todoId" label="Todo ID">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span
                    style="
                      color: cornflowerblue;
                      text-decoration: underline;
                      cursor: pointer;
                    "
                    @click="setTodoId(scope.row.todoId)"
                    >{{ scope.row.todoId }}</span
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="paginator"
            v-model:current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItem"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useAuditService } from "@/service/audit.service";

import { onMounted, reactive, ref } from "vue";
import type { AuditLogItemDto } from "@/interface/dto/audit-log-item.dto";
import { ActionTypeEnum } from "@/enum/action-type.enum";
import { AuditlogTypeEnum } from "@/enum/auditlog-type.enum";
import type { AuditLogFilterDto } from "@/interface/dto/audit-log-filter.dto";
import { Search, SwitchButton, UserFilled } from "@element-plus/icons-vue";
import { useAuthStore } from "@/stores/user-store";
import { useDialogStore } from "@/stores/dialog-store";

const loading = ref(true);
const auditService = useAuditService();
const currentPage = ref<number>(1);
const totalItem = ref<number>();
let auditLogs = ref<AuditLogItemDto[]>([]);
const authStore = useAuthStore();
const dialogStore = useDialogStore();
const todoItemId = ref<string>();
onMounted(() => {
  getAuditLog();
});

const props = defineProps({
  todoItemId: { type: String, required: true },
});

const setTodoId = (value: any) => {
  dialogStore.openTodoDetailDialog();
  props.todoItemId = value;
};

const auditFilter = reactive<AuditLogFilterDto>({
  actions: [],
  type: [],
  userName: "",
  todoId: "",
  pagination: { page: 1, pageSize: 10 },
});

const getAuditLog = () => {
  loading.value = true;
  auditService
    .getAuditLogData(auditFilter)
    .then((response) => {
      totalItem.value = response.count;
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
    })
    .finally(() => {
      currentPage.value = auditFilter.pagination!.page;
      loading.value = false;
    });
};

const handleCurrentChange = (value: number) => {
  auditFilter.pagination!.page = value;
  currentPage.value = value;
  getAuditLog();
};

const handleSizeChange = (value: number) => {
  auditFilter.pagination!.pageSize = value;
  auditFilter.pagination!.page = 1;
  currentPage.value = 1;
  getAuditLog();
};
</script>

<style scoped>
.audit-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.audit-container .el-aside {
  color: var(--el-text-color-primary);
}

.audit-container .el-menu {
  border-right: none;
}

.audit-container .el-main {
  padding: 0;
}

.audit-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  right: 20px;
  width: 98%;
}

.audit-container .header-text {
  font-size: 25px;
  align-self: center;
  padding: 10px;
}

.audit-container .el-row {
  width: 200px;
}

.paginator {
  padding-top: 10px;
  float: right;
  right: 5vh;
}

.filter-header {
  padding-bottom: 10px;
  font-style: italic;
  font-size: medium;
}

.custom-icon-button {
  background: transparent;
  color: chocolate;
  font-size: x-large;
}
</style>
