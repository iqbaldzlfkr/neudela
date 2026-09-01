import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import NeuronProgress, {
  NeuronProgressSize,
  NeuronProgressVariant,
  NeuronProgressType,
} from '../components/NeuronProgress';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import NeuronCard from '../components/NeuronCard';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import {
  Upload,
  Download,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  BarChart2,
  Users,
  ShieldCheck,
  Zap,
  RefreshCw,
  Layers,
  ArrowRight,
  Activity,
  Server,
  Sparkles,
  Clock,
  Check,
  Database,
  HardDrive,
  Cpu,
  Flame,
  Truck,
  Package,
  ShoppingBag,
} from 'lucide-react';

interface ProgressViewProps {
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
        {isDo ? 'Do' : "Don't"}
      </div>
      <div className="rule-card__body">{children}</div>
    </div>
  );
}

function AnatomyLabel({ number, label, desc }: { number: number; label: string; desc: string }) {
  return (
    <div className="anatomy-label">
      <span className="anatomy-number">{number}</span>
      <div>
        <div className="anatomy-label-name">{label}</div>
        <div className="anatomy-label-desc">{desc}</div>
      </div>
    </div>
  );
}

function useAnimatedValue(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

const SIZES: NeuronProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const VARIANTS: NeuronProgressVariant[] = ['brand', 'success', 'warning', 'error', 'info', 'neutral'];
const STEPS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const VARIANT_META: Record<NeuronProgressVariant, { label: string; desc: string }> = {
  brand:   { label: 'Brand',   desc: 'Primary brand terracotta' },
  success: { label: 'Success', desc: 'Complete / nominal state' },
  warning: { label: 'Warning', desc: 'Approaching threshold' },
  error:   { label: 'Error',   desc: 'Exceeded / critical state' },
  info:    { label: 'Info',    desc: 'Informational context' },
  neutral: { label: 'Neutral', desc: 'Muted secondary context' },
};

export default function ProgressView({ setActiveTab }: ProgressViewProps) {
  const { t } = useLanguage();
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');
  const [anatomyTab, setAnatomyTab] = useState<'bar' | 'circle'>('bar');

  const animVal72 = useAnimatedValue(72);
  const animVal48 = useAnimatedValue(48);
  const animVal91 = useAnimatedValue(91);

  // Upload simulation
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const uploadTimerRef = useRef<NodeJS.Timeout | null>(null);

  const runUpload = () => {
    if (uploading) return;
    if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
    setUploading(true);
    setUploadProgress(0);
    let v = 0;
    
    uploadTimerRef.current = setInterval(() => {
      // Smooth realistic increments (1% to 3% every 50ms = ~3.2 seconds total duration)
      const inc = Math.random() < 0.25 ? 3 : Math.random() < 0.7 ? 2 : 1;
      v += inc;
      if (v >= 100) {
        v = 100;
        if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
        setUploadProgress(100);
        setUploading(false);
      } else {
        setUploadProgress(v);
      }
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
    };
  }, []);

  // OTP Countdown timer simulation
  const [secondsLeft, setSecondsLeft] = useState(45);
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  return (
    <div className="card-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">Progress indicators</h1>
            <p className="page-subtitle">
              Progress indicators inform users about the completion status of ongoing processes, data streams, and quantitative metrics across linear bars, radial rings, and semicircle gauges.
            </p>
          </div>
        </div>
        <div className="comp-tab-bar">
          <button type="button" className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`} onClick={() => setTab('guideline')}>Guideline</button>
          <button type="button" className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`} onClick={() => setTab('playbook')}>Playbook</button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          TAB 1: GUIDELINE
      ═══════════════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">

          {/* ── 1. SYMMETRICAL OVERVIEW & FIGMA SPECIFICATION MATRIX ── */}
          <div className="section-card">
            <h2 className="section-title">Overview & Variant Matrix</h2>
            <p className="section-description">
              Complete design system specification aligning with Neudela Figma artboards — with uniform column alignment across sizes and step variations.
            </p>

            {/* ARTBOARD 1: PROGRESS CIRCLES & GAUGES */}
            <div style={{ marginTop: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', margin: 0 }}>
                    Progress circles & gauges specification
                  </h3>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0 0' }}>
                    Full radial circles and semi-circular gauge meters across 5 standardized size tokens.
                  </p>
                </div>
                <NeuronBadge size="sm" variant="brand">Figma Artboard</NeuronBadge>
              </div>

              {/* Symmetrical 5-Column Figma Artboard */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-8)',
                overflowX: 'auto',
                boxShadow: 'var(--shadow-xs)'
              }}>
                {/* Column Headers: 5 Sizes */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, minmax(140px, 1fr))',
                  gap: 'var(--space-4)',
                  paddingBottom: 'var(--space-3)',
                  borderBottom: '1px solid var(--color-border)',
                  marginBottom: 'var(--space-8)',
                  textAlign: 'center',
                }}>
                  {SIZES.map(sz => (
                    <div key={sz} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Size: {sz}
                    </div>
                  ))}
                </div>

                {/* Rows Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
                  
                  {/* Row 1: Full Circle (Value only) */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
                      1. Full Circle — Value only
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(140px, 1fr))', gap: 'var(--space-4)', alignItems: 'center' }}>
                      {SIZES.map(sz => (
                        <div key={sz} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <NeuronProgress type="circle" value={40} size={sz} showValue animated={false} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 2: Full Circle (Label + Value) */}
                  <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: 'var(--space-8)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
                      2. Full Circle — Context Label + Value
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(140px, 1fr))', gap: 'var(--space-4)', alignItems: 'center' }}>
                      {SIZES.map(sz => (
                        <div key={sz} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <NeuronProgress type="circle" value={40} size={sz} showValue label="Active users" animated={false} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Half Circle Gauge (Value only) */}
                  <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: 'var(--space-8)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
                      3. Half Circle Gauge — Value only
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(140px, 1fr))', gap: 'var(--space-4)', alignItems: 'flex-end' }}>
                      {SIZES.map(sz => (
                        <div key={sz} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                          <NeuronProgress type="half-circle" value={40} size={sz} showValue animated={false} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Half Circle Gauge (Label + Value) */}
                  <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: 'var(--space-8)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
                      4. Half Circle Gauge — Context Label + Value
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(140px, 1fr))', gap: 'var(--space-4)', alignItems: 'flex-end' }}>
                      {SIZES.map(sz => (
                        <div key={sz} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                          <NeuronProgress type="half-circle" value={40} size={sz} showValue label="Active users" animated={false} />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ARTBOARD 2: PROGRESS BARS (0% - 100% STEP MATRIX) */}
            <div style={{ marginTop: 'var(--space-10)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', margin: 0 }}>
                    Progress bars step matrix (0% – 100%)
                  </h3>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0 0' }}>
                    11-step linear progress matrix across 4 layout variations: Standard, Trailing Label, Leading Pin, and Floating Bubble.
                  </p>
                </div>
                <NeuronBadge size="sm" variant="brand">Figma Artboard</NeuronBadge>
              </div>

              {/* Symmetrical Matrix Container */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-8)',
                overflowX: 'auto',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))',
                  gap: 'var(--space-6)',
                }}>
                  {/* Column 1: Standard Bar */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18, textAlign: 'center', paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>
                      Standard Bar
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {STEPS.map((pct) => (
                        <div key={pct} style={{ height: 28, display: 'flex', alignItems: 'center' }}>
                          <NeuronProgress type="bar" value={pct} size="sm" animated={false} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Trailing Label */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18, textAlign: 'center', paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>
                      Trailing Label
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {STEPS.map((pct) => (
                        <div key={pct} style={{ height: 28, display: 'flex', alignItems: 'center' }}>
                          <NeuronProgress type="bar" value={pct} size="sm" showValue valuePosition="right" animated={false} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: With Leading Pin */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18, textAlign: 'center', paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>
                      With Start Pin
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {STEPS.map((pct) => (
                        <div key={pct} style={{ height: 28, display: 'flex', alignItems: 'center' }}>
                          <NeuronProgress type="bar" value={pct} size="sm" showPin animated={false} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 4: Floating Bubble Tooltip */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18, textAlign: 'center', paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>
                      Floating Bubble Tooltip
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {STEPS.map((pct) => (
                        <div key={pct} style={{ height: 28, display: 'flex', alignItems: 'flex-end' }}>
                          <NeuronProgress type="bar" value={pct} size="sm" showValue valuePosition="bubble" animated={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ARTBOARD 3: SEMANTIC STATUS TOKENS */}
            <div style={{ marginTop: 'var(--space-10)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-8)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                Semantic status tokens
              </h3>
              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                Color themes mapped to Neudela feedback and intent tokens.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
                {VARIANTS.map((v) => (
                  <div key={v} style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', background: 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{VARIANT_META[v].label}</span>
                      <NeuronBadge size="sm" variant={v === 'brand' ? 'brand' : 'gray'}>{v}</NeuronBadge>
                    </div>
                    <NeuronProgress type="bar" value={72} size="md" variant={v} showValue />
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{VARIANT_META[v].desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 2. HIGH-IMPACT INDUSTRY PROGRESS PATTERNS (RECOMMENDATIONS) ── */}
          <div className="section-card">
            <h2 className="section-title">Industry Production Patterns</h2>
            <p className="section-description">
              State-of-the-art progress designs inspired by top products like macOS, Apple Fitness, Stripe, Linear, and Shopify.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>

              {/* Pattern 1: Multi-Segment Storage Breakdown Bar (macOS / Google One) */}
              <NeuronCard variant="elevated" padding="lg" hoverable>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--brand-50)', color: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <HardDrive size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>Cloud Storage Usage</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>128.4 GB of 256 GB used (50.1%)</div>
                    </div>
                  </div>
                  <NeuronBadge size="sm" variant="brand">SSD Pro</NeuronBadge>
                </div>

                {/* Multi-Segment Track Bar */}
                <div style={{ height: 12, borderRadius: 6, background: 'var(--color-bg-subtle)', display: 'flex', overflow: 'hidden', gap: 2, padding: 1 }}>
                  <div title="System (45%)" style={{ width: '45%', background: 'var(--brand-500)', borderRadius: '4px 0 0 4px', transition: 'width 0.5s' }} />
                  <div title="Media (25%)" style={{ width: '25%', background: 'var(--blue-500)', transition: 'width 0.5s' }} />
                  <div title="Documents (18%)" style={{ width: '18%', background: 'var(--emerald-500)', transition: 'width 0.5s' }} />
                  <div title="Other (12%)" style={{ width: '12%', background: 'var(--amber-400)', borderRadius: '0 4px 4px 0', transition: 'width 0.5s' }} />
                </div>

                {/* Legend Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 14, fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-500)' }} /> System (115 GB)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue-500)' }} /> Media (64 GB)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-500)' }} /> Docs (46 GB)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--amber-400)' }} /> Other (31 GB)</div>
                </div>
              </NeuronCard>

              {/* Pattern 2: Multi-Ring Telemetry Activity Rings (Apple Fitness / Datadog) */}
              <NeuronCard variant="elevated" padding="lg" hoverable>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>Core Web Vitals</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Live production audit metrics</div>
                  </div>
                  <NeuronBadge size="sm" variant="success">98 / 100</NeuronBadge>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  {/* Concentric Nested Rings */}
                  <div style={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
                    {/* Ring 1 (Outer - Performance 94%) */}
                    <svg width="110" height="110" style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}>
                      <circle cx="55" cy="55" r="48" fill="none" stroke="var(--brand-100)" strokeWidth="6" />
                      <circle cx="55" cy="55" r="48" fill="none" stroke="var(--brand-500)" strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 48} strokeDashoffset={2 * Math.PI * 48 * (1 - 0.94)} />
                    </svg>
                    {/* Ring 2 (Middle - Accessibility 98%) */}
                    <svg width="110" height="110" style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}>
                      <circle cx="55" cy="55" r="38" fill="none" stroke="var(--emerald-100)" strokeWidth="6" />
                      <circle cx="55" cy="55" r="38" fill="none" stroke="var(--emerald-500)" strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 38} strokeDashoffset={2 * Math.PI * 38 * (1 - 0.98)} />
                    </svg>
                    {/* Ring 3 (Inner - SEO 100%) */}
                    <svg width="110" height="110" style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}>
                      <circle cx="55" cy="55" r="28" fill="none" stroke="var(--blue-100)" strokeWidth="6" />
                      <circle cx="55" cy="55" r="28" fill="none" stroke="var(--blue-500)" strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={0} />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={18} style={{ color: 'var(--brand-500)' }} />
                    </div>
                  </div>

                  {/* Metrics details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, fontSize: '11px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-500)' }} /> Performance
                      </span>
                      <strong style={{ color: 'var(--color-text-primary)' }}>94%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-500)' }} /> Accessibility
                      </span>
                      <strong style={{ color: 'var(--color-text-primary)' }}>98%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue-500)' }} /> SEO & Tokens
                      </span>
                      <strong style={{ color: 'var(--color-text-primary)' }}>100%</strong>
                    </div>
                  </div>
                </div>
              </NeuronCard>

              {/* Pattern 3: E-Commerce Delivery Step Progress (Shopify / Amazon) */}
              <NeuronCard variant="elevated" padding="lg" hoverable>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>Package Delivery Tracking</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Order #NEU-98421 · JNE Express</div>
                  </div>
                  <NeuronBadge size="sm" variant="brand">On the way</NeuronBadge>
                </div>

                {/* Stepper with Connecting Bar */}
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
                  {/* Background Track */}
                  <div style={{ position: 'absolute', top: 12, left: 24, right: 24, height: 3, background: 'var(--color-border)', zIndex: 0 }} />
                  {/* Filled Track (66%) */}
                  <div style={{ position: 'absolute', top: 12, left: 24, width: '66%', height: 3, background: 'var(--brand-500)', zIndex: 0 }} />

                  {[
                    { label: 'Confirmed', icon: <Check size={11} strokeWidth={3} />, done: true },
                    { label: 'Packed', icon: <Package size={12} />, done: true },
                    { label: 'Out for delivery', icon: <Truck size={12} />, active: true },
                    { label: 'Delivered', icon: <CheckCircle2 size={12} />, pending: true },
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 1 }}>
                      <div style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: step.done || step.active ? 'var(--brand-500)' : 'var(--color-bg-surface)',
                        border: `2px solid ${step.done || step.active ? 'var(--brand-500)' : 'var(--color-border)'}`,
                        color: step.done || step.active ? '#fff' : 'var(--color-text-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        boxShadow: step.active ? '0 0 0 4px rgba(223,126,48,0.2)' : 'none',
                      }}>
                        {step.icon}
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: step.active ? 700 : 500, color: step.active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', textAlign: 'center' }}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </NeuronCard>

              {/* Pattern 4: Neudela AI Token Glow Progress (Premium Glassmorphism & High-Contrast) */}
              <NeuronCard variant="elevated" padding="lg" hoverable style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--color-bg-surface) 0%, var(--brand-50, #fdf7ed) 100%)',
                border: '1px solid var(--brand-200, #f1ce96)',
                boxShadow: '0 10px 30px -5px rgba(223, 126, 48, 0.12), 0 0 0 1px rgba(223, 126, 48, 0.08)',
              }}>
                {/* Subtle Ambient Radial Glow in Top Right */}
                <div style={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(223, 126, 48, 0.22) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                {/* Card Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, var(--brand-500) 0%, var(--brand-700, #a23c1b) 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(223, 126, 48, 0.3)',
                    }}>
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Neudela AI Generation
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        Neural Token Synthesis Engine
                      </div>
                    </div>
                  </div>
                  <NeuronBadge size="sm" variant="brand" dot>
                    Synthesizing
                  </NeuronBadge>
                </div>

                {/* Card Body with Radial Meter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{
                    position: 'relative',
                    filter: 'drop-shadow(0 4px 12px rgba(223, 126, 48, 0.2))',
                    flexShrink: 0,
                  }}>
                    <NeuronProgress type="circle" value={animVal72} size="md" variant="brand" showValue label="Tokens" />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Compiling Design Tokens
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
                        Exporting typography scales, HSL variables, and JSON schema…
                      </div>
                    </div>

                    {/* Telemetry Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--brand-100, #fdf7ed)',
                        color: 'var(--brand-700, #a23c1b)',
                        border: '1px solid var(--brand-200, #f1ce96)',
                      }}>
                        <Zap size={11} style={{ color: 'var(--brand-500)' }} /> 4,820 tokens/s
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--color-bg-subtle)',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border)',
                      }}>
                        <Activity size={11} style={{ color: 'var(--emerald-500)' }} /> 99.4% precision
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-task Mini Progress Bar */}
                <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: 6 }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Vector Quantization</span>
                    <span style={{ color: 'var(--brand-600)', fontWeight: 700 }}>72%</span>
                  </div>
                  <NeuronProgress type="bar" value={animVal72} size="xs" variant="brand" animated={false} />
                </div>
              </NeuronCard>

              {/* Pattern 5: Circular OTP / Live Countdown Timer */}
              <NeuronCard variant="elevated" padding="lg" hoverable>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>Security Verification</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>OTP code expires shortly</div>
                  </div>
                  <Clock size={16} style={{ color: 'var(--color-text-secondary)' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                    <svg width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="32" cy="32" r="26" fill="none" stroke="var(--color-border)" strokeWidth="5" />
                      <circle cx="32" cy="32" r="26" fill="none" stroke={secondsLeft < 15 ? 'var(--red-500)' : 'var(--brand-500)'} strokeWidth="5" strokeLinecap="round" strokeDasharray={2 * Math.PI * 26} strokeDashoffset={2 * Math.PI * 26 * (1 - secondsLeft / 60)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: secondsLeft < 15 ? 'var(--red-600)' : 'var(--color-text-primary)' }}>
                      {secondsLeft}s
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>Code sent to iqbal@neudela.design</div>
                    <button
                      onClick={() => setSecondsLeft(60)}
                      disabled={secondsLeft > 0}
                      style={{
                        marginTop: 6,
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: secondsLeft === 0 ? 'var(--brand-600)' : 'var(--color-text-tertiary)',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: secondsLeft === 0 ? 'pointer' : 'not-allowed',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      <RefreshCw size={11} /> Resend OTP
                    </button>
                  </div>
                </div>
              </NeuronCard>

              {/* Pattern 6: Sprint Velocity & Task Completion (Linear Style) */}
              <NeuronCard variant="elevated" padding="lg" hoverable>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>Sprint 24 Velocity</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>28 of 34 issues resolved (82%)</div>
                  </div>
                  <NeuronBadge size="sm" variant="success">On Track</NeuronBadge>
                </div>

                <NeuronProgress type="bar" value={82} size="md" variant="brand" showValue />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--color-border)', fontSize: '11px' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Target: 4 days remaining</span>
                  <span style={{ fontWeight: 600, color: 'var(--emerald-600)' }}>▲ 4 issues ahead</span>
                </div>
              </NeuronCard>

            </div>
          </div>

          {/* ── 3. ANATOMY DIAGRAM ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <div>
                <h2 className="section-title" style={{ margin: 0 }}>Anatomy</h2>
                <p className="section-description" style={{ margin: '4px 0 0 0' }}>
                  Labelled slot architecture and precision blueprints for both Linear Bar and Radial Circle/Gauge indicators.
                </p>
              </div>

              {/* Anatomy Sub-Tab Switcher */}
              <div style={{
                display: 'inline-flex',
                padding: '3px',
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                gap: 2,
              }}>
                <button
                  type="button"
                  onClick={() => setAnatomyTab('bar')}
                  style={{
                    padding: '5px 12px',
                    fontSize: '11px',
                    fontWeight: anatomyTab === 'bar' ? 700 : 500,
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: anatomyTab === 'bar' ? 'var(--color-bg-surface)' : 'transparent',
                    color: anatomyTab === 'bar' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    boxShadow: anatomyTab === 'bar' ? 'var(--shadow-xs)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Linear Bar
                </button>
                <button
                  type="button"
                  onClick={() => setAnatomyTab('circle')}
                  style={{
                    padding: '5px 12px',
                    fontSize: '11px',
                    fontWeight: anatomyTab === 'circle' ? 700 : 500,
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: anatomyTab === 'circle' ? 'var(--color-bg-surface)' : 'transparent',
                    color: anatomyTab === 'circle' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    boxShadow: anatomyTab === 'circle' ? 'var(--shadow-xs)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Circle & Gauge
                </button>
              </div>
            </div>

            <div className="anatomy-diagram" style={{ marginTop: 'var(--space-6)' }}>
              
              {/* ── Blueprint 1: Linear Progress Bar ── */}
              {anatomyTab === 'bar' && (
                <>
                  <div className="anatomy-preview" style={{ minHeight: '300px', padding: 'var(--space-8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                      position: 'relative',
                      width: '520px',
                      height: '220px',
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xl)',
                      boxShadow: 'var(--shadow-xs)',
                      overflow: 'hidden',
                    }}>
                      {/* SVG Precision Orthogonal Connector Lines */}
                      <svg width="520" height="220" viewBox="0 0 520 220" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                        {/* 1: Context Label (Top Left Elbow) */}
                        <polyline points="59,52 59,88 76,88" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                        <circle cx="76" cy="88" r="2.5" fill="var(--color-text-primary)" />

                        {/* 2: Value Readout (Top Right Elbow) */}
                        <polyline points="461,52 461,88 444,88" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                        <circle cx="444" cy="88" r="2.5" fill="var(--color-text-primary)" />

                        {/* 3: Active Progress Fill (Bottom Left Straight Up) */}
                        <line x1="181" y1="172" x2="181" y2="114" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                        <circle cx="181" cy="114" r="2.5" fill="var(--color-text-primary)" />

                        {/* 4: Track Background (Bottom Right Straight Up) */}
                        <line x1="390" y1="172" x2="390" y2="114" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                        <circle cx="390" cy="114" r="2.5" fill="var(--color-text-primary)" />
                      </svg>

                      {/* Numbered Markers */}
                      <span className="anatomy-marker" style={{ position: 'absolute', top: '30px', left: '48px', zIndex: 20 }}>1</span>
                      <span className="anatomy-marker" style={{ position: 'absolute', top: '30px', right: '48px', zIndex: 20 }}>2</span>
                      <span className="anatomy-marker" style={{ position: 'absolute', bottom: '24px', left: '170px', zIndex: 20 }}>3</span>
                      <span className="anatomy-marker" style={{ position: 'absolute', bottom: '24px', right: '120px', zIndex: 20 }}>4</span>

                      {/* Centered Component Specimen */}
                      <div style={{ position: 'absolute', left: '80px', top: '78px', width: '360px' }}>
                        <NeuronProgress type="bar" value={72} size="md" label="Storage used" showValue variant="brand" animated={false} />
                      </div>
                    </div>
                  </div>

                  <div className="anatomy-labels">
                    <AnatomyLabel number={1} label="Context Label Slot" desc="Header title describing the associated task, file, or resource." />
                    <AnatomyLabel number={2} label="Value Readout" desc="Percentage integer representing current numerical status." />
                    <AnatomyLabel number={3} label="Active Progress Fill" desc="Dynamic visual bar indicating completed portion with brand token." />
                    <AnatomyLabel number={4} label="Track Background Channel" desc="Full-length rail base representing 100% capacity." />
                  </div>
                </>
              )}

              {/* ── Blueprint 2: Progress Circle & Gauge ── */}
              {anatomyTab === 'circle' && (
                <>
                  <div className="anatomy-preview" style={{ minHeight: '300px', padding: 'var(--space-8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                      position: 'relative',
                      width: '520px',
                      height: '240px',
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xl)',
                      boxShadow: 'var(--shadow-xs)',
                      overflow: 'hidden',
                    }}>
                      {/* SVG Precision Orthogonal Connector Lines */}
                      <svg width="520" height="240" viewBox="0 0 520 240" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                        {/* 1: Active Stroke Arc (Top Left Elbow to Circle Stroke) */}
                        <polyline points="42,46 95,46 95,84" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                        <circle cx="95" cy="84" r="2.5" fill="var(--color-text-primary)" />

                        {/* 2: Track Base Ring (Top Right Elbow to Gauge Track) */}
                        <polyline points="476,50 400,50 400,125" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                        <circle cx="400" cy="125" r="2.5" fill="var(--color-text-primary)" />

                        {/* 3: Center Context Label (Straight Down to Text) */}
                        <line x1="134" y1="40" x2="134" y2="98" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                        <circle cx="134" cy="98" r="2.5" fill="var(--color-text-primary)" />

                        {/* 4: Primary Value Readout (Straight Up to Number) */}
                        <line x1="134" y1="200" x2="134" y2="140" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                        <circle cx="134" cy="140" r="2.5" fill="var(--color-text-primary)" />
                      </svg>

                      {/* Numbered Markers */}
                      <span className="anatomy-marker" style={{ position: 'absolute', top: '35px', left: '20px', zIndex: 20 }}>1</span>
                      <span className="anatomy-marker" style={{ position: 'absolute', top: '39px', right: '20px', zIndex: 20 }}>2</span>
                      <span className="anatomy-marker" style={{ position: 'absolute', top: '18px', left: '123px', zIndex: 20 }}>3</span>
                      <span className="anatomy-marker" style={{ position: 'absolute', bottom: '18px', left: '123px', zIndex: 20 }}>4</span>

                      {/* Circle Specimen (Left) */}
                      <div style={{ position: 'absolute', left: '80px', top: '66px' }}>
                        <NeuronProgress type="circle" value={72} size="md" label="Active users" showValue animated={false} />
                      </div>

                      {/* Gauge Specimen (Right) */}
                      <div style={{ position: 'absolute', left: '310px', top: '108px' }}>
                        <NeuronProgress type="half-circle" value={72} size="md" label="Active users" showValue animated={false} />
                      </div>
                    </div>
                  </div>

                  <div className="anatomy-labels">
                    <AnatomyLabel number={1} label="Active Stroke Arc" desc="SVG dashoffset stroke representing proportional progress." />
                    <AnatomyLabel number={2} label="Track Base Ring" desc="Neutral background stroke indicating full 360° or 180° range." />
                    <AnatomyLabel number={3} label="Center Context Label" desc="Supporting text situated above or at the base of the readout." />
                    <AnatomyLabel number={4} label="Primary Value Readout" desc="High-contrast bold numerical percentage counter." />
                  </div>
                </>
              )}

            </div>
          </div>

          {/* ── 4. STATES ── */}
          <div className="section-card">
            <h2 className="section-title">States</h2>
            <p className="section-description">Interactive and static visual states of the Progress Indicator component.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
              {[
                { title: 'Default Bar', node: <NeuronProgress type="bar" value={65} size="md" label="Completion" showValue /> },
                { title: 'With Start Pin', node: <NeuronProgress type="bar" value={48} size="md" showPin showValue valuePosition="right" /> },
                { title: 'Striped Fill', node: <NeuronProgress type="bar" value={70} size="lg" striped label="Upload progress" showValue /> },
                { title: 'Indeterminate Bar', node: <NeuronProgress type="bar" size="md" indeterminate label="Processing server task…" /> },
                { title: 'Indeterminate Circle', node: <NeuronProgress type="circle" size="md" indeterminate showValue /> },
                { title: '0% — Empty', node: <NeuronProgress type="bar" value={0} size="md" label="Not started" showValue /> },
                { title: '100% — Complete', node: <NeuronProgress type="bar" value={100} size="md" label="Completed" showValue variant="success" /> },
                { title: 'Warning Threshold', node: <NeuronProgress type="bar" value={82} size="md" label="Memory usage" showValue variant="warning" /> },
                { title: 'Error / Exceeded', node: <NeuronProgress type="bar" value={98} size="md" label="Disk quota exceeded" showValue variant="error" /> },
              ].map((s, i) => (
                <div key={i} style={{ padding: 'var(--space-5)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', background: 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.title}</div>
                  {s.node}
                </div>
              ))}
            </div>
          </div>

          {/* ── 5. DO'S & DON'TS ── */}
          <div className="section-card">
            <h2 className="section-title">Do's & Don'ts</h2>
            <p className="section-description">Practical visual guidelines for implementing progress indicators consistently across UI workflows.</p>

            <div className="dos-donts-grid" style={{ marginTop: 'var(--space-6)' }}>
              
              {/* Pair 1: Completion State Feedback */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ width: '100%', maxWidth: 280, padding: 12, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                    <NeuronProgress type="bar" value={100} size="sm" variant="success" label="Export completed" showValue animated={false} />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">Switch to success variant upon 100% completion</div>
                  <div className="rule-card__desc">
                    Always transition the progress fill to green (`variant="success"`) when an operation hits 100% to provide immediate, positive closure to the user.
                  </div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ width: '100%', maxWidth: 280, padding: 12, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                    <NeuronProgress type="bar" value={100} size="sm" variant="brand" label="Export completed" showValue animated={false} />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">Don't leave finished bars in brand/neutral color</div>
                  <div className="rule-card__desc">
                    Leaving a 100% full progress bar in orange or gray causes ambiguity, making users question whether the process is still running or finished.
                  </div>
                </div>
              </RuleCard>

              {/* Pair 2: Indeterminate vs 0% Frozen */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ width: '100%', maxWidth: 280, padding: 12, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                    <NeuronProgress type="bar" size="sm" indeterminate label="Provisioning instance…" />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">Use indeterminate animation for unknown duration</div>
                  <div className="rule-card__desc">
                    When download stream sizes or asynchronous server response times cannot be measured, use the looping indeterminate shimmer.
                  </div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ width: '100%', maxWidth: 280, padding: 12, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                    <NeuronProgress type="bar" value={0} size="sm" label="Provisioning instance…" showValue animated={false} />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">Don't show a frozen 0% bar while awaiting response</div>
                  <div className="rule-card__desc">
                    A static 0% bar gives no feedback of system activity and often tricks users into assuming the network request has failed or crashed.
                  </div>
                </div>
              </RuleCard>

              {/* Pair 3: Layout Density & Proportions */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ width: '100%', maxWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Storage</span>
                      <div style={{ flex: 1, maxWidth: 120 }}>
                        <NeuronProgress type="bar" value={65} size="xs" variant="brand" animated={false} />
                      </div>
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginLeft: 8 }}>6.5 GB</span>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">Use compact sizes (xs / sm) in dense table rows</div>
                  <div className="rule-card__desc">
                    Keep progress indicators subtle and aligned with typography height in compact tables, cards, and list item rows.
                  </div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ width: '100%', maxWidth: 280, padding: '8px 12px', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>Storage</span>
                    <NeuronProgress type="bar" value={65} size="xl" variant="brand" animated={false} />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">Don't use oversized xl bars in cramped dashboard tiles</div>
                  <div className="rule-card__desc">
                    Thick `xl` bars dominate layout hierarchy and displace adjacent data points when used inside compact container modules.
                  </div>
                </div>
              </RuleCard>

              {/* Pair 4: Semantic Context & Controls */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ width: '100%', maxWidth: 280, padding: 12, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                    <NeuronProgress type="bar" value={92} size="sm" variant="error" label="Quota limit warning" showValue animated={false} />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">Use warning / error variants when reaching thresholds</div>
                  <div className="rule-card__desc">
                    Switch indicator colors dynamically as consumption crosses 80% (Warning) and 90%+ (Error) to signal critical capacity limits.
                  </div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
                  <div style={{ width: '100%', maxWidth: 280, padding: 12, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                    <NeuronProgress type="bar" value={100} size="sm" variant="brand" label="Dark mode: Enabled" showValue animated={false} />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">Don't use progress bars for binary toggle settings</div>
                  <div className="rule-card__desc">
                    Binary on/off states must use Switch / Toggle controls instead of progress bars, which represent continuous quantitative values.
                  </div>
                </div>
              </RuleCard>

            </div>
          </div>

          {/* ── 6. API REFERENCE ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.apiReference}</h2>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr><th>{t.compShared.prop}</th><th>{t.compShared.type}</th><th>{t.compShared.default}</th><th>{t.compShared.description}</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>type</code></td><td><code>'bar' | 'circle' | 'half-circle'</code></td><td><code>'bar'</code></td><td>Visual shape: linear bar, radial circle, or semi-circle gauge.</td></tr>
                  <tr><td><code>value</code></td><td><code>number</code></td><td><code>0</code></td><td>Progress value from 0 to 100.</td></tr>
                  <tr><td><code>size</code></td><td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td><td><code>'md'</code></td><td>Controls bar height or circle outer diameter.</td></tr>
                  <tr><td><code>variant</code></td><td><code>'brand' | 'success' | 'warning' | 'error' | 'info' | 'neutral'</code></td><td><code>'brand'</code></td><td>Semantic color token palette.</td></tr>
                  <tr><td><code>showValue</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Displays percentage readout text.</td></tr>
                  <tr><td><code>valuePosition</code></td><td><code>'top' | 'right' | 'bubble'</code></td><td><code>'top'</code></td><td>Where to render the value (above, beside, or inside a floating bubble).</td></tr>
                  <tr><td><code>label</code></td><td><code>string</code></td><td><code>—</code></td><td>Supporting context text (e.g. Active users, Storage used).</td></tr>
                  <tr><td><code>showPin</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Renders a leading anchor dot pin at the start of the bar.</td></tr>
                  <tr><td><code>animated</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Smooth transition easing when value changes.</td></tr>
                  <tr><td><code>striped</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Diagonal stripe pattern on progress fill (bar only).</td></tr>
                  <tr><td><code>indeterminate</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Continuous looping animation for unknown task durations.</td></tr>
                  <tr><td><code>ariaLabel</code></td><td><code>string</code></td><td><code>label ?? 'Progress'</code></td><td>Accessible ARIA label for screen readers.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 2: PLAYBOOK
      ═══════════════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">

          {/* 1. File Upload Simulation */}
          <div className="section-card">
            <h2 className="section-title">File Upload Progress</h2>
            <p className="section-description">Interactive upload experience with striped animation and real-time state transitions.</p>
            <div style={{ maxWidth: 480, marginTop: 'var(--space-5)' }}>
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: uploadProgress === 100 ? 'var(--emerald-50, #ecfdf5)' : 'var(--brand-50, #fdf7ed)',
                    color: uploadProgress === 100 ? 'var(--emerald-600)' : 'var(--brand-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}>
                    {uploadProgress === 100 ? <CheckCircle2 size={20} /> : <Upload size={18} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>neudela-tokens-v2.4.fig</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 1 }}>
                      {uploadProgress === 0
                        ? '34.8 MB · Figma specification'
                        : uploadProgress === 100
                        ? '34.8 MB · Upload completed successfully'
                        : `${(34.8 * uploadProgress / 100).toFixed(1)} MB of 34.8 MB (${uploadProgress}%) · 4.2 MB/s`}
                    </div>
                  </div>
                  {uploading && (
                    <RefreshCw size={16} style={{ color: 'var(--brand-500)', animation: 'spin 1s linear infinite' }} />
                  )}
                </div>

                <NeuronProgress
                  type="bar"
                  value={uploadProgress}
                  size="md"
                  variant={uploadProgress === 100 ? 'success' : uploadProgress > 85 ? 'warning' : 'brand'}
                  striped={uploading && uploadProgress < 100}
                  showValue
                  label={uploadProgress === 100 ? 'Upload completed' : uploading ? 'Transferring payload…' : 'Ready to upload'}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                    {uploading ? 'Do not close this tab during upload' : uploadProgress === 100 ? 'Encrypted via TLS 1.3' : 'Click to begin transmission'}
                  </span>
                  <NeuronButton
                    variant={uploadProgress === 100 ? 'outline' : 'primary'}
                    size="sm"
                    onClick={runUpload}
                    disabled={uploading}
                  >
                    {uploadProgress === 100 ? 'Upload again' : uploading ? `Uploading ${uploadProgress}%…` : 'Start upload'}
                  </NeuronButton>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Dashboard Metric Cards */}
          <div className="section-card">
            <h2 className="section-title">Dashboard Metric Cards</h2>
            <p className="section-description">Radial circles and gauge meters used in telemetry analytics and KPI cards.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
              {[
                { circle: <NeuronProgress type="circle" value={animVal72} size="md" variant="brand" showValue label="Users" />, title: 'Active Users', value: '8,421', meta: '▲ 12% this week', metaColor: 'var(--emerald-600)' },
                { circle: <NeuronProgress type="circle" value={animVal48} size="md" variant="info" showValue label="Used" />, title: 'Storage Used', value: '24 GB', meta: 'of 50 GB total', metaColor: 'var(--color-text-secondary)' },
                { circle: <NeuronProgress type="half-circle" value={animVal91} size="md" variant="success" showValue label="SLA" />, title: 'SLA Uptime', value: '99.97%', meta: 'All systems nominal', metaColor: 'var(--emerald-600)' },
              ].map((c, i) => (
                <div key={i} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 16 }}>
                  {c.circle}
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{c.title}</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{c.value}</div>
                    <div style={{ fontSize: '11px', color: c.metaColor, fontWeight: 600, marginTop: 2 }}>{c.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Multi-step Onboarding */}
          <div className="section-card">
            <h2 className="section-title">Multi-step Onboarding</h2>
            <p className="section-description">Stacked progress bars tracking individual task completion in a setup checklist.</p>
            <div style={{ maxWidth: 500, marginTop: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { icon: <ShieldCheck size={14} />, label: 'Account verified', value: 100, variant: 'success' as const },
                { icon: <Users size={14} />, label: 'Invite team members', value: 60, variant: 'brand' as const },
                { icon: <Zap size={14} />, label: 'Connect integrations', value: 33, variant: 'warning' as const },
                { icon: <BarChart2 size={14} />, label: 'Configure analytics', value: 0, variant: 'neutral' as const },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: step.value === 100 ? 'var(--emerald-50)' : step.value === 0 ? 'var(--color-bg-subtle)' : 'var(--brand-50)', color: step.value === 100 ? 'var(--emerald-600)' : step.value === 0 ? 'var(--color-text-tertiary)' : 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {step.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <NeuronProgress type="bar" value={step.value} size="sm" variant={step.variant} label={step.label} showValue />
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--color-border)', fontSize: '12px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Overall progress</span>
                <NeuronProgress type="bar" value={48} size="xs" style={{ width: 120 }} variant="brand" />
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>2 / 4 done</span>
              </div>
            </div>
          </div>

          {/* 4. System Status Panel */}
          <div className="section-card">
            <h2 className="section-title">System Status Panel</h2>
            <p className="section-description">Infrastructure resource monitor with live semantic threshold indicators.</p>
            <div style={{ maxWidth: 520, marginTop: 'var(--space-5)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-500)', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }} />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>sin1 — Jakarta · All systems operational</span>
                <NeuronBadge size="sm" variant="success" style={{ marginLeft: 'auto' }}>Healthy</NeuronBadge>
              </div>
              {[
                { label: 'CPU Usage',  value: 28, variant: 'success' as const, icon: <Zap size={13} /> },
                { label: 'Memory',     value: 64, variant: 'warning' as const, icon: <BarChart2 size={13} /> },
                { label: 'Disk I/O',   value: 41, variant: 'brand' as const,   icon: <Download size={13} /> },
                { label: 'Network In', value: 17, variant: 'info' as const,     icon: <Wifi size={13} /> },
                { label: 'Error Rate', value: 3,  variant: 'error' as const,    icon: <AlertTriangle size={13} /> },
              ].map((row, i, arr) => (
                <div key={i} style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--color-bg-subtle)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{row.icon}</div>
                  <div style={{ flex: 1 }}><NeuronProgress type="bar" value={row.value} size="sm" variant={row.variant} label={row.label} showValue /></div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Profile & Skill Bars */}
          <div className="section-card">
            <h2 className="section-title">Profile & Skill Bars</h2>
            <p className="section-description">Competency rating cards designed for portfolios and talent management systems.</p>
            <div style={{ maxWidth: 460, marginTop: 'var(--space-5)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=faces" alt="Profile" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>Iqbal Dzulfikar</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Lead Product Designer · Neudela</div>
                </div>
                <NeuronBadge size="sm" variant="brand" style={{ marginLeft: 'auto' }}>Pro</NeuronBadge>
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { skill: 'Design Systems & Tokens', level: 96 },
                  { skill: 'Figma Architecture', level: 92 },
                  { skill: 'React / TypeScript', level: 82 },
                  { skill: 'Accessibility (WCAG 2.1)', level: 88 },
                  { skill: 'Motion & Micro-interactions', level: 75 },
                ].map((s, i) => (
                  <NeuronProgress key={i} type="bar" value={s.level} size="md" label={s.skill} showValue variant="brand" />
                ))}
              </div>
            </div>
          </div>

          {/* 6. Interactive Playground */}
          <div className="section-card">
            <h2 className="section-title">NeuronProgress {t.compShared.playground}</h2>
            <Playground
              name="NeuronProgress"
              previewStyle={{ background: 'var(--color-bg-surface, #ffffff)' }}
              knobs={[
                { name: 'type',          type: 'select',  options: ['bar', 'circle', 'half-circle'],                                     default: 'bar',     label: 'Type' },
                { name: 'value',         type: 'number',  default: 65,                                                                                       label: 'Value (0–100)' },
                { name: 'size',          type: 'select',  options: ['xs', 'sm', 'md', 'lg', 'xl'],                                       default: 'md',      label: 'Size' },
                { name: 'variant',       type: 'select',  options: ['brand','success','warning','error','info','neutral'],                default: 'brand',   label: 'Variant' },
                { name: 'showValue',     type: 'boolean', default: true,                                                                                      label: 'Show Value' },
                { name: 'valuePosition', type: 'select',  options: ['top', 'right', 'bubble'],                                            default: 'top',     label: 'Value Position (bar)' },
                { name: 'label',         type: 'text',    default: 'Storage used',                                                                           label: 'Label' },
                { name: 'showPin',       type: 'boolean', default: false,                                                                                     label: 'Show Start Pin (bar)' },
                { name: 'striped',       type: 'boolean', default: false,                                                                                     label: 'Striped (bar)' },
                { name: 'indeterminate', type: 'boolean', default: false,                                                                                     label: 'Indeterminate' },
              ]}
              codeTemplates={(knobs) => {
                const rp: string[] = [];
                if (knobs.type !== 'bar')             rp.push(`type="${knobs.type}"`);
                if (Number(knobs.value) !== 65)       rp.push(`value={${knobs.value}}`);
                if (knobs.size !== 'md')              rp.push(`size="${knobs.size}"`);
                if (knobs.variant !== 'brand')        rp.push(`variant="${knobs.variant}"`);
                if (knobs.showValue)                  rp.push(`showValue`);
                if (knobs.valuePosition !== 'top' && knobs.type === 'bar') rp.push(`valuePosition="${knobs.valuePosition}"`);
                if (knobs.label)                      rp.push(`label="${knobs.label}"`);
                if (knobs.showPin && knobs.type === 'bar') rp.push(`showPin`);
                if (knobs.striped && knobs.type === 'bar') rp.push(`striped`);
                if (knobs.indeterminate)              rp.push(`indeterminate`);
                const attr = rp.length ? ` ${rp.join(' ')}` : '';
                return {
                  react: `<NeuronProgress${attr} />`,
                  vue:   `<NeuronProgress${attr} />`,
                  html:  `<div class="neuron-progress neuron-progress--${knobs.type} neuron-progress--${knobs.size} neuron-progress--${knobs.variant}" role="progressbar" aria-valuenow="${knobs.value}" aria-valuemin="0" aria-valuemax="100"></div>`,
                };
              }}
            >
              {(knobs) => (
                <div style={{ width: knobs.type === 'bar' ? '100%' : 'auto', maxWidth: 420, padding: 16, display: 'flex', justifyContent: 'center' }}>
                  <NeuronProgress
                    type={knobs.type as NeuronProgressType}
                    value={Number(knobs.value)}
                    size={knobs.size as NeuronProgressSize}
                    variant={knobs.variant as NeuronProgressVariant}
                    showValue={!!knobs.showValue}
                    valuePosition={knobs.valuePosition as any}
                    label={knobs.label as string || undefined}
                    showPin={!!knobs.showPin}
                    striped={!!knobs.striped}
                    indeterminate={!!knobs.indeterminate}
                  />
                </div>
              )}
            </Playground>
          </div>

        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-input', label: t.nav.compInput }}
        next={{ id: 'comp-radio', label: t.nav.compRadio }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
