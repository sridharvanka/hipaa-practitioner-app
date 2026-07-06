import { useMemo, useState } from "react";
import TopNav, { PageKey } from "./TopNav";
import { breachCaseStudies } from "../data/breachData";

interface Props {
  onNavigate: (page: PageKey) => void;
}

const ENTITY_SHORT: Record<string, string> = {
  "change-healthcare-2024": "Change Healthcare",
  "novant-health-2022": "Novant Health",
  "hollywood-presbyterian-2016": "Hollywood Presbyterian",
  "anthem-inc-2015": "Anthem, Inc.",
  "bcbst-2009": "BCBS Tennessee",
};

export default function BreachDeepDives({ onNavigate }: Props) {
  const [activeId, setActiveId] = useState("change-healthcare-2024");
  const [q, setQ] = useState("");

  const select = (id: string) => {
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const active = useMemo(() => breachCaseStudies.find((c) => c.id === activeId) || breachCaseStudies[0], [activeId]);
  const activeIdx = breachCaseStudies.findIndex((c) => c.id === active.id);
  const related = [
    breachCaseStudies[(activeIdx + 1) % breachCaseStudies.length],
    breachCaseStudies[(activeIdx + 2) % breachCaseStudies.length],
  ];

  const query = q.trim().toLowerCase();
  const caseList = useMemo(() => {
    if (!query) return breachCaseStudies;
    return breachCaseStudies.filter((c) =>
      [c.entity, c.type, c.summary, c.rootCause, c.lessonsLearned, String(c.year)].some((f) => f.toLowerCase().includes(query))
    );
  }, [query]);

  return (
    <div>
      <TopNav active="breaches" onNavigate={onNavigate} maxWidth={1240} />

      {/* Section head */}
      <div className="mx-auto" style={{ maxWidth: 1240, padding: "44px 32px 0" }}>
        <div className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-faint)", letterSpacing: "0.06em" }}>
          <button onClick={() => onNavigate("dashboard")} className="bg-transparent border-none p-0 cursor-pointer" style={{ color: "var(--ink-faint)" }}>
            Overview
          </button>
          &nbsp;/&nbsp;<span style={{ color: "var(--ink)" }}>Breaches</span>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-8" style={{ marginTop: 14, borderBottom: "1px solid var(--line)", paddingBottom: 26 }}>
          <div style={{ maxWidth: 640 }}>
            <h1 style={{ margin: 0, fontSize: "clamp(30px,3.8vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.0 }}>
              Breaches &amp; outages, up close
            </h1>
            <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.55, color: "var(--ink-muted)" }}>
              Five case files audited by OCR — what failed, what it cost, and the one control that would have changed the ending. Read them like post-mortems.
            </p>
          </div>
          <div
            className="flex items-center gap-2.5"
            style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, padding: "3px 3px 3px 14px", boxShadow: "0 1px 2px rgba(20,19,15,0.04)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C887C" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter cases…"
              className="bg-transparent border-none outline-none"
              style={{ fontSize: 14, color: "var(--ink)", padding: "9px 0", width: 170 }}
            />
          </div>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="mx-auto grid items-start" style={{ maxWidth: 1240, padding: "36px 32px 96px", gridTemplateColumns: "240px minmax(0,1fr) 220px", gap: 48 }}>
        {/* LEFT: case list */}
        <aside style={{ position: "sticky", top: 88 }}>
          <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 10 }}>
            Case files
          </div>
          {caseList.map((c) => {
            const on = c.id === active.id;
            return (
              <button
                key={c.id}
                onClick={() => select(c.id)}
                className="block w-full text-left cursor-pointer"
                style={{
                  border: "none",
                  background: on ? "rgba(176,85,47,0.06)" : "transparent",
                  padding: "13px 12px 13px 13px",
                  borderLeft: `2px solid ${on ? "var(--signal)" : "rgba(20,19,15,0.09)"}`,
                  marginBottom: 3,
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: on ? "var(--ink)" : "var(--ink-faint)" }}>
                    {c.year}
                  </span>
                  <span className="font-mono" style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--signal)" }}>
                    {c.type}
                  </span>
                </div>
                <div style={{ marginTop: 4, fontSize: 13, fontWeight: 600, lineHeight: 1.25, color: on ? "var(--ink)" : "var(--ink-muted)" }}>
                  {ENTITY_SHORT[c.id] ?? c.entity}
                </div>
              </button>
            );
          })}
          {caseList.length === 0 && (
            <p className="font-mono" style={{ fontSize: 12, color: "var(--ink-faint)", padding: "8px 2px" }}>
              No case matches "{q}".
            </p>
          )}
        </aside>

        {/* CENTER: case article */}
        <article style={{ maxWidth: 680 }}>
          <div className="flex items-center gap-2.5 font-mono" style={{ fontSize: 11.5, letterSpacing: "0.04em" }}>
            <span className="inline-flex items-center gap-1.5" style={{ color: "var(--signal)", fontWeight: 600, textTransform: "uppercase" }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--signal)" }}></span>
              {active.type}
            </span>
            <span style={{ color: "rgba(20,19,15,0.2)" }}>·</span>
            <span style={{ color: "var(--ink-faint)" }}>Event year {active.year}</span>
          </div>
          <h2 style={{ margin: "16px 0 0", fontSize: "clamp(28px,3.4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08 }}>{active.entity}</h2>

          {/* Metrics */}
          <div
            className="grid"
            style={{ gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(20,19,15,0.1)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", marginTop: 24 }}
          >
            <div style={{ background: "var(--surface)", padding: "16px 18px" }}>
              <div className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                PHI records affected
              </div>
              <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700, lineHeight: 1.25, color: "var(--ink)" }}>{active.recordsAffected}</div>
            </div>
            <div style={{ background: "var(--surface)", padding: "16px 18px" }}>
              <div className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                Financial impact
              </div>
              <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700, lineHeight: 1.25, color: "var(--signal)" }}>{active.financialImpact}</div>
            </div>
          </div>

          {/* What happened */}
          <div id="incident" style={{ scrollMarginTop: 90, paddingTop: 34 }}>
            <h3 className="flex items-center gap-2.5" style={{ margin: 0, fontSize: 13.5, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--ink)" }}>
              <span style={{ width: 22, height: 2, background: "var(--track-neutral)" }}></span>
              What happened
            </h3>
            <p style={{ margin: "16px 0 0", fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.72, color: "var(--ink)" }}>{active.summary}</p>
          </div>

          {/* Root cause */}
          <div id="cause" style={{ scrollMarginTop: 90, paddingTop: 34 }}>
            <h3 className="flex items-center gap-2.5" style={{ margin: 0, fontSize: 13.5, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--signal)" }}>
              <span style={{ width: 22, height: 2, background: "var(--signal)" }}></span>
              Root cause
            </h3>
            <div style={{ marginTop: 16, borderLeft: "3px solid var(--signal)", background: "rgba(176,85,47,0.04)", borderRadius: "0 12px 12px 0", padding: "20px 22px" }}>
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.62, color: "var(--reading-ink)" }}>{active.rootCause}</p>
            </div>
          </div>

          {/* OCR response */}
          <div id="ocr" style={{ scrollMarginTop: 90, paddingTop: 34 }}>
            <h3 className="flex items-center gap-2.5" style={{ margin: 0, fontSize: 13.5, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--ink)" }}>
              <span style={{ width: 22, height: 2, background: "var(--track-neutral)" }}></span>
              The OCR response
            </h3>
            <p style={{ margin: "16px 0 0", fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.72, color: "var(--reading-ink)" }}>{active.regulatoryAction}</p>
          </div>

          {/* Lesson */}
          <div id="lesson" style={{ scrollMarginTop: 90, paddingTop: 34 }}>
            <h3 className="flex items-center gap-2.5" style={{ margin: 0, fontSize: 13.5, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--accent-ink)" }}>
              <span style={{ width: 22, height: 2, background: "var(--accent)" }}></span>
              The lesson that survived
            </h3>
            <div style={{ marginTop: 16, borderLeft: "3px solid var(--accent)", background: "rgba(14,138,110,0.045)", borderRadius: "0 12px 12px 0", padding: "20px 22px" }}>
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.62, color: "var(--reading-ink)" }}>{active.lessonsLearned}</p>
            </div>
          </div>

          {/* Sources */}
          <details style={{ marginTop: 36, borderTop: "1px solid var(--line)", paddingTop: 20 }}>
            <summary className="flex items-center justify-between gap-3">
              <span style={{ fontSize: 14, fontWeight: 700 }}>HHS &amp; Congressional sources</span>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                tap to open
              </span>
            </summary>
            <div style={{ marginTop: 14 }}>
              {active.sources.map((src) => (
                <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 items-start no-underline" style={{ padding: "9px 0" }}>
                  <span style={{ color: "var(--accent-ink)", fontSize: 14, marginTop: 1 }}>↗</span>
                  <span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--accent-ink)" }}>{src.label}</span>
                    <span style={{ display: "block", fontSize: 12.5, color: "var(--ink-faint)", marginTop: 2 }}>{src.description}</span>
                  </span>
                </a>
              ))}
            </div>
          </details>

          {/* Related */}
          <div style={{ marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 14 }}>
              More case files
            </div>
            {related.map((r) => (
              <button
                key={r.id}
                onClick={() => select(r.id)}
                className="flex w-full items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-none"
                style={{ padding: "16px 6px 16px 0", borderBottom: "1px solid var(--line-soft)" }}
              >
                <span>
                  <span className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--signal)" }}>
                    {r.year} · {r.type}
                  </span>
                  <span style={{ display: "block", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>{ENTITY_SHORT[r.id] ?? r.entity}</span>
                </span>
                <span style={{ color: "var(--ink-faint)", fontSize: 18 }}>→</span>
              </button>
            ))}
          </div>
        </article>

        {/* RIGHT: on this page + advisor */}
        <aside className="flex flex-col gap-6.5" style={{ position: "sticky", top: 88 }}>
          <div>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 12 }}>
              On this page
            </div>
            <nav className="flex flex-col gap-0.5" style={{ borderLeft: "1px solid var(--line)" }}>
              <a href="#incident" style={{ fontSize: 13, color: "var(--ink-muted)", padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid transparent" }}>
                What happened
              </a>
              <a href="#cause" style={{ fontSize: 13, color: "var(--signal)", fontWeight: 600, padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid var(--signal)" }}>
                Root cause
              </a>
              <a href="#ocr" style={{ fontSize: 13, color: "var(--ink-muted)", padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid transparent" }}>
                OCR response
              </a>
              <a href="#lesson" style={{ fontSize: 13, color: "var(--accent-ink)", fontWeight: 600, padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid var(--accent)" }}>
                The lesson
              </a>
            </nav>
          </div>
          <button
            onClick={() => onNavigate("advisor")}
            className="block cursor-pointer w-full text-left bg-transparent border-none"
            style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: 12, padding: 18 }}
          >
            <div className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
              Ask the advisor →
            </div>
            <div style={{ marginTop: 8, fontSize: 15, fontWeight: 600, lineHeight: 1.25 }}>Could this happen to us?</div>
            <p style={{ margin: "7px 0 0", fontSize: 12.5, lineHeight: 1.45, color: "#C9C5B8" }}>Red-team your own controls against this case.</p>
          </button>
        </aside>
      </div>
    </div>
  );
}
