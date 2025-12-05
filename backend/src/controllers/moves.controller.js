import { getMoves, buildAdvice } from "../services/moves.service.js";

export function listMoves(req, res) {
  res.json(getMoves());
}

export function adviceForMove(req, res) {
  const { id } = req.params;
  const profile = req.body?.profile;

  // mode: query (?mode=hiit) ou body { mode: "hiit" }
  const modeRaw = req.query?.mode || req.body?.mode || null;
  const allowed = new Set(["beginner", "hiit", "endurance"]);
  const mode = modeRaw && allowed.has(modeRaw) ? modeRaw : null;

  if (!profile) {
    return res.status(400).json({ error: "profile manquant" });
  }

  const advice = buildAdvice(id, profile, mode);
  if (!advice) {
    return res.status(404).json({ error: "mouvement introuvable" });
  }

  res.json(advice);
}
