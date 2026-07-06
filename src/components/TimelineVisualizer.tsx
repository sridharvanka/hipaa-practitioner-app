import { useMemo, useState } from "react";
import TopNav, { PageKey } from "./TopNav";
import { timelineEvents } from "../data/timelineData";

interface Props {
  onNavigate: (page: PageKey) => void;
}

function archetype(year: number) {
  if (year <= 2005) return "Client-server, on-premise";
  if (year <= 2016) return "SaaS & cloud integration";
  return "Cloud-native API & microservices";
}

export default function TimelineVisualizer({ onNavigate }: Props) {
  const [activeYear, setActiveYear] = useState(2009);

  const idx = useMemo(() => Math.max(0, timelineEvents.findIndex((e) => e.year === activeYear)), [activeYear]);
  const active = timelineEvents[idx];
  const prev = idx > 0 ? timelineEvents[idx - 1] : null;
  const next = idx < timelineEvents.length - 1 ? timelineEvents[idx + 1] : null;

  const select = (year: number) => {
    setActiveYear(year);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <TopNav active="timeline" onNavigate={onNavigate} maxWidth={1240} />

      {/* Section head */}
      <div className="mx-auto" style={{ maxWidth: 1240, padding: "44px 32px 0" }}>
        <div className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-faint)", letterSpacing: "0.06em" }}>
          <button onClick={() => onNavigate("dashboard")} className="bg-transparent border-none p-0 cursor-pointer" style={{ color: "var(--ink-faint)" }}>
            Overview
          </button>
          &nbsp;/&nbsp;<span style={{ color: "var(--ink)" }}>Timeline</span>
        </div>
        <div style={{ marginTop: 14, maxWidth: 680 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(30px,3.8vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.0 }}>
            The comparative timeline
          </h1>
          <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.55, color: "var(--ink-muted)" }}>
            Thirty years of HIPAA, read in three parallel tracks — the law, the technology it was governing, and the blindspot each era left behind. Pick a year to line them up.
          </p>
        </div>
      </div>

      {/* Era spine */}
      <div
        className="z-[15]"
        style={{
          position: "sticky",
          top: 57,
          background: "rgba(244,241,232,0.9)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderBottom: "1px solid rgba(20,19,15,0.09)",
          marginTop: 28,
        }}
      >
        <div className="mx-auto overflow-x-auto" style={{ maxWidth: 1240, padding: "20px 32px 16px" }}>
          <div className="relative flex justify-between" style={{ minWidth: 640 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 5, height: 1, background: "rgba(20,19,15,0.14)" }}></div>
            {timelineEvents.map((e) => {
              const on = e.year === active.year;
              return (
                <button
                  key={e.year}
                  onClick={() => select(e.year)}
                  className="relative z-[1] flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer p-0"
                >
                  <span
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: on ? "var(--accent)" : "var(--paper)",
                      border: `2px solid ${on ? "var(--accent)" : "rgba(20,19,15,0.28)"}`,
                      boxShadow: "0 0 0 4px var(--paper)",
                    }}
                  ></span>
                  <span className="font-mono" style={{ fontSize: 12, fontWeight: on ? 600 : 400, color: on ? "var(--ink)" : "var(--ink-faint)" }}>
                    {e.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="mx-auto grid items-start" style={{ maxWidth: 1240, padding: "36px 32px 96px", gridTemplateColumns: "230px minmax(0,1fr) 200px", gap: 48 }}>
        {/* LEFT: era list */}
        <aside style={{ position: "sticky", top: 132 }}>
          <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 10 }}>
            Eras · {timelineEvents.length}
          </div>
          {timelineEvents.map((e) => {
            const on = e.year === active.year;
            return (
              <button
                key={e.year}
                onClick={() => select(e.year)}
                className="block w-full text-left bg-transparent cursor-pointer"
                style={{
                  border: "none",
                  background: on ? "rgba(14,138,110,0.06)" : "transparent",
                  padding: "12px 12px 12px 13px",
                  borderLeft: `2px solid ${on ? "var(--accent)" : "rgba(20,19,15,0.09)"}`,
                  marginBottom: 3,
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <div className="font-mono" style={{ fontSize: 13, fontWeight: 600, color: on ? "var(--ink)" : "var(--ink-faint)" }}>
                  {e.year}
                </div>
                <div style={{ marginTop: 3, fontSize: 12.5, fontWeight: 500, lineHeight: 1.3, color: on ? "var(--ink)" : "var(--ink-muted)" }}>
                  {e.title.length > 34 ? e.title.slice(0, 34) + "…" : e.title}
                </div>
              </button>
            );
          })}
        </aside>

        {/* CENTER: era article */}
        <article style={{ maxWidth: 680 }}>
          <div className="font-mono" style={{ fontSize: 12, color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
            {active.date}
          </div>
          <h2 style={{ margin: "12px 0 0", fontSize: "clamp(28px,3.4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            {active.title}
          </h2>
          <div className="flex items-center gap-3.5" style={{ marginTop: 18, paddingBottom: 8 }}>
            <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
              Architecture era
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 11.5, color: "var(--ink)", background: "var(--surface)", border: "1px solid var(--line)", padding: "4px 10px", borderRadius: 6 }}
            >
              {archetype(active.year)}
            </span>
          </div>

          {/* Track 1: Legislation */}
          <div id="leg" style={{ scrollMarginTop: 150, paddingTop: 34 }}>
            <h3 className="flex items-center gap-2.5" style={{ margin: 0, fontSize: 13.5, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--ink)" }}>
              <span style={{ width: 22, height: 2, background: "var(--accent)" }}></span>
              Legislation &amp; CFR
            </h3>
            <p style={{ margin: "16px 0 0", fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.72, color: "var(--ink)" }}>{active.regulationDetail}</p>
            <div className="flex flex-wrap gap-2" style={{ marginTop: 16 }}>
              {active.regulationCitations.map((c) => (
                <span
                  key={c}
                  className="font-mono"
                  style={{ fontSize: 11.5, color: "var(--accent-ink)", background: "rgba(14,138,110,0.06)", border: "1px solid rgba(14,138,110,0.18)", padding: "5px 10px", borderRadius: 6 }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Track 2: Technology */}
          <div id="tech" style={{ scrollMarginTop: 150, paddingTop: 34 }}>
            <h3 className="flex items-center gap-2.5" style={{ margin: 0, fontSize: 13.5, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--ink)" }}>
              <span style={{ width: 22, height: 2, background: "var(--track-neutral)" }}></span>
              Technology of the era
            </h3>
            <p style={{ margin: "16px 0 0", fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.72, color: "var(--reading-ink)" }}>{active.techEvolution}</p>
            <div className="flex flex-wrap gap-2" style={{ marginTop: 16 }}>
              {active.techKeywords.map((c) => (
                <span
                  key={c}
                  className="font-mono"
                  style={{ fontSize: 11.5, color: "var(--track-neutral)", background: "var(--surface)", border: "1px solid var(--line)", padding: "5px 10px", borderRadius: 6 }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Track 3: Risks */}
          <div id="risk" style={{ scrollMarginTop: 150, paddingTop: 34 }}>
            <h3 className="flex items-center gap-2.5" style={{ margin: 0, fontSize: 13.5, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--signal)" }}>
              <span style={{ width: 22, height: 2, background: "var(--signal)" }}></span>
              Risks &amp; blindspots
            </h3>
            <div style={{ marginTop: 16, borderLeft: "3px solid var(--signal)", background: "rgba(176,85,47,0.04)", borderRadius: "0 12px 12px 0", padding: "20px 22px" }}>
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.62, color: "var(--reading-ink)" }}>{active.risksAndBlindspots}</p>
            </div>
            <div className="flex flex-wrap gap-2" style={{ marginTop: 16 }}>
              {active.riskKeywords.map((c) => (
                <span
                  key={c}
                  className="font-mono"
                  style={{ fontSize: 11.5, color: "var(--signal)", background: "rgba(176,85,47,0.05)", border: "1px solid rgba(176,85,47,0.2)", padding: "5px 10px", borderRadius: 6 }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Sources */}
          <details style={{ marginTop: 36, borderTop: "1px solid var(--line)", paddingTop: 20 }}>
            <summary className="flex items-center justify-between gap-3">
              <span style={{ fontSize: 14, fontWeight: 700 }}>Verified government sources</span>
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

          {/* Prev / next era */}
          <div className="flex gap-3" style={{ marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            {prev && (
              <button
                onClick={() => select(prev.year)}
                className="flex-1 text-left cursor-pointer"
                style={{ border: "1px solid var(--line)", background: "var(--surface)", padding: "14px 16px", borderRadius: 12 }}
              >
                <span className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  ← {prev.year}
                </span>
                <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>{prev.title}</span>
              </button>
            )}
            {next && (
              <button
                onClick={() => select(next.year)}
                className="flex-1 cursor-pointer"
                style={{ border: "1px solid var(--line)", background: "var(--surface)", padding: "14px 16px", borderRadius: 12, textAlign: "right" }}
              >
                <span className="font-mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {next.year} →
                </span>
                <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>{next.title}</span>
              </button>
            )}
          </div>
        </article>

        {/* RIGHT: tracks jump + cross-link */}
        <aside className="flex flex-col gap-6.5" style={{ position: "sticky", top: 132 }}>
          <div>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 12 }}>
              The three tracks
            </div>
            <nav className="flex flex-col gap-0.5" style={{ borderLeft: "1px solid var(--line)" }}>
              <a href="#leg" style={{ fontSize: 13, color: "var(--accent-ink)", fontWeight: 600, padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid var(--accent)" }}>
                Legislation &amp; CFR
              </a>
              <a href="#tech" style={{ fontSize: 13, color: "var(--ink-muted)", padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid transparent" }}>
                Technology
              </a>
              <a href="#risk" style={{ fontSize: 13, color: "var(--signal)", fontWeight: 600, padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid var(--signal)" }}>
                Risks &amp; blindspots
              </a>
            </nav>
          </div>
          <button
            onClick={() => onNavigate("breaches")}
            className="block cursor-pointer w-full text-left bg-transparent border-none"
            style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: 12, padding: 18 }}
          >
            <div className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
              See it go wrong →
            </div>
            <div style={{ marginTop: 8, fontSize: 15, fontWeight: 600, lineHeight: 1.25 }}>Breaches &amp; Outages</div>
            <p style={{ margin: "7px 0 0", fontSize: 12.5, lineHeight: 1.45, color: "#C9C5B8" }}>The eras above, as the case files they produced.</p>
          </button>
        </aside>
      </div>
    </div>
  );
}
