import { useState, useMemo, useEffect, ReactNode } from 'react';
import {
  Type,
  Maximize2,
  Copy,
  RotateCcw,
  SlidersHorizontal,
  Layers,
  CheckCircle2,
  XCircle,
  Code2,
  Search,
  Monitor,
  Smartphone,
  AlignLeft,
  AlignCenter,
  AlignRight,
  X,
} from 'lucide-react';
import NeuronButton from '../../components/NeuronButton';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronInput from '../../components/NeuronInput';
import NextPrevious from '../../components/NextPrevious';
import { useLanguage } from '../../context/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Definitions
// ─────────────────────────────────────────────────────────────────────────────

interface TypographyProps {
  setActiveTab: (tabId: string) => void;
}

export interface TypoScaleItem {
  name: string;
  category: 'display' | 'text';
  varName: string;
  lhVarName: string;
  deskSizePx: number;
  deskSizeRem: string;
  deskLhPx: number;
  deskLhRem: string;
  mobSizePx: number;
  mobSizeRem: string;
  mobLhPx: number;
  mobLhRem: string;
  tailwind: string;
  roleId: string;
  roleEn: string;
  commonUseId: string;
  commonUseEn: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Master Typography Scale (11 Calibrated Scales)
// ─────────────────────────────────────────────────────────────────────────────

const TYPOGRAPHY_SCALES: TypoScaleItem[] = [
  {
    name: 'Display 2xl',
    category: 'display',
    varName: '--fs-display-2xl',
    lhVarName: '--lh-display-2xl',
    deskSizePx: 72,
    deskSizeRem: '4.5rem',
    deskLhPx: 90,
    deskLhRem: '5.625rem',
    mobSizePx: 44,
    mobSizeRem: '2.75rem',
    mobLhPx: 56,
    mobLhRem: '3.5rem',
    tailwind: 'text-7xl / leading-tight',
    roleId: 'Judul display monumental hero halaman beranda dan landing page utama.',
    roleEn: 'Monumental hero display title for marketing landing pages and splash banners.',
    commonUseId: 'Headline hero utama, angka pencapaian stat landing',
    commonUseEn: 'Hero headline, monumental landing metrics',
  },
  {
    name: 'Display xl',
    category: 'display',
    varName: '--fs-display-xl',
    lhVarName: '--lh-display-xl',
    deskSizePx: 60,
    deskSizeRem: '3.75rem',
    deskLhPx: 72,
    deskLhRem: '4.5rem',
    mobSizePx: 36,
    mobSizeRem: '2.25rem',
    mobLhPx: 44,
    mobLhRem: '2.75rem',
    tailwind: 'text-6xl / leading-tight',
    roleId: 'Judul seksi hero besar atau tajuk utama halaman promosi.',
    roleEn: 'Major hero section title or promotional campaign headline.',
    commonUseId: 'Banner promosi, seksi kampanye produk',
    commonUseEn: 'Promotional banners, product campaign sections',
  },
  {
    name: 'Display lg',
    category: 'display',
    varName: '--fs-display-lg',
    lhVarName: '--lh-display-lg',
    deskSizePx: 48,
    deskSizeRem: '3rem',
    deskLhPx: 60,
    deskLhRem: '3.75rem',
    mobSizePx: 32,
    mobSizeRem: '2rem',
    mobLhPx: 40,
    mobLhRem: '2.5rem',
    tailwind: 'text-5xl / leading-tight',
    roleId: 'Header level 1 (h1) untuk halaman aplikasi, dashboard utama, dan dokumen penting.',
    roleEn: 'Heading level 1 (h1) for application modules, main dashboards, and primary docs.',
    commonUseId: 'H1 page title modul besar, judul dashboard analitik',
    commonUseEn: 'H1 major module page title, analytics dashboard headline',
  },
  {
    name: 'Display md',
    category: 'display',
    varName: '--fs-display-md',
    lhVarName: '--lh-display-md',
    deskSizePx: 36,
    deskSizeRem: '2.25rem',
    deskLhPx: 44,
    deskLhRem: '2.75rem',
    mobSizePx: 28,
    mobSizeRem: '1.75rem',
    mobLhPx: 36,
    mobLhRem: '2.25rem',
    tailwind: 'text-4xl / leading-snug',
    roleId: 'Header level 2 (h2) untuk memisahkan bab/seksi besar dalam halaman.',
    roleEn: 'Heading level 2 (h2) for separating major thematic sections within a page.',
    commonUseId: 'H2 judul seksi, sub-header dashboard',
    commonUseEn: 'H2 section titles, dashboard sub-headers',
  },
  {
    name: 'Display sm',
    category: 'display',
    varName: '--fs-display-sm',
    lhVarName: '--lh-display-sm',
    deskSizePx: 30,
    deskSizeRem: '1.875rem',
    deskLhPx: 38,
    deskLhRem: '2.375rem',
    mobSizePx: 24,
    mobSizeRem: '1.5rem',
    mobLhPx: 32,
    mobLhRem: '2rem',
    tailwind: 'text-3xl / leading-snug',
    roleId: 'Header level 3 (h3) untuk judul kartu modul besar, dialog modal, dan drawer.',
    roleEn: 'Heading level 3 (h3) for large module cards, modal dialogs, and drawer panels.',
    commonUseId: 'Modal title, judul kartu analitik, widget header',
    commonUseEn: 'Modal titles, analytics card titles, widget headers',
  },
  {
    name: 'Display xs',
    category: 'display',
    varName: '--fs-display-xs',
    lhVarName: '--lh-display-xs',
    deskSizePx: 24,
    deskSizeRem: '1.5rem',
    deskLhPx: 32,
    deskLhRem: '2rem',
    mobSizePx: 20,
    mobSizeRem: '1.25rem',
    mobLhPx: 28,
    mobLhRem: '1.75rem',
    tailwind: 'text-2xl / leading-normal',
    roleId: 'Header level 4 (h4) untuk judul kartu konten standar dan panel tabel.',
    roleEn: 'Heading level 4 (h4) for standard content cards and data panel titles.',
    commonUseId: 'Card title standar, panel header, empty state title',
    commonUseEn: 'Standard card titles, panel headers, empty state titles',
  },
  {
    name: 'Text xl',
    category: 'text',
    varName: '--fs-text-xl',
    lhVarName: '--lh-text-xl',
    deskSizePx: 20,
    deskSizeRem: '1.25rem',
    deskLhPx: 30,
    deskLhRem: '1.875rem',
    mobSizePx: 18,
    mobSizeRem: '1.125rem',
    mobLhPx: 28,
    mobLhRem: '1.75rem',
    tailwind: 'text-xl / leading-relaxed',
    roleId: 'Teks lead / pembuka paragraf atau sub-judul pengantar artikel.',
    roleEn: 'Lead introductory paragraph text or article sub-header paragraph.',
    commonUseId: 'Paragraf lead, ringkasan awal fitur, intro blog',
    commonUseEn: 'Lead paragraphs, feature summary, blog intro',
  },
  {
    name: 'Text lg',
    category: 'text',
    varName: '--fs-text-lg',
    lhVarName: '--lh-text-lg',
    deskSizePx: 18,
    deskSizeRem: '1.125rem',
    deskLhPx: 28,
    deskLhRem: '1.75rem',
    mobSizePx: 16,
    mobSizeRem: '1rem',
    mobLhPx: 24,
    mobLhRem: '1.5rem',
    tailwind: 'text-lg / leading-relaxed',
    roleId: 'Teks deskripsi utama kartu dan tombol berukuran besar (Button Large).',
    roleEn: 'Prominent card description text and Large Button typography.',
    commonUseId: 'Button large, kartu deskripsi, sub-teks form',
    commonUseEn: 'Large buttons, prominent descriptions, form subtext',
  },
  {
    name: 'Text md',
    category: 'text',
    varName: '--fs-text-md',
    lhVarName: '--lh-text-md',
    deskSizePx: 16,
    deskSizeRem: '1rem',
    deskLhPx: 24,
    deskLhRem: '1.5rem',
    mobSizePx: 14,
    mobSizeRem: '0.875rem',
    mobLhPx: 20,
    mobLhRem: '1.25rem',
    tailwind: 'text-base / leading-normal',
    roleId: 'STANDAR UTAMA (Body Regular): ukuran default untuk tombol, input form, dan teks isi.',
    roleEn: 'DEFAULT BASELINE (Body Regular): default size for buttons, inputs, and paragraphs.',
    commonUseId: 'Body copy, input form, tombol standar, isi tabel',
    commonUseEn: 'Body copy, form inputs, standard buttons, table rows',
  },
  {
    name: 'Text sm',
    category: 'text',
    varName: '--fs-text-sm',
    lhVarName: '--lh-text-sm',
    deskSizePx: 14,
    deskSizeRem: '0.875rem',
    deskLhPx: 20,
    deskLhRem: '1.25rem',
    mobSizePx: 12,
    mobSizeRem: '0.75rem',
    mobLhPx: 18,
    mobLhRem: '1.125rem',
    tailwind: 'text-sm / leading-normal',
    roleId: 'Teks sekunder: label input form, data table padat, dan teks bantuan (helper).',
    roleEn: 'Secondary UI text: form input labels, dense table data, and helper text.',
    commonUseId: 'Label formulir, tombol kecil (Button Sm), sub-keterangan',
    commonUseEn: 'Form labels, small buttons (Button Sm), helper text',
  },
  {
    name: 'Text xs',
    category: 'text',
    varName: '--fs-text-xs',
    lhVarName: '--lh-text-xs',
    deskSizePx: 12,
    deskSizeRem: '0.75rem',
    deskLhPx: 18,
    deskLhRem: '1.125rem',
    mobSizePx: 11,
    mobSizeRem: '0.6875rem',
    mobLhPx: 16,
    mobLhRem: '1rem',
    tailwind: 'text-xs / leading-tight',
    roleId: 'Teks mikro: badge tag, timestamp waktu, tooltip, dan catatan hak cipta legal.',
    roleEn: 'Micro text: badge tags, timestamp metadata, tooltips, and legal copyright.',
    commonUseId: 'Badge chip, waktu audit, tooltip teks, copyright footer',
    commonUseEn: 'Badge chips, audit timestamps, tooltip text, footer copyright',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Do & Don't Rule Card Component
// ─────────────────────────────────────────────────────────────────────────────

function RuleCard({ type, children }: { type: 'do' | 'dont'; children: ReactNode }) {
  const isDo = type === 'do';
  return (
    <div className={`rule-card rule-card--${type}`}>
      <div className="rule-card__badge">
        {isDo ? (
          <CheckCircle2 size={14} strokeWidth={2.5} />
        ) : (
          <XCircle size={14} strokeWidth={2.5} />
        )}
        <span>{isDo ? 'DO' : "DON'T"}</span>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Typography View Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Typography({ setActiveTab }: TypographyProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  // Sub-tabs: 'scale' | 'tester' | 'specs' | 'guidelines'
  const [activeSubTab, setActiveSubTab] = useState<'scale' | 'tester' | 'specs' | 'guidelines'>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('tester') || hash.includes('playground')) return 'tester';
    if (hash.includes('specs') || hash.includes('anatomy')) return 'specs';
    if (hash.includes('guidelines') || hash.includes('dodont')) return 'guidelines';
    return 'scale';
  });

  const handleSubTabChange = (tab: 'scale' | 'tester' | 'specs' | 'guidelines') => {
    setActiveSubTab(tab);
    const targetHash = tab === 'scale' ? '#typography' : `#typography-${tab}`;
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'display' | 'text'>('all');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  const filteredScales = useMemo(() => {
    return TYPOGRAPHY_SCALES.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.varName.toLowerCase().includes(q) ||
        item.deskSizePx.toString().includes(q) ||
        item.roleId.toLowerCase().includes(q) ||
        item.roleEn.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Tab 2 (Type Tester) States
  const [testText, setTestText] = useState(
    'Neudela Design System: Multi-brand design language for enterprise products'
  );
  const [fontFamilyMode, setFontFamilyMode] = useState<'sans' | 'mono'>('sans');
  const [fontWeight, setFontWeight] = useState<number>(600);
  const [lineHeightMultiplier, setLineHeightMultiplier] = useState<'tight' | 'normal' | 'relaxed'>('normal');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [testerViewport, setTesterViewport] = useState<'desktop' | 'mobile'>('desktop');

  const samplePresets = [
    'Neudela Design System: Multi-brand design language for enterprise products',
    'The quick brown fox jumps over the lazy dog 1234567890',
    'Keterbacaan optimal pada seluruh resolusi dan rasio kontras WCAG 2.1',
    'Transformasi digital dengan arsitektur modular terstandarisasi',
  ];

  return (
    <div className="typography-view-container">
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
          <Type size={14} strokeWidth={2.4} />
          {isId ? 'SISTEM FOUNDATION' : 'FOUNDATION SYSTEM'}
        </span>
        <h1 className="page-title">{isId ? 'Tipografi (Typography)' : 'Typography'}</h1>
        <p className="page-subtitle">
          {isId
            ? 'Sistem tipografi Neudela dirancang dengan rasio modular terkalibrasi untuk menghadirkan hierarki visual yang jelas, ritme baca yang ergonomis, serta tingkat keterbacaan optimal di seluruh perangkat desktop dan seluler dengan kepatuhan kontras WCAG 2.1.'
            : 'The Neudela typographic system is built on a calibrated modular scale delivering clear visual hierarchy, ergonomic reading rhythm, and superior legibility across desktop and mobile viewports with certified WCAG 2.1 contrast compliance.'}
        </p>

        {/* Header Stats Pills */}
        <div className="typography-header-stats">
          <span className="typography-stat-pill">
            <Type size={13} color="#df7e30" />
            <span>{isId ? 'Keluarga Huruf:' : 'Typefaces:'}</span>
            <strong>Inter &amp; JetBrains Mono</strong>
          </span>
          <span className="typography-stat-pill">
            <Layers size={13} color="#df7e30" />
            <span>{isId ? 'Skala Hirarki:' : 'Hierarchy Scales:'}</span>
            <strong>11 {isId ? 'Tingkat' : 'Levels'} (6 Display + 5 Body)</strong>
          </span>
          <span className="typography-stat-pill">
            <Monitor size={13} color="#df7e30" />
            <span>{isId ? 'Skala Responsif:' : 'Responsive Scaling:'}</span>
            <strong>Fluid Desktop &amp; Mobile</strong>
          </span>
          <span className="typography-stat-pill">
            <CheckCircle2 size={13} color="#10b981" />
            <span>{isId ? 'Bobot Standar:' : 'Standard Weights:'}</span>
            <strong>400, 500, 600, 700</strong>
          </span>
        </div>

        {/* Main Tab Switcher */}
        <div className="comp-tab-bar" style={{ marginTop: 'var(--space-4, 16px)' }}>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'scale' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('scale')}
          >
            {isId ? 'Skala & Token Huruf' : 'Typography Scale & Tokens'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'tester' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('tester')}
          >
            {isId ? 'Type Tester & Playground' : 'Type Tester & Playground'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'specs' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('specs')}
          >
            {isId ? 'Spesifikasi Font & Bobot' : 'Font Specs & Anatomy'}
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
          TAB 1: SKALA & TOKEN HURUF (Typography Scale & Tokens)
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'scale' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Toolbar */}
          <div className="typography-toolbar">
            <div className="typography-toolbar-top">
              {/* Search Bar */}
              <div className="typography-search-wrap">
                <NeuronInput
                  placeholder={
                    isId
                      ? 'Cari skala (misal: Display lg, 36px, --fs-text-md)...'
                      : 'Search scale (e.g. Display lg, 36px, --fs-text-md)...'
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

              {/* Viewport Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  {isId ? 'Resolusi Viewport:' : 'Viewport Mode:'}
                </span>
                <div className="typography-unit-pills">
                  <button
                    type="button"
                    className={`typography-unit-btn ${viewportMode === 'desktop' ? 'active' : ''}`}
                    onClick={() => setViewportMode('desktop')}
                  >
                    <Monitor size={12} style={{ marginRight: 4, verticalAlign: -1 }} />
                    Desktop
                  </button>
                  <button
                    type="button"
                    className={`typography-unit-btn ${viewportMode === 'mobile' ? 'active' : ''}`}
                    onClick={() => setViewportMode('mobile')}
                  >
                    <Smartphone size={12} style={{ marginRight: 4, verticalAlign: -1 }} />
                    Mobile
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="typography-category-chips">
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500, marginRight: '4px' }}>
                {isId ? 'Kelompok Huruf:' : 'Category Filter:'}
              </span>
              {[
                { id: 'all', labelId: 'Semua (11)', labelEn: 'All (11)' },
                { id: 'display', labelId: 'Display & Headings (6)', labelEn: 'Display & Headings (6)' },
                { id: 'text', labelId: 'Body & Teks UI (5)', labelEn: 'Body & UI Text (5)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`typography-cat-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id as any)}
                >
                  {isId ? cat.labelId : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Scale Cards List */}
          <div className="typography-scale-list">
            {filteredScales.length === 0 ? (
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
                  {isId ? 'Skala tipografi tidak ditemukan' : 'No typography scales found'}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  {isId
                    ? `Tidak ada skala yang cocok dengan "${searchQuery}". Coba kata kunci lain.`
                    : `No scales matched "${searchQuery}". Try adjusting your search query.`}
                </p>
              </div>
            ) : (
              filteredScales.map((item) => {
                const activeSizePx = viewportMode === 'desktop' ? item.deskSizePx : item.mobSizePx;
                const activeSizeRem = viewportMode === 'desktop' ? item.deskSizeRem : item.mobSizeRem;
                const activeLhPx = viewportMode === 'desktop' ? item.deskLhPx : item.mobLhPx;

                return (
                  <div
                    key={item.name}
                    className="typography-token-card"
                    onClick={() => copyToClipboard(`var(${item.varName})`, `${item.name} ${isId ? 'tersalin' : 'copied'}`)}
                    title={isId ? 'Klik untuk menyalin token CSS' : 'Click to copy CSS variable'}
                  >
                    {/* Meta info */}
                    <div className="typography-token-meta">
                      <div className="typography-token-name">
                        <span>{item.name}</span>
                        <NeuronBadge
                          variant={item.category === 'display' ? 'brand' : 'blue'}
                          size="xs"
                        >
                          {item.category.toUpperCase()}
                        </NeuronBadge>
                      </div>

                      <div className="typography-token-sizes">
                        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {activeSizePx}px ({activeSizeRem})
                        </span>
                        <span>·</span>
                        <span>LH: {activeLhPx}px</span>
                      </div>

                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontFamily: 'JetBrains Mono, monospace' }}>
                        <code>var({item.varName})</code>
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div className="typography-token-preview">
                      <div
                        style={{
                          fontSize: `${activeSizePx}px`,
                          lineHeight: `${activeLhPx}px`,
                          fontWeight: item.category === 'display' ? 700 : 500,
                          color: 'var(--color-text-primary)',
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: item.category === 'display' ? '-0.02em' : 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Neudela Typography Scale
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                        {isId ? item.roleId : item.roleEn}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="typography-token-actions">
                      <NeuronButton
                        variant="secondary"
                        size="xs"
                        leadingIcon={<Copy size={11} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(`var(${item.varName})`);
                        }}
                      >
                        CSS Var
                      </NeuronButton>
                      <NeuronButton
                        variant="outline"
                        size="xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(item.tailwind);
                        }}
                      >
                        Tailwind
                      </NeuronButton>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2: TYPE TESTER & PLAYGROUND INTERAKTIF
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'tester' && (
        <div className="typography-tester-wrapper">
          {/* Controls Panel */}
          <div className="typography-tester-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={16} color="var(--color-primary, #df7e30)" />
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Kontrol Render Teks' : 'Rendering Controls'}
                </h3>
              </div>
              <NeuronButton
                variant="text"
                size="xs"
                onClick={() => {
                  setTestText('Neudela Design System: Multi-brand design language for enterprise products');
                  setFontFamilyMode('sans');
                  setFontWeight(600);
                  setLineHeightMultiplier('normal');
                  setTextAlign('left');
                  setTesterViewport('desktop');
                }}
                leadingIcon={<RotateCcw size={12} />}
              >
                Reset
              </NeuronButton>
            </div>

            {/* Font Family Switcher */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isId ? 'Keluarga Huruf (Font Family):' : 'Font Family:'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <button
                  type="button"
                  className={`spacing-cat-chip ${fontFamilyMode === 'sans' ? 'active' : ''}`}
                  onClick={() => setFontFamilyMode('sans')}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  Inter (Sans)
                </button>
                <button
                  type="button"
                  className={`spacing-cat-chip ${fontFamilyMode === 'mono' ? 'active' : ''}`}
                  onClick={() => setFontFamilyMode('mono')}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  JetBrains (Mono)
                </button>
              </div>
            </div>

            {/* Font Weight */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 600 }}>
                <span>{isId ? 'Ketebalan (Font Weight):' : 'Font Weight:'}</span>
                <span style={{ color: 'var(--color-primary)' }}>{fontWeight}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                {[400, 500, 600, 700].map((w) => (
                  <button
                    key={w}
                    type="button"
                    className={`spacing-unit-btn ${fontWeight === w ? 'active' : ''}`}
                    onClick={() => setFontWeight(w)}
                    style={{ textAlign: 'center', justifyContent: 'center' }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Height Multiplier */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isId ? 'Kerapatan Baris (Line Height):' : 'Line Height Ratio:'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                {(['tight', 'normal', 'relaxed'] as const).map((lh) => (
                  <button
                    key={lh}
                    type="button"
                    className={`spacing-unit-btn ${lineHeightMultiplier === lh ? 'active' : ''}`}
                    onClick={() => setLineHeightMultiplier(lh)}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {lh}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Alignment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isId ? 'Perataan Teks:' : 'Text Alignment:'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                <button
                  type="button"
                  className={`spacing-unit-btn ${textAlign === 'left' ? 'active' : ''}`}
                  onClick={() => setTextAlign('left')}
                >
                  <AlignLeft size={13} style={{ marginRight: 4 }} /> Left
                </button>
                <button
                  type="button"
                  className={`spacing-unit-btn ${textAlign === 'center' ? 'active' : ''}`}
                  onClick={() => setTextAlign('center')}
                >
                  <AlignCenter size={13} style={{ marginRight: 4 }} /> Center
                </button>
                <button
                  type="button"
                  className={`spacing-unit-btn ${textAlign === 'right' ? 'active' : ''}`}
                  onClick={() => setTextAlign('right')}
                >
                  <AlignRight size={13} style={{ marginRight: 4 }} /> Right
                </button>
              </div>
            </div>

            {/* Viewport Toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isId ? 'Pratinjau Layar:' : 'Preview Viewport:'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <button
                  type="button"
                  className={`spacing-cat-chip ${testerViewport === 'desktop' ? 'active' : ''}`}
                  onClick={() => setTesterViewport('desktop')}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  <Monitor size={12} style={{ marginRight: 4 }} /> Desktop
                </button>
                <button
                  type="button"
                  className={`spacing-cat-chip ${testerViewport === 'mobile' ? 'active' : ''}`}
                  onClick={() => setTesterViewport('mobile')}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  <Smartphone size={12} style={{ marginRight: 4 }} /> Mobile
                </button>
              </div>
            </div>
          </div>

          {/* Canvas & Waterfall Tester */}
          <div className="typography-tester-stage">
            {/* Custom Text Input Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-canvas)' }}>
              <NeuronInput
                label={isId ? 'Ketik Teks Uji Kustom:' : 'Enter Custom Test String:'}
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder={isId ? 'Ketik teks untuk diuji...' : 'Type text to test...'}
                leadingIcon={<Type size={16} />}
                trailingIcon={
                  testText ? (
                    <button
                      type="button"
                      onClick={() => setTestText('')}
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
                      title={isId ? 'Kosongkan teks' : 'Clear text'}
                    >
                      <X size={14} />
                    </button>
                  ) : undefined
                }
              />

              {/* Quick Presets */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', alignSelf: 'center' }}>
                  {isId ? 'Preset:' : 'Presets:'}
                </span>
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTestText(preset)}
                    style={{
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-full, 9999px)',
                      padding: '3px 10px',
                      fontSize: '11px',
                      color: 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      maxWidth: '240px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Waterfall List */}
            <div className="typography-waterfall-list">
              {TYPOGRAPHY_SCALES.map((item) => {
                const activeSizePx = testerViewport === 'desktop' ? item.deskSizePx : item.mobSizePx;
                const activeLhPx = testerViewport === 'desktop' ? item.deskLhPx : item.mobLhPx;
                const calculatedLh =
                  lineHeightMultiplier === 'tight'
                    ? `${Math.round(activeSizePx * 1.15)}px`
                    : lineHeightMultiplier === 'relaxed'
                    ? `${Math.round(activeSizePx * 1.6)}px`
                    : `${activeLhPx}px`;

                return (
                  <div key={item.name} className="typography-waterfall-item">
                    <div className="typography-waterfall-meta">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {item.name}
                        </span>
                        <span>·</span>
                        <span>{activeSizePx}px</span>
                        <span>·</span>
                        <span>LH: {calculatedLh}</span>
                      </div>
                      <div style={{ color: 'var(--color-primary)' }}>
                        <code>var({item.varName})</code>
                      </div>
                    </div>

                    <div
                      style={{
                        fontFamily: fontFamilyMode === 'sans' ? "'Inter', sans-serif" : "'JetBrains Mono', monospace",
                        fontSize: `${activeSizePx}px`,
                        lineHeight: calculatedLh,
                        fontWeight: fontWeight,
                        textAlign: textAlign,
                        color: 'var(--color-text-primary)',
                        wordBreak: 'break-word',
                      }}
                    >
                      {testText || (isId ? 'Teks sampel Neudela' : 'Sample Neudela text')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 3: SPESIFIKASI FONT & BOBOT (Font Specs & Anatomy)
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'specs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Family Cards */}
          <div className="typography-specs-grid">
            {/* Primary Font: Inter */}
            <div className="typography-spec-card">
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: 'var(--color-primary, #df7e30)',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  {isId ? 'Jenis Font Utama' : 'Primary Typeface'}
                </span>
                <NeuronBadge variant="brand" size="xs">
                  SANS-SERIF
                </NeuronBadge>
              </div>

              <h3 style={{ fontSize: '32px', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)', fontFamily: "'Inter', sans-serif" }}>
                Inter
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {isId
                  ? 'Dirancang khusus untuk layar digital dengan x-height tinggi dan open counters. Memastikan keterbacaan sempurna pada ukuran teks terkecil sekalipun di berbagai densitas layar perangkat.'
                  : 'Crafted specifically for digital screens with a tall x-height and open counters. Delivers crystal-clear legibility across micro-text and high-density displays.'}
              </p>

              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'var(--color-bg-canvas)',
                  border: '1px solid var(--color-border)',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--color-text-primary)',
                }}
              >
                <code>--font-family: 'Inter', system-ui, sans-serif;</code>
              </div>
            </div>

            {/* Monospace Font: JetBrains Mono */}
            <div className="typography-spec-card">
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#0284c7',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>
                  {isId ? 'Jenis Font Monospace' : 'Code & Monospace'}
                </span>
                <NeuronBadge variant="blue" size="xs">
                  MONOSPACE
                </NeuronBadge>
              </div>

              <h3 style={{ fontSize: '32px', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)', fontFamily: "'JetBrains Mono', monospace" }}>
                JetBrains Mono
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {isId
                  ? 'Keluarga huruf monospace untuk blok kode, token desain, tabel data tabular, dan nilai angka finansial. Memiliki diferensiasi karakter tegas antara angka 0, huruf O, dan angka 1.'
                  : 'Monospaced typeface optimized for code snippets, design tokens, tabular data, and financial figures. Clear glyph differentiation between 0, O, 1, and l.'}
              </p>

              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'var(--color-bg-canvas)',
                  border: '1px solid var(--color-border)',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--color-text-primary)',
                }}
              >
                <code>--font-mono: 'JetBrains Mono', monospace;</code>
              </div>
            </div>
          </div>

          {/* Font Weights Grid */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? 'Bobot Huruf Resmi (Font Weights)' : 'Official Font Weights'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Neudela menstandarkan 4 tingkat ketebalan font untuk menjaga hierarki kontras visual tanpa membingungkan ritme halaman.'
                : 'Neudela standardizes 4 typographic weights to maintain visual hierarchy without muddying page clarity.'}
            </p>

            <div className="typography-weights-grid" style={{ marginTop: '16px' }}>
              {[
                { weight: 400, name: 'Regular', token: '--font-weight-regular', descId: 'Default paragraf, teks isi, dan keterangan', descEn: 'Default paragraphs, body copy, and captions' },
                { weight: 500, name: 'Medium', token: '--font-weight-medium', descId: 'Teks tombol, tab navigasi, dan label input', descEn: 'Button text, navigation tabs, and input labels' },
                { weight: 600, name: 'Semibold', token: '--font-weight-semibold', descId: 'Sub-judul, header kartu, dan teks penekanan', descEn: 'Subheadings, card headers, and emphasis' },
                { weight: 700, name: 'Bold', token: '--font-weight-bold', descId: 'Judul utama halaman (H1, H2) dan angka statistik', descEn: 'Page titles (H1, H2), and key statistics' },
              ].map((w) => (
                <div key={w.weight} className="typography-weight-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Weight {w.weight}
                    </span>
                    <NeuronBadge variant="brand" size="xs">
                      {w.name}
                    </NeuronBadge>
                  </div>

                  <div style={{ fontSize: '28px', fontWeight: w.weight, color: 'var(--color-text-primary)', fontFamily: "'Inter', sans-serif" }}>
                    Aa Bb Gg 123
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    {isId ? w.descId : w.descEn}
                  </p>

                  <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-primary)', marginTop: 'auto' }}>
                    <code>var({w.token})</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 4: PANDUAN PENERAPAN (Do & Don't Guidelines)
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'guidelines' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section Introduction Card */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? 'Panduan Penggunaan Tipografi (Do & Don\'t)' : 'Typography Usage Guidelines (Do & Don\'t)'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Kaidah esensial penerapan tipografi Neudela untuk menjaga ritme optik, kenyamanan membaca (legibility), hierarki informasi, dan aksesibilitas antarmuka pengguna.'
                : 'Essential rules and best practices for applying Neudela typography to guarantee optical rhythm, superior legibility, hierarchy, and WCAG accessibility.'}
            </p>

            {/* Quick Principles Banner */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginTop: '16px',
                padding: '16px',
                background: 'var(--color-bg-canvas)',
                borderRadius: 'var(--radius-lg, 12px)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {isId ? 'RITME MODULAR' : 'MODULAR RHYTHM'}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  11 Skala Terkalibrasi
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Rasio harmonis Desktop & Mobile' : 'Fluid desktop & mobile scaling'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {isId ? 'KONTRAS WCAG' : 'CONTRAST RATIO'}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>
                  4.5:1 (AA) &amp; 7:1 (AAA)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Lolos uji kontras latar terang/gelap' : 'Accessible against light & dark themes'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {isId ? 'PANJANG BARIS (MEASURE)' : 'OPTIMAL MEASURE'}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  45 – 75 Karakter
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Batas ideal kenyamanan mata' : 'Prevents eye-tracking fatigue'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {isId ? 'KERAPATAN VERTICAL (LEADING)' : 'VERTICAL LEADING'}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  1.2x Judul / 1.5x Teks
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Mencegah tabrakan huruf g/y' : 'Prevents ascender/descender collision'}
                </span>
              </div>
            </div>

            {/* ── Paired Do's and Don'ts ── */}
            <div className="typography-dodont-section">
              {/* ── Pair 1: Modular Scale Tokens vs Hardcoded Pixels ── */}
              <div className="typography-dodont-pair">
                <div className="typography-dodont-pair-header">
                  <div className="typography-dodont-pair-left">
                    <span className="typography-dodont-step-num">01</span>
                    <h3 className="typography-dodont-pair-title">
                      <Layers size={16} color="var(--color-primary)" />
                      {isId ? 'Gunakan Token Skala Modular vs Nilai Pixel Arbitrer' : 'Official Modular Scale Tokens vs Hardcoded Values'}
                    </h3>
                  </div>
                  <span className="typography-dodont-pair-badge">
                    {isId ? 'Sistem Token' : 'Token System'}
                  </span>
                </div>

                <div className="dodont-grid">
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                        <NeuronBadge variant="brand" size="sm">
                          var(--fs-display-sm) /* 30px / 24px */
                        </NeuronBadge>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: "'Inter', sans-serif" }}>
                          {isId ? 'Judul Terkalibrasi' : 'Calibrated Heading'}
                        </div>
                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
                          ✓ {isId ? 'Otomatis fluid saat mobile & terikat sistem' : 'Fluid scaling on mobile & tied to design tokens'}
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Gunakan Token Resmi Tipografi Neudela' : 'Always Use Official Neudela Typography Tokens'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Selalu gunakan token rasio seperti `--fs-display-sm` atau `--fs-text-md`. Token ini otomatis beradaptasi saat berganti viewport desktop dan mobile, serta menjamin kesinambungan visual di seluruh modul.'
                          : 'Always reference calibrated token variables like `--fs-display-sm` or `--fs-text-md`. They automatically scale across screen viewports and ensure systemic consistency.'}
                      </div>
                    </div>
                  </RuleCard>

                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600 }}>
                          font-size: 19px; line-height: 23px;
                        </span>
                        <div style={{ fontSize: '19px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {isId ? 'Judul Ukuran Sembarang' : 'Arbitrary Size Title'}
                        </div>
                        <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
                          ✕ {isId ? 'Nilai ganjil di luar modular & patah saat mobile' : 'Odd values break modular grid & fail on mobile'}
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Hindari Menulis Nilai Pixel Sembarang (Hardcoded)' : 'Avoid Arbitrary Hardcoded Font Sizes'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Jangan menulis angka pixel sembarang seperti 17px, 19px, atau 23px. Nilai ganjil di luar skala modular membuat hierarki antar judul menjadi kabur serta memicu artefak blur pada layar retina.'
                          : 'Never hardcode arbitrary values like 17px, 19px, or 23px. Off-grid odd sizes muddy hierarchy and cause subpixel rendering blur.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* ── Pair 2: Visual Contrast Hierarchy ── */}
              <div className="typography-dodont-pair">
                <div className="typography-dodont-pair-header">
                  <div className="typography-dodont-pair-left">
                    <span className="typography-dodont-step-num">02</span>
                    <h3 className="typography-dodont-pair-title">
                      <Maximize2 size={16} color="var(--color-primary)" />
                      {isId ? 'Kontras Hierarki Skala vs Ukuran yang Ambigius' : 'Distinct Visual Hierarchy vs Ambiguous Scale Steps'}
                    </h3>
                  </div>
                  <span className="typography-dodont-pair-badge">
                    {isId ? 'Hierarki Visual' : 'Visual Hierarchy'}
                  </span>
                </div>

                <div className="dodont-grid">
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div style={{ width: '100%', maxWidth: '340px', background: 'var(--color-bg-surface)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {isId ? 'Ringkasan Finansial' : 'Financial Overview'}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                          {isId ? 'Pertumbuhan portofolio meningkat 14.8% kuartal ini.' : 'Portfolio growth increased by 14.8% this quarter.'}
                        </div>
                        <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 600, marginTop: '2px' }}>
                          ✓ {isId ? 'Selisih 2+ skala (20px vs 13px) langsung terbaca' : '2+ scale step jump (20px vs 13px) instantly scannable'}
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Berikan Selisih Minimal 2 Skala Antara Judul dan Teks' : 'Ensure At Least a 2-Step Scale Jump for Titles'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Pastikan ada lompatan skala yang kontras antara judul (misal Text xl 20px atau Display xs 24px) dengan teks keterangan (Text sm 13-14px) agar mata pengguna dapat membedakan hierarki dalam sekali pandang.'
                          : 'Ensure noticeable contrast between a heading (e.g. Text xl 20px or Display xs 24px) and body copy (Text sm 13-14px) for instantaneous scannability.'}
                      </div>
                    </div>
                  </RuleCard>

                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div style={{ width: '100%', maxWidth: '340px', background: 'var(--color-bg-surface)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.4)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {isId ? 'Ringkasan Finansial' : 'Financial Overview'}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                          {isId ? 'Pertumbuhan portofolio meningkat 14.8% kuartal ini.' : 'Portfolio growth increased by 14.8% this quarter.'}
                        </div>
                        <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: 600, marginTop: '2px' }}>
                          ✕ {isId ? 'Selisih 1px (15px vs 14px) membingungkan pembaca' : '1px diff (15px vs 14px) causes hesitation'}
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Hindari Ukuran Font yang Terlalu Mirip (1–2px Selisih)' : 'Avoid Negligible Font Size Differentiations'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Jangan memadukan judul 15px/16px dengan teks 14px. Perbedaan tipis membuat mata pengguna ragu apakah teks tersebut adalah judul atau kelanjutan dari paragraf yang sama.'
                          : 'Never pair near-identical sizes (e.g., 15px title over 14px text). Micro-differences reduce confidence and degrade scanning speed.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* ── Pair 3: Proportional Line-Height / Leading ── */}
              <div className="typography-dodont-pair">
                <div className="typography-dodont-pair-header">
                  <div className="typography-dodont-pair-left">
                    <span className="typography-dodont-step-num">03</span>
                    <h3 className="typography-dodont-pair-title">
                      <AlignLeft size={16} color="var(--color-primary)" />
                      {isId ? 'Kerapatan Baris (Line-Height / Leading) Proporsional' : 'Calibrated Line-Height vs Cramped Leading'}
                    </h3>
                  </div>
                  <span className="typography-dodont-pair-badge">
                    {isId ? 'Keterbacaan' : 'Readability & Leading'}
                  </span>
                </div>

                <div className="dodont-grid">
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div style={{ width: '100%', maxWidth: '340px', background: 'var(--color-bg-surface)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <p style={{ fontSize: '13px', lineHeight: '1.55', color: 'var(--color-text-primary)', margin: 0 }}>
                          {isId
                            ? 'Desain tipografi yang baik memberikan ruang napas vertikal yang cukup pada setiap baris kalimat naratif.'
                            : 'Great typographic craftsmanship provides ample vertical breathing room between each line of narrative copy.'}
                        </p>
                        <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 600, marginTop: '6px', display: 'block' }}>
                          ✓ line-height: 1.55 (20px) — {isId ? 'Ascender & descender tidak tabrakan' : 'Comfortable line rhythm'}
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Gunakan Line-Height 1.5x–1.6x untuk Teks Paragraf' : 'Use 1.5x–1.6x Line-Height for Body Copy'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Teks paragraf dan narasi baca memerlukan leading yang lapang (1.5x hingga 1.6x) agar ekor huruf (g, y, p) dan puncak huruf (b, d, h) memiliki ruang vertikal yang cukup tanpa saling bertubrukan.'
                          : 'Body paragraphs require generous leading (1.5x to 1.6x) so ascenders and descenders have sufficient clearance without collisions.'}
                      </div>
                    </div>
                  </RuleCard>

                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div style={{ width: '100%', maxWidth: '340px', background: 'var(--color-bg-surface)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                        <p style={{ fontSize: '13px', lineHeight: '0.98', color: 'var(--color-text-primary)', margin: 0 }}>
                          {isId
                            ? 'Desain tipografi yang buruk memadatkan spasi baris sehingga huruf tinggi dan berekor saling bertabrakan.'
                            : 'Poor typography collapses vertical leading causing ascenders and descenders to collide unpleasantly.'}
                        </p>
                        <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: 600, marginTop: '6px', display: 'block' }}>
                          ✕ line-height: 1.0 (13px) — {isId ? 'Huruf saling bertumpukan & pusing' : 'Cramped lines collide & fatigue eyes'}
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Jangan Menggunakan Line-Height Terlalu Mampat (≤ 1.1x)' : 'Do Not Use Compressed Line-Heights (≤ 1.1x)'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Line-height yang terlalu mampat menyebabkan mata pembaca kesulitan melacak perpindahan baris dan memicu kelelahan visual yang cepat.'
                          : 'Overly tight line heights cause line-jumping errors and intense visual fatigue when reading more than two lines of text.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* ── Pair 4: Optimal Line Measure ── */}
              <div className="typography-dodont-pair">
                <div className="typography-dodont-pair-header">
                  <div className="typography-dodont-pair-left">
                    <span className="typography-dodont-step-num">04</span>
                    <h3 className="typography-dodont-pair-title">
                      <SlidersHorizontal size={16} color="var(--color-primary)" />
                      {isId ? 'Panjang Baris Baca Optimal (Measure: 45–75 Karakter)' : 'Optimal Line Measure (45–75 Characters)'}
                    </h3>
                  </div>
                  <span className="typography-dodont-pair-badge">
                    {isId ? 'Ergonomi Baca' : 'Reading Ergonomics'}
                  </span>
                </div>

                <div className="dodont-grid">
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div style={{ width: '100%', maxWidth: '300px', background: 'var(--color-bg-surface)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 600, marginBottom: '4px' }}>
                          max-width: 60ch (Optimal)
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', lineHeight: 1.5, margin: 0 }}>
                          {isId
                            ? 'Membatasi panjang baris paragraf 45–75 karakter menjaga pergerakan mata tetap rileks.'
                            : 'Constraining body copy width between 45–75 characters keeps reading eye-tracking comfortable.'}
                        </p>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Batasi Lebar Kolom Paragraf (max-width: 65ch)' : 'Constrain Paragraph Column Width (max-width: 65ch)'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Mata manusia membaca paling rileks pada rentang 45 hingga 75 karakter per baris. Terapkan batas max-width: 65ch pada kontainer teks bacaan artikel atau modal.'
                          : 'Human eye tracking is optimal at 45 to 75 characters per line. Always cap body copy width with `max-width: 65ch`.'}
                      </div>
                    </div>
                  </RuleCard>

                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div style={{ width: '100%', maxWidth: '380px', background: 'var(--color-bg-surface)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                        <div style={{ fontSize: '10px', color: '#ef4444', fontWeight: 600, marginBottom: '4px' }}>
                          width: 100% (140+ Karakter Membentang)
                        </div>
                        <p style={{ fontSize: '11px', color: 'var(--color-text-primary)', lineHeight: 1.3, margin: 0 }}>
                          {isId
                            ? 'Teks yang dibiarkan melar 100% selebar monitor widescreen menyebabkan pengguna kesulitan menemukan awal kalimat baru di sisi kiri...'
                            : 'Text stretching 100% across widescreen monitors causes readers to lose their place when sweeping back to the start of the next line...'}
                        </p>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Hindari Paragraf Membentang Penuh Selebar Layar' : 'Avoid Unbounded Full-Width Paragraphs'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Jangan biarkan paragraf membaca membentang 100% selebar monitor desktop ultrawide tanpa batas lebar. Pembaca akan sering tersesat saat menyapu mata kembali ke sisi kiri.'
                          : 'Never allow body copy to stretch 100% across wide desktop viewports. The wide sweep causes readers to lose their anchor point.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* ── Pair 5: Contextual Typeface (Inter vs JetBrains Mono) ── */}
              <div className="typography-dodont-pair">
                <div className="typography-dodont-pair-header">
                  <div className="typography-dodont-pair-left">
                    <span className="typography-dodont-step-num">05</span>
                    <h3 className="typography-dodont-pair-title">
                      <Code2 size={16} color="var(--color-primary)" />
                      {isId ? 'Pemilihan Typeface Semantik (Inter vs JetBrains Mono)' : 'Contextual Typeface: Inter vs JetBrains Mono'}
                    </h3>
                  </div>
                  <span className="typography-dodont-pair-badge">
                    {isId ? 'Typeface Semantik' : 'Contextual Fonts'}
                  </span>
                </div>

                <div className="dodont-grid">
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div style={{ width: '100%', maxWidth: '340px', background: 'var(--color-bg-surface)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: "'Inter', sans-serif" }}>
                            {isId ? 'Total Saldo Rekening' : 'Account Balance'}
                          </span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>
                            Rp 48.750.000,00
                          </span>
                        </div>
                        <div style={{ fontSize: '10.5px', fontFamily: "'JetBrains Mono', monospace", color: 'var(--color-text-tertiary)', background: 'var(--color-bg-canvas)', padding: '4px 8px', borderRadius: '4px' }}>
                          UUID: 8b05b875-05f7-45a9-ade3
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Gunakan JetBrains Mono Sesuai Fungsinya (Kode & Data Tabular)' : 'Reserve JetBrains Mono for Code & Tabular Figures'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Terapkan JetBrains Mono khusus untuk sintaks kode, token konfigurasi, timestamp log, dan kolom angka nominal di mana lebar karakter harus seragam agar angka sejajar rapi.'
                          : 'Reserve JetBrains Mono for source code, configuration tokens, log timestamps, and tabular numeric values where vertical digit alignment is crucial.'}
                      </div>
                    </div>
                  </RuleCard>

                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div style={{ width: '100%', maxWidth: '340px', background: 'var(--color-bg-surface)', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#ef4444', lineHeight: 1.4, margin: 0 }}>
                          {isId
                            ? '"Seluruh paragraf pesan konfirmasi dan bantuan aplikasi ini diketik dengan font monospace sehingga terasa kaku dan lama dibaca."'
                            : '"The entire narrative modal description was typed in monospace making long reading slow, rigid, and unnecessarily formal."'}
                        </p>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Hindari Monospace untuk Teks Naratif & Dialog Modal' : 'Avoid Monospace for Long Narrative & General Modals'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Jangan menggunakan font monospace untuk badan artikel, form dialog, atau pesan bantuan umum. Gunakan font utama Inter yang memiliki proporsi optik alami untuk teks bacaan.'
                          : 'Do not render editorial articles, long modals, or general forms in monospace. Use the primary Inter sans-serif typeface for natural reading speed.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Navigation Footer ── */}
      <NextPrevious
        prev={{ id: 'spacing', label: isId ? 'Spasi (Spacing)' : 'Spacing' }}
        next={{ id: 'components-overview', label: isId ? 'Ringkasan Komponen' : 'Components' }}
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
