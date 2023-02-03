<template>
  <el-container class="audit-container" style="height: 100vh">
    <el-aside width="250px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Search TodoId
            </template>
            <el-menu-item index="1-1">SEARCH</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Search username
            </template>
            <el-menu-item index="2-1">SEARCH user</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>Action Filter
            </template>
            <el-menu-item index="3-1">SEARCH action</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><setting /></el-icon>Type Filter
            </template>
            <el-menu-item index="4-1">SEARCH type</el-menu-item>
          </el-sub-menu>
        </el-menu>
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
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px"
                ><setting
              /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>View</el-dropdown-item>
                  <el-dropdown-item>Add</el-dropdown-item>
                  <el-dropdown-item>Delete</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>Tom</span>
          </div>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
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
</style>
