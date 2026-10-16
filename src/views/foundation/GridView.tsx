import { useState, useMemo, ReactNode } from 'react';
import {
  LayoutGrid,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Tv,
  Eye,
  Sliders,
  Copy,
  Check,
  RotateCcw,
  Columns,
  Maximize2,
  Split,
  Box,
  Code2,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react';
import NextPrevious from '../../components/NextPrevious';
import { useLanguage } from '../../context/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// Do / Don't Rule Card Component
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

interface GridViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Breakpoint Definitions
// ─────────────────────────────────────────────────────────────────────────────
interface BreakpointSpec {
  id: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  name: string;
  minWidth: number;
  rangeText: string;
  columns: number;
  gutter: number;
  margin: number;
  containerMax: string;
  devicesEn: string;
  devicesId: string;
  mediaQuery: string;
  icon: typeof Smartphone;
}

const BREAKPOINTS: BreakpointSpec[] = [
  {
    id: 'xs',
    name: 'Extra Small (xs)',
    minWidth: 0,
    rangeText: '< 576px',
    columns: 4,
    gutter: 16,
    margin: 16,
    containerMax: 'Fluid (100%)',
    devicesEn: 'Mobile phones (iPhone SE, Pixel, Galaxy)',
    devicesId: 'Ponsel pintar ringkas (iPhone SE, Pixel, Galaxy)',
    mediaQuery: '@media (max-width: 575.98px)',
    icon: Smartphone,
  },
  {
    id: 'sm',
    name: 'Small (sm)',
    minWidth: 576,
    rangeText: '576px – 767px',
    columns: 6,
    gutter: 16,
    margin: 24,
    containerMax: '540px',
    devicesEn: 'Large phones in landscape, Phablets, Foldables',
    devicesId: 'Ponsel layar besar mode lanskap, phablet, perangkat lipat',
    mediaQuery: '@media (min-width: 576px)',
    icon: Smartphone,
  },
  {
    id: 'md',
    name: 'Medium (md)',
    minWidth: 768,
    rangeText: '768px – 991px',
    columns: 8,
    gutter: 20,
    margin: 32,
    containerMax: '720px',
    devicesEn: 'Tablets portrait (iPad mini, Galaxy Tab)',
    devicesId: 'Tablet mode potret (iPad mini, Galaxy Tab)',
    mediaQuery: '@media (min-width: 768px)',
    icon: Tablet,
  },
  {
    id: 'lg',
    name: 'Large (lg)',
    minWidth: 992,
    rangeText: '992px – 1199px',
    columns: 12,
    gutter: 24,
    margin: 32,
    containerMax: '960px',
    devicesEn: 'Tablets landscape, Compact laptops, iPad Pro',
    devicesId: 'Tablet mode lanskap, laptop ringkas, iPad Pro',
    mediaQuery: '@media (min-width: 992px)',
    icon: Laptop,
  },
  {
    id: 'xl',
    name: 'Extra Large (xl)',
    minWidth: 1200,
    rangeText: '1200px – 1439px',
    columns: 12,
    gutter: 24,
    margin: 40,
    containerMax: '1140px',
    devicesEn: 'Standard desktop screens & MacBook 13"-16"',
    devicesId: 'Monitor desktop standar & MacBook 13"-16"',
    mediaQuery: '@media (min-width: 1200px)',
    icon: Monitor,
  },
  {
    id: '2xl',
    name: 'Ultra Wide (2xl)',
    minWidth: 1440,
    rangeText: '≥ 1440px',
    columns: 12,
    gutter: 32,
    margin: 48,
    containerMax: '1380px',
    devicesEn: 'High-res desktop displays, Studio displays, 4K TVs',
    devicesId: 'Layar desktop resolusi tinggi, monitor ultra-wide, TV 4K',
    mediaQuery: '@media (min-width: 1440px)',
    icon: Tv,
  },
];

// Layout template structures for simulator
interface TemplateBlock {
  span: number;
  labelEn: string;
  labelId: string;
  badge?: string;
}

const TEMPLATES: Record<string, { titleEn: string; titleId: string; blocks: TemplateBlock[] }> = {
  '12-col': {
    titleEn: '12 Equal Columns (1 × 12)',
    titleId: '12 Kolom Sama Rata (1 × 12)',
    blocks: Array.from({ length: 12 }, (_, i) => ({
      span: 1,
      labelEn: `Col ${i + 1}`,
      labelId: `Kolom ${i + 1}`,
    })),
  },
  '6-6': {
    titleEn: 'Equal Halves (6 + 6)',
    titleId: 'Bagi Dua Sama Rata (6 + 6)',
    blocks: [
      { span: 6, labelEn: 'Primary Content / Hero Text', labelId: 'Konten Utama / Teks Hero', badge: 'col-6' },
      { span: 6, labelEn: 'Supporting Visual / Media', labelId: 'Visual Pendukung / Media', badge: 'col-6' },
    ],
  },
  '4-4-4': {
    titleEn: 'Thirds (4 + 4 + 4)',
    titleId: 'Bagi Tiga Rata (4 + 4 + 4)',
    blocks: [
      { span: 4, labelEn: 'Feature Card Alpha', labelId: 'Kartu Fitur Alpha', badge: 'col-4' },
      { span: 4, labelEn: 'Feature Card Beta', labelId: 'Kartu Fitur Beta', badge: 'col-4' },
      { span: 4, labelEn: 'Feature Card Gamma', labelId: 'Kartu Fitur Gamma', badge: 'col-4' },
    ],
  },
  '3-3-3-3': {
    titleEn: 'Quarters / KPI Tiles (3 + 3 + 3 + 3)',
    titleId: 'Bagi Empat / Ubin KPI (3 + 3 + 3 + 3)',
    blocks: [
      { span: 3, labelEn: 'Total Revenue', labelId: 'Total Pendapatan', badge: 'col-3' },
      { span: 3, labelEn: 'Active Users', labelId: 'Pengguna Aktif', badge: 'col-3' },
      { span: 3, labelEn: 'Conversion Rate', labelId: 'Tingkat Konversi', badge: 'col-3' },
      { span: 3, labelEn: 'Server Uptime', labelId: 'Waktu Aktif Server', badge: 'col-3' },
    ],
  },
  '8-4': {
    titleEn: 'Main + Sidebar (8 + 4)',
    titleId: 'Konten Utama + Sidebar (8 + 4)',
    blocks: [
      { span: 8, labelEn: 'Main Analytical Feed & Data Table', labelId: 'Umpan Data Utama & Tabel Analitik', badge: 'col-8' },
      { span: 4, labelEn: 'Right Contextual Sidebar / Filters', labelId: 'Sidebar Kontekstual / Filter', badge: 'col-4' },
    ],
  },
  '9-3': {
    titleEn: 'Wide Content + Navigation Rail (9 + 3)',
    titleId: 'Konten Lebar + Nav Rail (9 + 3)',
    blocks: [
      { span: 9, labelEn: 'Product Catalog & Grid Listings', labelId: 'Katalog Produk & Daftar Grid', badge: 'col-9' },
      { span: 3, labelEn: 'Filter Facets & Categories', labelId: 'Facet Filter & Kategori', badge: 'col-3' },
    ],
  },
  '2-8-2': {
    titleEn: 'Centered Reading / Form (2 + 8 + 2)',
    titleId: 'Artikel Tengah / Form Fokus (2 + 8 + 2)',
    blocks: [
      { span: 2, labelEn: 'Left Margin Spacer', labelId: 'Penyangga Kiri', badge: 'offset-2' },
      { span: 8, labelEn: 'Focused Reading Article or Auth Form', labelId: 'Artikel Baca Fokus atau Form Autentikasi', badge: 'col-8' },
      { span: 2, labelEn: 'Right Margin Spacer', labelId: 'Penyangga Kanan', badge: 'offset-2' },
    ],
  },
  '7-5': {
    titleEn: 'Asymmetric Split (7 + 5)',
    titleId: 'Pecahan Asimetris (7 + 5)',
    blocks: [
      { span: 7, labelEn: 'Editorial Showcase & Gallery', labelId: 'Etalase Editorial & Galeri', badge: 'col-7' },
      { span: 5, labelEn: 'Product Specification & Checkout', labelId: 'Spesifikasi Produk & Checkout', badge: 'col-5' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens List
// ─────────────────────────────────────────────────────────────────────────────
const GRID_TOKENS = [
  { name: '--grid-columns', value: '12', descEn: 'Total vertical columns in layout grid', descId: 'Total kolom vertikal dalam sistem grid' },
  { name: '--grid-gutter-xs', value: '16px (1rem)', descEn: 'Horizontal column gap on mobile phones', descId: 'Jarak antarkolom horizontal pada ponsel' },
  { name: '--grid-gutter-sm', value: '16px (1rem)', descEn: 'Horizontal column gap on phablets', descId: 'Jarak antarkolom horizontal pada phablet' },
  { name: '--grid-gutter-md', value: '20px (1.25rem)', descEn: 'Horizontal column gap on tablet displays', descId: 'Jarak antarkolom horizontal pada tablet' },
  { name: '--grid-gutter-lg', value: '24px (1.5rem)', descEn: 'Horizontal column gap on desktop displays', descId: 'Jarak antarkolom horizontal pada layar desktop' },
  { name: '--grid-gutter-xl', value: '32px (2rem)', descEn: 'Horizontal column gap on ultra-wide monitors', descId: 'Jarak antarkolom horizontal pada monitor ultra-lebar' },
  { name: '--grid-margin-xs', value: '16px (1rem)', descEn: 'Outer page safe padding for small phones', descId: 'Batas tepi aman halaman untuk ponsel kecil' },
  { name: '--grid-margin-sm', value: '24px (1.5rem)', descEn: 'Outer page padding for large phones', descId: 'Batas tepi aman halaman untuk ponsel besar' },
  { name: '--grid-margin-md', value: '32px (2rem)', descEn: 'Outer page padding for tablets', descId: 'Batas tepi aman halaman untuk tablet' },
  { name: '--grid-margin-lg', value: '32px (2rem)', descEn: 'Outer page padding for standard laptops', descId: 'Batas tepi aman halaman untuk laptop standar' },
  { name: '--grid-margin-xl', value: '40px (2.5rem)', descEn: 'Outer page padding for desktop screens', descId: 'Batas tepi aman halaman untuk layar desktop' },
  { name: '--grid-margin-2xl', value: '48px (3rem)', descEn: 'Outer page padding for widescreen monitors', descId: 'Batas tepi aman halaman untuk monitor ultra-lebar' },
  { name: '--container-sm', value: '540px', descEn: 'Max width bounded for small tablet views', descId: 'Batas lebar maksimal untuk tablet kecil' },
  { name: '--container-md', value: '720px', descEn: 'Max width bounded for medium tablet views', descId: 'Batas lebar maksimal untuk tablet sedang' },
  { name: '--container-lg', value: '960px', descEn: 'Max width bounded for laptops', descId: 'Batas lebar maksimal untuk laptop' },
  { name: '--container-xl', value: '1140px', descEn: 'Standard desktop container maximum width', descId: 'Batas lebar maksimal kontainer desktop standar' },
  { name: '--container-2xl', value: '1380px', descEn: 'High-res widescreen maximum container width', descId: 'Batas lebar maksimal kontainer layar lebar' },
  { name: '--breakpoint-sm', value: '576px', descEn: 'Small viewport media query min-width', descId: 'Batas min-width media query perangkat kecil' },
  { name: '--breakpoint-md', value: '768px', descEn: 'Medium viewport media query min-width', descId: 'Batas min-width media query perangkat sedang' },
  { name: '--breakpoint-lg', value: '992px', descEn: 'Large viewport media query min-width', descId: 'Batas min-width media query perangkat besar' },
  { name: '--breakpoint-xl', value: '1200px', descEn: 'Extra-large viewport media query min-width', descId: 'Batas min-width media query perangkat ekstra besar' },
  { name: '--breakpoint-2xl', value: '1440px', descEn: '2X Extra-large viewport media query min-width', descId: 'Batas min-width media query layar ultra-lebar' },
];

export default function GridView({ setActiveTab }: GridViewProps) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  // Navigation tabs
  const [activeTabMode, setActiveTabMode] = useState<'guideline' | 'simulator' | 'patterns'>('guideline');

  // Anatomy interactive highlight
  const [anatomyHighlight, setAnatomyHighlight] = useState<'all' | 'columns' | 'gutters' | 'margins' | 'container'>('all');

  // Simulator state
  const [selectedBp, setSelectedBp] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');
  const [overrideCols, setOverrideCols] = useState<number | null>(null);
  const [overrideGutter, setOverrideGutter] = useState<number | null>(null);
  const [overrideMargin, setOverrideMargin] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState<string>('6-6');
  const [codeLang, setCodeLang] = useState<'css-grid' | 'flexbox' | 'react' | 'html'>('css-grid');

  // Auto-fit interactive demo slider (container width in %)
  const [autofitWidth, setAutofitWidth] = useState<number>(100);

  // Pattern overlay toggle
  const [patternGridActive, setPatternGridActive] = useState<Record<string, boolean>>({
    dashboard: false,
    split: false,
    form: false,
    reader: false,
  });

  // Toast notification
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = (text: string, label?: string) => {
    navigator.clipboard.writeText(text);
    setToastMsg(label || `${t.grid?.copied || 'Copied'}: ${text}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  // Active breakpoint spec
  const currentBp = useMemo(() => {
    return BREAKPOINTS.find((b) => b.id === selectedBp) || BREAKPOINTS[3];
  }, [selectedBp]);

  const activeColumns = overrideCols ?? currentBp.columns;
  const activeGutter = overrideGutter ?? currentBp.gutter;
  const activeMargin = overrideMargin ?? currentBp.margin;

  // Simulator container max-width representation
  const canvasMaxWidth = useMemo(() => {
    switch (selectedBp) {
      case 'xs': return '390px';
      case 'sm': return '580px';
      case 'md': return '780px';
      case 'lg': return '1020px';
      case 'xl': return '1240px';
      case '2xl': return '100%';
    }
  }, [selectedBp]);

  // Code generation for simulator
  const generatedCode = useMemo(() => {
    const template = TEMPLATES[activeTemplate] || TEMPLATES['6-6'];

    if (codeLang === 'css-grid') {
      return `/* Neudela 12-Column CSS Grid Layout */
.neudela-layout-grid {
  display: grid;
  grid-template-columns: repeat(${activeColumns}, 1fr);
  gap: ${activeGutter}px;
  padding: 0 ${activeMargin}px;
  max-width: ${currentBp.containerMax === 'Fluid (100%)' ? '100%' : currentBp.containerMax};
  margin: 0 auto;
}

${template.blocks
  .map(
    (b, i) => `.grid-item-${i + 1} {
  grid-column: span ${Math.min(b.span, activeColumns)};
}`
  )
  .join('\n\n')}`;
    }

    if (codeLang === 'flexbox') {
      return `/* Neudela Row & Column Flexbox Layout */
.neudela-row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -${activeGutter / 2}px;
  margin-right: -${activeGutter / 2}px;
  padding-left: ${activeMargin}px;
  padding-right: ${activeMargin}px;
}

.neudela-col {
  box-sizing: border-box;
  padding-left: ${activeGutter / 2}px;
  padding-right: ${activeGutter / 2}px;
}

${template.blocks
  .map(
    (b, i) => `.col-${i + 1} {
  flex: 0 0 ${(Math.min(b.span, activeColumns) / activeColumns) * 100}%;
  max-width: ${(Math.min(b.span, activeColumns) / activeColumns) * 100}%;
}`
  )
  .join('\n')}`;
    }

    if (codeLang === 'react') {
      return `import React from 'react';

export default function NeudelaGridLayout() {
  return (
    <div 
      className="neudela-grid-container"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(${activeColumns}, minmax(0, 1fr))',
        gap: '${activeGutter}px',
        padding: '0 ${activeMargin}px',
        maxWidth: '${currentBp.containerMax === 'Fluid (100%)' ? '100%' : currentBp.containerMax}',
        margin: '0 auto',
      }}
    >
${template.blocks
  .map(
    (b) => `      <div style={{ gridColumn: 'span ${Math.min(b.span, activeColumns)}' }}>
        <div className="neuron-card">
          <h4>${isId ? b.labelId : b.labelEn}</h4>
        </div>
      </div>`
  )
  .join('\n')}
    </div>
  );
}`;
    }

    // HTML Utility
    return `<!-- Neudela 12-Column Responsive Container -->
<div class="neudela-container" style="padding: 0 ${activeMargin}px;">
  <div class="neudela-grid" style="display: grid; grid-template-columns: repeat(${activeColumns}, 1fr); gap: ${activeGutter}px;">
${template.blocks
  .map(
    (b) => `    <div class="neudela-col-${Math.min(b.span, activeColumns)}">
      <div class="content-card">${isId ? b.labelId : b.labelEn}</div>
    </div>`
  )
  .join('\n')}
  </div>
</div>`;
  }, [activeColumns, activeGutter, activeMargin, currentBp, activeTemplate, codeLang, isId]);

  const handleResetSimulator = () => {
    setOverrideCols(null);
    setOverrideGutter(null);
    setOverrideMargin(null);
    setActiveTemplate('6-6');
    setShowOverlay(true);
    setShowDimensions(true);
  };

  return (
    <div className="grid-view-container">
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
          <LayoutGrid size={14} strokeWidth={2.4} />
          {isId ? 'SISTEM FOUNDATION' : 'FOUNDATION SYSTEM'}
        </span>
        <h1 className="page-title">{isId ? 'Grid & Tata Letak' : 'Grid'}</h1>
        <p className="page-subtitle">
          {isId
            ? 'Sistem tata letak grid responsif 12 kolom berbasis baseline spasial 8pt, breakpoint viewport adaptif, dan kontainer fluid. Dirancang untuk menghadirkan ritme struktural yang harmonis di aplikasi mobile, tablet, hingga layar ultra-lebar.'
            : 'A responsive 12-column layout grid system based on an 8pt spatial baseline, adaptive viewport breakpoints, and fluid containers. Built to deliver harmonious structural rhythm across mobile, tablet, and widescreen applications.'}
        </p>

        {/* Feature Pills */}
        <div className="grid-header-pills">
          <div className="grid-pill-item">
            <span className="grid-pill-dot" style={{ backgroundColor: '#0284c7' }} />
            {isId ? 'Sistem 12 Kolom' : '12-Column System'}
          </div>
          <div className="grid-pill-item">
            <span className="grid-pill-dot" style={{ backgroundColor: '#10b981' }} />
            {isId ? '6 Breakpoint Standar' : '6 Standard Breakpoints'}
          </div>
          <div className="grid-pill-item">
            <span className="grid-pill-dot" style={{ backgroundColor: '#df7e30' }} />
            {isId ? 'Ritme Spasial 4px / 8px' : '4px / 8px Spatial Rhythm'}
          </div>
          <div className="grid-pill-item">
            <span className="grid-pill-dot" style={{ backgroundColor: '#8b5cf6' }} />
            {isId ? 'Kontainer Fluid & Batas Maks' : 'Fluid & Max Containers'}
          </div>
          <div className="grid-pill-item">
            <span className="grid-pill-dot" style={{ backgroundColor: '#f59e0b' }} />
            {isId ? 'Standar Aksesibilitas WCAG' : 'WCAG Compliant'}
          </div>
        </div>

        {/* Main Tab Switcher */}
        <div className="comp-tab-bar" style={{ marginTop: 'var(--space-4, 16px)' }}>
          <button
            type="button"
            className={`comp-tab ${activeTabMode === 'guideline' ? 'active' : ''}`}
            onClick={() => setActiveTabMode('guideline')}
          >
            {isId ? 'Panduan & Spesifikasi' : 'Guidelines & Specifications'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeTabMode === 'simulator' ? 'active' : ''}`}
            onClick={() => setActiveTabMode('simulator')}
          >
            {isId ? 'Simulator Interaktif' : 'Interactive Simulator'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeTabMode === 'patterns' ? 'active' : ''}`}
            onClick={() => setActiveTabMode('patterns')}
          >
            {isId ? 'Pola Tata Letak Populer' : 'Layout Patterns'}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          TAB 1: GUIDELINE & SPECIFICATIONS
         ══════════════════════════════════════════════════════════════════ */}
      {activeTabMode === 'guideline' && (
        <>
          {/* ── 1. Anatomy of the Grid ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 className="section-title" style={{ marginBottom: 4 }}>
                  {isId ? '1. Anatomi Grid Neudela' : '1. Anatomy of the Neudela Grid'}
                </h2>
                <p className="section-description" style={{ marginBottom: 0 }}>
                  {isId
                    ? 'Sistem grid tata letak tersusun atas 4 elemen penyusun mendasar: Kolom, Gutter, Margin, dan Kontainer. Klik kartu di bawah untuk menyorot elemen pada visualizer interaktif.'
                    : 'The layout grid consists of 4 foundational building blocks: Columns, Gutters, Margins, and Containers. Click any card below to highlight its layer in the interactive visualizer.'}
                </p>
              </div>

              {/* Reset highlight button */}
              <button
                type="button"
                className="grid-btn-pill"
                onClick={() => setAnatomyHighlight('all')}
              >
                <RotateCcw size={13} />
                {isId ? 'Tampilkan Semua Layer' : 'Show All Layers'}
              </button>
            </div>

            {/* 4 Interactive Anatomy Cards */}
            <div className="grid-anatomy-interactive">
              {/* Columns Card */}
              <div
                className={`grid-anatomy-card ${anatomyHighlight === 'columns' ? 'grid-anatomy-card--active' : ''}`}
                onClick={() => setAnatomyHighlight('columns')}
              >
                <div className="grid-anatomy-header">
                  <span className="grid-anatomy-title">
                    <Columns size={16} color="#0284c7" />
                    {isId ? 'Kolom (Columns)' : 'Columns (12 Tracks)'}
                  </span>
                  <span className="grid-anatomy-badge" style={{ color: '#0284c7', borderColor: 'rgba(2, 132, 199, 0.3)' }}>
                    --grid-columns: 12
                  </span>
                </div>
                <p className="grid-anatomy-desc">
                  {isId
                    ? 'Jalur vertikal utama tempat meletakkan teks, tombol, formulir, dan kartu komponen. Lebar kolom bersifat fluid dan membesar mengecil seiring perubahan lebar layar.'
                    : 'The primary vertical tracks that contain UI elements, typography, and card components. Widths are fluid and adjust dynamically with viewport width.'}
                </p>
              </div>

              {/* Gutters Card */}
              <div
                className={`grid-anatomy-card ${anatomyHighlight === 'gutters' ? 'grid-anatomy-card--active' : ''}`}
                onClick={() => setAnatomyHighlight('gutters')}
              >
                <div className="grid-anatomy-header">
                  <span className="grid-anatomy-title">
                    <Split size={16} color="#f59e0b" />
                    {isId ? 'Gutter (Jarak Kolom)' : 'Gutters (Column Spacing)'}
                  </span>
                  <span className="grid-anatomy-badge" style={{ color: '#d97706', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                    16px – 32px
                  </span>
                </div>
                <p className="grid-anatomy-desc">
                  {isId
                    ? 'Ruang kosong pemisah antar kolom berdampingan. Mencegah benturan visual antar elemen dan diselaraskan ke skala token spasial 4px Neudela (--space-4 s.d. --space-8).'
                    : 'The negative space separating adjacent columns, strictly mapped to Neudela spatial tokens (--space-4 to --space-8) to prevent visual clutter.'}
                </p>
              </div>

              {/* Margins Card */}
              <div
                className={`grid-anatomy-card ${anatomyHighlight === 'margins' ? 'grid-anatomy-card--active' : ''}`}
                onClick={() => setAnatomyHighlight('margins')}
              >
                <div className="grid-anatomy-header">
                  <span className="grid-anatomy-title">
                    <Maximize2 size={16} color="#ef4444" />
                    {isId ? 'Margin (Batas Aman)' : 'Margins (Page Padding)'}
                  </span>
                  <span className="grid-anatomy-badge" style={{ color: '#dc2626', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                    16px – 48px
                  </span>
                </div>
                <p className="grid-anatomy-desc">
                  {isId
                    ? 'Penyangga batas kiri dan kanan yang melindungi konten dari tepi fisik layar. Mulai dari 16px di layar ponsel hingga 48px di monitor lebar demi kenyamanan mata.'
                    : 'The left and right boundary buffers shielding content from physical display edges, scaling gracefully from 16px on mobile to 48px on widescreen.'}
                </p>
              </div>

              {/* Container Card */}
              <div
                className={`grid-anatomy-card ${anatomyHighlight === 'container' ? 'grid-anatomy-card--active' : ''}`}
                onClick={() => setAnatomyHighlight('container')}
              >
                <div className="grid-anatomy-header">
                  <span className="grid-anatomy-title">
                    <Box size={16} color="var(--color-primary)" />
                    {isId ? 'Kontainer (Max Bounds)' : 'Containers (Max Bounds)'}
                  </span>
                  <span className="grid-anatomy-badge" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>
                    540px – 1380px
                  </span>
                </div>
                <p className="grid-anatomy-desc">
                  {isId
                    ? 'Pembatas lebar maksimum halaman agar teks panjang tidak melebihi 75 karakter per baris dan layout aplikasi web tetap terpusat secara elegan.'
                    : 'Maximum-width constraints (--container-sm to --container-2xl) keeping reading line lengths and dashboards comfortably proportioned.'}
                </p>
              </div>
            </div>

            {/* Interactive Anatomy Visualizer Canvas */}
            <div className="grid-anatomy-visualizer">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Eye size={14} color="var(--color-primary)" />
                  {isId ? 'Tampilan Anatomi 12 Kolom Interaktif' : 'Interactive 12-Column Anatomy Stage'}
                </span>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: 'var(--color-text-tertiary)' }}>
                  Active Focus: <strong style={{ color: 'var(--color-primary)' }}>{anatomyHighlight.toUpperCase()}</strong>
                </span>
              </div>

              {/* Stage Container */}
              <div className={`grid-stage-outer ${anatomyHighlight === 'container' || anatomyHighlight === 'all' ? 'highlight-container' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--color-text-tertiary)' }}>
                  <span>← Safe Margin</span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Container Max-Width Boundary</span>
                  <span>Safe Margin →</span>
                </div>

                <div
                  className={`grid-stage-margin-wrap ${anatomyHighlight === 'margins' || anatomyHighlight === 'all' ? 'highlight-margins' : ''}`}
                  style={{ padding: '0 24px' }}
                >
                  <div className="grid-stage-columns-wrap">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={`grid-col-strip ${
                          anatomyHighlight === 'columns' || anatomyHighlight === 'all' ? 'highlight-columns' : ''
                        } ${anatomyHighlight === 'gutters' || anatomyHighlight === 'all' ? 'highlight-gutters' : ''}`}
                      >
                        <span>C{i + 1}</span>
                        <span style={{ fontSize: 8, opacity: 0.75 }}>fluid</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-label indicators */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 10, color: 'var(--color-text-tertiary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(239, 68, 68, 0.4)' }} />
                    Margin (24px)
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(2, 132, 199, 0.4)' }} />
                    Column Tracks (12x)
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(245, 158, 11, 0.5)' }} />
                    Gutter Gap (16px)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. Breakpoint Matrix Table ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '2. Spesifikasi Breakpoint Viewport & Kontainer' : '2. Viewport Breakpoints & Container Specifications'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Standar breakpoint media query yang mengatur perubahan jumlah kolom, pelebaran jarak antarkolom (gutter), dan lebar kontainer maksimum. Klik baris mana saja untuk menyalin media query CSS.'
                : 'Standardized media query breakpoints governing column collapse, gutter dilation, and maximum container widths across devices. Click any row to copy its CSS media query.'}
            </p>

            <div className="grid-table-responsive">
              <table className="grid-table">
                <thead>
                  <tr>
                    <th>{isId ? 'Breakpoint' : 'Breakpoint'}</th>
                    <th>{isId ? 'Rentang Layar' : 'Viewport Range'}</th>
                    <th>{isId ? 'Kolom' : 'Columns'}</th>
                    <th>{isId ? 'Gutter' : 'Gutter'}</th>
                    <th>{isId ? 'Margin' : 'Margin'}</th>
                    <th>{isId ? 'Batas Kontainer' : 'Container Max'}</th>
                    <th>{isId ? 'Target Perangkat' : 'Target Form Factors'}</th>
                    <th>{isId ? 'Media Query' : 'Media Query'}</th>
                  </tr>
                </thead>
                <tbody>
                  {BREAKPOINTS.map((bp) => {
                    const IconComp = bp.icon;
                    return (
                      <tr
                        key={bp.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => copyToClipboard(bp.mediaQuery, `${bp.name} media query copied!`)}
                        title={isId ? 'Klik untuk menyalin media query' : 'Click to copy media query'}
                      >
                        <td style={{ fontWeight: 700 }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <IconComp size={15} color="var(--color-primary)" />
                            {bp.id.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <code style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: 'var(--color-primary)' }}>
                            {bp.rangeText}
                          </code>
                        </td>
                        <td>
                          <span className="grid-viewport-badge">{bp.columns} cols</span>
                        </td>
                        <td>{bp.gutter}px</td>
                        <td>{bp.margin}px</td>
                        <td style={{ fontWeight: 600 }}>{bp.containerMax}</td>
                        <td style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>
                          {isId ? bp.devicesId : bp.devicesEn}
                        </td>
                        <td>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <code style={{ fontSize: 10.5, fontFamily: 'JetBrains Mono', background: 'var(--color-bg-subtle)', padding: '2px 6px', borderRadius: 4 }}>
                              {bp.mediaQuery}
                            </code>
                            <Copy size={12} color="var(--color-text-tertiary)" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 3. Fluid vs Auto-Fit Grid ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '3. Grid 12 Kolom vs CSS Auto-Fit Dinamis' : '3. 12-Column vs CSS Auto-Fit Grid'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Gunakan sistem 12 kolom untuk tata letak halaman struktural terkoordinasi (seperti dashboard dan split hero). Namun untuk deretan kartu (seperti kartu produk atau metrik), gunakan CSS auto-fit dengan minmax(260px, 1fr) agar kartu dapat membungkus secara fluid tanpa breakpoint kaku.'
                : 'Use the 12-column grid for structural page layouts (like dashboards and split heroes). For recurring collections (like product or metric cards), use CSS auto-fit with minmax(260px, 1fr) so items reflow smoothly without rigid media queries.'}
            </p>

            {/* Interactive width slider */}
            <div style={{ background: 'var(--color-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg, 12px)', border: '1px solid var(--color-border)', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sliders size={14} color="var(--color-primary)" />
                  {isId ? 'Uji Perilaku Reflow Kartu (Ubah Lebar Kontainer):' : 'Test Card Reflow (Resize Container Width):'}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--color-primary)' }}>
                  {autofitWidth}% Width
                </span>
              </div>
              <input
                type="range"
                min="35"
                max="100"
                value={autofitWidth}
                onChange={(e) => setAutofitWidth(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
              />
            </div>

            {/* Auto-fit card preview */}
            <div
              style={{
                width: `${autofitWidth}%`,
                margin: '0 auto',
                transition: 'width 0.25s ease',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                padding: '16px',
                background: 'var(--color-bg-canvas)',
                borderRadius: 'var(--radius-lg, 12px)',
                border: '1.5px dashed var(--color-border)',
              }}
            >
              {[
                { title: 'Server Telemetry', stat: '99.98%', badge: 'Operational', color: '#10b981' },
                { title: 'Global Requests', stat: '2.4M/s', badge: '+14.2%', color: 'var(--color-primary)' },
                { title: 'Avg Latency', stat: '24ms', badge: 'Fastest', color: '#0284c7' },
                { title: 'CPU Utilization', stat: '42.6%', badge: 'Balanced', color: '#8b5cf6' },
              ].map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md, 8px)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>{card.title}</span>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: 'var(--color-bg-subtle)', color: card.color, fontWeight: 600 }}>
                      {card.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)' }}>{card.stat}</div>
                  <span style={{ fontSize: 10, color: 'var(--color-text-tertiary)', fontFamily: 'JetBrains Mono' }}>
                    grid-column: auto (min 220px)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. Design Tokens & CSS Variables ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '4. Token Desain & Variabel CSS' : '4. Design Tokens & CSS Variables'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Gunakan properti kustom CSS berikut di file stylesheet proyek untuk konsistensi sistemik. Klik kartu token untuk menyalin deklarasi variabel.'
                : 'Use these CSS custom properties in stylesheets to maintain system-wide consistency. Click any token card to copy the variable name.'}
            </p>

            <div className="grid-tokens-list">
              {GRID_TOKENS.map((token) => (
                <div
                  key={token.name}
                  className="grid-token-card"
                  onClick={() => copyToClipboard(`var(${token.name})`, `Token var(${token.name}) copied!`)}
                  title="Click to copy CSS token"
                >
                  <div className="grid-token-meta">
                    <span className="grid-token-name">var({token.name})</span>
                    <span className="grid-token-val">Value: <strong>{token.value}</strong></span>
                    <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>
                      {isId ? token.descId : token.descEn}
                    </span>
                  </div>
                  <Copy size={15} className="grid-token-copy-icon" />
                </div>
              ))}
            </div>
          </div>

          {/* ── 5. Do's and Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '5. Panduan Penggunaan Grid (Do & Don\'t)' : '5. Grid Usage Guidelines (Do & Don\'t)'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Kaidah penting desain dan rekayasa tata letak guna mempertahankan ritme spasial serta standar aksesibilitas antarmuka pengguna.'
                : 'Essential layout and engineering rules to maintain spatial rhythm, visual harmony, and accessibility standards.'}
            </p>

            <div className="grid-dodont-section">
              {/* ── Pair 1: Column Track Alignment vs Gutter Bleeding ── */}
              <div className="grid-dodont-pair">
                <div className="grid-dodont-pair-header">
                  <div className="grid-dodont-pair-left">
                    <span className="grid-dodont-step-num">01</span>
                    <h3 className="grid-dodont-pair-title">
                      <Columns size={16} color="var(--color-primary)" />
                      {isId ? 'Perataan Blok Konten & Batas Gutter' : 'Column Track Alignment & Gutter Integrity'}
                    </h3>
                  </div>
                  <span className="grid-dodont-pair-badge">
                    {isId ? 'Konsistensi Alinyemen' : 'Track Alignment'}
                  </span>
                </div>

                <div className="dodont-grid">
                  {/* DO 1 */}
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '380px',
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          padding: '10px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        {/* 6 column tracks background + 2 snapped cards */}
                        <div style={{ position: 'relative', height: '62px' }}>
                          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  background: 'color-mix(in srgb, var(--color-primary) 7%, transparent)',
                                  border: '1px dashed color-mix(in srgb, var(--color-primary) 22%, transparent)',
                                  borderRadius: '4px',
                                }}
                              />
                            ))}
                          </div>
                          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', height: '100%' }}>
                            <div
                              style={{
                                gridColumn: 'span 3',
                                background: 'var(--color-bg-surface)',
                                border: '1.5px solid var(--color-success)',
                                borderRadius: '6px',
                                padding: '8px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 2px 6px rgba(16, 185, 129, 0.1)',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-success)' }}>col-3 Card</span>
                                <Check size={12} color="var(--color-success)" strokeWidth={2.5} />
                              </div>
                              <div style={{ height: '4px', background: 'color-mix(in srgb, var(--color-success) 25%, transparent)', borderRadius: '2px', width: '75%' }} />
                            </div>

                            <div
                              style={{
                                gridColumn: 'span 3',
                                background: 'var(--color-bg-surface)',
                                border: '1.5px solid var(--color-success)',
                                borderRadius: '6px',
                                padding: '8px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 2px 6px rgba(16, 185, 129, 0.1)',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-success)' }}>col-3 Card</span>
                                <Check size={12} color="var(--color-success)" strokeWidth={2.5} />
                              </div>
                              <div style={{ height: '4px', background: 'color-mix(in srgb, var(--color-success) 25%, transparent)', borderRadius: '2px', width: '60%' }} />
                            </div>
                          </div>
                        </div>

                        {/* Status label */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span
                            style={{
                              fontSize: '9.5px',
                              fontFamily: 'JetBrains Mono, monospace',
                              color: 'var(--color-success)',
                              background: 'color-mix(in srgb, var(--color-success) 10%, var(--color-bg-surface))',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: '1px solid color-mix(in srgb, var(--color-success) 30%, transparent)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Check size={10} strokeWidth={2.5} />
                            {isId ? '16px Gutter Utuh · Snap Presisi ke Jalur Kolom' : '16px Clear Gutter · Snapped to Column Tracks'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Sejajarkan blok konten presisi pada tepi kolom' : 'Align content strictly within column tracks'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Seluruh kartu, teks, dan tombol harus dimulai dan diakhiri tepat pada garis batas kolom, membiarkan gutter sebagai ruang pemisah visual yang konsisten.'
                          : 'All cards, typography, and buttons must align cleanly to column track edges, preserving gutters as pure negative space.'}
                      </div>
                    </div>
                  </RuleCard>

                  {/* DONT 1 */}
                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '380px',
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          padding: '10px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        {/* 6 column tracks background + overlapping card */}
                        <div style={{ position: 'relative', height: '62px' }}>
                          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  background: 'color-mix(in srgb, var(--color-danger) 6%, transparent)',
                                  border: '1px dashed color-mix(in srgb, var(--color-danger) 22%, transparent)',
                                  borderRadius: '4px',
                                }}
                              />
                            ))}
                          </div>
                          <div style={{ position: 'relative', zIndex: 1, display: 'flex', height: '100%', width: '100%', alignItems: 'center' }}>
                            <div
                              style={{
                                width: '56%',
                                height: '100%',
                                background: 'var(--color-bg-surface)',
                                border: '1.5px solid var(--color-danger)',
                                borderRadius: '6px',
                                padding: '8px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 2px 6px rgba(239, 68, 68, 0.1)',
                                position: 'relative',
                                zIndex: 2,
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-danger)' }}>
                                  {isId ? 'Tumpah ke Gutter' : 'Gutter Bleed'}
                                </span>
                                <X size={12} color="var(--color-danger)" strokeWidth={2.5} />
                              </div>
                              <div style={{ height: '4px', background: 'color-mix(in srgb, var(--color-danger) 25%, transparent)', borderRadius: '2px', width: '70%' }} />
                            </div>

                            {/* Red warning zone indicating gutter encroachment */}
                            <div
                              style={{
                                width: '18px',
                                height: '100%',
                                background: 'repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.15) 3px, rgba(239, 68, 68, 0.3) 3px, rgba(239, 68, 68, 0.3) 6px)',
                                borderTop: '1px dashed var(--color-danger)',
                                borderBottom: '1px dashed var(--color-danger)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 3,
                                marginLeft: '-8px',
                              }}
                              title="Gutter Encroached"
                            />

                            <div
                              style={{
                                flex: 1,
                                height: '100%',
                                marginLeft: '2px',
                                background: 'var(--color-bg-surface)',
                                border: '1.5px dashed var(--color-danger)',
                                borderRadius: '6px',
                                padding: '8px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                opacity: 0.85,
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '9.5px', color: 'var(--color-danger)', fontWeight: 600 }}>
                                  {isId ? 'Tergeser' : 'Displaced'}
                                </span>
                                <X size={11} color="var(--color-danger)" />
                              </div>
                              <div style={{ height: '4px', background: 'color-mix(in srgb, var(--color-danger) 20%, transparent)', borderRadius: '2px', width: '50%' }} />
                            </div>
                          </div>
                        </div>

                        {/* Status label */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span
                            style={{
                              fontSize: '9.5px',
                              fontFamily: 'JetBrains Mono, monospace',
                              color: 'var(--color-danger)',
                              background: 'color-mix(in srgb, var(--color-danger) 10%, var(--color-bg-surface))',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: '1px solid color-mix(in srgb, var(--color-danger) 30%, transparent)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <X size={10} strokeWidth={2.5} />
                            {isId ? 'Batas Gutter Terpotong · Merusak Alur Vertikal' : 'Encroached Gutter Gap · Breaks Vertical Flow'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Jangan biarkan elemen memotong atau tumpah ke dalam gutter' : 'Don\'t let content encroach or bleed into gutters'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Menaruh elemen yang memotong separuh jarak gutter menciptakan ketegangan visual asimetris, merusak hierarki pembacaan, dan memecah kerapian layout responsif.'
                          : 'Placing content that partially bleeds into gutter gaps creates visual tension, breaks vertical scanning, and ruins responsive reflow.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* ── Pair 2: Mobile Column Collapse vs Micro-Column Squeeze ── */}
              <div className="grid-dodont-pair">
                <div className="grid-dodont-pair-header">
                  <div className="grid-dodont-pair-left">
                    <span className="grid-dodont-step-num">02</span>
                    <h3 className="grid-dodont-pair-title">
                      <Smartphone size={16} color="var(--color-primary)" />
                      {isId ? 'Responsivitas Layar Seluler & Kolom Minimal' : 'Mobile Responsiveness & Column Hierarchy'}
                    </h3>
                  </div>
                  <span className="grid-dodont-pair-badge">
                    {isId ? 'Breakpoint Mobile' : 'Mobile Breakpoint'}
                  </span>
                </div>

                <div className="dodont-grid">
                  {/* DO 2 */}
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div
                        style={{
                          width: '240px',
                          height: '124px',
                          background: 'var(--color-bg-surface)',
                          border: '1.5px solid var(--color-border)',
                          borderRadius: '12px',
                          padding: '8px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '4px' }}>
                          <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Smartphone size={11} color="var(--color-primary)" /> 375px Viewport
                          </span>
                          <span style={{ fontSize: '8px', padding: '1px 6px', borderRadius: '3px', background: 'var(--color-success)', color: '#fff', fontWeight: 600 }}>
                            {isId ? '4 Kolom' : '4 Columns'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid color-mix(in srgb, var(--color-success) 40%, transparent)', borderRadius: '4px', padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '9.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {isId ? 'Kartu Utama (col-4)' : 'Primary Card (col-4)'}
                            </span>
                            <span style={{ fontSize: '8px', color: 'var(--color-success)', fontWeight: 700, background: 'color-mix(in srgb, var(--color-success) 12%, transparent)', padding: '1px 5px', borderRadius: '3px' }}>
                              44px Tap
                            </span>
                          </div>
                          <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid color-mix(in srgb, var(--color-success) 40%, transparent)', borderRadius: '4px', padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '9.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {isId ? 'Kartu Kedua (col-4)' : 'Secondary Card (col-4)'}
                            </span>
                            <span style={{ fontSize: '8px', color: 'var(--color-success)', fontWeight: 700, background: 'color-mix(in srgb, var(--color-success) 12%, transparent)', padding: '1px 5px', borderRadius: '3px' }}>
                              {isId ? 'Tumpuk' : 'Stacked'}
                            </span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '8.5px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-success)', fontWeight: 600 }}>
                            ✓ {isId ? 'Area Sentuh Ergonomis & Konten Jelas' : 'Ergonomic Touch & Clear Content'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Runtuhkan kolom bertahap saat layar mengecil' : 'Collapse column counts gracefully on smaller viewports'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Transisikan tata letak dari 12 kolom di desktop menjadi 8 kolom di tablet dan 4 kolom di ponsel pintar agar elemen tersusun vertikal secara proporsional.'
                          : 'Step down column counts (12 cols on desktop → 8 on tablet → 4 on mobile) instead of forcing microscopic 12-column slivers on phones.'}
                      </div>
                    </div>
                  </RuleCard>

                  {/* DONT 2 */}
                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div
                        style={{
                          width: '240px',
                          height: '124px',
                          background: 'var(--color-bg-surface)',
                          border: '1.5px solid var(--color-border)',
                          borderRadius: '12px',
                          padding: '8px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '4px' }}>
                          <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Smartphone size={11} color="var(--color-danger)" /> 375px Viewport
                          </span>
                          <span style={{ fontSize: '8px', padding: '1px 6px', borderRadius: '3px', background: 'var(--color-danger)', color: '#fff', fontWeight: 600 }}>
                            {isId ? '12 Kolom Dipaksa' : '12 Columns Forced'}
                          </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2px', height: '46px', alignItems: 'stretch' }}>
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              style={{
                                background: 'color-mix(in srgb, var(--color-danger) 12%, var(--color-bg-canvas))',
                                border: '1px solid color-mix(in srgb, var(--color-danger) 40%, transparent)',
                                borderRadius: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '7px',
                                color: 'var(--color-danger)',
                                overflow: 'hidden',
                              }}
                            >
                              •
                            </div>
                          ))}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '8.5px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-danger)', fontWeight: 600 }}>
                            ✗ {isId ? 'Kolom ~12px Terlalu Sempit & Teks Hancur' : 'Micro-columns (~12px) Squeeze & Ruin Text'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Jangan paksakan 12 kolom sempit di perangkat mobile' : 'Don\'t force 12 thin columns on mobile phone viewports'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Mempertahankan 12 kolom pada layar 375px menyebabkan kolom hanya selebar beberapa piksel, membuat tombol dan teks terpotong tidak terbaca.'
                          : 'Retaining a rigid 12-column structure on a 375px screen results in unreadable compressed micro-columns and broken touch targets.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* ── Pair 3: Reading Measure Max-Width vs Full-Bleed Stretched Text ── */}
              <div className="grid-dodont-pair">
                <div className="grid-dodont-pair-header">
                  <div className="grid-dodont-pair-left">
                    <span className="grid-dodont-step-num">03</span>
                    <h3 className="grid-dodont-pair-title">
                      <Monitor size={16} color="var(--color-primary)" />
                      {isId ? 'Pembatasan Kontainer Bacaan & Panjang Baris' : 'Typographic Measure & Container Constraints'}
                    </h3>
                  </div>
                  <span className="grid-dodont-pair-badge">
                    {isId ? 'Ergonomi Keterbacaan' : 'Optimal Measure'}
                  </span>
                </div>

                <div className="dodont-grid">
                  {/* DO 3 */}
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '380px',
                          height: '124px',
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '4px' }}>
                          <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Monitor size={11} color="var(--color-primary)" /> {isId ? 'Layar Lebar Desktop' : 'Desktop Viewport'}
                          </span>
                          <span style={{ fontSize: '8px', background: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)', padding: '1px 6px', borderRadius: '3px', fontWeight: 700, border: '1px solid color-mix(in srgb, var(--color-success) 30%, transparent)' }}>
                            col-8 (Max 720px)
                          </span>
                        </div>

                        <div style={{ width: '68%', margin: '0 auto', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-success)', borderRadius: '5px', padding: '6px 8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-success)' }}>
                              {isId ? 'Kontainer Artikel' : 'Article Body'}
                            </span>
                            <span style={{ fontSize: '8px', color: 'var(--color-success)', fontWeight: 600 }}>65 CPL</span>
                          </div>
                          <div style={{ height: '3.5px', background: 'var(--color-text-secondary)', opacity: 0.35, borderRadius: '2px', width: '100%', marginBottom: '3px' }} />
                          <div style={{ height: '3.5px', background: 'var(--color-text-secondary)', opacity: 0.35, borderRadius: '2px', width: '88%', marginBottom: '3px' }} />
                          <div style={{ height: '3.5px', background: 'var(--color-text-secondary)', opacity: 0.35, borderRadius: '2px', width: '60%' }} />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '8.5px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-success)', fontWeight: 600 }}>
                            ✓ {isId ? 'Batas Baris Nyaman (60–75 Karakter)' : 'Optimal Line Measure (60–75 CPL)'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Gunakan kontainer maksimum untuk bacaan artikel' : 'Apply max-width containers for text-dense content'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Batasi kontainer artikel bacaan atau dokumentasi pada --container-lg (960px) atau 8 kolom tengah untuk menjaga kenyamanan 60–75 karakter per baris.'
                          : 'Constrain body copy within centered 8-column or 960px containers to maintain optimal typography line measure (60–75 characters per line).'}
                      </div>
                    </div>
                  </RuleCard>

                  {/* DONT 3 */}
                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '380px',
                          height: '124px',
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '4px' }}>
                          <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Monitor size={11} color="var(--color-danger)" /> {isId ? 'Layar Lebar Desktop' : 'Desktop Viewport'}
                          </span>
                          <span style={{ fontSize: '8px', background: 'color-mix(in srgb, var(--color-danger) 15%, transparent)', color: 'var(--color-danger)', padding: '1px 6px', borderRadius: '3px', fontWeight: 700, border: '1px solid color-mix(in srgb, var(--color-danger) 30%, transparent)' }}>
                            100% Full-Bleed
                          </span>
                        </div>

                        <div style={{ width: '100%', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-danger)', borderRadius: '5px', padding: '6px 8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-danger)' }}>
                              {isId ? 'Teks Melar Tanpa Batas' : 'Unconstrained Width'}
                            </span>
                            <span style={{ fontSize: '8px', color: 'var(--color-danger)', fontWeight: 600 }}>220+ CPL</span>
                          </div>
                          <div style={{ height: '3.5px', background: 'color-mix(in srgb, var(--color-danger) 40%, transparent)', borderRadius: '2px', width: '100%', marginBottom: '3px' }} />
                          <div style={{ height: '3.5px', background: 'color-mix(in srgb, var(--color-danger) 40%, transparent)', borderRadius: '2px', width: '96%', marginBottom: '3px' }} />
                          <div style={{ height: '3.5px', background: 'color-mix(in srgb, var(--color-danger) 40%, transparent)', borderRadius: '2px', width: '90%' }} />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '8.5px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-danger)', fontWeight: 600 }}>
                            ✗ {isId ? 'Teks Melar Melelahkan Mata Melompat Jauh' : 'Unbounded Lines Cause Severe Reader Fatigue'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Jangan biarkan paragraf teks membentang selebar 1920px' : 'Don\'t let text paragraphs stretch full-bleed on ultra-wide screens'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Paragraf panjang tanpa pembatas kontainer di monitor 4K sangat melelahkan dibaca karena mata harus melompat terlalu jauh dari ujung ke ujung.'
                          : 'Unbounded text stretches across ultra-wide monitors induce severe reader fatigue, requiring excessive horizontal eye scanning.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* ── Pair 4: Uniform Gutter Spacing vs Mixed Inconsistent Gaps ── */}
              <div className="grid-dodont-pair">
                <div className="grid-dodont-pair-header">
                  <div className="grid-dodont-pair-left">
                    <span className="grid-dodont-step-num">04</span>
                    <h3 className="grid-dodont-pair-title">
                      <Split size={16} color="var(--color-primary)" />
                      {isId ? 'Keseragaman Ukuran Gutter dalam Satu Tier' : 'Spatial Gutter Uniformity within Component Tiers'}
                    </h3>
                  </div>
                  <span className="grid-dodont-pair-badge">
                    {isId ? 'Ritme Spasial' : 'Spatial Rhythm'}
                  </span>
                </div>

                <div className="dodont-grid">
                  {/* DO 4 */}
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '380px',
                          height: '124px',
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '4px' }}>
                          <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Split size={11} color="var(--color-primary)" /> {isId ? 'Baris 3 Kartu Komponen' : '3-Card Component Row'}
                          </span>
                          <span style={{ fontSize: '8px', background: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)', padding: '1px 6px', borderRadius: '3px', fontWeight: 700, border: '1px solid color-mix(in srgb, var(--color-success) 30%, transparent)' }}>
                            {isId ? 'Gutter: 16px (Tetap)' : 'Gutter: 16px (Uniform)'}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                          {[1, 2, 3].map((num) => (
                            <div key={num} style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-success)', borderRadius: '5px', padding: '6px 4px', textAlign: 'center' }}>
                              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                                {isId ? `Kartu ${num}` : `Card ${num}`}
                              </span>
                              <div style={{ height: '3.5px', background: 'color-mix(in srgb, var(--color-success) 25%, transparent)', borderRadius: '2px', width: '65%', margin: '4px auto 0' }} />
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px' }}>
                          <span style={{ fontSize: '8px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-success)', background: 'color-mix(in srgb, var(--color-success) 10%, transparent)', padding: '1px 6px', borderRadius: '3px', border: '1px solid color-mix(in srgb, var(--color-success) 25%, transparent)' }}>
                            Gap: 16px
                          </span>
                          <span style={{ fontSize: '8px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-success)', background: 'color-mix(in srgb, var(--color-success) 10%, transparent)', padding: '1px 6px', borderRadius: '3px', border: '1px solid color-mix(in srgb, var(--color-success) 25%, transparent)' }}>
                            Gap: 16px
                          </span>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '8.5px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-success)', fontWeight: 600 }}>
                            ✓ {isId ? 'Celah Seragam: var(--grid-gutter-md)' : 'Consistent Rhythm: var(--grid-gutter-md)'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Gunakan ukuran gutter yang konsisten dalam satu baris' : 'Maintain uniform gutter spacing across adjacent columns'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Pastikan semua celah antarkartu yang sejajar menggunakan variabel gutter yang sama (--grid-gutter-md atau --grid-gutter-lg) guna menciptakan ritme geometris yang harmonis.'
                          : 'Ensure all card gaps in a single row utilize the identical gutter variable (--grid-gutter-md or --grid-gutter-lg) to preserve geometric rhythm.'}
                      </div>
                    </div>
                  </RuleCard>

                  {/* DONT 4 */}
                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '380px',
                          height: '124px',
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '4px' }}>
                          <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Split size={11} color="var(--color-danger)" /> {isId ? 'Baris 3 Kartu Komponen' : '3-Card Component Row'}
                          </span>
                          <span style={{ fontSize: '8px', background: 'color-mix(in srgb, var(--color-danger) 15%, transparent)', color: 'var(--color-danger)', padding: '1px 6px', borderRadius: '3px', fontWeight: 700, border: '1px solid color-mix(in srgb, var(--color-danger) 30%, transparent)' }}>
                            {isId ? 'Gutter Acak (6px & 28px)' : 'Mixed Gaps (6px & 28px)'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ flex: 1, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-danger)', borderRadius: '5px', padding: '6px 4px', textAlign: 'center' }}>
                            <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {isId ? 'Kartu 1' : 'Card 1'}
                            </span>
                            <div style={{ height: '3.5px', background: 'color-mix(in srgb, var(--color-danger) 25%, transparent)', borderRadius: '2px', width: '60%', margin: '4px auto 0' }} />
                          </div>
                          <div style={{ width: '4px', height: '24px', background: 'color-mix(in srgb, var(--color-danger) 40%, transparent)', borderRadius: '2px', margin: '0 2px' }} title="6px - Cramped" />
                          <div style={{ flex: 1, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-danger)', borderRadius: '5px', padding: '6px 4px', textAlign: 'center' }}>
                            <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {isId ? 'Kartu 2' : 'Card 2'}
                            </span>
                            <div style={{ height: '3.5px', background: 'color-mix(in srgb, var(--color-danger) 25%, transparent)', borderRadius: '2px', width: '60%', margin: '4px auto 0' }} />
                          </div>
                          <div style={{ width: '22px', height: '24px', background: 'color-mix(in srgb, var(--color-danger) 40%, transparent)', borderRadius: '2px', margin: '0 2px' }} title="28px - Too wide" />
                          <div style={{ flex: 1, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-danger)', borderRadius: '5px', padding: '6px 4px', textAlign: 'center' }}>
                            <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {isId ? 'Kartu 3' : 'Card 3'}
                            </span>
                            <div style={{ height: '3.5px', background: 'color-mix(in srgb, var(--color-danger) 25%, transparent)', borderRadius: '2px', width: '60%', margin: '4px auto 0' }} />
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
                          <span style={{ fontSize: '8px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-danger)', background: 'color-mix(in srgb, var(--color-danger) 10%, transparent)', padding: '1px 5px', borderRadius: '3px' }}>
                            Gap: 6px ({isId ? 'Sempit' : 'Cramped'})
                          </span>
                          <span style={{ fontSize: '8px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-danger)', background: 'color-mix(in srgb, var(--color-danger) 10%, transparent)', padding: '1px 5px', borderRadius: '3px' }}>
                            Gap: 28px ({isId ? 'Bocor' : 'Leaking'})
                          </span>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '8.5px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-danger)', fontWeight: 600 }}>
                            ✗ {isId ? 'Celah Tidak Rata Merusak Keteraturan Visual' : 'Disparate Gaps Break Visual Harmony'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Jangan mencampuradukkan jarak gutter yang berbeda dalam satu grid' : 'Don\'t mix disparate gutter gaps haphazardly in a tier'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Mengombinasikan jarak celah yang berbeda-beda secara sembarangan dalam satu tier membuat antarmuka terasa tidak terencana dan merusak keteraturan desain Neudela.'
                          : 'Combining arbitrary, differing gap dimensions across sibling cards makes the layout feel disjointed and damages Neudela visual polish.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 2: INTERACTIVE SIMULATOR & INSPECTOR
         ══════════════════════════════════════════════════════════════════ */}
      {activeTabMode === 'simulator' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6, 24px)' }}>
          {/* Controls Bar */}
          <div className="grid-simulator-controls">
            {/* Viewport device preset selector */}
            <div className="grid-control-group">
              <span className="grid-control-label">{isId ? 'Preset Perangkat:' : 'Device Viewport:'}</span>
              {BREAKPOINTS.map((bp) => {
                const IconComp = bp.icon;
                return (
                  <button
                    key={bp.id}
                    type="button"
                    className={`grid-btn-pill ${selectedBp === bp.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedBp(bp.id);
                      setOverrideCols(null);
                      setOverrideGutter(null);
                      setOverrideMargin(null);
                    }}
                  >
                    <IconComp size={13} />
                    {bp.id.toUpperCase()}
                  </button>
                );
              })}
            </div>

            {/* Template selector */}
            <div className="grid-control-group">
              <span className="grid-control-label">{isId ? 'Susunan Kolom:' : 'Layout Template:'}</span>
              <select
                value={activeTemplate}
                onChange={(e) => setActiveTemplate(e.target.value)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-md, 8px)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-surface)',
                  color: 'var(--color-text-primary)',
                  fontSize: 12,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
              >
                {Object.entries(TEMPLATES).map(([key, item]) => (
                  <option key={key} value={key}>
                    {isId ? item.titleId : item.titleEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle guides */}
            <div className="grid-control-group">
              <button
                type="button"
                className={`grid-toggle-btn ${showOverlay ? 'active' : ''}`}
                onClick={() => setShowOverlay(!showOverlay)}
              >
                <Eye size={12} />
                {isId ? 'Overlay Grid' : 'Grid Overlay'}
              </button>
              <button
                type="button"
                className={`grid-toggle-btn ${showDimensions ? 'active' : ''}`}
                onClick={() => setShowDimensions(!showDimensions)}
              >
                <Maximize2 size={12} />
                {isId ? 'Label Dimensi' : 'Dimensions'}
              </button>
              <button
                type="button"
                className="grid-btn-pill"
                onClick={handleResetSimulator}
                title={isId ? 'Atur ulang ke default' : 'Reset to default'}
              >
                <RotateCcw size={12} />
                {isId ? 'Reset' : 'Reset'}
              </button>
            </div>
          </div>

          {/* Secondary parameter adjustments: Columns, Gutter, Margin */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              padding: '12px 18px',
              background: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-lg, 12px)',
              border: '1px solid var(--color-border)',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Columns selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                {isId ? 'Kolom Track:' : 'Column Tracks:'}
              </span>
              {[4, 6, 8, 12].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  className={`grid-btn-pill ${activeColumns === cnt ? 'active' : ''}`}
                  onClick={() => setOverrideCols(cnt)}
                  style={{ padding: '2px 8px', fontSize: 11 }}
                >
                  {cnt} cols
                </button>
              ))}
            </div>

            {/* Gutter selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                {isId ? 'Gutter Gap:' : 'Gutter Gap:'}
              </span>
              {[12, 16, 20, 24, 32].map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`grid-btn-pill ${activeGutter === g ? 'active' : ''}`}
                  onClick={() => setOverrideGutter(g)}
                  style={{ padding: '2px 8px', fontSize: 11 }}
                >
                  {g}px
                </button>
              ))}
            </div>

            {/* Margin selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                {isId ? 'Margin Tepi:' : 'Safe Margin:'}
              </span>
              {[16, 24, 32, 40, 48].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`grid-btn-pill ${activeMargin === m ? 'active' : ''}`}
                  onClick={() => setOverrideMargin(m)}
                  style={{ padding: '2px 8px', fontSize: 11 }}
                >
                  {m}px
                </button>
              ))}
            </div>
          </div>

          {/* Simulator Canvas Stage */}
          <div className="grid-simulator-stage">
            {/* Viewport device header */}
            <div className="grid-simulator-viewport-bar">
              <div className="grid-viewport-meta">
                <span className="grid-viewport-badge">{selectedBp.toUpperCase()}</span>
                <span className="grid-viewport-device-name">
                  {currentBp.name} · {currentBp.rangeText}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, fontFamily: 'JetBrains Mono', color: 'var(--color-text-secondary)' }}>
                <span>{activeColumns} Columns</span>
                <span>•</span>
                <span>{activeGutter}px Gutter</span>
                <span>•</span>
                <span>{activeMargin}px Margin</span>
                <span>•</span>
                <span>Max: {currentBp.containerMax}</span>
              </div>
            </div>

            {/* Device Canvas Frame */}
            <div className="grid-canvas-window" style={{ maxWidth: canvasMaxWidth }}>
              <div
                className="grid-canvas-container"
                style={{
                  padding: `24px ${activeMargin}px`,
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {/* Visual Column Guides Overlay (translucent tracks behind blocks) */}
                {showOverlay && (
                  <div
                    className="grid-overlay-tracks"
                    style={{
                      left: `${activeMargin}px`,
                      right: `${activeMargin}px`,
                      gridTemplateColumns: `repeat(${activeColumns}, 1fr)`,
                      gap: `${activeGutter}px`,
                    }}
                  >
                    {Array.from({ length: activeColumns }).map((_, idx) => (
                      <div key={idx} className="grid-overlay-track-col">
                        <span>{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actual Layout Blocks Layer */}
                <div
                  className="grid-blocks-layer"
                  style={{
                    gridTemplateColumns: `repeat(${activeColumns}, 1fr)`,
                    gap: `${activeGutter}px`,
                  }}
                >
                  {(TEMPLATES[activeTemplate]?.blocks || TEMPLATES['6-6'].blocks).map((block, idx) => {
                    const actualSpan = Math.min(block.span, activeColumns);
                    return (
                      <div
                        key={idx}
                        className="grid-layout-block"
                        style={{
                          gridColumn: `span ${actualSpan}`,
                        }}
                      >
                        <span className="grid-block-span-badge">
                          col-{actualSpan} of {activeColumns}
                        </span>
                        <span className="grid-block-title">
                          {isId ? block.labelId : block.labelEn}
                        </span>
                        {showDimensions && (
                          <span
                            style={{
                              fontSize: 9.5,
                              fontFamily: 'JetBrains Mono',
                              color: 'var(--color-text-tertiary)',
                              background: 'var(--color-bg-subtle)',
                              padding: '1px 6px',
                              borderRadius: 3,
                              marginTop: 2,
                            }}
                          >
                            Span {actualSpan} · Gutter {activeGutter}px
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Live Code Generator Panel */}
          <div className="section-card" style={{ marginTop: 'var(--space-2, 8px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Code2 size={16} color="var(--color-primary)" />
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
                  {isId ? 'Ekspor Kode Responsif' : 'Generated Code Export'}
                </h3>
              </div>

              {/* Code language tabs */}
              <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md, 8px)', overflow: 'hidden' }}>
                {(['css-grid', 'flexbox', 'react', 'html'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className={`playground-tab ${codeLang === lang ? 'active' : ''}`}
                    onClick={() => setCodeLang(lang)}
                    style={{ borderRadius: 0, padding: '4px 10px', fontSize: 11, textTransform: 'uppercase' }}
                  >
                    {lang.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Copy button */}
              <button
                type="button"
                className="grid-btn-pill"
                onClick={() => copyToClipboard(generatedCode, 'Generated layout code copied!')}
                style={{ background: 'var(--color-primary)', color: '#ffffff', borderColor: 'var(--color-primary)' }}
              >
                <Copy size={13} />
                {isId ? 'Salin Kode' : 'Copy Code'}
              </button>
            </div>

            {/* Code view */}
            <pre
              style={{
                margin: 0,
                padding: '16px',
                background: 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md, 8px)',
                fontFamily: 'JetBrains Mono',
                fontSize: 12,
                color: 'var(--color-text-primary)',
                lineHeight: 1.6,
                overflowX: 'auto',
              }}
            >
              <code>{generatedCode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 3: LAYOUT PATTERNS SHOWCASE
         ══════════════════════════════════════════════════════════════════ */}
      {activeTabMode === 'patterns' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6, 24px)' }}>
          <div className="section-card">
            <h2 className="section-title">
              {isId ? 'Pola Tata Letak Populer' : 'Common Application Layout Patterns'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Contoh implementasi nyata tata letak 12 kolom pada skenario aplikasi modern Neudela. Klik toggle "Tampilkan Grid Kolom" pada setiap kartu untuk memverifikasi keselarasan struktural.'
                : 'Canonical layout structures utilized across modern Neudela enterprise applications. Toggle "Show Grid Columns" on each pattern card to inspect structural alignment.'}
            </p>

            <div className="grid-patterns-grid">
              {/* Pattern 1: Executive Dashboard */}
              <div className="grid-pattern-card">
                <div className="grid-pattern-header">
                  <div>
                    <h3 style={{ margin: 0, fontSize: 13.5, fontWeight: 700 }}>
                      {isId ? '1. Dashboard Metrik & Analitik' : '1. Executive KPI Dashboard'}
                    </h3>
                    <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                      4x col-3 (KPIs) + col-8 (Chart) + col-4 (Feeds)
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`grid-toggle-btn ${patternGridActive.dashboard ? 'active' : ''}`}
                    onClick={() =>
                      setPatternGridActive((prev) => ({ ...prev, dashboard: !prev.dashboard }))
                    }
                  >
                    <Eye size={12} />
                    Grid Overlay
                  </button>
                </div>

                <div className="grid-pattern-preview">
                  {/* Optional grid overlay */}
                  {patternGridActive.dashboard && (
                    <div
                      className="grid-overlay-tracks"
                      style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', padding: '0 16px' }}
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="grid-overlay-track-col">{i + 1}</div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', position: 'relative', zIndex: 2 }}>
                    {/* 4 KPIs (col-3 each) */}
                    {[1, 2, 3, 4].map((k) => (
                      <div
                        key={k}
                        style={{
                          gridColumn: 'span 3',
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 6,
                          padding: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 3,
                        }}
                      >
                        <span style={{ fontSize: 9.5, color: 'var(--color-text-tertiary)' }}>Metric 0{k}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary)' }}>$24,500</span>
                      </div>
                    ))}

                    {/* Chart (col-8) */}
                    <div
                      style={{
                        gridColumn: 'span 8',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 6,
                        padding: '16px',
                        minHeight: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600 }}>Revenue Trend (col-8)</span>
                      <div style={{ height: '36px', background: 'rgba(2, 132, 199, 0.08)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#0284c7' }}>
                        Chart Visualization Area
                      </div>
                    </div>

                    {/* Activity Feed (col-4) */}
                    <div
                      style={{
                        gridColumn: 'span 4',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 6,
                        padding: '16px',
                        minHeight: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600 }}>Feed (col-4)</span>
                      <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span>• Order #9021 confirmed</span>
                        <span>• User sync complete</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid-pattern-footer">
                  <span style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Pola standar untuk panel kontrol metrik, menggabungkan deretan kartu KPI 4 kolom dengan visualisasi data 8 kolom.'
                      : 'Standard executive dashboard combining 4-column KPI metric arrays with an 8-column analytical chart canvas.'}
                  </span>
                </div>
              </div>

              {/* Pattern 2: Split Hero Section */}
              <div className="grid-pattern-card">
                <div className="grid-pattern-header">
                  <div>
                    <h3 style={{ margin: 0, fontSize: 13.5, fontWeight: 700 }}>
                      {isId ? '2. Bagian Hero Terbelah (Split Hero)' : '2. Split Hero Landing Section'}
                    </h3>
                    <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                      col-6 (Headline + CTA) + col-6 (Graphic Showcase)
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`grid-toggle-btn ${patternGridActive.split ? 'active' : ''}`}
                    onClick={() =>
                      setPatternGridActive((prev) => ({ ...prev, split: !prev.split }))
                    }
                  >
                    <Eye size={12} />
                    Grid Overlay
                  </button>
                </div>

                <div className="grid-pattern-preview">
                  {patternGridActive.split && (
                    <div
                      className="grid-overlay-tracks"
                      style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', padding: '0 16px' }}
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="grid-overlay-track-col">{i + 1}</div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '12px', position: 'relative', zIndex: 2 }}>
                    {/* Left Hero (col-6) */}
                    <div
                      style={{
                        gridColumn: 'span 6',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 6,
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Build Faster with Neudela
                      </span>
                      <span style={{ fontSize: 10, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                        A modular design system for enterprise products with high craft and accessibility.
                      </span>
                      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                        <span style={{ fontSize: 9.5, padding: '3px 8px', borderRadius: 4, background: 'var(--color-primary)', color: '#fff', fontWeight: 600 }}>
                          Get Started
                        </span>
                        <span style={{ fontSize: 9.5, padding: '3px 8px', borderRadius: 4, background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
                          Documentation
                        </span>
                      </div>
                    </div>

                    {/* Right Hero Graphic (col-6) */}
                    <div
                      style={{
                        gridColumn: 'span 6',
                        background: 'linear-gradient(135deg, rgba(223, 126, 48, 0.12) 0%, rgba(2, 132, 199, 0.12) 100%)',
                        border: '1px solid rgba(223, 126, 48, 0.3)',
                        borderRadius: 6,
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '110px',
                      }}
                    >
                      <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: 'var(--color-primary)', fontWeight: 600 }}>
                        [ col-6 Media Container ]
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid-pattern-footer">
                  <span style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Format 50/50 seimbang sempurna untuk halaman beranda pemasaran, halaman login, atau demonstrasi fitur produk.'
                      : 'Balanced 50/50 dual-column hero layout commonly used for marketing landings and authentication portals.'}
                  </span>
                </div>
              </div>

              {/* Pattern 3: Multi-column Form */}
              <div className="grid-pattern-card">
                <div className="grid-pattern-header">
                  <div>
                    <h3 style={{ margin: 0, fontSize: 13.5, fontWeight: 700 }}>
                      {isId ? '3. Formulir Multi-Kolom Responsif' : '3. Multi-Field Structured Form'}
                    </h3>
                    <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                      col-6 + col-6 (Names) | col-12 (Address) | col-5 + col-4 + col-3
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`grid-toggle-btn ${patternGridActive.form ? 'active' : ''}`}
                    onClick={() =>
                      setPatternGridActive((prev) => ({ ...prev, form: !prev.form }))
                    }
                  >
                    <Eye size={12} />
                    Grid Overlay
                  </button>
                </div>

                <div className="grid-pattern-preview">
                  {patternGridActive.form && (
                    <div
                      className="grid-overlay-tracks"
                      style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', padding: '0 16px' }}
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="grid-overlay-track-col">{i + 1}</div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px', position: 'relative', zIndex: 2 }}>
                    <div style={{ gridColumn: 'span 6', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '6px 8px', fontSize: 10 }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>First Name (col-6)</span>
                    </div>
                    <div style={{ gridColumn: 'span 6', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '6px 8px', fontSize: 10 }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>Last Name (col-6)</span>
                    </div>
                    <div style={{ gridColumn: 'span 12', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '6px 8px', fontSize: 10 }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>Street Address (col-12)</span>
                    </div>
                    <div style={{ gridColumn: 'span 5', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '6px 8px', fontSize: 10 }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>City (col-5)</span>
                    </div>
                    <div style={{ gridColumn: 'span 4', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '6px 8px', fontSize: 10 }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>State / Prov (col-4)</span>
                    </div>
                    <div style={{ gridColumn: 'span 3', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '6px 8px', fontSize: 10 }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>Zip (col-3)</span>
                    </div>
                  </div>
                </div>

                <div className="grid-pattern-footer">
                  <span style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Pemisahan input formulir secara matematis yang runtuh menjadi kolom tunggal otomatis pada layar mobile.'
                      : 'Mathematical field subdivision ensuring harmonious multi-tier inputs that collapse into 1-column on mobile.'}
                  </span>
                </div>
              </div>

              {/* Pattern 4: Reader Documentation Container */}
              <div className="grid-pattern-card">
                <div className="grid-pattern-header">
                  <div>
                    <h3 style={{ margin: 0, fontSize: 13.5, fontWeight: 700 }}>
                      {isId ? '4. Halaman Dokumentasi & Artikel' : '4. Constrained Article Reader'}
                    </h3>
                    <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                      col-3 (Sidebar) + col-7 (Readable Article) + col-2 (TOC)
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`grid-toggle-btn ${patternGridActive.reader ? 'active' : ''}`}
                    onClick={() =>
                      setPatternGridActive((prev) => ({ ...prev, reader: !prev.reader }))
                    }
                  >
                    <Eye size={12} />
                    Grid Overlay
                  </button>
                </div>

                <div className="grid-pattern-preview">
                  {patternGridActive.reader && (
                    <div
                      className="grid-overlay-tracks"
                      style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', padding: '0 16px' }}
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="grid-overlay-track-col">{i + 1}</div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', position: 'relative', zIndex: 2 }}>
                    {/* Left Nav (col-3) */}
                    <div
                      style={{
                        gridColumn: 'span 3',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 4,
                        padding: '10px',
                        fontSize: 9.5,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Nav (col-3)</span>
                      <br />• Overview
                      <br />• Anatomy
                      <br />• Usage
                    </div>

                    {/* Article Body (col-7) */}
                    <div
                      style={{
                        gridColumn: 'span 7',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 4,
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700 }}>Core Guide (col-7)</span>
                      <span style={{ fontSize: 9.5, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                        Reading length constrained to 65 characters per line for effortless optical scanning.
                      </span>
                    </div>

                    {/* Table of contents (col-2) */}
                    <div
                      style={{
                        gridColumn: 'span 2',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 4,
                        padding: '8px',
                        fontSize: 9,
                        color: 'var(--color-text-tertiary)',
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>TOC (col-2)</span>
                      <br />#top
                      <br />#specs
                    </div>
                  </div>
                </div>

                <div className="grid-pattern-footer">
                  <span style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Format ergonomis untuk portal dokumentasi pengembang dan publikasi artikel panjang.'
                      : 'Ergonomic asymmetric format engineered for documentation hubs and developer publications.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Next Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'colors', label: t.nav.colors }}
        next={{ id: 'icons', label: t.nav.icons }}
        setActiveTab={setActiveTab}
      />

      {/* ── Toast Notification ── */}
      <div className={`copy-toast ${showToast ? 'show' : ''}`}>
        <Check size={16} strokeWidth={2.4} />
        <span>{toastMsg}</span>
      </div>
    </div>
  );
}
