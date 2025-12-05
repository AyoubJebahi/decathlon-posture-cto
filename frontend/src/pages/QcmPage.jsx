import { useState } from "react";
import qcm from "../data/qcm.config.json";
import { createProfile } from "../services/profileApi";
import { saveProfile } from "../state/profileStorage";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function QcmPage() {
  const navigate = useNavigate();
  const questions = qcm.questions;
  const location = useLocation();
  const mustDoQcm = location.state?.reason === "profile_required";


  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const q = questions[step];

  const setSingle = (id, value) => setAnswers((p) => ({ ...p, [id]: value }));

  // ✅ Multi avec valeur exclusive (ex: "none") + possibilité de décocher "none"
  const toggleMulti = (question, value) => {
    const id = question.id;
    const exclusive = question.exclusiveValue; // ex: "none"
    const current = Array.isArray(answers[id]) ? answers[id] : [];

    // ✅ Cas: clic sur la valeur exclusive ("none")
    if (exclusive && value === exclusive) {
      // Si déjà coché => décocher (vide)
      if (current.includes(exclusive)) {
        setAnswers((p) => ({ ...p, [id]: [] }));
      } else {
        // Sinon => elle remplace tout
        setAnswers((p) => ({ ...p, [id]: [exclusive] }));
      }
      return;
    }

    // Sinon, on enlève l’exclusive si elle existe
    let next = exclusive ? current.filter((x) => x !== exclusive) : [...current];

    // Toggle normal
    if (next.includes(value)) next = next.filter((x) => x !== value);
    else next = [...next, value];

    setAnswers((p) => ({ ...p, [id]: next }));
  };

  const canNext = (() => {
    const a = answers[q.id];
    if (q.type === "single") return !!a;
    if (q.type === "multi") return Array.isArray(a) && a.length > 0;
    return false;
  })();

  async function finish() {
    setLoading(true);
    setError("");
    try {
      const profile = await createProfile(answers);
      saveProfile(profile);
      navigate("/posture/result");
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  const selectedMulti = Array.isArray(answers[q.id]) ? answers[q.id] : [];
  const hasExclusiveSelected =
    q.type === "multi" && q.exclusiveValue && selectedMulti.includes(q.exclusiveValue);

  return (
    <div className="space-y-4">
        {mustDoQcm && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
            🔒 Pour accéder à cette page, vous devez d’abord répondre au QCM.
        </div>
        )}
      <h2 className="text-2xl font-semibold">QCM — Profil sportif</h2>

      <div className="rounded-2xl border border-white/10 p-5 bg-white/5 space-y-3">
        <div className="text-sm opacity-70">
          Question {step + 1} / {questions.length}
        </div>

        <div className="text-lg font-semibold">{q.title}</div>

        <div className="flex flex-wrap gap-2">
          {q.options.map((opt) => {
            const active =
              q.type === "single"
                ? answers[q.id] === opt.value
                : selectedMulti.includes(opt.value);

            // ✅ si "none" est sélectionné, on désactive les autres choix (sauf none)
            const disabled =
              q.type === "multi" &&
              hasExclusiveSelected &&
              opt.value !== q.exclusiveValue;

            return (
              <button
                key={opt.value}
                disabled={disabled || loading}
                onClick={() => {
                  if (q.type === "single") setSingle(q.id, opt.value);
                  else toggleMulti(q, opt.value);
                }}
                className={[
                  "rounded-2xl px-3 py-2 text-sm border transition",
                  disabled ? "opacity-40 cursor-not-allowed" : "",
                  active
                    ? "bg-white text-black border-white"
                    : "border-white/15 hover:border-white/35",
                ].join(" ")}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {error && <div className="text-sm text-red-300">{error}</div>}

        <div className="flex gap-2 pt-2">
          <button
            className="rounded-2xl border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
            disabled={step === 0 || loading}
            onClick={() => setStep((s) => s - 1)}
          >
            Retour
          </button>

          {step < questions.length - 1 ? (
            <button
              className="rounded-2xl bg-white text-black px-4 py-2 text-sm font-medium disabled:opacity-40"
              disabled={!canNext || loading}
              onClick={() => setStep((s) => s + 1)}
            >
              Suivant
            </button>
          ) : (
            <button
              className="rounded-2xl bg-white text-black px-4 py-2 text-sm font-medium disabled:opacity-40"
              disabled={!canNext || loading}
              onClick={finish}
            >
              {loading ? "..." : "Générer mon profil"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
