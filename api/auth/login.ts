import { apiClient } from "../cilent";

export function postLogin(payload: { [key: string]: any }) {
  return apiClient("/auth/login/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}