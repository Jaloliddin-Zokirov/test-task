import { apiClient } from "../cilent";

export function getQuizzesRoom({room_code}: {room_code: string}) {
  return apiClient(`/quizzes/room/${room_code}`, {
    method: "GET",
  });
}

export function postQuizzes(payload: { [key: string]: any }) {
  return apiClient("/quizzes/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function postQuizzesJoin(payload: { [key: string]: any }) {
  return apiClient("/quizzes/join/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}