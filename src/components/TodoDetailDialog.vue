<template>
  <el-dialog
    v-model="dialogStore.todoDetailDialog"
    width="20%"
    @close="dialogStore.closeTodoDetailDialog()"
    title="Todo Item"
  >
    <el-form :model="todoForm">
      <el-form-item label="id" prop="_id" :label-width="formLabelWidth">
        <el-input disabled v-model="todoForm._id" />
      </el-form-item>
      <el-form-item label="status" prop="status" :label-width="formLabelWidth">
        <el-input :disabled="isDisable" v-model="todoForm.status" />
      </el-form-item>
      <el-form-item label="name" prop="name" :label-width="formLabelWidth">
        <el-input :disabled="isDisable" v-model="todoForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogStore.closeTodoDetailDialog()"
          >Cancel</el-button
        >
        <el-button v-if="isDisable" type="primary" @click="isDisable = false">
          Edit item
        </el-button>
        <el-button v-else type="primary" @click="updateItem">
          Update
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useDialogStore } from "@/stores/dialog-store";
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import { ElMessage } from "element-plus";
import type { TodoItemDto } from "@/interface/dto/todo-item.dto";
import { TodoStatusEnum } from "@/enum/todo-status.enum";
import { useTodoService } from "@/service/todo-service";

const dialogStore = useDialogStore();
const formLabelWidth = "100px";
const isDisable = ref<boolean>(true);

const props = defineProps({
  todoItemId: String,
});
const { todoItemId } = toRefs(props);

watch(todoItemId, () => {
  it.value = false;
  setTimeout(() => {
    isShowing.value = true;
  }, 500);
});

const todoForm = reactive<TodoItemDto>({
  _id: "",
  name: "",
  status: TodoStatusEnum.TODO,
});
const todoService = useTodoService();

const getItem = () => {
  todoService.getItemDetail("").then((result: TodoItemDto) => {
    todoForm._id = result._id;
    todoForm.name = result.name;
    todoForm.status = result.status;
  });
};
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
