import { useEffect, useMemo, useState } from "react";

const CHECKLIST = {
  squat: [
    "Talons au sol",
    "Genoux alignés avec les pointes",
    "Dos neutre (pas arrondi)",
    "Gainage actif (abdos + fessiers)",
    "Descente contrôlée"
  ],
  pushup: [
    "Corps aligné (tête–hanches–talons)",
    "Gainage actif (abdos + fessiers)",
    "Coudes à ~45°",
    "Nuque neutre",
    "Amplitude contrôlée"
  ],
  rope: [
    "Sauts bas (1–2 cm) — pas de grands sauts",
    "Atterrissage doux sur l’avant du pied",
    "Genoux légèrement fléchis",
    "Coudes proches du corps",
    "Rotation surtout avec les poignets"
  ]
};

export default function PostureChecklist({ visualKey }) {
  const items = useMemo(() => CHECKLIST[visualKey] || [], [visualKey]);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    setChecked({});
  }, [visualKey]);

  const score = Object.values(checked).filter(Boolean).length;
  const total = items.length;

  return (
    <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Checklist posture</div>
        <div className="text-xs opacity-80">
          Score: <span className="font-semibold">{score}</span>/{total}
        </div>
      </div>

      <div className="space-y-2">
        {items.map((label) => {
          const isOn = !!checked[label];
          return (
            <button
              key={label}
              onClick={() => setChecked((p) => ({ ...p, [label]: !p[label] }))}
              className={[
                "w-full text-left rounded-2xl border p-3 transition flex items-center justify-between",
                isOn
                  ? "bg-white text-black border-white"
                  : "border-white/10 hover:border-white/30",
              ].join(" ")}
            >
              <span className="text-sm">{label}</span>
              <span className="text-xs opacity-70">{isOn ? "OK" : "À vérifier"}</span>
            </button>
          );
        })}
      </div>

      <div className="text-xs opacity-70 mt-3">
        Conseil: coche seulement si tu peux le vérifier (miroir ou vidéo).
      </div>
    </div>
  );
}
