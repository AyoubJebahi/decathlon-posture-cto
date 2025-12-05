import { Router } from "express";
import moves from "../data/moves.config.json" with { type: "json" };
import { computeAdvice } from "../utils/computeAdvice.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(
    moves.map((m) => ({
      id: m.id,
      name: m.name
    }))
  );
});

router.post("/:id/advice", (req, res) => {
  const move = moves.find((m) => m.id === req.params.id);
  if (!move) return res.status(404).json({ error: "Move not found" });

  const profile = req.body.profile || {};
  const mode = req.query.mode || null;

  const advice = computeAdvice(move, profile, mode);
  res.json(advice);
});

export default router;
