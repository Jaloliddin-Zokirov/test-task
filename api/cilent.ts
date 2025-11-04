const API_BASE = "https://test-task-backend-production-80c6.up.railway.app/api";
// const API_BASE = "http://127.0.0.1:8000/api";

type ApiOptions = RequestInit & { parseJson?: boolean };

export async function apiClient<T = unknown>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const { parseJson = true, headers, ...rest } = options;

  // headersni to'g'ri tipda e'lon qilish
  const authHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(headers || {}),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      (authHeaders as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: authHeaders,
    ...rest,
  });

  if (!res.ok) {
    let detail: string | undefined;
    try {
      const body = await res.json();
      detail = body?.detail || body?.message;
    } catch {}
    // locale ga qarab xabarni tanlash
    
    let defaultMessage = "Server Error";

    throw new Error(detail || res.statusText || defaultMessage);
  }

  if (!parseJson || res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}