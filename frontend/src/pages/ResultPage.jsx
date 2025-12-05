import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadProfile, clearProfile } from "../state/profileStorage";
import { getMoves } from "../services/movesApi";

function scoreMove(moveId, profile) {
  const goal = profile.goal;
  const c = profile.constraints || [];
  const eq = profile.equipment || [];

  let s = 0;

  // Objectif
  if (goal === "fatloss") s += moveId === "rope" ? 50 : 10;
  if (goal === "weightgain") s += (moveId === "squat" || moveId === "pushup") ? 40 : 5;
  if (goal === "strength") s += (moveId === "squat" || moveId === "pushup") ? 45 : 8;
  if (goal === "performance") s += moveId === "rope" ? 35 : 20;
  if (goal === "mobility") s += moveId === "squat" ? 25 : 15;

  // Matériel
  if (moveId === "rope") s += eq.includes("rope") ? 15 : -5;

  // Contraintes
  if (moveId === "rope" && c.includes("knees")) s -= 20;
  if (moveId === "pushup" && c.includes("wrists")) s -= 10;
  if (moveId === "squat" && c.includes("knees")) s -= 10;

  return s;
}

export default function ResultPage() {
  const navigate = useNavigate();
  const [profile] = useState(() => loadProfile());
  const [moves, setMoves] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!profile) navigate("/posture/qcm");
    getMoves().then(setMoves).catch((e) => setError(e.message));
  }, [navigate, profile]);

  const ordered = useMemo(() => {
    if (!profile) return moves;
    return [...moves].sort((a, b) => scoreMove(b.id, profile) - scoreMove(a.id, profile));
  }, [moves, profile]);

  if (!profile) return null;

  const top = ordered.slice(0, 2);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Ton profil</h2>

      <div className="rounded-2xl border border-white/10 p-5 bg-white/5 space-y-2">
        <div className="text-sm opacity-70">Tag</div>
        <div className="text-xl font-semibold">{profile.tag}</div>

        <div className="text-sm opacity-80">
          Objectif: <span className="font-semibold">{profile.goal}</span> • Niveau:{" "}
          <span className="font-semibold">{profile.level}</span>
        </div>

        <div className="text-sm opacity-70">
          Contraintes: {profile.constraints?.length ? profile.constraints.join(", ") : "aucune"} •
          Matériel: {profile.equipment?.length ? profile.equipment.join(", ") : "aucun"}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            className="rounded-2xl border border-white/15 px-4 py-2 text-sm hover:border-white/35"
            onClick={() => {
              clearProfile();
              navigate("/posture/qcm");
            }}
          >
            Refaire le QCM
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
        <div className="font-semibold mb-2">Recommandé pour toi</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {top.map((m) => (
            <Link
              key={m.id}
              to={`/posture/move/${m.id}`}
              className="rounded-2xl border border-white/10 p-3 hover:border-white/30 transition"
            >
              <div className="font-medium">{m.name}</div>
              <div className="text-xs opacity-70">Adapté à ton objectif</div>
            </Link>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-semibold">Tous les mouvements</h3>
      {error && <div className="text-sm text-red-300">{error}</div>}

      <div className="grid sm:grid-cols-2 gap-3">
        {ordered.map((m) => (
          <Link
            key={m.id}
            to={`/posture/move/${m.id}`}
            className="rounded-2xl border border-white/10 p-4 bg-white/5 hover:border-white/30 transition"
          >
            <div className="font-medium">{m.name}</div>
            <div className="text-xs opacity-70">Voir les conseils personnalisés</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
