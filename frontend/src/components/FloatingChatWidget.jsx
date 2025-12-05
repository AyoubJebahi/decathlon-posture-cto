import { useEffect, useMemo, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { loadProfile } from "../state/profileStorage";
import { sendChat } from "../services/chatApi";

const ROPE_MODE_KEY = "posture_rope_mode";

function ChatIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M7.5 19.5 4 20l.6-3.2A8.5 8.5 0 0 1 3.5 12C3.5 7.6 7.6 4 12.7 4S22 7.6 22 12s-4.1 8-9.3 8c-1.9 0-3.6-.4-5.2-1.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h.01M12 12h.01M16 12h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FloatingChatWidget() {
  const navigate = useNavigate();
  const matchMove = useMatch("/posture/move/:id");
  const moveId = matchMove?.params?.id;

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(() => loadProfile());

  const [messages, setMessages] = useState([
    { role: "bot", text: "Salut 👋 Je suis ton Coach IA. Pose ta question !" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  const mode = useMemo(() => {
    if (moveId !== "rope") return undefined;
    return localStorage.getItem(ROPE_MODE_KEY) || undefined;
  }, [moveId]);

  // Mise à jour du profile si QCM complété
  useEffect(() => {
    const onFocus = () => setProfile(loadProfile());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages]);

  // ESC pour fermer
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function onSend() {
    const text = input.trim();
    if (!text || loading) return;

    // Ajouter le message utilisateur
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        message: text,
        profile: profile || null, // OK même sans QCM
        moveId: moveId || null,
        mode: mode || null,
      };

      const r = await sendChat(payload);

      setMessages((m) => [
        ...m,
        { role: "bot", text: r.reply || "Réponse indisponible." },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Erreur de communication avec le coach IA." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[9999] rounded-full shadow-lg
                   bg-white text-black w-14 h-14 flex items-center justify-center
                   hover:scale-[1.03] active:scale-[0.98] transition"
        aria-label="Ouvrir le chat"
        title="Coach IA"
      >
        <ChatIcon className="w-7 h-7" />
      </button>

      {/* Overlay + fenêtre */}
      {open && (
        <div className="fixed inset-0 z-[9998]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div className="absolute bottom-24 right-5 w-[92vw] max-w-[390px]">
            <div className="rounded-2xl border border-white/10 bg-[#0b0b12] text-white shadow-2xl overflow-hidden">
              
              {/* HEADER */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-semibold">Coach IA</div>
                  <div className="text-xs opacity-70">
                    {moveId
                      ? `Contexte: ${moveId}${mode ? ` • mode ${mode}` : ""}`
                      : "Contexte: général"}
                  </div>
                </div>

                <div className="flex gap-2">
                  {!profile && (
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate("/posture/qcm");
                      }}
                      className="text-xs rounded-2xl border border-white/15 px-3 py-1 hover:border-white/35 transition"
                    >
                      Faire le QCM
                    </button>
                  )}

                  <button
                    onClick={() => setOpen(false)}
                    className="text-xs rounded-2xl border border-white/15 px-3 py-1 hover:border-white/35 transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>

              {/* MESSAGES */}
              <div ref={scrollRef} className="h-80 overflow-auto p-4 space-y-2">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={[
                      "max-w-[85%] rounded-2xl border px-3 py-2 text-sm whitespace-pre-wrap",
                      m.role === "user"
                        ? "ml-auto bg-white text-black border-white"
                        : "bg-white/5 border-white/10",
                    ].join(" ")}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              {/* INPUT */}
              <div className="p-3 border-t border-white/10 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSend()}
                  placeholder="Écris ici…"
                  className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
                />

                <button
                  onClick={onSend}
                  disabled={loading}
                  className="rounded-2xl bg-white text-black px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {loading ? "..." : "Envoyer"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
