function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateCoachReply({ message, profile, moveId, advice }) {
  const goal = profile?.goal || "mobility";
  const level = profile?.level || "beginner";
  const constraints = profile?.constraints || [];
  const equipment = profile?.equipment || [];

  const m = (message || "").toLowerCase();

  // réponses "compréhensions"
  if (m.includes("douleur") || m.includes("mal") || m.includes("bobo")) {
    return {
      reply:
        "Ok — si tu as une douleur vive (pas juste un effort), stop. Dis-moi où exactement (genou/dos/poignet) et pendant quelle phase du mouvement (descente/remontée/sauts). Je te propose une variante plus safe."
    };
  }

  if (moveId === "rope" && (m.includes("corde") || m.includes("saut"))) {
    if (!equipment.includes("rope")) {
      return { reply: "Pas de corde ? Fais ‘shadow rope’ : mêmes petits sauts + poignets qui tournent. Objectif: posture propre, impact doux." };
    }
    if (constraints.includes("knees")) {
      return { reply: "Genoux sensibles: sauts très bas (1–2 cm), surface souple, cadence tranquille. Si douleur → shadow rope ou marche rapide." };
    }
    return { reply: "Sur la corde : coudes proches, poignets actifs, sauts bas. Le bruit doit être minimal." };
  }

  if (m.includes("résumé") || m.includes("resume")) {
    const line1 = `Ton objectif: ${goal} | niveau: ${level}`;
    const line2 = advice?.plan ? `Plan: ${advice.plan.frequency} — ${advice.plan.setsReps}` : "Plan: continue avec régularité.";
    return { reply: `${line1}\n${line2}\nDis-moi ce qui bloque (technique, souffle, douleur) et je t’aide.` };
  }

  // réponse générique (motiv + action)
  const hooks = [
    "Ok, on optimise ta posture.",
    "Parfait, on ajuste ça en 30 secondes.",
    "Je te guide pas à pas."
  ];
  const nextSteps = advice?.cues?.length
    ? `Focus maintenant: ${pick(advice.cues)}.`
    : "Focus maintenant: contrôle + respiration.";

  return { reply: `${pick(hooks)} ${nextSteps} Pose-moi une question précise (ex: “mes genoux rentrent”, “je fatigue vite”).` };
}
