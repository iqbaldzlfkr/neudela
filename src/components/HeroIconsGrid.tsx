import { useState } from 'react';
import {
  Palette,
  Type,
  Ruler,
  LayoutGrid,
  MousePointerClick,
  TextCursorInput,
  CreditCard,
  Tag,
  AlertTriangle,
  Layers,
  Paintbrush,
  Accessibility,
  Moon,
  Smartphone,
  Component,
  SwatchBook,
  PanelTop,
  Blocks,
  PenTool,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Each icon maps directly to a Neudela feature
   ───────────────────────────────────────────── */
const ICONS_DATA = [
  // Row 1 — Foundation layer
  { Icon: Palette,            label: 'Colors',       accent: '#df7e30' },
  { Icon: Type,               label: 'Typography',   accent: '#64748b' },
  { Icon: Ruler,              label: 'Spacing',      accent: '#10b981' },
  { Icon: LayoutGrid,         label: 'Grid',         accent: '#0284c7' },
  { Icon: SwatchBook,         label: 'Tokens',       accent: '#d97706' },

  // Row 2 — Component library
  { Icon: MousePointerClick,  label: 'Button',       accent: '#df7e30' },
  { Icon: TextCursorInput,    label: 'Input',        accent: '#64748b' },
  { Icon: CreditCard,         label: 'Card',         accent: '#10b981' },
  { Icon: Tag,                label: 'Badge',        accent: '#0284c7' },
  { Icon: AlertTriangle,      label: 'Alert',        accent: '#dc2626' },

  // Row 3 — System capabilities
  { Icon: Layers,             label: 'Multi‑Brand',  accent: '#df7e30' },
  { Icon: Paintbrush,         label: 'Theming',      accent: '#8b5cf6' },
  { Icon: Component,          label: 'Reusable',     accent: '#10b981' },
  { Icon: PanelTop,           label: 'Patterns',     accent: '#0284c7' },
  { Icon: Blocks,             label: 'Modular',      accent: '#d97706' },

  // Row 4 — Quality & tooling
  { Icon: Accessibility,      label: 'A11y',         accent: '#059669' },
  { Icon: Moon,               label: 'Dark Mode',    accent: '#6366f1' },
  { Icon: Smartphone,         label: 'Responsive',   accent: '#0284c7' },
  { Icon: PenTool,           label: 'Design Kit',   accent: '#a855f7' },
  { Icon: Palette,            label: 'Neudela',      accent: '#df7e30' },
];

export default function HeroIconsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="hero-icons-grid">
      {ICONS_DATA.map((item, index) => {
        const { Icon, label, accent } = item;
        const isHovered = hoveredIndex === index;

        // Staggered wave — each cell gets a slightly different delay
        const col = index % 5;
        const row = Math.floor(index / 5);
        const animDelay = `${col * 0.18 + row * 0.25}s`;

        return (
          <div
            key={index}
            className={`hero-icon-cell${isHovered ? ' hovered' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              '--cell-accent': accent,
              animationDelay: isHovered ? '0s' : animDelay,
            } as React.CSSProperties}
          >
            <Icon
              size={26}
              strokeWidth={1.6}
              className="hero-icon-svg"
            />

            <span className="hero-icon-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
