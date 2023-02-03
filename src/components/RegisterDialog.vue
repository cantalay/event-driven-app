<template>
  <el-dialog
    v-model="dialogStore.registerDialog"
    width="33%"
    @close="dialogStore.closeRegisterDialog()"
    title="User Register"
  >
    <el-form :model="registerForm">
      <el-form-item
        label="User Name"
        prop="userName"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="refuserNameInput"
          v-model="registerForm.userName"
          :prefix-icon="User"
          placeholder="User name"
        />
      </el-form-item>
      <el-form-item
        label="Full Name"
        prop="userName"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="refuserNameInput"
          v-model="registerForm.fullName"
          :prefix-icon="User"
          placeholder="Full name"
        />
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
        @keyup.enter="register"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="refuserNameInput"
          v-model="registerForm.password"
          :prefix-icon="Lock"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogStore.closeRegisterDialog()">Cancel</el-button>
        <el-button type="primary" @click="register"> Register </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useDialogStore } from "@/stores/dialog-store";
import { reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useAuthService } from "@/service/auth.service";
import { ElMessage } from "element-plus";
import type { RegisterRequestDto } from "@/interface/dto/register-request.dto";
const dialogStore = useDialogStore();
const formLabelWidth = "140px";
const registerForm = reactive<RegisterRequestDto>({
  userName: "",
  fullName: "",
  password: "",
});
const authService = useAuthService();

const register = () => {
  authService
    .register({
      userName: registerForm.userName,
      password: registerForm.password,
      fullName: registerForm.fullName,
    })
    .then(() => {
      ElMessage({
        message: "Congrats, successfully registered. Please Log in",
        type: "success",
      });
    })
    .catch((err) => {
      if (err.response.data.message.includes("E11000")) {
        ElMessage.info(`User exist please change username`);
      } else {
        ElMessage.error(`Registeration error: ${err.message}`);
      }
    })
    .finally(() => {
      dialogStore.closeRegisterDialog();
      dialogStore.openLoginDialog();
    });
};
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-input {
  width: 500px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
