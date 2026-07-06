import { useState } from "react";
import TopNav, { PageKey } from "./TopNav";
import { ChatMessage } from "../types";

interface Props {
  onNavigate: (page: PageKey) => void;
}

const SUGGESTIONS = [
  "Explain the § 164.308(a)(1)(ii)(A) risk-analysis rule.",
  "What is our tracking-pixel liability under the 2022 OCR guidance?",
  "Red-team our BAA audits for cloud backups.",
  "Summarize the technical controls from the Anthem breach.",
];

export default function AIComplianceAdvisor({ onNavigate }: Props) {
  const [thread, setThread] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    setError(null);
    const userMsg: ChatMessage = { id: `msg-${Date.now()}-user`, role: "user", text: trimmed, timestamp: new Date() };
    const chatHistory = thread.map((m) => ({ role: m.role, text: m.text }));
    setThread((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/anthropic/advisor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, chatHistory }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to contact the regulatory AI advisor.");
      }

      const data = await response.json();
      const modelMsg: ChatMessage = { id: `msg-${Date.now()}-model`, role: "model", text: data.text, timestamp: new Date() };
      setThread((prev) => [...prev, modelMsg]);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please verify your ANTHROPIC_API_KEY.");
    } finally {
      setThinking(false);
    }
  };

  return (
    <div>
      <TopNav active="advisor" onNavigate={onNavigate} maxWidth={1180} />

      <div className="mx-auto" style={{ maxWidth: 1180, padding: "44px 32px 0" }}>
        <div className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-faint)", letterSpacing: "0.06em" }}>
          <button onClick={() => onNavigate("dashboard")} className="bg-transparent border-none p-0 cursor-pointer" style={{ color: "var(--ink-faint)" }}>
            Overview
          </button>
          &nbsp;/&nbsp;<span style={{ color: "var(--ink)" }}>Advisor</span>
        </div>
      </div>

      {/* Two-column consult */}
      <div className="mx-auto grid items-start" style={{ maxWidth: 1180, padding: "20px 32px 200px", gridTemplateColumns: "260px minmax(0,1fr)", gap: 52 }}>
        {/* LEFT: about + suggestions */}
        <aside className="flex flex-col gap-6.5" style={{ position: "sticky", top: 88 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.05 }}>Regulatory advisor</h1>
            <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.55, color: "var(--ink-muted)" }}>
              Cross-reference CFR requirements, weigh breach precedents, and red-team cloud architectures — in plain language.
            </p>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 10 }}>
              Try asking
            </div>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                disabled={thinking}
                className="block w-full text-left cursor-pointer disabled:opacity-50"
                style={{ border: "1px solid var(--line)", background: "var(--surface)", padding: "12px 14px", borderRadius: 10, marginBottom: 8, fontSize: 13, lineHeight: 1.4, color: "var(--reading-ink)" }}
              >
                {s}
              </button>
            ))}
          </div>
          <div style={{ borderLeft: "2px solid rgba(20,19,15,0.14)", padding: "2px 0 2px 14px" }}>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: "var(--ink-faint)" }}>
              Educational reference, not legal advice. Every answer cites primary 45 CFR sources — verify before acting.
            </p>
          </div>
        </aside>

        {/* RIGHT: transcript */}
        <div style={{ maxWidth: 720 }}>
          {thread.length === 0 && (
            <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: 32, marginBottom: 8 }}>
              <div className="inline-flex items-center gap-2 font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-ink)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }}></span>
                Advisor ready
              </div>
              <p style={{ margin: "16px 0 0", fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1.5, color: "var(--ink)", fontStyle: "italic", maxWidth: "44ch" }}>
                Ask a compliance question and I'll answer with the statute, the precedent, and the practical next step.
              </p>
              <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-muted)" }}>
                Pick a starter on the left, or type your own below — CFR clauses, security gaps, BAA checks, breach precedents.
              </p>
            </div>
          )}

          {thread.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex gap-3 items-start" style={{ padding: "22px 0" }}>
                <span className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-faint)", paddingTop: 4, whiteSpace: "nowrap" }}>
                  You asked
                </span>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.4, color: "var(--ink)" }}>{m.text}</p>
              </div>
            ) : (
              <div key={m.id} style={{ padding: "22px 0" }}>
                <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 20 }}>
                  <div className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-ink)", marginBottom: 12 }}>
                    Advisor
                  </div>
                  <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 18.5, lineHeight: 1.65, color: "var(--ink)", whiteSpace: "pre-wrap" }}>{m.text}</p>
                </div>
              </div>
            )
          )}

          {thinking && (
            <div className="flex items-center gap-2.5 font-mono" style={{ padding: "22px 0", fontSize: 13, color: "var(--ink-faint)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", opacity: 0.6 }}></span>
              Cross-referencing statute and precedent…
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5" style={{ borderLeft: "3px solid var(--signal)", background: "rgba(176,85,47,0.04)", borderRadius: "0 12px 12px 0", padding: "16px 18px" }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--signal)" }}>Inquiry failed</p>
                <p style={{ margin: "4px 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--reading-ink)" }}>{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input bar */}
      <div
        className="fixed left-0 right-0 bottom-0 z-[25]"
        style={{ background: "linear-gradient(to top, var(--paper) 60%, rgba(244,241,232,0))", padding: "24px 32px 28px" }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="mx-auto flex items-center gap-2.5"
          style={{
            maxWidth: 820,
            background: "var(--surface)",
            border: "1px solid rgba(20,19,15,0.14)",
            borderRadius: 14,
            padding: "6px 6px 6px 20px",
            boxShadow: "0 2px 4px rgba(20,19,15,0.05), 0 20px 44px -28px rgba(20,19,15,0.35)",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={thinking}
            placeholder="Ask about CFR clauses, security gaps, BAA checks, breach precedents…"
            className="flex-1 bg-transparent border-none outline-none disabled:opacity-50"
            style={{ fontSize: 15, color: "var(--ink)", padding: "13px 0" }}
          />
          <button
            type="submit"
            disabled={thinking || !input.trim()}
            className="cursor-pointer inline-flex items-center gap-2 disabled:opacity-40"
            style={{ border: "none", background: "var(--ink)", color: "var(--paper)", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 10 }}
          >
            Ask <span style={{ fontSize: 15 }}>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
