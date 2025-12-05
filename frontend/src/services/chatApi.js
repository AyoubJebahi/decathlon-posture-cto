const ROOT = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = ROOT.endsWith("/api") ? ROOT : `${ROOT}/api`;

async function httpJson(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
  return data;
}

export async function sendChat({ message, profile, moveId, mode }) {
  return httpJson(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, profile, moveId, mode }),
  });
}
