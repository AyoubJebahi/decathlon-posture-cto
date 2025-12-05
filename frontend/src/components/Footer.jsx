import { Link } from "react-router-dom";

function IconLink({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M10 14a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 10a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-black">
                D
              </div>
              <div className="leading-tight">
                <div className="font-semibold">Decathlon Posture</div>
                <div className="text-xs text-white/60">Prévenir les blessures. Améliorer l’exécution.</div>
              </div>
            </div>
            <p className="text-sm text-white/70">
              QCM → profil → conseils personnalisés → visualisation → produits pertinents.
            </p>
            <div className="text-xs text-white/50">
              ⚠️ Ce projet ne remplace pas un avis médical. En cas de douleur importante: stop et consulte un pro.
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <div className="font-semibold">Navigation</div>
            <div className="grid gap-2 text-sm text-white/75">
              <Link className="hover:text-white transition" to="/">Home</Link>
              <Link className="hover:text-white transition" to="/accueil">Accueil</Link>
              <Link className="hover:text-white transition" to="/posture/qcm">QCM</Link>
              <Link className="hover:text-white transition" to="/posture/result">Résultat</Link>
              <Link className="hover:text-white transition" to="/posture/move/squat">Mouvements</Link>
            </div>
          </div>

          {/* Project */}
          <div className="space-y-3">
            <div className="font-semibold">Projet</div>
            <div className="text-sm text-white/70 space-y-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium">Stack</div>
                <div className="text-white/70 text-sm mt-1">React + Tailwind • Node/Express • API</div>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-white/35 transition"
                target="_blank"
                rel="noreferrer"
              >
                <IconLink className="w-4 h-4" />
                Lien du repository (à mettre)
              </a>

              <div className="text-xs text-white/50">
                Astuce: ajoute ici le lien GitHub/GitLab et le Discord si besoin.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-xs text-white/50">
          <div>© {year} — Nuit de l’Info • Decathlon Digital challenge</div>
          <div className="flex gap-4">
            <span>Équipe: Front + Back</span>
            <span>Version: MVP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
