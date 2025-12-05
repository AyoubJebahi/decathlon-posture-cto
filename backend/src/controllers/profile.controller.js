import { computeProfile } from "../services/profile.service.js";

export function createProfile(req, res) {
  const answers = req.body; // on reçoit directement les réponses du QCM

  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ error: "Réponses invalides" });
  }

  const profile = computeProfile(answers);
  return res.json(profile);
}
