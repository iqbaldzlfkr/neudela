import React, { useState } from 'react';
import NeuronTooltip, { NeuronTooltipPlacement, NeuronTooltipVariant, NeuronTooltipSize } from '../components/NeuronTooltip';
import NeuronButton from '../components/NeuronButton';
import NeuronBadge from '../components/NeuronBadge';
import NeuronInput from '../components/NeuronInput';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import {
  Info, Edit2, Trash2, Copy, Download, Share2, Lock, Settings, Star,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link, Image, Table, Code, List, Eye, ZoomIn, ZoomOut, RotateCcw,
  ChevronRight, ShieldCheck, Mail, HelpCircle, Users, Activity,
  AlertTriangle, CheckCircle, XCircle, ExternalLink, Bookmark, MoreHorizontal,
  User, Filter, Search, Pencil, Send, ArrowUpRight, Sparkles, Layers,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpLeft, ArrowDownLeft,
  ArrowDownRight, Compass, Crosshair
} from 'lucide-react';

interface TooltipViewProps {
  setActiveTab: (tab: string) => void;
}

// ─── Sub-components ────────────────────────────────────────────────────────

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

// ─── Icon button helper ────────────────────────────────────────────────────
function TbBtn({ icon, label, variant = 'dark', placement = 'top' }: {
  icon: React.ReactNode;
  label: string;
  variant?: NeuronTooltipVariant;
  placement?: NeuronTooltipPlacement;
}) {
  return (
    <NeuronTooltip content={label} variant={variant} placement={placement} delay={150}>
      <button
        aria-label={label}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 34, height: 34, borderRadius: 8, background: 'none',
          border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)',
          cursor: 'pointer', transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-subtle)';
          (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-hover)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'none';
          (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
        }}
      >
        {icon}
      </button>
    </NeuronTooltip>
  );
}

// ─── Main View ─────────────────────────────────────────────────────────────
export default function TooltipView({ setActiveTab }: TooltipViewProps) {
  const { t } = useLanguage();
  const gl = t.tooltip.guideline;

  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');

  // Placement Compass interactive state
  const [compassPlacement, setCompassPlacement] = useState<NeuronTooltipPlacement>('top');
  const [compassVariant, setCompassVariant] = useState<NeuronTooltipVariant>('dark');
  const [placementFilter, setPlacementFilter] = useState<'all' | 'top' | 'bottom' | 'left' | 'right'>('all');
  const [manualTriggerOpen, setManualTriggerOpen] = useState(false);

  // Onboarding step state
  const [onboardStep, setOnboardStep] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);

  // Member table data
  const tableMembers = [
    { name: 'Iqbal Dzulfikar', role: 'Lead Designer', email: 'iqbal@neudela.design', dept: 'Design System', status: 'online' },
    { name: 'Sophia Sterling', role: 'Product Designer', email: 'sophia@neudela.design', dept: 'Product', status: 'busy' },
    { name: 'Marcus Vance', role: 'Frontend Engineer', email: 'marcus@neudela.design', dept: 'Engineering', status: 'away' },
    { name: 'Aria Hayes', role: 'Content Strategist', email: 'aria@neudela.design', dept: 'Content', status: 'online' },
  ];

  const STATUS_COLOR: Record<string, string> = { online: '#10b981', busy: '#ef4444', away: '#f59e0b', offline: '#6b7280' };

  const PLACEMENTS: NeuronTooltipPlacement[] = [
    'top-start', 'top', 'top-end',
    'left-start', '', 'right-start',
    'left', '', 'right',
    'left-end', '', 'right-end',
    'bottom-start', 'bottom', 'bottom-end',
  ] as NeuronTooltipPlacement[];

  const VARIANTS: { key: NeuronTooltipVariant; label: string; desc: string }[] = [
    { key: 'dark', label: gl.variantDark, desc: gl.variantDarkDesc },
    { key: 'light', label: gl.variantLight, desc: gl.variantLightDesc },
    { key: 'brand', label: gl.variantBrand, desc: gl.variantBrandDesc },
    { key: 'success', label: gl.variantSuccess, desc: gl.variantSuccessDesc },
    { key: 'warning', label: gl.variantWarning, desc: gl.variantWarningDesc },
    { key: 'danger', label: gl.variantDanger, desc: gl.variantDangerDesc },
  ];

  const onboardingSteps = [
    { title: 'Welcome to Neudela!', body: 'This is your design system hub. Let\'s take a quick tour of the key features.', color: 'var(--color-primary)' },
    { title: 'Component Library', body: 'Browse 40+ production-ready components, all with full Figma specs and API docs.', color: '#7c3aed' },
    { title: 'Figma Integration', body: 'Every component syncs with your Figma library. Click to open the design file.', color: '#059669' },
    { title: 'You\'re all set! 🎉', body: 'Start building! Use the sidebar to explore components, patterns, and foundations.', color: '#0ea5e9' },
  ];

  return (
    <div className="tooltip-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.tooltip.pageTitle}</h1>
            <p className="page-subtitle">{t.tooltip.pageSubtitle}</p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`} onClick={() => setTab('guideline')}>
            {gl.tabName}
          </button>
          <button className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`} onClick={() => setTab('playbook')}>
            {gl.playbookTabName}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TAB 1: GUIDELINE
      ══════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">

          {/* ── 1. OVERVIEW & VARIANT MATRIX ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.overviewTitle}</h2>
            <p className="section-description">{gl.overviewDesc}</p>

            {/* Variant Matrix Table */}
            <div style={{ marginTop: 'var(--space-6)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px repeat(3, 1fr)', padding: '10px 20px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span>Variant</span>
                <span style={{ textAlign: 'center' }}>Title Only (12px SemiBold)</span>
                <span style={{ textAlign: 'center' }}>Title + Supporting Text</span>
                <span style={{ textAlign: 'center' }}>Supporting Text Only (12px Regular)</span>
              </div>

              {/* Rows */}
              {VARIANTS.map((v, i) => (
                <div key={v.key} style={{ display: 'grid', gridTemplateColumns: '130px repeat(3, 1fr)', padding: '16px 20px', borderBottom: i < VARIANTS.length - 1 ? '1px solid var(--color-border)' : 'none', alignItems: 'center', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{v.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: 2, lineHeight: 1.4 }}>{v.desc}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                    <NeuronTooltip title="⌘K Shortcut" variant={v.key} placement="top">
                      <NeuronButton variant="secondary" size="sm">⌘K</NeuronButton>
                    </NeuronTooltip>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                    <NeuronTooltip title="Save Changes" description="Syncs local modifications to the cloud repository." variant={v.key} placement="top">
                      <NeuronButton variant="secondary" size="sm">Save</NeuronButton>
                    </NeuronTooltip>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                    <NeuronTooltip description="This action will permanently delete the selected file." variant={v.key} placement="top">
                      <NeuronButton variant="secondary" size="sm">Delete File</NeuronButton>
                    </NeuronTooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2. ANATOMY ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.anatomyTitle}</h2>
            <p className="section-description">{gl.anatomyDesc}</p>

            <div className="anatomy-diagram">
              <div className="anatomy-preview" style={{ minHeight: '320px', padding: 'var(--space-8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Precision Blueprint Diagram Frame */}
                <div style={{ 
                  position: 'relative', 
                  width: '520px',
                  height: '260px',
                  background: 'var(--color-bg-surface)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xs)',
                  overflow: 'visible'
                }}>
                  
                  {/* SVG Precision Connector Lines & Pointers */}
                  <svg 
                    width="520" 
                    height="260" 
                    viewBox="0 0 520 260" 
                    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}
                  >
                    {/* Marker 1: Trigger Element (Left straight to Button) */}
                    <line x1="60" y1="160" x2="190" y2="160" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Marker 2: Tooltip Bubble (Left straight to Bubble) */}
                    <line x1="60" y1="115" x2="170" y2="115" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Marker 3: Directional Caret / Arrow (Right angled to Caret Tip) */}
                    <polyline points="450,121 340,121 268,138" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Marker 4: Offset Spacing Gap (Right angled to 4px Gap Badge) */}
                    <polyline points="450,171 365,171 365,134 350,134" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Marker 5: Viewport Clamping Boundary (Right straight to Safe Box) */}
                    <line x1="450" y1="52" x2="375" y2="52" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Gap dimension tick marks & ruler (Standard 4px gap) */}
                    <line x1="288" y1="138" x2="304" y2="138" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="288" y1="142" x2="304" y2="142" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="296" y1="138" x2="296" y2="142" stroke="var(--color-primary)" strokeWidth="1.5" />
                  </svg>

                  {/* Safe Viewport Boundary Box */}
                  <div style={{
                    position: 'absolute',
                    left: '145px',
                    top: '38px',
                    width: '230px',
                    height: '180px',
                    border: '1px dashed rgba(223, 126, 48, 0.4)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(223, 126, 48, 0.02)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}>
                    <span style={{
                      position: 'absolute',
                      right: '8px',
                      top: '6px',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      Viewport Bound
                    </span>
                  </div>

                  {/* Target Tooltip Bubble Component Target situated at (170px, 98px) */}
                  <div style={{
                    position: 'absolute',
                    left: '170px',
                    top: '98px',
                    width: '180px',
                    zIndex: 5
                  }}>
                    <div style={{
                      background: '#1a1a2e',
                      color: '#f0f0f8',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 500,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.30)',
                      textAlign: 'center',
                      position: 'relative',
                      whiteSpace: 'nowrap'
                    }}>
                      Save changes (⌘S)
                      {/* Arrow / Directional Caret */}
                      <span 
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          bottom: -6,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid #1a1a2e'
                        }} 
                      />
                    </div>
                  </div>

                  {/* 4px Gap Badge Indicator */}
                  <div style={{
                    position: 'absolute',
                    left: '308px',
                    top: '122px',
                    zIndex: 6
                  }}>
                    <span style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 600,
                      color: 'var(--color-primary)',
                      background: 'rgba(223,126,48,0.12)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid rgba(223,126,48,0.25)',
                      whiteSpace: 'nowrap'
                    }}>
                      4px gap
                    </span>
                  </div>

                  {/* Target Trigger Element (Button) situated at (190px, 142px) */}
                  <div style={{
                    position: 'absolute',
                    left: '190px',
                    top: '142px',
                    zIndex: 5
                  }}>
                    <NeuronButton variant="secondary" size="md">
                      Save Changes
                    </NeuronButton>
                  </div>

                  {/* Marker 1: Trigger Element (Bottom-Left) */}
                  <div style={{ position: 'absolute', left: '38px', top: '149px', zIndex: 20 }}>
                    <span className="anatomy-marker">1</span>
                  </div>

                  {/* Marker 2: Tooltip Bubble (Top-Left) */}
                  <div style={{ position: 'absolute', left: '38px', top: '104px', zIndex: 20 }}>
                    <span className="anatomy-marker">2</span>
                  </div>

                  {/* Marker 3: Directional Caret / Arrow (Middle-Right) */}
                  <div style={{ position: 'absolute', left: '450px', top: '110px', zIndex: 20 }}>
                    <span className="anatomy-marker">3</span>
                  </div>

                  {/* Marker 4: Offset Spacing Gap (Bottom-Right) */}
                  <div style={{ position: 'absolute', left: '450px', top: '160px', zIndex: 20 }}>
                    <span className="anatomy-marker">4</span>
                  </div>

                  {/* Marker 5: Viewport Clamping Boundary (Top-Right) */}
                  <div style={{ position: 'absolute', left: '450px', top: '41px', zIndex: 20 }}>
                    <span className="anatomy-marker">5</span>
                  </div>

                </div>
              </div>

              {/* Anatomy Labels */}
              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={gl.anatomy1Label} desc={gl.anatomy1Desc} />
                <AnatomyLabel number={2} label={gl.anatomy2Label} desc={gl.anatomy2Desc} />
                <AnatomyLabel number={3} label={gl.anatomy3Label} desc={gl.anatomy3Desc} />
                <AnatomyLabel number={4} label={gl.anatomy4Label} desc={gl.anatomy4Desc} />
                <AnatomyLabel number={5} label={gl.anatomy5Label} desc={gl.anatomy5Desc} />
              </div>
            </div>
          </div>

          {/* ── 3. PLACEMENT COMPASS & MATRIX ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 className="section-title" style={{ margin: 0 }}>{gl.placementTitle}</h2>
                <p className="section-description" style={{ marginTop: 4 }}>{gl.placementDesc}</p>
              </div>

              {/* Axis Filter Tabs */}
              <div style={{ display: 'flex', gap: 6, background: 'var(--color-bg-subtle)', padding: 4, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                {(['all', 'top', 'bottom', 'left', 'right'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setPlacementFilter(filter)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: placementFilter === filter ? 600 : 500,
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      background: placementFilter === filter ? 'var(--color-primary)' : 'transparent',
                      color: placementFilter === filter ? '#ffffff' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      textTransform: 'capitalize'
                    }}
                  >
                    {filter === 'all' ? 'All (12)' : `${filter} (3)`}
                  </button>
                ))}
              </div>
            </div>

            {/* ── A. 12-Position Spatial Matrix Canvas ── */}
            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--color-bg-subtle)',
              backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              padding: '48px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              boxShadow: 'var(--shadow-xs)',
              marginBottom: 'var(--space-6)'
            }}>

              {/* 1. TOP ROW (3 buttons) */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <NeuronTooltip content="Tooltip placed on top-start" placement="top-start" delay={60}>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 18px', minWidth: '110px', justifyContent: 'center',
                    fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                  }}>
                    <ArrowUpLeft size={13} style={{ color: 'var(--color-primary)' }} />
                    <span>top-start</span>
                  </button>
                </NeuronTooltip>

                <NeuronTooltip content="Tooltip placed on top" placement="top" delay={60}>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 18px', minWidth: '110px', justifyContent: 'center',
                    fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                  }}>
                    <ArrowUp size={13} style={{ color: 'var(--color-primary)' }} />
                    <span>top</span>
                  </button>
                </NeuronTooltip>

                <NeuronTooltip content="Tooltip placed on top-end" placement="top-end" delay={60}>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 18px', minWidth: '110px', justifyContent: 'center',
                    fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                  }}>
                    <span>top-end</span>
                    <ArrowUpRight size={13} style={{ color: 'var(--color-primary)' }} />
                  </button>
                </NeuronTooltip>
              </div>

              {/* 2. MIDDLE ROW (Left 3 buttons | Center Stage Box | Right 3 buttons) */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, width: '100%', maxWidth: '640px' }}>
                
                {/* Left Column (3 buttons) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '120px' }}>
                  <NeuronTooltip content="Tooltip placed on left-start" placement="left-start" delay={60}>
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                      padding: '8px 14px', justifyContent: 'flex-start',
                      fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                      boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                    }}>
                      <ArrowUpLeft size={13} style={{ color: 'var(--color-primary)' }} />
                      <span>left-start</span>
                    </button>
                  </NeuronTooltip>

                  <NeuronTooltip content="Tooltip placed on left" placement="left" delay={60}>
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                      padding: '8px 14px', justifyContent: 'flex-start',
                      fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                      boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                    }}>
                      <ArrowLeft size={13} style={{ color: 'var(--color-primary)' }} />
                      <span>left</span>
                    </button>
                  </NeuronTooltip>

                  <NeuronTooltip content="Tooltip placed on left-end" placement="left-end" delay={60}>
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                      padding: '8px 14px', justifyContent: 'flex-start',
                      fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                      boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                    }}>
                      <ArrowDownLeft size={13} style={{ color: 'var(--color-primary)' }} />
                      <span>left-end</span>
                    </button>
                  </NeuronTooltip>
                </div>

                {/* Center Informational Stage Box (Clean, stable, and well-proportioned) */}
                <div style={{
                  width: '260px',
                  height: '144px',
                  background: 'var(--color-bg-surface)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '16px 20px',
                  textAlign: 'center',
                  userSelect: 'none'
                }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'rgba(223,126,48,0.12)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Compass size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      12 Directional Placements
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
                      Hover any button to preview its live fixed-position anchoring & caret
                    </div>
                  </div>
                </div>

                {/* Right Column (3 buttons) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '120px' }}>
                  <NeuronTooltip content="Tooltip placed on right-start" placement="right-start" delay={60}>
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                      padding: '8px 14px', justifyContent: 'space-between',
                      fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                      boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                    }}>
                      <span>right-start</span>
                      <ArrowUpRight size={13} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </NeuronTooltip>

                  <NeuronTooltip content="Tooltip placed on right" placement="right" delay={60}>
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                      padding: '8px 14px', justifyContent: 'space-between',
                      fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                      boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                    }}>
                      <span>right</span>
                      <ArrowRight size={13} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </NeuronTooltip>

                  <NeuronTooltip content="Tooltip placed on right-end" placement="right-end" delay={60}>
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                      padding: '8px 14px', justifyContent: 'space-between',
                      fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                      boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                    }}>
                      <span>right-end</span>
                      <ArrowDownRight size={13} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </NeuronTooltip>
                </div>

              </div>

              {/* 3. BOTTOM ROW (3 buttons) */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <NeuronTooltip content="Tooltip placed on bottom-start" placement="bottom-start" delay={60}>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 18px', minWidth: '110px', justifyContent: 'center',
                    fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                  }}>
                    <ArrowDownLeft size={13} style={{ color: 'var(--color-primary)' }} />
                    <span>bottom-start</span>
                  </button>
                </NeuronTooltip>

                <NeuronTooltip content="Tooltip placed on bottom" placement="bottom" delay={60}>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 18px', minWidth: '110px', justifyContent: 'center',
                    fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                  }}>
                    <ArrowDown size={13} style={{ color: 'var(--color-primary)' }} />
                    <span>bottom</span>
                  </button>
                </NeuronTooltip>

                <NeuronTooltip content="Tooltip placed on bottom-end" placement="bottom-end" delay={60}>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 18px', minWidth: '110px', justifyContent: 'center',
                    fontSize: '12px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',
                    boxShadow: 'var(--shadow-xs)', cursor: 'pointer', transition: 'all 0.15s ease'
                  }}>
                    <span>bottom-end</span>
                    <ArrowDownRight size={13} style={{ color: 'var(--color-primary)' }} />
                  </button>
                </NeuronTooltip>
              </div>

            </div>

            {/* ── B. 4-Axis Categorized Specification Cards Matrix (2x2 Grid) ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
              
              {/* Card 1: TOP AXIS */}
              {(placementFilter === 'all' || placementFilter === 'top') && (
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ padding: '12px 18px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(223,126,48,0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowUp size={13} />
                      </span>
                      <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Top Axis Placements</strong>
                    </div>
                    <NeuronBadge variant="gray" size="sm">3 Variations</NeuronBadge>
                  </div>
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { p: 'top-start' as const, align: 'Start Alignment (Left)', desc: 'Anchors to the left edge above trigger' },
                      { p: 'top' as const, align: 'Center Alignment', desc: 'Anchors horizontally centered above trigger' },
                      { p: 'top-end' as const, align: 'End Alignment (Right)', desc: 'Anchors to the right edge above trigger' },
                    ].map(({ p, align, desc }) => (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <div>
                          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: 'var(--color-primary)' }}>placement="{p}"</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>{desc}</div>
                        </div>
                        <NeuronTooltip content={`Demo: ${p}`} placement={p} delay={60}>
                          <NeuronButton variant="secondary" size="xs">Hover Me</NeuronButton>
                        </NeuronTooltip>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card 2: BOTTOM AXIS */}
              {(placementFilter === 'all' || placementFilter === 'bottom') && (
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ padding: '12px 18px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(223,126,48,0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowDown size={13} />
                      </span>
                      <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Bottom Axis Placements</strong>
                    </div>
                    <NeuronBadge variant="gray" size="sm">3 Variations</NeuronBadge>
                  </div>
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { p: 'bottom-start' as const, align: 'Start Alignment (Left)', desc: 'Anchors to the left edge below trigger' },
                      { p: 'bottom' as const, align: 'Center Alignment', desc: 'Anchors horizontally centered below trigger' },
                      { p: 'bottom-end' as const, align: 'End Alignment (Right)', desc: 'Anchors to the right edge below trigger' },
                    ].map(({ p, align, desc }) => (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <div>
                          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: 'var(--color-primary)' }}>placement="{p}"</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>{desc}</div>
                        </div>
                        <NeuronTooltip content={`Demo: ${p}`} placement={p} delay={60}>
                          <NeuronButton variant="secondary" size="xs">Hover Me</NeuronButton>
                        </NeuronTooltip>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card 3: LEFT AXIS */}
              {(placementFilter === 'all' || placementFilter === 'left') && (
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ padding: '12px 18px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(223,126,48,0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={13} />
                      </span>
                      <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Left Axis Placements</strong>
                    </div>
                    <NeuronBadge variant="gray" size="sm">3 Variations</NeuronBadge>
                  </div>
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { p: 'left-start' as const, align: 'Top-Aligned Left', desc: 'Anchors to top edge on the left of trigger' },
                      { p: 'left' as const, align: 'Center-Aligned Left', desc: 'Anchors vertically centered to the left' },
                      { p: 'left-end' as const, align: 'Bottom-Aligned Left', desc: 'Anchors to bottom edge on the left of trigger' },
                    ].map(({ p, align, desc }) => (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <div>
                          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: 'var(--color-primary)' }}>placement="{p}"</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>{desc}</div>
                        </div>
                        <NeuronTooltip content={`Demo: ${p}`} placement={p} delay={60}>
                          <NeuronButton variant="secondary" size="xs">Hover Me</NeuronButton>
                        </NeuronTooltip>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card 4: RIGHT AXIS */}
              {(placementFilter === 'all' || placementFilter === 'right') && (
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ padding: '12px 18px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(223,126,48,0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowRight size={13} />
                      </span>
                      <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Right Axis Placements</strong>
                    </div>
                    <NeuronBadge variant="gray" size="sm">3 Variations</NeuronBadge>
                  </div>
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { p: 'right-start' as const, align: 'Top-Aligned Right', desc: 'Anchors to top edge on the right of trigger' },
                      { p: 'right' as const, align: 'Center-Aligned Right', desc: 'Anchors vertically centered to the right' },
                      { p: 'right-end' as const, align: 'Bottom-Aligned Right', desc: 'Anchors to bottom edge on the right of trigger' },
                    ].map(({ p, align, desc }) => (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <div>
                          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: 'var(--color-primary)' }}>placement="{p}"</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>{desc}</div>
                        </div>
                        <NeuronTooltip content={`Demo: ${p}`} placement={p} delay={60}>
                          <NeuronButton variant="secondary" size="xs">Hover Me</NeuronButton>
                        </NeuronTooltip>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* ── 4. CONTENT STRUCTURE & TYPOGRAPHY ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.contentStructureTitle}</h2>
            <p className="section-description">{gl.contentStructureDesc}</p>

            <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Type 1: Title Only */}
              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--space-6)', padding: 'var(--space-5)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>{gl.typeTitleOnly}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{gl.typeTitleOnlyDesc}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                    <NeuronBadge variant="gray" size="sm">font-size: 12px</NeuronBadge>
                    <NeuronBadge variant="brand" size="sm">font-weight: 600 (SemiBold)</NeuronBadge>
                    <NeuronBadge variant="gray" size="sm">padding: 6px 10px</NeuronBadge>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <NeuronTooltip title="Copy to Clipboard" placement="top">
                    <NeuronButton variant="outline" size="sm">
                      <Copy size={13} style={{ marginRight: 6 }} /> Copy Action
                    </NeuronButton>
                  </NeuronTooltip>
                  <NeuronTooltip title="Search Library (⌘K)" placement="top">
                    <NeuronButton variant="secondary" size="sm">⌘K Shortcut</NeuronButton>
                  </NeuronTooltip>
                </div>
              </div>

              {/* Type 2: Title + Supporting Text */}
              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--space-6)', padding: 'var(--space-5)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>{gl.typeTitleAndSupporting}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{gl.typeTitleAndSupportingDesc}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                    <NeuronBadge variant="brand" size="sm">Title: 12px / 600</NeuronBadge>
                    <NeuronBadge variant="gray" size="sm">Supporting: 12px / 400</NeuronBadge>
                    <NeuronBadge variant="gray" size="sm">padding: 8px 12px</NeuronBadge>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <NeuronTooltip
                    title="Publish Changes"
                    description="Pushes your staged commits directly to the production branch."
                    placement="top"
                  >
                    <NeuronButton variant="primary" size="sm">Hover for Rich Tooltip</NeuronButton>
                  </NeuronTooltip>
                </div>
              </div>

              {/* Type 3: Supporting Text Only */}
              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--space-6)', padding: 'var(--space-5)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>{gl.typeSupportingOnly}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{gl.typeSupportingOnlyDesc}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                    <NeuronBadge variant="gray" size="sm">font-size: 12px</NeuronBadge>
                    <NeuronBadge variant="gray" size="sm">font-weight: 400 (Regular)</NeuronBadge>
                    <NeuronBadge variant="gray" size="sm">line-height: 1.4</NeuronBadge>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <NeuronTooltip
                    description="Password must contain at least 8 characters, including 1 uppercase and 1 number."
                    placement="top"
                  >
                    <NeuronButton variant="outline" size="sm">Hover for Guidance</NeuronButton>
                  </NeuronTooltip>
                </div>
              </div>
            </div>
          </div>

          {/* ── 5. TRIGGER MODES ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.triggerTitle}</h2>
            <p className="section-description">{gl.triggerDesc}</p>

            <div style={{ marginTop: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
              {/* Mode 1: Hover */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{gl.triggerHover}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>{gl.triggerHoverDesc}</div>
                  </div>
                  <NeuronBadge variant="gray" size="sm">trigger="hover"</NeuronBadge>
                </div>
                <div style={{ padding: '28px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 110, background: 'var(--color-bg-surface)' }}>
                  <NeuronTooltip
                    title="Cursor Hover Triggered"
                    description="Opens smoothly on cursor enter with 150ms delay and closes on exit."
                    variant="dark"
                    trigger="hover"
                    placement="top"
                  >
                    <NeuronButton variant="secondary" size="md">Hover over me</NeuronButton>
                  </NeuronTooltip>
                </div>
                <div style={{ padding: '10px 20px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', gap: 8, alignItems: 'center', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                  <span>delay=150ms</span>
                  <span>•</span>
                  <span>closeDelay=80ms</span>
                  <span>•</span>
                  <span>WCAG 2.1 Focus-Enabled</span>
                </div>
              </div>

              {/* Mode 2: Click */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{gl.triggerClick}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>{gl.triggerClickDesc}</div>
                  </div>
                  <NeuronBadge variant="brand" size="sm">trigger="click"</NeuronBadge>
                </div>
                <div style={{ padding: '28px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 110, background: 'var(--color-bg-surface)' }}>
                  <NeuronTooltip
                    title="Click Activated"
                    description="Stays open until toggled off, clicking outside, or pressing the Esc key."
                    variant="brand"
                    trigger="click"
                    placement="top"
                  >
                    <NeuronButton variant="primary" size="md">Click to toggle</NeuronButton>
                  </NeuronTooltip>
                </div>
                <div style={{ padding: '10px 20px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', gap: 8, alignItems: 'center', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                  <span>toggleOnClick=true</span>
                  <span>•</span>
                  <span>dismissOnEsc=true</span>
                  <span>•</span>
                  <span>Touch Optimized</span>
                </div>
              </div>

              {/* Mode 3: Focus */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{gl.triggerFocus}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>{gl.triggerFocusDesc}</div>
                  </div>
                  <NeuronBadge variant="success" size="sm">trigger="focus"</NeuronBadge>
                </div>
                <div style={{ padding: '28px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 110, background: 'var(--color-bg-surface)' }}>
                  <NeuronTooltip
                    title="Input Focus Triggered"
                    description="Contextual helper guide appears while this field remains in active focus."
                    variant="success"
                    trigger="focus"
                    placement="top"
                  >
                    <input
                      placeholder="Tab or click here to focus..."
                      style={{
                        padding: '8px 14px',
                        border: '1px solid var(--color-border)',
                        borderRadius: 8,
                        fontSize: 13,
                        fontFamily: 'var(--font-family)',
                        background: 'var(--color-bg-surface)',
                        color: 'var(--color-text-primary)',
                        outline: 'none',
                        width: 220,
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(223,126,48,0.15)';
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </NeuronTooltip>
                </div>
                <div style={{ padding: '10px 20px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', gap: 8, alignItems: 'center', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                  <span>onFocus=show</span>
                  <span>•</span>
                  <span>onBlur=hide</span>
                  <span>•</span>
                  <span>Form Accessible</span>
                </div>
              </div>

              {/* Mode 4: Manual */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{gl.triggerManual}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>{gl.triggerManualDesc}</div>
                  </div>
                  <NeuronBadge variant="warning" size="sm">trigger="manual"</NeuronBadge>
                </div>
                <div style={{ padding: '28px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 110, background: 'var(--color-bg-surface)' }}>
                  <NeuronTooltip
                    title="Programmatically Controlled"
                    description="Visibility state is bound directly to React state (isOpen={boolean})."
                    variant="warning"
                    trigger="manual"
                    isOpen={manualTriggerOpen}
                    placement="top"
                  >
                    <NeuronButton variant="secondary" size="md">Target Element</NeuronButton>
                  </NeuronTooltip>
                  <NeuronButton
                    variant={manualTriggerOpen ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setManualTriggerOpen(v => !v)}
                  >
                    {manualTriggerOpen ? 'Hide Tooltip' : 'Show Tooltip'}
                  </NeuronButton>
                </div>
                <div style={{ padding: '10px 20px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', gap: 8, alignItems: 'center', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                  <span>isOpen={String(manualTriggerOpen)}</span>
                  <span>•</span>
                  <span>Tour & Guided Steps Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. ACCESSIBILITY ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.a11yTitle}</h2>
            <p className="section-description">{gl.a11yDesc}</p>

            <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[gl.a11yPoint1, gl.a11yPoint2, gl.a11yPoint3, gl.a11yPoint4].map((point, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 7. DO'S & DON'TS ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.dosDontsTitle}</h2>
            <p className="section-description">{gl.dosDontsDesc}</p>

            <div className="dodont-grid" style={{ marginTop: 'var(--space-6)' }}>
              {/* DO 1: Brief & Scannable */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 140, pointerEvents: 'none', userSelect: 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Statically Displayed Tooltip Bubble */}
                    <div style={{
                      background: '#1a1a2e',
                      color: '#f0f0f8',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '6px 12px',
                      borderRadius: '6px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.30)',
                      position: 'relative',
                      whiteSpace: 'nowrap'
                    }}>
                      Copy to Clipboard (⌘C)
                      <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1a1a2e' }} />
                    </div>
                    {/* Standard 4px Gap */}
                    <div style={{ height: 4 }} />
                    {/* Target Host Element */}
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
                      <Copy size={16} />
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{gl.do1Title}</div>
                  <div className="rule-card__desc">{gl.do1Desc}</div>
                </div>
              </RuleCard>

              {/* DON'T 1: Overloaded Wall of Text */}
              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 140, pointerEvents: 'none', userSelect: 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 230 }}>
                    {/* Bloated Overloaded Tooltip Bubble */}
                    <div style={{
                      background: '#1a1a2e',
                      color: '#f0f0f8',
                      fontSize: '11px',
                      fontWeight: 400,
                      padding: '8px 10px',
                      borderRadius: '6px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.30)',
                      position: 'relative',
                      lineHeight: 1.35,
                      textAlign: 'center'
                    }}>
                      This action will copy the document reference ID directly to your system clipboard so you can paste it anywhere in another app...
                      <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1a1a2e' }} />
                    </div>
                    <div style={{ height: 4 }} />
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
                      <Copy size={16} />
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{gl.dont1Title}</div>
                  <div className="rule-card__desc">{gl.dont1Desc}</div>
                </div>
              </RuleCard>

              {/* DO 2: Semantic Color Matching Intent */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 140, pointerEvents: 'none', userSelect: 'none' }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    {/* Confirmation (Success) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ background: '#059669', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '5px 10px', borderRadius: '6px', position: 'relative', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(5,150,105,0.3)' }}>
                        Changes Saved ✓
                        <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #059669' }} />
                      </div>
                      <div style={{ height: 4 }} />
                      <div style={{ padding: '6px 14px', borderRadius: 6, background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.25)', fontSize: 12, fontWeight: 600 }}>Save</div>
                    </div>

                    {/* Destructive (Danger) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ background: '#dc2626', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '5px 10px', borderRadius: '6px', position: 'relative', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(220,38,38,0.3)' }}>
                        Permanent Deletion ⚠️
                        <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #dc2626' }} />
                      </div>
                      <div style={{ height: 4 }} />
                      <div style={{ padding: '6px 14px', borderRadius: 6, background: 'rgba(220,38,38,0.1)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.25)', fontSize: 12, fontWeight: 600 }}>Delete</div>
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{gl.do2Title}</div>
                  <div className="rule-card__desc">{gl.do2Desc}</div>
                </div>
              </RuleCard>

              {/* DON'T 2: Misleading / Neutral Colors on Destructive Action */}
              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 140, pointerEvents: 'none', userSelect: 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: '#1a1a2e', color: '#f0f0f8', fontSize: '12px', fontWeight: 600, padding: '5px 10px', borderRadius: '6px', position: 'relative', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.15)' }}>
                      Click to delete (No warning)
                      <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1a1a2e' }} />
                    </div>
                    <div style={{ height: 4 }} />
                    <div style={{ padding: '6px 14px', borderRadius: 6, background: 'rgba(220,38,38,0.1)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.25)', fontSize: 12, fontWeight: 600 }}>Delete Project</div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{gl.dont2Title}</div>
                  <div className="rule-card__desc">{gl.dont2Desc}</div>
                </div>
              </RuleCard>

              {/* DO 3: Informational Helper Text */}
              <RuleCard type="do">
                <div className="rule-card__preview" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 140, pointerEvents: 'none', userSelect: 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: '#1a1a2e', color: '#f0f0f8', padding: '7px 12px', borderRadius: '6px', position: 'relative', maxWidth: 190, textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.30)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600 }}>Keyboard Shortcut</div>
                      <div style={{ fontSize: '12px', fontWeight: 400, opacity: 0.85, marginTop: 2 }}>Press ⌘S to save anytime</div>
                      <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1a1a2e' }} />
                    </div>
                    <div style={{ height: 4 }} />
                    <div style={{ padding: '6px 14px', borderRadius: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>Save Draft</div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{gl.do3Title}</div>
                  <div className="rule-card__desc">{gl.do3Desc}</div>
                </div>
              </RuleCard>

              {/* DON'T 3: Interactive Elements Inside Hover Tooltips */}
              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 140, pointerEvents: 'none', userSelect: 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: '#1a1a2e', color: '#f0f0f8', padding: '10px 14px', borderRadius: '6px', position: 'relative', maxWidth: 210, boxShadow: '0 8px 24px rgba(0,0,0,0.30)', border: '1px solid rgba(220,38,38,0.4)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: 6 }}>Manage Collaborators</div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <div style={{ padding: '3px 8px', borderRadius: 4, background: 'var(--color-primary)', color: '#fff', fontSize: 11, fontWeight: 600 }}>Invite</div>
                        <div style={{ padding: '3px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11 }}>Remove</div>
                      </div>
                      <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1a1a2e' }} />
                    </div>
                    <div style={{ height: 4 }} />
                    <div style={{ padding: '6px 14px', borderRadius: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>Share File</div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{gl.dont3Title}</div>
                  <div className="rule-card__desc">{gl.dont3Desc}</div>
                </div>
              </RuleCard>
            </div>
          </div>

          {/* ── 8. VISUAL SPECS ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.specsTitle}</h2>
            <p className="section-description">{gl.specsDesc}</p>

            <div style={{ marginTop: 'var(--space-6)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-subtle)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>
                    <th style={{ padding: '10px 20px', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Property Token</th>
                    <th style={{ padding: '10px 20px', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Value</th>
                    <th style={{ padding: '10px 20px', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Specification & Application</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prop: 'Font Size', val: '12px', spec: 'Standardized typography size across all tooltip elements' },
                    { prop: 'Title Font Weight', val: '600 (SemiBold)', spec: 'Primary action title, single-line label, or shortcut' },
                    { prop: 'Supporting Text Weight', val: '400 (Regular)', spec: 'Secondary descriptive text, hints, or inline guidelines' },
                    { prop: 'Line Height', val: '1.4 (17px)', spec: 'Compact leading optimized for multi-line readability' },
                    { prop: 'Padding (Title Only)', val: '6px 10px', spec: 'Compact inner spacing for single-line labels' },
                    { prop: 'Padding (Rich Content)', val: '8px 12px', spec: 'Generous inner spacing for Title + Supporting text' },
                    { prop: 'Max Width', val: '260px', spec: 'Default maximum wrapping boundary (customizable via maxWidth prop)' },
                    { prop: 'Offset Gap from Trigger', val: '4px', spec: 'Standard international gap distance from host element' },
                    { prop: 'Arrow Caret Size', val: '6px', spec: 'Geometric pointer triangle matching theme background' },
                    { prop: 'Border Radius', val: '6px', spec: 'Curved bubble corners (var(--radius-md))' },
                    { prop: 'Layering (z-index)', val: '9999', spec: 'Fixed portal elevation above overlays and dropdowns' },
                  ].map((row, i, arr) => (
                    <tr key={row.prop} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                      <td style={{ padding: '11px 20px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{row.prop}</td>
                      <td style={{ padding: '11px 20px', color: 'var(--color-primary)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', fontWeight: 600 }}>{row.val}</td>
                      <td style={{ padding: '11px 20px', color: 'var(--color-text-secondary)', fontSize: '12px' }}>{row.spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── API REFERENCE ── */}
          <div className="section-card">
            <h2 className="section-title">API Reference</h2>
            <p className="section-description">Full prop interface for the NeuronTooltip component.</p>

            <div style={{ marginTop: 'var(--space-5)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-subtle)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>
                    {['Prop', 'Type', 'Default', 'Description'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prop: 'content', type: 'ReactNode', def: '—', desc: gl.apiContent },
                    { prop: 'title', type: 'ReactNode', def: '—', desc: 'Primary title or compact label (rendered at 12px SemiBold)' },
                    { prop: 'description', type: 'ReactNode', def: '—', desc: 'Secondary supporting text (rendered at 12px Regular)' },
                    { prop: 'children', type: 'ReactNode', def: '—', desc: gl.apiChildren },
                    { prop: 'placement', type: 'NeuronTooltipPlacement', def: '"top"', desc: gl.apiPlacement },
                    { prop: 'variant', type: 'NeuronTooltipVariant', def: '"dark"', desc: gl.apiVariant },
                    { prop: 'arrow', type: 'boolean', def: 'true', desc: gl.apiArrow },
                    { prop: 'delay', type: 'number', def: '150', desc: gl.apiDelay },
                    { prop: 'closeDelay', type: 'number', def: '80', desc: gl.apiCloseDelay },
                    { prop: 'trigger', type: 'NeuronTooltipTrigger', def: '"hover"', desc: gl.apiTrigger },
                    { prop: 'isOpen', type: 'boolean', def: 'undefined', desc: gl.apiIsOpen },
                    { prop: 'disabled', type: 'boolean', def: 'false', desc: gl.apiDisabled },
                    { prop: 'maxWidth', type: 'number', def: '260', desc: gl.apiMaxWidth },
                  ].map((row, i, arr) => (
                    <tr key={row.prop} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                      <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>{row.prop}</td>
                      <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>{row.type}</td>
                      <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>{row.def}</td>
                      <td style={{ padding: '10px 16px', fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Footer Navigation ── */}
          <NextPrevious
            prev={{ id: 'comp-toggle', label: t.nav.compToggle }}
            next={{ id: 'pat-forms', label: t.nav.patForms }}
            setActiveTab={setActiveTab}
          />
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2: PLAYBOOK
      ══════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">

          {/* ── 0. INTERACTIVE PLAYGROUND & CODE GENERATOR ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronTooltip {t.compShared.playground}</h2>
            <p className="section-description">Test all tooltip props, interactive triggers, variants, and copy production-ready code.</p>

            <Playground
              name="NeuronTooltip"
              knobs={[
                {
                  name: 'title',
                  type: 'text',
                  default: 'Save Changes',
                  label: 'Title (12px SemiBold)',
                },
                {
                  name: 'hasDescription',
                  type: 'boolean',
                  default: true,
                  label: 'Has Supporting Text',
                },
                {
                  name: 'description',
                  type: 'text',
                  default: 'Syncs local modifications to the cloud repository.',
                  label: 'Supporting Text (12px Regular)',
                  condition: (state) => Boolean(state.hasDescription),
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: ['dark', 'light', 'brand', 'success', 'warning', 'danger'],
                  default: 'dark',
                  label: 'Variant',
                },
                {
                  name: 'placement',
                  type: 'select',
                  options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
                  default: 'top',
                  label: 'Placement',
                },
                {
                  name: 'trigger',
                  type: 'select',
                  options: ['hover', 'click', 'focus'],
                  default: 'hover',
                  label: 'Trigger Mode',
                },
                {
                  name: 'arrow',
                  type: 'boolean',
                  default: true,
                  label: 'Arrow Caret',
                },
              ]}
              codeTemplates={(knobs) => {
                const title = (knobs.title as string) || '';
                const desc = knobs.hasDescription ? (knobs.description as string) || '' : '';
                const variant = knobs.variant as string;
                const placement = knobs.placement as string;
                const trigger = knobs.trigger as string;
                const arrow = Boolean(knobs.arrow);

                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (title) {
                  reactProps.push(`title="${title}"`);
                  vueProps.push(`title="${title}"`);
                }
                if (desc) {
                  reactProps.push(`description="${desc}"`);
                  vueProps.push(`description="${desc}"`);
                }
                if (placement !== 'top') {
                  reactProps.push(`placement="${placement}"`);
                  vueProps.push(`placement="${placement}"`);
                }
                if (variant !== 'dark') {
                  reactProps.push(`variant="${variant}"`);
                  vueProps.push(`variant="${variant}"`);
                }
                if (trigger !== 'hover') {
                  reactProps.push(`trigger="${trigger}"`);
                  vueProps.push(`trigger="${trigger}"`);
                }
                if (!arrow) {
                  reactProps.push(`arrow={false}`);
                  vueProps.push(`:arrow="false"`);
                }

                const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
                const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';
                const triggerLabel = trigger === 'click' ? 'Click me!' : trigger === 'focus' ? 'Focus me!' : 'Hover me!';

                return {
                  react: `<NeuronTooltip${reactAttr}>\n  <NeuronButton variant="primary" size="md">\n    ${triggerLabel}\n  </NeuronButton>\n</NeuronTooltip>`,
                  vue: `<NeuronTooltip${vueAttr}>\n  <NeuronButton variant="primary" size="md">\n    ${triggerLabel}\n  </NeuronButton>\n</NeuronTooltip>`,
                  html: `<!-- Neuron Tooltip Trigger -->\n<div class="neuron-tooltip-wrapper">\n  <button class="neuron-btn neuron-btn--primary" aria-describedby="tooltip-demo">\n    ${triggerLabel}\n  </button>\n  <div id="tooltip-demo" role="tooltip" class="neuron-tooltip neuron-tooltip--${variant} neuron-tooltip--${placement}">\n    ${title ? `<div class="neuron-tooltip__title">${title}</div>` : ''}\n    ${desc ? `<div class="neuron-tooltip__desc">${desc}</div>` : ''}\n    ${arrow ? '<span class="neuron-tooltip__arrow"></span>' : ''}\n  </div>\n</div>`,
                };
              }}
            >
              {(knobs) => {
                const title = (knobs.title as string) || '';
                const desc = knobs.hasDescription ? (knobs.description as string) || '' : '';
                const variant = (knobs.variant as NeuronTooltipVariant) || 'dark';
                const placement = (knobs.placement as NeuronTooltipPlacement) || 'top';
                const trigger = (knobs.trigger as 'hover' | 'click' | 'focus') || 'hover';
                const arrow = Boolean(knobs.arrow);

                return (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160, width: '100%' }}>
                    {trigger === 'focus' ? (
                      <NeuronTooltip
                        title={title}
                        description={desc}
                        placement={placement}
                        variant={variant}
                        arrow={arrow}
                        trigger="focus"
                      >
                        <input
                          placeholder="Tab or click to focus..."
                          style={{
                            padding: '9px 16px',
                            border: '1px solid var(--color-border)',
                            borderRadius: 8,
                            fontSize: 13,
                            fontFamily: 'var(--font-family)',
                            background: 'var(--color-bg-surface)',
                            color: 'var(--color-text-primary)',
                            outline: 'none',
                            width: 220,
                            boxShadow: 'var(--shadow-xs)'
                          }}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                        />
                      </NeuronTooltip>
                    ) : (
                      <NeuronTooltip
                        title={title}
                        description={desc}
                        placement={placement}
                        variant={variant}
                        arrow={arrow}
                        trigger={trigger}
                      >
                        <NeuronButton variant="primary" size="md">
                          {trigger === 'click' ? 'Click me!' : 'Hover me!'}
                        </NeuronButton>
                      </NeuronTooltip>
                    )}
                  </div>
                );
              }}
            </Playground>
          </div>

          {/* ── TOOLBAR & ICON ACTIONS ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.pattern1Title}</h2>
            <p className="section-description">{gl.pattern1Desc}</p>

            {/* Document Editor Toolbar */}
            <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              {/* Editor Toolbar */}
              <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                {/* Text format group */}
                <div style={{ display: 'flex', gap: 2, padding: '0 8px 0 0', borderRight: '1px solid var(--color-border)', marginRight: 4 }}>
                  <TbBtn icon={<Bold size={14} />} label="Bold (⌘B)" />
                  <TbBtn icon={<Italic size={14} />} label="Italic (⌘I)" />
                  <TbBtn icon={<Underline size={14} />} label="Underline (⌘U)" />
                </div>

                {/* Alignment group */}
                <div style={{ display: 'flex', gap: 2, padding: '0 8px 0 0', borderRight: '1px solid var(--color-border)', marginRight: 4 }}>
                  <TbBtn icon={<AlignLeft size={14} />} label="Align Left" />
                  <TbBtn icon={<AlignCenter size={14} />} label="Align Center" />
                  <TbBtn icon={<AlignRight size={14} />} label="Align Right" />
                  <TbBtn icon={<AlignJustify size={14} />} label="Justify" />
                </div>

                {/* Insert group */}
                <div style={{ display: 'flex', gap: 2, padding: '0 8px 0 0', borderRight: '1px solid var(--color-border)', marginRight: 4 }}>
                  <TbBtn icon={<Link size={14} />} label="Insert Link (⌘K)" />
                  <TbBtn icon={<Image size={14} />} label="Insert Image" />
                  <TbBtn icon={<Table size={14} />} label="Insert Table" />
                  <TbBtn icon={<Code size={14} />} label="Insert Code Block" />
                  <TbBtn icon={<List size={14} />} label="Bulleted List" />
                </div>

                {/* View group */}
                <div style={{ display: 'flex', gap: 2, padding: '0 8px 0 0', borderRight: '1px solid var(--color-border)', marginRight: 4 }}>
                  <TbBtn icon={<Eye size={14} />} label="Preview Mode" />
                  <TbBtn icon={<ZoomIn size={14} />} label="Zoom In (⌘+)" />
                  <TbBtn icon={<ZoomOut size={14} />} label="Zoom Out (⌘-)" />
                </div>

                {/* Action group */}
                <div style={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
                  <TbBtn icon={<RotateCcw size={14} />} label="Undo (⌘Z)" />
                  <TbBtn icon={<Copy size={14} />} label="Copy (⌘C)" />
                  <TbBtn icon={<Share2 size={14} />} label="Share Document" />
                  <TbBtn icon={<Download size={14} />} label="Export as PDF" />
                  <TbBtn icon={<Star size={14} />} label="Add to Favorites" variant="brand" />
                </div>
              </div>

              {/* Document body placeholder */}
              <div style={{ padding: 32, minHeight: 140 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 12 }}>
                  Quarterly Design System Review — Q3 2026
                </div>
                <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                  <p>This document outlines the component updates, token changes, and playbook improvements made to the Neudela Design System during Q3 2026. Hover any toolbar button above to see its tooltip label.</p>
                </div>
              </div>

              {/* Status bar */}
              <div style={{ padding: '8px 16px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                <span>128 words · 842 characters</span>
                <div style={{ display: 'flex', gap: 12 }}>
                  <NeuronTooltip content="Document auto-saved 2 minutes ago" placement="top" size="sm">
                    <span style={{ cursor: 'default' }}>✓ Saved</span>
                  </NeuronTooltip>
                  <NeuronTooltip content="2 collaborators editing" placement="top" size="sm">
                    <span style={{ cursor: 'default' }}>● 2 online</span>
                  </NeuronTooltip>
                </div>
              </div>
            </div>
          </div>

          {/* ── FORM FIELD HINTS ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.pattern2Title}</h2>
            <p className="section-description">{gl.pattern2Desc}</p>

            {/* Account Settings Form */}
            <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Settings size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Account Settings</strong>
                <NeuronBadge variant="brand" size="sm" style={{ marginLeft: 'auto' }}>Profile Completion: 72%</NeuronBadge>
              </div>

              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Username field */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Username</label>
                    <NeuronTooltip
                      content="Your unique username appears in your profile URL and mentions. Only letters, numbers, hyphens, and underscores are allowed."
                      trigger="focus"
                      placement="right"
                      size="lg"
                      variant="brand"
                    >
                      <button aria-label="Username help" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', display: 'inline-flex', padding: 2 }}>
                        <HelpCircle size={14} />
                      </button>
                    </NeuronTooltip>
                  </div>
                  <NeuronInput
                    placeholder="iqbal-dzulfikar"
                    leadingIcon={<User size={15} />}
                    helperText="Shown in your profile URL: neudela.design/@username"
                  />
                </div>

                {/* Email field */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Email Address</label>
                    <NeuronTooltip
                      content="We'll send account notifications and team invitations to this address. Must be verified before changes take effect."
                      trigger="focus"
                      placement="right"
                      size="lg"
                      variant="brand"
                    >
                      <button aria-label="Email help" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', display: 'inline-flex', padding: 2 }}>
                        <HelpCircle size={14} />
                      </button>
                    </NeuronTooltip>
                  </div>
                  <NeuronInput
                    type="email"
                    placeholder="iqbal.dzulfikar@neudela.design"
                    leadingIcon={<Mail size={15} />}
                  />
                </div>

                {/* Password field */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>New Password</label>
                    <NeuronTooltip
                      content={
                        <div>
                          <strong style={{ display: 'block', marginBottom: 6 }}>Password Requirements:</strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {['Minimum 8 characters', 'At least 1 uppercase letter', 'At least 1 number', 'At least 1 special character'].map(r => (
                              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                                <span style={{ color: '#10b981', fontSize: 12 }}>✓</span> {r}
                              </div>
                            ))}
                          </div>
                        </div>
                      }
                      trigger="focus"
                      placement="right"
                      size="lg"
                      variant="dark"
                    >
                      <button aria-label="Password requirements" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', display: 'inline-flex', padding: 2 }}>
                        <Lock size={14} />
                      </button>
                    </NeuronTooltip>
                  </div>
                  <NeuronInput
                    type="password"
                    placeholder="Enter a strong password"
                    leadingIcon={<Lock size={15} />}
                  />
                </div>

                {/* Two-factor field */}
                <div style={{ padding: 16, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <ShieldCheck size={18} style={{ color: '#10b981' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Two-Factor Authentication</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Adds a security layer to your account</div>
                      </div>
                    </div>
                    <NeuronTooltip
                      content="2FA requires a time-based one-time password (TOTP) from an authenticator app like Google Authenticator or Authy."
                      placement="left"
                      size="lg"
                      variant="success"
                    >
                      <NeuronBadge variant="success" size="sm">Enabled</NeuronBadge>
                    </NeuronTooltip>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 8 }}>
                  <NeuronButton variant="outline" size="md">Cancel</NeuronButton>
                  <NeuronTooltip content="Changes will be saved and take effect immediately" placement="top" variant="brand" size="sm">
                    <NeuronButton variant="primary" size="md">Save Changes</NeuronButton>
                  </NeuronTooltip>
                </div>
              </div>
            </div>
          </div>

          {/* ── DATA TABLE ROW ACTIONS ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.pattern3Title}</h2>
            <p className="section-description">{gl.pattern3Desc}</p>

            <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              {/* Table Header */}
              <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <Users size={15} style={{ color: 'var(--color-text-tertiary)' }} />
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Team Members</strong>
                <NeuronBadge variant="gray" size="sm">{tableMembers.length} members</NeuronBadge>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <NeuronTooltip content="Filter members" placement="top" size="sm">
                    <button aria-label="Filter" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'none', border: '1px solid var(--color-border)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                      <Filter size={14} />
                    </button>
                  </NeuronTooltip>
                  <NeuronTooltip content="Export CSV" placement="top" size="sm">
                    <button aria-label="Export" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'none', border: '1px solid var(--color-border)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                      <Download size={14} />
                    </button>
                  </NeuronTooltip>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-subtle)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>
                    <th style={{ padding: '10px 20px', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Member</th>
                    <th style={{ padding: '10px 20px', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Department</th>
                    <th style={{ padding: '10px 20px', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Status</th>
                    <th style={{ padding: '10px 20px', textAlign: 'center', borderBottom: '1px solid var(--color-border)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableMembers.map((m, i) => (
                    <tr key={m.name} style={{ borderBottom: i < tableMembers.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                      <td style={{ padding: '12px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, position: 'relative' }}>
                            {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            <span style={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%', background: STATUS_COLOR[m.status], border: '2px solid var(--color-bg-surface)' }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{m.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{m.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        <NeuronBadge variant="gray" size="sm">{m.dept}</NeuronBadge>
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[m.status], display: 'inline-block' }} />
                          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>{m.status}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                          <NeuronTooltip content={`Edit ${m.name.split(' ')[0]}'s profile`} placement="top" size="sm">
                            <button aria-label={`Edit ${m.name}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, background: 'none', border: '1px solid transparent', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-subtle)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}>
                              <Pencil size={13} />
                            </button>
                          </NeuronTooltip>
                          <NeuronTooltip content={`Send message to ${m.name.split(' ')[0]}`} placement="top" size="sm" variant="brand">
                            <button aria-label={`Message ${m.name}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, background: 'none', border: '1px solid transparent', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-subtle)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}>
                              <Send size={13} />
                            </button>
                          </NeuronTooltip>
                          <NeuronTooltip content="View activity log" placement="top" size="sm">
                            <button aria-label="Activity" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, background: 'none', border: '1px solid transparent', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-subtle)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}>
                              <Activity size={13} />
                            </button>
                          </NeuronTooltip>
                          <NeuronTooltip content={`Remove ${m.name.split(' ')[0]} from workspace`} placement="top" size="sm" variant="danger">
                            <button aria-label={`Remove ${m.name}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, background: 'none', border: '1px solid transparent', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(220,38,38,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.2)'; (e.currentTarget as HTMLElement).style.color = '#dc2626'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)'; }}>
                              <Trash2 size={13} />
                            </button>
                          </NeuronTooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── ONBOARDING SPOTLIGHT TIPS ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.pattern4Title}</h2>
            <p className="section-description">{gl.pattern4Desc}</p>

            {/* Simulated app shell with onboarding tooltips */}
            <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              {/* App header */}
              <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>N</div>
                <strong style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>Neudela Workspace</strong>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <NeuronBadge variant={isTourActive ? 'brand' : 'neutral'} size="sm">
                    {isTourActive ? (
                      <>
                        <Sparkles size={10} style={{ marginRight: 3 }} />
                        Tour: Step {onboardStep + 1} / {onboardingSteps.length}
                      </>
                    ) : (
                      <>
                        <Sparkles size={10} style={{ marginRight: 3 }} />
                        Tour Ready
                      </>
                    )}
                  </NeuronBadge>
                  {isTourActive ? (
                    <NeuronButton
                      variant="outline"
                      size="sm"
                      onClick={() => setIsTourActive(false)}
                    >
                      Dismiss Tour
                    </NeuronButton>
                  ) : (
                    <NeuronButton
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setOnboardStep(0);
                        setIsTourActive(true);
                      }}
                    >
                      Start Tour
                    </NeuronButton>
                  )}
                </div>
              </div>

              {/* App body */}
              <div style={{ display: 'flex', minHeight: 300 }}>
                {/* Sidebar */}
                <div style={{ width: 200, borderRight: '1px solid var(--color-border)', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--color-bg-subtle)' }}>
                  {[
                    { icon: <Layers size={15} />, label: 'Components', step: 0 },
                    { icon: <Image size={15} />, label: 'Figma Files', step: 1 },
                    { icon: <Users size={15} />, label: 'Team Members', step: 2 },
                    { icon: <Settings size={15} />, label: 'Settings', step: 3 },
                  ].map((item) => {
                    const isCurrentStep = isTourActive && item.step === onboardStep;
                    return (
                      <NeuronTooltip
                        key={item.label}
                        interactive={true}
                        content={
                          isCurrentStep ? (
                            <div style={{ padding: '2px 0' }}>
                              <strong style={{ display: 'block', fontSize: 13, marginBottom: 4, color: '#fff' }}>
                                {onboardingSteps[item.step].title}
                              </strong>
                              <p style={{ margin: '0 0 10px 0', fontSize: 11, lineHeight: 1.45, opacity: 0.92, color: 'rgba(255,255,255,0.95)' }}>
                                {onboardingSteps[item.step].body}
                              </p>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 8 }}>
                                <span style={{ fontSize: 10, opacity: 0.8, color: '#fff' }}>
                                  {item.step + 1} of {onboardingSteps.length}
                                </span>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  {item.step > 0 && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOnboardStep(s => Math.max(0, s - 1));
                                        setIsTourActive(true);
                                      }}
                                      style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        border: 'none',
                                        color: '#fff',
                                        padding: '3px 8px',
                                        borderRadius: 4,
                                        fontSize: 11,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                      }}
                                    >
                                      ← Back
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (item.step === onboardingSteps.length - 1) {
                                        setIsTourActive(false); // Just dismiss the tooltip
                                      } else {
                                        setOnboardStep(s => s + 1);
                                        setIsTourActive(true);
                                      }
                                    }}
                                    style={{
                                      background: '#fff',
                                      border: 'none',
                                      color: 'var(--brand-700, #a23c1b)',
                                      padding: '3px 10px',
                                      borderRadius: 4,
                                      fontSize: 11,
                                      cursor: 'pointer',
                                      fontWeight: 700,
                                    }}
                                  >
                                    {item.step === onboardingSteps.length - 1 ? 'Finish 🎉' : 'Next →'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : item.label
                        }
                        variant={isCurrentStep ? 'brand' : 'dark'}
                        placement="right"
                        trigger={isCurrentStep ? 'manual' : 'hover'}
                        isOpen={isCurrentStep}
                        arrow
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setOnboardStep(item.step);
                            setIsTourActive(true);
                          }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 10px', borderRadius: 8,
                            background: isCurrentStep ? 'rgba(223,126,48,0.12)' : 'none',
                            border: isCurrentStep ? '1px solid rgba(223,126,48,0.3)' : '1px solid transparent',
                            color: isCurrentStep ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            cursor: 'pointer', fontSize: 13, fontWeight: isCurrentStep ? 700 : 400, textAlign: 'left'
                          }}
                        >
                          {item.icon}
                          {item.label}
                          {isCurrentStep && <ArrowUpRight size={12} style={{ marginLeft: 'auto' }} />}
                        </button>
                      </NeuronTooltip>
                    );
                  })}
                </div>

                {/* Main content area */}
                <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ padding: 20, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <Sparkles size={18} style={{ color: 'var(--color-primary)' }} />
                      <strong style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>
                        {`Step ${onboardStep + 1}: ${onboardingSteps[onboardStep]?.title ?? ''}`}
                      </strong>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>
                      {onboardingSteps[onboardStep]?.body ?? ''}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {onboardingSteps.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setOnboardStep(idx);
                              setIsTourActive(true);
                            }}
                            style={{
                              width: idx === onboardStep ? 24 : 8,
                              height: 8,
                              borderRadius: 4,
                              background: idx === onboardStep ? 'var(--color-primary)' : 'var(--color-border)',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          />
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 8 }}>
                        {onboardStep > 0 && (
                          <NeuronButton
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setOnboardStep(s => Math.max(0, s - 1));
                              setIsTourActive(true);
                            }}
                          >
                            ← Previous
                          </NeuronButton>
                        )}
                        {!isTourActive ? (
                          <NeuronButton
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              setOnboardStep(0);
                              setIsTourActive(true);
                            }}
                          >
                            Start Onboarding Tour →
                          </NeuronButton>
                        ) : (
                          <NeuronButton
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              if (onboardStep === onboardingSteps.length - 1) {
                                setIsTourActive(false); // Just dismiss tooltip
                              } else {
                                setOnboardStep(s => s + 1);
                                setIsTourActive(true);
                              }
                            }}
                          >
                            {onboardStep === onboardingSteps.length - 1 ? 'Finish 🎉' : 'Next Step →'}
                          </NeuronButton>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Final step CTA */}
                  {onboardStep === onboardingSteps.length - 1 && (
                    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                      <NeuronTooltip content="Open the Figma file" variant="brand" placement="top" size="sm">
                        <NeuronButton variant="primary" size="sm" leadingIcon={<ExternalLink size={14} />}>
                          Open in Figma
                        </NeuronButton>
                      </NeuronTooltip>
                      <NeuronTooltip content="Browse all 40+ components" variant="dark" placement="top" size="sm">
                        <NeuronButton variant="outline" size="sm" leadingIcon={<ChevronRight size={14} />}>
                          Explore Components
                        </NeuronButton>
                      </NeuronTooltip>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer Navigation ── */}
          <NextPrevious
            prev={{ id: 'comp-toggle', label: t.nav.compToggle }}
            next={{ id: 'pat-forms', label: t.nav.patForms }}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
    </div>
  );
}
