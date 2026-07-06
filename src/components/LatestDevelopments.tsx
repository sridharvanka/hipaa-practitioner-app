import { useMemo, useState } from "react";
import TopNav, { PageKey } from "./TopNav";

interface Props {
  onNavigate: (page: PageKey) => void;
}

type Tone = "accent" | "neutral" | "signal";

interface Topic {
  id: string;
  kind: string;
  tone: Tone;
  status: string;
  title: string;
  dek: string;
  lead: string;
  whatItIs: string;
  aiAngle: string;
  blindspot: string;
  practice: string;
  citations: string[];
  sources: { label: string; url: string; desc: string }[];
  related: string[];
}

const TOPICS: Topic[] = [
  {
    id: "reproductive",
    kind: "Regulatory",
    tone: "accent",
    status: "Final rule · compliance Dec 2024–25",
    title: "The reproductive-health privacy rule",
    dek: "OCR moved to cut the pipeline that was quietly turning medical records into criminal evidence.",
    lead: "In 2024 the Office for Civil Rights finalized an amendment to the HIPAA Privacy Rule with a narrow but consequential aim: stop covered entities from handing protected health information to investigators pursuing lawful reproductive care.",
    whatItIs:
      "Under 45 CFR § 164.502(a)(5)(iii), a covered entity may not use or disclose PHI to investigate or prosecute any person for seeking, obtaining, providing, or facilitating lawful reproductive health care — and must obtain a signed attestation before releasing records that might be requested for those purposes.",
    aiAngle:
      "The rule exists because the pipeline is now automated. Investigators increasingly lean on predictive analytics and geofencing over digital tracker and location data. By blocking disclosure at the covered-entity boundary, the rule severs the chain before that data can be assembled into a case.",
    blindspot:
      "Administrators who don't push the change downstream into Business Associate Agreements — and who lack a written procedure to filter subpoenas — risk an accidental, non-compliant disclosure the very first time a request arrives.",
    practice:
      "Update BAAs to reflect the new prohibition, add an attestation checkpoint to any records request, and train intake staff to route reproductive-care subpoenas straight to counsel.",
    citations: ["45 CFR § 164.502(a)(5)(iii)", "45 CFR § 164.512", "89 FR — HHS Privacy Rule Modification"],
    sources: [
      {
        label: "HHS OCR Final Rule Bulletin",
        url: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/reproductive-health-care-privacy/index.html",
        desc: "Official HHS Department rule portal.",
      },
    ],
    related: ["ambient", "pixels"],
  },
  {
    id: "ambient",
    kind: "Technology",
    tone: "neutral",
    status: "Rapid adoption · 2024–2026",
    title: "Ambient AI scribes are the new ePHI perimeter",
    dek: "The tool that ends physician note-taking also opens the widest new door for protected data in a decade.",
    lead: "Ambient clinical AI listens to the doctor-patient conversation in real time and uses large language models to write structured notes and diagnostic codes straight into the EHR. It measurably reduces burnout — and it quietly relocates the boundary of where ePHI lives.",
    whatItIs:
      "Because voice prints are biometric identifiers, both the raw audio and the transcript are ePHI the moment they are captured. Parsing them requires rigorous encryption, explicit patient notice, and an airtight Business Associate Agreement with the AI vendor before a single visit is recorded.",
    aiAngle:
      "The exposure is rarely the sanctioned enterprise tool — it's shadow AI. A clinician using a consumer-grade transcription app or browser extension is handing raw recordings to a platform that stores and trains on them, with no BAA and no data isolation.",
    blindspot:
      "Staff adopt convenient consumer apps faster than IT can inventory them. Without an approved-tool list and active monitoring, the first audit finds transcripts sitting on a vendor's training servers.",
    practice:
      "Verify the tool is HIPAA-compliant, guarantees storage and transit encryption, and has a signed BAA before it ingests any patient interaction. Publish an approved-tool list and enforce it.",
    citations: ["45 CFR § 164.312(a)(2)(iv) — Encryption", "45 CFR § 164.502(b) — Minimum Necessary"],
    sources: [
      {
        label: "ONC HTI-1 Algorithm Transparency Guidance",
        url: "https://www.healthit.gov/topic/laws-regulations-and-policy/health-it-certification-program-0/hti-1-final-rule",
        desc: "ONC transparency rules for predictive algorithms in certified health IT.",
      },
    ],
    related: ["reproductive", "blocking"],
  },
  {
    id: "blocking",
    kind: "Ethical / Legal",
    tone: "signal",
    status: "Active enforcement · audit expansion",
    title: "Information blocking & the consumer-app void",
    dek: "The law that guarantees patients their records also strips those records of HIPAA's protection the instant they leave.",
    lead: "The 21st Century Cures Act requires health systems to give patients fast, open access to their records through secure FHIR APIs, without 'information blocking'. It succeeded — and in succeeding, it created a legal boundary problem no one fully controls.",
    whatItIs:
      "FHIR-powered APIs let patient-facing apps request an entire clinical record instantly. But once a patient authorizes a non-covered commercial app to pull that data, the record is no longer protected by HIPAA — the app's developer can lawfully resell it to ad networks.",
    aiAngle:
      "AI health managers and diagnostic aggregators are the apps doing the pulling, and their business model often depends on the very data flows HIPAA would have blocked. The responsibility for safety shifts from a regulated hospital to an individual's tap on 'Allow'.",
    blindspot:
      "Practitioners field the confusion but can't fix it: patients assume 'my hospital shared it, so it's still protected'. Failing to explain the handoff clearly erodes trust and invites complaints.",
    practice:
      "Honor access requests promptly, but pair the FHIR handoff with plain-language notice that HIPAA protection ends once data reaches a non-covered app. Document that the notice was given.",
    citations: ["45 CFR Part 171 — Information Blocking", "45 CFR Part 170 — Health IT Certification"],
    sources: [
      {
        label: "HHS ONC Information Blocking Portal",
        url: "https://www.healthit.gov/topic/information-blocking",
        desc: "ONC reference on exceptions and API standards.",
      },
    ],
    related: ["pixels", "ambient"],
  },
  {
    id: "pixels",
    kind: "Ethical / Legal",
    tone: "signal",
    status: "Ongoing litigation · OCR bulletins",
    title: "Web analytics, ad targeting & the pixel trap",
    dek: "A single line of tracking script on a booking page can be a reportable breach — and thousands of sites still run one.",
    lead: "Following the December 2022 OCR bulletin and the litigation that came after it, regulators have held firm: third-party trackers that capture identifiers on patient-facing pages can transmit protected health information to ad companies without authorization.",
    whatItIs:
      "Pixels from Google, Meta, or Hotjar embedded on booking widgets, intake portals, or symptom pages silently transmit IP addresses, device IDs, and interaction detail back to consumer ad platforms — with no BAA in place. OCR's position is that this constitutes a disclosure of PHI.",
    aiAngle:
      "Marketing AI and customer-data platforms optimize medical advertising against exactly these signals — booking a consultation, reading a symptom page — which is precisely what makes the captured data valuable, and precisely what makes the transmission a violation.",
    blindspot:
      "Marketing teams add analytics scripts without a compliance review, assuming an IP address is anonymous. It isn't, on a health page — and the audit trail leads straight back to the covered entity.",
    practice:
      "Inventory every third-party script on patient-facing pages, remove or BAA-cover any that transmit identifiers, and put marketing-tag changes behind a compliance gate.",
    citations: ["45 CFR § 164.502(a)", "45 CFR § 164.508 — Patient Authorization"],
    sources: [
      {
        label: "OCR Online Tracking Technologies Bulletin",
        url: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/tracking-technologies/index.html",
        desc: "OCR guidance restricting ad-network tracking pixels.",
      },
    ],
    related: ["blocking", "reproductive"],
  },
];

function toneColor(tone: Tone) {
  if (tone === "signal") return "var(--signal)";
  if (tone === "neutral") return "var(--track-neutral)";
  return "var(--accent)";
}

function readTime(t: Topic) {
  const words = [t.lead, t.whatItIs, t.aiAngle, t.blindspot, t.practice].join(" ").split(/\s+/).length;
  return Math.max(2, Math.round(words / 160));
}

export default function LatestDevelopments({ onNavigate }: Props) {
  const [activeId, setActiveId] = useState("reproductive");
  const [q, setQ] = useState("");

  const select = (id: string) => {
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const active = useMemo(() => TOPICS.find((t) => t.id === activeId) || TOPICS[0], [activeId]);
  const relatedTopics = active.related.map((id) => TOPICS.find((t) => t.id === id)).filter(Boolean) as Topic[];

  const query = q.trim().toLowerCase();
  const contents = useMemo(() => {
    if (!query) return TOPICS;
    return TOPICS.filter((t) => [t.kind, t.title, t.dek, t.whatItIs, t.aiAngle, t.blindspot].some((f) => f.toLowerCase().includes(query)));
  }, [query]);

  return (
    <div>
      <TopNav active="intelligence" onNavigate={onNavigate} maxWidth={1240} />

      {/* Section head */}
      <div className="mx-auto" style={{ maxWidth: 1240, padding: "44px 32px 0" }}>
        <div className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-faint)", letterSpacing: "0.06em" }}>
          <button onClick={() => onNavigate("dashboard")} className="bg-transparent border-none p-0 cursor-pointer" style={{ color: "var(--ink-faint)" }}>
            Overview
          </button>
          &nbsp;/&nbsp;<span style={{ color: "var(--ink)" }}>Intelligence</span>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-8" style={{ marginTop: 14, borderBottom: "1px solid var(--line)", paddingBottom: 26 }}>
          <div style={{ maxWidth: 640 }}>
            <h1 style={{ margin: 0, fontSize: "clamp(30px,3.8vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.0 }}>
              2026 Compliance Intelligence
            </h1>
            <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.55, color: "var(--ink-muted)" }}>
              The live edge of HIPAA — where new rules, new technology, and old blindspots meet. Four briefings, updated each quarter.
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
              placeholder="Filter briefings…"
              className="bg-transparent border-none outline-none"
              style={{ fontSize: 14, color: "var(--ink)", padding: "9px 0", width: 180 }}
            />
          </div>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="mx-auto grid items-start" style={{ maxWidth: 1240, padding: "36px 32px 96px", gridTemplateColumns: "250px minmax(0,1fr) 220px", gap: 48 }}>
        {/* LEFT: issue contents */}
        <aside style={{ position: "sticky", top: 88 }}>
          <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 10 }}>
            Issue contents
          </div>
          {contents.map((t) => {
            const isActive = t.id === active.id;
            return (
              <button
                key={t.id}
                onClick={() => select(t.id)}
                className="block w-full text-left cursor-pointer"
                style={{
                  border: "none",
                  background: isActive ? "rgba(14,138,110,0.06)" : "transparent",
                  padding: "14px 14px 14px 15px",
                  borderLeft: `2px solid ${isActive ? "var(--accent)" : "rgba(20,19,15,0.09)"}`,
                  marginBottom: 4,
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ width: 7, height: 7, borderRadius: 2, background: toneColor(t.tone) }}></span>
                  <span className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                    {t.kind}
                  </span>
                </div>
                <div style={{ marginTop: 6, fontSize: 14, fontWeight: 600, lineHeight: 1.25, color: isActive ? "var(--ink)" : "var(--ink-muted)" }}>{t.title}</div>
              </button>
            );
          })}
          {contents.length === 0 && (
            <p className="font-mono" style={{ fontSize: 12, color: "var(--ink-faint)", padding: "8px 2px" }}>
              No briefing matches "{q}".
            </p>
          )}
        </aside>

        {/* CENTER: article */}
        <article style={{ maxWidth: 680 }}>
          <div className="flex items-center gap-2.5 font-mono" style={{ fontSize: 11.5, letterSpacing: "0.04em" }}>
            <span className="inline-flex items-center gap-1.5" style={{ color: toneColor(active.tone), fontWeight: 600, textTransform: "uppercase" }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: toneColor(active.tone) }}></span>
              {active.kind}
            </span>
            <span style={{ color: "rgba(20,19,15,0.2)" }}>·</span>
            <span style={{ color: "var(--ink-faint)" }}>{active.status}</span>
          </div>

          <h2 style={{ margin: "16px 0 0", fontSize: "clamp(30px,3.6vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.04 }}>{active.title}</h2>
          <p style={{ margin: "16px 0 0", fontFamily: "var(--font-serif)", fontSize: 21, lineHeight: 1.5, color: "#3A382F", fontStyle: "italic" }}>{active.dek}</p>

          <div
            className="flex items-center gap-4 font-mono"
            style={{ marginTop: 20, paddingBottom: 26, borderBottom: "1px solid var(--line)", fontSize: 11.5, color: "var(--ink-faint)" }}
          >
            <span>{readTime(active)} min read</span>
            <span style={{ color: "rgba(20,19,15,0.2)" }}>·</span>
            <span>{active.citations.length} CFR references</span>
            <span style={{ color: "rgba(20,19,15,0.2)" }}>·</span>
            <span>Updated Q3 2024</span>
          </div>

          <div id="situation" style={{ scrollMarginTop: 90, paddingTop: 30 }}>
            <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.72, color: "var(--ink)" }}>{active.lead}</p>
            <p style={{ margin: "20px 0 0", fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.72, color: "var(--reading-ink)" }}>{active.whatItIs}</p>
          </div>

          <div id="ai" style={{ scrollMarginTop: 90, paddingTop: 38 }}>
            <h3 className="flex items-center gap-2.5" style={{ margin: 0, fontSize: 14, fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--ink)" }}>
              <span style={{ width: 22, height: 2, background: "var(--accent)" }}></span>
              How AI changes the exposure
            </h3>
            <p style={{ margin: "16px 0 0", fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.72, color: "var(--reading-ink)" }}>{active.aiAngle}</p>
          </div>

          {/* Blindspot — the one signal moment */}
          <div id="blindspot" style={{ scrollMarginTop: 90, marginTop: 38, borderLeft: "3px solid var(--signal)", background: "rgba(176,85,47,0.04)", borderRadius: "0 12px 12px 0", padding: "22px 24px" }}>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--signal)" }}>
              The administrator's blindspot
            </div>
            <p style={{ margin: "12px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "var(--reading-ink)", fontWeight: 450 }}>{active.blindspot}</p>
          </div>

          {/* In practice */}
          <div style={{ marginTop: 22, borderLeft: "3px solid var(--accent)", background: "rgba(14,138,110,0.045)", borderRadius: "0 12px 12px 0", padding: "22px 24px" }}>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-ink)" }}>
              In practice
            </div>
            <p style={{ margin: "12px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "var(--reading-ink)" }}>{active.practice}</p>
          </div>

          {/* References */}
          <details id="refs" style={{ scrollMarginTop: 90, marginTop: 38, borderTop: "1px solid var(--line)", paddingTop: 22 }}>
            <summary className="flex items-center justify-between gap-3">
              <span style={{ fontSize: 14, fontWeight: 700 }}>Statutory references &amp; official sources</span>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                {active.citations.length} citations · tap to open
              </span>
            </summary>
            <div style={{ marginTop: 18 }}>
              <div className="font-mono" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 10 }}>
                CFR codifications
              </div>
              <div className="flex flex-wrap gap-2">
                {active.citations.map((cit) => (
                  <span key={cit} className="font-mono" style={{ fontSize: 12, color: "var(--ink)", background: "var(--surface)", border: "1px solid var(--line)", padding: "6px 11px", borderRadius: 7 }}>
                    {cit}
                  </span>
                ))}
              </div>
              <div className="font-mono" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "20px 0 10px" }}>
                Verified HHS sources
              </div>
              {active.sources.map((src) => (
                <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 items-start no-underline" style={{ padding: "10px 0" }}>
                  <span style={{ color: "var(--accent-ink)", fontSize: 14, marginTop: 1 }}>↗</span>
                  <span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--accent-ink)" }}>{src.label}</span>
                    <span style={{ display: "block", fontSize: 12.5, color: "var(--ink-faint)", marginTop: 2 }}>{src.desc}</span>
                  </span>
                </a>
              ))}
            </div>
          </details>

          {/* Continue reading */}
          <div style={{ marginTop: 44, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 14 }}>
              Continue reading
            </div>
            {relatedTopics.map((r) => (
              <button
                key={r.id}
                onClick={() => select(r.id)}
                className="flex w-full items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-none"
                style={{ padding: "16px 6px 16px 0", borderBottom: "1px solid var(--line-soft)" }}
              >
                <span>
                  <span className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: toneColor(r.tone) }}>
                    {r.kind}
                  </span>
                  <span style={{ display: "block", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>{r.title}</span>
                </span>
                <span style={{ color: "var(--ink-faint)", fontSize: 18 }}>→</span>
              </button>
            ))}
          </div>
        </article>

        {/* RIGHT: on this page + next */}
        <aside className="flex flex-col gap-6.5" style={{ position: "sticky", top: 88 }}>
          <div>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 12 }}>
              On this page
            </div>
            <nav className="flex flex-col gap-0.5" style={{ borderLeft: "1px solid var(--line)" }}>
              <a href="#situation" style={{ fontSize: 13, color: "var(--ink-muted)", padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid transparent" }}>
                The situation
              </a>
              <a href="#ai" style={{ fontSize: 13, color: "var(--ink-muted)", padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid transparent" }}>
                How AI changes it
              </a>
              <a href="#blindspot" style={{ fontSize: 13, color: "var(--signal)", fontWeight: 600, padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid var(--signal)" }}>
                The blindspot
              </a>
              <a href="#refs" style={{ fontSize: 13, color: "var(--ink-muted)", padding: "6px 0 6px 14px", marginLeft: -1, borderLeft: "2px solid transparent" }}>
                References
              </a>
            </nav>
          </div>

          <button
            onClick={() => onNavigate("breaches")}
            className="block cursor-pointer w-full text-left bg-transparent border-none"
            style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: 12, padding: 18 }}
          >
            <div className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
              Next in issue →
            </div>
            <div style={{ marginTop: 8, fontSize: 15, fontWeight: 600, lineHeight: 1.25 }}>Breaches &amp; Outages, Deep-Dive</div>
            <p style={{ margin: "7px 0 0", fontSize: 12.5, lineHeight: 1.45, color: "#C9C5B8" }}>Mass General, Anthem, Change Healthcare — what went wrong.</p>
          </button>
        </aside>
      </div>
    </div>
  );
}
