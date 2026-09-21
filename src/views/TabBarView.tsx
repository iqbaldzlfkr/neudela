import React, { useState } from 'react';
import NeuronTabBar, { 
  TabBarVariant, 
  TabBarSize, 
  TabBarOrientation, 
  TabItem 
} from '../components/NeuronTabBar';
import NeuronButton from '../components/NeuronButton';
import NeuronBadge from '../components/NeuronBadge';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import { 
  Layers, 
  Settings, 
  Users, 
  BarChart2, 
  ShieldCheck, 
  Bell, 
  FileText, 
  Activity, 
  Code, 
  Plus, 
  Folder, 
  Check, 
  Globe, 
  Sliders, 
  Sparkles,
  Smartphone,
  Laptop,
  X,
  Info
} from 'lucide-react';

interface TabBarViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rule Card (Do / Don't)
// ─────────────────────────────────────────────────────────────────────────────
function RuleCard({ type, children }: { type: 'do' | 'dont'; children: React.ReactNode }) {
  const isDo = type === 'do';
  return (
    <div className={`rule-card rule-card--${type}`}>
      <div className="rule-card__badge">
        {isDo ? (
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {isDo ? 'Do' : "Don't"}
      </div>
      <div className="rule-card__content">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab Bar Interactive Anatomy Viewer
// ─────────────────────────────────────────────────────────────────────────────
interface TabAnatomyItem {
  id: number;
  name: string;
  category: string;
  w3c: string;
  desc: string;
  tip: string;
}

function TabBarAnatomyViewer({ isId }: { isId: boolean }) {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);
  const activeZone = hoveredZone ?? selectedZone;

  const handleZoneClick = (id: number) => {
    setSelectedZone((prev) => (prev === id ? null : id));
  };

  const handleZoneHover = (id: number | null) => {
    setHoveredZone(id);
  };

  const anatomyItems: TabAnatomyItem[] = [
    {
      id: 1,
      name: isId ? 'Kontainer Tablist' : 'Tablist Container',
      category: 'Container',
      w3c: 'role="tablist"',
      desc: isId
        ? 'Wadah terluar yang menetapkan konteks tata letak tab, orientasi navigasi (horizontal / vertikal), dan mengelola overflow scroll.'
        : 'Outer accessible container establishing tab layout context, navigation orientation, and scrollable overflow management.',
      tip: isId
        ? 'Sertakan atribut aria-label atau aria-labelledby untuk memberikan konteks navigasi langsung bagi pengguna screen reader.'
        : 'Always provide an aria-label or aria-labelledby to clearly identify the purpose of the tab group to assistive technology.'
    },
    {
      id: 2,
      name: isId ? 'Tombol Item Tab' : 'Tab Item Button',
      category: 'Trigger',
      w3c: 'role="tab"',
      desc: isId
        ? 'Elemen pemicu interaktif dengan role="tab", aria-selected, dan tabindex roaming untuk berpindah panel konten.'
        : 'Interactive trigger button holding role="tab", aria-selected, and keyboard tabindex to switch panels.',
      tip: isId
        ? 'Pastikan tab mendukung navigasi panah keyboard (ArrowLeft / ArrowRight) dengan perpindahan fokus yang mulus.'
        : 'Ensure keyboard arrow navigation (ArrowLeft / ArrowRight) switches tabs seamlessly without page reloads.'
    },
    {
      id: 3,
      name: isId ? 'Ikon Pembuka' : 'Leading Icon',
      category: 'Iconography',
      w3c: 'aria-hidden="true"',
      desc: isId
        ? 'Glif visual 16px di sebelah kiri label untuk mempercepat pengenalan topik dan hierarki visual antar tab.'
        : 'Visual 16px glyph positioned to the left of the label to accelerate recognition across different views.',
      tip: isId
        ? 'Gunakan ikon yang jelas dan konsisten; sembunyikan dari pembaca layar menggunakan aria-hidden="true".'
        : 'Always hide decorative icons from screen readers using aria-hidden="true" to keep screen reader speech clean.'
    },
    {
      id: 4,
      name: isId ? 'Label Teks Tab' : 'Tab Label',
      category: 'Typography',
      w3c: 'font-weight: 500 / 600',
      desc: isId
        ? 'Nama teks tampilan yang ringkas (1–2 kata) dengan kontras warna yang jelas untuk kenyamanan membaca.'
        : 'Concise textual title of the view (ideally 1–2 words) rendered with high-contrast typography to prevent truncation.',
      tip: isId
        ? 'Hindari penggunaan teks label yang terlalu panjang agar tab bar tidak terlalu lebar dan tetap mudah dipindai.'
        : 'Avoid long phrases in tab labels; concise nouns make tab groups significantly easier to scan.'
    },
    {
      id: 5,
      name: isId ? 'Badge Penghitung' : 'Count Badge',
      category: 'Feedback',
      w3c: 'NeuronBadge',
      desc: isId
        ? 'Pill numerik atau chip indikator status yang menampilkan jumlah item aktif, notifikasi, atau filter pada panel terkait.'
        : 'Numeric pill or status badge indicating available records, unread notifications, or filtered counts.',
      tip: isId
        ? 'Gunakan format singkat seperti "99+" untuk angka yang sangat besar agar lebar tab tetap konsisten.'
        : 'Cap large quantities (e.g., "99+") to preserve consistent tab widths and clean visual alignment.'
    },
    {
      id: 6,
      name: isId ? 'Indikator Tab Aktif' : 'Active Indicator',
      category: 'State',
      w3c: 'var(--color-primary)',
      desc: isId
        ? 'Garis aksen brand bawah 2px atau background slider kontras tinggi yang secara instan mengonfirmasi tab yang sedang aktif.'
        : 'High-contrast 2px brand accent underline or slider track confirming the currently active view.',
      tip: isId
        ? 'Pertahankan rasio kontras warna minimal 3:1 terhadap background sesuai standar WCAG 2.1 AA.'
        : 'Ensure contrast against adjacent surface meets WCAG 2.1 AA non-text contrast requirements (minimum 3:1).'
    },
    {
      id: 7,
      name: isId ? 'Tombol Tutup Tab' : 'Close Trigger',
      category: 'Control',
      w3c: 'aria-label="Close tab"',
      desc: isId
        ? 'Tombol silang (x) opsional di ujung tab untuk menutup atau menghapus tab dinamis pada workspace multi-dokumen.'
        : 'Optional dismiss action (x) on dynamic workspace tabs allowing users to close temporary document tabs.',
      tip: isId
        ? 'Pastikan area sentuh tombol minimal 24×24px dengan tooltip atau aria-label deskriptif.'
        : 'Maintain a minimum touch target of 24×24px with a clear aria-label="Close [tab name]" for accessibility.'
    },
    {
      id: 8,
      name: isId ? 'Slot Aksi Tambahan' : 'Extra Actions Slot',
      category: 'Toolbar',
      w3c: 'extra={ReactNode}',
      desc: isId
        ? 'Area fleksibel di sisi kanan tab bar untuk tombol aksi kontekstual seperti "+ Tab Baru", filter, atau tombol pengaturan.'
        : 'Trailing slot reserved for contextual actions such as "+ New Tab", view toggles, or secondary toolbars.',
      tip: isId
        ? 'Pisahkan secara visual tombol aksi dari item tab agar pengguna tidak keliru mengira tombol aksi sebagai tab.'
        : 'Maintain clear visual distinction so users do not mistake persistent toolbar actions for switchable tabs.'
    }
  ];

  const activeItem = anatomyItems.find((item) => item.id === activeZone);

  return (
    <div className="tab-anatomy-container">
      {/* 1. Full-Width Master Stage Card (Zero Layout Shift) */}
      <div className="tab-anatomy-stage-card">
        {/* Stage Header */}
        <div className="tab-anatomy-stage-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {isId ? 'Kanvas Anatomi Interaktif' : 'Interactive Anatomy Canvas'}
            </span>
            <NeuronBadge size="sm" variant="brand">
              {isId ? '8 Zona Komponen' : '8 Component Zones'}
            </NeuronBadge>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
            {isId ? 'Arahkan kursor atau klik nomor zona untuk menyorot bagian' : 'Hover or click numbered zones to isolate anatomy elements'}
          </span>
        </div>

        {/* Visual Stage with Tab Bar & Staggered Pins */}
        <div className="tab-anatomy-stage-body">
          <div className="tab-anatomy-bar-wrapper">
            {/* Zone 1: Tablist Container Pin */}
            <div
              className={`tab-anatomy-zone ${activeZone === 1 ? 'is-active' : ''}`}
              style={{
                position: 'absolute',
                left: '8px',
                bottom: '100%',
                marginBottom: '6px',
                zIndex: 10,
                padding: '2px'
              }}
              onClick={(e) => { e.stopPropagation(); handleZoneClick(1); }}
              onMouseEnter={() => handleZoneHover(1)}
              onMouseLeave={() => handleZoneHover(null)}
              title={isId ? '1. Kontainer Tablist' : '1. Tablist Container'}
            >
              <div className={`tab-anatomy-pin tab-anatomy-pin--top ${activeZone === 1 ? 'is-active' : ''}`} style={{ position: 'relative', left: 'auto', transform: 'none', bottom: 'auto' }}>
                <span className="tab-anatomy-pin__dot">1</span>
                <span className="tab-anatomy-pin__stem" style={{ height: '22px' }} />
              </div>
            </div>

            {/* Tablist Bar */}
            <div className={`tab-anatomy-bar ${activeZone === 1 ? 'is-active' : ''}`}>
              <div className="tab-anatomy-tabs-group" style={{ paddingLeft: '28px' }}>
                {/* Zone 2: Tab Item Button */}
                <div
                  className={`tab-anatomy-zone ${activeZone === 2 ? 'is-active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleZoneClick(2); }}
                  onMouseEnter={() => handleZoneHover(2)}
                  onMouseLeave={() => handleZoneHover(null)}
                  title={isId ? '2. Tombol Item Tab' : '2. Tab Item Button'}
                >
                  <div className={`tab-anatomy-pin tab-anatomy-pin--top ${activeZone === 2 ? 'is-active' : ''}`}>
                    <span className="tab-anatomy-pin__dot">2</span>
                    <span className="tab-anatomy-pin__stem" />
                  </div>
                  <div className="neuron-tab neuron-tab--line neuron-tab--md" style={{ pointerEvents: 'none' }}>
                    <span className="neuron-tab__icon"><Layers size={16} /></span>
                    <span className="neuron-tab__label">Overview</span>
                  </div>
                </div>

                {/* Tab 2: Active Tab (Analytics) */}
                <div
                  className="neuron-tab neuron-tab--line neuron-tab--md neuron-tab--active"
                  style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'default' }}
                >
                  {/* Zone 3: Leading Icon */}
                  <div
                    className={`tab-anatomy-zone ${activeZone === 3 ? 'is-active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleZoneClick(3); }}
                    onMouseEnter={() => handleZoneHover(3)}
                    onMouseLeave={() => handleZoneHover(null)}
                    title={isId ? '3. Ikon Pembuka' : '3. Leading Icon'}
                  >
                    <div className={`tab-anatomy-pin tab-anatomy-pin--top ${activeZone === 3 ? 'is-active' : ''}`}>
                      <span className="tab-anatomy-pin__dot">3</span>
                      <span className="tab-anatomy-pin__stem" />
                    </div>
                    <span className="neuron-tab__icon" style={{ display: 'inline-flex', padding: '2px' }}>
                      <BarChart2 size={16} />
                    </span>
                  </div>

                  {/* Zone 4: Tab Label */}
                  <div
                    className={`tab-anatomy-zone ${activeZone === 4 ? 'is-active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleZoneClick(4); }}
                    onMouseEnter={() => handleZoneHover(4)}
                    onMouseLeave={() => handleZoneHover(null)}
                    title={isId ? '4. Label Teks Tab' : '4. Tab Label'}
                  >
                    <div className={`tab-anatomy-pin tab-anatomy-pin--top ${activeZone === 4 ? 'is-active' : ''}`}>
                      <span className="tab-anatomy-pin__dot">4</span>
                      <span className="tab-anatomy-pin__stem" />
                    </div>
                    <span className="neuron-tab__label" style={{ fontWeight: 600, padding: '2px 4px' }}>
                      Analytics
                    </span>
                  </div>

                  {/* Zone 5: Count Badge */}
                  <div
                    className={`tab-anatomy-zone ${activeZone === 5 ? 'is-active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleZoneClick(5); }}
                    onMouseEnter={() => handleZoneHover(5)}
                    onMouseLeave={() => handleZoneHover(null)}
                    title={isId ? '5. Badge Penghitung' : '5. Count Badge'}
                  >
                    <div className={`tab-anatomy-pin tab-anatomy-pin--top ${activeZone === 5 ? 'is-active' : ''}`}>
                      <span className="tab-anatomy-pin__dot">5</span>
                      <span className="tab-anatomy-pin__stem" />
                    </div>
                    <span className="neuron-tab__badge">12</span>
                  </div>

                  {/* Zone 6: Active Indicator (at bottom pointing UP) */}
                  <div
                    className={`tab-anatomy-zone ${activeZone === 6 ? 'is-active' : ''}`}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: '-1px',
                      height: '2px',
                      background: 'var(--color-primary)'
                    }}
                    onClick={(e) => { e.stopPropagation(); handleZoneClick(6); }}
                    onMouseEnter={() => handleZoneHover(6)}
                    onMouseLeave={() => handleZoneHover(null)}
                    title={isId ? '6. Indikator Tab Aktif' : '6. Active Indicator'}
                  >
                    <div className={`tab-anatomy-pin tab-anatomy-pin--bottom ${activeZone === 6 ? 'is-active' : ''}`}>
                      <span className="tab-anatomy-pin__stem" />
                      <span className="tab-anatomy-pin__dot">6</span>
                    </div>
                  </div>
                </div>

                {/* Tab 3: Dynamic Closable Tab (Audit Logs) */}
                <div
                  className="neuron-tab neuron-tab--line neuron-tab--md"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'default' }}
                >
                  <span className="neuron-tab__icon"><FileText size={16} /></span>
                  <span className="neuron-tab__label">Audit Logs</span>

                  {/* Zone 7: Close Trigger */}
                  <div
                    className={`tab-anatomy-zone ${activeZone === 7 ? 'is-active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleZoneClick(7); }}
                    onMouseEnter={() => handleZoneHover(7)}
                    onMouseLeave={() => handleZoneHover(null)}
                    title={isId ? '7. Tombol Tutup Tab' : '7. Close Trigger'}
                  >
                    <div className={`tab-anatomy-pin tab-anatomy-pin--top ${activeZone === 7 ? 'is-active' : ''}`}>
                      <span className="tab-anatomy-pin__dot">7</span>
                      <span className="tab-anatomy-pin__stem" />
                    </div>
                    <span className="neuron-tab__close" style={{ display: 'inline-flex', alignItems: 'center', padding: '2px' }}>
                      <X size={14} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Zone 8: Extra Actions Slot */}
              <div
                className={`tab-anatomy-zone ${activeZone === 8 ? 'is-active' : ''}`}
                onClick={(e) => { e.stopPropagation(); handleZoneClick(8); }}
                onMouseEnter={() => handleZoneHover(8)}
                onMouseLeave={() => handleZoneHover(null)}
                title={isId ? '8. Slot Aksi Tambahan' : '8. Extra Actions Slot'}
              >
                <div className={`tab-anatomy-pin tab-anatomy-pin--top ${activeZone === 8 ? 'is-active' : ''}`}>
                  <span className="tab-anatomy-pin__dot">8</span>
                  <span className="tab-anatomy-pin__stem" />
                </div>
                <NeuronButton variant="outline" size="xs" style={{ pointerEvents: 'none' }}>
                  <Plus size={14} /> {isId ? 'Tampilan Baru' : 'New View'}
                </NeuronButton>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed-Height Stage Footer (Zero Layout Shift) */}
        <div className="tab-anatomy-stage-footer">
          {activeItem ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
                <span className="anatomy-number" style={{ width: '20px', height: '20px', fontSize: '10.5px', margin: 0, flexShrink: 0 }}>
                  {activeItem.id}
                </span>
                <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                  {activeItem.name}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(178, 94, 64, 0.12)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}>
                  {activeItem.category}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-bg-surface)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  whiteSpace: 'nowrap'
                }}>
                  {activeItem.w3c}
                </span>
              </div>
              <span style={{ fontSize: '11.5px', color: 'var(--color-primary)', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>
                {isId ? `Zona #${activeItem.id} disorot di bawah ↓` : `Zone #${activeItem.id} highlighted below ↓`}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', color: 'var(--color-text-tertiary)' }}>
              <Info size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {isId 
                  ? 'Arahkan kursor atau klik nomor zona (1–8) pada diagram atau kartu di bawah untuk menyorot spesifikasi teknis.' 
                  : 'Hover or click any numbered zone (1–8) on the canvas or list cards below to highlight technical specifications.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Anatomy Description Grid (8 Clean Symmetrical Cards Placed Below) */}
      <div className="tab-anatomy-grid">
        {anatomyItems.map((item) => {
          const isSelected = activeZone === item.id;
          return (
            <div
              key={item.id}
              className={`tab-anatomy-item-card ${isSelected ? 'is-active' : ''}`}
              onClick={() => handleZoneClick(item.id)}
              onMouseEnter={() => handleZoneHover(item.id)}
              onMouseLeave={() => handleZoneHover(null)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <span
                      className="anatomy-number"
                      style={{
                        background: isSelected ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                        color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                        border: isSelected ? 'none' : '1px solid var(--color-border)',
                        width: '24px',
                        height: '24px',
                        fontSize: '11px',
                        fontWeight: 700,
                        flexShrink: 0,
                        margin: 0
                      }}
                    >
                      {item.id}
                    </span>
                    <span style={{
                      fontWeight: 600,
                      fontSize: '13.5px',
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)'
                    }}>
                      {item.name}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '10px',
                      fontFamily: 'JetBrains Mono, monospace',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: isSelected ? 'rgba(178, 94, 64, 0.15)' : 'var(--color-bg-subtle)',
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      fontWeight: 600,
                      border: isSelected ? '1px solid rgba(178, 94, 64, 0.3)' : '1px solid var(--color-border)'
                    }}>
                      {item.category}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontFamily: 'JetBrains Mono, monospace',
                      padding: '2px 5px',
                      borderRadius: '4px',
                      background: 'var(--color-bg-subtle)',
                      color: 'var(--color-text-tertiary)',
                      border: '1px solid var(--color-border)'
                    }}>
                      {item.w3c}
                    </span>
                  </div>
                </div>

                <p style={{ margin: '0 0 10px 0', fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>

              {/* Symmetrical Best Practice Tip in each card */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '6px',
                paddingTop: '8px',
                borderTop: '1px dashed var(--color-border)',
                fontSize: '11.5px',
                color: 'var(--color-text-tertiary)',
                lineHeight: 1.45
              }}>
                <Sparkles size={13} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong style={{ color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)', fontWeight: 600 }}>
                    {isId ? 'Tips: ' : 'Tip: '}
                  </strong>
                  {item.tip}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TabBarView({ setActiveTab }: TabBarViewProps) {
  const { language, t } = useLanguage();
  const isId = language === 'id';
  const [activeViewTab, setViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // Interactive state for Master Matrix table rows
  const [matrixTabs, setMatrixTabs] = useState<Record<string, string>>({
    line: 'overview',
    segment: 'overview',
    pills: 'overview',
    enclosed: 'overview',
    soft: 'overview',
  });

  const handleMatrixChange = (variant: string, tabId: string) => {
    setMatrixTabs(prev => ({ ...prev, [variant]: tabId }));
  };

  // Interactive state for Guideline variant demos
  const [lineActive, setLineActive] = useState('analytics');
  const [pillsActive, setPillsActive] = useState('overview');
  const [enclosedActive, setEnclosedActive] = useState('index.tsx');
  const [segmentActive, setSegmentActive] = useState('monthly');
  const [softActive, setSoftActive] = useState('general');
  const [verticalActive, setVerticalActive] = useState('profile');

  // Workspace closable tabs recipe demo state
  const [workspaceTabs, setWorkspaceTabs] = useState<TabItem[]>([
    { id: 'App.tsx', label: 'App.tsx', icon: <Code size={14} />, closable: true },
    { id: 'TabBarView.tsx', label: 'TabBarView.tsx', icon: <Layers size={14} />, closable: true },
    { id: 'neudela.css', label: 'neudela.css', icon: <FileText size={14} />, closable: true },
  ]);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('TabBarView.tsx');

  const handleCloseWorkspaceTab = (tabId: string) => {
    const nextTabs = workspaceTabs.filter(t => t.id !== tabId);
    setWorkspaceTabs(nextTabs);
    if (activeWorkspaceTab === tabId && nextTabs.length > 0) {
      setActiveWorkspaceTab(nextTabs[nextTabs.length - 1].id);
    }
  };

  const handleAddWorkspaceTab = () => {
    const newId = `Feature_${workspaceTabs.length + 1}.tsx`;
    const newTab: TabItem = {
      id: newId,
      label: newId,
      icon: <Code size={14} />,
      closable: true,
    };
    setWorkspaceTabs([...workspaceTabs, newTab]);
    setActiveWorkspaceTab(newId);
  };

  return (
    <div className="badge-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.nav.compTabBar || 'Tab Bar'}</h1>
            <p className="page-subtitle">
              Interactive navigation component that organizes content into contextual sections, enabling users to alternate between related views without leaving the page context.
            </p>
          </div>
        </div>

        {/* ── Tab Bar Navigation for Guideline vs Playbook ── */}
        <div className="comp-tab-bar">
          <button
            className={`comp-tab ${activeViewTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setViewTab('guideline')}
          >
            Guideline
          </button>
          <button
            className={`comp-tab ${activeViewTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setViewTab('playbook')}
          >
            Playbook
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 1 – GUIDELINE
      ═══════════════════════════════════════════════════════════════════════ */}
      {activeViewTab === 'guideline' && (
        <div className="tab-content">
          {/* ── 1. Overview & Specification Matrix ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Ikhtisar' : 'Overview'}</h2>
            <p className="section-description">
              {isId
                ? 'Tab Bar membagi konten kompleks menjadi beberapa tampilan terpisah yang saling terkait dalam satu kontainer visual. Pengguna dapat berganti konteks secara instan tanpa meninggalkan halaman.'
                : 'Tab Bar divides complex content into multiple distinct yet related views within a unified visual container. Users can switch context instantly without leaving the page environment.'}
            </p>

            {/* Key Pillars Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
            }}>
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Layers size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? '5 Varian Visual' : '5 Visual Styles'}
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.5 }}>
                    Line, Segment, Pills, Enclosed, & Soft
                  </div>
                </div>
              </div>

              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Sliders size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? '3 Skala Kerapatan' : '3 Scale Sizes'}
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.5 }}>
                    sm (32px), md (40px), & lg (48px)
                  </div>
                </div>
              </div>

              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Laptop size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? '2 Orientasi Tata Letak' : '2 Orientations'}
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.5 }}>
                    Horizontal header & Vertical sidebar
                  </div>
                </div>
              </div>

              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Aksesibilitas Penuh' : 'WAI-ARIA Compliant'}
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.5 }}>
                    Keyboard arrows & ARIA tablist
                  </div>
                </div>
              </div>
            </div>

            {/* Master Specification Matrix Card with Live Component Previews */}
            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">
                    {isId ? 'Matriks Spesifikasi Tab Bar' : 'Tab Bar Specification Matrix'}
                  </div>
                  <div className="badge-spec-subtitle">
                    {isId
                      ? '5 Varian Visual × 3 Skala Ukuran — Indikator Dinamis & Live Interactive Preview'
                      : '5 Visual Variants × 3 Scale Sizes — Dynamic Indicator & Live Interactive Preview'}
                  </div>
                </div>
              </div>

              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th style={{ width: '130px' }}>Variant</th>
                      <th style={{ minWidth: '320px' }}>{isId ? 'Preview Interaktif Langsung' : 'Live Interactive Preview'}</th>
                      <th style={{ minWidth: '160px' }}>{isId ? 'Tipe Indikator' : 'Indicator Type'}</th>
                      <th style={{ minWidth: '220px' }}>{isId ? 'Penggunaan Ideal' : 'Recommended Use'}</th>
                      <th style={{ width: '120px' }}>Sizes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)' }}>Line</span>
                          <code style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>variant="line"</code>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <NeuronTabBar
                          variant="line"
                          size="sm"
                          value={matrixTabs.line || 'overview'}
                          onChange={(id) => handleMatrixChange('line', id)}
                          items={[
                            { id: 'overview', label: 'Overview' },
                            { id: 'analytics', label: 'Analytics', badge: '12' },
                            { id: 'settings', label: 'Settings' },
                          ]}
                          renderPanels={false}
                        />
                      </td>
                      <td>
                        <NeuronBadge variant="brand" size="xs">Sliding Accent Line (2.5px)</NeuronBadge>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {isId ? 'Header halaman utama, tab analitik dashboard' : 'Main page headers, dashboard modules'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <span className="badge-size-tag">sm</span>
                          <span className="badge-size-tag">md</span>
                          <span className="badge-size-tag">lg</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)' }}>Segment</span>
                          <code style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>variant="segment"</code>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <NeuronTabBar
                          variant="segment"
                          size="sm"
                          value={matrixTabs.segment || 'overview'}
                          onChange={(id) => handleMatrixChange('segment', id)}
                          items={[
                            { id: 'overview', label: 'Day' },
                            { id: 'analytics', label: 'Week' },
                            { id: 'settings', label: 'Month', badge: 'New' },
                          ]}
                          renderPanels={false}
                        />
                      </td>
                      <td>
                        <NeuronBadge variant="secondary" size="xs">Floating Pill on Sunken Track</NeuronBadge>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {isId ? 'Filter rentang waktu, view switcher, kontrol padat' : 'Timeframe filters, view switchers, dense controls'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <span className="badge-size-tag">sm</span>
                          <span className="badge-size-tag">md</span>
                          <span className="badge-size-tag">lg</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)' }}>Pills</span>
                          <code style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>variant="pills"</code>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <NeuronTabBar
                          variant="pills"
                          size="sm"
                          value={matrixTabs.pills || 'overview'}
                          onChange={(id) => handleMatrixChange('pills', id)}
                          items={[
                            { id: 'overview', label: 'All Items', badge: '48' },
                            { id: 'analytics', label: 'Active', badge: '32' },
                            { id: 'settings', label: 'Pending' },
                          ]}
                          renderPanels={false}
                        />
                      </td>
                      <td>
                        <NeuronBadge variant="neutral" size="xs">Filled Rounded Capsule</NeuronBadge>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {isId ? 'Filter status data, navigasi berbasis kategori chip' : 'Status filtering, category chip navigation'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <span className="badge-size-tag">sm</span>
                          <span className="badge-size-tag">md</span>
                          <span className="badge-size-tag">lg</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)' }}>Enclosed</span>
                          <code style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>variant="enclosed"</code>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <NeuronTabBar
                          variant="enclosed"
                          size="sm"
                          value={matrixTabs.enclosed || 'overview'}
                          onChange={(id) => handleMatrixChange('enclosed', id)}
                          items={[
                            { id: 'overview', label: 'App.tsx', closable: true },
                            { id: 'analytics', label: 'Styles.css', closable: true },
                            { id: 'settings', label: 'Schema.sql' },
                          ]}
                          renderPanels={false}
                        />
                      </td>
                      <td>
                        <NeuronBadge variant="outline" size="xs">Card Outline & Top Header</NeuronBadge>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {isId ? 'Editor kode, penampil dokumen, browser-like tabs' : 'Code editors, multi-document viewers, browser tabs'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <span className="badge-size-tag">sm</span>
                          <span className="badge-size-tag">md</span>
                          <span className="badge-size-tag">lg</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)' }}>Soft</span>
                          <code style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>variant="soft"</code>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <NeuronTabBar
                          variant="soft"
                          size="sm"
                          value={matrixTabs.soft || 'overview'}
                          onChange={(id) => handleMatrixChange('soft', id)}
                          items={[
                            { id: 'overview', label: 'General' },
                            { id: 'analytics', label: 'Notifications', badge: '2' },
                            { id: 'settings', label: 'Security' },
                          ]}
                          renderPanels={false}
                        />
                      </td>
                      <td>
                        <NeuronBadge variant="secondary" size="xs">Tinted Brand Surface</NeuronBadge>
                      </td>
                      <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {isId ? 'Sidebar pengaturan akun, dialog modal bersih' : 'Account settings sidebar, clean modal dialogues'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <span className="badge-size-tag">sm</span>
                          <span className="badge-size-tag">md</span>
                          <span className="badge-size-tag">lg</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* When to Use Guidance Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-6)',
            }}>
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                  <Check size={18} color="var(--emerald-600, #059669)" />
                  {isId ? 'Kapan Menggunakan Tab Bar' : 'When to Use Tab Bar'}
                </div>
                <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  <li>{isId ? 'Mengelompokkan konten setara dalam satu konteks halaman tanpa reload.' : 'Organizing parallel content views within the same hierarchy without navigating away.'}</li>
                  <li>{isId ? 'Memisahkan kategori data besar seperti Ringkasan, Laporan, dan Pengaturan.' : 'Separating high-volume dashboard views like Overview, Reports, and Settings.'}</li>
                  <li>{isId ? 'Antarmuka multi-dokumen atau editor kode menggunakan tab yang dapat ditutup (closable).' : 'Multi-document interfaces or code editors supporting dynamic closable tabs.'}</li>
                </ul>
              </div>

              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                  <Sliders size={18} color="var(--brand-600, #b25e40)" />
                  {isId ? 'Kapan Menggunakan Komponen Lain' : 'When to Use Alternatives'}
                </div>
                <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  <li><strong>Button Group:</strong> {isId ? 'Untuk tombol aksi langsung atau filter toggle nilai sederhana (misal: Grid / List).' : 'For immediate direct actions or compact view toggles (e.g., Grid / List view).'}</li>
                  <li><strong>Breadcrumb:</strong> {isId ? 'Untuk hierarki bertingkat parent-ke-child (misal: Toko > Elektronik > HP).' : 'For deep multi-level ancestor hierarchy (e.g., Home > Electronics > Phones).'}</li>
                  <li><strong>Stepper / Wizard:</strong> {isId ? 'Untuk alur proses sekuensial yang harus diselesaikan bertahap.' : 'For sequential multi-step processes that must be completed in order.'}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── 2. Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">Anatomy</h2>
            <p className="section-description">
              {isId
                ? 'Struktur anatomi komprehensif komponen NeuronTabBar yang terdiri dari 8 zona sub-elemen fungsional untuk keterbacaan, aksesibilitas, dan kemudahan interaksi.'
                : 'A comprehensive structural anatomy of the NeuronTabBar component composed of 8 functional zones engineered for legibility, accessibility, and intuitive interaction.'}
            </p>

            <TabBarAnatomyViewer isId={isId} />
          </div>

          {/* ── 3. Visual Variants ── */}
          <div className="section-card">
            <h2 className="section-title">Visual Variants</h2>
            <p className="section-description">
              Choose the appropriate visual variant to harmonize with the host page hierarchy and application aesthetics.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Line Variant */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <div>
                    <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>1. Line (Underline Accent)</h3>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                      Clean, minimalist style featuring an animated primary brand bottom line. Ideal for primary page tabs.
                    </p>
                  </div>
                  <NeuronBadge variant="brand" size="sm">Recommended for Pages</NeuronBadge>
                </div>
                <NeuronTabBar
                  variant="line"
                  size="md"
                  value={lineActive}
                  onChange={setLineActive}
                  items={[
                    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={16} /> },
                    { id: 'reports', label: 'Reports', icon: <FileText size={16} />, badge: 3 },
                    { id: 'members', label: 'Team Members', icon: <Users size={16} /> },
                    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
                  ]}
                  renderPanels={false}
                />
              </div>

              {/* Segment Variant */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <div>
                    <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>2. Segment (Segmented Track)</h3>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                      Sunken track with a floating surface pill. Exceptional for view toggle controls, time horizons, and filters.
                    </p>
                  </div>
                  <NeuronBadge variant="secondary" size="sm">Compact & Modern</NeuronBadge>
                </div>
                <div style={{ display: 'inline-block' }}>
                  <NeuronTabBar
                    variant="segment"
                    size="md"
                    value={segmentActive}
                    onChange={setSegmentActive}
                    items={[
                      { id: 'daily', label: 'Daily' },
                      { id: 'weekly', label: 'Weekly' },
                      { id: 'monthly', label: 'Monthly' },
                      { id: 'quarterly', label: 'Quarterly', badge: 'New' },
                    ]}
                    renderPanels={false}
                  />
                </div>
              </div>

              {/* Pills Variant */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <div>
                    <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>3. Pills (Capsule Badges)</h3>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                      High-contrast rounded pill shapes. Best for filtering list categories or tag-based navigation.
                    </p>
                  </div>
                  <NeuronBadge variant="neutral" size="sm">High Contrast</NeuronBadge>
                </div>
                <NeuronTabBar
                  variant="pills"
                  size="md"
                  value={pillsActive}
                  onChange={setPillsActive}
                  items={[
                    { id: 'overview', label: 'All Items', badge: 48 },
                    { id: 'active', label: 'Active', badge: 32 },
                    { id: 'pending', label: 'Pending Approval', badge: 14 },
                    { id: 'archived', label: 'Archived', badge: 2 },
                  ]}
                  renderPanels={false}
                />
              </div>

              {/* Enclosed Variant */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <div>
                    <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>4. Enclosed (Card & Browser Style)</h3>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                      Emulates desktop tab bars with seamless border integration into the content area below.
                    </p>
                  </div>
                  <NeuronBadge variant="outline" size="sm">IDE & Editor</NeuronBadge>
                </div>
                <NeuronTabBar
                  variant="enclosed"
                  size="md"
                  value={enclosedActive}
                  onChange={setEnclosedActive}
                  items={[
                    { id: 'index.tsx', label: 'index.tsx', icon: <Code size={14} />, closable: true },
                    { id: 'schema.sql', label: 'schema.sql', icon: <FileText size={14} />, closable: true },
                    { id: 'tokens.json', label: 'tokens.json', icon: <Folder size={14} />, closable: true },
                  ]}
                  renderPanels={false}
                />
              </div>

              {/* Soft Variant */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <div>
                    <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>5. Soft (Tinted Background)</h3>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                      Subtle tinted brand background with clean rounded corners. Perfect for modal dialogues and settings sidebars.
                    </p>
                  </div>
                  <NeuronBadge variant="secondary" size="sm">Subtle Tint</NeuronBadge>
                </div>
                <NeuronTabBar
                  variant="soft"
                  size="md"
                  value={softActive}
                  onChange={setSoftActive}
                  items={[
                    { id: 'general', label: 'General Settings', icon: <Settings size={16} /> },
                    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} />, badge: 2 },
                    { id: 'security', label: 'Security & Access', icon: <ShieldCheck size={16} /> },
                  ]}
                  renderPanels={false}
                />
              </div>
            </div>
          </div>

          {/* ── 4. Size Hierarchy ── */}
          <div className="section-card">
            <h2 className="section-title">Size Hierarchy</h2>
            <p className="section-description">
              NeuronTabBar provides 3 standard heights to maintain proportion across different UI densities.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* SM */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Small (32px)</span>
                  <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)' }}>— Compact toolbars, dense data tables, modal dialogs</span>
                </div>
                <NeuronTabBar
                  variant="segment"
                  size="sm"
                  items={[
                    { id: '1', label: 'Table' },
                    { id: '2', label: 'Kanban' },
                    { id: '3', label: 'Calendar' },
                  ]}
                  defaultValue="1"
                  renderPanels={false}
                />
              </div>

              {/* MD */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Medium (40px)</span>
                  <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-primary)', fontWeight: 600 }}>Default</span>
                  <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)' }}>— Primary dashboard views, page content sections</span>
                </div>
                <NeuronTabBar
                  variant="line"
                  size="md"
                  items={[
                    { id: '1', label: 'Overview', icon: <Layers size={16} /> },
                    { id: '2', label: 'Performance', icon: <Activity size={16} /> },
                    { id: '3', label: 'Audience', icon: <Users size={16} /> },
                  ]}
                  defaultValue="1"
                  renderPanels={false}
                />
              </div>

              {/* LG */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Large (48px)</span>
                  <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)' }}>— Hero landing headers, onboarding flows, touch-first tablet layouts</span>
                </div>
                <NeuronTabBar
                  variant="line"
                  size="lg"
                  items={[
                    { id: '1', label: 'Enterprise Cloud', icon: <Globe size={18} /> },
                    { id: '2', label: 'Developer SDK', icon: <Code size={18} /> },
                    { id: '3', label: 'AI Platform', icon: <Sparkles size={18} /> },
                  ]}
                  defaultValue="1"
                  renderPanels={false}
                />
              </div>
            </div>
          </div>

          {/* ── 5. Orientation (Horizontal vs Vertical) ── */}
          <div className="section-card">
            <h2 className="section-title">Layout Orientations</h2>
            <p className="section-description">
              Tab Bar supports both standard top `horizontal` navigation and sidebar `vertical` navigation for deep multi-level settings.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)'
            }}>
              <div>
                <h4 style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
                  Horizontal (Default)
                </h4>
                <NeuronTabBar
                  variant="soft"
                  size="md"
                  orientation="horizontal"
                  items={[
                    { id: 'h1', label: 'Design' },
                    { id: 'h2', label: 'Code' },
                    { id: 'h3', label: 'Preview' },
                  ]}
                  defaultValue="h1"
                  renderPanels={false}
                />
              </div>

              <div>
                <h4 style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
                  Vertical (Sidebar Navigation)
                </h4>
                <div style={{ height: '180px', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
                  <NeuronTabBar
                    variant="line"
                    size="sm"
                    orientation="vertical"
                    value={verticalActive}
                    onChange={setVerticalActive}
                    items={[
                      { id: 'profile', label: 'Profile Information', icon: <Users size={14} /> },
                      { id: 'billing', label: 'Plan & Billing', icon: <FileText size={14} /> },
                      { id: 'security', label: 'Security Keys', icon: <ShieldCheck size={14} /> },
                    ]}
                    renderPanels={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. Interactive States ── */}
          <div className="section-card">
            <h2 className="section-title">Interactive States</h2>
            <p className="section-description">
              Visual feedback is provided across all standard UI states to guarantee clear user feedback and accessibility.
            </p>

            <div className="badge-spec-table-wrap">
              <table className="badge-matrix-table">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Visual Treatment</th>
                    <th>Indicator / Focus</th>
                    <th>User Behavior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Default (Inactive)</strong></td>
                    <td><code>color: var(--color-text-secondary)</code>, transparent background</td>
                    <td>No bottom indicator</td>
                    <td>Resting state indicating non-selected alternative views</td>
                  </tr>
                  <tr>
                    <td><strong>Hover</strong></td>
                    <td><code>color: var(--color-primary)</code> (latar transparan pada varian <code>line</code>; aksen halus pada <code>pills</code> & <code>soft</code>)</td>
                    <td>Brand color feedback with pointer cursor</td>
                    <td>Indicates the tab is clickable with clean brand color feedback without borders or shadow rings</td>
                  </tr>
                  <tr>
                    <td><strong>On Click (:active)</strong></td>
                    <td><code>color: var(--color-primary)</code></td>
                    <td>Clean standard tab transition (no border or shadow ring)</td>
                    <td>Immediate clean transition to active state matching standard tab bar UX</td>
                  </tr>
                  <tr>
                    <td><strong>Selected (Active)</strong></td>
                    <td><code>color: var(--color-primary)</code>, font-weight: 600</td>
                    <td>Sliding accent line or elevated floating pill</td>
                    <td>Signifies current visible content panel cleanly</td>
                  </tr>
                  <tr>
                    <td><strong>Focus-Visible</strong></td>
                    <td><code>color: var(--color-primary)</code>, indicator aligned</td>
                    <td>Standard clean tab focus without intrusive outline rings</td>
                    <td>Navigated via keyboard Tab or Arrow keys</td>
                  </tr>
                  <tr>
                    <td><strong>Disabled</strong></td>
                    <td><code>opacity: 0.45</code>, <code>pointer-events: none</code></td>
                    <td>No hover or focus rings</td>
                    <td>Content is inaccessible based on permissions or data state</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 7. Do's & Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">Do's & Don'ts</h2>
            <p className="section-description">
              Follow these design rules and anti-patterns when integrating Tab Bars into application layouts.
            </p>

            <div className="rule-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
              <RuleCard type="do">
                <strong>Keep labels concise and predictable.</strong> Use 1-2 words (e.g., "Overview", "Analytics", "Settings") so users can scan options quickly without cognitive overload.
              </RuleCard>

              <RuleCard type="dont">
                <strong>Don't wrap tabs onto multiple rows.</strong> Multi-line tabs confuse users about the active selection. Use horizontal scrolling or an overflow menu instead.
              </RuleCard>

              <RuleCard type="do">
                <strong>Use badges to highlight dynamic numbers or alerts.</strong> Badge counters (e.g. pending requests or unread items) draw attention directly to tabs needing action.
              </RuleCard>

              <RuleCard type="dont">
                <strong>Don't use tabs for linear sequential steps.</strong> If the user must complete Step 1 before Step 2, use a Stepper or Progress component instead of tabs.
              </RuleCard>

              <RuleCard type="do">
                <strong>Persist tab state in the URL hash or query params.</strong> This allows users to deep-link, bookmark, and use browser back/forward buttons naturally.
              </RuleCard>

              <RuleCard type="dont">
                <strong>Don't nest more than two levels of tabs.</strong> Deeply nested tabs cause disorientation. Use a sidebar or breadcrumb hierarchy for deeper navigation.
              </RuleCard>
            </div>
          </div>

          {/* ── 8. Accessibility (A11y) ── */}
          <div className="section-card">
            <h2 className="section-title">Accessibility (WAI-ARIA APG)</h2>
            <p className="section-description">
              NeuronTabBar implements the complete W3C WAI-ARIA APG Tabs pattern with full keyboard navigation and screen reader semantics.
            </p>

            <div className="badge-spec-table-wrap">
              <table className="badge-matrix-table">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Action / Behavior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><kbd>Tab</kbd></td>
                    <td>Moves keyboard focus into the active tab in the tablist. Subsequent <kbd>Tab</kbd> moves focus to the active tabpanel content.</td>
                  </tr>
                  <tr>
                    <td><kbd>→</kbd> / <kbd>←</kbd></td>
                    <td>Navigates focus to the next or previous enabled tab in horizontal orientation (cycles around edges).</td>
                  </tr>
                  <tr>
                    <td><kbd>↓</kbd> / <kbd>↑</kbd></td>
                    <td>Navigates focus to the next or previous enabled tab in vertical orientation.</td>
                  </tr>
                  <tr>
                    <td><kbd>Home</kbd></td>
                    <td>Immediately moves focus to the first non-disabled tab in the tablist.</td>
                  </tr>
                  <tr>
                    <td><kbd>End</kbd></td>
                    <td>Immediately moves focus to the last non-disabled tab in the tablist.</td>
                  </tr>
                  <tr>
                    <td><kbd>Space</kbd> / <kbd>Enter</kbd></td>
                    <td>Activates the focused tab and updates the corresponding tabpanel view.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 2 – PLAYBOOK
      ═══════════════════════════════════════════════════════════════════════ */}
      {activeViewTab === 'playbook' && (
        <div className="tab-content">
          {/* ── 1. Interactive Playground ── */}
          <div className="section-card">
            <h2 className="section-title">Interactive Playground</h2>
            <p className="section-description">
              Customize properties in real-time to preview styles, behavior, and generate ready-to-copy code across React, Vue 3, and HTML/CSS.
            </p>

            <Playground
              name="NeuronTabBar"
              knobs={[
                {
                  name: 'variant',
                  label: 'Variant',
                  type: 'select',
                  options: ['line', 'segment', 'pills', 'enclosed', 'soft'],
                  default: 'line',
                },
                {
                  name: 'size',
                  label: 'Size',
                  type: 'select',
                  options: ['sm', 'md', 'lg'],
                  default: 'md',
                },
                {
                  name: 'orientation',
                  label: 'Orientation',
                  type: 'select',
                  options: ['horizontal', 'vertical'],
                  default: 'horizontal',
                },
                {
                  name: 'fullWidth',
                  label: 'Full Width',
                  type: 'boolean',
                  default: false,
                },
                {
                  name: 'showIcons',
                  label: 'Show Icons',
                  type: 'boolean',
                  default: true,
                },
                {
                  name: 'showBadges',
                  label: 'Show Badges',
                  type: 'boolean',
                  default: true,
                },
                {
                  name: 'closable',
                  label: 'Closable Tabs',
                  type: 'boolean',
                  default: false,
                },
                {
                  name: 'disabledTab',
                  label: 'Include Disabled Tab',
                  type: 'boolean',
                  default: false,
                },
              ]}
              codeTemplates={(state) => {
                const variant = state.variant as string;
                const size = state.size as string;
                const orientation = state.orientation as string;
                const fullWidth = !!state.fullWidth;
                const closable = !!state.closable;

                return {
                  react: `import { NeuronTabBar } from 'neudela';
import { Layers, BarChart2, Users, Settings } from 'lucide-react';

export default function TabsExample() {
  const items = [
    { id: 'overview', label: 'Overview'${state.showIcons ? ', icon: <Layers size={16} />' : ''} },
    { id: 'analytics', label: 'Analytics'${state.showIcons ? ', icon: <BarChart2 size={16} />' : ''}${state.showBadges ? ', badge: "12"' : ''} },
    { id: 'team', label: 'Team'${state.showIcons ? ', icon: <Users size={16} />' : ''} },
    ${state.disabledTab ? "{ id: 'billing', label: 'Billing', disabled: true },\n    " : ''}{ id: 'settings', label: 'Settings'${state.showIcons ? ', icon: <Settings size={16} />' : ''} },
  ];

  return (
    <NeuronTabBar
      variant="${variant}"
      size="${size}"
      orientation="${orientation}"${fullWidth ? '\n      fullWidth' : ''}${closable ? '\n      closable' : ''}
      items={items}
      defaultValue="overview"
      onChange={(activeId) => console.log('Active tab:', activeId)}
    />
  );
}`,
                  vue: `<template>
  <NeuronTabBar
    variant="${variant}"
    size="${size}"
    orientation="${orientation}"${fullWidth ? '\n    :full-width="true"' : ''}${closable ? '\n    :closable="true"' : ''}
    :items="tabItems"
    v-model="activeTab"
  />
</template>

<script setup>
import { ref } from 'vue';
import { NeuronTabBar } from 'neudela';

const activeTab = ref('overview');
const tabItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics'${state.showBadges ? ', badge: "12"' : ''} },
  { id: 'team', label: 'Team' },
  ${state.disabledTab ? "{ id: 'billing', label: 'Billing', disabled: true },\n  " : ''}{ id: 'settings', label: 'Settings' }
];
</script>`,
                  html: `<!-- Neudela Tab Bar Component -->
<div class="neuron-tab-bar neuron-tab-bar--${variant} neuron-tab-bar--${size} neuron-tab-bar--${orientation}${fullWidth ? ' neuron-tab-bar--full-width' : ''}">
  <div class="neuron-tab-bar__header-wrap">
    <div class="neuron-tab-bar__nav" role="tablist" aria-orientation="${orientation}">
      <button role="tab" class="neuron-tab neuron-tab--active" aria-selected="true">
        ${state.showIcons ? '<span class="neuron-tab__icon">★</span>' : ''}
        <span class="neuron-tab__label">Overview</span>
      </button>
      <button role="tab" class="neuron-tab" aria-selected="false">
        ${state.showIcons ? '<span class="neuron-tab__icon">📊</span>' : ''}
        <span class="neuron-tab__label">Analytics</span>
        ${state.showBadges ? '<span class="neuron-tab__badge">12</span>' : ''}
      </button>
      <button role="tab" class="neuron-tab" aria-selected="false">
        ${state.showIcons ? '<span class="neuron-tab__icon">👥</span>' : ''}
        <span class="neuron-tab__label">Team</span>
      </button>
    </div>
  </div>
</div>`,
                };
              }}
            >
              {(state) => {
                const variant = state.variant as TabBarVariant;
                const size = state.size as TabBarSize;
                const orientation = state.orientation as TabBarOrientation;
                const fullWidth = !!state.fullWidth;
                const showIcons = !!state.showIcons;
                const showBadges = !!state.showBadges;
                const closable = !!state.closable;
                const disabledTab = !!state.disabledTab;

                const playgroundItems: TabItem[] = [
                  { 
                    id: 'overview', 
                    label: 'Overview', 
                    icon: showIcons ? <Layers size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} /> : undefined 
                  },
                  { 
                    id: 'analytics', 
                    label: 'Analytics', 
                    icon: showIcons ? <BarChart2 size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} /> : undefined,
                    badge: showBadges ? '12' : undefined,
                  },
                  { 
                    id: 'team', 
                    label: 'Team', 
                    icon: showIcons ? <Users size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} /> : undefined 
                  },
                  ...(disabledTab ? [{
                    id: 'billing',
                    label: 'Billing',
                    disabled: true,
                    badge: showBadges ? 'Pro' : undefined,
                  }] : []),
                  { 
                    id: 'settings', 
                    label: 'Settings', 
                    icon: showIcons ? <Settings size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} /> : undefined 
                  },
                ];

                return (
                  <div style={{ width: '100%', maxWidth: orientation === 'vertical' ? '480px' : '720px', margin: '0 auto' }}>
                    <NeuronTabBar
                      variant={variant}
                      size={size}
                      orientation={orientation}
                      fullWidth={fullWidth}
                      closable={closable}
                      items={playgroundItems}
                      defaultValue="overview"
                      renderPanels={false}
                    />
                  </div>
                );
              }}
            </Playground>
          </div>

          {/* ── 2. Production Patterns / Recipes ── */}
          <div className="section-card">
            <h2 className="section-title">Production Recipes & Patterns</h2>
            <p className="section-description">
              Tested architectural implementations for common real-world product workflows.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {/* Pattern 1: Dashboard with Content Synchronization */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', background: 'var(--color-bg-surface)' }}>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Pattern 1
                  </span>
                  <h3 style={{ fontSize: 'var(--fs-text-lg)', fontWeight: 600, margin: '4px 0' }}>
                    Integrated Tab Panels with Live Content Switching
                  </h3>
                  <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    NeuronTabBar automatically renders its corresponding panel content with built-in fade transition and focus routing.
                  </p>
                </div>

                <div style={{ background: 'var(--color-bg-primary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
                  <NeuronTabBar
                    variant="line"
                    size="md"
                    defaultValue="traffic"
                    items={[
                      {
                        id: 'traffic',
                        label: 'Traffic Growth',
                        icon: <Activity size={16} />,
                        content: (
                          <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                              <div>
                                <h4 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>Active Web Visitors</h4>
                                <p style={{ margin: '2px 0 0', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>Last 30 days traffic session distribution</p>
                              </div>
                              <NeuronBadge variant="success" size="sm">+28.4% WoW</NeuronBadge>
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)' }}>128,490 <span style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', fontWeight: 400 }}>sessions</span></div>
                          </div>
                        )
                      },
                      {
                        id: 'conversions',
                        label: 'Conversions',
                        icon: <BarChart2 size={16} />,
                        badge: '3.8%',
                        content: (
                          <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                            <h4 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>Sales Funnel Performance</h4>
                            <p style={{ margin: '4px 0 var(--space-3)', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)' }}>Average checkout completion rate: 3.82%</p>
                            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                              <div style={{ flex: 1, padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Cart Abandonment</div>
                                <div style={{ fontSize: '18px', fontWeight: 700 }}>24.1%</div>
                              </div>
                              <div style={{ flex: 1, padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Avg Order Value</div>
                                <div style={{ fontSize: '18px', fontWeight: 700 }}>$142.50</div>
                              </div>
                            </div>
                          </div>
                        )
                      },
                      {
                        id: 'retention',
                        label: 'Retention',
                        icon: <Users size={16} />,
                        content: (
                          <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                            <h4 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>Cohort 90-Day Retention</h4>
                            <p style={{ margin: '4px 0 0', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)' }}>64.2% of active users return weekly across desktop and mobile.</p>
                          </div>
                        )
                      }
                    ]}
                  />
                </div>
              </div>

              {/* Pattern 2: IDE / Closable Document Tabs */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Pattern 2
                    </span>
                    <h3 style={{ fontSize: 'var(--fs-text-lg)', fontWeight: 600, margin: '4px 0' }}>
                      Dynamic Closable Workspace Tabs
                    </h3>
                    <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                      Code editor and file management pattern with dynamic tab closures and a trailing "+" tab creator button.
                    </p>
                  </div>
                  <NeuronButton variant="primary" size="xs" onClick={handleAddWorkspaceTab}>
                    <Plus size={14} /> Open File
                  </NeuronButton>
                </div>

                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <NeuronTabBar
                    variant="enclosed"
                    size="md"
                    items={workspaceTabs}
                    value={activeWorkspaceTab}
                    onChange={setActiveWorkspaceTab}
                    onTabClose={handleCloseWorkspaceTab}
                    renderPanels={false}
                    extra={
                      <button
                        type="button"
                        onClick={handleAddWorkspaceTab}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '26px',
                          height: '26px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)',
                          background: 'var(--color-bg-surface)',
                          cursor: 'pointer',
                          color: 'var(--color-text-secondary)'
                        }}
                        title="New Tab"
                      >
                        <Plus size={14} />
                      </button>
                    }
                  />
                  <div style={{ padding: 'var(--space-6)', background: 'var(--color-bg-surface)', fontFamily: 'monospace', fontSize: '13px', minHeight: '100px' }}>
                    <div style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-2)' }}>
                      // Active Editor Buffer:
                    </div>
                    <div style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                      export default function {activeWorkspaceTab.replace(/\..+$/, '')}() {'{'}
                    </div>
                    <div style={{ paddingLeft: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
                      return &lt;div className="workspace-module"&gt;Loaded buffer {activeWorkspaceTab}&lt;/div&gt;;
                    </div>
                    <div style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{'}'}</div>
                  </div>
                </div>
              </div>

              {/* Pattern 3: Segmented Data Density Switcher */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', background: 'var(--color-bg-surface)' }}>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Pattern 3
                  </span>
                  <h3 style={{ fontSize: 'var(--fs-text-lg)', fontWeight: 600, margin: '4px 0' }}>
                    Toolbar Viewport & Device Density Switcher
                  </h3>
                  <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    Segmented tabs fitted inside a responsive header toolbar for switching device simulation views.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Preview Mode</div>
                  <NeuronTabBar
                    variant="segment"
                    size="sm"
                    items={[
                      { id: 'desktop', label: 'Desktop', icon: <Laptop size={14} /> },
                      { id: 'mobile', label: 'Mobile', icon: <Smartphone size={14} /> },
                    ]}
                    defaultValue="desktop"
                    renderPanels={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Component API Reference Table ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? 'Referensi API Komponen' : 'Component API Reference'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Dokumentasi antarmuka TypeScript, parameter properti, dan tanda tangan callback untuk NeuronTabBar, TabItem, serta NeuronTabPanel.'
                : 'TypeScript interfaces, property parameters, and callback signatures for NeuronTabBar, TabItem, and NeuronTabPanel.'}
            </p>

            {/* Table 1: NeuronTabBar Props */}
            <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Code size={18} style={{ color: 'var(--color-primary)' }} />
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, margin: 0, color: 'var(--color-text-primary)' }}>
                    NeuronTabBar Props
                  </h3>
                </div>
                <span style={{ 
                  fontSize: 'var(--fs-text-xs)', 
                  padding: '2px 8px', 
                  borderRadius: 'var(--radius-full, 9999px)', 
                  background: 'var(--color-bg-subtle)', 
                  border: '1px solid var(--color-border)', 
                  color: 'var(--color-text-secondary)', 
                  fontWeight: 500 
                }}>
                  {isId ? '14 Properti' : '14 Properties'}
                </span>
              </div>

              <div className="api-table-wrapper">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th style={{ width: '18%' }}>{t.compShared.prop}</th>
                      <th style={{ width: '28%' }}>{t.compShared.type}</th>
                      <th style={{ width: '14%' }}>{t.compShared.default}</th>
                      <th style={{ width: '40%' }}>{t.compShared.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <code>items</code>
                          <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '9999px', background: 'var(--color-primary-light, #fdf4ed)', color: 'var(--color-primary, #b25e40)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            {t.compShared.required || 'Required'}
                          </span>
                        </div>
                      </td>
                      <td><code className="api-type-code">TabItem[]</code></td>
                      <td><code className="api-default-code">[]</code></td>
                      <td>{isId ? 'Array konfigurasi item tab yang mendefinisikan label, ikon, badge, dan konten panel.' : 'Array of tab configuration items defining label, icon, badge, and panel content.'}</td>
                    </tr>
                    <tr>
                      <td><code>value</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'ID tab aktif terkontrol. Komponen beroperasi dalam mode controlled saat properti ini diisi.' : 'Controlled active tab ID. When provided, component behaves as controlled.'}</td>
                    </tr>
                    <tr>
                      <td><code>defaultValue</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">items[0]?.id</code></td>
                      <td>{isId ? 'ID tab awal yang aktif secara default untuk penggunaan uncontrolled.' : 'Initial active tab ID for uncontrolled usage (defaults to the first tab ID).'}</td>
                    </tr>
                    <tr>
                      <td><code>onChange</code></td>
                      <td><code className="api-type-code">{'(activeId: string) => void'}</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Callback yang dipicu saat pengguna berpindah tab via klik atau navigasi keyboard.' : 'Callback fired when user clicks or keyboards to a new tab.'}</td>
                    </tr>
                    <tr>
                      <td><code>variant</code></td>
                      <td><code className="api-type-code">{'\'line\' | \'pills\' | \'enclosed\' | \'segment\' | \'soft\''}</code></td>
                      <td><code className="api-default-code">'line'</code></td>
                      <td>{isId ? 'Gaya visual tab: line (garis aksen), pills (kapsul), enclosed (folder kotak), segment (tombol segmen), atau soft (latar lembut).' : 'Visual aesthetic style variant: line (underline accent), pills, enclosed, segment, or soft.'}</td>
                    </tr>
                    <tr>
                      <td><code>size</code></td>
                      <td><code className="api-type-code">{'\'sm\' | \'md\' | \'lg\''}</code></td>
                      <td><code className="api-default-code">'md'</code></td>
                      <td>{isId ? 'Skala ukuran tinggi tab, spasi internal, dan ukuran teks: sm (32px), md (40px), lg (48px).' : 'Size scaling controlling height and padding: sm (32px), md (40px), lg (48px).'}</td>
                    </tr>
                    <tr>
                      <td><code>orientation</code></td>
                      <td><code className="api-type-code">{'\'horizontal\' | \'vertical\''}</code></td>
                      <td><code className="api-default-code">'horizontal'</code></td>
                      <td>{isId ? 'Arah orientasi tata letak tablist dan panel konten (horizontal atau vertikal).' : 'Layout direction of the tablist and content panels.'}</td>
                    </tr>
                    <tr>
                      <td><code>fullWidth</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">false</code></td>
                      <td>{isId ? 'Jika true, tombol-tombol tab melebar secara simetris mengisi 100% lebar kontainer (hanya horizontal).' : 'When true, tab buttons expand symmetrically to fill 100% of header width (horizontal only).'}</td>
                    </tr>
                    <tr>
                      <td><code>scrollable</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">true</code></td>
                      <td>{isId ? 'Mengaktifkan navigasi gulir halus dan tombol panah kiri/kanan saat tab melampaui lebar layar.' : 'Enables smooth scrolling and arrow indicators on horizontal overflow.'}</td>
                    </tr>
                    <tr>
                      <td><code>closable</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">false</code></td>
                      <td>{isId ? 'Menampilkan tombol ikon tutup (\'×\') di semua tab untuk alur kerja workspace dinamis.' : 'Renders a close (\'×\') icon trigger on all tabs for dynamic workspaces.'}</td>
                    </tr>
                    <tr>
                      <td><code>onTabClose</code></td>
                      <td><code className="api-type-code">{'(tabId: string, e: MouseEvent) => void'}</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Callback yang dipanggil saat tombol tutup tab diklik pengguna.' : 'Callback triggered when a tab close button is clicked.'}</td>
                    </tr>
                    <tr>
                      <td><code>extra</code></td>
                      <td><code className="api-type-code">ReactNode</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Slot konten aksesori di ujung barisan tab (misal: tombol aksi baru, input filter).' : 'Custom accessory content slotted at the trailing end of the tab header.'}</td>
                    </tr>
                    <tr>
                      <td><code>renderPanels</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">true</code></td>
                      <td>{isId ? 'Merender komponen NeuronTabPanel secara otomatis untuk tab yang mendefinisikan properti content.' : 'Whether to automatically render NeuronTabPanels for items that define content.'}</td>
                    </tr>
                    <tr>
                      <td><code>panelClassName</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">''</code></td>
                      <td>{isId ? 'Kelas CSS kustom tambahan untuk kontainer pembungkus panel konten tab.' : 'Custom CSS class applied to the tab panel content container.'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: TabItem Interface */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Layers size={18} style={{ color: 'var(--color-primary)' }} />
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, margin: 0, color: 'var(--color-text-primary)' }}>
                    TabItem Interface
                  </h3>
                </div>
                <span style={{ 
                  fontSize: 'var(--fs-text-xs)', 
                  padding: '2px 8px', 
                  borderRadius: 'var(--radius-full, 9999px)', 
                  background: 'var(--color-bg-subtle)', 
                  border: '1px solid var(--color-border)', 
                  color: 'var(--color-text-secondary)', 
                  fontWeight: 500 
                }}>
                  {isId ? '11 Properti Item' : '11 Item Properties'}
                </span>
              </div>

              <div className="api-table-wrapper">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th style={{ width: '18%' }}>{t.compShared.prop}</th>
                      <th style={{ width: '28%' }}>{t.compShared.type}</th>
                      <th style={{ width: '14%' }}>{t.compShared.default}</th>
                      <th style={{ width: '40%' }}>{t.compShared.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <code>id</code>
                          <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '9999px', background: 'var(--color-primary-light, #fdf4ed)', color: 'var(--color-primary, #b25e40)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            {t.compShared.required || 'Required'}
                          </span>
                        </div>
                      </td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">-</code></td>
                      <td>{isId ? 'Pengidentifikasi unik untuk item tab (wajib dan unik antar tab).' : 'Unique identifier for the tab item. Required.'}</td>
                    </tr>
                    <tr>
                      <td>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <code>label</code>
                          <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '9999px', background: 'var(--color-primary-light, #fdf4ed)', color: 'var(--color-primary, #b25e40)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            {t.compShared.required || 'Required'}
                          </span>
                        </div>
                      </td>
                      <td><code className="api-type-code">ReactNode</code></td>
                      <td><code className="api-default-code">-</code></td>
                      <td>{isId ? 'Teks judul atau elemen kustom untuk label tab.' : 'Display text or customized markup for the tab label. Required.'}</td>
                    </tr>
                    <tr>
                      <td><code>icon</code></td>
                      <td><code className="api-type-code">ReactNode</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Elemen ikon pembuka yang dirender di sebelah kiri label tab.' : 'Optional leading icon glyph.'}</td>
                    </tr>
                    <tr>
                      <td><code>trailingIcon</code></td>
                      <td><code className="api-type-code">ReactNode</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Elemen ikon penutup yang dirender di sebelah kanan label tab.' : 'Optional trailing icon glyph.'}</td>
                    </tr>
                    <tr>
                      <td><code>badge</code></td>
                      <td><code className="api-type-code">ReactNode</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Elemen badge penghitung angka, pil status, atau dot notifikasi.' : 'Optional notification counter badge, pill, or status chip.'}</td>
                    </tr>
                    <tr>
                      <td><code>disabled</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">false</code></td>
                      <td>{isId ? 'Menonaktifkan interaksi klik dan melepaskan tab dari siklus fokus keyboard.' : 'Disables interaction and removes tab from active keyboard cycle.'}</td>
                    </tr>
                    <tr>
                      <td><code>closable</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">false</code></td>
                      <td>{isId ? 'Mengontrol izin penutupan tab secara spesifik untuk item tab ini saja.' : 'Overrides global closable property for this specific tab.'}</td>
                    </tr>
                    <tr>
                      <td><code>content</code></td>
                      <td><code className="api-type-code">ReactNode</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Konten panel yang dirender ketika tab ini berada dalam status aktif.' : 'Associated panel content rendered when this tab is selected.'}</td>
                    </tr>
                    <tr>
                      <td><code>href</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Tautan URL opsional jika tab difungsikan sebagai link navigasi.' : 'Optional link href if tab acts as an anchor navigation link.'}</td>
                    </tr>
                    <tr>
                      <td><code>ariaLabel</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Deskripsi label aksesibilitas untuk pembaca layar (screen reader).' : 'Accessible ARIA label description for assistive technologies.'}</td>
                    </tr>
                    <tr>
                      <td><code>className</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">''</code></td>
                      <td>{isId ? 'Kelas CSS kustom tambahan khusus untuk tombol tab ini.' : 'Custom CSS class applied specifically to this tab.'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 3: NeuronTabPanel Props */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <FileText size={18} style={{ color: 'var(--color-primary)' }} />
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, margin: 0, color: 'var(--color-text-primary)' }}>
                    NeuronTabPanel Props
                  </h3>
                </div>
                <span style={{ 
                  fontSize: 'var(--fs-text-xs)', 
                  padding: '2px 8px', 
                  borderRadius: 'var(--radius-full, 9999px)', 
                  background: 'var(--color-bg-subtle)', 
                  border: '1px solid var(--color-border)', 
                  color: 'var(--color-text-secondary)', 
                  fontWeight: 500 
                }}>
                  {isId ? '4 Properti Subkomponen' : '4 Subcomponent Props'}
                </span>
              </div>

              <div className="api-table-wrapper">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th style={{ width: '18%' }}>{t.compShared.prop}</th>
                      <th style={{ width: '28%' }}>{t.compShared.type}</th>
                      <th style={{ width: '14%' }}>{t.compShared.default}</th>
                      <th style={{ width: '40%' }}>{t.compShared.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <code>id</code>
                          <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '9999px', background: 'var(--color-primary-light, #fdf4ed)', color: 'var(--color-primary, #b25e40)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            {t.compShared.required || 'Required'}
                          </span>
                        </div>
                      </td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">-</code></td>
                      <td>{isId ? 'ID panel yang harus sesuai dengan ID pada TabItem yang terhubung.' : 'Panel identifier matching the corresponding TabItem.id.'}</td>
                    </tr>
                    <tr>
                      <td><code>active</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">false</code></td>
                      <td>{isId ? 'Menentukan apakah panel ini sedang aktif dan ditampilkan.' : 'Whether panel is currently visible and active.'}</td>
                    </tr>
                    <tr>
                      <td><code>className</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">''</code></td>
                      <td>{isId ? 'Kelas CSS kustom tambahan pada elemen panel.' : 'Custom CSS class applied to the panel container element.'}</td>
                    </tr>
                    <tr>
                      <td><code>children</code></td>
                      <td><code className="api-type-code">ReactNode</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>{isId ? 'Konten ReactNode yang dirender di dalam panel tab.' : 'Child elements rendered inside the tab panel.'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Next / Previous Navigation Footer ── */}
      <NextPrevious
        prev={{ id: 'comp-stepper', label: t.nav.compStepper || 'Stepper' }}
        next={{ id: 'comp-textarea', label: t.nav.compTextArea || 'Text Area' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
