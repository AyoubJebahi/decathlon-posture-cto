const PRODUCTS = [
  {
    tag: "mat",
    name: "Tapis de yoga / fitness",
    url: "https://www.decathlon.fr/tous-les-sports/yoga/tapis-de-yoga",
  },
  {
    tag: "bands",
    name: "Bandes de résistance",
    url: "https://www.decathlon.fr/tous-les-sports/musculation/bandes-elastiques",
  },
  {
    tag: "dumbbells",
    name: "Haltères",
    url: "https://www.decathlon.fr/tous-les-sports/musculation/halteres",
  },
  {
    tag: "rope",
    name: "Corde à sauter",
    url: "https://www.decathlon.fr/tous-les-sports/fitness-cardio-training/cordes-a-sauter",
  },
];

export function getProductsByTags(tags = []) {
  const set = new Set(tags);
  return PRODUCTS.filter((p) => set.has(p.tag));
}
