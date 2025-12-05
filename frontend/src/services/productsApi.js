import { apiFetch } from "./apiClient";
export const getProducts = (tags = []) =>
  apiFetch(`/api/products?tags=${encodeURIComponent(tags.join(","))}`);
