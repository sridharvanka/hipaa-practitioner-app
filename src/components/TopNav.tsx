export type PageKey = "dashboard" | "timeline" | "intelligence" | "breaches" | "advisor";

interface TopNavProps {
  active: PageKey;
  onNavigate: (page: PageKey) => void;
  maxWidth?: number;
}

const LINKS: { key: PageKey; label: string }[] = [
  { key: "dashboard", label: "Overview" },
  { key: "timeline", label: "Timeline" },
  { key: "intelligence", label: "Intelligence" },
  { key: "breaches", label: "Breaches" },
  { key: "advisor", label: "Advisor" },
];

export default function TopNav({ active, onNavigate, maxWidth = 1180 }: TopNavProps) {
  return (
    <header
      className="sticky top-0 z-20 border-b"
      style={{
        borderColor: "var(--line-soft)",
        background: "rgba(244,241,232,0.82)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between gap-6 px-8"
        style={{ maxWidth, paddingTop: 15, paddingBottom: 15 }}
      >
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-baseline gap-3 cursor-pointer bg-transparent border-none p-0"
        >
          <span className="font-extrabold text-[15px] tracking-[0.06em]" style={{ color: "var(--ink)" }}>
            HIPAA<span style={{ color: "var(--accent)" }}>·</span>WATCH
          </span>
          <span className="font-mono text-[11px] tracking-[0.04em]" style={{ color: "var(--ink-faint)" }}>
            Compliance &amp; Technology
          </span>
        </button>
        <nav className="flex items-center gap-[26px]">
          {LINKS.map((link) => {
            const isActive = link.key === active;
            const isAdvisor = link.key === "advisor";
            const underlineColor = active === "breaches" && isActive ? "var(--signal)" : "var(--accent)";
            return (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className="bg-transparent border-none cursor-pointer p-0 text-[14px]"
                style={{
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--ink)" : isAdvisor ? "var(--accent-ink)" : "var(--ink-muted)",
                  borderBottom: isActive ? `2px solid ${underlineColor}` : "2px solid transparent",
                  paddingBottom: 2,
                }}
              >
                {isAdvisor ? (isActive ? "Advisor" : "Advisor →") : link.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
