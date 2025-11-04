import { apiClient } from "../cilent";

export function postRegister(payload: { [key: string]: any }) {
  return apiClient("/auth/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}