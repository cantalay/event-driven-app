import axios from "axios";

const APIKEY = "Bearer d1rct5pw0jjpmpblmsukiqgwmioxyx3ng74ey8bo";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  /*
  headers: { Authorization: APIKEY } as HeadersDefaults,*/
});
function useAuditLogHttp() {
  return axiosInstance;
}

export { useAuditLogHttp };
