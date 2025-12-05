const API_URL = "http://localhost:5000/api/profile";

export async function createProfile(answers) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  });

  if (!res.ok) {
    throw new Error("Erreur serveur");
  }

  return res.json();
}
