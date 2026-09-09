import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import NeuronRadio, { 
  NeuronRadioSize, 
  NeuronRadioVariant,
  NeuronRadioGroup 
} from '../components/NeuronRadio';
import NeuronCheckbox from '../components/NeuronCheckbox';
import NeuronBadge from '../components/NeuronBadge';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import NeuronButton from '../components/NeuronButton';
import { 
  CheckCircle2, 
  XCircle, 
  Zap, 
  ListOrdered, 
  Eye, 
  Scale, 
  AlertCircle, 
  SlidersHorizontal,
  Info,
  Layers,
  Sparkles,
  ShieldCheck,
  Rocket,
  Building2,
  Truck,
  Clock,
  PackageCheck,
  Server,
  Globe,
  Lock,
  UserCheck,
  Users,
  Check,
  ArrowRight,
  Shield,
  CreditCard,
  Cpu
} from 'lucide-react';

interface RadioViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────
// Rule Card (Do / Don't)
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Anatomy Callout Label
// ─────────────────────────────────────────────
function AnatomyLabel({ number, label, desc }: { number: number; label: string; desc: string }) {
  return (
    <div className="anatomy-label-item">
      <span className="anatomy-marker">{number}</span>
      <div>
        <div className="anatomy-label-title">{label}</div>
        <div className="anatomy-label-desc">{desc}</div>
      </div>
    </div>
  );
}

export const RadioView: React.FC<RadioViewProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTabLocal] = useState<'guideline' | 'playbook'>('guideline');
  const [overviewFilter, setOverviewFilter] = useState<'all' | 'brand' | 'semantic' | 'accent'>('all');

  const rd = t.radio;

  // ── 10 Color Variants aligned with Design Tokens ──
  const COLOR_VARIANTS: NeuronRadioVariant[] = [
    'brand',
    'gray',
    'error',
    'warning',
    'success',
    'blue',
    'indigo',
    'purple',
    'pink',
    'orange',
  ];

  const filteredVariants = COLOR_VARIANTS.filter((c) => {
    if (overviewFilter === 'brand') return c === 'brand' || c === 'gray';
    if (overviewFilter === 'semantic') return c === 'error' || c === 'warning' || c === 'success';
    if (overviewFilter === 'accent') return c === 'blue' || c === 'indigo' || c === 'purple' || c === 'pink' || c === 'orange';
    return true;
  });

  const getColorLabel = (variant: NeuronRadioVariant): string => {
    switch (variant) {
      case 'brand': return 'Brand / Primary';
      case 'gray': return 'Gray / Neutral';
      case 'error': return 'Error / Danger';
      case 'warning': return 'Warning';
      case 'success': return 'Success';
      case 'blue': return 'Blue';
      case 'indigo': return 'Indigo / Sky';
      case 'purple': return 'Purple';
      case 'pink': return 'Pink / Rose';
      case 'orange': return 'Orange / Amber';
      default: return variant;
    }
  };

  // ── Do's & Don'ts Interactive States ──
  const [do1Val, setDo1Val] = useState('opt1');
  const [dont1Val, setDont1Val] = useState('opt3');
  const [nestedVal, setNestedVal] = useState('nested1');
  const [do2Val, setDo2Val] = useState('opt1');
  const [dont2Val, setDont2Val] = useState('opt1');
  const [do3Val, setDo3Val] = useState('opt1');
  const [dont3Checkboxes, setDont3Checkboxes] = useState<string[]>(['opt1', 'opt2']);

  // ── Playbook Pattern 1: SaaS Subscription States ──
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [pricingPlan, setPricingPlan] = useState<'starter' | 'pro' | 'enterprise'>('pro');

  // ── Playbook Pattern 2: E-Commerce Shipping States ──
  const [shippingOption, setShippingOption] = useState<'ground' | 'express' | 'overnight'>('express');

  // ── Playbook Pattern 3: Cloud Region Deployment States ──
  const [cloudRegion, setCloudRegion] = useState<'us-east' | 'eu-central' | 'ap-southeast'>('us-east');

  // ── Playbook Pattern 4: RBAC Role Assignment States ──
  const [userRole, setUserRole] = useState<'viewer' | 'editor' | 'admin'>('editor');

  // Calculate pricing values
  const getPlanPrice = (plan: 'starter' | 'pro' | 'enterprise') => {
    if (billingCycle === 'annual') {
      if (plan === 'starter') return 15;
      if (plan === 'pro') return 39;
      return 119;
    } else {
      if (plan === 'starter') return 19;
      if (plan === 'pro') return 49;
      return 149;
    }
  };

  const getShippingFee = () => {
    if (shippingOption === 'ground') return 0;
    if (shippingOption === 'express') return 12.5;
    return 28;
  };

  return (
    <div className="component-view">
      
      {/* ── Standardized Header Structure ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{rd.title}</h1>
            <p className="page-subtitle">{rd.subtitle}</p>
          </div>
        </div>

        {/* ── Standardized Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setActiveTabLocal('guideline')}
          >
            {rd.guidelineTab}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setActiveTabLocal('playbook')}
          >
            {rd.playbookTab}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TAB 1: GUIDELINE (ALIGNED WITH LEGION)
          ══════════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">

          {/* ── 1. VISUAL SPECIFICATION (MATRIX SHOWCASE) ── */}
          <div className="section-card">
            <h2 className="section-title">Visual Specification</h2>
            <p className="section-description">All size, color, state, and label configurations aligned to Neudela design tokens.</p>

            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">{rd.matrixTitle}</div>
                  <div className="badge-spec-subtitle">{rd.matrixSubtitle}</div>
                </div>

                <div className="badge-spec-filter-group">
                  <button 
                    className={`badge-spec-filter-btn ${overviewFilter === 'all' ? 'is-active' : ''}`}
                    onClick={() => setOverviewFilter('all')}
                  >
                    All (10)
                  </button>
                  <button 
                    className={`badge-spec-filter-btn ${overviewFilter === 'brand' ? 'is-active' : ''}`}
                    onClick={() => setOverviewFilter('brand')}
                  >
                    Brand & Neutral
                  </button>
                  <button 
                    className={`badge-spec-filter-btn ${overviewFilter === 'semantic' ? 'is-active' : ''}`}
                    onClick={() => setOverviewFilter('semantic')}
                  >
                    Semantic States
                  </button>
                  <button 
                    className={`badge-spec-filter-btn ${overviewFilter === 'accent' ? 'is-active' : ''}`}
                    onClick={() => setOverviewFilter('accent')}
                  >
                    Modern Accents
                  </button>
                </div>
              </div>

              {/* Master Matrix Table Grid */}
              <div className="badge-spec-table-wrap">
                <table className="toggle-matrix-table">
                  <thead>
                    <tr>
                      <th style={{ width: '190px', minWidth: '190px' }}>SELECTED (SM · MD · LG)</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>UNSELECTED (SM · MD · LG)</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>DISABLED OFF</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>DISABLED ON</th>
                      <th style={{ minWidth: '240px' }}>WITH LABEL & SUBTITLE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVariants.map((c) => (
                      <tr key={c}>
                        {/* 1. Selected (sm, md, lg) */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronRadio variant={c} size="sm" defaultChecked={true} />
                            <NeuronRadio variant={c} size="md" defaultChecked={true} />
                            <NeuronRadio variant={c} size="lg" defaultChecked={true} />
                          </div>
                        </td>

                        {/* 2. Unselected (sm, md, lg) */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronRadio variant={c} size="sm" defaultChecked={false} />
                            <NeuronRadio variant={c} size="md" defaultChecked={false} />
                            <NeuronRadio variant={c} size="lg" defaultChecked={false} />
                          </div>
                        </td>

                        {/* 3. Disabled Off */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronRadio variant={c} size="sm" defaultChecked={false} disabled />
                            <NeuronRadio variant={c} size="md" defaultChecked={false} disabled />
                            <NeuronRadio variant={c} size="lg" defaultChecked={false} disabled />
                          </div>
                        </td>

                        {/* 4. Disabled On */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronRadio variant={c} size="sm" defaultChecked={true} disabled />
                            <NeuronRadio variant={c} size="md" defaultChecked={true} disabled />
                            <NeuronRadio variant={c} size="lg" defaultChecked={true} disabled />
                          </div>
                        </td>

                        {/* 5. With Label & Description */}
                        <td>
                          <NeuronRadio
                            variant={c}
                            size="sm"
                            defaultChecked={true}
                            label={getColorLabel(c)}
                            description="Supporting option helper text"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── 2. ANATOMY ── */}
          <div className="section-card">
            <h2 className="section-title">{rd.anatomyTitle}</h2>
            <p className="section-description">{rd.anatomyDesc}</p>

            <div className="anatomy-diagram">
              <div className="anatomy-preview" style={{ minHeight: '290px', padding: 'var(--space-8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Pixel-Perfect Blueprint Diagram Frame */}
                <div style={{ 
                  position: 'relative', 
                  width: '500px',
                  height: '190px',
                  background: 'var(--color-bg-surface)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xs)'
                }}>
                  
                  {/* SVG Precision Connector Lines */}
                  <svg width="500" height="190" viewBox="0 0 500 190" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                    {/* Line 1: Indicator Selector (Left) */}
                    <line x1="38" y1="74" x2="68" y2="74" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    
                    {/* Line 2: Inner Dot (Top - points directly inside to the white dot) */}
                    <line x1="82" y1="32" x2="82" y2="68" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    
                    {/* Line 3: Focus Ring (Bottom - touches the 4px halo ring) */}
                    <line x1="82" y1="92" x2="82" y2="140" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    
                    {/* Line 4: Primary Label (Top) */}
                    <line x1="190" y1="32" x2="190" y2="58" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    
                    {/* Line 5: Supporting Description (Bottom) */}
                    <line x1="240" y1="98" x2="240" y2="140" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                  </svg>

                  {/* Target Radio Component situated at (68px, 60px) */}
                  <div style={{
                    position: 'absolute',
                    left: '68px',
                    top: '60px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    width: '400px',
                    zIndex: 2
                  }}>
                    {/* 28x28 Radio Circle with 10px White Dot and 4px focus halo */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--brand-500)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 0 4px var(--brand-100)',
                      flexShrink: 0,
                      marginTop: '1px',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#ffffff'
                      }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                        Email Notifications
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                        Receive weekly activity digests and security updates.
                      </div>
                    </div>
                  </div>

                  {/* Marker 1: Indicator Selector (Far Left) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '16px', 
                    top: '63px', 
                    zIndex: 20
                  }}>
                    <span className="anatomy-marker">1</span>
                  </div>

                  {/* Marker 2: Inner Dot (Top of Circle) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '71px', 
                    top: '10px', 
                    zIndex: 20
                  }}>
                    <span className="anatomy-marker">2</span>
                  </div>

                  {/* Marker 3: Focus Ring (Bottom of Circle) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '71px', 
                    top: '142px', 
                    zIndex: 20
                  }}>
                    <span className="anatomy-marker">3</span>
                  </div>

                  {/* Marker 4: Primary Label (Top of Text) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '179px', 
                    top: '10px', 
                    zIndex: 20
                  }}>
                    <span className="anatomy-marker">4</span>
                  </div>

                  {/* Marker 5: Supporting Description (Bottom of Text) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '229px', 
                    top: '142px', 
                    zIndex: 20
                  }}>
                    <span className="anatomy-marker">5</span>
                  </div>

                </div>

              </div>

              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={rd.anatomyIndicatorLabel} desc={rd.anatomyIndicatorDesc} />
                <AnatomyLabel number={2} label={rd.anatomyDotLabel} desc={rd.anatomyDotDesc} />
                <AnatomyLabel number={3} label={rd.anatomyFocusLabel} desc={rd.anatomyFocusDesc} />
                <AnatomyLabel number={4} label={rd.anatomyLabelLabel} desc={rd.anatomyLabelDesc} />
                <AnatomyLabel number={5} label={rd.anatomyDescLabel} desc={rd.anatomyDescDesc} />
              </div>
            </div>
          </div>

          {/* ── 3. USAGE & WHEN TO USE / WHEN NOT TO USE ── */}
          <div className="section-card">
            <h2 className="section-title">{rd.usageTitle}</h2>
            <p className="section-description">{rd.usageDesc}</p>

            {/* Usage Key Rules Banner */}
            <div style={{
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-6)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--brand-500)' }} />
                <strong>{rd.usageNote1}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--slate-400)' }} />
                <span>{rd.usageNote2}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                <Info size={14} />
                <em>{rd.usageCommonPlaces}</em>
              </div>
            </div>

            {/* Sizing & Layout Guide: When to Use & When Not to Use Grids */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
              
              {/* When to Use Column */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--emerald-200, rgba(16, 185, 129, 0.3))',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-600)' }}>
                  <CheckCircle2 size={20} />
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, margin: 0 }}>
                    {rd.whenToUseTitle}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-600)' }}>
                      <Zap size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{rd.when1}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-600)' }}>
                      <ListOrdered size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{rd.when2}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-600)' }}>
                      <Scale size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{rd.when3}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-600)' }}>
                      <Eye size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{rd.when4}</span>
                  </div>
                </div>
              </div>

              {/* When Not to Use Column */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--red-200, rgba(239, 68, 68, 0.3))',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--red-600)' }}>
                  <XCircle size={20} />
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, margin: 0 }}>
                    {rd.whenNotToUseTitle}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--red-600)' }}>
                      <AlertCircle size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{rd.whenNot1}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--red-600)' }}>
                      <Layers size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{rd.whenNot2}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--red-600)' }}>
                      <SlidersHorizontal size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{rd.whenNot3}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── 4. ACCESSIBILITY ── */}
          <div className="section-card">
            <h2 className="section-title">{rd.a11yTitle}</h2>
            <p className="section-description">{rd.a11yDesc}</p>
            <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginTop: '-8px', marginBottom: 'var(--space-6)' }}>
              {rd.a11ySubDesc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)' }}>
                <strong style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: 'var(--fs-text-sm)' }}>Keyboard Navigation</strong>
                <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                  Arrow keys (↑ / ↓ / ← / →) navigate between options in the radiogroup, automatically selecting the focused radio. Space selects, Tab moves focus out.
                </span>
              </div>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)' }}>
                <strong style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: 'var(--fs-text-sm)' }}>ARIA Semantics</strong>
                <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                  Uses <code>role="radiogroup"</code> on the container and <code>role="radio"</code> with <code>aria-checked="true | false"</code> on each option.
                </span>
              </div>
            </div>
          </div>

          {/* ── 5. DO'S AND DON'TS (DIRECTLY FROM LEGION GUIDELINE) ── */}
          <div className="section-card">
            <h2 className="section-title">{rd.dodontTitle}</h2>
            <p className="section-description">{rd.dodontDesc}</p>

            <div className="dodont-grid">
              
              {/* Pair 1: Less than 5 options vs. Nesting */}
              <RuleCard type="do">
                <div className="rule-card__preview">
                  <NeuronRadioGroup value={do1Val} onChange={setDo1Val} name="legion-do-1" direction="vertical" style={{ gap: '8px', width: '100%' }}>
                    <NeuronRadio size="sm" value="opt1" label="Option 1" />
                    <NeuronRadio size="sm" value="opt2" label="Option 2" />
                    <NeuronRadio size="sm" value="opt3" label="Option 3" />
                  </NeuronRadioGroup>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{rd.do1Title}</div>
                  <div className="rule-card__desc">{rd.do1Desc}</div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    <NeuronRadioGroup value={dont1Val} onChange={setDont1Val} name="legion-dont-1" direction="vertical" style={{ gap: '8px', width: '100%' }}>
                      <NeuronRadio size="sm" value="opt1" label="Option 1" />
                      <NeuronRadio size="sm" value="opt2" label="Option 2" />
                      <NeuronRadio size="sm" value="opt3" label="Option 3" />
                    </NeuronRadioGroup>
                    <div style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', borderLeft: '2px dashed var(--slate-300)', marginLeft: '8px' }}>
                      <NeuronRadioGroup value={nestedVal} onChange={setNestedVal} name="nested-opt" direction="vertical" style={{ gap: '6px', width: '100%' }}>
                        <NeuronRadio size="sm" value="nested1" label="Additional Option 1" />
                        <NeuronRadio size="sm" value="nested2" label="Additional Option 2" />
                      </NeuronRadioGroup>
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{rd.dont1Title}</div>
                  <div className="rule-card__desc">{rd.dont1Desc}</div>
                </div>
              </RuleCard>

              {/* Pair 2: Vertical alignment vs. Horizontal alignment */}
              <RuleCard type="do">
                <div className="rule-card__preview">
                  <NeuronRadioGroup value={do2Val} onChange={setDo2Val} name="legion-do-2" direction="vertical" style={{ gap: '8px', width: '100%' }}>
                    <NeuronRadio size="sm" value="opt1" label="Option 1" />
                    <NeuronRadio size="sm" value="opt2" label="Option 2" />
                    <NeuronRadio size="sm" value="opt3" label="Option 3" />
                  </NeuronRadioGroup>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{rd.do2Title}</div>
                  <div className="rule-card__desc">{rd.do2Desc}</div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview">
                  <NeuronRadioGroup value={dont2Val} onChange={setDont2Val} name="legion-dont-2" direction="horizontal" style={{ gap: '12px 16px', width: '100%', alignItems: 'center' }}>
                    <NeuronRadio size="sm" value="opt1" label="Option 1" />
                    <NeuronRadio size="sm" value="opt2" label="Option 2" />
                    <NeuronRadio size="sm" value="opt3" label="Option 3" />
                    <NeuronRadio size="sm" value="opt4" label="Option 4" />
                  </NeuronRadioGroup>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{rd.dont2Title}</div>
                  <div className="rule-card__desc">{rd.dont2Desc}</div>
                </div>
              </RuleCard>

              {/* Pair 3: Radio button vs. Checkbox for single selection */}
              <RuleCard type="do">
                <div className="rule-card__preview">
                  <NeuronRadioGroup value={do3Val} onChange={setDo3Val} name="legion-do-3" direction="vertical" style={{ gap: '8px', width: '100%' }}>
                    <NeuronRadio size="sm" value="opt1" label="Option 1" />
                    <NeuronRadio size="sm" value="opt2" label="Option 2" />
                    <NeuronRadio size="sm" value="opt3" label="Option 3" />
                  </NeuronRadioGroup>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{rd.do3Title}</div>
                  <div className="rule-card__desc">{rd.do3Desc}</div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    <NeuronCheckbox
                      size="sm"
                      label="Option 1"
                      checked={dont3Checkboxes.includes('opt1')}
                      onChange={(ck) => setDont3Checkboxes(prev => ck ? [...prev, 'opt1'] : prev.filter(x => x !== 'opt1'))}
                    />
                    <NeuronCheckbox
                      size="sm"
                      label="Option 2"
                      checked={dont3Checkboxes.includes('opt2')}
                      onChange={(ck) => setDont3Checkboxes(prev => ck ? [...prev, 'opt2'] : prev.filter(x => x !== 'opt2'))}
                    />
                    <NeuronCheckbox
                      size="sm"
                      label="Option 3"
                      checked={dont3Checkboxes.includes('opt3')}
                      onChange={(ck) => setDont3Checkboxes(prev => ck ? [...prev, 'opt3'] : prev.filter(x => x !== 'opt3'))}
                    />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{rd.dont3Title}</div>
                  <div className="rule-card__desc">{rd.dont3Desc}</div>
                </div>
              </RuleCard>

            </div>
          </div>

          {/* ── 6. CONTENT GUIDELINES (DIRECTLY FROM LEGION) ── */}
          <div className="section-card">
            <h2 className="section-title">{rd.contentGuidelinesTitle}</h2>
            <p className="section-description">{rd.contentGuidelinesDesc}</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-4)'
            }}>
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                  <span style={{ color: 'var(--brand-500)' }}>01</span> Explicit Purpose & State
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {rd.content1}
                </p>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                  <span style={{ color: 'var(--brand-500)' }}>02</span> Single-Line Label
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {rd.content2}
                </p>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                  <span style={{ color: 'var(--brand-500)' }}>03</span> Dynamic Text Labels
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {rd.content3}
                </p>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                  <span style={{ color: 'var(--brand-500)' }}>04</span> Typography Standard
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {rd.content4}
                </p>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                  <span style={{ color: 'var(--brand-500)' }}>05</span> Group Placement
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {rd.content5}
                </p>
              </div>
            </div>
          </div>

          {/* ── 7. SIZE & TOUCH TARGET GUIDE ── */}
          <div className="section-card">
            <h2 className="section-title">{rd.sizeTitle}</h2>
            <p className="section-description">{rd.sizeDesc}</p>

            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Outer Diameter</th>
                    <th>Inner Indicator Dot</th>
                    <th>Touch Target Area</th>
                    <th>Recommended Context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>sm</code></td>
                    <td><code>16 × 16px</code></td>
                    <td><code>6px</code></td>
                    <td><code>44 × 44px</code></td>
                    <td>Dense data tables, high-density settings sheets, compact cards.</td>
                  </tr>
                  <tr>
                    <td><code>md (Default)</code></td>
                    <td><code>20 × 20px</code></td>
                    <td><code>8px</code></td>
                    <td><code>44 × 44px</code></td>
                    <td>Standard form flows, modal dialogs, configuration wizards.</td>
                  </tr>
                  <tr>
                    <td><code>lg</code></td>
                    <td><code>24 × 24px</code></td>
                    <td><code>10px</code></td>
                    <td><code>48 × 48px</code></td>
                    <td>Touch-first mobile layouts, prominent pricing plan pickers.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB 2: PLAYBOOK
          ══════════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">

          {/* ── 1. PRODUCTION PATTERNS ── */}
          <div className="section-card">
            <h2 className="section-title">{rd.patternsTitle}</h2>
            <p className="section-description">{rd.patternsDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              
              {/* ── Pattern 1: SaaS Subscription Tier & Billing ── */}
              <div style={{ 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-6)', 
                background: 'var(--color-bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      {rd.patternPlanTitle}
                    </div>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                      {rd.patternPlanDesc}
                    </p>
                  </div>

                  {/* Billing Toggle */}
                  <div style={{ 
                    display: 'inline-flex', 
                    background: 'var(--color-bg-subtle)', 
                    padding: '3px', 
                    borderRadius: 'var(--radius-full)', 
                    border: '1px solid var(--color-border)',
                    alignItems: 'center'
                  }}>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      style={{
                        border: 'none',
                        background: billingCycle === 'monthly' ? 'var(--color-bg-surface)' : 'transparent',
                        color: billingCycle === 'monthly' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        boxShadow: billingCycle === 'monthly' ? 'var(--shadow-xs)' : 'none',
                        borderRadius: 'var(--radius-full)',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('annual')}
                      style={{
                        border: 'none',
                        background: billingCycle === 'annual' ? 'var(--color-bg-surface)' : 'transparent',
                        color: billingCycle === 'annual' ? 'var(--brand-600)' : 'var(--color-text-secondary)',
                        boxShadow: billingCycle === 'annual' ? 'var(--shadow-xs)' : 'none',
                        borderRadius: 'var(--radius-full)',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      Annual <span style={{ fontSize: '9px', background: 'var(--emerald-100, #d1fae5)', color: 'var(--emerald-700, #047857)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>-20%</span>
                    </button>
                  </div>
                </div>

                <NeuronRadioGroup
                  value={pricingPlan}
                  onChange={(val) => setPricingPlan(val as any)}
                  direction="vertical"
                  style={{ gap: '10px' }}
                >
                  {/* Starter Tier */}
                  <div 
                    onClick={() => setPricingPlan('starter')}
                    className={`selectable-pattern-card selectable-pattern-card--blue ${pricingPlan === 'starter' ? 'is-selected' : ''}`}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <NeuronRadio value="starter" variant="blue" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Rocket size={16} color="var(--blue-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Starter Plan</strong>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '3px 0 6px 0' }}>
                          Up to 5 seats · 10 GB cloud storage · Standard support
                        </p>
                        <div style={{ display: 'flex', gap: '6px', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                          <span>✓ Essential UI components</span>
                          <span>·</span>
                          <span>✓ Single workspace</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        ${getPlanPrice('starter')}<span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--color-text-secondary)' }}>/mo</span>
                      </div>
                    </div>
                  </div>

                  {/* Pro Tier (Popular) */}
                  <div 
                    onClick={() => setPricingPlan('pro')}
                    className={`selectable-pattern-card selectable-pattern-card--brand ${pricingPlan === 'pro' ? 'is-selected' : ''}`}
                    style={{ position: 'relative' }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <NeuronRadio value="pro" variant="brand" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Sparkles size={16} color="var(--brand-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Professional Tier</strong>
                          <NeuronBadge variant="brand" size="sm">POPULAR</NeuronBadge>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '3px 0 6px 0' }}>
                          Unlimited seats · 100 GB storage · 24/7 SLA · Automated CI/CD
                        </p>
                        <div style={{ display: 'flex', gap: '6px', fontSize: '11px', color: 'var(--brand-600)', fontWeight: 500 }}>
                          <span>✓ Full design system tokens</span>
                          <span>·</span>
                          <span>✓ Priority support</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        ${getPlanPrice('pro')}<span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--color-text-secondary)' }}>/mo</span>
                      </div>
                    </div>
                  </div>

                  {/* Enterprise Tier */}
                  <div 
                    onClick={() => setPricingPlan('enterprise')}
                    className={`selectable-pattern-card selectable-pattern-card--purple ${pricingPlan === 'enterprise' ? 'is-selected' : ''}`}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <NeuronRadio value="enterprise" variant="purple" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Building2 size={16} color="var(--purple-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Enterprise Custom</strong>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '3px 0 6px 0' }}>
                          Dedicated VPC · SAML SSO · 99.99% SLA · Dedicated CSM
                        </p>
                        <div style={{ display: 'flex', gap: '6px', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                          <span>✓ Custom security audits</span>
                          <span>·</span>
                          <span>✓ Custom SLA</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        ${getPlanPrice('enterprise')}<span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--color-text-secondary)' }}>/mo</span>
                      </div>
                    </div>
                  </div>
                </NeuronRadioGroup>

                {/* Plan Action Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Billed {billingCycle === 'annual' ? 'yearly' : 'monthly'} · Cancel anytime
                  </span>
                  <NeuronButton variant="primary" size="sm" leadingIcon={<Check size={14} />}>
                    Continue with {pricingPlan === 'starter' ? 'Starter' : pricingPlan === 'pro' ? 'Pro' : 'Enterprise'}
                  </NeuronButton>
                </div>
              </div>

              {/* ── Pattern 2: E-Commerce Shipping & Fulfillment ── */}
              <div style={{ 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-6)', 
                background: 'var(--color-bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    {rd.patternShippingTitle}
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {rd.patternShippingDesc}
                  </p>
                </div>

                <NeuronRadioGroup
                  value={shippingOption}
                  onChange={(val) => setShippingOption(val as any)}
                  direction="vertical"
                  style={{ gap: '10px' }}
                >
                  {/* Ground Shipping */}
                  <div
                    onClick={() => setShippingOption('ground')}
                    className={`selectable-pattern-card selectable-pattern-card--gray ${shippingOption === 'ground' ? 'is-selected' : ''}`}
                    style={{ alignItems: 'center' }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <NeuronRadio value="ground" variant="gray" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Truck size={16} color="var(--slate-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Standard Ground Delivery</strong>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          Estimated 4–6 business days (USPS Ground)
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--emerald-600)' }}>
                      Free
                    </span>
                  </div>

                  {/* Express Priority */}
                  <div
                    onClick={() => setShippingOption('express')}
                    className={`selectable-pattern-card selectable-pattern-card--brand ${shippingOption === 'express' ? 'is-selected' : ''}`}
                    style={{ alignItems: 'center' }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <NeuronRadio value="express" variant="brand" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <PackageCheck size={16} color="var(--brand-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Express 2-Day Air</strong>
                          <NeuronBadge variant="brand" size="sm">Recommended</NeuronBadge>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          Guaranteed in 2 business days (FedEx Express)
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      +$12.50
                    </span>
                  </div>

                  {/* Overnight Rush */}
                  <div
                    onClick={() => setShippingOption('overnight')}
                    className={`selectable-pattern-card selectable-pattern-card--orange ${shippingOption === 'overnight' ? 'is-selected' : ''}`}
                    style={{ alignItems: 'center' }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <NeuronRadio value="overnight" variant="orange" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={16} color="var(--orange-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Overnight Priority Rush</strong>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          Next business day by 10:30 AM (DHL Express)
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      +$28.00
                    </span>
                  </div>
                </NeuronRadioGroup>

                {/* Dynamic Order Total Summary */}
                <div style={{ 
                  background: 'var(--color-bg-subtle)', 
                  borderRadius: 'var(--radius-lg)', 
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'block' }}>Order Total (Inc. Tax & Shipping)</span>
                    <strong style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>
                      ${(120 + getShippingFee() + 9.60).toFixed(2)}
                    </strong>
                  </div>
                  <NeuronButton variant="primary" size="sm" leadingIcon={<CreditCard size={14} />}>
                    Proceed to Payment
                  </NeuronButton>
                </div>
              </div>

              {/* ── Pattern 3: DevOps Cloud Region & Infrastructure ── */}
              <div style={{ 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-6)', 
                background: 'var(--color-bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    {rd.patternCloudTitle}
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {rd.patternCloudDesc}
                  </p>
                </div>

                <NeuronRadioGroup
                  value={cloudRegion}
                  onChange={(val) => setCloudRegion(val as any)}
                  direction="vertical"
                  style={{ gap: '10px' }}
                >
                  {/* US East */}
                  <div
                    onClick={() => setCloudRegion('us-east')}
                    className={`selectable-pattern-card selectable-pattern-card--blue ${cloudRegion === 'us-east' ? 'is-selected' : ''}`}
                    style={{ alignItems: 'center' }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <NeuronRadio value="us-east" variant="blue" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Server size={16} color="var(--blue-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>US East (N. Virginia · us-east-1)</strong>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          3 Availability Zones · High Compute & Memory Availability
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--emerald-500)' }} />
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--emerald-600)' }}>18ms</span>
                    </div>
                  </div>

                  {/* EU Central */}
                  <div
                    onClick={() => setCloudRegion('eu-central')}
                    className={`selectable-pattern-card selectable-pattern-card--success ${cloudRegion === 'eu-central' ? 'is-selected' : ''}`}
                    style={{ alignItems: 'center' }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <NeuronRadio value="eu-central" variant="success" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Globe size={16} color="var(--emerald-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>EU Central (Frankfurt · eu-central-1)</strong>
                          <NeuronBadge variant="success" size="sm">GDPR</NeuronBadge>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          100% Renewable Powered · ISO 27001 Certified
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--emerald-500)' }} />
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--emerald-600)' }}>29ms</span>
                    </div>
                  </div>

                  {/* Asia Pacific */}
                  <div
                    onClick={() => setCloudRegion('ap-southeast')}
                    className={`selectable-pattern-card selectable-pattern-card--purple ${cloudRegion === 'ap-southeast' ? 'is-selected' : ''}`}
                    style={{ alignItems: 'center' }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <NeuronRadio value="ap-southeast" variant="purple" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Cpu size={16} color="var(--purple-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Asia Pacific (Singapore · ap-southeast-1)</strong>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          Ultra-low latency edge node for Southeast Asia
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--emerald-500)' }} />
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--emerald-600)' }}>45ms</span>
                    </div>
                  </div>
                </NeuronRadioGroup>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Specs: 8 vCPU · 32 GB RAM · 500 GB NVMe
                  </span>
                  <NeuronButton variant="primary" size="sm" leadingIcon={<Zap size={14} />}>
                    Deploy Cluster Node
                  </NeuronButton>
                </div>
              </div>

              {/* ── Pattern 4: Workspace Role & Access Control (RBAC) ── */}
              <div style={{ 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-6)', 
                background: 'var(--color-bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    {rd.patternRbacTitle}
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {rd.patternRbacDesc}
                  </p>
                </div>

                <NeuronRadioGroup
                  value={userRole}
                  onChange={(val) => setUserRole(val as any)}
                  direction="vertical"
                  style={{ gap: '10px' }}
                >
                  {/* Viewer */}
                  <div
                    onClick={() => setUserRole('viewer')}
                    className={`selectable-pattern-card selectable-pattern-card--gray ${userRole === 'viewer' ? 'is-selected' : ''}`}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <NeuronRadio value="viewer" variant="gray" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Eye size={16} color="var(--slate-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Viewer (Read Only)</strong>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '2px 0 0 0' }}>
                          Can browse workspace projects and view reports. Cannot edit components or settings.
                        </p>
                      </div>
                    </div>
                    <NeuronBadge variant="gray" size="sm">Read Only</NeuronBadge>
                  </div>

                  {/* Editor */}
                  <div
                    onClick={() => setUserRole('editor')}
                    className={`selectable-pattern-card selectable-pattern-card--indigo ${userRole === 'editor' ? 'is-selected' : ''}`}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <NeuronRadio value="editor" variant="indigo" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <UserCheck size={16} color="var(--sky-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Editor (Read & Write)</strong>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '2px 0 0 0' }}>
                          Can create & edit designs, build tokens, and trigger deployment workflows.
                        </p>
                      </div>
                    </div>
                    <NeuronBadge variant="indigo" size="sm">Recommended</NeuronBadge>
                  </div>

                  {/* Administrator */}
                  <div
                    onClick={() => setUserRole('admin')}
                    className={`selectable-pattern-card selectable-pattern-card--brand ${userRole === 'admin' ? 'is-selected' : ''}`}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <NeuronRadio value="admin" variant="brand" size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ShieldCheck size={16} color="var(--brand-500)" />
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Workspace Administrator</strong>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '2px 0 0 0' }}>
                          Full unrestricted governance: manage member roles, billing, and SAML SSO configuration.
                        </p>
                      </div>
                    </div>
                    <NeuronBadge variant="brand" size="sm">Full Access</NeuronBadge>
                  </div>
                </NeuronRadioGroup>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Target: alex.smith@acme.corp
                  </span>
                  <NeuronButton variant="primary" size="sm" leadingIcon={<Lock size={14} />}>
                    Save Role Permissions
                  </NeuronButton>
                </div>
              </div>

            </div>
          </div>

          {/* ── 2. INTERACTIVE PLAYGROUND ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronRadio {t.compShared.playground}</h2>
            <Playground
              name="NeuronRadio"
              knobs={[
                { 
                  name: 'size', 
                  type: 'select', 
                  options: ['sm', 'md', 'lg'], 
                  default: 'md', 
                  label: rd.knobSize 
                },
                { 
                  name: 'variant', 
                  type: 'select', 
                  options: ['brand', 'gray', 'error', 'warning', 'success', 'blue', 'indigo', 'purple', 'pink', 'orange'], 
                  default: 'brand', 
                  label: rd.knobVariant 
                },
                { 
                  name: 'checked', 
                  type: 'boolean', 
                  default: true, 
                  label: 'Selected' 
                },
                { 
                  name: 'disabled', 
                  type: 'boolean', 
                  default: false, 
                  label: rd.knobDisabled 
                },
                { 
                  name: 'isCard', 
                  type: 'boolean', 
                  default: false, 
                  label: rd.knobIsCard 
                },
                { 
                  name: 'hasDescription', 
                  type: 'boolean', 
                  default: true, 
                  label: rd.knobHasDesc 
                },
                { 
                  name: 'label', 
                  type: 'text', 
                  default: 'Option 1', 
                  label: rd.knobLabel 
                },
                { 
                  name: 'description', 
                  type: 'text', 
                  default: 'Supporting description providing context.', 
                  label: rd.knobDescription 
                },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }
                if (knobs.variant !== 'brand') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (knobs.checked) {
                  reactProps.push('checked');
                  vueProps.push('v-model="isSelected"');
                }
                if (knobs.disabled) {
                  reactProps.push('disabled');
                  vueProps.push('disabled');
                }
                if (knobs.isCard) {
                  reactProps.push('isCard');
                  vueProps.push('isCard');
                }
                if (knobs.label) {
                  reactProps.push(`label="${knobs.label}"`);
                  vueProps.push(`label="${knobs.label}"`);
                }
                if (knobs.hasDescription && knobs.description) {
                  reactProps.push(`description="${knobs.description}"`);
                  vueProps.push(`description="${knobs.description}"`);
                }

                const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
                const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

                const htmlClass = `neuron-radio neuron-radio--${knobs.size} neuron-radio--${knobs.variant} ${knobs.checked ? 'is-checked' : 'is-unchecked'}`;

                return {
                  react: `<NeuronRadio${reactAttr}/>`,
                  vue: `<NeuronRadio${vueAttr}/>`,
                  html: `<label class="neuron-radio-wrapper neuron-radio-wrapper--${knobs.size}">\n  <button type="button" role="radio" class="${htmlClass}">\n    <span class="neuron-radio__circle"></span>\n  </button>\n  <div class="neuron-radio-label-wrap">\n    <span class="neuron-radio-label">${knobs.label}</span>\n${knobs.hasDescription && knobs.description ? `    <span class="neuron-radio-description">${knobs.description}</span>\n` : ''}  </div>\n</label>`,
                };
              }}
            >
              {(knobs) => (
                <div style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'center' }}>
                  <NeuronRadio
                    size={knobs.size as NeuronRadioSize}
                    variant={knobs.variant as NeuronRadioVariant}
                    checked={knobs.checked as boolean}
                    disabled={knobs.disabled as boolean}
                    isCard={knobs.isCard as boolean}
                    label={knobs.label as string}
                    description={knobs.hasDescription ? (knobs.description as string) : undefined}
                  />
                </div>
              )}
            </Playground>
          </div>

          {/* ── 3. API REFERENCE ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.apiReference}</h2>
            
            <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
              NeuronRadio Props
            </h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>{t.compShared.prop}</th>
                    <th>{t.compShared.type}</th>
                    <th>{t.compShared.default}</th>
                    <th>{t.compShared.description}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>checked</code></td>
                    <td><code>boolean</code></td>
                    <td><code>undefined</code></td>
                    <td>{rd.apiChecked}</td>
                  </tr>
                  <tr>
                    <td><code>defaultChecked</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{rd.apiDefaultChecked}</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(checked: boolean) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>{rd.apiOnChange}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>{rd.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'brand' | 'gray' | 'error' | 'warning' | 'success' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange'</code></td>
                    <td><code>'brand'</code></td>
                    <td>{rd.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{rd.apiDisabled}</td>
                  </tr>
                  <tr>
                    <td><code>label</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{rd.apiLabel}</td>
                  </tr>
                  <tr>
                    <td><code>description</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{rd.apiDescription}</td>
                  </tr>
                  <tr>
                    <td><code>labelPosition</code></td>
                    <td><code>'right' | 'left'</code></td>
                    <td><code>'right'</code></td>
                    <td>{rd.apiLabelPosition}</td>
                  </tr>
                  <tr>
                    <td><code>isCard</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{rd.apiIsCard}</td>
                  </tr>
                  <tr>
                    <td><code>required</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{rd.apiRequired}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-3)' }}>
              NeuronRadioGroup Props
            </h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>{t.compShared.prop}</th>
                    <th>{t.compShared.type}</th>
                    <th>{t.compShared.default}</th>
                    <th>{t.compShared.description}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>value</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>{rd.apiGroupValue}</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(value: string) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>{rd.apiGroupOnChange}</td>
                  </tr>
                  <tr>
                    <td><code>name</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>{rd.apiGroupName}</td>
                  </tr>
                  <tr>
                    <td><code>direction</code></td>
                    <td><code>'vertical' | 'horizontal'</code></td>
                    <td><code>'vertical'</code></td>
                    <td>{rd.apiGroupDirection}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ── Next / Previous Navigation Footer ── */}
      <NextPrevious
        prev={{ id: 'comp-progress', label: t.nav.compProgress }}
        next={{ id: 'comp-table', label: t.nav.compTable }}
        setActiveTab={setActiveTab}
      />

    </div>
  );
};

export default RadioView;
