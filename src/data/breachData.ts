import { CaseStudy } from "../types";

export const breachCaseStudies: CaseStudy[] = [
  {
    id: "change-healthcare-2024",
    year: 2024,
    entity: "Change Healthcare (A Subsidiary of UnitedHealth Group)",
    type: "Ransomware",
    recordsAffected: "Estimated 1 in 3 Americans (Over 110 Million Individuals)",
    financialImpact: "Exceeded $2 Billion (including $800M+ in provider assistance loans and a $22M ransomware payment)",
    summary: "In February 2024, the ALPHV/BlackCat ransomware group attacked Change Healthcare, the nation's largest healthcare billing and payment clearinghouse. The attack completely halted prescription billing, claim transmissions, and clinical authorization workflows across thousands of pharmacies and hospitals nationwide for weeks.",
    rootCause: "A remote access administrative server (Citrix portal) lacked Multi-Factor Authentication (MFA), allowing hackers to log in with compromised credentials and move laterally throughout the corporate network.",
    regulatoryAction: "HHS OCR immediately opened an investigation in March 2024 focusing on whether Change Healthcare complied with the HIPAA Security Rule (specifically concerning risk assessments and access controls). Congressional hearings were convened.",
    lessonsLearned: "Systems monoculture poses an existential supply chain threat. Organizations must maintain isolated offline contingency billing files, secure all administrative entryways with MFA, and perform rigorous continuous auditing of third-party clearinghouses.",
    sources: [
      {
        label: "HHS OCR Change Healthcare Statement",
        url: "https://www.hhs.gov/about/news/2024/03/13/hhs-office-for-civil-rights-opens-investigation-change-healthcare-cyberattack.html",
        description: "Official OCR bulletin announcing investigation into compliance rules surrounding the incident."
      },
      {
        label: "UHG Congressional Testimony Details",
        url: "https://www.finance.senate.gov/hearings/hacking-america-health-care-assessments-on-the-change-healthcare-cyber-attack-and-impacts",
        description: "Congressional testimony detailing the compromised Citrix server and lacks of MFA."
      }
    ]
  },
  {
    id: "novant-health-2022",
    year: 2022,
    entity: "Novant Health System",
    type: "Tracking Pixel Disclosure",
    recordsAffected: "1.3 Million Individuals",
    financialImpact: "Multi-million dollar class-action settlements (pending) and substantial brand reputation damages",
    summary: "Novant Health accidentally transmitted patient ePHI to Meta (Facebook) via the Meta Pixel tracking code. The pixel was embedded on the public website and patient portal to track marketing campaigns, but it captured confidential patient details, including email addresses, IPs, appointment selections, and physician names.",
    rootCause: "Implementation of marketing tracking pixels on patient portals, login portals, and self-scheduling tools without active vetting by IT Security, Legal, or Compliance officers. Lack of a BAA with Meta.",
    regulatoryAction: "HHS OCR investigation and immediate notification to affected patients, prompting a widespread industry alert on tracking technology compliance.",
    lessonsLearned: "Marketing teams must not bypass Security. All tracking scripts, pixels, or tag managers must be sandboxed, reviewed, and audited to prevent transmitting client-side parameters to ad networks. Meta, Google, and others will not sign HIPAA BAAs for standard analytics accounts.",
    sources: [
      {
        label: "Novant Health Disclosure Notice",
        url: "https://www.novanthealth.org/home/about-us/newsroom/press-releases/novant-health-notifies-patients-of-data-privacy-incident",
        description: "Novant's official press release explaining the tracking pixel misconfiguration."
      }
    ]
  },
  {
    id: "hollywood-presbyterian-2016",
    year: 2016,
    entity: "Hollywood Presbyterian Medical Center",
    type: "Ransomware",
    recordsAffected: "Local clinical systems locked for 10 days",
    financialImpact: "40 Bitcoins ($17,000 paid at the time), plus millions in diverted ambulance costs and operational losses",
    summary: "Hollywood Presbyterian Medical Center in Los Angeles was infected with Locky ransomware, locking staff out of EHR systems, laboratory software, and CT scanners. Staff reverted to paper charting and faxing, and emergency patients had to be diverted to other hospitals.",
    rootCause: "Compromised remote access credentials and unpatched server operating system vulnerabilities that allowed malware to execute and propagate across the hospital's intranet.",
    regulatoryAction: "Spurred the historic July 2016 OCR Ransomware Guidance, setting the industry precedent that a ransomware event is legally presumed to be an unauthorized disclosure of PHI.",
    lessonsLearned: "Isolate and segment clinical equipment networks from standard office email networks. Test offline emergency charting protocols annually. Implement active endpoint detection and isolation tools.",
    sources: [
      {
        label: "HPMC Ransomware Resolution",
        url: "https://www.hipaajournal.com/hollywood-presbyterian-medical-center-pays-ransom-8321/",
        description: "Summary report of the payment and recovery process of HPMC."
      }
    ]
  },
  {
    id: "anthem-inc-2015",
    year: 2015,
    entity: "Anthem, Inc. (now Elevance Health)",
    type: "Data Theft",
    recordsAffected: "78.8 Million Individuals",
    financialImpact: "$16 Million HHS OCR Fine (largest in history at the time), $115 Million class-action settlement, and over $100M in remediation costs",
    summary: "Hackers launched a highly targeted spear-phishing campaign that tricked an Anthem administrator into executing malware. This compromise granted attackers advanced administrative credentials to run database queries against Anthem’s central warehouse, bulk-exporting names, Social Security numbers, dates of birth, and clinical IDs.",
    rootCause: "Successful spear-phishing attack against high-privilege administrators combined with a lack of multi-factor authentication (MFA) on deep data warehouses and failure to encrypt databases at rest or monitor bulk queries.",
    regulatoryAction: "In 2018, OCR announced a record-breaking $16 million civil monetary settlement. Anthem also agreed to a corrective action plan to overhaul their security infrastructure.",
    lessonsLearned: "Enforce strict Multi-Factor Authentication on all administrative databases, apply rate-limiting and query monitoring on high-volume exports, and run continuous mock-phishing campaigns to train administrative personnel.",
    sources: [
      {
        label: "HHS OCR Anthem Settlement Announcement",
        url: "https://www.hhs.gov/about/news/2018/10/15/anthem-pays-ocr-record-16-million-settlement-in-historic-medical-data-breach.html",
        description: "Official OCR statement on the $16 million settlement and security rule findings."
      }
    ]
  },
  {
    id: "bcbst-2009",
    year: 2009,
    entity: "BlueCross BlueShield of Tennessee (BCBST)",
    type: "Physical Theft",
    recordsAffected: "1.02 Million Individuals",
    financialImpact: "$1.5 Million HHS OCR Fine, and over $17 Million in investigation, physical secure room construction, and credit monitoring costs",
    summary: "Fifty-seven unencrypted backup hard drives containing audio recordings of customer service calls and associated patient identifiers were physically stolen from a closet in a former call center location that was undergoing renovation.",
    rootCause: "Failure to encrypt backup drives at rest and poor physical inventory/security controls during office renovation and transition. The closet had generic physical locks and was unmonitored.",
    regulatoryAction: "This was the first major multi-million dollar OCR settlement under the HITECH Act enforcement guidelines (issued in 2012).",
    lessonsLearned: "All backup media, hard drives, and portable storage containing ePHI must be fully encrypted at rest (§ 164.312(a)(2)(iv)). Physical security controls must be maintained strictly during transitions, renovations, and office moves.",
    sources: [
      {
        label: "HHS OCR BCBST Settlement",
        url: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/bcbst/index.html",
        description: "Original Resolution Agreement and Corrective Action Plan issued to BCBST by OCR."
      }
    ]
  }
];
