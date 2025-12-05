import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { loadProfile } from "../state/profileStorage";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Glow({ className = "" }) {
  return (
    <div
      className={cn("pointer-events-none absolute -z-10 blur-3xl", className)}
      style={{
        background:
          "radial-gradient(closest-side, rgba(255,255,255,.35), transparent 70%)",
      }}
    />
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({ title, subtitle, right }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-white/70 mt-1">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/60 mt-1">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, bullets }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/25 transition relative overflow-hidden">
      <Glow className="w-64 h-64 -top-24 -right-24 opacity-20 group-hover:opacity-30 transition" />
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl bg-white text-black flex items-center justify-center font-black">
          {icon}
        </div>
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-white/70 mt-1">{desc}</div>
        </div>
      </div>

      {bullets?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-white/75 list-disc pl-5">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 text-xs text-white/55">
        <span className="opacity-70">Tip:</span> pratique 2–3 minutes, filme-toi, ajuste.
      </div>
    </div>
  );
}

function PreviewPanel({ title, subtitle, icon, lines = 3 }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden relative">
      <Glow className="w-72 h-72 -top-28 -left-28 opacity-25" />
      <div className="p-6 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-black">
            {icon}
          </div>
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-white/60">{subtitle}</div>
          </div>
        </div>
        <span className="text-xs rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-white/70">
          Preview
        </span>
      </div>

      <div className="px-6 pb-6">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-2xl bg-white/10 border border-white/10" />
            <div className="flex-1">
              <div className="h-3 rounded bg-white/15 w-2/3" />
              <div className="h-2 rounded bg-white/10 w-1/2 mt-2" />
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: lines }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-xl bg-white/10 border border-white/10" />
                <div className="flex-1">
                  <div className="h-3 rounded bg-white/12 w-full" />
                  <div className="h-2 rounded bg-white/8 w-2/3 mt-2" />
                </div>
              </div>
            ))}

            <div className="mt-4 flex gap-2">
              <div className="h-7 w-24 rounded-2xl bg-white/15 border border-white/10" />
              <div className="h-7 w-16 rounded-2xl bg-white/10 border border-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  return (
    <details className="rounded-3xl border border-white/10 bg-white/5 p-5 open:border-white/25 transition">
      <summary className="cursor-pointer font-semibold">{q}</summary>
      <div className="mt-2 text-sm text-white/75">{a}</div>
    </details>
  );
}

function TimelineStep({ n, title, desc }) {
  return (
    <div className="relative pl-10">
      <div className="absolute left-0 top-0 w-7 h-7 rounded-2xl bg-white text-black flex items-center justify-center text-xs font-black">
        {n}
      </div>
      <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-white/70 mt-1">{desc}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const profile = useMemo(() => loadProfile(), []);

  const resetProfile = () => {
    localStorage.removeItem("posture_profile");
    navigate("/posture/qcm");
  };

  const moves = [
    {
      id: "squat",
      title: "Squat",
      tag: "Force / base",
      subtitle: "Genoux alignés • dos neutre • talons ancrés",
      icon: "S",
      highlight: "Top pour commencer",
    },
    {
      id: "pushup",
      title: "Pompes",
      tag: "Haut du corps",
      subtitle: "Gainage • coudes ~45° • nuque neutre",
      icon: "P",
      highlight: "Full body + core",
    },
    {
      id: "rope",
      title: "Corde",
      tag: "Cardio / HIIT",
      subtitle: "Sauts bas • poignets actifs • impact doux",
      icon: "R",
      highlight: "Brûle calories vite",
    },
  ];

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative">
        <Glow className="w-[520px] h-[520px] -top-28 -left-28 opacity-30" />
        <Glow className="w-[520px] h-[520px] -bottom-40 -right-28 opacity-20" />

        {/* Top trust strip */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge>Decathlon Digital • Nuit de l’Info</Badge>
          <Badge>Posture • Prévention blessures</Badge>
          <Badge>Omnicommerce mindset</Badge>
          <Badge>React + Tailwind + Node/Express</Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              CTO de Votre Santé Posturale{" "}
              <span className="opacity-70">—</span>{" "}
              <span className="opacity-90">exécute mieux</span>,{" "}
              <span className="opacity-90">blesse-toi moins</span>.
            </h1>

            <p className="text-base md:text-lg text-white/75">
              Un parcours clair : <span className="text-white">QCM</span> →{" "}
              <span className="text-white">profil</span> →{" "}
              <span className="text-white">instructions</span> →{" "}
              <span className="text-white">visualisation</span> →{" "}
              <span className="text-white">bonus produits</span>.
              <br />
              Conçu pour apprendre vite, pratiquer mieux, et éviter les blessures.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/posture/qcm"
                className="inline-flex rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:opacity-90 transition"
              >
                Commencer le QCM
              </Link>

              <Link
                to="/posture/move/squat"
                className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold hover:border-white/35 transition"
              >
                Explorer les mouvements
              </Link>

              {profile ? (
                <>
                  <Link
                    to="/posture/result"
                    className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold hover:border-white/35 transition"
                  >
                    Reprendre mon profil
                  </Link>
                  <button
                    onClick={resetProfile}
                    className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold hover:border-white/35 transition"
                  >
                    Réinitialiser
                  </button>
                </>
              ) : null}
            </div>

            {/* Stats bar */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <Stat value="4" label="Niveaux (QCM → bonus produits)" />
              <Stat value="3" label="Mouvements clés (S / P / Corde)" />
              <Stat value="∞" label="Conseils adaptatifs au profil" />
            </div>

            <div className="text-xs text-white/55">
              ⚠️ Ce projet ne remplace pas un avis médical. En cas de douleur vive/inhabituelle : stop et consulte.
            </div>
          </div>

          {/* Preview panels */}
          <div className="space-y-4">
            <PreviewPanel
              title="Profil sportif intelligent"
              subtitle="Objectif • niveau • contraintes • matériel"
              icon="Q"
              lines={4}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <PreviewPanel
                title="Visual guide"
                subtitle="Posture idéale vs erreurs fréquentes"
                icon="V"
                lines={3}
              />
              <PreviewPanel
                title="Plan & variantes"
                subtitle="HIIT • endurance • débutant"
                icon="P"
                lines={3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="space-y-6">
        <SectionTitle
          title="Ce que l’app fait (et pourquoi tu vas l’aimer)"
          subtitle="Des conseils clairs, une visualisation simple, et un plan d’action."
          right={
            <div className="hidden md:flex gap-2">
              <Badge>Rapide</Badge>
              <Badge>Actionnable</Badge>
              <Badge>Lisible</Badge>
            </div>
          }
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <FeatureCard
            icon="1"
            title="QCM & Profilage"
            desc="On capte ton niveau, objectif, contraintes et matériel."
            bullets={[
              "Débutant → consignes simples",
              "Contraintes → warnings & variantes",
              "Matériel → recommandations adaptées",
            ]}
          />
          <FeatureCard
            icon="2"
            title="Instructions précises"
            desc="Étapes + cues (points clés) + corrections."
            bullets={[
              "Étapes numérotées",
              "Cues courts et efficaces",
              "Erreurs fréquentes → fixes",
            ]}
          />
          <FeatureCard
            icon="3"
            title="Visualisation"
            desc="Compréhension immédiate avec des visuels."
            bullets={[
              "Idéal vs erreurs",
              "Lecture en 10 secondes",
              "Pensé pour la pratique",
            ]}
          />
          <FeatureCard
            icon="4"
            title="Bonus Produits"
            desc="Produits utiles reliés à la pratique (non intrusif)."
            bullets={[
              "Corde, tapis, accessoires",
              "Liens directs",
              "Pertinence > quantité",
            ]}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
        <SectionTitle
          title="Comment ça marche"
          subtitle="Un flow simple pour transformer ta technique rapidement."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-start mt-6">
          <div className="space-y-4">
            <div className="relative pl-3">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10" />
              <div className="space-y-4">
                <TimelineStep
                  n="01"
                  title="Réponds au QCM"
                  desc="Niveau, objectif, contraintes, matériel. En 60 secondes."
                />
                <TimelineStep
                  n="02"
                  title="Choisis un mouvement"
                  desc="Squat, pompes ou corde selon ton besoin du jour."
                />
                <TimelineStep
                  n="03"
                  title="Applique les conseils"
                  desc="Étapes + cues + erreurs fréquentes + plan adapté."
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/posture/qcm"
                className="inline-flex rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:opacity-90 transition"
              >
                Je commence maintenant
              </Link>
              <Link
                to="/posture/result"
                className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold hover:border-white/35 transition"
              >
                Voir mon résultat
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <PreviewPanel
              title="Self-check rapide"
              subtitle="Compare ta posture en temps réel"
              icon="✓"
              lines={4}
            />
            <PreviewPanel
              title="Variantes safe"
              subtitle="Si douleur / fatigue / contraintes"
              icon="↺"
              lines={4}
            />
          </div>
        </div>

        <div className="text-xs text-white/55 mt-6">
          Astuce UX: filme-toi de côté, compare, corrige 1 cue à la fois.
        </div>
      </section>

      {/* MOVES */}
      <section className="space-y-6">
        <SectionTitle
          title="Mouvements disponibles"
          subtitle="Clique pour ouvrir le guide (étapes + visuel + plan)."
          right={
            <Link
              to="/posture/move/squat"
              className="hidden md:inline-flex rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:border-white/35 transition"
            >
              Voir tout
            </Link>
          }
        />

        <div className="grid md:grid-cols-3 gap-4">
          {moves.map((m) => (
            <Link
              key={m.id}
              to={`/posture/move/${m.id}`}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/25 transition relative overflow-hidden"
            >
              <Glow className="w-72 h-72 -top-28 -right-28 opacity-15 group-hover:opacity-25 transition" />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-white/60">{m.tag}</div>
                  <div className="text-xl font-semibold mt-1">{m.title}</div>
                  <div className="text-sm text-white/70 mt-2">{m.subtitle}</div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-black">
                  {m.icon}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-white/75">
                  {m.highlight}
                </span>
                <span className="text-sm opacity-70 group-hover:opacity-100 transition">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="space-y-6">
        <SectionTitle
          title="Ce que ça apporte"
          subtitle="Plus de clarté, meilleure exécution, moins de blessures."
        />

        <div className="grid lg:grid-cols-3 gap-4">
          {[
            {
              name: "Sportif débutant",
              quote:
                "J’ai compris direct les erreurs fréquentes. Le guide est très clair.",
            },
            {
              name: "Pratique HIIT",
              quote:
                "La corde en mode HIIT me donne un plan, une structure et un rythme.",
            },
            {
              name: "Retour technique",
              quote:
                "Les cues sont courts mais puissants. Ça corrige vite la posture.",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-sm text-white/75">“{t.quote}”</div>
              <div className="mt-4 text-xs text-white/55">— {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <SectionTitle title="FAQ" subtitle="Les questions qu’on nous pose souvent." />
        <div className="grid lg:grid-cols-2 gap-4">
          <FAQItem
            q="Est-ce que l’app remplace un coach ou un médecin ?"
            a="Non. C’est un guide posture. En cas de douleur importante : stop et consulte un professionnel."
          />
          <FAQItem
            q="Comment les conseils sont personnalisés ?"
            a="Grâce au profil (niveau, objectif, contraintes, matériel) et au mouvement choisi."
          />
          <FAQItem
            q="Pourquoi la visualisation est importante ?"
            a="Tu comprends plus vite : posture idéale vs erreurs fréquentes, ça évite de deviner."
          />
          <FAQItem
            q="Je n’ai pas de matériel, je peux quand même ?"
            a="Oui. Les conseils restent valables et des variantes sont proposées."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 relative overflow-hidden">
        <Glow className="w-[520px] h-[520px] -top-44 -left-44 opacity-25" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-xs text-white/60">Ready?</div>
            <div className="text-2xl md:text-3xl font-semibold mt-1">
              Lance ton profil et améliore ton mouvement dès maintenant.
            </div>
            <div className="text-sm text-white/70 mt-2">
              1 minute pour le QCM → guide complet + plan.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/posture/qcm"
              className="inline-flex rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:opacity-90 transition"
            >
              Démarrer le QCM
            </Link>
            <Link
              to="/posture/move/rope"
              className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold hover:border-white/35 transition"
            >
              Tester la corde (HIIT)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
