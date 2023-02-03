import { useAuditLogHttp } from "@/service/http.service";
import { reactive } from "vue";
import type { LoginRequestDto } from "@/interface/dto/login-request.dto";
import { useAuthStore } from "@/stores/user-store";
import type { RegisterRequestDto } from "@/interface/dto/register-request.dto";

class AuthService {
  constructor(
    private readonly httpService = useAuditLogHttp(),
    private readonly authStore = useAuthStore()
  ) {}

  async login(user: LoginRequestDto) {
    return this.httpService
      .post<any>("auth/login", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        this.authStore.login({
          fullName: response.data.fullName,
          userName: response.data.userName,
          jwtToken: response.data.token,
        });
      });
  }

  async register(user: RegisterRequestDto) {
    return this.httpService.post<any>("auth/register", {
      userName: user.userName,
      password: user.password,
      fullName: user.fullName,
    });
  }
}

let GLOBAL_AUTH_SERVICE: AuthService | null = null;

function useAuthService() {
  if (GLOBAL_AUTH_SERVICE === null) {
    GLOBAL_AUTH_SERVICE = new AuthService();
  }
  return reactive<AuthService>(GLOBAL_AUTH_SERVICE);
}

export { useAuthService };
