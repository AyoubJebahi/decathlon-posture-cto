import { generateCoachReply } from "../services/chat.service.js";
import { buildAdvice } from "../services/moves.service.js";

export function chat(req, res) {
  const { message, profile, moveId, mode } = req.body || {};
  if (!message) return res.status(400).json({ error: "message manquant" });
  if (!profile) return res.status(400).json({ error: "profile manquant" });

  const advice = moveId ? buildAdvice(moveId, profile, mode) : null;
  const out = generateCoachReply({ message, profile, moveId, advice });
  res.json(out);
}
