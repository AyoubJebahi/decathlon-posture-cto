import { useMemo, useState, useEffect } from "react";

function Card({ title, children, right }) {
  return (
    <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
      <div className="flex items-center justify-between mb-2 gap-3">
        <div className="font-semibold">{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div className="flex gap-2 text-xs">
      {["ideal", "errors"].map((k) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className={[
            "px-3 py-1 rounded-2xl border transition",
            value === k ? "bg-white text-black border-white" : "border-white/15 hover:border-white/35",
          ].join(" ")}
        >
          {k === "ideal" ? "Mouvement correct" : "Erreur fréquente"}
        </button>
      ))}
    </div>
  );
}

/** --- Fallback SVGs (si vidéo absente) --- */
function SquatSvg({ mode }) {
  const showErrors = mode === "errors";
  return (
    <svg viewBox="0 0 360 200" className="w-full h-52">
      <rect x="10" y="10" width="340" height="180" rx="18" fill="rgba(255,255,255,0.06)" />
      <line x1="50" y1="160" x2="310" y2="160" stroke="white" opacity="0.25" strokeWidth="5" />
      <circle cx="180" cy="60" r="12" fill="white" opacity="0.85" />
      <line x1="180" y1="72" x2="165" y2="115" stroke="white" opacity="0.8" strokeWidth="6" />
      <line x1="165" y1="115" x2="140" y2="160" stroke="white" opacity="0.8" strokeWidth="6" />
      <line x1="165" y1="115" x2="200" y2="160" stroke="white" opacity="0.8" strokeWidth="6" />
      <text x="26" y="36" fill="white" opacity="0.8" fontSize="12">
        {showErrors ? "À éviter : genoux rentrent / dos arrondi" : "Idéal : dos neutre / genoux alignés / talons au sol"}
      </text>
      {showErrors && (
        <>
          <line x1="140" y1="160" x2="155" y2="145" stroke="white" opacity="0.35" strokeWidth="10" />
          <line x1="200" y1="160" x2="185" y2="145" stroke="white" opacity="0.35" strokeWidth="10" />
          <path d="M180 72 Q165 90 160 120" stroke="white" opacity="0.35" strokeWidth="10" fill="none" />
        </>
      )}
    </svg>
  );
}

function PushupSvg({ mode }) {
  const showErrors = mode === "errors";
  return (
    <svg viewBox="0 0 360 200" className="w-full h-52">
      <rect x="10" y="10" width="340" height="180" rx="18" fill="rgba(255,255,255,0.06)" />
      <line x1="40" y1="160" x2="320" y2="160" stroke="white" opacity="0.25" strokeWidth="5" />
      <line x1="90" y1="120" x2="260" y2="120" stroke="white" opacity="0.85" strokeWidth="8" />
      <circle cx="275" cy="120" r="10" fill="white" opacity="0.85" />
      <line x1="110" y1="120" x2="90" y2="160" stroke="white" opacity="0.75" strokeWidth="7" />
      <line x1="140" y1="120" x2="140" y2="160" stroke="white" opacity="0.75" strokeWidth="7" />
      <text x="26" y="36" fill="white" opacity="0.8" fontSize="12">
        {showErrors ? "À éviter : bassin qui s’affaisse / coudes trop ouverts" : "Idéal : gainage fort / coudes ~45° / nuque neutre"}
      </text>
      {showErrors && (
        <>
          <path d="M90 120 Q160 150 260 120" stroke="white" opacity="0.35" strokeWidth="10" fill="none" />
          <line x1="140" y1="120" x2="175" y2="150" stroke="white" opacity="0.35" strokeWidth="10" />
        </>
      )}
    </svg>
  );
}

function RopeSvg({ mode }) {
  const showErrors = mode === "errors";
  return (
    <svg viewBox="0 0 360 200" className="w-full h-52">
      <rect x="10" y="10" width="340" height="180" rx="18" fill="rgba(255,255,255,0.06)" />
      <line x1="40" y1="160" x2="320" y2="160" stroke="white" opacity="0.25" strokeWidth="5" />
      <circle cx="180" cy="60" r="12" fill="white" opacity="0.85" />
      <path d="M120 150 Q180 35 240 150" stroke="white" opacity="0.75" strokeWidth="6" fill="none" />
      <text x="26" y="36" fill="white" opacity="0.8" fontSize="12">
        {showErrors ? "À éviter : sauts trop hauts / épaules crispées" : "Idéal : sauts bas / poignets actifs / buste stable"}
      </text>
      {showErrors && <path d="M120 150 Q180 70 240 150" stroke="white" opacity="0.35" strokeWidth="10" fill="none" />}
    </svg>
  );
}

function LoopVideo({ src, label, onFallback }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
      <div className="px-3 py-2 text-xs text-white/70 border-b border-white/10 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-[11px] opacity-70">loop</span>
      </div>

      <video
        className="w-full h-56 object-cover"
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={onFallback}
      />
    </div>
  );
}

const VIDEO_MAP = {
  squat: { ideal: "/videos/squat-ideal.mp4", errors: "/videos/squat-errors.mp4" },
  pushup: { ideal: "/videos/pushup-ideal.mp4", errors: "/videos/pushup-errors.mp4" },
  rope: { ideal: "/videos/rope-ideal.mp4", errors: "/videos/rope-errors.mp4" },
};

/** ✅ Tips variables selon mouvement + mode */
const TIP_MAP = {
  squat: {
    ideal: "Astuce : filme-toi de côté. Vérifie dos neutre, talons au sol, genoux alignés avec les pointes.",
    errors: "Astuce : filme-toi de côté. Repère si les genoux rentrent ou si le dos s’arrondit, puis corrige 1 point à la fois.",
  },
  pushup: {
    ideal: "Astuce : filme-toi de côté. Garde une ligne tête–bassin–talons, coudes à ~45°.",
    errors: "Astuce : filme-toi de côté. Repère bassin affaissé et coudes trop ouverts, puis reviens à un gainage fort.",
  },
  rope: {
    ideal: "Astuce : filme-toi de face (ou légèrement en biais). Observe les poignets, sauts bas, épaules relâchées.",
    errors: "Astuce : filme-toi de face. Repère sauts trop hauts, épaules crispées ou pieds qui s’écartent, puis ajuste.",
  },
  default: {
    ideal: "Astuce : filme-toi et compare au modèle. Corrige 1 détail à la fois.",
    errors: "Astuce : filme-toi et cherche l’erreur principale. Corrige progressivement.",
  },
};

export default function VisualGuide({ visualKey }) {
  const [mode, setMode] = useState("ideal");
  const [useFallback, setUseFallback] = useState(false);

  // si on change de mouvement, on réessaie la vidéo
  useEffect(() => {
    setUseFallback(false);
    setMode("ideal");
  }, [visualKey]);

  const videoSrc = VIDEO_MAP?.[visualKey]?.[mode];
  const hasVideo = Boolean(videoSrc) && !useFallback;

  const tip = (TIP_MAP?.[visualKey]?.[mode] ?? TIP_MAP.default[mode]) || TIP_MAP.default.ideal;

  const FallbackSvg = useMemo(() => {
    if (visualKey === "squat") return <SquatSvg mode={mode} />;
    if (visualKey === "pushup") return <PushupSvg mode={mode} />;
    return <RopeSvg mode={mode} />;
  }, [visualKey, mode]);

  return (
    <Card title="Visualisation (Niveau 3)" right={<Toggle value={mode} onChange={setMode} />}>
      {hasVideo ? (
        <LoopVideo
          src={videoSrc}
          label={mode === "ideal" ? "✅ Mouvement correct" : "⚠️ Erreur fréquente"}
          onFallback={() => setUseFallback(true)}
        />
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
          {FallbackSvg}
          <div className="text-xs opacity-70 mt-2 px-2">
            Vidéo non trouvée → affichage schéma (fallback).
          </div>
        </div>
      )}

      <div className="text-xs opacity-70 mt-2">{tip}</div>
    </Card>
  );
}
