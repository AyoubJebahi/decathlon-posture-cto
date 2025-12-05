export function computeAdvice(move, profile, mode) {
  return {
    title: move.name,
    profileTag: profile.tag || "standard",
    visualKey: move.visualKey,
    productTags: move.productTags || [],
    steps: move.steps,
    cues: move.cues,
    mistakes: move.mistakes,
    plan: move.plan,
    warnings: [],
    variants: []
  };
}
