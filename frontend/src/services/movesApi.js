const ROOT = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = ROOT.endsWith("/api") ? ROOT : `${ROOT}/api`;

async function httpJson(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export async function getMoves() {
  return httpJson(`${API_URL}/moves`, { method: "GET" });
}

export async function getAdvice(id, profile, mode) {
  const qs = mode ? `?mode=${encodeURIComponent(mode)}` : "";
  return httpJson(`${API_URL}/moves/${id}/advice${qs}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile }),
  });
}
