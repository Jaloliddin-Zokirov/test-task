import { apiClient } from "../cilent";

export function postRefresh(payload: { [key: string]: any }) {
  return apiClient("/auth/refresh/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}