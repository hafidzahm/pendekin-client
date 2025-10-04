import axios from "axios";

export const http = axios.create({
  baseURL: "https://pendekin-api.hafizh.web.id/api",
});
