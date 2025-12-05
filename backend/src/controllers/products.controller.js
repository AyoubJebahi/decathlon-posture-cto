import { getProductsByTags } from "../services/products.service.js";

export function listProducts(req, res) {
  const tags = (req.query.tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  res.json(getProductsByTags(tags));
}
