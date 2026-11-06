# GEMINI.md - Neudela Design System & Rudis SDD Guidelines

Guidelines and contextual rules for Google Antigravity & Gemini Code Assist when working in the **Neudela** repository.

---

## 1. Project Overview & Architecture

- **Project**: Neudela Design System
- **Stack**: React 18, TypeScript, Vite, Vanilla CSS design tokens.
- **Tokens & Styling**:
  - Global CSS tokens in `src/assets/tokens.css` and `src/styles/neudela.css`.
  - Color palette: Warm terracotta brand (`#df7e30`), modern slate neutrals (`#64748b`), semantic alerts (emerald, amber, red, sky).
  - 8pt spatial baseline for spacing and 12-column responsive grid.
  - WCAG 2.1 AA/AAA contrast compliance across light and dark themes.
- **Commands**:
  - `npm run dev`: Start development server.
  - `npm run build`: Compile TypeScript and build production bundle via Vite.

---

## 2. Rudis Spec-Driven Development (SDD) Customizations

This repository is equipped with **Rudis (Rapid Utility & Development Intelligence System)** spec-driven development workflows. All 18 commands have been converted into native Antigravity/Gemini skills located under `.agents/skills/` and mirrored in `.gemini/commands/`:

| Command / Skill | Scope | Description |
| :--- | :--- | :--- |
| `rudis` / `rudis-rudis` | Router | Concierge front door — routes user requests to the appropriate SDD workflow. |
| `rudis-constitution` | Principles | Establishes/updates project invariants and principles in `.rudis/memory/constitution.md`. |
| `rudis-brd` | Reverse-Eng | Drafs a compact per-module semantic map under `docs/brd/` from brownfield code. |
| `rudis-specify` | Spec | Creates or updates structured feature specifications (`spec.md`). |
| `rudis-clarify` | Disambiguation | Resolves underspecified requirements by asking targeted questions before planning. |
| `rudis-plan` | Architecture | Generates architecture plans, contracts, data models, and research artifacts (`plan.md`). |
| `rudis-checklist` | Quality | Generates domain-specific verification checklists. |
| `rudis-tasks` | Decomposition | Breaks down plans into dependency-ordered, actionable tasks (`tasks.md`). |
| `rudis-taskstoissues`| Integration | Converts tasks into GitHub issues. |
| `rudis-analyze` | Consistency | Performs non-destructive cross-artifact consistency checks between spec, plan, and tasks. |
| `rudis-implement` | Execution | Executes tasks sequentially following TDD and project constraints. |
| `rudis-converge` | Audit | Verifies existing code against spec/plan/tasks and appends remaining work to `tasks.md`. |
| `rudis-test` | Testing | Discovers tests, writes missing unit tests, and validates code quality standards. |
| `rudis-redesign` | Iteration | Incrementally revamps specific modules/pages without regenerating everything. |
| `rudis-deploy` | DevOps | Prepares deployment automation (Docker, CI/CD pipelines, environment configs). |
| `rudis-operate` | Ops & Telemetry | Wires observability, monitors logs/metrics, and detects anomalies. |
| `rudis-postmortem` | Feedback Loop | Translates production incidents and telemetry into spec/constitution improvements. |
| `rudis-ultimate` | Orchestrator | Complete end-to-end SDD pipeline from constitution to deployment with gates. |

---

## 3. How Gemini Executes Rudis Workflows

1. **On-Demand Activation**:
   - When the user asks to run a Rudis command (e.g. `/rudis-specify`, `/rudis-plan`, or natural language like "buatkan spec fitur baru dengan rudis"), activate the corresponding skill located at `.agents/skills/<skill-name>/SKILL.md`.
2. **User Input / `$ARGUMENTS`**:
   - Treat any additional text provided with the command as the `$ARGUMENTS` input to scope or guide the execution.
3. **Artifact Integrity**:
   - Always adhere to the established directory structure (`docs/brd/`, `docs/specs/`, `.rudis/memory/`).
   - Maintain progressive disclosure: keep plans and summaries compact, structured, and citable.

---

## 4. Invariant Wajib Pola Desain (Pattern Modul) Neudela

Setiap kali membuat atau memperbarui modul pola (`src/views/patterns/*PatternView.tsx`), **WAJIB 100% KONSISTEN** mengikuti cetak biru (blueprint) standar yang ada di `MapPatternView`, `DataGridPatternView`, `AuthPatternView`, dan `SidebarPatternView`:

1. **Header Modal Interaktif**:
   - **Sisi Kiri**:
     - Dot aksen 12x12px dengan shadow warna aksen varian.
     - Judul: `fontSize: '16px'`, `fontWeight: 700`.
     - Badge varian: `fontSize: '11px'`, `padding: '2px 8px'`, `borderRadius: '10px'`, background `${accentColor}20`.
     - Subtitle/Tagline: `fontSize: '11.5px'`, `color: 'var(--color-text-secondary)'`.
   - **Sisi Kanan**:
     - **Subtabs Tab**: `Kanvas Interaktif` / `Interactive Canvas` vs `React (TSX)` (padding: 3, border-radius: 8).
     - **Tombol Tab Baru**: Tombol solid terracotta (`var(--color-primary)`): `<ExternalLink size={14} />` + `Buka di Tab Baru (Real App)`.
     - **Tombol Tutup (X)**: Tombol bordered berlatar surface dengan icon `<X size={16} />` dan title `Tutup (Esc)`.
     - **DILARANG** menambahkan tombol switcher viewport (desktop/tablet/mobile) di dalam header modal! Kontrol viewport HANYA ada di `Standalone<Pattern>Preview.tsx`.
2. **Body Modal**:
   - `modalTab === 'preview'`: Render full width & height dengan `padding: 24px` dan `overflowY: 'auto'`.
   - `modalTab === 'tsx'`: Tampilkan cuplikan kode TSX dengan tombol salin (copy).
3. **Kartu Galeri Overview**:
   - Garis aksen atas 3.5px gradien (`position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: 'linear-gradient(90deg, ' + variant.accentColor + ' 0%, ' + variant.accentColor + '30 100%)'`).
   - Avatar icon 42x42px berlatar `15%` aksen.
   - Dua tombol aksi bawah: `Preview di Modal` (tinted primary) dan `Tab Baru` (canvas neutral dengan icon external-link).
4. **Header Halaman Utama (Page Header)**:
   - Eyebrow label WAJIB menggunakan: `<span className="page-category-label">Pattern</span>` (DILARANG menggunakan teks kustom atau custom inline styling).
   - Judul: `<h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>`.
   - Subjudul: `<p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>`.
   - Stats Pills: Menggunakan container `<div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>` dengan format card pill Neudela standar berlatar surface, border `var(--color-border)`, radius `20px`, dan icon Lucide 14px (DILARANG menggunakan emoji informal).

