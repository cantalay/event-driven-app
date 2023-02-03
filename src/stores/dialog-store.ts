import { defineStore } from "pinia";
interface Actions {
  openLoginDialog(): void;
  closeLoginDialog(): void;
  openRegisterDialog(): void;
  closeRegisterDialog(): void;
  openTodoDetailDialog(): void;
  closeTodoDetailDialog(): void;
}
interface State {
  loginDialog: boolean;
  registerDialog: boolean;
  todoDetailDialog: boolean;
}
export const useDialogStore = defineStore<string, State, any, Actions>({
  id: "dialog",
  state: () => ({
    loginDialog: false,
    registerDialog: false,
    todoDetailDialog: false,
  }),
  actions: {
    openLoginDialog() {
      this.loginDialog = true;
    },
    closeLoginDialog() {
      this.loginDialog = false;
    },
    openRegisterDialog() {
      this.registerDialog = true;
    },
    closeRegisterDialog() {
      this.registerDialog = false;
    },
    openTodoDetailDialog() {
      this.todoDetailDialog = true;
    },
    closeTodoDetailDialog() {
      this.todoDetailDialog = false;
    },
  },
});
