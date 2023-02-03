import axios from "axios";

//TODO: Change here to BE host and port
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  /*
  headers: { Authorization: APIKEY } as HeadersDefaults,*/
});
function useAuditLogHttp() {
  return axiosInstance;
}

export { useAuditLogHttp };
