import { useState, useMemo } from "react";
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
  const [mode, setMode] = useState<"consult" | "zkp">("consult");
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

      <div className="mx-auto flex items-end justify-between flex-wrap gap-4" style={{ maxWidth: 1180, padding: "44px 32px 0", borderBottom: "1px solid var(--line-soft)", paddingBottom: 16 }}>
        <div className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-faint)", letterSpacing: "0.06em", paddingBottom: 8 }}>
          <button onClick={() => onNavigate("dashboard")} className="bg-transparent border-none p-0 cursor-pointer" style={{ color: "var(--ink-faint)" }}>
            Overview
          </button>
          &nbsp;/&nbsp;<span style={{ color: "var(--ink)" }}>Advisor</span>
        </div>

        <div className="flex gap-2" style={{ background: "var(--chip-bg)", padding: 4, borderRadius: 10, border: "1px solid var(--line-soft)", marginBottom: 4 }}>
          <button
            onClick={() => setMode("consult")}
            className="cursor-pointer font-sans"
            style={{
              border: "none",
              background: mode === "consult" ? "var(--surface)" : "transparent",
              color: mode === "consult" ? "var(--ink)" : "var(--ink-muted)",
              fontWeight: 600,
              fontSize: 13,
              padding: "8px 16px",
              borderRadius: 8,
              boxShadow: mode === "consult" ? "0 1px 2px rgba(20,19,15,0.08)" : "none"
            }}
          >
            Advisor Chat
          </button>
          <button
            onClick={() => setMode("zkp")}
            className="cursor-pointer font-sans"
            style={{
              border: "none",
              background: mode === "zkp" ? "var(--surface)" : "transparent",
              color: mode === "zkp" ? "var(--ink)" : "var(--ink-muted)",
              fontWeight: 600,
              fontSize: 13,
              padding: "8px 16px",
              borderRadius: 8,
              boxShadow: mode === "zkp" ? "0 1px 2px rgba(20,19,15,0.08)" : "none"
            }}
          >
            Future Tech Lab (ZKP)
          </button>
        </div>
      </div>

      {/* Two-column consult */}
      {mode === "consult" && (
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
      )}

      {mode === "zkp" && <ZKPWalletSimulator />}

      {/* Input bar */}
      {mode === "consult" && (
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
      )}
    </div>
  );
}

function ZKPWalletSimulator() {
  const [step, setStep] = useState<number>(0);
  const [issuedCred, setIssuedCred] = useState<{
    patient: string;
    test: string;
    result: string;
    signature: string;
    issuedAt: string;
  } | null>(null);
  const [zkProof, setZkProof] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState<boolean>(false);

  const handleIssue = () => {
    setIssuedCred({
      patient: "Jane Doe",
      test: "Hepatitis B Immunity",
      result: "Immune (Quantitative Antibody > 10 mIU/mL)",
      signature: "0x89e023ca51a2bcde6102ffea889100cc9023dbfb827e",
      issuedAt: new Date().toLocaleDateString()
    });
    setStep(1);
  };

  const handleGenerateProof = () => {
    setZkProof("zkp_proof_sha256_0x5c48b29de1a88b50e3928a5091c3d902187f54");
    setStep(2);
  };

  const handleVerifyProof = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerified(true);
      setVerifying(false);
      setStep(3);
    }, 1500);
  };

  const handleReset = () => {
    setStep(0);
    setIssuedCred(null);
    setZkProof(null);
    setVerified(null);
  };

  return (
    <div style={{ maxWidth: 1180, margin: "30px auto 120px", padding: "0 32px" }}>
      {/* Intro section */}
      <div style={{ maxWidth: 740, marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Patient-Controlled Cryptographic Wallets
        </h2>
        <p style={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-muted)" }}>
          How do we share medical status without sharing medical files? Traditional compliance depends on business contracts (BAAs) and firewalls. Zero-Knowledge Proofs (ZKPs) change the security model: patients cryptographically prove assertions (e.g. vaccination status) without revealing their underlying health data (PHI) to verifiers.
        </p>
      </div>

      {/* Grid of 3 roles */}
      <div className="grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 30, alignItems: "stretch" }}>
        
        {/* Column 1: The Issuer (Hospital / Clinic) */}
        <div 
          style={{ 
            background: "var(--surface)", 
            border: step === 0 ? "2px solid var(--accent)" : "1px solid var(--line)", 
            borderRadius: 14, 
            padding: 24, 
            boxShadow: "0 1px 3px rgba(20,19,15,0.02)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div className="flex items-center justify-between" style={{ borderBottom: "1px solid var(--line-soft)", paddingBottom: 10 }}>
              <span className="font-mono" style={{ fontSize: 10, fontWeight: 600, color: "var(--accent-ink)", textTransform: "uppercase" }}>
                Role 1 · Issuer
              </span>
              <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                Hospital Authority
              </span>
            </div>
            <h3 style={{ margin: "14px 0 0", fontSize: 17, fontWeight: 700 }}>Metro Health System</h3>
            <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--ink-muted)" }}>
              The hospital signs and issues a verifiable medical credential directly to the patient's device, signing it with their cryptographic private key.
            </p>

            {issuedCred ? (
              <div 
                className="font-mono" 
                style={{ 
                  marginTop: 16, 
                  background: "var(--inset)", 
                  padding: 12, 
                  borderRadius: 8, 
                  fontSize: 11, 
                  lineHeight: 1.45, 
                  border: "1px solid var(--line-soft)",
                  color: "var(--ink)"
                }}
              >
                <div><strong>Cred:</strong> HepB_Immunity</div>
                <div><strong>Patient:</strong> Jane Doe <span style={{ color: "var(--signal)", fontWeight: 600 }}>(PHI)</span></div>
                <div><strong>Result:</strong> Immune</div>
                <div style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", color: "var(--ink-faint)" }}>
                  <strong>Sig:</strong> {issuedCred.signature}
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 24, padding: "20px 0", textAlign: "center", border: "1px dashed var(--line)", borderRadius: 8, color: "var(--ink-faint)", fontSize: 13 }}>
                Waiting for record checkout...
              </div>
            )}
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              onClick={handleIssue}
              disabled={step > 0}
              className="w-full cursor-pointer font-sans"
              style={{
                border: "none",
                background: step === 0 ? "var(--accent)" : "var(--chip-bg)",
                color: step === 0 ? "var(--paper)" : "var(--ink-faint)",
                fontWeight: 600,
                fontSize: 13.5,
                padding: "10px 14px",
                borderRadius: 8,
                transition: "opacity 0.25s"
              }}
            >
              {step === 0 ? "Issue Credential (Sign)" : "✓ Credential Signed"}
            </button>
          </div>
        </div>

        {/* Column 2: The Holder (Patient Wallet) */}
        <div 
          style={{ 
            background: "var(--surface)", 
            border: step === 1 ? "2px solid var(--accent)" : "1px solid var(--line)", 
            borderRadius: 14, 
            padding: 24, 
            boxShadow: "0 1px 3px rgba(20,19,15,0.02)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div className="flex items-center justify-between" style={{ borderBottom: "1px solid var(--line-soft)", paddingBottom: 10 }}>
              <span className="font-mono" style={{ fontSize: 10, fontWeight: 600, color: "var(--accent-ink)", textTransform: "uppercase" }}>
                Role 2 · Holder
              </span>
              <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                Patient's Device
              </span>
            </div>
            <h3 style={{ margin: "14px 0 0", fontSize: 17, fontWeight: 700 }}>Secure Identity Wallet</h3>
            <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--ink-muted)" }}>
              The patient stores their credentials locally. When asked to prove vaccination, their wallet compiles a Zero-Knowledge Proof, scrubbing all identity details and test dates.
            </p>

            {zkProof ? (
              <div 
                className="font-mono" 
                style={{ 
                  marginTop: 16, 
                  background: "var(--inset)", 
                  padding: 12, 
                  borderRadius: 8, 
                  fontSize: 11, 
                  lineHeight: 1.45, 
                  border: "1px solid var(--line-soft)",
                  color: "var(--accent-ink)"
                }}
              >
                <div><strong>Proof Payload:</strong></div>
                <div style={{ wordBreak: "break-all", fontSize: 10 }}>
                  {zkProof}
                </div>
                <div style={{ marginTop: 4, color: "var(--ink-faint)", fontSize: 9.5 }}>
                  🔒 PHI Redacted: Yes
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 24, padding: "20px 0", textAlign: "center", border: "1px dashed var(--line)", borderRadius: 8, color: "var(--ink-faint)", fontSize: 13 }}>
                {step === 0 ? "Awaiting credential..." : "Awaiting ZK proof compilation..."}
              </div>
            )}
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              onClick={handleGenerateProof}
              disabled={step !== 1}
              className="w-full cursor-pointer font-sans"
              style={{
                border: "none",
                background: step === 1 ? "var(--accent)" : "var(--chip-bg)",
                color: step === 1 ? "var(--paper)" : "var(--ink-faint)",
                fontWeight: 600,
                fontSize: 13.5,
                padding: "10px 14px",
                borderRadius: 8
              }}
            >
              {step < 2 ? "Generate ZK Proof" : "✓ ZK Proof Prepared"}
            </button>
          </div>
        </div>

        {/* Column 3: The Verifier (School / Employer / Third Party) */}
        <div 
          style={{ 
            background: "var(--surface)", 
            border: step === 2 ? "2px solid var(--accent)" : "1px solid var(--line)", 
            borderRadius: 14, 
            padding: 24, 
            boxShadow: "0 1px 3px rgba(20,19,15,0.02)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div className="flex items-center justify-between" style={{ borderBottom: "1px solid var(--line-soft)", paddingBottom: 10 }}>
              <span className="font-mono" style={{ fontSize: 10, fontWeight: 600, color: "var(--accent-ink)", textTransform: "uppercase" }}>
                Role 3 · Verifier
              </span>
              <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                External Organization
              </span>
            </div>
            <h3 style={{ margin: "14px 0 0", fontSize: 17, fontWeight: 700 }}>University Portal</h3>
            <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--ink-muted)" }}>
              The verifier checks the mathematical proof using the hospital's public key. They confirm the patient is immune without learning their name or receiving records.
            </p>

            {verified ? (
              <div 
                style={{ 
                  marginTop: 16, 
                  background: "rgba(14, 138, 110, 0.05)", 
                  padding: 12, 
                  borderRadius: 8, 
                  border: "1px solid var(--accent)"
                }}
              >
                <div className="font-mono" style={{ fontSize: 11.5, fontWeight: 600, color: "var(--accent-ink)" }}>
                  ✓ Cryptographically Valid
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-muted)", marginTop: 4 }}>
                  Jane Doe's identity remained hidden. PHI transmitted: <strong>0 bytes</strong>.
                </div>
              </div>
            ) : verifying ? (
              <div style={{ marginTop: 24, padding: "20px 0", textAlign: "center", color: "var(--accent-ink)" }}>
                <span className="font-mono" style={{ fontSize: 12 }}>Checking cryptographic proof...</span>
              </div>
            ) : (
              <div style={{ marginTop: 24, padding: "20px 0", textAlign: "center", border: "1px dashed var(--line)", borderRadius: 8, color: "var(--ink-faint)", fontSize: 13 }}>
                {step < 2 ? "Awaiting proof submission..." : "Proof received."}
              </div>
            )}
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              onClick={handleVerifyProof}
              disabled={step !== 2}
              className="w-full cursor-pointer font-sans"
              style={{
                border: "none",
                background: step === 2 ? "var(--ink)" : "var(--chip-bg)",
                color: step === 2 ? "var(--paper)" : "var(--ink-faint)",
                fontWeight: 600,
                fontSize: 13.5,
                padding: "10px 14px",
                borderRadius: 8
              }}
            >
              {step < 3 ? "Verify Proof" : "✓ Verification Complete"}
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Takeaway & Reset */}
      <div 
        style={{ 
          marginTop: 40, 
          background: "var(--inset)", 
          border: "1px solid var(--line-soft)", 
          borderRadius: 12, 
          padding: "24px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 32
        }}
      >
        <div style={{ flex: 1 }}>
          <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--accent-ink)", textTransform: "uppercase" }}>
            The HIPAA Impact
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--ink-muted)" }}>
            By verifying assertions rather than collecting records, the university avoids receiving ePHI entirely. No BAAs are required, no security safeguards are needed on the university's database, and the patient's privacy rights are protected.
          </p>
        </div>
        {step > 0 && (
          <button
            onClick={handleReset}
            className="cursor-pointer font-sans"
            style={{
              background: "transparent",
              border: "1px solid var(--line)",
              color: "var(--ink)",
              fontWeight: 600,
              fontSize: 13,
              padding: "10px 18px",
              borderRadius: 8
            }}
          >
            Reset Simulation
          </button>
        )}
      </div>
    </div>
  );
}
