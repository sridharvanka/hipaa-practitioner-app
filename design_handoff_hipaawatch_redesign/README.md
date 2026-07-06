# Handoff: HIPAA·WATCH — information-density redesign

## Overview
HIPAA·WATCH is an information-heavy reference app for healthcare practitioners — a
cross between a newsletter and a book, delivered interactively. It covers HIPAA's
regulatory history, current compliance "intelligence," major breach case studies, and an
AI regulatory advisor.

This handoff is a **redesign** of an existing app. The goal of the redesign was to make a
very noisy interface **calmer without losing any information**: establish a real reading
hierarchy, cut decorative chrome, reduce the color palette to one accent + one reserved
signal color, and make the content genuinely findable and navigable.

There are **5 screens**, all sharing one design system and cross-linked via a common top nav.

## About the Design Files
The files in this bundle are **design references created as self-contained HTML** — working
prototypes that show the intended look, typography, layout, and interaction. They are **not
production code to copy directly.**

> Each `.dc.html` file is a standalone HTML document. You can open it in a browser to see and
> click the real design. Ignore the custom `<x-dc>` / `<script data-dc-script>` wrapper and
> the `support.js` runtime — that is a prototyping harness, not part of the intended
> architecture. What matters is the rendered markup, the inline styles, and the behavior
> described below.

The task is to **recreate these designs in the target codebase's environment.** The original
app is **React + TypeScript + Vite + Tailwind** (see the `src/` tree in the original upload:
`App.tsx`, `components/`, `data/`), so the natural path is to rebuild these screens as React
components using Tailwind (or the codebase's established styling approach). All content data
(timeline eras, breach cases, developments) already exists in the original repo under
`src/data/*.ts` and `src/components/*.tsx` — reuse it; the redesign only changes presentation,
not facts.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interactions are all specified below
and present in the HTML. Recreate the UI faithfully. The one exception is the AI Advisor's
answer content, which is curated for four preset questions in the prototype — in production it
should call the real model backend (the original app POSTs to `/api/gemini/advisor`).

---

## Design System ("The Cream System")

This is the single source of truth for all five screens. It derives from the project's
existing `tokens.css` ("The Cream System"), adapted with one added signal color.

### Color tokens
| Token | Hex | Use |
|---|---|---|
| Paper (page bg) | `#F4F1E8` | app background |
| Surface | `#FFFFFF` | cards, inputs |
| Inset | `#FAF8F2` | subtle fills, hatched placeholders |
| Chip bg | `#F1EEE4` | kbd, quiet chips |
| Ink | `#14130F` | primary text, dark cards |
| Ink-muted | `#57544B` | body/secondary text |
| Ink-faint | `#8C887C` | metadata, captions |
| Reading ink | `#2B2A24` | serif reading body (secondary paras) |
| Line | `rgba(20,19,15,0.11)` | borders |
| Line-soft | `rgba(20,19,15,0.07)` | hairline dividers |
| **Accent** (green) | `#0E8A6E` | links, active states, "good/action" |
| Accent-ink | `#0A5C49` | link text (darker, for contrast) |
| **Signal** (clay) | `#B0552F` | risk/danger ONLY — used sparingly |
| Track-neutral | `#3A3A46` | "technology" category marker |

**Palette discipline is the whole point.** Do not reintroduce indigo/purple/emerald/amber
tints. Green = links & positive; clay = genuine risk; neutral dark = the "technology"
category. That's it. Category color is a findable filter, not decoration.

### Typography
Three families, three roles:
- **Archivo** (`400,500,600,700,800,900`) — all UI, headings, labels. `font-family:'Archivo','Helvetica Neue',Arial,sans-serif`
- **Newsreader** (serif, `opsz 6..72`, `400/500` + italics) — **long-form reading bodies only** (article prose, deks). This is what creates the "book" feel. `font-family:'Newsreader',Georgia,serif`
- **JetBrains Mono** (`400,500,600`) — metadata, eyebrows, CFR citations, years, kbd, breadcrumbs.

Load via Google Fonts:
`https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=JetBrains+Mono:wght@400;500;600&display=swap`

Type scale (observed in the designs):
- Display H1: `clamp(38px,5.4vw,64px)`, weight 800, line-height ~0.98, letter-spacing `-0.035em`
- Section H1: `clamp(30px,3.8vw,44px)`, weight 800, letter-spacing `-0.03em`
- Article H2: `clamp(28px,3.6vw,40px)`, weight 800, letter-spacing `-0.03em`
- Card/list H3: 18–22px, weight 700, letter-spacing `-0.015em`/`-0.02em`
- Reading body (serif): 19px / line-height 1.72 (primary), 18.5px/1.65 in advisor
- Callout body: 16.5px / line-height ~1.6
- UI body: 14–15px / line-height 1.55
- Eyebrow / mono label: 10–12px, weight 600, letter-spacing 0.1–0.16em, UPPERCASE, ink-faint
- Section subhead ("track" header): 13.5px, weight 700, uppercase, preceded by a 22×2px colored rule

### Spacing / shape
- Max content width: **1180–1240px**, centered, `padding: 0 32px`
- Reading column max-width: **680px** (720px in advisor)
- Border radius: cards **14px**, inputs/chips **6–12px**, pill/dark CTAs **10–14px**
- Card shadow: `0 1px 2px rgba(20,19,15,0.04), 0 16px 36px -30px rgba(20,19,15,0.3)`
- Card border: `1px solid rgba(20,19,15,0.11)`

### Background texture (optional, on by default)
Fixed grid overlay behind content, non-interactive:
```
background-image:
  linear-gradient(rgba(20,19,15,0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(20,19,15,0.04) 1px, transparent 1px);
background-size: 34px 34px;
mask-image: radial-gradient(120% 90% at 50% 0%, #000 50%, transparent 100%);
```

### Shared top nav (all screens)
Sticky, `top:0`, blurred paper background `rgba(244,241,232,0.82)`, `backdrop-filter: saturate(140%) blur(8px)`, bottom border line-soft. Left: wordmark `HIPAA·WATCH` (weight 800, letter-spacing 0.06em; the `·` is accent-colored) + mono tagline "Compliance & Technology". Right: nav links (Overview, Timeline, Intelligence, Breaches, Advisor →), 14px. The **active** link is ink, weight 600, with a 2px bottom border (accent green — except Breaches uses the clay signal). "Advisor →" is always accent-ink. Inactive links are ink-muted, weight 500.

Nav destinations (file names, spaces intact):
`Dashboard.dc.html` · `Timeline.dc.html` · `Latest Intelligence.dc.html` · `Breaches.dc.html` · `AI Advisor.dc.html`

### Tweakable props (each screen exposes these)
- `accent` (color, default `#0E8A6E`)
- `signal` (color, default `#B0552F`)
- `showTexture` (boolean, default true)
- Dashboard also: `density` (`comfortable` | `compact` — controls top padding: 64px vs 40px)

Implement these as theme props / CSS custom properties (`--accent`, `--signal`). In the HTML,
children reference `var(--accent,#0E8A6E)` so the default paints instantly.

---

## Screens / Views

### 1. Dashboard (`Dashboard.dc.html`) — the issue home
**Purpose:** orient the reader, offer search, and route into the four sections.

**Layout (top → bottom), max-width 1180px:**
1. **Masthead** (max-width 780px): mono eyebrow "Regulatory Intelligence / Issue · Q3 2024"; display H1 "The rules, the technology, and the gaps between them."; 18px lead paragraph.
2. **Persistent search** (max-width 560px): white rounded (12px) field with a search-circle SVG icon left, an input, and a mono `↵` kbd chip right. Filters the page content live.
3. **Active advisory** (max-width 640px): a quiet note with a **2px clay left border** (NOT a filled banner). Mono clay label "Active advisory" + one sentence about Change Healthcare / § 164.308(a)(7) + an accent-ink "HHS OCR portal ↗" link.
4. **Two-column grid** (`1.55fr 1fr`, gap 56px):
   - **Left — "In this issue"** header (H2 15px + mono "3 tracks"), then 3 numbered reading-list rows. Each row is a link (`grid-template-columns: auto 1fr auto`, gap 22px, vertical padding 26px, hairline bottom border): mono number (01/02/03) · a category dot (8×8, radius 2px, colored by category) + mono kind + mono meta · H3 title (22px) · 15px muted dek (max 52ch) · an accent "cta" text-link with 2px accent underline · a `→` chevron. Below the list: an **Advisor utility bar** — full-width dark (`#14130F`) card, radius 14px, with mono green "Ask the Regulatory Advisor" label, muted body, and `→`. Links to `AI Advisor.dc.html`.
   - **Right — side rail** (sticky, `top:88px`, gap 32px): a **Featured card** (white, radius 14px) with a diagonally-hatched placeholder header (`repeating-linear-gradient(135deg,#FAF8F2,#FAF8F2 11px,#F1EEE4 11px,#F1EEE4 22px)`) holding a "New this quarter" chip, then H3 "Ambient AI scribes are the new ePHI perimeter" + body + accent "Read the briefing →" (→ `Latest Intelligence.dc.html`). Then **Statutory foundations** — header + 3 reference rows (title + mono CFR right-aligned + one-line body, hairline dividers).
5. **A short primer**: header + 2-column grid (gap 40×56px) of Q/A pairs (bold 16px question + 14.5px muted answer).
6. **Footer**: top border, `rgba(250,248,242,0.6)` bg; left wordmark + mono source line; right "not legal advice" disclaimer.

**Reading-list rows (data):**
- 01 · Timeline · dot **accent** · "1996 – 2026" · "The Comparative Timeline" · → `Timeline.dc.html`
- 02 · Intelligence · dot **neutral** (`#3A3A46`) · "Active frontier" · "2026 Compliance Intelligence" · → `Latest Intelligence.dc.html`
- 03 · Breaches · dot **signal** · "Case analyses" · "Breaches & Outages, Deep-Dive" · → `Breaches.dc.html`

**Search behavior:** typing filters the reading list, foundations, and primer (case-insensitive substring across their text fields). If the reading list empties, show a mono "No sections match …" line; the primer section hides when it has no matches.

---

### 2. Latest Intelligence (`Latest Intelligence.dc.html`) — long-form article view
**Purpose:** the flagship reading experience — four rotating briefings.

**Layout:** top nav (Intelligence active) → breadcrumb + section head (H1 "2026 Compliance Intelligence" + lead + a "Filter briefings…" search) → **three-column grid** `250px minmax(0,1fr) 220px`, gap 48px:
- **Left — Issue contents** (sticky `top:88px`): mono header, then 4 buttons — each a category dot + mono kind + 14px title. The **active** one has `rgba(14,138,110,0.06)` bg and a 2px accent left border; inactive have a faint left border and muted text. The header search filters this list.
- **Center — article** (max-width 680px):
  - Kicker: category dot + mono kind (colored by category) · `·` · mono status.
  - H2 title (`clamp(30px,3.6vw,40px)`).
  - **Dek** in **Newsreader italic, 21px**, color `#3A382F`.
  - Meta row (mono, ink-faint): "N min read · N CFR references · Updated Q3 2024" with `·` separators, top+bottom hairline.
  - **`#situation`**: two serif paragraphs (19px/1.72) — lead then detail.
  - **`#ai`** — subhead "How AI changes the exposure" (13.5–14px uppercase, preceded by 22×2px **accent** rule) + serif paragraph.
  - **`#blindspot`** — the single **signal moment**: a box with 3px **clay** left border, `rgba(176,85,47,0.04)` bg, radius `0 12px 12px 0`; mono clay label "The administrator's blindspot" + 16.5px body.
  - **In practice** — same treatment but **accent** green (label "In practice").
  - **`#refs`** — a `<details>` (progressive disclosure): summary "Statutory references & official sources" + mono "N citations · tap to open"; when open, CFR chips (mono, accent, `rgba(14,138,110,0.06)` bg) then verified HHS source links (`↗` + accent label + muted description).
  - **Continue reading** — mono header + related buttons (mono kind colored by category + 16px title + `→`) that switch the active article in place.
- **Right — On this page** (sticky): mono header + vertical anchor nav (`#situation`, `#ai`, `#blindspot`, `#refs`) on a left rule; the "The blindspot" link is clay + active. Below: a dark "Next in issue →" card linking onward.

**Category → color:** Regulatory = accent green · Technology = neutral `#3A3A46` · Ethical/Legal = clay signal.

**Behavior:** clicking a contents item or a "continue reading" link sets the active topic and smooth-scrolls window to top. On-page links are native `#anchor` jumps (`scroll-behavior:smooth`, `scroll-margin-top:90px` on targets). **Do not use `scrollIntoView`.** Four topics: `reproductive`, `ambient`, `blocking`, `pixels` (full copy in the HTML + original `src/data`/`LatestDevelopments.tsx`).

---

### 3. Timeline (`Timeline.dc.html`) — comparative era reading view
**Purpose:** line up three parallel tracks (Legislation / Technology / Risk) for a chosen year.

**Layout:** top nav (Timeline active) → section head (H1 "The comparative timeline" + lead) → **Era spine** → three-column grid `230px minmax(0,1fr) 200px`.
- **Era spine** (sticky, `top:57px`, its own blurred bar): a horizontal, `overflow-x:auto` row of all 9 years, evenly spaced (`min-width:640px`), with a 1px horizontal line behind the dots. Each item = an 11px dot (filled accent when active, else paper with a `rgba(20,19,15,0.28)` border; always ringed by a 4px paper box-shadow to punch through the line) + mono year below (active = ink weight 600, else ink-faint). Clicking selects the era.
- **Left — Eras · 9** (sticky `top:132px`): vertical list, each = mono year + 12.5px short title; active = accent-tinted bg + 2px accent left border.
- **Center — era article** (max-width 680px): mono date; H2 era title; "Architecture era" label + a mono chip (`Client-server, on-premise` / `SaaS & cloud integration` / `Cloud-native API & microservices` by year band). Then **three track sections**, each: uppercase subhead with a 22×2px rule (Legislation = **accent**, Technology = **neutral**, Risks = **clay**) + serif body; Legislation & Technology append mono chips (CFR cites in accent-tinted; tech keywords in neutral white chips); **Risks** body sits in a clay-bordered callout and appends clay chips. Then a `<details>` "Verified government sources", then **prev/next era** buttons (bordered white cards, mono year + short title).
- **Right — The three tracks** (sticky): anchor nav (`#leg`, `#tech`, `#risk`; Legislation active accent, Risks clay) + a dark cross-link card to `Breaches.dc.html`.

**Data:** 9 eras (1996, 2003, 2005, 2009, 2013, 2016, 2020, 2022, 2024) — full copy in the HTML and in the original `src/data/timelineData.ts`. Default selected year: **2009**. Selecting an era scrolls window to top (smooth). Archetype helper: ≤2005 → on-prem; ≤2016 → SaaS/cloud; else cloud-native.

---

### 4. Breaches (`Breaches.dc.html`) — case-study post-mortems
**Purpose:** five OCR-audited breach case files, read as post-mortems.

**Layout:** top nav (Breaches active, **clay** underline) → section head (H1 "Breaches & outages, up close" + lead + "Filter cases…" search) → three-column grid `240px minmax(0,1fr) 220px`.
- **Left — Case files** (sticky): list buttons — mono year + mono **clay** type + 13px entity; active = clay-tinted bg + 2px clay left border. Filtered by the search.
- **Center — case article** (max-width 680px): kicker (clay dot + mono clay type · mono "Event year YYYY"); H2 entity; a **metric pair** — two-cell grid sharing a 1px hairline gap, each cell white with a mono uppercase label + value ("PHI records affected" in ink; "Financial impact" in **clay**). Then sections: **`#incident`** "What happened" (neutral rule, serif); **`#cause`** "Root cause" (clay rule + clay callout box); **`#ocr`** "The OCR response" (neutral rule, serif); **`#lesson`** "The lesson that survived" (accent rule + accent callout). Then a `<details>` "HHS & Congressional sources", then a **More case files** related list (cycles to the next two cases).
- **Right — On this page** (sticky): anchor nav (`#incident`, `#cause` clay-active, `#ocr`, `#lesson` accent) + a dark "Ask the advisor →" card ("Could this happen to us?") → `AI Advisor.dc.html`.

**Data:** 5 cases — Change Healthcare 2024 (default), Novant 2022, Hollywood Presbyterian 2016, Anthem 2015, BCBS Tennessee 2009 — full copy in the HTML and original `src/data/breachData.ts`. Selecting a case scrolls window to top.

---

### 5. AI Advisor (`AI Advisor.dc.html`) — calm consult surface
**Purpose:** ask compliance questions; get statute → precedent → next-step answers. **Editorial Q&A, not chat bubbles.**

**Layout:** top nav (Advisor active) → breadcrumb → **two-column grid** `260px minmax(0,1fr)`, gap 52px, with a **fixed bottom input bar**. Bottom padding on the grid is large (200px) to clear the fixed bar.
- **Left** (sticky): H1 "Regulatory advisor" + description; **"Try asking"** — 4 white bordered suggestion buttons (13px); a quiet "not legal advice" note with a 2px neutral left border.
- **Right — transcript** (max-width 720px): when empty, a **welcome block** (mono "● Advisor ready" + a 22px Newsreader-italic line + a muted follow-up). Each turn:
  - **User** — mono "You asked" label + 18px weight-600 question.
  - **Advisor** — a block with 2px **accent** left border, `padding-left:20px`: mono "Advisor" label; **serif lead** (18.5px/1.65); a bullet list (each `—` in accent + 15.5px item); CFR chips (accent-tinted mono); and a **"Practical next step"** accent callout box.
  - A "Cross-referencing statute and precedent…" line shows while `thinking`.
- **Fixed input bar** (bottom, full-width, paper-to-transparent gradient fade on top): centered (max-width 820px) white pill (radius 14px) with an input + a dark "Ask →" button.

**Behavior:** submitting a question (or clicking a suggestion) appends the user message, sets `thinking` true for ~650ms, then appends a structured answer and smooth-scrolls window to the bottom. The four presets map to curated answers (keys `p1`–`p4`); free text gets a generic HIPAA-framework answer. **In production, replace the canned answers with a call to the real advisor backend** (`POST /api/gemini/advisor` in the original app) and render the returned text in this same structured format.

---

## Interactions & Behavior (summary)
- **Navigation:** top-nav links and reading-list/section links are plain anchors to the sibling files; recreate as router links between routes/screens.
- **Selection state** (Intelligence topic, Timeline era, Breach case): local component state; on change, `window.scrollTo({top:0,behavior:'smooth'})`.
- **On-this-page rails:** native `#anchor` links; targets set `scroll-margin-top` (≈90–150px to clear sticky bars); page uses `scroll-behavior:smooth`. Never `scrollIntoView`.
- **Search / filter:** controlled input → case-insensitive substring filter over the relevant list's text fields; empty-state messaging as noted.
- **Progressive disclosure:** native `<details>`/`<summary>` (marker hidden) for references/sources.
- **Advisor:** async send with a brief thinking state; scroll to newest message.
- **Sticky rails** everywhere at `top:88px` (or `132px` on Timeline to clear the era spine).

## State Management
- `Dashboard`: `q` (search).
- `Latest Intelligence`: `activeId` (topic), `q` (filter).
- `Timeline`: `activeYear` (default 2009).
- `Breaches`: `activeId` (default change-healthcare-2024), `q`.
- `AI Advisor`: `input`, `thread` (array of user/model messages), `thinking`.
No global store required; screen-local state is sufficient. Data can be static modules
(reuse the original `src/data/*.ts`).

## Design Tokens
See the **Design System** section above — colors, typography, spacing, radius, shadow, and
the texture overlay are all enumerated there.

## Assets
- **Fonts:** Archivo, Newsreader, JetBrains Mono (Google Fonts link above). No other font files.
- **Icons:** only a single inline search-circle SVG (magnifier) and text glyphs (`→ ↗ ↵ ·`). The
  original app used `lucide-react`; the redesign deliberately minimizes icon usage — reintroduce
  lucide sparingly only if your codebase already uses it.
- **Images:** none. The Dashboard featured card uses a CSS diagonal-hatch placeholder — swap in a
  real image/illustration if desired.
- **No external image assets** are required to build these screens.

## Files (in this bundle)
- `Dashboard.dc.html` — screen 1
- `Latest Intelligence.dc.html` — screen 2
- `Timeline.dc.html` — screen 3
- `Breaches.dc.html` — screen 4
- `AI Advisor.dc.html` — screen 5

Open any file in a browser to see the live, clickable design. To read the exact inline styles
and copy, view source. The original app's content data and TypeScript types live in the
uploaded `hipaa-practitioner-app/src/` tree (`data/timelineData.ts`, `data/breachData.ts`,
`components/*.tsx`, `types.ts`) — reuse them verbatim; only the presentation changes.
