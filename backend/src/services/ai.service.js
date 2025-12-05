import OpenAI from "openai";

const groqKey = process.env.GROQ_API_KEY;

export function hasAI() {
  return Boolean(groqKey);
}

function client() {
  return new OpenAI({
    apiKey: groqKey,
    baseURL: "https://api.groq.com/openai/v1", // OpenAI-compatible :contentReference[oaicite:1]{index=1}
  });
}

export async function askCoachAI({ message, profile, moveId, mode, advice }) {
  if (!groqKey) {
    throw new Error("GROQ_API_KEY manquante (backend/.env).");
  }

  const system = `
Tu es un coach sportif spécialisé posture & prévention des blessures.
Réponse: courte, actionnable, structurée (max 10 lignes).
Ne fais pas de diagnostic médical. Si douleur vive/inhabituelle -> stop + avis professionnel.
Demande 1 précision si nécessaire.
`.trim();

  const context = {
    profile,
    moveId,
    mode,
    advice: advice
      ? {
          title: advice.title,
          cues: advice.cues,
          plan: advice.plan,
          warnings: advice.warnings,
          variants: advice.variants,
        }
      : null,
  };

  const resp = await client().chat.completions.create({
    // Modèle doc Groq (tu peux aussi lister /models) :contentReference[oaicite:2]{index=2}
    model: "llama-3.1-8b-instant",
    temperature: 0.4,
    max_tokens: 300,
    messages: [
      { role: "system", content: system },
      { role: "user", content: `Contexte: ${JSON.stringify(context)}\n\nQuestion: ${message}` },
    ],
  });

  return resp.choices?.[0]?.message?.content?.trim() || "Je n’ai pas compris.";
}
