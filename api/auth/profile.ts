import { apiClient } from "../cilent";

export function getProfile() {
  return apiClient("/auth/profile/", {
    method: "GET",
  });
}