import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { loadProfile } from "../state/profileStorage";
import { getAdvice } from "../services/movesApi";
import { getProducts } from "../services/productsApi";

import VisualGuide from "../components/posture/VisualGuide";
import PostureChecklist from "../components/posture/PostureChecklist";

const ROPE_MODE_KEY = "posture_rope_mode";

const ROPE_MODES = [
  { label: "Débutant", value: "beginner" },
  { label: "HIIT", value: "hiit" },
  { label: "Endurance", value: "endurance" },
];

export default function MovePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile] = useState(() => loadProfile());

  const [advice, setAdvice] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ mode corde
  const [ropeMode, setRopeMode] = useState("beginner");

  // ✅ dépendance stable
  const modeDep = id === "rope" ? ropeMode : "";

  // Remettre beginner quand on arrive sur rope (optionnel)
  useEffect(() => {
    if (id === "rope") setRopeMode("beginner");
  }, [id]);

  // ✅ sauvegarder le mode corde pour le widget global
  useEffect(() => {
    if (id === "rope") localStorage.setItem(ROPE_MODE_KEY, ropeMode);
  }, [id, ropeMode]);

  const effectiveMode = useMemo(
    () => (id === "rope" ? ropeMode : undefined),
    [id, ropeMode]
  );

  useEffect(() => {
    if (!profile) {
      navigate("/posture/qcm");
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError("");
      setAdvice(null);
      setProducts([]);

      try {
        const adv = await getAdvice(id, profile, effectiveMode);
        if (cancelled) return;
        setAdvice(adv);

        const prods = await getProducts(adv.productTags || []);
        if (cancelled) return;
        setProducts(prods);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || "Erreur");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, navigate, profile, modeDep, effectiveMode]);

  if (!profile) return null;

  return (
    <div className="space-y-4">
      <Link className="text-sm opacity-80 hover:opacity-100" to="/posture/result">
        ← Retour
      </Link>

      {loading && (
        <div className="rounded-2xl border border-white/10 p-4 bg-white/5 text-sm opacity-80">
          Chargement...
        </div>
      )}

      {error && <div className="text-sm text-red-300">{error}</div>}

      {advice && (
        <div className="grid md:grid-cols-2 gap-5">
          {/* Colonne gauche */}
          <div className="rounded-2xl border border-white/10 p-5 bg-white/5 space-y-4">
            <h2 className="text-2xl font-semibold">{advice.title}</h2>
            <div className="text-sm opacity-70">Profil: {advice.profileTag}</div>

            {advice.warnings?.length > 0 && (
              <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
                <div className="font-semibold mb-2">⚠️ Attention</div>
                <ul className="list-disc pl-5 text-sm opacity-80 space-y-1">
                  {advice.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <div className="font-semibold mb-2">Étapes</div>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                {advice.steps.map((s, i) => (
                  <li key={i} className="opacity-90">
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="font-semibold mb-2">Cues</div>
              <div className="flex flex-wrap gap-2">
                {advice.cues.map((c) => (
                  <span
                    key={c}
                    className="rounded-2xl bg-white/10 border border-white/10 px-3 py-1 text-xs"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="font-semibold mb-2">Erreurs fréquentes</div>
              <div className="space-y-2">
                {advice.mistakes.map((m) => (
                  <div key={m.title} className="rounded-2xl border border-white/10 p-3">
                    <div className="font-medium text-sm">{m.title}</div>
                    <div className="text-sm opacity-80">{m.fix}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-5">
            {/* Mode corde */}
            {id === "rope" && (
              <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">Mode corde</div>
                  {advice.sessionMode && (
                    <div className="text-xs opacity-70">Actuel: {advice.sessionMode}</div>
                  )}
                </div>

                <div className="flex gap-2 text-xs">
                  {ROPE_MODES.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setRopeMode(m.value)}
                      disabled={loading}
                      className={[
                        "px-3 py-1 rounded-2xl border transition",
                        ropeMode === m.value
                          ? "bg-white text-black border-white"
                          : "border-white/15 hover:border-white/35",
                        loading ? "opacity-60 cursor-not-allowed" : "",
                      ].join(" ")}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs opacity-70 mt-2">
                  Le contenu s’adapte (étapes + plan) selon le mode choisi.
                </div>
              </div>
            )}

            <VisualGuide visualKey={advice.visualKey} />
            <PostureChecklist visualKey={advice.visualKey} />

            {advice.plan && (
              <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
                <div className="font-semibold mb-2">Plan recommandé</div>
                <div className="text-sm opacity-80 space-y-1">
                  {advice.plan.frequency && (
                    <div>
                      <span className="opacity-70">Fréquence:</span> {advice.plan.frequency}
                    </div>
                  )}
                  {advice.plan.setsReps && (
                    <div>
                      <span className="opacity-70">Séries / reps:</span> {advice.plan.setsReps}
                    </div>
                  )}
                  {advice.plan.focus && (
                    <div>
                      <span className="opacity-70">Focus:</span> {advice.plan.focus}
                    </div>
                  )}
                  {advice.plan.note && <div className="opacity-70">{advice.plan.note}</div>}
                </div>
              </div>
            )}

            {advice.variants?.length > 0 && (
              <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
                <div className="font-semibold mb-2">Variantes</div>
                <div className="space-y-2">
                  {advice.variants.map((v) => (
                    <div key={v.title} className="rounded-2xl border border-white/10 p-3">
                      <div className="font-medium text-sm">{v.title}</div>
                      <div className="text-sm opacity-75">{v.why}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
              <div className="font-semibold mb-2">Bonus — Produits</div>

              {products.length === 0 ? (
                <div className="text-sm opacity-70">Aucun produit à afficher.</div>
              ) : (
                <div className="grid gap-2">
                  {products.map((p) => (
                    <a
                      key={p.url}
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 p-3 hover:border-white/30 transition"
                    >
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs opacity-70">Ouvrir sur Decathlon</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
