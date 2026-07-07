import { useState } from "react";
import TopNav, { PageKey } from "./TopNav";

interface Props {
  onNavigate: (page: PageKey) => void;
}

export default function OriginsLanding({ onNavigate }: Props) {
  const [activeTitleTab, setActiveTitleTab] = useState<number>(1);

  const titles = [
    {
      num: "Title I",
      name: "Health Insurance Portability",
      description: "Health Care Access, Portability, and Renewability",
      body: "Protects health insurance coverage for workers and their families when they change or lose their jobs. It limits the restrictions that a group health plan can place on benefits for preexisting conditions and prohibits discrimination against individuals based on their health status.",
      focus: "Job transitions & preexisting conditions",
      citations: ["Group Health Plan Mandates", "COBRA Extensions"]
    },
    {
      num: "Title II",
      name: "Administrative Simplification",
      description: "Preventing Health Care Fraud and Abuse; Standards for ePHI",
      body: "The core administrative foundation of HIPAA. It directs HHS to establish national standards for electronic healthcare transactions, national identifiers for providers, health plans, and employers, and strict guidelines to protect the privacy and security of health information (Privacy, Security, and Breach Notification Rules).",
      focus: "Privacy, Security, Transaction Codes, & Identifier Rules",
      citations: ["45 CFR Part 160", "45 CFR Part 162", "45 CFR Part 164"]
    },
    {
      num: "Title III",
      name: "Tax-Related Health Provisions",
      description: "Tax Incentives & Medical Savings Accounts",
      body: "Provides rules and guidelines for tax-deductible health insurance costs and medical savings. It standardized Medical Savings Accounts (MSAs)—the precursor to modern Health Savings Accounts (HSAs)—offering tax advantages for individuals under high-deductible plans.",
      focus: "Standardizing MSAs / HSAs & tax deductions",
      citations: ["Internal Revenue Code Modifications", "HSA Prefabs"]
    },
    {
      num: "Title IV",
      name: "Group Health Plan Requirements",
      description: "Application and Enforcement of Health Rules",
      body: "Specifies group health plan requirements and further clarifies portability guidelines. It outlines rules for health coverage conditions, protects individuals from losing insurance, and guarantees access to insurance plans for individuals with pre-existing conditions in group contexts.",
      focus: "Portability & pre-existing condition enforcement",
      citations: ["Mother & Newborn Protections", "Mental Health Parity (Early)"]
    },
    {
      num: "Title V",
      name: "Revenue Offsets",
      description: "Funding the Legislation & Expatriate Tax Rules",
      body: "Contains provisions designed to offset the revenue losses associated with the other titles of the act. It governs the tax treatment of people who lose their U.S. citizenship (expatriation tax rules) and sets guidelines on company-owned life insurance policies.",
      focus: "Expatriate tax rules & legislation offsets",
      citations: ["IRS Section 877", "Company-Owned Life Insurance (COLI)"]
    }
  ];

  return (
    <div>
      <TopNav active="origins" onNavigate={onNavigate} maxWidth={1180} />

      <main className="mx-auto" style={{ maxWidth: 1180, padding: "64px 32px 96px" }}>
        
        {/* Editorial Masthead */}
        <section style={{ maxWidth: 840, marginBottom: 70 }}>
          <div
            className="font-mono flex items-center gap-2.5"
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent-ink)" }}
          >
            <span>Historical Foundations</span>
            <span style={{ color: "rgba(20,19,15,0.2)" }}>/</span>
            <span style={{ color: "var(--ink-faint)" }}>August 21, 1996</span>
          </div>
          <h1 
            style={{ 
              margin: "18px 0 0", 
              fontSize: "clamp(42px, 6vw, 76px)", 
              fontWeight: 800, 
              lineHeight: 0.96, 
              letterSpacing: "-0.035em",
              color: "var(--ink)"
            }}
          >
            The Origins of HIPAA
          </h1>
          <p style={{ margin: "24px 0 0", fontSize: 20, lineHeight: 1.55, color: "var(--ink-muted)", fontWeight: 450, maxWidth: 740 }}>
            Before the internet-connected ledger, healthcare operated in a wild west of paper files, courier routes, and fragmented electronic codebases. Learn how a bipartisan compromise reshaped patient privacy and billing.
          </p>
        </section>

        {/* The 1996 Crisis: Split Section */}
        <section style={{ borderTop: "1px solid var(--line)", paddingTop: 48, marginBottom: 80 }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "start" }}>
            <div>
              <span className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                The Pre-HIPAA Landscape
              </span>
              <h2 style={{ margin: "10px 0 0", fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                The Analog Vulnerability &amp; The Administrative Crisis
              </h2>
              <p style={{ marginTop: 18, fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-muted)" }}>
                In 1996, the United States healthcare sector was drowning in administrative waste. Electronic billing was in its infancy, with thousands of independent insurance companies and hospitals using proprietary, custom text formats to transmit claims. This resulted in an enormous paper trail—couriers shipping folders across state lines, medical registries relying on microfiche, and billing departments typing out invoices by hand.
              </p>
              <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-muted)" }}>
                Worse, patients had virtually no legal ownership of their medical histories. A physician's chart was considered the property of the clinic, and patients could be denied access to their own records or see their medical conditions disclosed to employers without recourse.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div 
                style={{ 
                  background: "var(--surface)", 
                  border: "1px solid var(--line)", 
                  borderRadius: "var(--radius)", 
                  padding: 24,
                  boxShadow: "0 1px 2px rgba(20,19,15,0.03)"
                }}
              >
                <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--signal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  System Vulnerability #1
                </div>
                <h3 style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 700 }}>Accidental Fax Broadcasting</h3>
                <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--ink-muted)" }}>
                  Before digital portals, lab values and discharge notes were shared via office fax machines. Dialing a wrong digit meant records with full names and diagnoses were printed directly in retail stores, hotels, or corporate offices, leaving no electronic log or audit trail.
                </p>
              </div>

              <div 
                style={{ 
                  background: "var(--surface)", 
                  border: "1px solid var(--line)", 
                  borderRadius: "var(--radius)", 
                  padding: 24,
                  boxShadow: "0 1px 2px rgba(20,19,15,0.03)"
                }}
              >
                <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  System Vulnerability #2
                </div>
                <h3 style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 700 }}>Lock-and-Key Physical Security</h3>
                <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--ink-muted)" }}>
                  Clinics kept paper folders in rolling metal filing cabinets. A single physical key was the only lock preventing administrative staff, janitorial crews, or visitors from looking at medical files. There were no logs of who pulled a record or why.
                </p>
              </div>

              <div 
                style={{ 
                  background: "var(--surface)", 
                  border: "1px solid var(--line)", 
                  borderRadius: "var(--radius)", 
                  padding: 24,
                  boxShadow: "0 1px 2px rgba(20,19,15,0.03)"
                }}
              >
                <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--accent-ink)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  System Vulnerability #3
                </div>
                <h3 style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 700 }}>Job Lock (Pre-existing Exclusions)</h3>
                <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--ink-muted)" }}>
                  Workers with ongoing chronic conditions (such as diabetes or cancer) were afraid to change employers because the new corporate group health plan could exclude coverage for their "pre-existing conditions" indefinitely, locking them to a single job.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bipartisan Spark Section */}
        <section 
          className="grid" 
          style={{ 
            gridTemplateColumns: "1.1fr 1fr", 
            gap: 56, 
            background: "var(--inset)", 
            border: "1px solid var(--line-soft)", 
            borderRadius: 16, 
            padding: "48px 40px",
            marginBottom: 80
          }}
        >
          <div>
            <span className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-ink)" }}>
              The Legislative Spark
            </span>
            <h2 style={{ margin: "10px 0 0", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              The Kennedy-Kassebaum Compromise
            </h2>
            <p style={{ marginTop: 16, fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-muted)" }}>
              In the mid-1990s, Senator Edward Kennedy (a liberal Democrat from Massachusetts) and Senator Nancy Kassebaum (a moderate Republican from Kansas) realized they shared an interest in solving the health insurance "job lock" and cutting healthcare administrative overhead.
            </p>
            <p style={{ marginTop: 12, fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-muted)" }}>
              The resulting bill, signed into law by President Bill Clinton on August 21, 1996, created a dual mandate:
            </p>
            <ul style={{ marginTop: 12, paddingLeft: 20, color: "var(--ink-muted)", fontSize: 15, lineHeight: 1.6 }}>
              <li style={{ marginBottom: 6 }}><strong style={{ color: "var(--ink)" }}>Portability:</strong> Protecting individuals' insurance rights between job transitions.</li>
              <li style={{ marginBottom: 6 }}><strong style={{ color: "var(--ink)" }}>Accountability:</strong> Forcing health systems to adopt standard digital billing transaction codes, paving the way for the electronic records we use today.</li>
            </ul>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "1px solid var(--line)", paddingLeft: 48 }}>
            <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", textTransform: "uppercase" }}>
              Bipartisan Co-Sponsors
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>Nancy Landon Kassebaum</div>
              <div className="font-mono" style={{ fontSize: 12, color: "var(--ink-faint)" }}>Republican Senator, Kansas (1978–1997)</div>
              <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--ink-muted)", fontStyle: "italic" }}>
                "We must ensure that those who work and make a good faith effort can keep their healthcare coverage."
              </p>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>Edward Moore Kennedy</div>
              <div className="font-mono" style={{ fontSize: 12, color: "var(--ink-faint)" }}>Democratic Senator, Massachusetts (1962–2009)</div>
              <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--ink-muted)", fontStyle: "italic" }}>
                "Health insurance shouldn't be something you lose the minute you decide to seek a better career path."
              </p>
            </div>
          </div>
        </section>

        {/* The Five Pillars: Interactive Tabbed Section */}
        <section style={{ marginBottom: 80 }}>
          <div className="flex items-baseline justify-between" style={{ borderBottom: "1px solid var(--line)", paddingBottom: 12, marginBottom: 32 }}>
            <div>
              <span className="font-mono" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                Statutory Anatomy
              </span>
              <h2 style={{ margin: "4px 0 0", fontSize: 24, fontWeight: 800 }}>The Five Titles of HIPAA</h2>
            </div>
            <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
              Public Law 104-191
            </span>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "280px minmax(0, 1fr)", gap: 48, alignItems: "start" }}>
            {/* Tabs List */}
            <div className="flex flex-col gap-2">
              {titles.map((t, index) => {
                const isSelected = activeTitleTab === index + 1;
                return (
                  <button
                    key={t.num}
                    onClick={() => setActiveTitleTab(index + 1)}
                    className="block w-full text-left cursor-pointer transition-all"
                    style={{
                      border: "none",
                      background: isSelected ? "rgba(14,138,110,0.06)" : "transparent",
                      padding: "16px 18px",
                      borderLeft: `3px solid ${isSelected ? "var(--accent)" : "rgba(20,19,15,0.09)"}`,
                      borderRadius: "0 var(--radius) var(--radius) 0",
                    }}
                  >
                    <div className="font-mono" style={{ fontSize: 11, fontWeight: 600, color: isSelected ? "var(--accent-ink)" : "var(--ink-faint)" }}>
                      {t.num}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 14.5, fontWeight: 600, color: isSelected ? "var(--ink)" : "var(--ink-muted)", lineHeight: 1.25 }}>
                      {t.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tab Panel */}
            <div 
              style={{ 
                background: "var(--surface)", 
                border: "1px solid var(--line)", 
                borderRadius: 16, 
                padding: "36px 40px",
                boxShadow: "0 1px 2px rgba(20,19,15,0.04), 0 20px 48px -36px rgba(20,19,15,0.2)"
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono" style={{ fontSize: 12, color: "var(--accent-ink)", background: "rgba(14,138,110,0.06)", padding: "4px 8px", borderRadius: 4, fontWeight: 600 }}>
                  {titles[activeTitleTab - 1].num}
                </span>
                <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                  Focus: {titles[activeTitleTab - 1].focus}
                </span>
              </div>

              <h3 style={{ margin: "16px 0 0", fontSize: 24, fontWeight: 800, letterSpacing: "-0.015em" }}>
                {titles[activeTitleTab - 1].description}
              </h3>

              <p style={{ marginTop: 18, fontFamily: "var(--font-serif)", fontSize: 17.5, lineHeight: 1.68, color: "var(--ink)" }}>
                {titles[activeTitleTab - 1].body}
              </p>

              <div style={{ marginTop: 24, borderTop: "1px solid var(--line-soft)", paddingTop: 20 }}>
                <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginBottom: 8, textTransform: "uppercase" }}>
                  Key Citations &amp; Codifications
                </div>
                <div className="flex flex-wrap gap-2">
                  {titles[activeTitleTab - 1].citations.map((c) => (
                    <span key={c} className="tag">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transition / Call to Action */}
        <section 
          style={{ 
            background: "var(--ink)", 
            color: "var(--paper)", 
            borderRadius: 16, 
            padding: "48px 48px",
            textAlign: "center",
            boxShadow: "0 12px 36px -18px rgba(20,19,15,0.4)"
          }}
        >
          <div className="font-mono" style={{ fontSize: 11.5, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
            Interactive Deep-Dive
          </div>
          <h2 style={{ margin: "12px 0 0", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.025em" }}>
            Trace the 30-Year Evolution
          </h2>
          <p style={{ margin: "14px auto 0", fontSize: 15.5, lineHeight: 1.6, color: "#C9C5B8", maxWidth: "62ch" }}>
            Now that you understand the legislative foundations and pre-HIPAA crises, explore how rules adapted as records migrated from locked steel drawers to cloud networks and ambient AI listening devices.
          </p>
          <div style={{ marginTop: 28 }}>
            <button 
              onClick={() => onNavigate("timeline")}
              className="cursor-pointer font-sans"
              style={{
                border: "none",
                background: "var(--accent)",
                color: "var(--paper)",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 32px",
                borderRadius: "999px",
                transition: "opacity 0.2s"
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Launch Comparative Timeline →
            </button>
          </div>
        </section>

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
