import React, { useState, useMemo, useEffect } from 'react';
import { icons } from 'lucide-react';
import { 
  Search, 
  X, 
  Copy, 
  Check, 
  Layers, 
  LayoutGrid as GridIcon, 
  SlidersHorizontal, 
  CircleCheck, 
  CircleX, 
  CircleAlert,
  Sparkles, 
  Box
} from 'lucide-react';
import NextPrevious from '../../components/NextPrevious';
import { useLanguage } from '../../context/LanguageContext';
import NeuronButton from '../../components/NeuronButton';

function RuleCard({ type, children }: { type: 'do' | 'dont'; children: React.ReactNode }) {
  const isDo = type === 'do';
  return (
    <div className={`rule-card rule-card--${type}`}>
      <div className="rule-card__badge">
        {isDo ? (
          <CircleCheck size={14} strokeWidth={2.5} />
        ) : (
          <CircleX size={14} strokeWidth={2.5} />
        )}
        <span>{isDo ? 'DO' : "DON'T"}</span>
      </div>
      {children}
    </div>
  );
}

interface IconsViewProps {
  setActiveTab: (tabId: string) => void;
}

// Category keyword dictionary matching icon names
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  interface: [
    'check', 'x', 'close', 'plus', 'minus', 'chevron', 'arrow', 'menu', 'search',
    'filter', 'sort', 'sliders', 'settings', 'gear', 'more', 'dots', 'grid', 'list',
    'eye', 'trash', 'edit', 'pen', 'copy', 'share', 'download', 'upload', 'refresh',
    'rotate', 'maximize', 'minimize', 'external', 'link', 'info', 'help', 'alert',
    'bell', 'bookmark', 'pin', 'flag', 'tag', 'lock', 'unlock', 'key', 'home',
    'user', 'log', 'power', 'toggle'
  ],
  arrows: [
    'arrow', 'chevron', 'corner', 'move', 'expand', 'shrink', 'unfold', 'fold',
    'rotate', 'redo', 'undo', 'repeat', 'shuffle', 'navigation', 'compass'
  ],
  communication: [
    'mail', 'message', 'chat', 'send', 'inbox', 'at', 'phone', 'call', 'voicemail',
    'rss', 'contact', 'share', 'thumbs', 'heart', 'smile', 'frown'
  ],
  files: [
    'file', 'folder', 'archive', 'clipboard', 'book', 'bookmark', 'paperclip',
    'newspaper', 'notebook', 'receipt', 'table', 'sheet', 'pdf', 'docx'
  ],
  shapes: [
    'circle', 'square', 'triangle', 'box', 'pentagon', 'hexagon', 'octagon',
    'diamond', 'star', 'cross', 'cylinder', 'cone', 'cube', 'pyramid', 'shield',
    'badge', 'sparkle'
  ],
  time: [
    'clock', 'alarm', 'timer', 'hourglass', 'calendar', 'history', 'watch', 'sun',
    'moon', 'sunrise', 'sunset'
  ],
  security: [
    'lock', 'unlock', 'key', 'shield', 'fingerprint', 'scan', 'eye', 'vault',
    'binary', 'bug', 'terminal'
  ],
  media: [
    'play', 'pause', 'stop', 'forward', 'rewind', 'volume', 'mic', 'music',
    'video', 'camera', 'film', 'image', 'tv', 'radio', 'podcast', 'disc',
    'speaker', 'headphones'
  ],
  devices: [
    'smartphone', 'tablet', 'laptop', 'monitor', 'cpu', 'hard', 'server', 'wifi',
    'bluetooth', 'cast', 'printer', 'battery', 'usb', 'mouse', 'keyboard', 'watch'
  ],
  commerce: [
    'cart', 'shopping', 'bag', 'tag', 'credit', 'wallet', 'dollar', 'euro', 'pound',
    'coins', 'banknote', 'receipt', 'percent', 'gift', 'package', 'truck', 'store'
  ],
  dev: [
    'code', 'git', 'terminal', 'binary', 'bug', 'database', 'webhook', 'braces',
    'brackets', 'qr', 'cpu', 'server', 'component'
  ],
  places: [
    'map', 'pin', 'navigation', 'compass', 'building', 'home', 'warehouse',
    'factory', 'hotel', 'landmark', 'mountain', 'tent', 'tree', 'cloud', 'sun',
    'rain', 'wind', 'umbrella'
  ]
};

const CATEGORIES = [
  { id: 'all', labelEn: 'All Icons', labelId: 'Semua Ikon' },
  { id: 'interface', labelEn: 'UI & Navigation', labelId: 'Antarmuka & Navigasi' },
  { id: 'arrows', labelEn: 'Arrows & Direction', labelId: 'Panah & Arah' },
  { id: 'communication', labelEn: 'Communication', labelId: 'Komunikasi' },
  { id: 'files', labelEn: 'Files & Content', labelId: 'Berkas & Konten' },
  { id: 'shapes', labelEn: 'Shapes & Symbols', labelId: 'Bentuk & Simbol' },
  { id: 'time', labelEn: 'Time & Calendar', labelId: 'Waktu & Kalender' },
  { id: 'security', labelEn: 'Security & Access', labelId: 'Keamanan & Sistem' },
  { id: 'media', labelEn: 'Media & Audio', labelId: 'Media & Audio' },
  { id: 'devices', labelEn: 'Devices & Tech', labelId: 'Perangkat & Gadget' },
  { id: 'commerce', labelEn: 'Commerce & Finance', labelId: 'Keuangan & Bisnis' },
  { id: 'dev', labelEn: 'Code & Developer', labelId: 'Kode & Developer' },
  { id: 'places', labelEn: 'Places & Weather', labelId: 'Lokasi & Cuaca' },
];

const COLOR_SWATCHES = [
  { id: 'brand', labelEn: 'Brand Terracotta', labelId: 'Terracotta Brand', value: '#df7e30' },
  { id: 'current', labelEn: 'Default (Current Color)', labelId: 'Default (Teks)', value: 'currentColor' },
  { id: 'slate', labelEn: 'Slate Neutral', labelId: 'Slate Netral', value: '#64748b' },
  { id: 'emerald', labelEn: 'Success Emerald', labelId: 'Success Hijau', value: '#10b981' },
  { id: 'coral', labelEn: 'Danger Coral', labelId: 'Danger Merah', value: '#ef4444' },
  { id: 'amber', labelEn: 'Warning Amber', labelId: 'Warning Kuning', value: '#f59e0b' },
  { id: 'sky', labelEn: 'Sky Info', labelId: 'Sky Biru', value: '#0284c7' },
  { id: 'purple', labelEn: 'Purple Accent', labelId: 'Ungu Aksen', value: '#8b5cf6' },
];

const SIZE_OPTIONS = [
  { label: '16px', value: 16, token: '--icon-size-sm' },
  { label: '20px', value: 20, token: '--icon-size-md' },
  { label: '24px', value: 24, token: '--icon-size-lg' },
  { label: '32px', value: 32, token: '--icon-size-xl' },
  { label: '40px', value: 40, token: '--icon-size-2xl' },
];

const STROKE_OPTIONS = [
  { label: '1px', value: 1, name: 'Hairline' },
  { label: '1.5px', value: 1.5, name: 'Light' },
  { label: '2px', value: 2, name: 'Regular' },
  { label: '2.5px', value: 2.5, name: 'Medium' },
  { label: '3px', value: 3, name: 'Bold' },
];

const TOKENS_DATA = [
  { token: '--icon-size-xs', value: '14px', descId: 'Ikon super mini untuk inline badge mikro atau subteks', descEn: 'Super compact icon for micro badges or subtext' },
  { token: '--icon-size-sm', value: '16px', descId: 'Ikon kompak untuk Button Small, Form Input, dan Badges', descEn: 'Compact icon for Small Button, Form Input, and Badges' },
  { token: '--icon-size-md', value: '20px', descId: 'Ikon standar untuk Button Medium, List Item, dan Dropdown', descEn: 'Standard icon for Medium Button, List Item, and Dropdown' },
  { token: '--icon-size-lg', value: '24px', descId: 'Ukuran grid dasar Neudela untuk navigasi bar dan header aksi', descEn: 'Neudela base grid size for navigation bar and action headers' },
  { token: '--icon-size-xl', value: '32px', descId: 'Ikon besar untuk Feature Cards, Empty States, dan Dialogs', descEn: 'Large icon for Feature Cards, Empty States, and Dialogs' },
  { token: '--icon-size-2xl', value: '40px', descId: 'Ikon hero display untuk Ilustrasi Empty State dan Onboarding', descEn: 'Hero display icon for Empty State Illustrations and Onboarding' },
  { token: '--icon-stroke-hairline', value: '1px', descId: 'Garis tipis minimalis untuk icon berukuran ekstra besar (40px+)', descEn: 'Minimal hairline stroke for extra-large icons (40px+)' },
  { token: '--icon-stroke-light', value: '1.5px', descId: 'Garis ringan untuk antarmuka padat data (dense tables)', descEn: 'Light stroke for data-dense interfaces (dense tables)' },
  { token: '--icon-stroke-regular', value: '2px', descId: 'STANDAR RESMI NEUDELA: ketebalan seimbang untuk semua ukuran dasar', descEn: 'NEUDELA OFFICIAL STANDARD: balanced stroke for all base sizes' },
  { token: '--icon-stroke-medium', value: '2.5px', descId: 'Garis semi-tebal untuk penekanan status aktif atau fokus', descEn: 'Medium stroke for active state emphasis or focus' },
  { token: '--icon-stroke-bold', value: '3px', descId: 'Garis tebal untuk tanda bahaya kritis atau peringatan darurat', descEn: 'Bold stroke for critical alerts or emergency warnings' },
];

export default function IconsView({ setActiveTab }: IconsViewProps) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  // Sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<'explorer' | 'anatomy' | 'guidelines' | 'tokens'>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('anatomy')) return 'anatomy';
    if (hash.includes('guidelines') || hash.includes('dodont')) return 'guidelines';
    if (hash.includes('tokens')) return 'tokens';
    return 'explorer';
  });

  const handleSubTabChange = (tab: 'explorer' | 'anatomy' | 'guidelines' | 'tokens') => {
    setActiveSubTab(tab);
    const targetHash = tab === 'explorer' ? '#icons' : `#icons-${tab}`;
    window.history.replaceState(null, '', targetHash);
  };

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Live Toolbar Customizer states
  const [iconSize, setIconSize] = useState<number>(24);
  const [iconStroke, setIconStroke] = useState<number>(2);
  const [iconColor, setIconColor] = useState<string>('#df7e30');
  const [isCompactGrid, setIsCompactGrid] = useState<boolean>(false);

  // Pagination / slice count
  const [displayCount, setDisplayCount] = useState<number>(108);

  // Detail Inspector Modal
  const [selectedIconName, setSelectedIconName] = useState<string | null>(() => {
    const hash = window.location.hash;
    const match = hash.match(/icon=([a-zA-Z0-9]+)/);
    if (match && (icons as Record<string, unknown>)[match[1]]) return match[1];
    return null;
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Keyline anatomy guides state
  const [anatomyGuides, setAnatomyGuides] = useState({
    safeZone: true,
    circle: true,
    square: true,
    diagonals: true,
    crosshair: true,
  });

  // All icon names from lucide-react
  const allIconNames = useMemo(() => Object.keys(icons), []);

  // Filtered icon names based on search and category
  const filteredIconNames = useMemo(() => {
    let result = allIconNames;

    // Filter by Category
    if (selectedCategory !== 'all') {
      const keywords = CATEGORY_KEYWORDS[selectedCategory] || [];
      result = result.filter(name => {
        const lower = name.toLowerCase();
        return keywords.some(kw => lower.includes(kw));
      });
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(name => name.toLowerCase().includes(query));
    }

    return result;
  }, [allIconNames, selectedCategory, searchQuery]);

  // Sliced icons for current page
  const visibleIcons = useMemo(() => {
    return filteredIconNames.slice(0, displayCount);
  }, [filteredIconNames, displayCount]);

  // Reset pagination when filter/search changes
  useEffect(() => {
    setDisplayCount(108);
  }, [selectedCategory, searchQuery]);

  // Copy helper
  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} ${isId ? 'berhasil disalin!' : 'copied to clipboard!'}`);
    setTimeout(() => setToastMessage(null), 2400);
  };

  // Quick install copy state & handler
  const [copiedInstall, setCopiedInstall] = useState(false);
  const handleCopyInstall = () => {
    copyText('npm install lucide-react', 'Install command');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  // Safe render component
  const renderIcon = (name: string, size: number, stroke: number, color: string) => {
    const Component = (icons as Record<string, React.ElementType>)[name];
    if (!Component) return null;
    return <Component size={size} strokeWidth={stroke} color={color} />;
  };

  return (
    <div className="icons-view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <span
          style={{
            fontSize: 'var(--fs-text-xs, 12px)',
            fontWeight: 'var(--font-weight-bold, 700)',
            color: 'var(--brand-500, #df7e30)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: 'var(--space-2, 8px)',
          }}
        >
          <Sparkles size={14} strokeWidth={2.4} />
          {isId ? 'SISTEM FOUNDATION' : 'FOUNDATION SYSTEM'}
        </span>
        <h1 className="page-title">{isId ? 'Icons' : 'Icons'}</h1>
        <p className="page-subtitle">
          {isId
            ? 'Sistem perpustakaan ikon Neudela ditenagai oleh Lucide Icons v1.22. Dirancang di atas grid 24×24px dengan ketebalan garis standar 2px, sudut lengkung round yang ramah, serta integrasi komponen yang fleksibel dan modular.'
            : 'Neudela icon system powered by Lucide Icons v1.22. Crafted upon a 24×24px grid base with standard 2px stroke, friendly rounded terminal caps, and seamless component integration.'}
        </p>

        {/* Stats Pills */}
        <div className="icons-header-stats">
          <span className="icons-stat-pill">
            <Sparkles size={13} color="#df7e30" />
            <span>{isId ? 'Total Ikon:' : 'Total Icons:'}</span>
            <strong>{allIconNames.length.toLocaleString()}</strong>
          </span>
          <span className="icons-stat-pill">
            <Box size={13} color="#df7e30" />
            <span>{isId ? 'Grid Dasar:' : 'Base Grid:'}</span>
            <strong>24 × 24 px</strong>
          </span>
          <span className="icons-stat-pill">
            <SlidersHorizontal size={13} color="#df7e30" />
            <span>{isId ? 'Ketebalan Standar:' : 'Default Stroke:'}</span>
            <strong>2.0 px</strong>
          </span>
          <span className="icons-stat-pill">
            <CircleCheck size={13} color="#10b981" />
            <span>{isId ? 'Lisensi:' : 'License:'}</span>
            <strong>MIT (Open Source)</strong>
          </span>
        </div>

        {/* Main Tab Switcher */}
        <div className="comp-tab-bar" style={{ marginTop: 'var(--space-4, 16px)' }}>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'explorer' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('explorer')}
          >
            {isId ? 'Perpustakaan Ikon' : 'Icon Library'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'anatomy' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('anatomy')}
          >
            {isId ? 'Anatomi Grid 24px' : '24px Grid Anatomy'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'guidelines' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('guidelines')}
          >
            {isId ? 'Panduan Penggunaan (Do & Don\'t)' : "Usage Guidelines (Do & Don't)"}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'tokens' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('tokens')}
          >
            {isId ? 'Token & Kode' : 'Tokens & Implementation'}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1: ICON EXPLORER & LIBRARY
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'explorer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Install Banner */}
          <div className="icons-install-banner">
            <div className="icons-install-cmd">
              <span className="icons-install-prompt">$</span>
              <code>npm install lucide-react</code>
            </div>
            <NeuronButton
              variant="secondary"
              size="sm"
              leadingIcon={
                copiedInstall ? (
                  <Check size={14} strokeWidth={2.4} style={{ color: 'var(--color-success, #10b981)' }} />
                ) : (
                  <Copy size={14} strokeWidth={2} />
                )
              }
              onClick={handleCopyInstall}
              title={isId ? 'Salin perintah npm install' : 'Copy npm install command'}
            >
              {copiedInstall
                ? (isId ? 'Tersalin' : 'Copied')
                : (isId ? 'Salin Perintah' : 'Copy Command')}
            </NeuronButton>
          </div>

          {/* Controls Card: Search, Categories & Live Toolbar */}
          <div className="icons-controls-card">
            {/* Search Bar */}
            <div className="icons-search-row">
              <div className="icons-search-input-wrap">
                <Search size={18} className="icons-search-icon" />
                <input
                  type="text"
                  className="icons-search-input"
                  placeholder={
                    isId
                      ? 'Cari ikon berdasarkan nama... (contoh: search, user, arrow, settings, mail)'
                      : 'Search icons by name... (e.g. search, user, arrow, settings, mail)'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus={false}
                />
                {searchQuery && (
                  <button
                    className="icons-search-clear"
                    onClick={() => setSearchQuery('')}
                    title={isId ? 'Bersihkan pencarian' : 'Clear search'}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills Bar */}
            <div className="icons-categories-bar">
              {CATEGORIES.map(cat => {
                const count = cat.id === 'all' 
                  ? allIconNames.length 
                  : (allIconNames.filter(n => (CATEGORY_KEYWORDS[cat.id] || []).some(k => n.toLowerCase().includes(k)))).length;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    className={`icons-cat-pill ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{isId ? cat.labelId : cat.labelEn}</span>
                    <span className="icons-cat-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Customizer Toolbar */}
            <div className="icons-toolbar">
              <div className="icons-toolbar-left">
                {/* Size Selector */}
                <div className="icons-tool-item">
                  <span className="icons-tool-label">{isId ? 'Ukuran:' : 'Size:'}</span>
                  <div className="icons-segmented">
                    {SIZE_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        className={`icons-seg-btn ${iconSize === opt.value ? 'active' : ''}`}
                        onClick={() => setIconSize(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stroke Width Selector */}
                <div className="icons-tool-item">
                  <span className="icons-tool-label">{isId ? 'Garis:' : 'Stroke:'}</span>
                  <div className="icons-segmented">
                    {STROKE_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        className={`icons-seg-btn ${iconStroke === opt.value ? 'active' : ''}`}
                        onClick={() => setIconStroke(opt.value)}
                        title={`${opt.name} (${opt.label})`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="icons-toolbar-right">
                {/* Color Swatches */}
                <div className="icons-tool-item">
                  <span className="icons-tool-label">{isId ? 'Warna:' : 'Color:'}</span>
                  <div className="icons-color-picker">
                    {COLOR_SWATCHES.map(c => {
                      const isCurr = c.value === 'currentColor';
                      return (
                        <button
                          key={c.id}
                          className={`icons-color-dot ${iconColor === c.value ? 'active' : ''}`}
                          style={{
                            background: isCurr ? 'var(--color-text-primary)' : c.value,
                            outline: iconColor === c.value ? `2px solid var(--color-primary)` : 'none',
                            outlineOffset: '2px'
                          }}
                          onClick={() => setIconColor(c.value)}
                          title={isId ? c.labelId : c.labelEn}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* View Mode (Grid vs Compact) */}
                <div className="icons-tool-item">
                  <span className="icons-tool-label">{isId ? 'Tampilan:' : 'View:'}</span>
                  <div className="icons-segmented">
                    <button
                      className={`icons-seg-btn ${!isCompactGrid ? 'active' : ''}`}
                      onClick={() => setIsCompactGrid(false)}
                      title={isId ? 'Tampilan Standar' : 'Standard View'}
                    >
                      <GridIcon size={13} />
                      {isId ? 'Normal' : 'Normal'}
                    </button>
                    <button
                      className={`icons-seg-btn ${isCompactGrid ? 'active' : ''}`}
                      onClick={() => setIsCompactGrid(true)}
                      title={isId ? 'Tampilan Kompak' : 'Compact View'}
                    >
                      <Layers size={13} />
                      {isId ? 'Kompak' : 'Compact'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Count Bar */}
          <div className="icons-grid-header">
            <div className="icons-grid-count">
              {isId ? 'Menampilkan' : 'Showing'}{' '}
              <strong style={{ color: 'var(--color-primary)' }}>{visibleIcons.length}</strong>{' '}
              {isId ? 'dari' : 'of'}{' '}
              <strong>{filteredIconNames.length}</strong>{' '}
              {isId ? 'ikon yang cocok' : 'matching icons'}
              {filteredIconNames.length !== allIconNames.length && (
                <span> ({isId ? 'difilter dari' : 'filtered from'} {allIconNames.length} {isId ? 'total' : 'total'})</span>
              )}
            </div>
            {searchQuery && (
              <NeuronButton
                variant="secondary"
                size="xs"
                onClick={() => setSearchQuery('')}
              >
                {isId ? 'Reset Pencarian' : 'Reset Search'}
              </NeuronButton>
            )}
          </div>

          {/* Icons Grid */}
          {filteredIconNames.length === 0 ? (
            <div className="icons-empty-state">
              <Search size={40} color="var(--color-text-tertiary)" strokeWidth={1.5} />
              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
                {isId ? 'Tidak ada ikon yang sesuai' : 'No matching icons found'}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', margin: 0 }}>
                {isId
                  ? `Kata kunci "${searchQuery}" tidak ditemukan dalam kategori yang dipilih.`
                  : `Query "${searchQuery}" did not match any icons in the current category.`}
              </p>
              <NeuronButton
                variant="secondary"
                size="sm"
                style={{ marginTop: '10px' }}
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              >
                {isId ? 'Tampilkan Semua Ikon' : 'Show All Icons'}
              </NeuronButton>
            </div>
          ) : (
            <div className={`icons-grid ${isCompactGrid ? 'icons-grid--compact' : ''}`}>
              {visibleIcons.map(name => {
                const IconComponent = (icons as Record<string, React.ElementType>)[name];
                if (!IconComponent) return null;

                return (
                  <div
                    key={name}
                    className={`icon-card ${isCompactGrid ? 'icon-card--compact' : ''}`}
                    onClick={() => setSelectedIconName(name)}
                    title={isId ? `Klik untuk inspeksi ${name}` : `Click to inspect ${name}`}
                  >
                    <div className="icon-card__preview">
                      <IconComponent
                        size={iconSize}
                        strokeWidth={iconStroke}
                        color={iconColor}
                      />
                    </div>
                    <span className="icon-card__name">{name}</span>
                    <button
                      className="icon-card__copy-hint"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyText(`<${name} size={${iconSize}} />`, name);
                      }}
                      title={isId ? `Salin JSX <${name} />` : `Copy JSX <${name} />`}
                    >
                      <Copy size={11} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {visibleIcons.length < filteredIconNames.length && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              <NeuronButton
                variant="secondary"
                size="md"
                onClick={() => setDisplayCount(prev => prev + 108)}
              >
                {isId
                  ? `Muat Lebih Banyak (${Math.min(108, filteredIconNames.length - visibleIcons.length)} ikon lagi)`
                  : `Load More (${Math.min(108, filteredIconNames.length - visibleIcons.length)} more icons)`}
              </NeuronButton>
              <NeuronButton
                variant="secondary"
                size="md"
                onClick={() => setDisplayCount(filteredIconNames.length)}
              >
                {isId ? 'Tampilkan Semua' : 'Show All'}
              </NeuronButton>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2: 24PX ANATOMY & KEYLINES
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'anatomy' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Anatomy Intro Card */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? 'Sistem Grid 24×24px & Keylines' : '24×24px Base Grid & Keyline System'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Setiap ikon di Neudela dibangun di atas kanvas 24×24 pixel dengan safe area 20×20 pixel (2px padding luar). Keylines geometris memastikan semua ikon memiliki bobot visual (optical weight) yang setara saat disandingkan berdampingan.'
                : 'Every Neudela icon is crafted inside a 24×24 pixel bounding box with a 20×20 pixel live safe zone (2px outer margin). Geometric keylines guarantee identical optical weight across circles, squares, and rectangles.'}
            </p>

            <div className="icons-anatomy-stage" style={{ marginTop: '24px' }}>
              {/* Interactive SVG Visualizer */}
              <div className="icons-anatomy-viewport">
                <svg
                  viewBox="0 0 240 240"
                  className="icons-anatomy-svg-grid"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="pixelGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="color-mix(in srgb, var(--color-border) 60%, transparent)" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  {/* 1px pixel grid base */}
                  <rect width="240" height="240" fill="url(#pixelGrid)" />

                  {/* Outer Bounding Box (24px = 240px) */}
                  <rect
                    x="2"
                    y="2"
                    width="236"
                    height="236"
                    fill="none"
                    stroke="var(--color-text-tertiary)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* 20px Safe Zone (200px) */}
                  {anatomyGuides.safeZone && (
                    <rect
                      x="20"
                      y="20"
                      width="200"
                      height="200"
                      fill="none"
                      stroke="#df7e30"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Square Keyline (18px = 180px) */}
                  {anatomyGuides.square && (
                    <rect
                      x="30"
                      y="30"
                      width="180"
                      height="180"
                      rx="16"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.8"
                    />
                  )}

                  {/* Circle Keyline (20px diameter = 200px) */}
                  {anatomyGuides.circle && (
                    <circle
                      cx="120"
                      cy="120"
                      r="100"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.8"
                    />
                  )}

                  {/* Diagonals */}
                  {anatomyGuides.diagonals && (
                    <>
                      <line x1="20" y1="20" x2="220" y2="220" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 3" opacity="0.75" />
                      <line x1="220" y1="20" x2="20" y2="220" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 3" opacity="0.75" />
                    </>
                  )}

                  {/* Center Crosshair */}
                  {anatomyGuides.crosshair && (
                    <>
                      <line x1="120" y1="0" x2="120" y2="240" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="0" y1="120" x2="240" y2="120" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                      <circle cx="120" cy="120" r="3" fill="#ef4444" />
                    </>
                  )}

                  {/* Sample Icon Overlay in center */}
                  <g transform="translate(48, 48) scale(6)" opacity="0.9">
                    <path
                      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                      fill="none"
                      stroke="var(--color-text-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                      fill="none"
                      stroke="var(--color-text-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>

              {/* Interactive Guide Legend & Toggles */}
              <div className="icons-anatomy-legend">
                <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>
                  {isId ? 'Lapisan Panduan (Keyline Guides)' : 'Keyline Guide Layers'}
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: '0 0 12px 0' }}>
                  {isId
                    ? 'Klik item di bawah untuk mengaktifkan atau menyembunyikan panduan geometris pada kanvas:'
                    : 'Click items below to toggle geometric overlays on the active canvas:'}
                </p>

                {/* Safe Zone */}
                <div
                  className={`icons-anatomy-legend-item ${anatomyGuides.safeZone ? 'active' : ''}`}
                  onClick={() => setAnatomyGuides(g => ({ ...g, safeZone: !g.safeZone }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="icons-legend-color-dot" style={{ background: '#df7e30' }} />
                    <div>
                      <strong style={{ fontSize: '13px' }}>20×20px Safe Zone</strong>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Batas konten hidup (margin luar 2px)' : 'Live content boundary (2px padding)'}
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" checked={anatomyGuides.safeZone} readOnly />
                </div>

                {/* Circle Keyline */}
                <div
                  className={`icons-anatomy-legend-item ${anatomyGuides.circle ? 'active' : ''}`}
                  onClick={() => setAnatomyGuides(g => ({ ...g, circle: !g.circle }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="icons-legend-color-dot" style={{ background: '#10b981' }} />
                    <div>
                      <strong style={{ fontSize: '13px' }}>20px Circle Keyline</strong>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Diameter 20px untuk bentuk sirkular penuh' : '20px diameter for full circular icons'}
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" checked={anatomyGuides.circle} readOnly />
                </div>

                {/* Square Keyline */}
                <div
                  className={`icons-anatomy-legend-item ${anatomyGuides.square ? 'active' : ''}`}
                  onClick={() => setAnatomyGuides(g => ({ ...g, square: !g.square }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="icons-legend-color-dot" style={{ background: '#0284c7' }} />
                    <div>
                      <strong style={{ fontSize: '13px' }}>18×18px Square Keyline</strong>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Ukuran persegi dengan radius 2px untuk optical balance' : '18px square with 2px radius for optical balance'}
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" checked={anatomyGuides.square} readOnly />
                </div>

                {/* Diagonals */}
                <div
                  className={`icons-anatomy-legend-item ${anatomyGuides.diagonals ? 'active' : ''}`}
                  onClick={() => setAnatomyGuides(g => ({ ...g, diagonals: !g.diagonals }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="icons-legend-color-dot" style={{ background: '#f59e0b' }} />
                    <div>
                      <strong style={{ fontSize: '13px' }}>45° Diagonal Lines</strong>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Sudut kemiringan standar panah & tanda silang' : 'Standard 45° angle for arrows and crosses'}
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" checked={anatomyGuides.diagonals} readOnly />
                </div>

                {/* Crosshair */}
                <div
                  className={`icons-anatomy-legend-item ${anatomyGuides.crosshair ? 'active' : ''}`}
                  onClick={() => setAnatomyGuides(g => ({ ...g, crosshair: !g.crosshair }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="icons-legend-color-dot" style={{ background: '#ef4444' }} />
                    <div>
                      <strong style={{ fontSize: '13px' }}>Center Crosshair</strong>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Titik tengah kanvas (12px, 12px)' : 'Canvas center point (12px, 12px)'}
                      </div>
                    </div>
                  </div>
                  <input type="checkbox" checked={anatomyGuides.crosshair} readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* Optical Balance Principles Card */}
          <div className="section-card">
            <h3 className="section-title">
              {isId ? 'Prinsip Keseimbangan Optik (Optical Weight)' : 'Optical Weight Principles'}
            </h3>
            <p className="section-description">
              {isId
                ? 'Karena bentuk lingkaran memiliki area permukaan lebih kecil daripada persegi dengan lebar sama, lingkaran membutuhkan diameter 20px sedangkan persegi dibatasi pada 18×18px. Dengan rasio ini, kedua bentuk terasa identik dalam bobot visual mata manusia.'
                : 'Because circles occupy less pixel surface area than squares of equal width, circles expand to 20px while squares stay bounded at 18×18px. This ratio achieves perfect perceived visual parity.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div style={{ padding: '16px', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: 'var(--color-primary)' }}>
                  Round Caps & Corners
                </strong>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {isId
                    ? 'Semua ujung garis menggunakan stroke-linecap="round" dan setiap sudut menggunakan stroke-linejoin="round" dengan radius minimum 2px.'
                    : 'All path endpoints use stroke-linecap="round" and stroke-linejoin="round" with a minimum 2px corner radius.'}
                </p>
              </div>

              <div style={{ padding: '16px', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: 'var(--color-primary)' }}>
                  Pixel Snapping & Sharpness
                </strong>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {isId
                    ? 'Titik koordinat dan segmen garis lurus sejajar dengan sumbu integer pixel grid untuk mencegah efek buram (sub-pixel anti-aliasing blur).'
                    : 'Coordinates and straight paths snap to integer pixel coordinates to avoid unwanted sub-pixel anti-aliasing blur.'}
                </p>
              </div>

              <div style={{ padding: '16px', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: 'var(--color-primary)' }}>
                  Color Inheritance
                </strong>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {isId
                    ? 'Ikon selalu menggunakan stroke="currentColor" sehingga otomatis beradaptasi dengan warna teks induk, mode gelap, dan status hover.'
                    : 'Icons inherit stroke="currentColor" by default, automatically responding to parent text colors, dark mode, and hover states.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 3: USAGE GUIDELINES (DO & DON'T)
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'guidelines' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div className="section-card">
            <h2 className="section-title">
              {isId ? 'Panduan Penggunaan Ikon (Do & Don\'t)' : 'Icon Usage Guidelines (Do & Don\'t)'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Ikuti aturan desain berikut untuk menjaga konsistensi visual, kejelasan fungsi, dan aksesibilitas di seluruh aplikasi Neudela.'
                : 'Follow these design rules to maintain visual cohesion, semantic clarity, and accessibility across Neudela applications.'}
            </p>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Pair 1: Size & Typography Pairing */}
              <div className="grid-dodont-pair">
                <div className="grid-dodont-pair-header">
                  <div className="grid-dodont-pair-title-wrap">
                    <span className="grid-dodont-step-num">1</span>
                    <h4 className="grid-dodont-pair-title">
                      {isId ? 'Keselarasan Skala Ikon & Tipografi' : 'Icon Scale & Typography Pairing'}
                    </h4>
                  </div>
                  <span className="grid-dodont-pair-badge">
                    {isId ? 'Skala & Tombol' : 'Scale & Buttons'}
                  </span>
                </div>
                <div className="dodont-grid">
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '280px' }}>
                        <NeuronButton variant="primary" size="sm" leadingIcon={<icons.Plus size={16} strokeWidth={2} />} style={{ width: '100%', justifyContent: 'center' }}>
                          {isId ? 'Tambah Item (16px / 13px)' : 'Add Item (16px / 13px)'}
                        </NeuronButton>
                        <NeuronButton variant="secondary" size="md" leadingIcon={<icons.Download size={20} strokeWidth={2} />} style={{ width: '100%', justifyContent: 'center' }}>
                          {isId ? 'Unduh Berkas (20px / 15px)' : 'Download (20px / 15px)'}
                        </NeuronButton>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Gunakan Ukuran Proporsional Teks' : 'Pair Icon Size to Typography'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Pasangkan ikon 16px dengan teks 13–14px (Button SM/MD), dan ikon 20px dengan teks 15–16px (Button LG). Proporsi ini mempertahankan garis baseline yang rapi dan seimbang.'
                          : 'Pair 16px icons with 13–14px text (SM/MD Buttons) and 20px icons with 15–16px text (LG Buttons). This maintains optical balance and clean baseline alignment.'}
                      </div>
                    </div>
                  </RuleCard>

                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '280px' }}>
                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', height: '36px', fontSize: '12px' }}>
                          <icons.Plus size={28} strokeWidth={2} />
                          <span>{isId ? 'Ikon 28px Terlalu Besar!' : '28px Icon Overwhelms Text!'}</span>
                        </button>
                        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '42px', fontSize: '15px' }}>
                          <icons.Download size={12} strokeWidth={2} />
                          <span>{isId ? 'Ikon 12px Terlalu Kecil!' : '12px Icon Invisible!'}</span>
                        </button>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Jangan Gunakan Ukuran Ikon Berlebih' : 'Do Not Mismatch Icon Scale'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Hindari memasang ikon raksasa (28px+) atau kerdil (12px) di dalam tombol atau inline text. Hal ini merusak ritme visual dan memicu pembengkakan tinggi elemen yang tidak diinginkan.'
                          : 'Avoid putting oversized (28px+) or undersized (12px) icons inside action buttons. It breaks optical hierarchy and disrupts vertical rhythm.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* Pair 2: Stroke Weight Consistency */}
              <div className="grid-dodont-pair">
                <div className="grid-dodont-pair-header">
                  <div className="grid-dodont-pair-title-wrap">
                    <span className="grid-dodont-step-num">2</span>
                    <h4 className="grid-dodont-pair-title">
                      {isId ? 'Konsistensi Ketebalan Garis (Stroke Weight)' : 'Stroke Weight Consistency'}
                    </h4>
                  </div>
                  <span className="grid-dodont-pair-badge">
                    {isId ? 'Garis 2px' : '2px Stroke'}
                  </span>
                </div>
                <div className="dodont-grid">
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ padding: '10px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                          <icons.Search size={22} strokeWidth={2} color="#df7e30" />
                        </div>
                        <div style={{ padding: '10px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                          <icons.Bell size={22} strokeWidth={2} color="#df7e30" />
                        </div>
                        <div style={{ padding: '10px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                          <icons.User size={22} strokeWidth={2} color="#df7e30" />
                        </div>
                        <div style={{ padding: '10px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                          <icons.Settings size={22} strokeWidth={2} color="#df7e30" />
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Pertahankan Stroke Standar 2px' : 'Keep Uniform 2px Stroke Width'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Gunakan ketebalan garis standar 2px di seluruh antarmuka aplikasi. Seluruh keluarga ikon akan terlihat kohesif, profesional, dan menyatu sempurna dengan sistem Neudela.'
                          : 'Maintain uniform 2px stroke width across all adjacent icons in a view. This guarantees cohesive visual weight that feels intentionally designed.'}
                      </div>
                    </div>
                  </RuleCard>

                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ padding: '10px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                          <icons.Search size={22} strokeWidth={1} color="#df7e30" />
                        </div>
                        <div style={{ padding: '10px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                          <icons.Bell size={22} strokeWidth={3} color="#df7e30" />
                        </div>
                        <div style={{ padding: '10px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                          <icons.User size={22} strokeWidth={1.2} color="#df7e30" />
                        </div>
                        <div style={{ padding: '10px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                          <icons.Settings size={22} strokeWidth={3.5} color="#df7e30" />
                        </div>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Jangan Campur Ketebalan Garis Acak' : 'Do Not Mix Random Stroke Weights'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Jangan mencampur ikon 1px (terlalu tipis) berdampingan dengan 3.5px (terlalu tebal). Perbedaan kontras ketebalan membuat UI terlihat tidak rapi dan berantakan.'
                          : 'Never place hairline 1px icons next to heavy 3.5px icons on the same toolbar. The jarring contrast creates an unpolished, amateur impression.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* Pair 3: Semantic Labels & Accessibility */}
              <div className="grid-dodont-pair">
                <div className="grid-dodont-pair-header">
                  <div className="grid-dodont-pair-title-wrap">
                    <span className="grid-dodont-step-num">3</span>
                    <h4 className="grid-dodont-pair-title">
                      {isId ? 'Aksesibilitas & Kejelasan Semantik' : 'Semantic Clarity & Accessibility'}
                    </h4>
                  </div>
                  <span className="grid-dodont-pair-badge">
                    {isId ? 'Aksesibilitas' : 'Accessibility & A11y'}
                  </span>
                </div>
                <div className="dodont-grid">
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <NeuronButton 
                          variant="secondary" 
                          size="md"
                          iconOnly
                          aria-label="Cari data" 
                          title="Cari data (Search)"
                        >
                          <icons.Search size={20} strokeWidth={2} />
                        </NeuronButton>
                        <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--color-text-secondary)', background: 'var(--color-bg-surface)', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                          aria-label="Cari data"
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Sediakan Aksesibilitas aria-label' : 'Provide Accessible aria-label'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Untuk tombol yang hanya berisi ikon tanpa teks label (icon-only button), selalu sertakan atribut aria-label dan title tooltip agar pembaca layar (screen reader) dapat memahami fungsinya.'
                          : 'For icon-only buttons without visible text, always supply an aria-label and tooltip title so screen readers and assistive technology can understand the action.'}
                      </div>
                    </div>
                  </RuleCard>

                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <button 
                          className="btn-secondary" 
                          style={{ padding: '10px', borderRadius: '10px', opacity: 0.7 }}
                        >
                          <icons.Sparkles size={20} strokeWidth={2} />
                        </button>
                        <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>
                          {isId ? 'Tanpa teks / tanpa aria-label' : 'No label / no aria-label'}
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Jangan Gunakan Ikon Tanpa Label Konteks' : 'Do Not Leave Icons Ambiguous'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Hindari menggunakan metafora ikon yang abstrak atau ambigu tanpa label bantuan. Pengguna tidak akan mengetahui apakah aksi tersebut untuk AI, filter, atau bookmark.'
                          : 'Avoid abstract icons without explanatory text or tooltips. Ambiguous icons force users to guess functionality, hurting usability.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>

              {/* Pair 4: Semantic Color & WCAG Contrast */}
              <div className="grid-dodont-pair">
                <div className="grid-dodont-pair-header">
                  <div className="grid-dodont-pair-title-wrap">
                    <span className="grid-dodont-step-num">4</span>
                    <h4 className="grid-dodont-pair-title">
                      {isId ? 'Warna Semantik & Kontras WCAG' : 'Semantic Color Tokens & WCAG Contrast'}
                    </h4>
                  </div>
                  <span className="grid-dodont-pair-badge">
                    {isId ? 'Kontras & Warna' : 'Contrast & Color'}
                  </span>
                </div>
                <div className="dodont-grid">
                  <RuleCard type="do">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '13.5px', fontWeight: 600 }}>
                          <CircleCheck size={18} /> {isId ? 'Status Berhasil' : 'Success State'}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '13.5px', fontWeight: 600 }}>
                          <CircleAlert size={18} /> {isId ? 'Status Kesalahan' : 'Error State'}
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Gunakan Token Warna Semantik' : 'Use Semantic Color Tokens'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Gunakan token warna desain yang sudah terkalibrasi rasio kontrasnya dengan background (--color-primary, --color-success, --color-danger) demi kenyamanan baca dan kepatuhan WCAG AA.'
                          : 'Apply calibrated design system tokens (--color-primary, --color-success, --color-danger) ensuring high contrast ratios against light and dark backgrounds.'}
                      </div>
                    </div>
                  </RuleCard>

                  <RuleCard type="dont">
                    <div className="rule-card__preview">
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '13.5px', fontWeight: 600 }}>
                          <CircleCheck size={18} /> {isId ? 'Sulit Terbaca' : 'Low Contrast'}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fef08a', fontSize: '13.5px', fontWeight: 600 }}>
                          <CircleAlert size={18} /> {isId ? 'Kontras Gagal' : 'Fails Contrast'}
                        </span>
                      </div>
                    </div>
                    <div className="rule-card__text">
                      <div className="rule-card__title">
                        {isId ? 'Hindari Warna Kontras Rendah' : 'Avoid Low Contrast Neon Colors'}
                      </div>
                      <div className="rule-card__desc">
                        {isId
                          ? 'Jangan menggunakan warna kuning pucat atau abu-abu transparan yang tenggelam di atas latar belakang putih/terang, menyebabkan ikon tidak terbaca oleh pengguna.'
                          : 'Never use faded pastels or faint greys that blend into background canvas, failing basic WCAG readability thresholds.'}
                      </div>
                    </div>
                  </RuleCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 4: DESIGN TOKENS & IMPLEMENTATION
          ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'tokens' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Tokens Table Card */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? 'Daftar Token Desain Ikon (CSS Variables)' : 'Icon Design System Tokens'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Gunakan token CSS variabel berikut untuk menjamin kepatuhan terhadap standar ukuran dan ketebalan garis Neudela.'
                : 'Use these CSS custom properties to ensure strict conformance with Neudela sizing and stroke width standards.'}
            </p>

            <div style={{ overflowX: 'auto', marginTop: '16px' }}>
              <table className="icons-tokens-table">
                <thead>
                  <tr>
                    <th>Token CSS</th>
                    <th>{isId ? 'Nilai / Value' : 'Value'}</th>
                    <th>{isId ? 'Pratinjau' : 'Visual Preview'}</th>
                    <th>{isId ? 'Keterangan Penggunaan' : 'Usage Context'}</th>
                  </tr>
                </thead>
                <tbody>
                  {TOKENS_DATA.map(t => {
                    const isSize = t.token.includes('size');
                    const numVal = parseInt(t.value, 10);
                    return (
                      <tr key={t.token}>
                        <td>
                          <span
                            className="icons-token-name"
                            onClick={() => copyText(`var(${t.token})`, t.token)}
                            title={isId ? 'Klik untuk salin var()' : 'Click to copy var()'}
                          >
                            var({t.token})
                          </span>
                        </td>
                        <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{t.value}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', height: '32px' }}>
                            {isSize ? (
                              <icons.Heart size={numVal} strokeWidth={2} color="#df7e30" />
                            ) : (
                              <icons.Heart size={24} strokeWidth={parseFloat(t.value)} color="#df7e30" />
                            )}
                          </div>
                        </td>
                        <td style={{ color: 'var(--color-text-secondary)', fontSize: '12.5px' }}>
                          {isId ? t.descId : t.descEn}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Implementation Examples Card */}
          <div className="section-card">
            <h3 className="section-title">
              {isId ? 'Contoh Implementasi Kode (React & Lucide)' : 'Code Implementation (React & Lucide)'}
            </h3>
            <p className="section-description">
              {isId
                ? 'Cara terbaik mengintegrasikan ikon Lucide ke dalam proyek React Anda menggunakan sistem Neudela.'
                : 'Recommended patterns for integrating Lucide Icons into your React application using Neudela.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
                  1. Direct Lucide React Import
                </span>
                <div className="icon-code-snippet" style={{ marginTop: '6px' }}>
                  <code>{`import { Search, ChevronRight } from 'lucide-react';\n\n<Search size={20} strokeWidth={2} color="var(--color-primary)" />`}</code>
                  <button
                    className="icon-code-copy-btn"
                    onClick={() => copyText(`import { Search } from 'lucide-react';\n<Search size={20} strokeWidth={2} />`, 'Code snippet')}
                  >
                    <Copy size={12} />
                    {isId ? 'Salin' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
                  2. Inside Neudela Button Component
                </span>
                <div className="icon-code-snippet" style={{ marginTop: '6px' }}>
                  <code>{`<NeuronButton variant="primary" icon={<Plus size={16} />}>\n  Tambah Pengguna\n</NeuronButton>`}</code>
                  <button
                    className="icon-code-copy-btn"
                    onClick={() => copyText(`<NeuronButton variant="primary" icon={<Plus size={16} />}>Tambah</NeuronButton>`, 'Button code')}
                  >
                    <Copy size={12} />
                    {isId ? 'Salin' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
                  3. Dynamic Icon Component Wrapper Pattern
                </span>
                <div className="icon-code-snippet" style={{ marginTop: '6px' }}>
                  <code>{`import { icons, LucideProps } from 'lucide-react';\n\nexport const Icon = ({ name, ...props }: { name: keyof typeof icons } & LucideProps) => {\n  const LucideIcon = icons[name];\n  return LucideIcon ? <LucideIcon {...props} /> : null;\n};`}</code>
                  <button
                    className="icon-code-copy-btn"
                    onClick={() => copyText(`import { icons } from 'lucide-react';`, 'Dynamic wrapper')}
                  >
                    <Copy size={12} />
                    {isId ? 'Salin' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          DETAIL INSPECTOR MODAL
          ══════════════════════════════════════════════════════════════════════ */}
      {selectedIconName && (
        <div className="icon-modal-overlay" onClick={() => setSelectedIconName(null)}>
          <div className="icon-modal-window" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="icon-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {renderIcon(selectedIconName, 18, 2, '#df7e30')}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                    {selectedIconName}
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontFamily: 'monospace' }}>
                    lucide-react v1.22.0
                  </span>
                </div>
              </div>

              <button
                className="icon-modal-close-btn"
                onClick={() => setSelectedIconName(null)}
                title={isId ? 'Tutup' : 'Close'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="icon-modal-body">
              {/* Specimen & Quick Customizer */}
              <div className="icon-modal-specimen-grid">
                {/* 24px Canvas Specimen */}
                <div className="icon-canvas-specimen">
                  <div className="icon-canvas-guide-box" />
                  {renderIcon(selectedIconName, 64, iconStroke, iconColor)}
                </div>

                {/* Quick Info & Code Generator */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <span className="icons-stat-pill">
                      <span>{isId ? 'Ukuran Aktif:' : 'Active Size:'}</span>
                      <strong>{iconSize}px</strong>
                    </span>
                    <span className="icons-stat-pill">
                      <span>{isId ? 'Stroke:' : 'Stroke:'}</span>
                      <strong>{iconStroke}px</strong>
                    </span>
                  </div>

                  {/* Copy JSX Snippet */}
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
                      JSX Element
                    </span>
                    <div className="icon-code-snippet" style={{ marginTop: '4px' }}>
                      <code>{`<${selectedIconName} size={${iconSize}} strokeWidth={${iconStroke}} />`}</code>
                      <button
                        className="icon-code-copy-btn"
                        onClick={() => copyText(`<${selectedIconName} size={${iconSize}} strokeWidth={${iconStroke}} />`, 'JSX')}
                      >
                        <Copy size={12} />
                        {isId ? 'Salin' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Copy Import Statement */}
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
                      ES6 Import
                    </span>
                    <div className="icon-code-snippet" style={{ marginTop: '4px' }}>
                      <code>{`import { ${selectedIconName} } from 'lucide-react';`}</code>
                      <button
                        className="icon-code-copy-btn"
                        onClick={() => copyText(`import { ${selectedIconName} } from 'lucide-react';`, 'Import statement')}
                      >
                        <Copy size={12} />
                        {isId ? 'Salin' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Context Component Previews */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 10px 0', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Pratinjau Integrasi Komponen Neudela:' : 'Neudela Component Integration Previews:'}
                </h4>

                <div className="icon-context-specimens">
                  {/* Primary Button */}
                  <div className="icon-context-specimen-item">
                    <span className="icon-context-specimen-label">Primary Button</span>
                    <NeuronButton
                      variant="primary"
                      size="sm"
                      leadingIcon={renderIcon(selectedIconName, 16, 2, 'currentColor')}
                    >
                      {selectedIconName}
                    </NeuronButton>
                  </div>

                  {/* Icon Only Action Button */}
                  <div className="icon-context-specimen-item">
                    <span className="icon-context-specimen-label">Icon-Only Button</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <NeuronButton
                        variant="secondary"
                        size="sm"
                        iconOnly
                        aria-label={selectedIconName}
                      >
                        {renderIcon(selectedIconName, 18, 2, 'currentColor')}
                      </NeuronButton>
                      <NeuronButton
                        variant="primary"
                        size="sm"
                        iconOnly
                        aria-label={selectedIconName}
                      >
                        {renderIcon(selectedIconName, 18, 2, 'currentColor')}
                      </NeuronButton>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="icon-context-specimen-item">
                    <span className="icon-context-specimen-label">Status Badge</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 10px',
                        background: 'color-mix(in srgb, var(--color-primary) 12%, var(--color-bg-surface))',
                        border: '1px solid var(--color-primary)',
                        color: 'var(--color-primary)',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}>
                        {renderIcon(selectedIconName, 13, 2, 'var(--color-primary)')}
                        <span>Active</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Next Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'grid', label: t.nav.grid }}
        next={{ id: 'spacing', label: t.nav.spacing }}
        setActiveTab={setActiveTab}
      />

      {/* ── Toast Notification ── */}
      <div className={`copy-toast ${toastMessage ? 'show' : ''}`}>
        <Check size={16} strokeWidth={2.4} />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
