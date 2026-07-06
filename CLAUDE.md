# Style guide — read before writing any UI

Every app, demo, and page built inside this folder shares one visual identity:
**"The Cream System,"** documented in `design-system.md` and shipped as an
importable stylesheet in `tokens.css` (both live right here, at the Vibe
Coding root). Source of truth for both is `Portfolio Home Page/style.css`
(the live site).

## Before writing or generating any HTML/CSS/UI code in this folder or any subfolder:

1. Read `design-system.md` for the palette, type scale, spacing, and component
   patterns (nav, cards, buttons, tags, footer).
2. Link `tokens.css` (`<link rel="stylesheet" href="../tokens.css">`,
   adjusting the relative path) or copy its `:root` block — use those
   variables and utility classes instead of choosing new colors, fonts,
   corner radii, or spacing values.
3. Do not invent a new palette "because it's just a demo." The entire point
   of this file is that every project matches, so a new one-off theme is a
   regression, not a shortcut.
4. If a project's requirements are genuinely incompatible with the light
   cream aesthetic (e.g. a terminal-simulator or video-editor UI that needs
   to be dark), say so explicitly and confirm with the user before deviating
   — don't silently invent a new dark theme.

## Known drift — do not copy patterns from these

Built before this system was formalized; each invented its own one-off dark
palette instead of using the shared tokens:

- `Portfolio Home Page/debate_arena.html`
- `Portfolio Home Page/pir-generator.html`
- `Portfolio Home Page/tpm_coach.html`
- `Portfolio Home Page/admin.css`

Treat these as legacy, not reference. If you're asked to touch one of them,
flag the mismatch and ask whether to bring it in line with `tokens.css`.

## Scope

This instruction applies to any session working in this folder or its
subfolders, regardless of which tool or harness is doing the building
(Claude Code, Cowork, or otherwise) — see also `AGENTS.md`, which mirrors
this file for tools that look for that convention instead.
