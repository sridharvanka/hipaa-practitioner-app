export interface SourceCitation {
  label: string;
  url: string;
  description: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  date: string;
  regulationDetail: string;
  regulationCitations: string[]; // Specific Code of Federal Regulations clauses (e.g., 45 CFR § 164.308)
  techEvolution: string;
  techKeywords: string[];
  risksAndBlindspots: string;
  riskKeywords: string[];
  sources: SourceCitation[];
}

export interface CaseStudy {
  id: string;
  year: number;
  entity: string;
  type: "Ransomware" | "Outage" | "Data Theft" | "Tracking Pixel Disclosure" | "Physical Theft";
  recordsAffected: string;
  financialImpact: string;
  summary: string;
  rootCause: string;
  regulatoryAction: string;
  lessonsLearned: string;
  sources: SourceCitation[];
}

export interface AssessmentItem {
  id: string;
  category: "Administrative" | "Physical" | "Technical" | "Organizational" | "BreachNotification";
  safeguard: string;
  citation: string;
  question: string;
  remediation: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
