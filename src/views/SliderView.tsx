import React, { useState, useMemo } from 'react';
import { NeuronCheckbox } from '../components/NeuronCheckbox';
import NeuronSlider, {
  NeuronSliderSize,
  NeuronSliderVariant,
  SliderTooltipPlacement,
  SliderTooltipVisible
} from '../components/NeuronSlider';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import {
  Volume2,
  VolumeX,
  Cpu,
  HardDrive,
  RotateCcw,
  ShoppingBag,
  Copy,
  Check,
  Server,
  Filter,
  Zap,
  Music
} from 'lucide-react';

interface SliderViewProps {
  setActiveTab: (tabId: string) => void;
}

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
        <span>{isDo ? 'DO' : "DON'T"}</span>
      </div>
      {children}
    </div>
  );
}

function AnatomyLabel({
  number,
  label,
  desc,
  isActive = false,
  onMouseEnter,
  onMouseLeave,
}: {
  number: number;
  label: string;
  desc: string;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      className="anatomy-label"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        padding: '16px',
        background: isActive ? 'var(--color-bg-surface)' : 'var(--color-bg-subtle)',
        border: isActive ? '1px solid var(--brand-500)' : '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: isActive ? '0 0 0 3px rgba(195, 87, 28, 0.12)' : 'none',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
      }}
    >
      <span
        className="anatomy-number"
        style={{
          background: isActive ? 'var(--brand-700, #9a3412)' : 'var(--brand-600, #c3571c)',
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isActive ? '0 0 0 3px rgba(195, 87, 28, 0.2)' : 'none',
          transition: 'all 0.15s ease',
        }}
      >
        {number}
      </span>
      <div>
        <div
          className="anatomy-label-name"
          style={{
            color: isActive ? 'var(--brand-600)' : 'var(--color-text-primary)',
            transition: 'color 0.15s ease',
          }}
        >
          {label}
        </div>
        <div className="anatomy-label-desc">{desc}</div>
      </div>
    </div>
  );
}

// Sample product catalog for Pattern 01 E-commerce filter
interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  tag?: string;
}

const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Neuron Ergonomic Studio Chair',
    category: 'Furniture',
    price: 349,
    rating: 4.9,
    image: '🪑',
    tag: 'Best Seller'
  },
  {
    id: 'p2',
    name: 'Tactile Mechanical Keyboard Pro',
    category: 'Peripherals',
    price: 189,
    rating: 4.8,
    image: '⌨️',
    tag: 'New'
  },
  {
    id: 'p3',
    name: 'Hi-Fi Studio Reference Headphones',
    category: 'Audio',
    price: 279,
    rating: 4.9,
    image: '🎧',
  },
  {
    id: 'p4',
    name: 'Ultra-Wide 4K Curved Display 34"',
    category: 'Monitors',
    price: 649,
    rating: 4.7,
    image: '🖥️',
    tag: 'Featured'
  },
  {
    id: 'p5',
    name: 'Precision Wireless Charging Mouse',
    category: 'Peripherals',
    price: 89,
    rating: 4.6,
    image: '🖱️',
  },
  {
    id: 'p6',
    name: 'Smart Ambient Desk Lightbar',
    category: 'Lighting',
    price: 129,
    rating: 4.8,
    image: '💡',
  }
];

export default function SliderView({ setActiveTab }: SliderViewProps) {
  const { language, t } = useLanguage();
  const isId = language === 'id';
  const [activeViewTab, setActiveViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // ── Playground States ──
  const [pgRange, setPgRange] = useState(false);
  const [pgSingleVal, setPgSingleVal] = useState(45);
  const [pgRangeVal, setPgRangeVal] = useState<[number, number]>([25, 75]);
  const [pgVariant, setPgVariant] = useState<NeuronSliderVariant>('brand');
  const [pgSize, setPgSize] = useState<NeuronSliderSize>('md');
  const [pgShowTooltip, setPgShowTooltip] = useState(true);
  const [pgTooltipPlacement, setPgTooltipPlacement] = useState<SliderTooltipPlacement>('top');
  const [pgTooltipVisible, setPgTooltipVisible] = useState<SliderTooltipVisible>('hover');
  const [pgShowLabels, setPgShowLabels] = useState(false);
  const [pgMarks, setPgMarks] = useState(false);
  const [pgDisabled, setPgDisabled] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [specMode, setSpecMode] = useState<'range' | 'single'>('range');
  const [activeAnatomyPin, setActiveAnatomyPin] = useState<number | null>(null);

  // ── Pattern 01: E-Commerce Filter States ──
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchCat && matchPrice;
    });
  }, [priceRange, selectedCategory]);

  // ── Pattern 02: Audio Mixing Console States ──
  const [audioVolume, setAudioVolume] = useState(65);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [bassLevel, setBassLevel] = useState(4);
  const [trebleLevel, setTrebleLevel] = useState(2);

  // ── Pattern 03: Cloud Calculator States ──
  const [cpuCores, setCpuCores] = useState(8);
  const [ramGigabytes, setRamGigabytes] = useState(32);
  const [storageGb, setStorageGb] = useState(500);

  const monthlyServerCost = useMemo(() => {
    const cpuCost = cpuCores * 4.5;
    const ramCost = ramGigabytes * 2.2;
    const storageCost = storageGb * 0.08;
    return Math.round(cpuCost + ramCost + storageCost);
  }, [cpuCores, ramGigabytes, storageGb]);

  // ── Pattern 04: Loan EMI Calculator States ──
  const [loanAmount, setLoanAmount] = useState(150000);
  const [loanTenureYears, setLoanTenureYears] = useState(15);
  const [interestRate, setInterestRate] = useState(6.5);

  const { monthlyEmi, totalPayment, totalInterest } = useMemo(() => {
    const p = loanAmount;
    const r = (interestRate / 12) / 100;
    const n = loanTenureYears * 12;
    if (r === 0) {
      return { monthlyEmi: Math.round(p / n), totalPayment: p, totalInterest: 0 };
    }
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return {
      monthlyEmi: Math.round(emi),
      totalPayment: Math.round(total),
      totalInterest: Math.round(total - p)
    };
  }, [loanAmount, loanTenureYears, interestRate]);

  // Generate Playground Code Snippet
  const generatedCode = useMemo(() => {
    const props: string[] = [];
    if (pgRange) {
      props.push('range');
      props.push(`value={[${pgRangeVal[0]}, ${pgRangeVal[1]}]}`);
      props.push('onChange={setRangeValue}');
    } else {
      props.push(`value={${pgSingleVal}}`);
      props.push('onChange={setValue}');
    }
    if (pgVariant !== 'brand') props.push(`variant="${pgVariant}"`);
    if (pgSize !== 'md') props.push(`size="${pgSize}"`);
    if (pgShowTooltip) {
      props.push('showTooltip');
      if (pgTooltipPlacement !== 'top') props.push(`tooltipPlacement="${pgTooltipPlacement}"`);
      if (pgTooltipVisible !== 'hover') props.push(`tooltipVisible="${pgTooltipVisible}"`);
    }
    if (pgShowLabels) props.push('showLabels');
    if (pgMarks) props.push('marks');
    if (pgDisabled) props.push('disabled');

    return `<NeuronSlider\n  ${props.join('\n  ')}\n/>`;
  }, [
    pgRange,
    pgSingleVal,
    pgRangeVal,
    pgVariant,
    pgSize,
    pgShowTooltip,
    pgTooltipPlacement,
    pgTooltipVisible,
    pgShowLabels,
    pgMarks,
    pgDisabled
  ]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderPlayground = () => (
    <div className="section-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0' }}>
            {isId ? 'Playground Interaktif' : 'Interactive Playground'}
          </h2>
        </div>
        <NeuronBadge size="sm" variant="brand">Live Component</NeuronBadge>
      </div>
      <p className="section-description">
        {isId
          ? 'Eksplorasi konfigurasi slider secara langsung: mode tunggal vs rentang, ukuran, varian warna, posisi tooltip, dan label nilai.'
          : 'Interactively experiment with slider configurations: single vs range modes, sizing tokens, semantic colors, tooltip positions, and value labels.'}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1fr) 320px',
        gap: '24px',
        marginTop: '20px',
        alignItems: 'start'
      }}>
        {/* Live Preview Canvas */}
        <div style={{
          background: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '260px'
        }}>
          <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto' }}>
            <NeuronSlider
              range={pgRange}
              value={pgRange ? pgRangeVal : pgSingleVal}
              onChange={(val) => {
                if (pgRange) setPgRangeVal(val);
                else setPgSingleVal(val);
              }}
              variant={pgVariant}
              size={pgSize}
              showTooltip={pgShowTooltip}
              tooltipPlacement={pgTooltipPlacement}
              tooltipVisible={pgTooltipVisible}
              showLabels={pgShowLabels}
              marks={pgMarks}
              disabled={pgDisabled}
              label={isId ? 'Volume Suara & Ambien' : 'Audio & Ambient Gain'}
              showValueInHeader
            />
          </div>

          {/* Live Value Indicator Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '32px'
          }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Nilai Aktif:' : 'Current Value:'}
            </span>
            <NeuronBadge size="sm" variant={pgVariant}>
              {pgRange ? `${pgRangeVal[0]}% – ${pgRangeVal[1]}%` : `${pgSingleVal}%`}
            </NeuronBadge>
          </div>
        </div>

        {/* Controls Panel */}
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {isId ? 'Pengaturan Slider' : 'Slider Controls'}
          </h4>

          {/* Range Mode Switch */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
              {isId ? 'Mode Slider' : 'Slider Mode'}
            </label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                onClick={() => setPgRange(false)}
                style={{
                  flex: 1,
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  background: !pgRange ? 'var(--brand-600)' : 'transparent',
                  color: !pgRange ? '#fff' : 'var(--color-text-primary)',
                  cursor: 'pointer'
                }}
              >
                Single (1 Thumb)
              </button>
              <button
                type="button"
                onClick={() => setPgRange(true)}
                style={{
                  flex: 1,
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  background: pgRange ? 'var(--brand-600)' : 'transparent',
                  color: pgRange ? '#fff' : 'var(--color-text-primary)',
                  cursor: 'pointer'
                }}
              >
                Range (2 Thumbs)
              </button>
            </div>
          </div>

          {/* Sizing Select */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
              {isId ? 'Ukuran (Size)' : 'Size'}
            </label>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['sm', 'md', 'lg'] as NeuronSliderSize[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPgSize(s)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    background: pgSize === s ? 'var(--color-bg-subtle)' : 'transparent',
                    color: pgSize === s ? 'var(--brand-600)' : 'var(--color-text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Color Variant Select */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
              {isId ? 'Varian Warna' : 'Variant'}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {(['brand', 'neutral', 'success', 'warning', 'error'] as NeuronSliderVariant[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setPgVariant(v)}
                  style={{
                    padding: '6px 8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    background: pgVariant === v ? 'var(--color-bg-subtle)' : 'transparent',
                    color: pgVariant === v ? 'var(--brand-600)' : 'var(--color-text-primary)',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Tooltip & Labels Options */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 12 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: 8 }}>
              {isId ? 'Tooltip & Label Nilai' : 'Tooltip & Labels'}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <NeuronCheckbox
                size="sm"
                checked={pgShowTooltip}
                onChange={(checked) => setPgShowTooltip(checked)}
                label={isId ? 'Tampilkan Tooltip Bubble' : 'Show Tooltip Bubble'}
              />

              {pgShowTooltip && (
                <>
                  <div style={{ display: 'flex', gap: 6, paddingLeft: 24 }}>
                    <button
                      type="button"
                      onClick={() => setPgTooltipPlacement('top')}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        background: pgTooltipPlacement === 'top' ? 'var(--brand-50)' : 'transparent',
                        color: pgTooltipPlacement === 'top' ? 'var(--brand-700)' : 'var(--color-text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      Top Arrow
                    </button>
                    <button
                      type="button"
                      onClick={() => setPgTooltipPlacement('bottom')}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        background: pgTooltipPlacement === 'bottom' ? 'var(--brand-50)' : 'transparent',
                        color: pgTooltipPlacement === 'bottom' ? 'var(--brand-700)' : 'var(--color-text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      Bottom Arrow
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: 6, paddingLeft: 24 }}>
                    <button
                      type="button"
                      onClick={() => setPgTooltipVisible('hover')}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        background: pgTooltipVisible === 'hover' ? 'var(--color-bg-subtle)' : 'transparent',
                        color: pgTooltipVisible === 'hover' ? 'var(--brand-600)' : 'var(--color-text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      Show on Hover
                    </button>
                    <button
                      type="button"
                      onClick={() => setPgTooltipVisible('always')}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        background: pgTooltipVisible === 'always' ? 'var(--color-bg-subtle)' : 'transparent',
                        color: pgTooltipVisible === 'always' ? 'var(--brand-600)' : 'var(--color-text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      Always Show
                    </button>
                  </div>
                </>
              )}

              <NeuronCheckbox
                size="sm"
                checked={pgShowLabels}
                onChange={(checked) => setPgShowLabels(checked)}
                label={isId ? 'Label Nilai di Bawah Thumb' : 'Labels Below Thumbs'}
              />

              <NeuronCheckbox
                size="sm"
                checked={pgMarks as boolean}
                onChange={(checked) => setPgMarks(checked)}
                label={isId ? 'Tampilkan Titik Diskrit (Ticks)' : 'Show Step Ticks (Marks)'}
              />

              <NeuronCheckbox
                size="sm"
                checked={pgDisabled}
                onChange={(checked) => setPgDisabled(checked)}
                label={isId ? 'Nonaktifkan (Disabled)' : 'Disabled State'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div style={{
        marginTop: '20px',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-muted, #101828)',
        padding: '16px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#98a2b3', textTransform: 'uppercase' }}>
            JSX Code Preview
          </span>
          <NeuronButton
            size="xs"
            variant="secondary"
            onClick={handleCopyCode}
          >
            {copiedCode ? <Check size={12} style={{ marginRight: 4 }} /> : <Copy size={12} style={{ marginRight: 4 }} />}
            {copiedCode ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin Kode' : 'Copy JSX')}
          </NeuronButton>
        </div>
        <pre style={{
          margin: 0,
          color: '#e4e7ec',
          fontSize: '13px',
          fontFamily: 'var(--font-mono, monospace)',
          lineHeight: 1.5,
          overflowX: 'auto'
        }}>
          {generatedCode}
        </pre>
      </div>
    </div>
  );

  return (
    <div className="view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">
              {isId ? 'Komponen' : 'Components'}
            </span>
            <h1 className="page-title">Slider</h1>
            <p className="page-subtitle">
              {isId
                ? 'Kontrol rentang kontinu dan diskrit untuk memilih nilai tunggal atau rentang numerik dengan satu atau dua thumb, dilengkapi tooltip dan visualizer.'
                : 'Continuous and discrete range controls enabling users to select single numerical values or bounded ranges via single or dual draggable thumbs with tooltips.'}
            </p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeViewTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('guideline')}
          >
            Guideline
          </button>
          <button
            type="button"
            className={`comp-tab ${activeViewTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('playbook')}
          >
            Playbook
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TAB 1 – GUIDELINE
      ══════════════════════════════════════ */}
      {activeViewTab === 'guideline' && (
        <div className="tab-content">
          {/* ── 1. VISUAL SPECIFICATION (Exact match to User Reference Image) ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Spesifikasi Visual' : 'Visual Specification'}
                </h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  {isId
                    ? 'Matriks referensi spesifikasi 4 kolom: Clean (tanpa label), Bottom Labels, Tooltip Above (atas), dan Tooltip Below (bawah).'
                    : 'Complete 4-column specification matrix: Clean (no labels), Bottom Labels, Tooltip Above (top), and Tooltip Below (bottom).'}
                </p>
              </div>

              {/* Segmented Mode Switcher */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                gap: '2px'
              }}>
                <button
                  type="button"
                  onClick={() => setSpecMode('range')}
                  style={{
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: specMode === 'range' ? 'var(--color-bg-surface)' : 'transparent',
                    color: specMode === 'range' ? 'var(--brand-600)' : 'var(--color-text-secondary)',
                    boxShadow: specMode === 'range' ? 'var(--shadow-xs)' : 'none'
                  }}
                >
                  {isId ? 'Rentang (Dual-Thumb – 10 Kombinasi)' : 'Dual-Thumb Range (10 Permutations)'}
                </button>
                <button
                  type="button"
                  onClick={() => setSpecMode('single')}
                  style={{
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: specMode === 'single' ? 'var(--color-bg-surface)' : 'transparent',
                    color: specMode === 'single' ? 'var(--brand-600)' : 'var(--color-text-secondary)',
                    boxShadow: specMode === 'single' ? 'var(--shadow-xs)' : 'none'
                  }}
                >
                  {isId ? 'Nilai Tunggal (Single-Thumb)' : 'Single-Thumb (4 Values)'}
                </button>
              </div>
            </div>

            {/* Spec Matrix Frame */}
            <div style={{
              margin: '20px 0',
              padding: '28px 24px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--color-bg-surface)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              overflowX: 'auto'
            }}>
              {/* Header Columns Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(210px, 1fr))',
                gap: '28px',
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '10px 16px',
                border: '1px solid var(--color-border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--brand-100, #ffedd5)',
                    color: 'var(--brand-700, #9a3412)',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>1</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Clean (No Labels)
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--brand-100, #ffedd5)',
                    color: 'var(--brand-700, #9a3412)',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>2</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Bottom Labels
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--brand-100, #ffedd5)',
                    color: 'var(--brand-700, #9a3412)',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>3</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Tooltip Above (Top)
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--brand-100, #ffedd5)',
                    color: 'var(--brand-700, #9a3412)',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>4</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Tooltip Below (Bottom)
                  </span>
                </div>
              </div>

              {/* Rows Rendering */}
              {specMode === 'range' ? (
                // 10 Dual-Thumb Range Rows divided into 4 visual anchor groups matching the reference image!
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {[
                    {
                      groupTitle: isId ? 'Grup 1: Rentang Awal 0%' : 'Group 1: 0% Base Anchor',
                      rows: [
                        { val: [0, 25] as [number, number] },
                        { val: [0, 50] as [number, number] },
                        { val: [0, 75] as [number, number] },
                        { val: [0, 100] as [number, number] },
                      ]
                    },
                    {
                      groupTitle: isId ? 'Grup 2: Rentang Awal 25%' : 'Group 2: 25% Base Anchor',
                      rows: [
                        { val: [25, 50] as [number, number] },
                        { val: [25, 75] as [number, number] },
                        { val: [25, 100] as [number, number] },
                      ]
                    },
                    {
                      groupTitle: isId ? 'Grup 3: Rentang Awal 50%' : 'Group 3: 50% Base Anchor',
                      rows: [
                        { val: [50, 75] as [number, number] },
                        { val: [50, 100] as [number, number] },
                      ]
                    },
                    {
                      groupTitle: isId ? 'Grup 4: Rentang Awal 75%' : 'Group 4: 75% Base Anchor',
                      rows: [
                        { val: [75, 100] as [number, number] },
                      ]
                    },
                  ].map((grp, gIdx) => (
                    <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                      {/* Subtle Group Divider */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        paddingTop: gIdx > 0 ? '16px' : '0',
                        borderTop: gIdx > 0 ? '1px dashed var(--color-border)' : 'none'
                      }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--color-text-secondary)',
                          background: 'var(--color-bg-subtle)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)'
                        }}>
                          {grp.groupTitle}
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--color-border)', opacity: 0.6 }} />
                      </div>

                      {/* Sliders in this group */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                        {grp.rows.map((row, rIdx) => (
                          <div
                            key={rIdx}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(4, minmax(210px, 1fr))',
                              gap: '28px',
                              alignItems: 'center',
                              minHeight: '62px'
                            }}
                          >
                            {/* Col 1: Clean */}
                            <div>
                              <NeuronSlider
                                range
                                defaultValue={row.val}
                                showTooltip={false}
                                showLabels={false}
                              />
                            </div>

                            {/* Col 2: Bottom Labels */}
                            <div>
                              <NeuronSlider
                                range
                                defaultValue={row.val}
                                showTooltip={false}
                                showLabels={true}
                              />
                            </div>

                            {/* Col 3: Tooltip Top */}
                            <div>
                              <NeuronSlider
                                range
                                defaultValue={row.val}
                                showTooltip={true}
                                tooltipPlacement="top"
                                tooltipVisible="always"
                                showLabels={false}
                              />
                            </div>

                            {/* Col 4: Tooltip Bottom */}
                            <div>
                              <NeuronSlider
                                range
                                defaultValue={row.val}
                                showTooltip={true}
                                tooltipPlacement="bottom"
                                tooltipVisible="always"
                                showLabels={false}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Single-Thumb 4 Values
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {[25, 50, 75, 100].map((val, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, minmax(210px, 1fr))',
                        gap: '28px',
                        alignItems: 'center',
                        minHeight: '62px'
                      }}
                    >
                      {/* Col 1: Clean */}
                      <div>
                        <NeuronSlider
                          range={false}
                          defaultValue={val}
                          showTooltip={false}
                          showLabels={false}
                        />
                      </div>

                      {/* Col 2: Bottom Labels */}
                      <div>
                        <NeuronSlider
                          range={false}
                          defaultValue={val}
                          showTooltip={false}
                          showLabels={true}
                        />
                      </div>

                      {/* Col 3: Tooltip Top */}
                      <div>
                        <NeuronSlider
                          range={false}
                          defaultValue={val}
                          showTooltip={true}
                          tooltipPlacement="top"
                          tooltipVisible="always"
                          showLabels={false}
                        />
                      </div>

                      {/* Col 4: Tooltip Bottom */}
                      <div>
                        <NeuronSlider
                          range={false}
                          defaultValue={val}
                          showTooltip={true}
                          tooltipPlacement="bottom"
                          tooltipVisible="always"
                          showLabels={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── 2. Component Anatomy ── */}
          <div className="section-card">
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>
              {isId ? 'Anatomi Komponen' : 'Component Anatomy'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Struktur visual elemen NeuronSlider yang dirancang presisi untuk interaksi mouse, touch, dan keyboard. Arahkan kursor pada diagram atau kartu untuk melihat rincian tiap elemen.'
                : 'The visual building blocks of the NeuronSlider component engineered for mouse, touch, and keyboard interactions. Hover over pins or cards to highlight corresponding elements.'}
            </p>

            {/* Precision Blueprint Diagram Container */}
            <div style={{
              position: 'relative',
              background: 'var(--color-bg-surface)',
              border: '1px dashed var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px 16px',
              margin: '24px 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <svg
                viewBox="0 0 720 250"
                style={{ width: '100%', maxWidth: '720px', height: 'auto', overflow: 'visible' }}
              >
                <defs>
                  <filter id="thumbShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.18" />
                  </filter>
                  <filter id="tooltipShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.12" />
                  </filter>
                </defs>

                {/* ── Component Representation (Centered at Y = 125) ── */}
                {/* 1. Base Inactive Rail (460px length, 8px height) */}
                <rect
                  x="130"
                  y="121"
                  width="460"
                  height="8"
                  rx="4"
                  fill="var(--slate-200, #e4e7ec)"
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* 2. Active Range Fill (from 25% = 245 to 75% = 475) */}
                <rect
                  x="245"
                  y="121"
                  width="230"
                  height="8"
                  rx="4"
                  fill="var(--brand-600, #c3571c)"
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* 6. Step Marks / Ticks along Rail */}
                <circle cx="130" cy="125" r="2.5" fill="var(--slate-400, #94a3b8)" />
                <circle cx="360" cy="125" r="3" fill="#ffffff" />
                <circle cx="590" cy="125" r="2.5" fill="var(--slate-400, #94a3b8)" />

                {/* 3. Thumbs */}
                {/* Thumb 1 (Left, 25% at x = 245) */}
                <circle
                  cx="245"
                  cy="125"
                  r="13"
                  fill="#ffffff"
                  stroke="var(--brand-600, #c3571c)"
                  strokeWidth="2.5"
                  filter="url(#thumbShadow)"
                />

                {/* Thumb 2 (Right, 75% at x = 475) */}
                <circle
                  cx="475"
                  cy="125"
                  r="13"
                  fill="#ffffff"
                  stroke="var(--brand-600, #c3571c)"
                  strokeWidth="2.5"
                  filter="url(#thumbShadow)"
                  style={{
                    transform: activeAnatomyPin === 3 ? 'scale(1.12)' : 'scale(1)',
                    transformOrigin: '475px 125px',
                    transition: 'transform 0.15s ease'
                  }}
                />

                {/* 4. Speech Tooltip for Thumb 1 (at x = 245, above thumb) */}
                <g filter="url(#tooltipShadow)">
                  <rect
                    x="223"
                    y="58"
                    width="44"
                    height="24"
                    rx="5"
                    fill="var(--color-bg-surface, #ffffff)"
                    stroke="var(--color-border, #e4e7ec)"
                    strokeWidth="1"
                  />
                  {/* Tooltip Downward Arrow */}
                  <polygon
                    points="241,82 249,82 245,87"
                    fill="var(--color-bg-surface, #ffffff)"
                    stroke="var(--color-border, #e4e7ec)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="241.5,81.5 248.5,81.5 245,86"
                    fill="var(--color-bg-surface, #ffffff)"
                  />
                  <text
                    x="245"
                    y="74"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--color-text-primary, #182230)"
                    style={{ fontFeatureSettings: "'tnum'", fontVariantNumeric: 'tabular-nums' }}
                  >
                    25%
                  </text>
                </g>

                {/* 5. Bottom Value Label for Thumb 2 (at x = 475, below thumb) */}
                <text
                  x="475"
                  y="162"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--color-text-secondary, #667085)"
                  style={{ fontFeatureSettings: "'tnum'", fontVariantNumeric: 'tabular-nums' }}
                >
                  75%
                </text>

                {/* ── Precision Leader Lines ── */}
                {/* Line 1: Pin 1 -> Inactive Rail (x = 175) */}
                <path
                  d="M 62 58 L 155 98 L 175 121"
                  fill="none"
                  stroke={activeAnatomyPin === 1 ? 'var(--brand-600, #c3571c)' : 'var(--color-border, #cbd5e1)'}
                  strokeWidth={activeAnatomyPin === 1 ? 2.5 : 1.5}
                  strokeDasharray={activeAnatomyPin === 1 ? 'none' : '3 3'}
                  style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
                />
                <circle
                  cx="175"
                  cy="121"
                  r={activeAnatomyPin === 1 ? 4.5 : 3}
                  fill={activeAnatomyPin === 1 ? 'var(--brand-600, #c3571c)' : 'var(--slate-500, #64748b)'}
                  style={{ transition: 'all 0.15s' }}
                />

                {/* Line 2: Pin 2 -> Active Fill (x = 360) */}
                <path
                  d="M 360 48 L 360 120"
                  fill="none"
                  stroke={activeAnatomyPin === 2 ? 'var(--brand-600, #c3571c)' : 'var(--color-border, #cbd5e1)'}
                  strokeWidth={activeAnatomyPin === 2 ? 2.5 : 1.5}
                  strokeDasharray={activeAnatomyPin === 2 ? 'none' : '3 3'}
                  style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
                />
                <circle
                  cx="360"
                  cy="120"
                  r={activeAnatomyPin === 2 ? 4.5 : 3}
                  fill={activeAnatomyPin === 2 ? 'var(--brand-600, #c3571c)' : 'var(--slate-500, #64748b)'}
                  style={{ transition: 'all 0.15s' }}
                />

                {/* Line 3: Pin 3 -> Thumb Handle (x = 475) */}
                <path
                  d="M 648 58 L 540 98 L 485 116"
                  fill="none"
                  stroke={activeAnatomyPin === 3 ? 'var(--brand-600, #c3571c)' : 'var(--color-border, #cbd5e1)'}
                  strokeWidth={activeAnatomyPin === 3 ? 2.5 : 1.5}
                  strokeDasharray={activeAnatomyPin === 3 ? 'none' : '3 3'}
                  style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
                />
                <circle
                  cx="485"
                  cy="116"
                  r={activeAnatomyPin === 3 ? 4.5 : 3}
                  fill={activeAnatomyPin === 3 ? 'var(--brand-600, #c3571c)' : 'var(--slate-500, #64748b)'}
                  style={{ transition: 'all 0.15s' }}
                />

                {/* Line 4: Pin 4 -> Tooltip Bubble (x = 223) */}
                <path
                  d="M 152 70 L 221 70"
                  fill="none"
                  stroke={activeAnatomyPin === 4 ? 'var(--brand-600, #c3571c)' : 'var(--color-border, #cbd5e1)'}
                  strokeWidth={activeAnatomyPin === 4 ? 2.5 : 1.5}
                  strokeDasharray={activeAnatomyPin === 4 ? 'none' : '3 3'}
                  style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
                />
                <circle
                  cx="221"
                  cy="70"
                  r={activeAnatomyPin === 4 ? 4.5 : 3}
                  fill={activeAnatomyPin === 4 ? 'var(--brand-600, #c3571c)' : 'var(--slate-500, #64748b)'}
                  style={{ transition: 'all 0.15s' }}
                />

                {/* Line 5: Pin 5 -> Bottom Label (x = 475, y = 162) */}
                <path
                  d="M 648 175 L 505 162"
                  fill="none"
                  stroke={activeAnatomyPin === 5 ? 'var(--brand-600, #c3571c)' : 'var(--color-border, #cbd5e1)'}
                  strokeWidth={activeAnatomyPin === 5 ? 2.5 : 1.5}
                  strokeDasharray={activeAnatomyPin === 5 ? 'none' : '3 3'}
                  style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
                />
                <circle
                  cx="505"
                  cy="162"
                  r={activeAnatomyPin === 5 ? 4.5 : 3}
                  fill={activeAnatomyPin === 5 ? 'var(--brand-600, #c3571c)' : 'var(--slate-500, #64748b)'}
                  style={{ transition: 'all 0.15s' }}
                />

                {/* Line 6: Pin 6 -> Step Marks (x = 360, y = 125) */}
                <path
                  d="M 360 200 L 360 132"
                  fill="none"
                  stroke={activeAnatomyPin === 6 ? 'var(--brand-600, #c3571c)' : 'var(--color-border, #cbd5e1)'}
                  strokeWidth={activeAnatomyPin === 6 ? 2.5 : 1.5}
                  strokeDasharray={activeAnatomyPin === 6 ? 'none' : '3 3'}
                  style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
                />
                <circle
                  cx="360"
                  cy="132"
                  r={activeAnatomyPin === 6 ? 4.5 : 3}
                  fill={activeAnatomyPin === 6 ? 'var(--brand-600, #c3571c)' : 'var(--slate-500, #64748b)'}
                  style={{ transition: 'all 0.15s' }}
                />

                {/* ── Interactive Callout Pin Markers ── */}
                {/* Pin 1: Top-Left */}
                <g
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveAnatomyPin(1)}
                  onMouseLeave={() => setActiveAnatomyPin(null)}
                >
                  {activeAnatomyPin === 1 && (
                    <circle cx="50" cy="50" r="16" fill="none" stroke="var(--brand-200, #fed7aa)" strokeWidth="3" />
                  )}
                  <circle cx="50" cy="50" r="12" fill={activeAnatomyPin === 1 ? 'var(--brand-700, #9a3412)' : 'var(--brand-600, #c3571c)'} />
                  <text x="50" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">1</text>
                </g>

                {/* Pin 2: Top-Center */}
                <g
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveAnatomyPin(2)}
                  onMouseLeave={() => setActiveAnatomyPin(null)}
                >
                  {activeAnatomyPin === 2 && (
                    <circle cx="360" cy="35" r="16" fill="none" stroke="var(--brand-200, #fed7aa)" strokeWidth="3" />
                  )}
                  <circle cx="360" cy="35" r="12" fill={activeAnatomyPin === 2 ? 'var(--brand-700, #9a3412)' : 'var(--brand-600, #c3571c)'} />
                  <text x="360" y="39" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">2</text>
                </g>

                {/* Pin 3: Top-Right */}
                <g
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveAnatomyPin(3)}
                  onMouseLeave={() => setActiveAnatomyPin(null)}
                >
                  {activeAnatomyPin === 3 && (
                    <circle cx="660" cy="50" r="16" fill="none" stroke="var(--brand-200, #fed7aa)" strokeWidth="3" />
                  )}
                  <circle cx="660" cy="50" r="12" fill={activeAnatomyPin === 3 ? 'var(--brand-700, #9a3412)' : 'var(--brand-600, #c3571c)'} />
                  <text x="660" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">3</text>
                </g>

                {/* Pin 4: Middle-Left */}
                <g
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveAnatomyPin(4)}
                  onMouseLeave={() => setActiveAnatomyPin(null)}
                >
                  {activeAnatomyPin === 4 && (
                    <circle cx="140" cy="70" r="16" fill="none" stroke="var(--brand-200, #fed7aa)" strokeWidth="3" />
                  )}
                  <circle cx="140" cy="70" r="12" fill={activeAnatomyPin === 4 ? 'var(--brand-700, #9a3412)' : 'var(--brand-600, #c3571c)'} />
                  <text x="140" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">4</text>
                </g>

                {/* Pin 5: Bottom-Right */}
                <g
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveAnatomyPin(5)}
                  onMouseLeave={() => setActiveAnatomyPin(null)}
                >
                  {activeAnatomyPin === 5 && (
                    <circle cx="660" cy="180" r="16" fill="none" stroke="var(--brand-200, #fed7aa)" strokeWidth="3" />
                  )}
                  <circle cx="660" cy="180" r="12" fill={activeAnatomyPin === 5 ? 'var(--brand-700, #9a3412)' : 'var(--brand-600, #c3571c)'} />
                  <text x="660" y="184" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">5</text>
                </g>

                {/* Pin 6: Bottom-Center */}
                <g
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveAnatomyPin(6)}
                  onMouseLeave={() => setActiveAnatomyPin(null)}
                >
                  {activeAnatomyPin === 6 && (
                    <circle cx="360" cy="215" r="16" fill="none" stroke="var(--brand-200, #fed7aa)" strokeWidth="3" />
                  )}
                  <circle cx="360" cy="215" r="12" fill={activeAnatomyPin === 6 ? 'var(--brand-700, #9a3412)' : 'var(--brand-600, #c3571c)'} />
                  <text x="360" y="219" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">6</text>
                </g>
              </svg>
            </div>

            {/* Anatomy Breakdown Grid (6 interactive cards) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <AnatomyLabel
                number={1}
                label={isId ? 'Rel Inaktif (Inactive Rail Track)' : 'Inactive Rail Track'}
                desc={isId ? 'Landasan horizontal abu-abu netral dengan sudut membulat penuh (full pill).' : 'Neutral background track with full pill rounded ends.'}
                isActive={activeAnatomyPin === 1}
                onMouseEnter={() => setActiveAnatomyPin(1)}
                onMouseLeave={() => setActiveAnatomyPin(null)}
              />
              <AnatomyLabel
                number={2}
                label={isId ? 'Bar Terisi (Active Range Fill)' : 'Active Range Fill'}
                desc={isId ? 'Segmen warna terracotta yang menandai nilai terpilih atau rentang antara dua thumb.' : 'Terracotta filled segment spanning the selected numerical range.'}
                isActive={activeAnatomyPin === 2}
                onMouseEnter={() => setActiveAnatomyPin(2)}
                onMouseLeave={() => setActiveAnatomyPin(null)}
              />
              <AnatomyLabel
                number={3}
                label={isId ? 'Thumb Handle (Pegangan Penggeser)' : 'Thumb Handle'}
                desc={isId ? 'Pegangan lingkaran putih dengan border terracotta, efek shadow, dan hover/focus glow.' : 'Circular white handle with terracotta border and hover/focus glow.'}
                isActive={activeAnatomyPin === 3}
                onMouseEnter={() => setActiveAnatomyPin(3)}
                onMouseLeave={() => setActiveAnatomyPin(null)}
              />
              <AnatomyLabel
                number={4}
                label={isId ? 'Tooltip Bubble (Balon Nilai Terbuka)' : 'Speech Tooltip Bubble'}
                desc={isId ? 'Balon teks mengambang dengan panah penunjuk nilai persis pada posisi thumb.' : 'Floating bubble with pointer arrow indicating current value.'}
                isActive={activeAnatomyPin === 4}
                onMouseEnter={() => setActiveAnatomyPin(4)}
                onMouseLeave={() => setActiveAnatomyPin(null)}
              />
              <AnatomyLabel
                number={5}
                label={isId ? 'Label Nilai Bawah (Bottom Value Label)' : 'Bottom Value Label'}
                desc={isId ? 'Teks persentase langsung di bawah thumb untuk kemudahan pembacaan cepat.' : 'Direct tabular text value beneath thumb for clear legibility.'}
                isActive={activeAnatomyPin === 5}
                onMouseEnter={() => setActiveAnatomyPin(5)}
                onMouseLeave={() => setActiveAnatomyPin(null)}
              />
              <AnatomyLabel
                number={6}
                label={isId ? 'Titik Penanda Diskrit (Step Marks)' : 'Discrete Step Marks'}
                desc={isId ? 'Titik penanda (ticks) sepanjang rel untuk memandu penempatan pada interval tertentu.' : 'Visual tick marks along the rail indicating discrete step intervals.'}
                isActive={activeAnatomyPin === 6}
                onMouseEnter={() => setActiveAnatomyPin(6)}
                onMouseLeave={() => setActiveAnatomyPin(null)}
              />
            </div>
          </div>

          {/* ── 3. Types & Modes ── */}
          <div className="section-card">
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>
              {isId ? 'Tipe Slider: Single vs Range' : 'Slider Types: Single vs Dual-Thumb Range'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Gunakan mode Single untuk memilih satu nilai tertentu dari batas minimum, atau mode Range untuk memilih rentang di antara dua titik.'
                : 'Use Single mode for picking a single threshold or intensity, and Range mode for defining lower and upper bounds.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
              {/* Single Mode Card */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Single Slider</h4>
                  <NeuronBadge size="xs" variant="neutral">1 Thumb</NeuronBadge>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 24px 0' }}>
                  {isId
                    ? 'Cocok untuk pengaturan volume, kecerahan layar, zoom level, atau rating kepuasan.'
                    : 'Ideal for volume control, display brightness, zoom factors, or single threshold controls.'}
                </p>
                <NeuronSlider
                  defaultValue={60}
                  showTooltip
                  showValueInHeader
                  label={isId ? 'Tingkat Kecerahan' : 'Display Brightness'}
                />
              </div>

              {/* Range Mode Card */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Dual-Thumb Range Slider</h4>
                  <NeuronBadge size="xs" variant="brand">2 Thumbs</NeuronBadge>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 24px 0' }}>
                  {isId
                    ? 'Ideal untuk filter rentang harga belanja, filter rentang tahun, atau batas usia peserta.'
                    : 'Best for price range filters, date/year brackets, or age limit criteria.'}
                </p>
                <NeuronSlider
                  range
                  defaultValue={[20, 80]}
                  showTooltip
                  showValueInHeader
                  label={isId ? 'Rentang Anggaran' : 'Budget Bracket'}
                />
              </div>
            </div>
          </div>

          {/* ── 4. Sizes ── */}
          <div className="section-card">
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>
              {isId ? 'Pilihan Ukuran (Sizes)' : 'Sizing Tokens'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Tersedia dalam 3 ukuran proporsional: Small (sm), Medium (md - default), dan Large (lg).'
                : 'Available in 3 calibrated scale tokens: Small (sm), Medium (md - default), and Large (lg).'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
              <div style={{ background: 'var(--color-bg-subtle)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Small (sm) — 4px track, 16px thumb</span>
                  <NeuronBadge size="xs" variant="neutral">Compact</NeuronBadge>
                </div>
                <NeuronSlider size="sm" defaultValue={35} showTooltip />
              </div>

              <div style={{ background: 'var(--color-bg-subtle)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Medium (md) — 6px track, 22px thumb (Default)</span>
                  <NeuronBadge size="xs" variant="brand">Standard</NeuronBadge>
                </div>
                <NeuronSlider size="md" defaultValue={55} showTooltip />
              </div>

              <div style={{ background: 'var(--color-bg-subtle)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Large (lg) — 8px track, 28px thumb</span>
                  <NeuronBadge size="xs" variant="neutral">Touch Friendly</NeuronBadge>
                </div>
                <NeuronSlider size="lg" defaultValue={75} showTooltip />
              </div>
            </div>
          </div>

          {/* ── 5. Semantic Color Variants ── */}
          <div className="section-card">
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>
              {isId ? 'Varian Warna Semantik' : 'Semantic Color Variants'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Gunakan warna yang tepat untuk mengkomunikasikan makna konteks status (brand, neutral, success, warning, error).'
                : 'Communicate intent and health thresholds through standardized semantic colors.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-600)' }}>Brand (Terracotta)</span>
                <div style={{ marginTop: 12 }}>
                  <NeuronSlider variant="brand" defaultValue={65} showTooltip />
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--slate-700)' }}>Neutral (Slate)</span>
                <div style={{ marginTop: 12 }}>
                  <NeuronSlider variant="neutral" defaultValue={50} showTooltip />
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--emerald-600)' }}>Success (Emerald)</span>
                <div style={{ marginTop: 12 }}>
                  <NeuronSlider variant="success" defaultValue={85} showTooltip />
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--amber-600)' }}>Warning (Amber)</span>
                <div style={{ marginTop: 12 }}>
                  <NeuronSlider variant="warning" defaultValue={70} showTooltip />
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rose-600)' }}>Error (Rose)</span>
                <div style={{ marginTop: 12 }}>
                  <NeuronSlider variant="error" defaultValue={92} showTooltip />
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. Discrete Step Marks ── */}
          <div className="section-card">
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>
              {isId ? 'Titik Diskrit & Nilai Bertahap (Marks & Ticks)' : 'Discrete Step Marks & Ticks'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Tampilkan penanda visual (ticks) dan label bertahap (milestones) untuk memandu pengguna memilih nilai terstandarisasi, mencegah input di luar kelipatan, dan mempercepat seleksi dengan sekali klik pada label.'
                : 'Display visual tick marks and stepped milestone labels to guide users toward standardized values, enforce fixed intervals, and enable instant snapping via direct label clicks.'}
            </p>

            {/* 4 Comprehensive Showcase Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {/* Card 1: Standard Percentage Milestones */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                      {isId ? '1. Milestone Persentase Kuartal' : '1. Percentage Milestones'}
                    </h4>
                    <NeuronBadge size="xs" variant="brand">step=25</NeuronBadge>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                    {isId
                      ? 'Penanda interval kuartal (0%, 25%, 50%, 75%, 100%) untuk alokasi kapasitas atau kuota dengan interval terukur.'
                      : 'Quartile interval steps (0%, 25%, 50%, 75%, 100%) for quota allocations or bandwidth tiers with measured intervals.'}
                  </p>
                </div>
                <div style={{ padding: '8px 6px 12px 6px' }}>
                  <NeuronSlider
                    defaultValue={50}
                    step={25}
                    marks={{
                      0: '0%',
                      25: '25%',
                      50: '50%',
                      75: '75%',
                      100: '100%'
                    }}
                    formatValue={(v) => `${v}%`}
                    showTooltip
                    showValueInHeader
                    label={isId ? 'Alokasi Kuota Bandwidth' : 'Bandwidth Allocation Limit'}
                  />
                </div>
              </div>

              {/* Card 2: Named Profile / Categorical Milestones */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                      {isId ? '2. Preset Kategori & Status' : '2. Named Presets'}
                    </h4>
                    <NeuronBadge size="xs" variant="neutral">5 Profiles</NeuronBadge>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                    {isId
                      ? 'Menghubungkan titik diskrit dengan nama profil sistem yang bermakna kontekstual (Off, Eco, Normal, Turbo, Max).'
                      : 'Maps numeric discrete points to meaningful human presets (Off, Eco, Normal, Turbo, Max) for quick mode selection.'}
                  </p>
                </div>
                <div style={{ padding: '8px 6px 12px 6px' }}>
                  <NeuronSlider
                    defaultValue={3}
                    min={1}
                    max={5}
                    step={1}
                    marks={{
                      1: 'Off',
                      2: 'Eco',
                      3: 'Normal',
                      4: 'Turbo',
                      5: 'Max'
                    }}
                    formatValue={(v) => ({ 1: 'Off', 2: 'Eco', 3: 'Normal', 4: 'Turbo', 5: 'Max' }[v] || String(v))}
                    showTooltip
                    showValueInHeader
                    label={isId ? 'Profil Performa Sistem' : 'System Performance Preset'}
                  />
                </div>
              </div>

              {/* Card 3: Minimalist Ticks Only */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                      {isId ? '3. Penanda Titik Halus (Ticks Only)' : '3. Minimalist Ticks Only'}
                    </h4>
                    <NeuronBadge size="xs" variant="neutral">marks=true</NeuronBadge>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                    {isId
                      ? 'Menampilkan titik-titik penanda halus sepanjang rel tanpa label teks bawah untuk tampilan antarmuka yang bersih dan ringkas.'
                      : 'Subtle dot indicators along the rail without text labels below, providing tactile snap cues without taking extra vertical height.'}
                  </p>
                </div>
                <div style={{ padding: '8px 6px 12px 6px' }}>
                  <NeuronSlider
                    defaultValue={60}
                    step={10}
                    marks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    formatValue={(v) => `${v}%`}
                    showTooltip
                    showValueInHeader
                    label={isId ? 'Sensitivitas Sensor Optik' : 'Optical Sensor Sensitivity'}
                  />
                </div>
              </div>

              {/* Card 4: Stepped Dual-Thumb Range */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                      {isId ? '4. Rentang Ganda Bertahap' : '4. Stepped Dual-Thumb Range'}
                    </h4>
                    <NeuronBadge size="xs" variant="brand">Range • step=250</NeuronBadge>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                    {isId
                      ? 'Kombinasi mode rentang dengan loncatan diskrit terstandarisasi, ideal untuk memilih bracket anggaran belanja.'
                      : 'Combines dual-thumb range selection with quantized monetary intervals, ideal for budget brackets.'}
                  </p>
                </div>
                <div style={{ padding: '8px 6px 12px 6px' }}>
                  <NeuronSlider
                    range
                    min={0}
                    max={1000}
                    step={250}
                    defaultValue={[250, 750]}
                    marks={{
                      0: '$0',
                      250: '$250',
                      500: '$500',
                      750: '$750',
                      1000: '$1k'
                    }}
                    formatValue={(v) => `$${v.toLocaleString()}`}
                    showTooltip
                    showValueInHeader
                    label={isId ? 'Batas Anggaran Proyek ($)' : 'Project Budget Range ($)'}
                  />
                </div>
              </div>
            </div>

            {/* Interactive UX Tip Callout */}
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-bg-subtle)',
              border: '1px dashed var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)'
            }}>
              <span style={{ fontSize: '16px' }}>💡</span>
              <span>
                {isId
                  ? 'Tip Interaktif: Pengguna dapat menggeser thumb atau mengklik langsung pada teks label penanda di bawah rel untuk melompatkan posisi penggeser secara instan.'
                  : 'Interactive Tip: Users can drag the thumb or click directly on the milestone text labels below the track to snap the slider handle instantly.'}
              </span>
            </div>
          </div>

          {/* ── 7. Do's & Don'ts ── */}
          <div className="section-card">
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>
              {isId ? 'Panduan Penggunaan (Do & Don\'t)' : 'Design Guidelines (Do & Don\'t)'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Praktik terbaik dan anti-pola saat mengimplementasikan komponen NeuronSlider dalam formulir dan dasbor enterprise.'
                : 'Best practices and anti-patterns for implementing NeuronSlider components across enterprise forms and dashboards.'}
            </p>

            <div className="dodont-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {/* Pair 1: Relative / Sensory Adjustments vs Strict Numerical Input */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ padding: '20px 24px', minHeight: '100px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ width: '100%' }}>
                    <NeuronSlider
                      defaultValue={75}
                      showTooltip
                      showValueInHeader
                      formatValue={(v) => `${v}%`}
                      label={isId ? 'Volume Suara Speaker' : 'Speaker Output Volume'}
                    />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Gunakan untuk Kontrol Sensorik & Nilai Perkiraan' : 'Use for Relative & Sensory Adjustments'}
                  </div>
                  <div className="rule-card__desc">
                    {isId
                      ? 'Slider sangat tepat untuk nilai perkiraan atau kontrol sensorik (volume, kecerahan layar, zoom) di mana akurasi digit mutlak tidak memblokir alur pengguna.'
                      : 'Sliders excel at approximate or sensory values (volume, brightness, zoom) where exact digit precision is not strictly required to complete the task.'}
                  </div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ padding: '20px 24px', minHeight: '100px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ width: '100%' }}>
                    <NeuronSlider
                      min={1920}
                      max={2026}
                      defaultValue={1988}
                      showValueInHeader
                      formatValue={(v) => `${v}`}
                      label={isId ? 'Tahun Lahir' : 'Birth Year'}
                    />
                    <div style={{ fontSize: '11px', color: 'var(--color-danger, #b42318)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px', fontWeight: 500 }}>
                      <span>⚠️</span>
                      <span>{isId ? 'Sangat sulit memilih tahun persis di antara 106 titik sempit.' : 'Frustrating to pinpoint 1 exact year across 106 dense increments.'}</span>
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Jangan Gunakan untuk Input Data Kritis / Digit Mutlak' : 'Don\'t Use for High-Precision or Exact Inputs'}
                  </div>
                  <div className="rule-card__desc">
                    {isId
                      ? 'Hindari slider untuk tanggal lahir, nomor telepon, kode pos, atau nomor rekening. Gunakan NeuronInput teks/angka langsung agar pengisian cepat dan bebas eror.'
                      : 'Avoid sliders for birth dates, phone numbers, postal codes, or account numbers. Use direct numeric text inputs or stepper controls instead.'}
                  </div>
                </div>
              </RuleCard>

              {/* Pair 2: Live Feedback & Tooltip vs Blind Sliders */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ padding: '20px 24px', minHeight: '100px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ width: '100%' }}>
                    <NeuronSlider
                      defaultValue={60}
                      showTooltip
                      showValueInHeader
                      formatValue={(v) => `${v}%`}
                      label={isId ? 'Kecerahan Layar Display' : 'Display Panel Brightness'}
                    />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Sediakan Nilai Numerik Live dan Balon Tooltip' : 'Provide Real-Time Feedback & Speech Tooltips'}
                  </div>
                  <div className="rule-card__desc">
                    {isId
                      ? 'Selalu sertakan balon tooltip di atas thumb dan pembacaan angka di header yang diperbarui secara langsung saat thumb digeser.'
                      : 'Always pair sliders with visible numerical readouts in headers and speech tooltips that continuously update as the thumb is dragged.'}
                  </div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ padding: '20px 24px', minHeight: '100px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ width: '100%' }}>
                    <NeuronSlider
                      defaultValue={60}
                      showTooltip={false}
                      label={isId ? 'Tingkat Sensitivitas' : 'Sensitivity Level'}
                    />
                    <div style={{ fontSize: '11px', color: 'var(--color-danger, #b42318)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px', fontWeight: 500 }}>
                      <span>⚠️</span>
                      <span>{isId ? 'Pengguna tidak tahu apakah nilai saat ini 50, 60, atau 70.' : 'Users cannot determine if the value is 50, 60, or 70.'}</span>
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Jangan Biarkan Slider Bekerja Tanpa Indikator Angka' : 'Don\'t Leave Sliders Devoid of Numeric Feedback'}
                  </div>
                  <div className="rule-card__desc">
                    {isId
                      ? 'Slider buta tanpa indikator angka memaksa pengguna menebak nilainya, menciptakan ambiguitas dan ketidakpastian konfigurasi.'
                      : 'Blind sliders lacking numerical labels force users to guess current state, leading to ambiguity and costly input mistakes.'}
                  </div>
                </div>
              </RuleCard>

              {/* Pair 3: Unified Dual-Thumb Range vs Two Conflicting Sliders */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ padding: '20px 24px', minHeight: '100px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ width: '100%' }}>
                    <NeuronSlider
                      range
                      min={0}
                      max={1000}
                      step={50}
                      defaultValue={[200, 750]}
                      showTooltip
                      showValueInHeader
                      formatValue={(v) => `$${v}`}
                      label={isId ? 'Filter Rentang Harga Belanja' : 'Price Range Filter'}
                    />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Gunakan Dual-Thumb Range untuk Filter Interval' : 'Use Dual-Thumb Range for Bound Filters'}
                  </div>
                  <div className="rule-card__desc">
                    {isId
                      ? 'Untuk memilih rentang batas minimum dan maksimum, satukan pada 1 rel dual-thumb agar kedua batas terkunci secara spasial dan mustahil bersilangan.'
                      : 'For interval filtering (e.g. min/max budget or dates), use a single dual-thumb slider to logically bind both bounds and prevent crossovers.'}
                  </div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ padding: '16px 24px', minHeight: '100px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    <NeuronSlider
                      min={0}
                      max={1000}
                      defaultValue={750}
                      showValueInHeader
                      formatValue={(v) => `$${v}`}
                      label={isId ? 'Batas Minimum' : 'Minimum Bound'}
                    />
                    <NeuronSlider
                      min={0}
                      max={1000}
                      defaultValue={200}
                      showValueInHeader
                      formatValue={(v) => `$${v}`}
                      label={isId ? 'Batas Maksimum' : 'Maximum Bound'}
                    />
                    <div style={{ fontSize: '11px', color: 'var(--color-danger, #b42318)', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 500 }}>
                      <span>⚠️</span>
                      <span>{isId ? 'Konflik logika: Minimum ($750) melebihi maksimum ($200)!' : 'Logical conflict: Minimum ($750) exceeds maximum ($200)!'}</span>
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Hindari Memisahkan Batas ke Dua Slider Independen' : 'Don\'t Split Intervals into Disconnected Sliders'}
                  </div>
                  <div className="rule-card__desc">
                    {isId
                      ? 'Dua slider terpisah untuk rentang yang sama berisiko memunculkan konflik logika di mana nilai bawah melebihi nilai atas, serta memboroskan ruang layar.'
                      : 'Separate sliders for shared bounds create logical conflicts where minimum can exceed maximum, while consuming double the vertical space.'}
                  </div>
                </div>
              </RuleCard>

              {/* Pair 4: Stepped Discrete Marks vs Continuous Decimals */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ padding: '20px 24px', minHeight: '100px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ width: '100%' }}>
                    <NeuronSlider
                      min={1}
                      max={4}
                      step={1}
                      defaultValue={3}
                      marks={{ 1: '1 bln', 2: '3 bln', 3: '6 bln', 4: '12 bln' }}
                      formatValue={(v) => ({ 1: '1 Bulan', 2: '3 Bulan', 3: '6 Bulan', 4: '12 Bulan' }[v] || `${v}`)}
                      showTooltip
                      showValueInHeader
                      label={isId ? 'Paket Durasi Berlangganan' : 'Subscription Billing Cycle'}
                    />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Gunakan Penanda Diskrit untuk Paket Bertahap' : 'Provide Discrete Marks for Fixed Service Tiers'}
                  </div>
                  <div className="rule-card__desc">
                    {isId
                      ? 'Bila sistem hanya melayani kelipatan tertentu (misal paket 1, 3, 6, 12 bulan), gunakan marks dan snap agar thumb mengunci pada opsi yang valid.'
                      : 'When options correspond to fixed milestones (e.g. 1, 3, 6, 12 month tiers), provide marks so the thumb automatically snaps to valid options.'}
                  </div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ padding: '20px 24px', minHeight: '100px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ width: '100%' }}>
                    <NeuronSlider
                      min={1}
                      max={12}
                      defaultValue={4.6}
                      showTooltip
                      showValueInHeader
                      formatValue={(v) => `${v.toFixed(1)} bln`}
                      label={isId ? 'Durasi Langganan' : 'Subscription Duration'}
                    />
                    <div style={{ fontSize: '11px', color: 'var(--color-danger, #b42318)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px', fontWeight: 500 }}>
                      <span>⚠️</span>
                      <span>{isId ? 'Error validasi: Backend tidak melayani paket 4.6 bulan!' : 'Validation error: Backend does not support 4.6 months!'}</span>
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Jangan Biarkan Nilai Desimal Bebas untuk Paket Tetap' : 'Don\'t Allow Continuous Decimals for Tiered Plans'}
                  </div>
                  <div className="rule-card__desc">
                    {isId
                      ? 'Membiarkan thumb berhenti pada angka desimal acak untuk paket yang bersifat diskrit akan memicu error validasi form yang membingungkan pengguna.'
                      : 'Allowing continuous floating values when only fixed tiers are accepted triggers avoidable form validation errors and user frustration.'}
                  </div>
                </div>
              </RuleCard>
            </div>
          </div>

          {/* ── 8. Props & API Reference ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? 'Referensi Props & API' : 'Props & API Reference'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Dokumentasi antarmuka TypeScript lengkap untuk komponen NeuronSlider, mencakup kontrol status, penyesuaian gaya, tooltip, tanda langkah diskrit, dan penangan interaksi.'
                : 'Comprehensive TypeScript interface documentation for the NeuronSlider component, covering state control, styling modifiers, tooltips, discrete step marks, and event handlers.'}
            </p>

            {/* Subheading: NeuronSlider Props */}
            <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)', color: 'var(--color-text-primary)' }}>
              NeuronSlider Props
            </h3>
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
                    <td><code>range</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">false</code></td>
                    <td>{isId ? 'Mengaktifkan mode rentang ganda dengan 2 thumbs untuk memilih interval batas minimum dan maksimum.' : 'Enables dual-thumb range mode for selecting bounded interval values.'}</td>
                  </tr>
                  <tr>
                    <td><code>value</code></td>
                    <td><code className="api-type-code">number | [number, number]</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Nilai terkontrol saat ini (angka tunggal untuk single slider, tuple [min, max] untuk range slider).' : 'Controlled slider value (single number or [min, max] tuple in dual-thumb range mode).'}</td>
                  </tr>
                  <tr>
                    <td><code>defaultValue</code></td>
                    <td><code className="api-type-code">number | [number, number]</code></td>
                    <td><code className="api-default-code">min / [25, 75]</code></td>
                    <td>{isId ? 'Nilai awal untuk penggunaan tidak terkontrol (uncontrolled).' : 'Initial slider value for uncontrolled component usage.'}</td>
                  </tr>
                  <tr>
                    <td><code>min</code></td>
                    <td><code className="api-type-code">number</code></td>
                    <td><code className="api-default-code">0</code></td>
                    <td>{isId ? 'Batas nilai minimum yang dapat dipilih pada rel slider.' : 'Minimum selectable boundary value on the slider track.'}</td>
                  </tr>
                  <tr>
                    <td><code>max</code></td>
                    <td><code className="api-type-code">number</code></td>
                    <td><code className="api-default-code">100</code></td>
                    <td>{isId ? 'Batas nilai maksimum yang dapat dipilih pada rel slider.' : 'Maximum selectable boundary value on the slider track.'}</td>
                  </tr>
                  <tr>
                    <td><code>step</code></td>
                    <td><code className="api-type-code">number</code></td>
                    <td><code className="api-default-code">1</code></td>
                    <td>{isId ? 'Kelipatan interval kenaikan setiap pergeseran thumb (mendukung desimal atau integer).' : 'Granular step interval increment between consecutive thumb stops.'}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code className="api-type-code">'sm' | 'md' | 'lg'</code></td>
                    <td><code className="api-default-code">'md'</code></td>
                    <td>{isId ? 'Skala ukuran komponen yang mengatur ketebalan rel dan diameter lingkaran pegangan thumb.' : 'Scale modifier controlling rail thickness and thumb handle diameter dimensions.'}</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code className="api-type-code">'brand' | 'neutral' | 'success' | 'warning' | 'error'</code></td>
                    <td><code className="api-default-code">'brand'</code></td>
                    <td>{isId ? 'Varian tema warna token Neudela untuk segmen rel aktif, cincin fokus, dan aksen visual.' : 'Semantic Neudela color token variant applied to active track fill, focus rings, and visual accents.'}</td>
                  </tr>
                  <tr>
                    <td><code>showTooltip</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">false</code></td>
                    <td>{isId ? 'Menampilkan balon tooltip penunjuk nilai angka langsung di atas atau di bawah pegangan thumb.' : 'Displays speech bubble numerical value tooltip above or below thumb handles.'}</td>
                  </tr>
                  <tr>
                    <td><code>tooltipPlacement</code></td>
                    <td><code className="api-type-code">'top' | 'bottom'</code></td>
                    <td><code className="api-default-code">'top'</code></td>
                    <td>{isId ? 'Posisi penempatan balon tooltip: \'top\' (di atas thumb, panah ke bawah) atau \'bottom\' (di bawah thumb, panah ke atas).' : 'Placement direction of the tooltip speech bubble relative to the thumb handle.'}</td>
                  </tr>
                  <tr>
                    <td><code>tooltipVisible</code></td>
                    <td><code className="api-type-code">'always' | 'hover' | 'never'</code></td>
                    <td><code className="api-default-code">'hover'</code></td>
                    <td>{isId ? 'Aturan kemunculan tooltip: \'always\' (selalu terlihat), \'hover\' (saat kursor di atas thumb), atau \'never\' (disembunyikan).' : 'Visibility rule for the tooltip: \'always\' (persistently shown), \'hover\' (on mouseover/drag), or \'never\'.'}</td>
                  </tr>
                  <tr>
                    <td><code>showLabels</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">false</code></td>
                    <td>{isId ? 'Menampilkan teks nilai persis di bawah masing-masing pegangan thumb secara berkelanjutan.' : 'Renders persistent formatted numerical readout text directly beneath each thumb handle.'}</td>
                  </tr>
                  <tr>
                    <td><code>formatValue</code></td>
                    <td><code className="api-type-code">(val: number) =&gt; string</code></td>
                    <td><code className="api-default-code">{'(v) => `${v}%`'}</code></td>
                    <td>{isId ? 'Fungsi kustom untuk memformat angka numerik ke teks label (misal mata uang, persentase, satuan hari/bulan).' : 'Custom formatter callback converting raw numeric values into formatted display strings.'}</td>
                  </tr>
                  <tr>
                    <td><code>marks</code></td>
                    <td><code className="api-type-code">boolean | number[] | Record&lt;number, ReactNode&gt;</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Penanda titik diskrit di sepanjang rel. Menerima boolean, daftar array angka, atau pemetaan nilai ke label.' : 'Discrete tick marks along track. Accepts boolean, numeric array, or custom value-label dictionary.'}</td>
                  </tr>
                  <tr>
                    <td><code>label</code></td>
                    <td><code className="api-type-code">ReactNode</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Label judul teks formulir yang ditampilkan di bagian atas rel slider.' : 'Form field header label rendered above the slider track.'}</td>
                  </tr>
                  <tr>
                    <td><code>showValueInHeader</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">false</code></td>
                    <td>{isId ? 'Menampilkan teks nilai terformat secara langsung di sisi kanan header sejajar dengan label judul.' : 'Renders the live formatted value readout in the upper-right header opposite the label.'}</td>
                  </tr>
                  <tr>
                    <td><code>helperText</code></td>
                    <td><code className="api-type-code">ReactNode</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Teks keterangan bantuan atau panduan kontekstual di bawah rel slider.' : 'Contextual instruction or guidance text displayed underneath the slider track.'}</td>
                  </tr>
                  <tr>
                    <td><code>error</code></td>
                    <td><code className="api-type-code">ReactNode</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Pesan validasi kesalahan yang mengubah aksen slider menjadi status error merah.' : 'Validation error message that shifts the component styling into an error state.'}</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">false</code></td>
                    <td>{isId ? 'Menonaktifkan interaksi, meredupkan opacity visual, dan mengabaikan event klik/geser pointer.' : 'Disables user interactions, dims visual opacity (0.5), and ignores pointer events.'}</td>
                  </tr>
                  <tr>
                    <td><code>readOnly</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">false</code></td>
                    <td>{isId ? 'Mencegah perubahan nilai oleh pengguna namun tetap mempertahankan keterbacaan kontras visual normal.' : 'Prevents value modification while retaining normal visual contrast and readability.'}</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code className="api-type-code">(val: any) =&gt; void</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Callback yang dipanggil secara berkelanjutan setiap kali nilai slider berubah saat digeser atau diklik.' : 'Continuous callback fired whenever the value adjusts during drag scrubbing or track clicks.'}</td>
                  </tr>
                  <tr>
                    <td><code>onChangeEnd</code></td>
                    <td><code className="api-type-code">(val: any) =&gt; void</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Callback komitmen nilai yang hanya dipicu saat pengguna selesai menggeser dan melepaskan kursor (pointerup).' : 'Commitment callback fired only when user finishes dragging and releases the pointer.'}</td>
                  </tr>
                  <tr>
                    <td><code>name</code></td>
                    <td><code className="api-type-code">string</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Atribut nama field formulir HTML untuk kebutuhan standard form submission.' : 'HTML form input name attribute for native form submission workflows.'}</td>
                  </tr>
                  <tr>
                    <td><code>className</code></td>
                    <td><code className="api-type-code">string</code></td>
                    <td><code className="api-default-code">''</code></td>
                    <td>{isId ? 'Nama class CSS kustom tambahan pada elemen root pembungkus slider.' : 'Additional custom CSS class names applied to the outer root container element.'}</td>
                  </tr>
                  <tr>
                    <td><code>style</code></td>
                    <td><code className="api-type-code">CSSProperties</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Objek gaya CSS inline kustom yang diaplikasikan pada elemen root container.' : 'Custom inline CSS styles applied to the outer root container element.'}</td>
                  </tr>
                  <tr>
                    <td><code>aria-label</code></td>
                    <td><code className="api-type-code">string</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Label aksesibilitas pembaca layar (screen reader) untuk pegangan thumb slider.' : 'Accessibility label announced by screen readers for slider thumb handles.'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Subheading: Supporting TypeScript Interfaces & Types */}
            <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-3)', color: 'var(--color-text-primary)' }}>
              {isId ? 'Tipe & Antarmuka TypeScript Pendukung' : 'Supporting TypeScript Interfaces & Types'}
            </h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Type / Interface</th>
                    <th style={{ width: '38%' }}>Definition</th>
                    <th style={{ width: '40%' }}>{t.compShared.description}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>NeuronSliderSize</code></td>
                    <td><code className="api-type-code">'sm' | 'md' | 'lg'</code></td>
                    <td>{isId ? 'Preset skala ukuran ketebalan rel (4px, 6px, 8px) dan diameter thumb (14px, 18px, 22px).' : 'Size scale presets for track thickness (4px, 6px, 8px) and thumb diameter (14px, 18px, 22px).'}</td>
                  </tr>
                  <tr>
                    <td><code>NeuronSliderVariant</code></td>
                    <td><code className="api-type-code">'brand' | 'neutral' | 'success' | 'warning' | 'error'</code></td>
                    <td>{isId ? 'Token palet warna tema yang diaplikasikan pada rel aktif, cincin fokus thumb, dan titik marks.' : 'Semantic color theme tokens applied to active fill, thumb focus rings, and milestone marks.'}</td>
                  </tr>
                  <tr>
                    <td><code>SliderTooltipPlacement</code></td>
                    <td><code className="api-type-code">'top' | 'bottom'</code></td>
                    <td>{isId ? 'Orientasi posisi balon penunjuk nilai: \'top\' (di atas thumb dengan panah bawah) atau \'bottom\' (di bawah thumb dengan panah atas).' : 'Directional orientation: \'top\' (above thumb with down arrow) or \'bottom\' (below thumb with up arrow).'}</td>
                  </tr>
                  <tr>
                    <td><code>SliderTooltipVisible</code></td>
                    <td><code className="api-type-code">'always' | 'hover' | 'never'</code></td>
                    <td>{isId ? 'Aturan kemunculan visual balon tooltip nilai: selalu terlihat, saat kursor di atas thumb, atau disembunyikan sepenuhnya.' : 'Tooltip speech bubble display rule: always visible, hover-only, or strictly hidden.'}</td>
                  </tr>
                  <tr>
                    <td><code>SliderMarks</code></td>
                    <td><code className="api-type-code">boolean | number[] | Record&lt;number, ReactNode&gt;</code></td>
                    <td>{isId ? 'Format penanda diskrit: boolean (mengikuti step), array angka [25, 50, 75], atau objek kamus nilai ke label { 1: \'1 bln\', ... }.' : 'Milestone mark format: boolean (step intervals), numeric array, or custom value-label key-value map.'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2 – PLAYBOOK
      ══════════════════════════════════════ */}
      {activeViewTab === 'playbook' && (
        <div className="tab-content">
          {/* ── Interactive Playground ── */}
          {renderPlayground()}

          {/* ── Pattern 01: E-Commerce Price Range Filter ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 01
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {isId ? 'Filter Rentang Harga Belanja (Dual-Thumb)' : 'E-Commerce Dual-Thumb Price Range Filter'}
                </h3>
              </div>
              <NeuronBadge size="sm" variant="brand">{filteredProducts.length} {isId ? 'Produk Cocok' : 'Items Matched'}</NeuronBadge>
            </div>
            <p className="section-description">
              {isId
                ? 'Slider rentang ganda dengan sinkronisasi kotak input numerik dan filter katalog produk secara langsung.'
                : 'Dual-thumb range slider synchronized with numerical currency inputs for live catalog filtering.'}
            </p>

            <div style={{
              maxWidth: '840px',
              margin: '20px auto 0',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xs)',
              overflow: 'hidden'
            }}>
              {/* Filter Bar Header */}
              <div style={{
                padding: '20px 24px',
                background: 'var(--color-bg-subtle)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Filter size={18} style={{ color: 'var(--brand-600)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{isId ? 'Filter Berdasarkan Anggaran' : 'Budget Range Filter'}</span>
                  </div>
                  <NeuronButton
                    size="xs"
                    variant="text"
                    onClick={() => {
                      setPriceRange([50, 700]);
                      setSelectedCategory('all');
                    }}
                  >
                    <RotateCcw size={12} style={{ marginRight: 4 }} />
                    {isId ? 'Reset Filter' : 'Reset Filters'}
                  </NeuronButton>
                </div>

                {/* The Slider Control */}
                <div style={{ padding: '0 8px' }}>
                  <NeuronSlider
                    range
                    min={0}
                    max={800}
                    step={10}
                    value={priceRange}
                    onChange={(val) => setPriceRange(val)}
                    formatValue={(v) => `$${v}`}
                    showTooltip
                    tooltipPlacement="top"
                    tooltipVisible="hover"
                    showLabels
                  />
                </div>

                {/* Synced Price Inputs & Category Pills */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingTop: 14, borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '4px 8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginRight: 4 }}>Min: $</span>
                      <input
                        type="number"
                        min={0}
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])}
                        style={{ width: '50px', border: 'none', background: 'transparent', fontSize: '12px', fontWeight: 600, outline: 'none' }}
                      />
                    </div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>–</span>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '4px 8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginRight: 4 }}>Max: $</span>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max={800}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])}
                        style={{ width: '50px', border: 'none', background: 'transparent', fontSize: '12px', fontWeight: 600, outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Category Pills */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['all', 'furniture', 'peripherals', 'audio', 'monitors'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          padding: '4px 10px',
                          fontSize: '11px',
                          fontWeight: 600,
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--color-border)',
                          background: selectedCategory === cat ? 'var(--brand-600)' : 'var(--color-bg-surface)',
                          color: selectedCategory === cat ? '#fff' : 'var(--color-text-primary)',
                          cursor: 'pointer',
                          textTransform: 'capitalize'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filtered Product Cards Grid */}
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '16px',
                        background: 'var(--color-bg-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                      }}
                    >
                      {p.tag && (
                        <span style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          fontSize: '10px',
                          fontWeight: 700,
                          background: 'rgba(195, 87, 28, 0.1)',
                          color: 'var(--brand-600)',
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-sm)'
                        }}>
                          {p.tag}
                        </span>
                      )}
                      <div>
                        <div style={{ fontSize: '32px', marginBottom: 10 }}>{p.image}</div>
                        <h5 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600 }}>{p.name}</h5>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{p.category}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-600)' }}>
                          ${p.price}
                        </span>
                        <NeuronButton size="xs" variant="primary">
                          <ShoppingBag size={12} style={{ marginRight: 4 }} />
                          Add
                        </NeuronButton>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-secondary)' }}>
                    <p style={{ margin: 0, fontSize: '14px' }}>
                      {isId ? 'Tidak ada produk dalam rentang harga ini.' : 'No products found within this price range.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Pattern 02: Audio Studio Mixer & Equalizer ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 02
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {isId ? 'Audio Studio Equalizer & Volume Mixer' : 'Audio Studio Equalizer & Volume Mixer'}
                </h3>
              </div>
              <NeuronBadge size="sm" variant="brand">DSP Audio</NeuronBadge>
            </div>
            <p className="section-description">
              {isId
                ? 'Kontrol mixing suara studio dengan slider volume master, kecepatan playback, dan equalizer audio bass-treble.'
                : 'Studio audio console with master volume gain, playback speed, and multi-band frequency controls.'}
            </p>

            <div style={{
              maxWidth: '840px',
              margin: '20px auto 0',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xs)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24
            }}>
              {/* Player Top Info */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--brand-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Music size={22} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Synthetic Horizon - Neudela Beats</h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>Master Output (48 kHz / 24-bit PCM)</p>
                  </div>
                </div>

                {/* Animated Spectrum visualizer bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 28 }}>
                  {[40, 70, 95, 60, 85, 50, 75, 100, 65, 45].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        height: isMuted ? 4 : `${(h * audioVolume) / 100}%`,
                        backgroundColor: 'var(--brand-600)',
                        borderRadius: 2,
                        transition: 'height 0.2s ease'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Master Volume Slider */}
              <div style={{ background: 'var(--color-bg-subtle)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: isMuted ? 'var(--rose-600)' : 'var(--brand-600)' }}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>
                      {isId ? 'Volume Suara Master' : 'Master Volume Gain'}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: isMuted ? 'var(--rose-600)' : 'var(--brand-600)' }}>
                    {isMuted ? 'MUTED' : `${audioVolume}%`}
                  </span>
                </div>
                <NeuronSlider
                  value={isMuted ? 0 : audioVolume}
                  onChange={(v) => {
                    setAudioVolume(v);
                    if (isMuted) setIsMuted(false);
                  }}
                  showTooltip
                  variant={isMuted ? 'neutral' : 'brand'}
                  size="md"
                />
              </div>

              {/* Three Sliders in Equalizer Rack */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                {/* Playback Speed */}
                <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>Playback Speed</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-600)' }}>{playbackSpeed}x</span>
                  </div>
                  <NeuronSlider
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    value={playbackSpeed}
                    onChange={(v) => setPlaybackSpeed(Number(v.toFixed(1)))}
                    formatValue={(v) => `${v}x`}
                    showTooltip
                    size="sm"
                  />
                </div>

                {/* Bass */}
                <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>Bass (+dB)</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-600)' }}>+{bassLevel} dB</span>
                  </div>
                  <NeuronSlider
                    min={-12}
                    max={12}
                    step={1}
                    value={bassLevel}
                    onChange={(v) => setBassLevel(v)}
                    formatValue={(v) => `${v > 0 ? '+' : ''}${v} dB`}
                    showTooltip
                    size="sm"
                  />
                </div>

                {/* Treble */}
                <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>Treble (+dB)</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-600)' }}>+{trebleLevel} dB</span>
                  </div>
                  <NeuronSlider
                    min={-12}
                    max={12}
                    step={1}
                    value={trebleLevel}
                    onChange={(v) => setTrebleLevel(v)}
                    formatValue={(v) => `${v > 0 ? '+' : ''}${v} dB`}
                    showTooltip
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Pattern 03: Cloud Resource Allocator & Cost Calculator ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 03
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {isId ? 'Kalkulator Sumber Daya Cloud Server' : 'Cloud Server Resource & Cost Estimator'}
                </h3>
              </div>
              <NeuronBadge size="sm" variant="brand">Auto Scaling</NeuronBadge>
            </div>
            <p className="section-description">
              {isId
                ? 'Penyesuaian vCPU, memori RAM, dan kapasitas penyimpanan NVMe dengan estimasi penagihan bulanan secara langsung.'
                : 'Configure dedicated vCPU cores, RAM memory, and fast NVMe storage with real-time monthly billing estimates.'}
            </p>

            <div style={{
              maxWidth: '840px',
              margin: '20px auto 0',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xs)',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 280px', gap: 0 }}>
                {/* Sliders Configuration Column */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 24, borderRight: '1px solid var(--color-border)' }}>
                  {/* vCPU */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', fontWeight: 600 }}>
                        <Cpu size={15} style={{ color: 'var(--brand-600)' }} />
                        Compute vCPUs
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-600)' }}>
                        {cpuCores} Cores
                      </span>
                    </div>
                    <NeuronSlider
                      min={2}
                      max={64}
                      step={2}
                      value={cpuCores}
                      onChange={(v) => setCpuCores(v)}
                      formatValue={(v) => `${v} vCPUs`}
                      showTooltip
                    />
                  </div>

                  {/* RAM */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', fontWeight: 600 }}>
                        <Server size={15} style={{ color: 'var(--brand-600)' }} />
                        Memory RAM
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-600)' }}>
                        {ramGigabytes} GB
                      </span>
                    </div>
                    <NeuronSlider
                      min={4}
                      max={128}
                      step={4}
                      value={ramGigabytes}
                      onChange={(v) => setRamGigabytes(v)}
                      formatValue={(v) => `${v} GB`}
                      showTooltip
                    />
                  </div>

                  {/* Storage */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', fontWeight: 600 }}>
                        <HardDrive size={15} style={{ color: 'var(--brand-600)' }} />
                        NVMe SSD Storage
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-600)' }}>
                        {storageGb} GB
                      </span>
                    </div>
                    <NeuronSlider
                      min={50}
                      max={2000}
                      step={50}
                      value={storageGb}
                      onChange={(v) => setStorageGb(v)}
                      formatValue={(v) => `${v} GB`}
                      showTooltip
                    />
                  </div>
                </div>

                {/* Live Invoice Summary Column */}
                <div style={{ padding: '24px', background: 'var(--color-bg-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                      {isId ? 'Estimasi Biaya' : 'Estimated Pricing'}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '8px 0 16px 0' }}>
                      <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--brand-600)' }}>
                        ${monthlyServerCost}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>/ month</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '12px', borderTop: '1px solid var(--color-border)', paddingTop: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Compute ({cpuCores} vCPU)</span>
                        <span style={{ fontWeight: 600 }}>${Math.round(cpuCores * 4.5)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Memory ({ramGigabytes} GB)</span>
                        <span style={{ fontWeight: 600 }}>${Math.round(ramGigabytes * 2.2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>NVMe SSD ({storageGb} GB)</span>
                        <span style={{ fontWeight: 600 }}>${Math.round(storageGb * 0.08)}</span>
                      </div>
                    </div>
                  </div>

                  <NeuronButton variant="primary" style={{ width: '100%', marginTop: 24 }}>
                    <Zap size={14} style={{ marginRight: 6 }} />
                    {isId ? 'Luncurkan Instance' : 'Deploy Instance'}
                  </NeuronButton>
                </div>
              </div>
            </div>
          </div>

          {/* ── Pattern 04: Loan / Mortgage EMI Calculator ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 04
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {isId ? 'Kalkulator Angsuran Kredit Pinjaman (Mortgage EMI)' : 'Mortgage & Loan EMI Calculator'}
                </h3>
              </div>
              <NeuronBadge size="sm" variant="brand">Fintech Pattern</NeuronBadge>
            </div>
            <p className="section-description">
              {isId
                ? 'Simulasi cicilan bulanan pinjaman dengan slider jumlah pokok pinjaman, tenor tahunan, dan persentase suku bunga.'
                : 'Simulate monthly mortgage installments with loan amount, repayment tenure in years, and annual interest rate.'}
            </p>

            <div style={{
              maxWidth: '840px',
              margin: '20px auto 0',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xs)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24
            }}>
              {/* Sliders Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Loan Amount */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      {isId ? 'Plafon Jumlah Pinjaman' : 'Loan Principal Amount'}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--brand-600)' }}>
                      ${loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <NeuronSlider
                    min={10000}
                    max={500000}
                    step={5000}
                    value={loanAmount}
                    onChange={(v) => setLoanAmount(v)}
                    formatValue={(v) => `$${v.toLocaleString()}`}
                    showTooltip
                  />
                </div>

                {/* Tenure in Years */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      {isId ? 'Jangka Waktu (Tenor)' : 'Loan Tenure'}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--brand-600)' }}>
                      {loanTenureYears} {isId ? 'Tahun' : 'Years'}
                    </span>
                  </div>
                  <NeuronSlider
                    min={1}
                    max={30}
                    step={1}
                    value={loanTenureYears}
                    onChange={(v) => setLoanTenureYears(v)}
                    formatValue={(v) => `${v} yrs`}
                    showTooltip
                    marks={{ 1: '1y', 5: '5y', 10: '10y', 15: '15y', 20: '20y', 25: '25y', 30: '30y' }}
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      {isId ? 'Suku Bunga Tahunan' : 'Annual Interest Rate'}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--brand-600)' }}>
                      {interestRate}%
                    </span>
                  </div>
                  <NeuronSlider
                    min={2.0}
                    max={15.0}
                    step={0.1}
                    value={interestRate}
                    onChange={(v) => setInterestRate(Number(v.toFixed(1)))}
                    formatValue={(v) => `${v}%`}
                    showTooltip
                  />
                </div>
              </div>

              {/* Monthly Repayment Breakdown Box */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20
              }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                    {isId ? 'Estimasi Cicilan Per Bulan' : 'Monthly Installment (EMI)'}
                  </span>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--brand-600)', margin: '4px 0' }}>
                    ${monthlyEmi.toLocaleString()} <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>/ mo</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 24 }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Total Pokok' : 'Total Principal'}
                    </span>
                    <div style={{ fontSize: '15px', fontWeight: 700 }}>
                      ${loanAmount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Total Bunga' : 'Total Interest'}
                    </span>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--amber-600)' }}>
                      ${totalInterest.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Total Pelunasan' : 'Total Payable'}
                    </span>
                    <div style={{ fontSize: '15px', fontWeight: 700 }}>
                      ${totalPayment.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer Navigation (Prev / Next) ── */}
      <NextPrevious
        prev={{ id: 'comp-radio', label: t.nav.compRadio }}
        next={{ id: 'comp-stepper', label: t.nav.compStepper || 'Stepper' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
