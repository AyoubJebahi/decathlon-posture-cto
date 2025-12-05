const MOVES = [
  {
    id: "squat",
    name: "Squat",
    visualKey: "squat",
    productTags: ["mat", "bands", "dumbbells"],
    base: {
      steps: [
        "Pieds largeur d’épaules, pointes légèrement ouvertes.",
        "Inspire, recule les hanches comme si tu t’assois.",
        "Genoux dans l’axe des pointes, talons collés au sol.",
        "Descends contrôlé, puis remonte en poussant le sol."
      ],
      cues: ["Dos neutre", "Genoux alignés", "Poids stable", "Gainage"],
      mistakes: [
        { title: "Genoux qui rentrent", fix: "Pousse légèrement les genoux vers l’extérieur." },
        { title: "Talons qui se lèvent", fix: "Réduis l’amplitude et travaille la mobilité de cheville." },
        { title: "Dos arrondi", fix: "Serre le tronc, descends moins bas, regarde devant." }
      ]
    }
  },
  {
    id: "pushup",
    name: "Pompes",
    visualKey: "pushup",
    productTags: ["mat"],
    base: {
      steps: [
        "Mains sous les épaules, corps aligné (gainage).",
        "Descends en gardant les coudes à ~45° du buste.",
        "Poitrine proche du sol, nuque neutre.",
        "Remonte en poussant le sol sans casser le bassin."
      ],
      cues: ["Gainage fort", "Coudes ~45°", "Nuque neutre", "Contrôle"],
      mistakes: [
        { title: "Bassin qui s’affaisse", fix: "Contracte abdos + fessiers. Utilise une variante plus facile." },
        { title: "Coudes trop ouverts", fix: "Rapproche les coudes, vise ~45°." }
      ]
    }
  },
  {
    id: "rope",
    name: "Corde à sauter",
    visualKey: "rope",
    productTags: ["rope"],
    base: {
      steps: [
        "Coudes proches du corps, rotation surtout avec les poignets.",
        "Petits sauts (1–2 cm), atterrissage doux sur l’avant du pied.",
        "Genoux légèrement fléchis, buste grand, regard devant."
      ],
      cues: ["Sauts bas", "Atterrissage doux", "Coudes proches", "Poignets actifs", "Rythme régulier"],
      mistakes: [
        { title: "Sauts trop hauts", fix: "Réduis la hauteur : la corde passe juste sous les pieds." },
        { title: "Atterrissage bruyant", fix: "Amortis, garde les genoux souples, cadence stable." },
        { title: "Rotation avec les épaules", fix: "Garde coudes proches, tourne avec les poignets." }
      ]
    }
  }
];

export function getMoves() {
  return MOVES.map(({ id, name }) => ({ id, name }));
}

function getMoveById(id) {
  return MOVES.find((m) => m.id === id) || null;
}

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function ropeModeDefaults(profile) {
  // mode par défaut si non fourni
  const level = profile?.level || "beginner";
  return level === "beginner" ? "beginner" : "endurance";
}

function buildRopeSession(mode, profile) {
  const goal = profile?.goal || "mobility";

  // Objectif fatloss: HIIT naturellement très pertinent
  if (!mode && goal === "fatloss") mode = "hiit";

  if (mode === "hiit") {
    return {
      sessionMode: "hiit",
      extraSteps: [
        "Séance HIIT: 30s on / 30s off × 12 (≈ 12 min).",
        "Reste sur des sauts bas: la vitesse vient de la cadence, pas de la hauteur."
      ],
      plan: {
        frequency: "3–5x / semaine",
        setsReps: "12 min (30s on / 30s off × 12)",
        focus: "Cardio + technique (impact doux)",
        note: "Si débutant: commence 15s on / 45s off."
      }
    };
  }

  if (mode === "endurance") {
    return {
      sessionMode: "endurance",
      extraSteps: [
        "Séance endurance: 10–20 min à cadence confortable.",
        "Ajoute une variation douce: 1 min normal / 30s plus rapide."
      ],
      plan: {
        frequency: "3–5x / semaine",
        setsReps: "10–20 min continu (ou blocs de 3–5 min)",
        focus: "Coordination + endurance",
        note: "Stop si la technique se dégrade (bruit / gros sauts)."
      }
    };
  }

  // beginner (par défaut)
  return {
    sessionMode: "beginner",
    extraSteps: [
      "Séance débutant: 10s saut / 50s repos × 8 (≈ 8 min).",
      "Si tu n’as pas de corde: fais ‘shadow rope’ (sans corde) avec la même posture."
    ],
    plan: {
      frequency: "2–4x / semaine",
      setsReps: "8 min (10s on / 50s off × 8)",
      focus: "Apprentissage technique + faible impact",
      note: "Sur surface souple si possible."
    }
  };
}

function buildPlan(moveId, profile, mode) {
  const goal = profile?.goal || "mobility";
  const level = profile?.level || "beginner";

  if (moveId === "rope") {
    const resolvedMode = mode || ropeModeDefaults(profile);
    const session = buildRopeSession(resolvedMode, profile);

    // gain de poids → corde courte (même si hiit choisi)
    if (goal === "weightgain") {
      return {
        ...session.plan,
        frequency: "2–3x / semaine",
        setsReps: "6–10 min max (échauffement), intensité modérée",
        focus: "Garder de l’énergie pour le volume",
        note: "Priorise squat/pompes + nutrition."
      };
    }

    return session.plan;
  }

  // pour squat/pushup : simple (tu peux enrichir plus tard)
  if (goal === "strength") {
    return {
      frequency: "3–4x / semaine",
      setsReps: "4–5 séries • 4–8 reps (qualité max)",
      focus: "Technique + puissance",
      note: "Repos 90–150s"
    };
  }

  if (goal === "weightgain") {
    return {
      frequency: "3–4x / semaine",
      setsReps: "3–4 séries • 8–12 reps (tempo contrôlé)",
      focus: "Tension + récupération",
      note: "Repos 60–120s"
    };
  }

  if (goal === "fatloss") {
    return {
      frequency: "3–4x / semaine",
      setsReps: "2–3 séries • 8–12 reps (circuit)",
      focus: "Rythme + respiration",
      note: "Repos court 30–60s"
    };
  }

  // mobility / performance etc.
  if (level === "beginner") {
    return { frequency: "3x / semaine", setsReps: "2–3 séries • 6–10 reps", focus: "Technique", note: "Vidéo + checklist" };
  }
  return { frequency: "3–4x / semaine", setsReps: "3 séries • 8–12 reps", focus: "Régularité", note: "" };
}

function buildVariants(moveId, profile) {
  const constraints = profile?.constraints || [];
  const variants = [];

  if (moveId === "squat") {
    variants.push({ title: "Squat à la chaise", why: "Contrôle amplitude, parfait débutant." });
    variants.push({ title: "Squat tempo (3s descente)", why: "Stabilité + technique." });
    if (constraints.includes("knees")) variants.push({ title: "Amplitude réduite", why: "Moins de stress genoux." });
    if (constraints.includes("back")) variants.push({ title: "Goblet squat léger", why: "Aide au buste stable." });
  }

  if (moveId === "pushup") {
    variants.push({ title: "Pompes inclinées (mains sur table)", why: "Technique propre, plus facile." });
    variants.push({ title: "Pompes sur genoux", why: "Garder alignement + gainage." });
    if (constraints.includes("wrists")) variants.push({ title: "Poignées / poings", why: "Poignets plus neutres." });
  }

  if (moveId === "rope") {
    variants.push({ title: "Shadow rope (sans corde)", why: "Apprendre la technique sans impact." });
    variants.push({ title: "Pas alternés", why: "Plus facile, cadence stable." });
    if (constraints.includes("knees")) variants.push({ title: "Sauts très bas", why: "Impact minimal." });
  }

  return variants;
}

function buildWarnings(moveId, profile) {
  const c = profile?.constraints || [];
  const warnings = [];

  if (moveId === "rope" && c.includes("knees")) {
    warnings.push("Genoux sensibles: privilégie shadow rope, sauts très bas, surface souple.");
  }
  if (moveId === "rope" && c.includes("wrists")) {
    warnings.push("Poignets sensibles: rotation petite, corde légère, pauses.");
  }
  if (moveId === "squat" && c.includes("knees")) {
    warnings.push("Genoux sensibles: amplitude réduite, contrôle, pas de rebond.");
  }
  if (moveId === "pushup" && c.includes("wrists")) {
    warnings.push("Poignets: variante inclinée ou poignées/poings.");
  }

  return warnings;
}

function personalize(move, profile, mode) {
  const constraints = profile?.constraints || [];
  const equipment = profile?.equipment || [];
  const goal = profile?.goal || "mobility";
  const level = profile?.level || "beginner";

  let steps = [...move.base.steps];
  let cues = [...move.base.cues];
  let mistakes = [...move.base.mistakes];

  if (move.id === "pushup" && level === "beginner") {
    steps.unshift("Option débutant : fais des pompes inclinées (mains sur table).");
    cues.push("Priorité: technique");
  }

  if (move.id === "rope") {
    const resolvedMode = mode || ropeModeDefaults(profile);
    const session = buildRopeSession(resolvedMode, profile);

    // Matériel corde absent → suggestion shadow rope (si pas déjà dans extraSteps)
    if (!equipment.includes("rope")) {
      steps.unshift("Si tu n’as pas de corde: fais ‘shadow rope’ (sans corde), même rythme, même posture.");
    }

    // Contraintes
    if (constraints.includes("knees")) cues.push("Impact minimal");
    if (constraints.includes("wrists")) cues.push("Poignets neutres");

    // Objectif gain de poids: cadrer cardio
    if (goal === "weightgain") {
      steps.push("Gain de poids: limite la corde (6–10 min) pour garder les calories pour la prise de masse.");
      cues.push("Garde de l’énergie");
    }

    steps = uniq([...steps, ...session.extraSteps]);
    return { steps, cues: uniq(cues), mistakes, sessionMode: session.sessionMode };
  }

  return { steps: uniq(steps), cues: uniq(cues), mistakes, sessionMode: null };
}

export function buildAdvice(moveId, profile, mode) {
  const move = getMoveById(moveId);
  if (!move) return null;

  const personalized = personalize(move, profile, mode);

  return {
    moveId: move.id,
    title: move.name,
    profileTag: profile?.tag || "UNKNOWN",
    steps: personalized.steps,
    cues: personalized.cues,
    mistakes: personalized.mistakes,
    visualKey: move.visualKey,
    productTags: move.productTags,

    // dynamique
    sessionMode: personalized.sessionMode,
    plan: buildPlan(move.id, profile, mode),
    variants: buildVariants(move.id, profile),
    warnings: buildWarnings(move.id, profile)
  };
}
