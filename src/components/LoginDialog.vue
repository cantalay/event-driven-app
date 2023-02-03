<template>
  <el-dialog
    v-model="dialogStore.loginDialog"
    width="30%"
    @close="dialogStore.closeLoginDialog()"
    title="User Login"
  >
    <el-form :model="loginForm">
      <el-form-item
        label="User Name"
        prop="username"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="refUserNameInput"
          v-model="loginForm.username"
          :prefix-icon="User"
          placeholder="User name"
        />
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
        @keyup.enter="login"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="refUserNameInput"
          v-model="loginForm.password"
          :prefix-icon="Lock"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogStore.closeLoginDialog()">Cancel</el-button>
        <el-button type="primary" @click="login"> Login </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useDialogStore } from "@/stores/dialog-store";
import { reactive } from "vue";
import type { LoginRequestDto } from "@/interface/dto/login-request.dto";
import { User, Lock } from "@element-plus/icons-vue";
import { useAuthService } from "@/service/auth.service";
import { ElMessage } from "element-plus";
const dialogStore = useDialogStore();
const formLabelWidth = "140px";
const loginForm = reactive<LoginRequestDto>({
  username: "",
  password: "",
});
const authService = useAuthService();

const login = () => {
  authService
    .login({
      username: loginForm.username,
      password: loginForm.password,
    })
    .then(() => {
      ElMessage({
        message: "Congrats, successfully logged in.",
        type: "success",
      });
    })
    .catch(() => {
      ElMessage.error("Oops, login failed :(");
    })
    .finally(() => {
      dialogStore.closeLoginDialog();
    });
};
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-input {
  width: 400px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
