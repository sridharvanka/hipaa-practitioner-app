import { TimelineEvent } from "../types";

export const timelineEvents: TimelineEvent[] = [
  {
    year: 1996,
    title: "HIPAA Enactment & Legislative Foundation",
    date: "August 21, 1996",
    regulationDetail: "President Bill Clinton signs the Health Insurance Portability and Accountability Act of 1996 into law (Pub. L. 104-191). The primary focus was ensuring health insurance portability for workers between jobs, reducing administrative waste, and initiating 'administrative simplification' to digitize healthcare billing transactions.",
    regulationCitations: ["Public Law 104-191", "45 CFR Part 162 (Standard Transactions)"],
    techEvolution: "Widespread reliance on paper medical records, local mainframes, and dial-up modems. Fax machines were the state-of-the-art method for sharing medical charts, prescriptions, and billing forms. Multi-tenant cloud servers and internet-connected electronic charts were non-existent.",
    techKeywords: ["Paper-based Records", "Physical Faxing", "Mainframe Batch Billing", "Dial-up Networking"],
    risksAndBlindspots: "Widespread risk of physical record theft or loss in fires; fax transmissions sent to incorrect numbers with no audit logs or delivery confirmations; physical lock-and-key was the sole safeguard; zero accountability or visibility into insider snooping.",
    riskKeywords: ["Accidental Fax Disclosure", "Zero Digital Logs", "No Standard Encryption", "Physical Theft Risk"],
    sources: [
      {
        label: "HHS HIPAA History",
        url: "https://www.hhs.gov/hipaa/for-professionals/faq/505/what-is-the-history-of-the-administrative-simplification-provisions/index.html",
        description: "Official Department of Health and Human Services overview of early administrative simplification."
      },
      {
        label: "Public Law 104-191",
        url: "https://www.congress.gov/104/plaws/publ191/PLAW-104publ191.pdf",
        description: "Original text of the Health Insurance Portability and Accountability Act of 1996."
      }
    ]
  },
  {
    year: 2003,
    title: "HIPAA Privacy Rule Compliance Deadline",
    date: "April 14, 2003",
    regulationDetail: "The HIPAA Privacy Rule goes into full effect, establishing national standards for protecting Protected Health Information (PHI) held by covered entities. It grants patients rights over their health data (including access, correction, and disclosure authorization) and introduces the core concept of the 'Minimum Necessary' disclosure standard.",
    regulationCitations: ["45 CFR Part 160", "45 CFR § 164.502 (General Standards)", "45 CFR § 164.512 (Authorized Uses/Disclosures)"],
    techEvolution: "Introduction of early Electronic Medical Record (EMR) digital databases. Basic client-server healthcare applications deployed within localized clinics, mostly using simple local local-area networks (LANs) and secure physical boundaries.",
    techKeywords: ["Early EMR Software", "Client-Server Databases", "Local Area Networks", "Structured Query Language (SQL)"],
    risksAndBlindspots: "Security measures were largely administrative rather than digital. Organizations operated with weak or shared desktop passwords, lacked multi-factor authentication (MFA), and regularly stored unencrypted local backups on floppy disks or magnetic tapes.",
    riskKeywords: ["Shared Accounts", "Unencrypted Backup Tapes", "Weak Password Policies", "No Offsite Security"],
    sources: [
      {
        label: "HHS Privacy Rule Summary",
        url: "https://www.hhs.gov/hipaa/for-professionals/privacy/laws-regulations/index.html",
        description: "Official summary of the HIPAA Privacy Rule published by the HHS Office for Civil Rights (OCR)."
      }
    ]
  },
  {
    year: 2005,
    title: "HIPAA Security Rule Compliance Deadline",
    date: "April 21, 2005",
    regulationDetail: "The Security Rule takes effect to establish operational, digital standards for safeguarding Electronic Protected Health Information (ePHI). It partitions digital compliance into three essential categories of safeguards: Administrative (policies, training, risk assessments), Physical (workstation security, facility access controls), and Technical (access controls, transmission security, encryption).",
    regulationCitations: ["45 CFR § 164.308 (Administrative)", "45 CFR § 164.310 (Physical)", "45 CFR § 164.312 (Technical)", "45 CFR § 164.308(a)(1)(ii)(A) (Risk Analysis Requirement)"],
    techEvolution: "Adoption of enterprise hardware firewalls, early Wi-Fi networks in clinics, basic SSL/TLS encryption for web transactions, and the birth of early web-based clinical portals.",
    techKeywords: ["Hardware Firewalls", "SSL/TLS v1.0", "Intrusion Detection (IDS)", "Encrypted VPN Tunnels"],
    risksAndBlindspots: "Severe lack of formal, recurring risk assessments (the single most cited security rule violation to this day). Organizations failed to encrypt laptops, USB flash drives, and external hard drives containing mass records of patient records.",
    riskKeywords: ["Unencrypted Laptops", "No Formal Security Assessment", "Insecure Wireless Access", "Stale User Permissions"],
    sources: [
      {
        label: "HHS Security Rule Guidance",
        url: "https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html",
        description: "Comprehensive Security Rule outline detailing required vs. addressable specifications."
      },
      {
        label: "NIST SP 800-66",
        url: "https://csrc.nist.gov/pubs/sp/800/66/r2/final",
        description: "NIST guidelines for implementing the HIPAA Security Rule in federal and healthcare organizations."
      }
    ]
  },
  {
    year: 2009,
    title: "HITECH Act & Breach Notification Rule",
    date: "February 17, 2009",
    regulationDetail: "Enacted as part of the American Recovery and Reinvestment Act (ARRA). HITECH introduced the Breach Notification Rule (requiring notification of HHS, affected individuals, and media for breaches affecting 500+ people), applied direct HIPAA liability to Business Associates (vendors), and drastically increased OCR's monetary penalty structure for tier-based civil violations.",
    regulationCitations: ["42 U.S.C. §§ 17921-17954", "45 CFR §§ 164.400-164.414 (Breach Notification)", "45 CFR § 160.404 (Civil Monetary Penalties)"],
    techEvolution: "Massive push toward cloud-hosted EHRs driven by federal 'Meaningful Use' monetary subsidies. Mobile devices (such as smartphones and early tablets) enter clinical workflows, expanding the digital perimeter of patient data.",
    techKeywords: ["EHR Meaningful Use", "Cloud Storage Infrastructure", "Mobile Health Apps", "Centralized SAN Backups"],
    risksAndBlindspots: "Software rushed to market to meet subsidy deadlines had severe, unreviewed application security vulnerabilities (e.g., SQL injections). Device encryption policies lagged behind mobile adoption, creating severe mobile endpoint risk.",
    riskKeywords: ["Software Vulnerabilities", "Insecure Mobile Endpoints", "Unvetted Tech Vendors", "Vendor BAA Neglect"],
    sources: [
      {
        label: "HITECH Act Overview",
        url: "https://www.hhs.gov/hipaa/for-professionals/special-topics/hitech-act-regulatory-information/index.html",
        description: "Regulatory history of the HITECH Act and updates to enforcement mechanisms."
      },
      {
        label: "OCR 'Wall of Shame' Portal",
        url: "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf",
        description: "Official public database of healthcare data breaches affecting 500 or more individuals."
      }
    ]
  },
  {
    year: 2013,
    title: "HIPAA Omnibus Final Rule",
    date: "September 23, 2013",
    regulationDetail: "The Omnibus Rule integrates HITECH requirements directly into HIPAA. It expands direct liability for subcontractors, defines Business Associates broadly, and replaces the subjective 'harm' breach threshold with a strict, objective assessment model of 'low probability of compromise'. It also outlaws the sale of PHI without patient authorization.",
    regulationCitations: ["78 FR 5565 (Omnibus Federal Register)", "45 CFR § 164.402 (Low Probability standard)", "45 CFR § 164.508(a)(4) (Sale of PHI restriction)"],
    techEvolution: "Broad adoption of cloud computing platforms (AWS, Azure, Google Cloud). Rise of HIPAA-compliant mobile messaging platforms, early API integrations between medical software, and advanced encryption (AES-256) at rest.",
    techKeywords: ["AES-256 Storage Encryption", "Dedicated Healthcare Cloud", "Secure APIs", "Mobile Device Management (MDM)"],
    risksAndBlindspots: "Healthcare staff using consumer cloud services (Dropbox, personal Google Drive) and public file shares to store clinical images/records without signed Business Associate Agreements (BAAs). Insecure API endpoints.",
    riskKeywords: ["Consumer Cloud Leakage", "Insecure API Connectors", "Shadow IT", "Subcontractor Oversight Failure"],
    sources: [
      {
        label: "HHS Omnibus Final Rule text",
        url: "https://www.federalregister.gov/documents/2013/01/25/2013-01073/modifications-to-the-hipaa-privacy-security-breach-notification-and-enforcement-rules-under-the",
        description: "Complete Omnibus Rule published in the Federal Register."
      }
    ]
  },
  {
    year: 2016,
    title: "OCR Guidance on Ransomware Attacks",
    date: "July 11, 2016",
    regulationDetail: "OCR releases a critical guidance memorandum stating that a ransomware attack is legally considered a presumptive HIPAA data breach. Under 45 CFR § 164.402, encryption of ePHI by a malicious actor is a 'disclosure' unless the covered entity can definitively prove there is a 'low probability that the PHI has been compromised' through a 4-factor risk assessment.",
    regulationCitations: ["45 CFR § 164.402", "45 CFR § 164.308(a)(7) (Contingency Plan)"],
    techEvolution: "Proliferation of endpoint security tools, offsite cold storage backups, network segmentation, and automated security information and event management (SIEM) systems.",
    techKeywords: ["Network Segmentation", "Immutable Backups", "SIEM Monitoring", "Endpoint Detection (EDR)"],
    risksAndBlindspots: "Widespread reliance on hot backups (backups constantly mapped to active network drives), allowing ransomware to encrypt the backup files alongside primary systems; weak employee awareness regarding phishing emails.",
    riskKeywords: ["Connected Backup Encryption", "Spear Phishing Vulnerabilities", "Patch Lag on Remote Gateways", "Slow Incident Isolation"],
    sources: [
      {
        label: "OCR Ransomware Guidance Document",
        url: "https://www.hhs.gov/sites/default/files/ransomware-fact-sheet-2016.pdf",
        description: "Official OCR Guidance PDF explaining ransomware as a presumptive HIPAA breach."
      }
    ]
  },
  {
    year: 2020,
    title: "COVID-19 Telehealth Enforcement Discretion",
    date: "March 17, 2020",
    regulationDetail: "In response to the global pandemic, OCR issues Notification of Enforcement Discretion for telehealth services. OCR announces it will not impose penalties for non-compliance with regulatory requirements of HIPAA Rules against covered healthcare providers in connection with the good-faith provision of telehealth during the COVID-19 nationwide public health emergency.",
    regulationCitations: ["85 FR 22024", "45 CFR § 164.502", "45 CFR § 164.308"],
    techEvolution: "Exponential surge in telehealth remote video consultations, remote patient monitoring devices, cloud-native clinical intake forms, and virtual workspaces.",
    techKeywords: ["Zoom/Teams Telehealth", "Remote Patient Monitoring", "Distributed Workspaces", "Virtual EHR Terminals"],
    risksAndBlindspots: "Providers using unsecure, public-facing applications (such as TikTok or Facebook Live) which are prohibited; family members overhearing remote consultations; and insecure home Wi-Fi networks and endpoints exposing EHR credentials.",
    riskKeywords: ["Public Telehealth Disclosures", "Unsecured Home Workspaces", "Phishing Wave targeting remote staff", "SaaS Configuration Drift"],
    sources: [
      {
        label: "HHS Telehealth Discretion Notification",
        url: "https://www.hhs.gov/hipaa/for-professionals/special-topics/emergency-preparedness/notification-enforcement-discretion-telehealth/index.html",
        description: "HHS announcement of regulatory leniency for remote communications during the pandemic."
      }
    ]
  },
  {
    year: 2022,
    title: "OCR Guidance on Online Tracking Technologies",
    date: "December 1, 2022",
    regulationDetail: "OCR issues a landmark bulletin clarifying that covered entities are prohibited from using tracking technologies (such as Meta Pixel, Google Analytics, or Hotjar) on their websites or portals in a manner that discloses ePHI to tracking vendors without a signed BAA or patient authorization. This includes tracking IP addresses, device IDs, or search queries on public websites prior to logging in.",
    regulationCitations: ["45 CFR § 164.502(a)", "45 CFR § 164.308(a)(1)(ii)(A) (Tracking Tech Scope)"],
    techEvolution: "Advanced analytics tools, browser tag managers, programmatic ad pixels, and Customer Data Platforms (CDPs) deeply integrated into medical marketing workflows.",
    techKeywords: ["Tracking Pixels (Meta/Google)", "Client-side Script Tag Managers", "Customer Data Platforms (CDP)", "Automated Server-Side GTM"],
    risksAndBlindspots: "Marketing teams operating independently of IT Security and Compliance, deploying client-side trackers onto patient appointment screens, login pages, or symptom checkers, unknowingly exposing medical records to ad networks.",
    riskKeywords: ["Marketing Pixels leaking PHI", "Ad Networks Tracking Patients", "Missing Vendor BAAs", "Browser Fingerprinting Leakage"],
    sources: [
      {
        label: "OCR Online Tracking Technologies Bulletin",
        url: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/tracking-technologies/index.html",
        description: "Official bulletin detailing HIPAA compliance guidelines regarding web tracking codes."
      }
    ]
  },
  {
    year: 2024,
    title: "HHS Cybersecurity Performance Goals (CPGs) & Supply Chain Focus",
    date: "January 24, 2024",
    regulationDetail: "HHS releases voluntary Healthcare and Public Health Sector Cybersecurity Performance Goals (CPGs) to guide hospitals and providers in securing their infrastructure. This comes amid intense regulatory scrutiny regarding healthcare sector supply-chain vulnerabilities, third-party risk management (TPRM), and active plans to integrate CPGs into future regulatory enforcement.",
    regulationCitations: ["45 CFR § 164.308(a)(8) (Evaluation)", "45 CFR § 164.314 (Business Associate Contracts)"],
    techEvolution: "Deep consolidation of medical IT systems, centralized financial clearinghouses, automated claims clearing systems, AI-powered predictive diagnostics, and multi-cloud medical API ecosystems.",
    techKeywords: ["Centralized Clearinghouse APIs", "Extended Third-Party Monitoring", "Voluntary Cybersecurity Performance Goals (CPGs)", "SaaS Supplier Portals"],
    risksAndBlindspots: "Massive system monoculture and extreme reliance on a few single-point-of-failure providers for claim billing, insurance authorizations, and pharmaceutical claims; total lack of offline business continuity plans for financial clearing systems.",
    riskKeywords: ["Single-Point-Of-Failure Vendors", "Cleared Claims Shutdown", "No Offline Billing Backups", "Inadequate Supplier Auditing"],
    sources: [
      {
        label: "HHS Cybersecurity Performance Goals Portal",
        url: "https://www.hhs.gov/cybersecurity/performance-goals/index.html",
        description: "HHS portal presenting voluntary and upcoming compulsory healthcare security benchmarks."
      }
    ]
  }
];
