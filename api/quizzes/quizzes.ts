import { apiClient } from "../cilent";

export function getQuizzes() {
  return apiClient("/quizzes/", {
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
  return apiClient("/quizzes/join", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function postQuizzesStart(id: number, payload: { [key: string]: any }) {
  return apiClient(`/quizzes/${id}/start/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function postQuizzesFinish(id: string, payload: { [key: string]: any }) {
  return apiClient(`/quizzes/${id}/finish/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}