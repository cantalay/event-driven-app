import { useAuditLogHttp } from "@/service/http.service";
import { reactive } from "vue";
import { useAuthStore } from "@/stores/user-store";
import type { TodoItemDto } from "@/interface/dto/todo-item.dto";

class TodoService {
  constructor(
    private readonly httpService = useAuditLogHttp(),
    private readonly authStore = useAuthStore()
  ) {}

  async updateItem(item: TodoItemDto) {
    return this.httpService.patch<any>(`todo-item/${item._id}`, {
      name: item.name,
    });
  }

  async getItemDetail(id: string): Promise<TodoItemDto> {
    const response = await this.httpService.get<any>(`todo-item/${id}`);
    const item = response.data;
    return {
      _id: item._id,
      name: item.name,
      status: item.status,
    };
  }
}

let GLOBAL_AUTH_SERVICE: TodoService | null = null;

function useTodoService() {
  if (GLOBAL_AUTH_SERVICE === null) {
    GLOBAL_AUTH_SERVICE = new TodoService();
  }
  return reactive<TodoService>(GLOBAL_AUTH_SERVICE);
}

export { useTodoService };
