export function computeProfile({ level, goal, constraints = [], equipment = [] }) {
  const safeLevel = ["beginner", "intermediate", "advanced"].includes(level)
    ? level
    : "beginner";

  const safeGoal = ["strength", "mobility", "fatloss", "weightgain", "performance"].includes(goal)
    ? goal
    : "mobility";

  const normalizedConstraints = constraints.includes("none")
    ? []
    : [...new Set(constraints)].filter(Boolean);

  const normalizedEquipment = equipment.includes("none")
    ? []
    : [...new Set(equipment)].filter(Boolean);

  return {
    tag: `${safeLevel}-${safeGoal}`.toUpperCase(),
    level: safeLevel,
    goal: safeGoal,
    constraints: normalizedConstraints,
    equipment: normalizedEquipment,
  };
}
