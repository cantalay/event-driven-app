<script setup lang="ts">
import AuditLogView from "@/views/AuditLogView.vue";
import LoginDialog from "@/components/LoginDialog.vue";
import RegisterDialog from "@/components/RegisterDialog.vue";
import TodoDetailDialog from "@/components/TodoDetailDialog.vue";
</script>

<template>
  <AuditLogView></AuditLogView>
  <LoginDialog></LoginDialog>
  <RegisterDialog></RegisterDialog>
  <TodoDetailDialog></TodoDetailDialog>
</template>
