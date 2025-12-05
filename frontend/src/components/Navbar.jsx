import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { loadProfile } from "../state/profileStorage";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function navLinkClass({ isActive }) {
  return cn(
    "text-sm transition px-3 py-2 rounded-2xl",
    isActive
      ? "bg-white text-black"
      : "text-white/80 hover:text-white hover:bg-white/5"
  );
}

function IconMenu({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconX({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hasProfile, setHasProfile] = useState(() => Boolean(loadProfile()));
  const location = useLocation();

  // close mobile menu on route change + refresh profile state when navigating
  useEffect(() => {
    setOpen(false);
    setHasProfile(Boolean(loadProfile()));
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* subtle blur / glass */}
      <div className="backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-black tracking-tight group-hover:opacity-90 transition">
                D
              </div>
              <div className="leading-tight">
                <div className="font-semibold">Decathlon Posture</div>
                <div className="text-xs text-white/60">CTO de votre santé posturale</div>
              </div>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-2">
                <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/accueil" className={navLinkClass}>
                Accueil
              </NavLink>
              <NavLink to="/posture/qcm" className={navLinkClass}>
                QCM
              </NavLink>
              <NavLink to="/posture/result" className={navLinkClass}>
                Résultat
              </NavLink>
              <NavLink to="/posture/move/squat" className={navLinkClass}>
                Mouvements
              </NavLink>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {hasProfile ? (
                <Link
                  to="/posture/result"
                  className="hidden sm:inline-flex rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:border-white/35 transition"
                >
                  Reprendre
                </Link>
              ) : (
                <Link
                  to="/posture/qcm"
                  className="hidden sm:inline-flex rounded-2xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
                >
                  Commencer
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden rounded-2xl border border-white/15 bg-white/5 p-2 hover:border-white/35 transition"
                aria-label="Menu"
              >
                {open ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {open && (
            <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-white/5 p-2">
              <NavLink to="/" className={navLinkClass}>
                Accueil
              </NavLink>
              <NavLink to="/posture/qcm" className={navLinkClass}>
                QCM
              </NavLink>
              <NavLink to="/posture/result" className={navLinkClass}>
                Résultat
              </NavLink>
              <NavLink to="/posture/move/squat" className={navLinkClass}>
                Mouvements
              </NavLink>

              <div className="mt-2 pt-2 border-t border-white/10">
                {hasProfile ? (
                  <Link
                    to="/posture/result"
                    className="w-full inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:border-white/35 transition"
                  >
                    Reprendre
                  </Link>
                ) : (
                  <Link
                    to="/posture/qcm"
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
                  >
                    Commencer
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
