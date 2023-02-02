import { useAuditLogHttp } from "@/service/http.service";
import { reactive } from "vue";
import type { LoginRequestDto } from "@/interface/dto/login-request.dto";
import type { LoginResponseDto } from "@/interface/dto/login-response.dto";
class AuthService {
  constructor(private readonly httpService = useAuditLogHttp()) {}
  async getDatafromhttp(user: LoginRequestDto): Promise<LoginResponseDto> {
    const result = await this.httpService.post<any>("auth/login", {
      username: user.username,
      password: user.password,
    });
    return result.data as LoginResponseDto;
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
