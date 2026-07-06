import { useMemo, useState } from "react";
import TopNav, { PageKey } from "./TopNav";

interface Props {
  onNavigate: (page: PageKey) => void;
}

const SECTIONS = [
  {
    n: "01",
    kind: "Timeline",
    tone: "accent" as const,
    meta: "1996 – 2026",
    page: "timeline" as const,
    title: "The Comparative Timeline",
    dek: "Thirty years of federal rulemaking read against the technology it was meant to govern — paper charts to cloud APIs — and the vulnerability each shift introduced.",
    cta: "Trace the timeline",
  },
  {
    n: "02",
    kind: "Intelligence",
    tone: "neutral" as const,
    meta: "Active frontier",
    page: "intelligence" as const,
    title: "2026 Compliance Intelligence",
    dek: "The live edge: ambient AI scribes, the reproductive-health privacy rule, tracking-pixel litigation, and information-blocking enforcement.",
    cta: "Read the latest",
  },
  {
    n: "03",
    kind: "Breaches",
    tone: "signal" as const,
    meta: "Case analyses",
    page: "breaches" as const,
    title: "Breaches & Outages, Deep-Dive",
    dek: "What actually went wrong at Anthem, Change Healthcare, and Hollywood Presbyterian — root cause, the OCR response, and the lesson that outlived it.",
    cta: "Examine the cases",
  },
];

const FOUNDATIONS = [
  { title: "The Privacy Rule", cfr: "45 CFR 160 · 164(A,E)", body: "Governs use and disclosure of PHI, and patients' right to access and amend their records." },
  { title: "The Security Rule", cfr: "45 CFR 164(C)", body: "Administrative, physical, and technical safeguards for electronic PHI — risk analysis to encryption." },
  { title: "Breach Notification Rule", cfr: "45 CFR 164(D)", body: "Notify patients, HHS, and (over 500 records) the media within 60 days of an unencrypted ePHI compromise." },
];

const PRIMER = [
  { q: "Who counts as a Business Associate?", a: "Any third party — cloud storage, AI transcription vendors, clearinghouses, analytics tools — that creates, receives, maintains, or transmits PHI for a covered entity. They must sign a BAA." },
  { q: "What is the 'minimum necessary' standard?", a: "Under 45 CFR § 164.502(b), when using or disclosing PHI you must limit it to the least data required to accomplish the task." },
  { q: "Why are voice transcripts a compliance risk?", a: "Voice files and transcripts carry biometric and clinical markers, so they are ePHI. Storing them unencrypted on consumer platforms is an immediate Security Rule breach." },
  { q: "What is the 'consumer app loophole'?", a: "Once a patient authorizes a non-covered app to pull records via FHIR, that data leaves HIPAA's protection — the developer can resell it. A frequent source of patient confusion." },
];

function toneColor(tone: "accent" | "neutral" | "signal") {
  if (tone === "signal") return "var(--signal)";
  if (tone === "neutral") return "var(--track-neutral)";
  return "var(--accent)";
}

export default function DashboardHub({ onNavigate }: Props) {
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const filt = <T extends Record<string, any>>(arr: T[], fields: string[]) => {
    if (!query) return arr;
    return arr.filter((o) => fields.some((f) => String(o[f] ?? "").toLowerCase().includes(query)));
  };

  const sections = useMemo(() => filt(SECTIONS, ["kind", "meta", "title", "dek"]), [query]);
  const foundations = useMemo(() => filt(FOUNDATIONS, ["title", "cfr", "body"]), [query]);
  const primer = useMemo(() => filt(PRIMER, ["q", "a"]), [query]);

  return (
    <div>
      <TopNav active="dashboard" onNavigate={onNavigate} maxWidth={1180} />

      <main className="mx-auto" style={{ maxWidth: 1180, padding: "64px 32px 96px" }}>
        {/* Masthead */}
        <section style={{ maxWidth: 780 }}>
          <div
            className="font-mono flex items-center gap-2.5"
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent-ink)" }}
          >
            <span>Regulatory Intelligence</span>
            <span style={{ color: "rgba(20,19,15,0.2)" }}>/</span>
            <span style={{ color: "var(--ink-faint)" }}>Issue · Q3 2024</span>
          </div>
          <h1 style={{ margin: "18px 0 0", fontSize: "clamp(38px,5.4vw,64px)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em" }}>
            The rules, the technology,
            <br />
            and the gaps between them.
          </h1>
          <p style={{ margin: "22px 0 0", fontSize: 18, lineHeight: 1.6, color: "var(--ink-muted)", fontWeight: 450, maxWidth: 640 }}>
            A working reference for healthcare practitioners — thirty years of HIPAA read against the systems it governs, the breaches that reshaped it, and the questions AI is raising right now. Read it like an issue, or search straight to what you need.
          </p>

          {/* Persistent finder */}
          <div
            className="flex items-center gap-3"
            style={{
              marginTop: 30,
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "4px 4px 4px 18px",
              maxWidth: 560,
              boxShadow: "0 1px 2px rgba(20,19,15,0.04), 0 16px 36px -30px rgba(20,19,15,0.3)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C887C" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search rules, breaches, CFR citations, AI topics…"
              className="flex-1 bg-transparent border-none outline-none"
              style={{ fontSize: 15, color: "var(--ink)", padding: "11px 0" }}
            />
            <kbd className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)", background: "var(--chip-bg)", border: "1px solid var(--line-soft)", borderRadius: 6, padding: "5px 8px" }}>
              ↵
            </kbd>
          </div>

          {/* Active advisory */}
          <div className="flex gap-3 items-start" style={{ marginTop: 20, maxWidth: 640, borderLeft: "2px solid var(--signal)", padding: "2px 0 2px 16px" }}>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-muted)" }}>
              <span className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--signal)" }}>
                Active advisory
              </span>
              <br />
              After the Change Healthcare failures, OCR has intensified monitoring of third-party BAAs and supplier continuity plans under 45 CFR § 164.308(a)(7).{" "}
              <a
                href="https://www.hhs.gov/hipaa/for-professionals/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent-ink)", borderBottom: "1px solid rgba(10,92,73,0.4)" }}
              >
                HHS OCR portal ↗
              </a>
            </p>
          </div>
        </section>

        {/* In this issue + side rail */}
        <div className="grid items-start" style={{ marginTop: 64, gridTemplateColumns: "1.55fr 1fr", gap: 56 }}>
          {/* Reading list */}
          <div>
            <div className="flex items-baseline justify-between" style={{ borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>In this issue</h2>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                {SECTIONS.length} tracks
              </span>
            </div>

            {sections.map((s) => (
              <button
                key={s.n}
                onClick={() => onNavigate(s.page)}
                className="grid items-start cursor-pointer w-full text-left bg-transparent border-none"
                style={{ gridTemplateColumns: "auto 1fr auto", gap: 22, padding: "26px 6px 26px 0", borderBottom: "1px solid var(--line-soft)", color: "inherit", font: "inherit" }}
              >
                <span className="font-mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-faint)", paddingTop: 4 }}>
                  {s.n}
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: toneColor(s.tone) }}></span>
                    <span className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                      {s.kind}
                    </span>
                    <span style={{ color: "rgba(20,19,15,0.2)" }}>·</span>
                    <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                      {s.meta}
                    </span>
                  </div>
                  <h3 style={{ margin: "9px 0 0", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{s.title}</h3>
                  <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.55, color: "var(--ink-muted)", maxWidth: "52ch" }}>{s.dek}</p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--accent-ink)",
                      borderBottom: "2px solid var(--accent)",
                      paddingBottom: 1,
                    }}
                  >
                    {s.cta}
                  </span>
                </div>
                <span style={{ alignSelf: "center", color: "var(--ink-faint)", fontSize: 20 }}>→</span>
              </button>
            ))}

            {sections.length === 0 && (
              <p className="font-mono" style={{ fontSize: 13, color: "var(--ink-faint)", padding: "28px 0" }}>
                No sections match "{q}". Try a rule number, an entity, or a topic like "pixel".
              </p>
            )}

            {/* Advisor utility */}
            <button
              onClick={() => onNavigate("advisor")}
              className="flex items-center justify-between gap-4 cursor-pointer w-full text-left bg-transparent border-none"
              style={{ marginTop: 26, background: "var(--ink)", color: "var(--paper)", borderRadius: 14, padding: "22px 26px" }}
            >
              <div>
                <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
                  Ask the Regulatory Advisor
                </div>
                <p style={{ margin: "7px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "#C9C5B8", maxWidth: "44ch" }}>
                  Query edge-cases, BAA requirements, and cloud-compliance patterns in plain language.
                </p>
              </div>
              <span style={{ fontSize: 22, color: "var(--paper)" }}>→</span>
            </button>
          </div>

          {/* Side rail */}
          <aside className="flex flex-col gap-8" style={{ position: "sticky", top: 88 }}>
            {/* Featured nudge */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 1px 2px rgba(20,19,15,0.04), 0 16px 36px -30px rgba(20,19,15,0.28)",
              }}
            >
              <div
                className="flex items-end"
                style={{
                  height: 96,
                  background: "repeating-linear-gradient(135deg, var(--inset), var(--inset) 11px, var(--chip-bg) 11px, var(--chip-bg) 22px)",
                  borderBottom: "1px solid var(--line-soft)",
                  padding: "12px 16px",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent-ink)",
                    background: "var(--paper)",
                    border: "1px solid rgba(20,19,15,0.09)",
                    borderRadius: 6,
                    padding: "4px 9px",
                  }}
                >
                  New this quarter
                </span>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.2 }}>
                  Ambient AI scribes are the new ePHI perimeter
                </h3>
                <p style={{ margin: "9px 0 0", fontSize: 14, lineHeight: 1.55, color: "var(--ink-muted)" }}>
                  Voice prints are bio-identifiers. Shadow-AI transcription without a signed BAA is a documentable breach — here's the exposure.
                </p>
                <button
                  onClick={() => onNavigate("intelligence")}
                  className="cursor-pointer bg-transparent border-none p-0"
                  style={{
                    display: "inline-block",
                    marginTop: 14,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--accent-ink)",
                    borderBottom: "2px solid var(--accent)",
                    paddingBottom: 1,
                  }}
                >
                  Read the briefing →
                </button>
              </div>
            </div>

            {/* Statutory foundations */}
            <div>
              <div className="flex items-baseline justify-between" style={{ borderBottom: "1px solid var(--line)", paddingBottom: 11, marginBottom: 6 }}>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Statutory foundations</h2>
                <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                  Reference
                </span>
              </div>
              {foundations.map((f) => (
                <div key={f.title} style={{ padding: "16px 0", borderBottom: "1px solid var(--line-soft)" }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{f.title}</span>
                    <span className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", whiteSpace: "nowrap" }}>
                      {f.cfr}
                    </span>
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-muted)" }}>{f.body}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Primer */}
        {primer.length > 0 && (
          <section style={{ marginTop: 80 }}>
            <div className="flex items-baseline justify-between" style={{ borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>A short primer</h2>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                Framework basics
              </span>
            </div>
            <div className="grid" style={{ marginTop: 28, gridTemplateColumns: "1fr 1fr", gap: "40px 56px" }}>
              {primer.map((p) => (
                <div key={p.q}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>{p.q}</h3>
                  <p style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-muted)" }}>{p.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--line)", background: "rgba(250,248,242,0.6)" }}>
        <div className="mx-auto flex flex-wrap items-end justify-between gap-5" style={{ maxWidth: 1180, padding: 32 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: "0.06em" }}>HIPAA·WATCH</div>
            <p className="font-mono" style={{ margin: "6px 0 0", fontSize: 13, color: "var(--ink-faint)" }}>
              Source: HHS.gov / OCR archives · 45 CFR Parts 160 &amp; 164 · Public Law 104-191
            </p>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-faint)", maxWidth: "38ch", textAlign: "right" }}>
            Educational reference. Not legal advice. Verify against primary HHS sources before acting.
          </p>
        </div>
      </footer>
    </div>
  );
}
