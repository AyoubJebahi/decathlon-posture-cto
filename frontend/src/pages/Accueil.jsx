import { Link, useNavigate } from "react-router-dom";
import { loadProfile } from "../state/profileStorage";

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm opacity-80 hover:opacity-100 transition"
    >
      {children}
    </Link>
  );
}

function Card({ title, children, right }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm opacity-75 mt-1">{children}</div>
        </div>
        {right}
      </div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="px-3 py-1 rounded-2xl border border-white/10 bg-white/5 text-xs opacity-90">
      {children}
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const profile = loadProfile();

  const quickMoves = [
    { id: "squat", label: "Squat" },
    { id: "pushup", label: "Pompes" },
    { id: "rope", label: "Corde" },
  ];

  const resetProfile = () => {
    localStorage.removeItem("posture_profile"); // adapte si ton key est différente
    navigate("/posture/qcm");
  };

  return (
    <div className="space-y-10">

      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Deviens le <span className="opacity-90">CTO</span> de ta posture 🏋️
          </h1>
          <p className="text-sm md:text-base opacity-80">
            Un parcours simple : QCM → profil → conseils personnalisés → visualisation → bonus produits.
            Objectif : prévenir les blessures et améliorer l’exécution des mouvements.
          </p>

          <div className="flex flex-wrap gap-2">
            <Pill>Squat</Pill>
            <Pill>Pompes</Pill>
            <Pill>Corde</Pill>
            <Pill>Prévention blessures</Pill>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/posture/qcm"
              className="inline-flex rounded-2xl bg-white text-black px-5 py-3 font-medium hover:opacity-90"
            >
              Démarrer le QCM
            </Link>

            <Link
              to="/posture/move/squat"
              className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium hover:border-white/35 transition"
            >
              Voir les mouvements
            </Link>
          </div>

          {profile ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <div className="font-semibold mb-1">Ton profil est prêt ✅</div>
              <div className="opacity-80">
                Niveau: <span className="opacity-100">{profile.level}</span> • Objectif:{" "}
                <span className="opacity-100">{profile.goal}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Link
                  to="/posture/result"
                  className="inline-flex rounded-2xl bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  Reprendre mon parcours
                </Link>
                <button
                  onClick={resetProfile}
                  className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:border-white/35 transition"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs opacity-70">
              Conseil : complète le QCM pour recevoir des conseils adaptés à ton niveau et ton objectif.
            </div>
          )}
        </div>

        {/* Bloc “aperçu” */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <div className="text-sm opacity-75">Aperçu</div>
          <div className="text-xl font-semibold">Choisis un mouvement</div>

          <div className="grid sm:grid-cols-3 gap-3">
            {quickMoves.map((m) => (
              <Link
                key={m.id}
                to={`/posture/move/${m.id}`}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 hover:border-white/35 transition"
              >
                <div className="font-medium">{m.label}</div>
                <div className="text-xs opacity-70 mt-1">Conseils + visuel + plan</div>
              </Link>
            ))}
          </div>

          <div className="text-xs opacity-70">
            Astuce : filme-toi (profil / de côté) pour comparer ta posture.
          </div>
        </div>
      </div>

      {/* Niveaux */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Niveaux du défi</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card title="Niveau 1 — Profilage sportif" right={<Pill>QCM</Pill>}>
            Un questionnaire rapide pour définir niveau, objectif, contraintes et matériel.
          </Card>

          <Card title="Niveau 2 — Instructions personnalisées" right={<Pill>Conseils</Pill>}>
            Étapes claires + cues (points d’attention) adaptés à ton profil.
          </Card>

          <Card title="Niveau 3 — Visualisation" right={<Pill>Schémas</Pill>}>
            Illustrations “posture idéale” vs “erreurs fréquentes” pour comprendre vite.
          </Card>

          <Card title="Niveau 4 — Bonus commercial" right={<Pill>Produits</Pill>}>
            Sélection de produits pertinents (tapis, corde, accessoires) liés à la pratique.
          </Card>
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold mb-3">Comment ça marche</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="font-semibold">1) Tu réponds au QCM</div>
            <div className="opacity-75 mt-1">Niveau, objectif, contraintes, matériel.</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="font-semibold">2) Tu choisis un mouvement</div>
            <div className="opacity-75 mt-1">Squat, pompes, corde, etc.</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="font-semibold">3) Tu améliores ta posture</div>
            <div className="opacity-75 mt-1">Conseils + visuels + plan d’entraînement.</div>
          </div>
        </div>

        <div className="text-xs opacity-60 mt-4">
          ⚠️ L’application ne remplace pas un avis médical. En cas de douleur importante, stop et consulte un professionnel.
        </div>
      </div>
    </div>
  );
}
