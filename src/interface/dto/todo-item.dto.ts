import type { TodoStatusEnum } from "@/enum/todo-status.enum";

export interface TodoItemDto {
  _id: string;
  name: string;
  status: TodoStatusEnum;
}
