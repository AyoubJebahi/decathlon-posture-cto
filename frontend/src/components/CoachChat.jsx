import { useState } from "react";
import { sendChat } from "../services/chatApi";

export default function CoachChat({ profile, moveId, mode }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Salut ! Décris ton problème (ex: “mes genoux rentrent”, “je fatigue vite”, “douleur poignet”)." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSend() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const r = await sendChat({ message: text, profile, moveId, mode });
      setMessages((m) => [...m, { role: "bot", text: r.reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "bot", text: e.message || "Erreur" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
      <div className="font-semibold mb-2">Coach Chat</div>

      <div className="h-56 overflow-auto space-y-2 pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={[
              "max-w-[85%] rounded-2xl border px-3 py-2 text-sm",
              m.role === "user"
                ? "ml-auto bg-white text-black border-white"
                : "bg-white/5 border-white/10"
            ].join(" ")}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Écris ici..."
          className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none"
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
  );
}
