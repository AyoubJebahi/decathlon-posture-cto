export default function computeProfile(answers) {
  if (!answers) throw new Error("Invalid profile data");

  return {
    level: answers.level || "beginner",
    goal: answers.goal || "general",
    constraints: answers.constraints || [],
    equipment: answers.equipment || [],
    tag: `${answers.level}-${answers.goal}`
  };
}
