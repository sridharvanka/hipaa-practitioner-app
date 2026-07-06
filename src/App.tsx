import { useState } from "react";
import GridTexture from "./components/GridTexture";
import { PageKey } from "./components/TopNav";
import DashboardHub from "./components/DashboardHub";
import TimelineVisualizer from "./components/TimelineVisualizer";
import LatestDevelopments from "./components/LatestDevelopments";
import BreachDeepDives from "./components/BreachDeepDives";
import AIComplianceAdvisor from "./components/AIComplianceAdvisor";

export default function App() {
  const [page, setPage] = useState<PageKey>("dashboard");

  const navigate = (next: PageKey) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen font-sans" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <GridTexture />
      <div className="relative z-[1]">
        {page === "dashboard" && <DashboardHub onNavigate={navigate} />}
        {page === "timeline" && <TimelineVisualizer onNavigate={navigate} />}
        {page === "intelligence" && <LatestDevelopments onNavigate={navigate} />}
        {page === "breaches" && <BreachDeepDives onNavigate={navigate} />}
        {page === "advisor" && <AIComplianceAdvisor onNavigate={navigate} />}
      </div>
    </div>
  );
}
