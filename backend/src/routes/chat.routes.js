import { Router } from "express";
import Groq from "groq-sdk";

const router = Router();

// Charger la clé API GROQ
const API_KEY = process.env.GROQ_API_KEY;

// Si clé absente → chatbot reste accessible mais ne crash jamais
let groq = null;
if (API_KEY) {
  groq = new Groq({ apiKey: API_KEY });
}

// Endpoint chat
router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: "Message vide" });
  }

  // Si pas de clé API → répondre sans crash
  if (!groq) {
    return res.json({
      reply: "⚠️ Chatbot désactivé : ajoute une GROQ_API_KEY dans ton fichier .env pour activer l'IA."
    });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: message }]
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Désolé, je n'ai pas pu générer une réponse.";

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    return res.status(500).json({
      error: "Erreur IA",
      detail: err.message
    });
  }
});

export default router;
