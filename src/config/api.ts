/** Browser-safe API configuration for a separate or same-origin deployment. */
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

export const API_URL =
  configuredApiUrl || (import.meta.env.DEV ? "http://127.0.0.1:5050" : "");

export function apiUrl(path: string) {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
