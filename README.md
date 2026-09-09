<div align="center">

# Neudela Design System

**Enterprise-grade React UI Component Library & Design System**  
Built for performance, modern aesthetics, and seamless developer experience.

[![npm version](https://img.shields.io/npm/v/neudela.svg?color=df7e30&style=flat-square)](https://www.npmjs.com/package/neudela)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg?style=flat-square)](LICENSE)
[![React 18 & 19](https://img.shields.io/badge/React-18%20%7C%2019-61dafb?style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/badge/bundle-217%20kB%20(packed)-10b981?style=flat-square)](https://www.npmjs.com/package/neudela)

[Explore Documentation](https://github.com/iqbaldzlfkr/neudela) · [View on NPM](https://www.npmjs.com/package/neudela) · [Report Bug](https://github.com/iqbaldzlfkr/neudela/issues)

</div>

---

## ✨ Features

- 🎨 **Neuron Design Tokens**: Curated warm terracotta palette (`--brand-*`), comprehensive neutral slate scales, and accessible semantic feedback states.
- ⚡ **Zero-Friction NPM Installation**: Published to NPM registry. Install in seconds in any Vite, Next.js, Remix, or Create React App project.
- 🌓 **First-Class Dark Mode**: Effortless light and dark mode switching via `.dark-theme` or `[data-theme="dark"]`.
- 🚀 **Next.js App Router & Server Components**: Pre-configured with `'use client'` directive boundaries across all interactive modules.
- 🛡️ **Strict TypeScript & IntelliSense**: 100% written in TypeScript with generated `.d.ts` declaration maps.
- 📦 **Dual Output Bundles**: Supports modern ES Modules (`dist/index.js`) and CommonJS (`dist/index.cjs`) with automatic tree-shaking (`sideEffects: ["**/*.css"]`).
- 🧩 **20+ Production-Ready Components**: Buttons, multi-column Tables with sticky pinning, DatePickers with date range presets, Modals, Dropdowns, Toggles, and more.

---

## 📦 Installation

Install `neudela` using your preferred package manager:

```bash
# npm
npm install neudela

# pnpm
pnpm add neudela

# yarn
yarn add neudela

# bun
bun add neudela
```

> **Peer Dependencies:** React `^18.0.0` or `^19.0.0` and `react-dom`.

---

## 🚀 Quick Start

### 1. Import Global Component Styles

Import `neudela/style.css` once at the root of your application (`main.tsx`, `App.tsx`, or Next.js `app/layout.tsx`):

```tsx
import 'neudela/style.css';
```

### 2. Use Components in Your React Project

```tsx
import React, { useState } from 'react';
import { 
  NeuronButton, 
  NeuronTable, 
  NeuronBadge, 
  NeuronDatePicker, 
  NeuronModal 
} from 'neudela';

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', fontFamily: 'var(--font-family)' }}>
      {/* Badge Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <NeuronBadge variant="brand" pill>Enterprise UI</NeuronBadge>
        <NeuronBadge variant="success" pill>Operational</NeuronBadge>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <NeuronButton variant="primary" onClick={() => setModalOpen(true)}>
          Launch Modal
        </NeuronButton>
        <NeuronButton variant="secondary">
          Export Records
        </NeuronButton>
      </div>

      {/* Interactive Modal */}
      <NeuronModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Neudela Modal"
        description="This modal is powered directly by the neudela npm library."
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={() => setModalOpen(false)}
      >
        <p>Enterprise dialog content with focus trap, backdrop dismissal, and smooth spring animations.</p>
      </NeuronModal>
    </div>
  );
}
```

---

## 🧩 Component Inventory

| Category | Components | Key Highlights |
| :--- | :--- | :--- |
| **Buttons & Nav** | `NeuronButton`, `NeuronButtonGroup`, `NeuronBreadcrumb` | 5 visual variants (primary, secondary, outline, text), icon slots, loading spinners, segmented states. |
| **Data Display** | `NeuronTable`, `NeuronCard`, `NeuronBadge`, `NeuronBadgeGroup`, `NeuronAvatar`, `NeuronAvatarGroup`, `NeuronProgress`, `NeuronTooltip` | Dynamic sticky action column with auto-fading shadow, multi-column sorting, debounced search, circular/bar progress. |
| **Forms & Inputs** | `NeuronInput`, `NeuronCheckbox`, `NeuronRadio`, `NeuronRadioGroup`, `NeuronToggle`, `NeuronDatePicker`, `NeuronDropdown`, `NeuronDropdownMenu`, `NeuronSelect` | Range & single date picking with presets, multi-tag dropdowns, avatar selectors, validated input states. |
| **Feedback & Overlays** | `NeuronAlert`, `NeuronModal` | Accessible focus containment, keyboard navigation (`Escape`, `Tab`), slide-in/fade transitions. |

---

## 🌓 Theming & Dark Mode

Neudela's stylesheet exposes clean CSS custom properties under `:root`. Dark mode is activated simply by toggling the `.dark-theme` class on `document.body` or `<html>`:

```html
<!-- Enable Dark Theme -->
<body class="dark-theme">
  ...
</body>
```

Or target with CSS variables:

```css
:root {
  --brand-500: #df7e30; /* Primary Terracotta */
  --brand-600: #c3571c; /* Hover Brand */
}

.dark-theme {
  --color-bg-surface: #1e293b;
  --color-text-primary: #f8fafc;
}
```

---

## 💻 Local Development & Documentation

To run the interactive documentation portal and component playground locally:

```bash
# 1. Clone the repository
git clone https://github.com/iqbaldzlfkr/neudela.git
cd neudela

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

Visit `http://localhost:5174` in your browser.

### Building the NPM Package:

```bash
# Compile library to dist/ (ESM, CJS, Types, CSS)
npm run build:lib
```

---

## 📄 License

MIT © [Neudela Design System](https://github.com/iqbaldzlfkr/neudela)
