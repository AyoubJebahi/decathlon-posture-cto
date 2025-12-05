import { Router } from "express";

const router = Router();

const PRODUCTS = {
  rope: [
    {
      name: "Corde à sauter Domyos",
      url: "https://www.decathlon.fr/rope"
    }
  ],
  mat: [
    {
      name: "Tapis de sport Domyos",
      url: "https://www.decathlon.fr/tapis"
    }
  ]
};

router.get("/", (req, res) => {
  const tags = (req.query.tags || "").split(",").filter(Boolean);

  if (tags.length === 0) return res.json([]);

  let result = [];
  tags.forEach((t) => {
    if (PRODUCTS[t]) result = result.concat(PRODUCTS[t]);
  });

  res.json(result);
});

export default router;
