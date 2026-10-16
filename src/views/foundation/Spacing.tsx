import { useState, useMemo, useEffect, ReactNode } from 'react';
import {
  Ruler,
  Maximize2,
  Boxes,
  Copy,
  RotateCcw,
  Layers,
  CheckCircle2,
  XCircle,
  Code2,
  Search,
  ArrowUpDown,
  ArrowLeftRight,
  Box,
  Sliders,
  Eye,
  X,
} from 'lucide-react';
import NeuronButton from '../../components/NeuronButton';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronInput from '../../components/NeuronInput';
import NextPrevious from '../../components/NextPrevious';
import { useLanguage } from '../../context/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────

interface SpacingProps {
  setActiveTab: (tabId: string) => void;
}

export interface SpacingToken {
  name: string;
  px: number;
  rem: string;
  multiplier: string;
  category: 'micro' | 'base' | 'layout' | 'macro';
  tailwind: string;
  roleId: string;
  roleEn: string;
  commonUseId: string;
  commonUseEn: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Master Tokens Definition (Neudela 8pt / 4pt Spacing Scale)
// ─────────────────────────────────────────────────────────────────────────────

const SPACING_TOKENS: SpacingToken[] = [
  {
    name: '--space-1',
    px: 4,
    rem: '0.25rem',
    multiplier: '0.5x',
    category: 'micro',
    tailwind: 'p-1 / gap-1',
    roleId: 'Offset mikro, padding dalam badge super mini, dan penyesuaian border halus.',
    roleEn: 'Micro offset, ultra-compact badge padding, and subtle border alignment.',
    commonUseId: 'Status dot, badge sub-teks, panah tooltip',
    commonUseEn: 'Status dot, subtext badge, tooltip arrows',
  },
  {
    name: '--space-2',
    px: 8,
    rem: '0.5rem',
    multiplier: '1x (Base)',
    category: 'base',
    tailwind: 'p-2 / gap-2',
    roleId: 'Unit dasar 8pt spatial baseline: celah ikon + teks, padding tombol compact, list padat.',
    roleEn: '8pt spatial baseline unit: icon + text gap, compact button padding, dense list items.',
    commonUseId: 'Ikon inline, chip/tag padding vertikal, menu item',
    commonUseEn: 'Inline icons, chip/tag vertical padding, menu items',
  },
  {
    name: '--space-3',
    px: 12,
    rem: '0.75rem',
    multiplier: '1.5x',
    category: 'base',
    tailwind: 'p-3 / gap-3',
    roleId: 'Padding sedang: form input vertikal, celah antar tombol dalam button group.',
    roleEn: 'Intermediate spacing: form input vertical padding, button group gap.',
    commonUseId: 'Form input, alert card mini, group buttons',
    commonUseEn: 'Form inputs, mini alert cards, group buttons',
  },
  {
    name: '--space-4',
    px: 16,
    rem: '1rem',
    multiplier: '2x (Standard)',
    category: 'base',
    tailwind: 'p-4 / gap-4',
    roleId: 'GRID DASAR STANDAR: padding tombol medium, padding tabel data, dan jarak antar field.',
    roleEn: 'DEFAULT BASE GRID: medium button padding, table cell padding, and form field gap.',
    commonUseId: 'Tombol standar, sel tabel, card content spacing',
    commonUseEn: 'Standard buttons, table cells, card content spacing',
  },
  {
    name: '--space-5',
    px: 20,
    rem: '1.25rem',
    multiplier: '2.5x',
    category: 'base',
    tailwind: 'p-5 / gap-5',
    roleId: 'Celah transisi: padding kontainer sedang, jarak antar item avatar, dan dialog mini.',
    roleEn: 'Transition spacing: medium container insets, avatar gaps, and compact dialogs.',
    commonUseId: 'Avatar group, popover dialog, accordion header',
    commonUseEn: 'Avatar groups, popover dialogs, accordion headers',
  },
  {
    name: '--space-6',
    px: 24,
    rem: '1.5rem',
    multiplier: '3x',
    category: 'layout',
    tailwind: 'p-6 / gap-6',
    roleId: 'Padding standar Card & Modal: memberikan ruang bernapas optimal pada kartu konten.',
    roleEn: 'Standard Card & Modal padding: provides optimal visual breathing room for content cards.',
    commonUseId: 'Card internal padding, modal dialog, panel container',
    commonUseEn: 'Card internal insets, modal dialogs, panel containers',
  },
  {
    name: '--space-8',
    px: 32,
    rem: '2rem',
    multiplier: '4x',
    category: 'layout',
    tailwind: 'p-8 / gap-8',
    roleId: 'Pemisah antar modul: jarak antar kartu dalam dashboard dan padding kartu hero.',
    roleEn: 'Module separation: gap between dashboard cards and hero card insets.',
    commonUseId: 'Dashboard card gap, sidebar divider, large modal',
    commonUseEn: 'Dashboard card gaps, sidebar dividers, large modals',
  },
  {
    name: '--space-10',
    px: 40,
    rem: '2.5rem',
    multiplier: '5x',
    category: 'layout',
    tailwind: 'p-10 / gap-10',
    roleId: 'Jarak bagian layout besar: pemisah grup konten formulir panjang dan hero header.',
    roleEn: 'Large layout gap: multi-step form sections and hero header spacing.',
    commonUseId: 'Hero section subtitle gap, form step separator',
    commonUseEn: 'Hero subtitle gap, multi-step form separators',
  },
  {
    name: '--space-12',
    px: 48,
    rem: '3rem',
    multiplier: '6x',
    category: 'layout',
    tailwind: 'p-12 / gap-12',
    roleId: 'Pemisah seksi halaman desktop: margin atas/bawah antar section aplikasi.',
    roleEn: 'Desktop page section separator: top/bottom margin between page sections.',
    commonUseId: 'Page section rhythm, empty state padding',
    commonUseEn: 'Page section rhythm, empty state padding',
  },
  {
    name: '--space-16',
    px: 64,
    rem: '4rem',
    multiplier: '8x',
    category: 'macro',
    tailwind: 'p-16 / gap-16',
    roleId: 'Spasi makro: jeda visual dramatis antar blok halaman beranda dan landing page.',
    roleEn: 'Macro spacing: dramatic visual pause between landing page sections.',
    commonUseId: 'Landing page features divider, footer top margin',
    commonUseEn: 'Landing page feature dividers, footer top margin',
  },
  {
    name: '--space-20',
    px: 80,
    rem: '5rem',
    multiplier: '10x',
    category: 'macro',
    tailwind: 'p-20 / gap-20',
    roleId: 'Pemisah hero marketing utama dan transisi cerita visual produk.',
    roleEn: 'Marketing hero separator and editorial product showcase transitions.',
    commonUseId: 'Hero banner vertical spacing, showcase section',
    commonUseEn: 'Hero banner vertical spacing, showcase sections',
  },
  {
    name: '--space-24',
    px: 96,
    rem: '6rem',
    multiplier: '12x',
    category: 'macro',
    tailwind: 'p-24 / gap-24',
    roleId: 'Spasi makro maksimal: header hero full-screen dan ruang transisi penutup.',
    roleEn: 'Maximum macro spacing: full-bleed hero headers and concluding editorial spacers.',
    commonUseId: 'Full-bleed hero padding, monumental layout breaks',
    commonUseEn: 'Full-bleed hero insets, monumental layout breaks',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Do & Don't Rule Card Component
// ─────────────────────────────────────────────────────────────────────────────

function RuleCard({ type, children }: { type: 'do' | 'dont'; children: ReactNode }) {
  const isDo = type === 'do';
  return (
    <div className={`rule-card rule-card--${type} ${isDo ? 'do-card' : 'dont-card'}`}>
      <div
        className="rule-card__badge"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontSize: '11px',
          fontWeight: 700,
          margin: '16px 16px 0 16px',
          width: 'fit-content',
          backgroundColor: isDo ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          color: isDo ? '#10b981' : '#ef4444',
        }}
      >
        {isDo ? <CheckCircle2 size={13} strokeWidth={2.5} /> : <XCircle size={13} strokeWidth={2.5} />}
        <span>{isDo ? 'DO' : "DON'T"}</span>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Spacing View Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Spacing({ setActiveTab }: SpacingProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  // Sub-tabs: 'scale' | 'simulator' | 'patterns' | 'guidelines'
  const [activeSubTab, setActiveSubTab] = useState<'scale' | 'simulator' | 'patterns' | 'guidelines'>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('simulator') || hash.includes('playground')) return 'simulator';
    if (hash.includes('patterns') || hash.includes('semantic')) return 'patterns';
    if (hash.includes('guidelines') || hash.includes('dodont')) return 'guidelines';
    return 'scale';
  });

  const handleSubTabChange = (tab: 'scale' | 'simulator' | 'patterns' | 'guidelines') => {
    setActiveSubTab(tab);
    const targetHash = tab === 'scale' ? '#spacing' : `#spacing-${tab}`;
    window.history.replaceState(null, '', targetHash);
  };

  // Toast Notification state
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = (text: string, label?: string) => {
    navigator.clipboard.writeText(text);
    setToastMsg(label || `${isId ? 'Tersalin' : 'Copied'}: ${text}`);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2400);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Tab 1 (Scale) Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'micro' | 'base' | 'layout' | 'macro'>('all');
  const [unitMode, setUnitMode] = useState<'both' | 'px' | 'rem'>('both');

  const filteredTokens = useMemo(() => {
    return SPACING_TOKENS.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.px.toString().includes(q) ||
        t.rem.toLowerCase().includes(q) ||
        t.roleId.toLowerCase().includes(q) ||
        t.roleEn.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Tab 2 (Simulator) States
  const [simMode, setSimMode] = useState<'card' | 'stack' | 'inline'>('card');
  const [paddingIndex, setPaddingIndex] = useState<number>(5); // default: --space-6 (24px)
  const [gapIndex, setGapIndex] = useState<number>(3); // default: --space-4 (16px)
  const [showRulers, setShowRulers] = useState<boolean>(true);
  const [codeType, setCodeType] = useState<'css' | 'tailwind' | 'react'>('css');

  const activePaddingToken = SPACING_TOKENS[paddingIndex] || SPACING_TOKENS[5];
  const activeGapToken = SPACING_TOKENS[gapIndex] || SPACING_TOKENS[3];

  const generatedSimCode = useMemo(() => {
    if (codeType === 'css') {
      return `/* Neudela Spacing Implementation */
.my-component {
  display: ${simMode === 'stack' ? 'flex' : simMode === 'inline' ? 'flex' : 'block'};
  ${simMode === 'stack' ? 'flex-direction: column;\n  ' : ''}${
        simMode === 'inline' ? 'flex-direction: row;\n  align-items: center;\n  ' : ''
      }padding: var(${activePaddingToken.name}); /* ${activePaddingToken.px}px / ${activePaddingToken.rem} */
  gap: var(${activeGapToken.name}); /* ${activeGapToken.px}px / ${activeGapToken.rem} */
}`;
    }
    if (codeType === 'tailwind') {
      const pClass = activePaddingToken.tailwind.split('/')[0].trim();
      const gapClass = activeGapToken.tailwind.split('/')[1]?.trim() || `gap-${activeGapToken.px / 4}`;
      const flexClass = simMode === 'stack' ? 'flex flex-col' : simMode === 'inline' ? 'flex items-center' : '';
      return `<div class="${flexClass ? flexClass + ' ' : ''}${pClass} ${gapClass} bg-surface rounded-xl border">
  <!-- Content elements -->
</div>`;
    }
    return `// React Inline Style Object
<div
  style={{
    display: '${simMode === 'stack' || simMode === 'inline' ? 'flex' : 'block'}',
    ${simMode === 'stack' ? "flexDirection: 'column',\n    " : ''}${
      simMode === 'inline' ? "flexDirection: 'row',\n    alignItems: 'center',\n    " : ''
    }padding: 'var(${activePaddingToken.name})', // ${activePaddingToken.px}px
    gap: 'var(${activeGapToken.name})', // ${activeGapToken.px}px
  }}
>
  {/* Content elements */}
</div>`;
  }, [codeType, simMode, activePaddingToken, activeGapToken]);

  return (
    <div className="spacing-view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <span
          style={{
            fontSize: 'var(--fs-text-xs, 12px)',
            fontWeight: 'var(--font-weight-bold, 700)',
            color: 'var(--color-primary, #df7e30)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: 'var(--space-2, 8px)',
          }}
        >
          <Ruler size={14} strokeWidth={2.4} />
          {isId ? 'SISTEM FOUNDATION' : 'FOUNDATION SYSTEM'}
        </span>
        <h1 className="page-title">{isId ? 'Spasi & Ritme Spasial (Spacing)' : 'Spacing & Spatial Rhythm'}</h1>
        <p className="page-subtitle">
          {isId
            ? 'Fondasi ritme spasial Neudela dirancang berbasis baseline 8pt dengan sub-grid 4pt untuk kontrol mikro. Menstandarkan proporsi padding, margin, celah (gap), dan hierarki kedalaman visual secara matematis di seluruh produk digital.'
            : 'The Neudela spatial rhythm foundation is built on an 8pt baseline with a 4pt sub-grid for micro-adjustments. Standardizing padding, margins, layout gaps, and visual hierarchy mathematically across all digital products.'}
        </p>

        {/* Header Stats Pills */}
        <div className="spacing-header-stats">
          <span className="spacing-stat-pill">
            <Ruler size={13} color="#df7e30" />
            <span>{isId ? 'Total Skala:' : 'Total Tokens:'}</span>
            <strong>{SPACING_TOKENS.length} {isId ? 'Skala' : 'Scales'} (--space-1 sd --space-24)</strong>
          </span>
          <span className="spacing-stat-pill">
            <Boxes size={13} color="#df7e30" />
            <span>{isId ? 'Baseline Spasial:' : 'Spatial Baseline:'}</span>
            <strong>8pt (Sub-grid 4pt)</strong>
          </span>
          <span className="spacing-stat-pill">
            <Layers size={13} color="#df7e30" />
            <span>{isId ? 'Arketipe Spasi:' : 'Spatial Types:'}</span>
            <strong>Inset, Stack, Inline</strong>
          </span>
          <span className="spacing-stat-pill">
            <CheckCircle2 size={13} color="#10b981" />
            <span>{isId ? 'Sinkronisasi Unit:' : 'Unit Sync:'}</span>
            <strong>Rem (Base 16px) &amp; Px</strong>
          </span>
        </div>

        {/* Main Tab Switcher */}
        <div className="comp-tab-bar" style={{ marginTop: 'var(--space-4, 16px)' }}>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'scale' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('scale')}
          >
            {isId ? 'Skala & Token Spasi' : 'Spacing Scale & Tokens'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'simulator' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('simulator')}
          >
            {isId ? 'Simulator Spasial Interaktif' : 'Interactive Playground'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'patterns' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('patterns')}
          >
            {isId ? 'Pola Semantik & Inset' : 'Semantic Patterns & Insets'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'guidelines' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('guidelines')}
          >
            {isId ? 'Panduan Penerapan (Do & Don\'t)' : "Usage Guidelines (Do & Don't)"}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1: SKALA & TOKEN SPASI (Spacing Scale & Tokens)
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'scale' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Toolbar */}
          <div className="spacing-toolbar">
            <div className="spacing-toolbar-top">
              {/* Search Bar */}
              <div className="spacing-search-wrap">
                <NeuronInput
                  placeholder={
                    isId
                      ? 'Cari nama token, pixel (misal: 16px), atau kegunaan...'
                      : 'Search token name, pixels (e.g. 16px), or role...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leadingIcon={<Search size={16} />}
                  trailingIcon={
                    searchQuery ? (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-text-tertiary)',
                          width: '18px',
                          height: '18px',
                        }}
                        title={isId ? 'Hapus pencarian' : 'Clear search'}
                      >
                        <X size={14} />
                      </button>
                    ) : undefined
                  }
                />
              </div>

              {/* Unit Mode Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  {isId ? 'Tampilan Unit:' : 'Unit Display:'}
                </span>
                <div className="spacing-unit-pills">
                  <button
                    type="button"
                    className={`spacing-unit-btn ${unitMode === 'both' ? 'active' : ''}`}
                    onClick={() => setUnitMode('both')}
                  >
                    Px + Rem
                  </button>
                  <button
                    type="button"
                    className={`spacing-unit-btn ${unitMode === 'px' ? 'active' : ''}`}
                    onClick={() => setUnitMode('px')}
                  >
                    Pixel (px)
                  </button>
                  <button
                    type="button"
                    className={`spacing-unit-btn ${unitMode === 'rem' ? 'active' : ''}`}
                    onClick={() => setUnitMode('rem')}
                  >
                    Rem
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="spacing-category-chips">
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500, marginRight: '4px' }}>
                {isId ? 'Kategori Spasi:' : 'Category Filter:'}
              </span>
              {[
                { id: 'all', labelId: 'Semua (12)', labelEn: 'All (12)' },
                { id: 'micro', labelId: 'Mikro (4px)', labelEn: 'Micro (4px)' },
                { id: 'base', labelId: 'Dasar (8–20px)', labelEn: 'Base (8–20px)' },
                { id: 'layout', labelId: 'Tata Letak (24–48px)', labelEn: 'Layout (24–48px)' },
                { id: 'macro', labelId: 'Makro (64–96px)', labelEn: 'Macro (64–96px)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`spacing-cat-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id as any)}
                >
                  {isId ? cat.labelId : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Scale Token List */}
          <div className="spacing-scale-list">
            {filteredTokens.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  background: 'var(--color-bg-surface)',
                  borderRadius: 'var(--radius-xl, 16px)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Search size={32} color="var(--color-text-tertiary)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Token spasi tidak ditemukan' : 'No spacing tokens found'}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  {isId
                    ? `Tidak ada token yang cocok dengan "${searchQuery}". Coba kata kunci lain.`
                    : `No tokens matched "${searchQuery}". Try adjusting your search query.`}
                </p>
              </div>
            ) : (
              filteredTokens.map((token) => {
                const maxPx = 96;
                const widthPercent = Math.min(100, Math.max(4, (token.px / maxPx) * 100));

                return (
                  <div
                    key={token.name}
                    className="spacing-token-card"
                    onClick={() => copyToClipboard(`var(${token.name})`, `${token.name} ${isId ? 'tersalin' : 'copied'}`)}
                    title={isId ? 'Klik untuk menyalin token CSS' : 'Click to copy CSS variable'}
                  >
                    {/* Column 1: Token Name & Multiplier */}
                    <div className="spacing-token-info">
                      <div className="spacing-token-name">
                        <span>{token.name}</span>
                        <span className="spacing-multiplier-badge">{token.multiplier}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <NeuronBadge
                          variant={
                            token.category === 'micro'
                              ? 'gray'
                              : token.category === 'base'
                              ? 'brand'
                              : token.category === 'layout'
                              ? 'blue'
                              : 'purple'
                          }
                          size="xs"
                        >
                          {token.category.toUpperCase()}
                        </NeuronBadge>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontFamily: 'monospace' }}>
                          {token.tailwind}
                        </span>
                      </div>
                    </div>

                    {/* Column 2: Dimensions */}
                    <div className="spacing-token-val">
                      {(unitMode === 'both' || unitMode === 'px') && (
                        <span className="spacing-token-px">{token.px}px</span>
                      )}
                      {(unitMode === 'both' || unitMode === 'rem') && (
                        <span className="spacing-token-rem">{token.rem}</span>
                      )}
                    </div>

                    {/* Column 3: Visual Track & Bar */}
                    <div className="spacing-bar-container">
                      <div className="spacing-visual-track">
                        <div
                          className="spacing-visual-fill"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Column 4: Role & Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <p className="spacing-token-role">
                        {isId ? token.roleId : token.roleEn}
                      </p>
                      <div className="spacing-token-actions">
                        <NeuronButton
                          variant="secondary"
                          size="xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(`var(${token.name})`);
                          }}
                          leadingIcon={<Copy size={11} />}
                        >
                          CSS
                        </NeuronButton>
                        <NeuronButton
                          variant="outline"
                          size="xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(`${token.px}px`);
                          }}
                        >
                          {token.px}px
                        </NeuronButton>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2: SIMULATOR SPASIAL INTERAKTIF (Interactive Playground)
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'simulator' && (
        <div className="spacing-simulator-wrapper">
          {/* Controls Panel */}
          <div className="spacing-sim-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={16} color="var(--color-primary, #df7e30)" />
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Kontrol Parameter Spasi' : 'Spacing Controls'}
                </h3>
              </div>
              <NeuronButton
                variant="text"
                size="xs"
                onClick={() => {
                  setPaddingIndex(5);
                  setGapIndex(3);
                  setShowRulers(true);
                  setSimMode('card');
                }}
                leadingIcon={<RotateCcw size={12} />}
              >
                Reset
              </NeuronButton>
            </div>

            {/* Layout Mode Selector */}
            <div className="spacing-sim-control-group">
              <label className="spacing-sim-control-label">
                <span>{isId ? 'Mode Tata Letak Kontainer:' : 'Container Layout Mode:'}</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                <button
                  type="button"
                  className={`spacing-cat-chip ${simMode === 'card' ? 'active' : ''}`}
                  onClick={() => setSimMode('card')}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  <Box size={13} style={{ marginRight: 4 }} />
                  Card Inset
                </button>
                <button
                  type="button"
                  className={`spacing-cat-chip ${simMode === 'stack' ? 'active' : ''}`}
                  onClick={() => setSimMode('stack')}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  <ArrowUpDown size={13} style={{ marginRight: 4 }} />
                  Stack
                </button>
                <button
                  type="button"
                  className={`spacing-cat-chip ${simMode === 'inline' ? 'active' : ''}`}
                  onClick={() => setSimMode('inline')}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  <ArrowLeftRight size={13} style={{ marginRight: 4 }} />
                  Inline
                </button>
              </div>
            </div>

            {/* Padding Slider */}
            <div className="spacing-sim-control-group">
              <div className="spacing-sim-control-label">
                <span>{isId ? 'Padding / Inset Kontainer:' : 'Container Padding (Inset):'}</span>
                <span className="spacing-sim-control-val">
                  {activePaddingToken.name} ({activePaddingToken.px}px)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="8" // up to --space-12
                step="1"
                value={paddingIndex}
                onChange={(e) => setPaddingIndex(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary, #df7e30)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                <span>4px (p-1)</span>
                <span>16px (p-4)</span>
                <span>48px (p-12)</span>
              </div>
            </div>

            {/* Gap Slider */}
            <div className="spacing-sim-control-group">
              <div className="spacing-sim-control-label">
                <span>{isId ? 'Celah / Spasi Item (Gap):' : 'Item Spacing (Gap):'}</span>
                <span className="spacing-sim-control-val">
                  {activeGapToken.name} ({activeGapToken.px}px)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="6" // up to --space-8
                step="1"
                value={gapIndex}
                onChange={(e) => setGapIndex(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary, #df7e30)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                <span>4px (gap-1)</span>
                <span>16px (gap-4)</span>
                <span>32px (gap-8)</span>
              </div>
            </div>

            {/* Rulers Toggle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={15} color="var(--color-text-secondary)" />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Tampilkan Garis Ukur Spasial' : 'Visual Box Model Rulers'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={showRulers}
                onChange={(e) => setShowRulers(e.target.checked)}
                style={{ cursor: 'pointer', accentColor: 'var(--color-primary)' }}
              />
            </div>
          </div>

          {/* Canvas & Code Generator */}
          <div className="spacing-sim-canvas-wrap">
            <div className="spacing-sim-canvas-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Maximize2 size={15} color="var(--color-primary)" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Pratinjau Langsung Komponen' : 'Live Interactive Canvas'}
                </span>
                {showRulers && (
                  <NeuronBadge variant="brand" size="xs">
                    RULERS ACTIVE
                  </NeuronBadge>
                )}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                Padding: <strong style={{ color: 'var(--color-primary)' }}>{activePaddingToken.px}px</strong> · Gap:{' '}
                <strong style={{ color: 'var(--color-primary)' }}>{activeGapToken.px}px</strong>
              </div>
            </div>

            {/* Stage */}
            <div className="spacing-sim-canvas-stage">
              <div
                className="spacing-box-model-preview"
                style={{
                  padding: `${activePaddingToken.px}px`,
                  backgroundColor: showRulers ? 'rgba(223, 126, 48, 0.08)' : 'transparent',
                  border: showRulers ? '2px dashed rgba(223, 126, 48, 0.45)' : '1px solid var(--color-border)',
                }}
              >
                {/* Rulers Floating Label */}
                {showRulers && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 4,
                      left: 8,
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: 'var(--color-primary, #df7e30)',
                      pointerEvents: 'none',
                    }}
                  >
                    PADDING ZONE: {activePaddingToken.name} ({activePaddingToken.px}px)
                  </span>
                )}

                {/* Card Mode Content */}
                {simMode === 'card' && (
                  <div
                    className="spacing-box-model-content"
                    style={{
                      padding: '24px',
                      width: '380px',
                      maxWidth: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: `${activeGapToken.px}px`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <NeuronBadge variant="brand" size="xs">
                        FEATURE SPOTLIGHT
                      </NeuronBadge>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>14 Okt 2026</span>
                    </div>

                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                      {isId ? 'Kartu Transaksi Digital' : 'Digital Transaction Card'}
                    </h4>

                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {isId
                        ? 'Kartu ini menggunakan spasi adaptif untuk menjaga keterbacaan teks dan kenyamanan interaksi pengguna.'
                        : 'This card applies adaptive spacing tokens to preserve optical hierarchy and touch target ergonomics.'}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '8px' }}>
                      <NeuronButton variant="primary" size="sm">
                        {isId ? 'Detail Tagihan' : 'View Invoice'}
                      </NeuronButton>
                      <NeuronButton variant="secondary" size="sm">
                        {isId ? 'Unduh PDF' : 'Download'}
                      </NeuronButton>
                    </div>
                  </div>
                )}

                {/* Stack Mode Content */}
                {simMode === 'stack' && (
                  <div
                    className="spacing-box-model-content"
                    style={{
                      padding: '24px',
                      width: '360px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: `${activeGapToken.px}px`,
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Nama Lengkap Karyawan' : 'Full Employee Name'}
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="Iqbal Dzulfaqar"
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-bg-canvas)',
                          fontSize: '13px',
                          color: 'var(--color-text-primary)',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Divisi / Departemen' : 'Division / Department'}
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="Design System & Core Architecture"
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-bg-canvas)',
                          fontSize: '13px',
                          color: 'var(--color-text-primary)',
                        }}
                      />
                    </div>

                    <NeuronButton variant="primary" size="sm" style={{ width: '100%', marginTop: '4px' }}>
                      {isId ? 'Simpan Perubahan Profil' : 'Save Profile Changes'}
                    </NeuronButton>
                  </div>
                )}

                {/* Inline Mode Content */}
                {simMode === 'inline' && (
                  <div
                    className="spacing-box-model-content"
                    style={{
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: `${activeGapToken.px}px`,
                    }}
                  >
                    <NeuronButton variant="primary" size="sm">
                      {isId ? 'Aksi Utama' : 'Primary Action'}
                    </NeuronButton>
                    <NeuronButton variant="secondary" size="sm">
                      {isId ? 'Sekunder' : 'Secondary'}
                    </NeuronButton>
                    <NeuronButton variant="outline" size="sm">
                      {isId ? 'Batal' : 'Cancel'}
                    </NeuronButton>
                    <NeuronBadge variant="brand" size="sm">
                      {isId ? 'Aktif' : 'Active'}
                    </NeuronBadge>
                  </div>
                )}
              </div>
            </div>

            {/* Code Output Drawer */}
            <div style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-canvas)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 16px',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code2 size={14} color="var(--color-text-secondary)" />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Kode Implementasi Hasil Generator:' : 'Implementation Code:'}
                  </span>
                  <div className="spacing-unit-pills">
                    <button
                      type="button"
                      className={`spacing-unit-btn ${codeType === 'css' ? 'active' : ''}`}
                      onClick={() => setCodeType('css')}
                    >
                      CSS Token
                    </button>
                    <button
                      type="button"
                      className={`spacing-unit-btn ${codeType === 'tailwind' ? 'active' : ''}`}
                      onClick={() => setCodeType('tailwind')}
                    >
                      Tailwind
                    </button>
                    <button
                      type="button"
                      className={`spacing-unit-btn ${codeType === 'react' ? 'active' : ''}`}
                      onClick={() => setCodeType('react')}
                    >
                      React Style
                    </button>
                  </div>
                </div>

                <NeuronButton
                  variant="secondary"
                  size="xs"
                  leadingIcon={<Copy size={12} />}
                  onClick={() => copyToClipboard(generatedSimCode, isId ? 'Kode berhasil disalin' : 'Code copied to clipboard')}
                >
                  {isId ? 'Salin Kode' : 'Copy Code'}
                </NeuronButton>
              </div>

              <pre
                style={{
                  margin: 0,
                  padding: '16px',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'var(--color-bg-canvas)',
                  overflowX: 'auto',
                }}
              >
                <code>{generatedSimCode}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 3: POLA SEMANTIK & INSET (Semantic Patterns & Insets)
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'patterns' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Section 1: Inset Archetypes */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '1. Arketipe Inset (Padding Kontainer)' : '1. Inset Archetypes (Container Padding)'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Inset menentukan ruang bernapas internal di antara batas tepi kontainer (border) dan elemen anak di dalamnya. Neudela membaginya menjadi tiga pola matematis.'
                : 'Insets determine internal breathing room between container boundaries and children elements. Neudela categorizes them into three mathematical patterns.'}
            </p>

            <div className="spacing-archetypes-grid">
              {/* Pattern A: Square Inset */}
              <div className="spacing-archetype-card">
                <div className="spacing-archetype-preview">
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '12px',
                      border: '2px dashed var(--color-primary)',
                      backgroundColor: 'rgba(223, 126, 48, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '6px',
                        backgroundColor: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                      }}
                    >
                      16 × 16
                    </div>
                  </div>
                </div>
                <div className="spacing-archetype-body">
                  <h4 className="spacing-archetype-title">
                    {isId ? 'Square Inset (Spasi Simetris)' : 'Square Inset (Symmetric)'}
                  </h4>
                  <p className="spacing-archetype-desc">
                    {isId
                      ? 'Nilai padding yang sama rata di keempat sisi (top = right = bottom = left). Ideal untuk Card konten, Modal dialog, dan sel tabel.'
                      : 'Equal padding on all four edges. Ideal for content cards, modal dialogs, and table cells.'}
                  </p>
                  <div className="spacing-archetype-tokens">
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginRight: '4px' }}>
                      Token:
                    </span>
                    <NeuronBadge variant="brand" size="xs">
                      --space-4 (16px)
                    </NeuronBadge>
                    <NeuronBadge variant="brand" size="xs">
                      --space-6 (24px)
                    </NeuronBadge>
                  </div>
                </div>
              </div>

              {/* Pattern B: Squish Inset */}
              <div className="spacing-archetype-card">
                <div className="spacing-archetype-preview">
                  <div
                    style={{
                      width: '160px',
                      height: '70px',
                      borderRadius: '10px',
                      border: '2px dashed #10b981',
                      backgroundColor: 'rgba(16, 185, 129, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 16px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '6px',
                        backgroundColor: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#10b981',
                      }}
                    >
                      8px V / 16px H
                    </div>
                  </div>
                </div>
                <div className="spacing-archetype-body">
                  <h4 className="spacing-archetype-title">
                    {isId ? 'Squish Inset (Penekanan Vertikal)' : 'Squish Inset (Vertical Compression)'}
                  </h4>
                  <p className="spacing-archetype-desc">
                    {isId
                      ? 'Padding vertikal lebih ramping dibanding horizontal (rasio 1:2). Wajib untuk tombol interaktif, pill badge, dan form input agar teks tampak seimbang secara optik.'
                      : 'Vertical padding is reduced compared to horizontal padding (1:2 ratio). Mandatory for buttons, badges, and inputs for optical font balance.'}
                  </p>
                  <div className="spacing-archetype-tokens">
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginRight: '4px' }}>
                      Token:
                    </span>
                    <NeuronBadge variant="success" size="xs">
                      var(--space-2) var(--space-4)
                    </NeuronBadge>
                  </div>
                </div>
              </div>

              {/* Pattern C: Stretch Inset */}
              <div className="spacing-archetype-card">
                <div className="spacing-archetype-preview">
                  <div
                    style={{
                      width: '90px',
                      height: '130px',
                      borderRadius: '10px',
                      border: '2px dashed #8b5cf6',
                      backgroundColor: 'rgba(139, 92, 246, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px 12px',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '6px',
                        backgroundColor: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#8b5cf6',
                        textAlign: 'center',
                        lineHeight: 1.2,
                      }}
                    >
                      24px V<br />12px H
                    </div>
                  </div>
                </div>
                <div className="spacing-archetype-body">
                  <h4 className="spacing-archetype-title">
                    {isId ? 'Stretch Inset (Penekanan Horizontal)' : 'Stretch Inset (Horizontal Compression)'}
                  </h4>
                  <p className="spacing-archetype-desc">
                    {isId
                      ? 'Padding vertikal sengaja dibuat lebih luas dibanding horizontal. Digunakan pada sidebar item yang tinggi atau card vertikal editorial.'
                      : 'Vertical padding exceeds horizontal padding. Applied on tall navigation rail items and editorial card layouts.'}
                  </p>
                  <div className="spacing-archetype-tokens">
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginRight: '4px' }}>
                      Token:
                    </span>
                    <NeuronBadge variant="purple" size="xs">
                      var(--space-6) var(--space-3)
                    </NeuronBadge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Stack & Inline Spacing */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '2. Spasi Stack (Vertikal) & Inline (Horizontal)' : '2. Stack (Vertical) & Inline (Horizontal) Spacing'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Gunakan properti CSS modern `gap: var(--space-*)` untuk mengatur aliran hierarki konten tanpa bergantung pada margin yang rapuh.'
                : 'Apply modern CSS `gap: var(--space-*)` to organize content hierarchy without relying on fragile margin collapsibility.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
              <div
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl, 16px)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ArrowUpDown size={16} color="var(--color-primary, #df7e30)" />
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Stack Spacing (Aliran Vertikal)
                  </h4>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {isId
                    ? 'Spasi antar elemen yang ditumpuk secara vertikal. Semakin dekat hubungan semantik dua elemen, semakin rapat jarak stack-nya.'
                    : 'Spacing between vertically stacked elements. Tighter relationships require smaller stack distances.'}
                </p>
                <div
                  style={{
                    background: 'var(--color-bg-canvas)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Judul ke Sub-judul: <strong style={{ color: 'var(--color-primary)' }}>--space-1 sd --space-2 (4–8px)</strong>
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Label ke Input Form: <strong style={{ color: 'var(--color-primary)' }}>--space-2 (8px)</strong>
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Antar Field Formulir: <strong style={{ color: 'var(--color-primary)' }}>--space-4 sd --space-5 (16–20px)</strong>
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Antar Seksi Konten: <strong style={{ color: 'var(--color-primary)' }}>--space-8 sd --space-12 (32–48px)</strong>
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl, 16px)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ArrowLeftRight size={16} color="var(--color-primary, #df7e30)" />
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Inline Spacing (Aliran Baris)
                  </h4>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {isId
                    ? 'Spasi horizontal di antara elemen sebaris (inline/flex-row). Menjaga keterikatan visual antar tombol, ikon, atau badge.'
                    : 'Horizontal spacing between elements on the same row. Maintains visual association between icons, badges, and action buttons.'}
                </p>
                <div
                  style={{
                    background: 'var(--color-bg-canvas)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Ikon ke Label Teks: <strong style={{ color: 'var(--color-primary)' }}>--space-2 (8px)</strong>
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Antar Tombol Aksi: <strong style={{ color: 'var(--color-primary)' }}>--space-3 sd --space-4 (12–16px)</strong>
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Celah Tag / Chips: <strong style={{ color: 'var(--color-primary)' }}>--space-2 (8px)</strong>
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Breadcrumb Separator: <strong style={{ color: 'var(--color-primary)' }}>--space-2 (8px)</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 4: PANDUAN PENERAPAN (Do & Don't Guidelines)
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'guidelines' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Pair 1: Tokens vs Hardcoded Values */}
          <div className="spacing-dodont-pair">
            <RuleCard type="do">
              <div className="spacing-visual-frame">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <NeuronBadge variant="success" size="md">
                    padding: var(--space-4) /* 16px */
                  </NeuronBadge>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    {isId ? 'Terhubung langsung ke sistem token 8pt' : 'Directly bound to 8pt token system'}
                  </span>
                </div>
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Gunakan Token Resmi Spasi Neudela' : 'Always Use Official Neudela Spacing Tokens'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {isId
                    ? 'Selalu gunakan token `--space-1` hingga `--space-24`. Hal ini menjamin seluruh UI konsisten dan dapat beradaptasi secara global saat tema atau skala diubah.'
                    : 'Always use `--space-1` through `--space-24` tokens. This guarantees interface consistency and makes global scaling seamless.'}
                </p>
              </div>
            </RuleCard>

            <RuleCard type="dont">
              <div className="spacing-visual-frame">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <NeuronBadge variant="error" size="md">
                    padding: 13px; margin: 19px;
                  </NeuronBadge>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    {isId ? 'Nilai acak merusak ritme optik' : 'Arbitrary values destroy optical rhythm'}
                  </span>
                </div>
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Hindari Nilai Pixel Sembarang (Hardcoded)' : 'Avoid Arbitrary Hardcoded Pixel Values'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {isId
                    ? 'Jangan gunakan angka pixel sembarang seperti 11px, 13px, 17px, atau 23px. Angka ganjil memicu subpixel rendering blur pada layar retina non-skala.'
                    : 'Never hardcode arbitrary pixel values like 11px, 13px, 17px, or 23px. Odd pixel values introduce blur and subpixel raster artifacts.'}
                </p>
              </div>
            </RuleCard>
          </div>

          {/* Pair 2: Flexbox/Grid Gap vs Outer Margin */}
          <div className="spacing-dodont-pair">
            <RuleCard type="do">
              <div className="spacing-visual-frame">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '8px 12px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '11px' }}>
                    Item 1
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--color-primary)', fontWeight: 600 }}>gap: 12px</span>
                  <div style={{ padding: '8px 12px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '11px' }}>
                    Item 2
                  </div>
                </div>
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Gunakan Properti CSS Modern `gap`' : 'Use Modern CSS `gap` Properties'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {isId
                    ? 'Gunakan `gap: var(--space-*)` pada kontainer Flexbox dan Grid. Celah otomatis diterapkan hanya di antara elemen, tanpa margin sisa di tepi.'
                    : 'Use `gap: var(--space-*)` on Flexbox and Grid layouts. Spacing is automatically applied between elements without trailing margin leaks.'}
                </p>
              </div>
            </RuleCard>

            <RuleCard type="dont">
              <div className="spacing-visual-frame">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ padding: '8px 12px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '11px', marginRight: '16px' }}>
                    margin-right: 16px
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--color-bg-surface)', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '11px', marginRight: '16px' }}>
                    margin-right (bocor)
                  </div>
                </div>
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Hindari Margin Manual pada Child Elements' : 'Avoid Manual Margins on Child Elements'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {isId
                    ? 'Hindari pemberian `margin-right` atau `margin-bottom` manual pada item anak yang memerlukan selector khusus `:last-child` untuk menghilangkan jarak di ujung.'
                    : 'Avoid applying manual margins to children that require brittle `:last-child` resets to prevent layout overflow.'}
                </p>
              </div>
            </RuleCard>
          </div>

          {/* Pair 3: Squish Inset for Buttons */}
          <div className="spacing-dodont-pair">
            <RuleCard type="do">
              <div className="spacing-visual-frame">
                <NeuronButton variant="primary" size="md">
                  {isId ? 'Tombol Squish (8px × 16px)' : 'Squish Button (8px × 16px)'}
                </NeuronButton>
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Terapkan Squish Inset pada Tombol' : 'Apply Squish Insets on Buttons'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {isId
                    ? 'Tombol dan badge harus memiliki padding samping yang lebih lebar (rasio 1:2) agar proporsi bentuk tombol seimbang terhadap huruf kapital.'
                    : 'Buttons and interactive chips must have wider horizontal padding (1:2 ratio) to optically balance typography ascenders and descenders.'}
                </p>
              </div>
            </RuleCard>

            <RuleCard type="dont">
              <div className="spacing-visual-frame">
                <button
                  type="button"
                  style={{
                    padding: '24px 24px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                  }}
                >
                  {isId ? 'Square Button (24px × 24px)' : 'Square Button (24px × 24px)'}
                </button>
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Hindari Square Inset Berlebihan pada Tombol' : 'Avoid Overly Tall Square Button Insets'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {isId
                    ? 'Jangan gunakan square padding yang terlalu tinggi pada tombol. Tombol akan tampak menggembung, canggung, dan memakan ruang vertikal secara berlebihan.'
                    : 'Do not use excessive square padding on text buttons. It creates bulky, unpolished components that consume unnecessary vertical rhythm.'}
                </p>
              </div>
            </RuleCard>
          </div>

          {/* Pair 4: Law of Proximity */}
          <div className="spacing-dodont-pair">
            <RuleCard type="do">
              <div className="spacing-visual-frame">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '220px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Email Perusahaan
                  </span>
                  <div style={{ height: '32px', border: '1px solid var(--color-border)', borderRadius: '6px', background: 'var(--color-bg-surface)' }} />
                  <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                    Jarak label rapat (6px) = terkait erat
                  </span>
                </div>
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Terapkan Prinsip Kedekatan (Law of Proximity)' : 'Apply the Gestalt Law of Proximity'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {isId
                    ? 'Jarak antara elemen yang saling berhubungan (seperti Label dan Input) harus selalu lebih kecil daripada jarak ke grup elemen berikutnya.'
                    : 'Distance between related elements (Label & Input) must always be noticeably smaller than the distance to the next distinct form group.'}
                </p>
              </div>
            </RuleCard>

            <RuleCard type="dont">
              <div className="spacing-visual-frame">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '220px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Email Perusahaan
                  </span>
                  <div style={{ height: '32px', border: '1px solid #ef4444', borderRadius: '6px', background: 'var(--color-bg-surface)' }} />
                  <span style={{ fontSize: '10px', color: '#ef4444' }}>Jarak terlalu jauh (24px) = hubungan terputus</span>
                </div>
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Hindari Spasi Seragam Tanpa Hierarki' : 'Avoid Monolithic Spacing Without Hierarchy'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {isId
                    ? 'Jangan gunakan jarak yang sama rata di mana-mana. Jika jarak label ke input sama besarnya dengan jarak antar section, pengguna akan kesulitan membedakan keterikatan data.'
                    : 'Do not use identical spacing uniformly. When intra-field distance equals inter-section distance, users lose visual grouping comprehension.'}
                </p>
              </div>
            </RuleCard>
          </div>
        </div>
      )}

      {/* ── Navigation Footer ── */}
      <NextPrevious
        prev={{ id: 'icons', label: isId ? 'Ikon (Icons)' : 'Icons' }}
        next={{ id: 'typography', label: isId ? 'Tipografi (Typography)' : 'Typography' }}
        setActiveTab={setActiveTab}
      />

      {/* ── Global Toast Notification ── */}
      <div className={`copy-toast ${showToast ? 'show' : ''}`}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {toastMsg}
      </div>
    </div>
  );
}
