import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import NeuronCheckbox, { 
  NeuronCheckboxSize, 
  NeuronCheckboxShape, 
  NeuronCheckboxVariant 
} from '../components/NeuronCheckbox';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { 
  ListFilter, 
  ShieldCheck, 
  Layers, 
  CreditCard, 
  Trash2, 
  Download 
} from 'lucide-react';

interface CheckboxViewProps {
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

export const CheckboxView: React.FC<CheckboxViewProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTabLocal] = useState<'guideline' | 'playbook'>('guideline');
  const [overviewFilter, setOverviewFilter] = useState<'all' | 'brand' | 'semantic' | 'accent'>('all');

  const cb = t.checkbox;

  // ── 10 Color Variants aligned with Design Tokens ──
  const COLOR_VARIANTS: NeuronCheckboxVariant[] = [
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

  const getColorLabel = (variant: NeuronCheckboxVariant): string => {
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

  // ── Theme Matrix interactive state (Playbook) ──
  const [themeChecked, setThemeChecked] = useState<Record<string, boolean>>({
    brand: true,
    gray: true,
    error: true,
    warning: true,
    success: true,
    blue: true,
    indigo: true,
    purple: true,
    pink: true,
    orange: true,
  });

  // ── Pattern 2: Bulk Table Selector with Indeterminate Parent ──
  const [tableSelected, setTableSelected] = useState<number[]>([1, 2]);
  const TABLE_ROWS = [
    { id: 1, name: 'Analytics_Dashboard_v2.fig', size: '24.8 MB', updated: '2 hours ago' },
    { id: 2, name: 'Design_System_Tokens.json', size: '1.2 MB', updated: 'Yesterday' },
    { id: 3, name: 'User_Research_Interviews.pdf', size: '8.4 MB', updated: '3 days ago' },
    { id: 4, name: 'Product_Roadmap_Q3.xlsx', size: '4.1 MB', updated: 'Last week' },
  ];
  const isAllSelected = tableSelected.length === TABLE_ROWS.length;
  const isIndeterminate = tableSelected.length > 0 && tableSelected.length < TABLE_ROWS.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setTableSelected([]);
    } else {
      setTableSelected(TABLE_ROWS.map(r => r.id));
    }
  };

  const handleSelectRow = (id: number) => {
    setTableSelected(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // ── Pattern 3: Filter Multi-Select ──
  const [filterTags, setFilterTags] = useState<string[]>(['react', 'typescript']);
  const FILTER_OPTIONS = [
    { id: 'react', label: 'React Framework', count: 124 },
    { id: 'vue', label: 'Vue 3 Ecosystem', count: 86 },
    { id: 'typescript', label: 'TypeScript Strict', count: 210 },
    { id: 'tailwind', label: 'CSS Modules / Vanilla', count: 95 },
  ];
  const toggleFilter = (id: string) => {
    setFilterTags(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // ── Pattern 4: Selectable Compound Cards ──
  const [selectedCards, setSelectedCards] = useState<string[]>(['backup', 'security']);
  const toggleCardSelection = (cardId: string) => {
    setSelectedCards(prev =>
      prev.includes(cardId) ? prev.filter(x => x !== cardId) : [...prev, cardId]
    );
  };

  return (
    <div className="component-view">
      
      {/* ── Standardized Header Structure ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{cb.category}</span>
            <h1 className="page-title">{cb.title}</h1>
            <p className="page-subtitle">{cb.subtitle}</p>
          </div>
        </div>

        {/* ── Standardized Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setActiveTabLocal('guideline')}
          >
            Guideline
          </button>
          <button
            type="button"
            className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setActiveTabLocal('playbook')}
          >
            Playbook
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TAB 1: GUIDELINE
          ══════════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">

          {/* ── 1. VISUAL SPECIFICATION (EXACT MATRIX SHOWCASE) ── */}
          <div className="section-card">
            <h2 className="section-title">Visual Specification</h2>
            <p className="section-description">All size, color, state, and label configurations aligned to Neudela design tokens.</p>

            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">Checkbox Matrix Showcase</div>
                  <div className="badge-spec-subtitle">
                    10 Color Themes × 6 State Configurations · sm (16×16px), md (20×20px), lg (24×24px)
                  </div>
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
                      <th style={{ width: '190px', minWidth: '190px' }}>CHECKED (SM · MD · LG)</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>DISABLED OFF</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>DISABLED ON</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>INDETERMINATE (−)</th>
                      <th style={{ minWidth: '240px' }}>WITH LABEL & SUBTITLE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVariants.map((c) => (
                      <tr key={c}>
                        {/* 1. Checked (sm, md, lg) */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronCheckbox variant={c} size="sm" defaultChecked={true} />
                            <NeuronCheckbox variant={c} size="md" defaultChecked={true} />
                            <NeuronCheckbox variant={c} size="lg" defaultChecked={true} />
                          </div>
                        </td>

                        {/* 2. Disabled Off */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronCheckbox variant={c} size="sm" defaultChecked={false} disabled />
                            <NeuronCheckbox variant={c} size="md" defaultChecked={false} disabled />
                            <NeuronCheckbox variant={c} size="lg" defaultChecked={false} disabled />
                          </div>
                        </td>

                        {/* 3. Disabled On */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronCheckbox variant={c} size="sm" defaultChecked={true} disabled />
                            <NeuronCheckbox variant={c} size="md" defaultChecked={true} disabled />
                            <NeuronCheckbox variant={c} size="lg" defaultChecked={true} disabled />
                          </div>
                        </td>

                        {/* 4. Indeterminate (-) */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronCheckbox variant={c} size="sm" indeterminate />
                            <NeuronCheckbox variant={c} size="md" indeterminate />
                            <NeuronCheckbox variant={c} size="lg" indeterminate />
                          </div>
                        </td>

                        {/* 5. With Label & Description */}
                        <td>
                          <NeuronCheckbox 
                            variant={c} 
                            size="md" 
                            defaultChecked={true} 
                            label={getColorLabel(c)}
                            description="Instant preference switch"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── 2. ANATOMY DIAGRAM ── */}
          <div className="section-card">
            <h2 className="section-title">{cb.anatomyTitle}</h2>
            <p className="section-description">{cb.anatomyDesc}</p>

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
                    {/* Line 1: Checkbox Box Container (Left) */}
                    <line x1="38" y1="74" x2="68" y2="74" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    
                    {/* Line 2: Checkmark Icon (Top - points directly inside to the glyph) */}
                    <line x1="82" y1="32" x2="82" y2="68" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    
                    {/* Line 3: Focus Ring (Bottom - touches the 4px halo ring) */}
                    <line x1="82" y1="92" x2="82" y2="140" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    
                    {/* Line 4: Primary Label (Top) */}
                    <line x1="190" y1="32" x2="190" y2="58" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    
                    {/* Line 5: Supporting Description (Bottom) */}
                    <line x1="240" y1="98" x2="240" y2="140" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                  </svg>

                  {/* Target Component precisely situated */}
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
                    {/* 28x28 Checkbox Box */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '7px',
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
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

                  {/* Marker 1: Checkbox Box (Far Left) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '16px', 
                    top: '63px', 
                    zIndex: 20
                  }}>
                    <span className="anatomy-marker">1</span>
                  </div>

                  {/* Marker 2: Checkmark Icon (Top of Box) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '71px', 
                    top: '10px', 
                    zIndex: 20
                  }}>
                    <span className="anatomy-marker">2</span>
                  </div>

                  {/* Marker 3: Focus Ring (Bottom of Box) */}
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
                <AnatomyLabel number={1} label={cb.anatomyBoxLabel} desc={cb.anatomyBoxDesc} />
                <AnatomyLabel number={2} label={cb.anatomyIconLabel} desc={cb.anatomyIconDesc} />
                <AnatomyLabel number={3} label={cb.anatomyFocusLabel} desc={cb.anatomyFocusDesc} />
                <AnatomyLabel number={4} label={cb.anatomyLabelLabel} desc={cb.anatomyLabelDesc} />
                <AnatomyLabel number={5} label={cb.anatomyDescLabel} desc={cb.anatomyDescDesc} />
              </div>
            </div>
          </div>

          {/* ── 3. WHEN TO USE GRID ── */}
          <div className="section-card">
            <h2 className="section-title">{cb.whenToUseTitle}</h2>
            <p className="section-description">{cb.whenToUseDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-5)' }}>
              
              {/* Scenario 1: Multi-Select Options */}
              <div style={{ 
                background: 'var(--color-bg-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-5)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--brand-50)', color: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ListFilter size={16} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{cb.whenMultiTitle}</span>
                    </div>
                    <NeuronBadge size="sm" variant="brand">Multi-Select</NeuronBadge>
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {cb.whenMultiDesc}
                  </p>
                </div>

                <div style={{ background: 'var(--color-bg-subtle)', padding: '14px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <NeuronCheckbox size="sm" label="Dark Mode" defaultChecked={true} />
                  <NeuronCheckbox size="sm" label="Compact Spacing" defaultChecked={false} />
                  <NeuronCheckbox size="sm" label="Show Line Numbers" defaultChecked={true} />
                </div>
              </div>

              {/* Scenario 2: Agreement & Consent */}
              <div style={{ 
                background: 'var(--color-bg-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-5)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldCheck size={16} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{cb.whenConsentTitle}</span>
                    </div>
                    <NeuronBadge size="sm" variant="success">Consent Opt-in</NeuronBadge>
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {cb.whenConsentDesc}
                  </p>
                </div>

                <div style={{ background: 'var(--color-bg-subtle)', padding: '14px', borderRadius: 'var(--radius-lg)' }}>
                  <NeuronCheckbox 
                    size="sm" 
                    defaultChecked={true}
                    label={
                      <span>
                        I agree to the <strong style={{ color: 'var(--brand-600)' }}>Terms of Service</strong> and Privacy Policy.
                      </span>
                    } 
                  />
                </div>
              </div>

              {/* Scenario 3: Parent-Child Bulk Selection */}
              <div style={{ 
                background: 'var(--color-bg-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-5)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--sky-50)', color: 'var(--sky-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layers size={16} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{cb.whenTreeTitle}</span>
                    </div>
                    <NeuronBadge size="sm" variant="blue">Indeterminate</NeuronBadge>
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {cb.whenTreeDesc}
                  </p>
                </div>

                <div style={{ background: 'var(--color-bg-subtle)', padding: '14px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <NeuronCheckbox size="sm" indeterminate label={<strong style={{ fontSize: '12px' }}>Select All Items (2 of 4)</strong>} />
                  <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', borderLeft: '1px solid var(--color-border)', marginLeft: '8px' }}>
                    <NeuronCheckbox size="sm" defaultChecked={true} label="Project_Assets_v1.fig" />
                    <NeuronCheckbox size="sm" defaultChecked={false} label="Design_Tokens.json" />
                  </div>
                </div>
              </div>

              {/* Scenario 4: Selectable Compound Cards */}
              <div style={{ 
                background: 'var(--color-bg-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-5)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--purple-50)', color: 'var(--purple-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CreditCard size={16} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{cb.whenCardTitle}</span>
                    </div>
                    <NeuronBadge size="sm" variant="purple">Card Container</NeuronBadge>
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {cb.whenCardDesc}
                  </p>
                </div>

                <div style={{ background: 'var(--color-bg-subtle)', padding: '14px', borderRadius: 'var(--radius-lg)' }}>
                  <NeuronCheckbox 
                    isCard 
                    size="sm"
                    defaultChecked={true}
                    label={<strong style={{ fontSize: '13px' }}>Automated Daily Backups</strong>}
                    description="Cloud snapshot synced every 24h (+ $5/mo)"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ── 4. DO'S AND DON'TS ── */}
          <div className="section-card">
            <h2 className="section-title">{cb.dodontTitle}</h2>
            <p className="section-description">{cb.dodontDesc}</p>

            <div className="dodont-grid">
              {/* Rule 1 */}
              <RuleCard type="do">
                <div className="rule-card__preview">
                  <NeuronCheckbox size="sm" label="Allow multiple feature choices" defaultChecked={true} />
                  <NeuronCheckbox size="sm" label="Select additional plugins" defaultChecked={true} />
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{cb.do1Title}</div>
                  <div className="rule-card__desc">{cb.do1Desc}</div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview">
                  <NeuronCheckbox size="sm" label="Monthly Payment (Exclusive choice)" defaultChecked={true} />
                  <NeuronCheckbox size="sm" label="Annual Payment (Exclusive choice)" defaultChecked={false} />
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{cb.dont1Title}</div>
                  <div className="rule-card__desc">{cb.dont1Desc}</div>
                </div>
              </RuleCard>

              {/* Rule 2 */}
              <RuleCard type="do">
                <div className="rule-card__preview">
                  <NeuronCheckbox size="sm" label="Click anywhere on this label text to toggle" defaultChecked={true} />
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{cb.do2Title}</div>
                  <div className="rule-card__desc">{cb.do2Desc}</div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview" style={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                  <NeuronCheckbox size="sm" defaultChecked={false} />
                  <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', cursor: 'default' }}>
                    Unlinked plain text label (hard to click)
                  </span>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{cb.dont2Title}</div>
                  <div className="rule-card__desc">{cb.dont2Desc}</div>
                </div>
              </RuleCard>

              {/* Rule 3 */}
              <RuleCard type="do">
                <div className="rule-card__preview">
                  <NeuronCheckbox size="sm" indeterminate label="Bulk Select (Partially Selected)" />
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{cb.do3Title}</div>
                  <div className="rule-card__desc">{cb.do3Desc}</div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview">
                  <NeuronCheckbox size="sm" defaultChecked={true} label="Select All (Even when only 1 item is chosen)" />
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{cb.dont3Title}</div>
                  <div className="rule-card__desc">{cb.dont3Desc}</div>
                </div>
              </RuleCard>
            </div>
          </div>

          {/* ── 5. SIZE & SHAPE GUIDELINES ── */}
          <div className="section-card">
            <h2 className="section-title">{cb.sizeTitle}</h2>
            <p className="section-description">{cb.sizeDesc}</p>

            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Size Token</th>
                    <th>Box Dimensions</th>
                    <th>Icon Size</th>
                    <th>Typography</th>
                    <th>Usage Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>sm</code></td>
                    <td>16 × 16 px</td>
                    <td>10 px</td>
                    <td>13px Label · 11px Desc</td>
                    <td>{cb.sizeSmUsage}</td>
                  </tr>
                  <tr>
                    <td><code>md</code> (Default)</td>
                    <td>20 × 20 px</td>
                    <td>12 px</td>
                    <td>14px Label · 12px Desc</td>
                    <td>{cb.sizeMdUsage}</td>
                  </tr>
                  <tr>
                    <td><code>lg</code></td>
                    <td>24 × 24 px</td>
                    <td>14 px</td>
                    <td>16px Label · 14px Desc</td>
                    <td>{cb.sizeLgUsage}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 6. ACCESSIBILITY ── */}
          <div className="section-card">
            <h2 className="section-title">{cb.a11yTitle}</h2>
            <p className="section-description">{cb.a11yDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {cb.a11yKeyboardTitle}
                </h4>
                <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {cb.a11yKeyboardDesc}
                </p>
              </div>

              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {cb.a11yAriaTitle}
                </h4>
                <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {cb.a11yAriaDesc}
                </p>
              </div>

              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {cb.a11yContrastTitle}
                </h4>
                <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {cb.a11yContrastDesc}
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB 2: PLAYBOOK
          ══════════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">

          {/* ── 1. SHAPE & CORNER RADIUS VARIANTS ── */}
          <div className="section-card">
            <h2 className="section-title">{cb.shapesTitle}</h2>
            <p className="section-description">{cb.shapesDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-5)' }}>
              {/* Rounded-sm */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Rounded-sm (4px)</span>
                  <NeuronBadge size="sm" variant="gray">Square / Sharp</NeuronBadge>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--color-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg)', justifyContent: 'center' }}>
                  <NeuronCheckbox size="lg" shape="rounded-sm" defaultChecked={false} />
                  <NeuronCheckbox size="lg" shape="rounded-sm" defaultChecked={true} />
                  <NeuronCheckbox size="lg" shape="rounded-sm" indeterminate />
                </div>
              </div>

              {/* Rounded-md */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Rounded-md (6px)</span>
                  <NeuronBadge size="sm" variant="brand">Standard</NeuronBadge>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--color-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg)', justifyContent: 'center' }}>
                  <NeuronCheckbox size="lg" shape="rounded-md" defaultChecked={false} />
                  <NeuronCheckbox size="lg" shape="rounded-md" defaultChecked={true} />
                  <NeuronCheckbox size="lg" shape="rounded-md" indeterminate />
                </div>
              </div>

              {/* Rounded-full */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Rounded-full (Circle)</span>
                  <NeuronBadge size="sm" variant="purple">Circular</NeuronBadge>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--color-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg)', justifyContent: 'center' }}>
                  <NeuronCheckbox size="lg" shape="rounded-full" defaultChecked={false} />
                  <NeuronCheckbox size="lg" shape="rounded-full" defaultChecked={true} />
                  <NeuronCheckbox size="lg" shape="rounded-full" indeterminate />
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. COLOR THEME MATRIX ── */}
          <div className="section-card">
            <h2 className="section-title">{cb.themesTitle}</h2>
            <p className="section-description">{cb.themesDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
              {COLOR_VARIANTS.map((th) => (
                <div 
                  key={th} 
                  style={{ 
                    border: '1px solid var(--color-border)', 
                    borderRadius: 'var(--radius-lg)', 
                    padding: 'var(--space-4)', 
                    background: 'var(--color-bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <NeuronCheckbox
                    size="md"
                    variant={th}
                    checked={themeChecked[th]}
                    onChange={(c) => setThemeChecked(prev => ({ ...prev, [th]: c }))}
                    label={<span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{th} theme</span>}
                  />
                  <NeuronBadge size="sm" variant={th}>
                    {th}
                  </NeuronBadge>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. PRODUCTION CHECKBOX PATTERNS ── */}
          <div className="section-card">
            <h2 className="section-title">{cb.patternsTitle}</h2>
            <p className="section-description">{cb.patternsDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
              
              {/* Pattern 1: Authentication "Remember Me" */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {cb.patternRememberTitle}
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '0 0 16px 0' }}>
                  {cb.patternRememberDesc}
                </p>

                <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <NeuronCheckbox 
                      size="sm" 
                      defaultChecked={true} 
                      label={<span style={{ fontSize: '13px' }}>Remember for 30 days</span>}
                    />
                    <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', color: 'var(--brand-600)', textDecoration: 'none', fontWeight: 600 }}>
                      Forgot password?
                    </a>
                  </div>

                  <NeuronButton size="sm" variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Sign in to Account
                  </NeuronButton>
                </div>
              </div>

              {/* Pattern 2: Bulk Table Row Selector with Indeterminate Parent */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {cb.patternBulkTitle}
                  </div>
                  <NeuronBadge size="sm" variant={tableSelected.length > 0 ? 'brand' : 'gray'}>
                    {tableSelected.length} Selected
                  </NeuronBadge>
                </div>

                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  {/* Table Header with Master Checkbox */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)' }}>
                    <NeuronCheckbox 
                      size="sm" 
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onChange={handleSelectAll}
                      label={<strong style={{ fontSize: '12px' }}>File Name ({TABLE_ROWS.length})</strong>}
                    />
                    {tableSelected.length > 0 && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button type="button" style={{ border: 'none', background: 'transparent', color: 'var(--brand-600)', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                          <Download size={12} /> Export
                        </button>
                        <button type="button" style={{ border: 'none', background: 'transparent', color: 'var(--red-600)', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Rows */}
                  {TABLE_ROWS.map(row => {
                    const isRowChecked = tableSelected.includes(row.id);
                    return (
                      <div 
                        key={row.id}
                        onClick={() => handleSelectRow(row.id)}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          padding: '10px 14px',
                          borderBottom: '1px solid var(--color-border)',
                          background: isRowChecked ? 'var(--brand-50)' : 'var(--color-bg-surface)',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <NeuronCheckbox 
                          size="sm" 
                          checked={isRowChecked}
                          onChange={() => handleSelectRow(row.id)}
                          label={<span style={{ fontSize: '12px', fontWeight: isRowChecked ? 600 : 400 }}>{row.name}</span>}
                        />
                        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{row.size}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pattern 3: Multi-Select Filter Panel */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {cb.patternFilterTitle}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setFilterTags([])}
                    style={{ border: 'none', background: 'transparent', color: 'var(--brand-600)', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Reset filters
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'var(--color-bg-subtle)', padding: '14px', borderRadius: 'var(--radius-lg)' }}>
                  {FILTER_OPTIONS.map(opt => {
                    const isChecked = filterTags.includes(opt.id);
                    return (
                      <div key={opt.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <NeuronCheckbox 
                          size="sm"
                          checked={isChecked}
                          onChange={() => toggleFilter(opt.id)}
                          label={opt.label}
                        />
                        <NeuronBadge size="sm" variant={isChecked ? 'brand' : 'gray'}>
                          {opt.count}
                        </NeuronBadge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pattern 4: Selectable Compound Feature Cards */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {cb.patternCardTitle}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <NeuronCheckbox
                    isCard
                    size="sm"
                    checked={selectedCards.includes('backup')}
                    onChange={() => toggleCardSelection('backup')}
                    label={<strong style={{ fontSize: '13px' }}>Automated Cloud Backups</strong>}
                    description="Continuous snapshot storage with instant 1-click restore."
                  />
                  <NeuronCheckbox
                    isCard
                    size="sm"
                    checked={selectedCards.includes('security')}
                    onChange={() => toggleCardSelection('security')}
                    label={<strong style={{ fontSize: '13px' }}>Enterprise Shield & SSO</strong>}
                    description="SAML 2.0 single sign-on and dedicated audit logging."
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ── 4. INTERACTIVE PLAYGROUND ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronCheckbox {t.compShared.playground}</h2>
            <Playground
              name="NeuronCheckbox"
              knobs={[
                { 
                  name: 'size', 
                  type: 'select', 
                  options: ['sm', 'md', 'lg'], 
                  default: 'md', 
                  label: cb.knobSize 
                },
                { 
                  name: 'shape', 
                  type: 'select', 
                  options: ['rounded-sm', 'rounded-md', 'rounded-full'], 
                  default: 'rounded-md', 
                  label: cb.knobShape 
                },
                { 
                  name: 'variant', 
                  type: 'select', 
                  options: ['brand', 'gray', 'error', 'warning', 'success', 'blue', 'indigo', 'purple', 'pink', 'orange'], 
                  default: 'brand', 
                  label: cb.knobVariant 
                },
                { 
                  name: 'checked', 
                  type: 'boolean', 
                  default: true, 
                  label: cb.knobChecked 
                },
                { 
                  name: 'indeterminate', 
                  type: 'boolean', 
                  default: false, 
                  label: cb.knobIndeterminate 
                },
                { 
                  name: 'disabled', 
                  type: 'boolean', 
                  default: false, 
                  label: cb.knobDisabled 
                },
                { 
                  name: 'hasDescription', 
                  type: 'boolean', 
                  default: true, 
                  label: cb.knobHasDesc 
                },
                { 
                  name: 'label', 
                  type: 'text', 
                  default: 'Remember my login credentials', 
                  label: cb.knobLabel 
                },
                { 
                  name: 'description', 
                  type: 'text', 
                  default: 'Save session tokens for fast sign-in on verified devices.', 
                  label: cb.knobDescription 
                },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }
                if (knobs.shape !== 'rounded-md') {
                  reactProps.push(`shape="${knobs.shape}"`);
                  vueProps.push(`shape="${knobs.shape}"`);
                }
                if (knobs.variant !== 'brand') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (knobs.checked) {
                  reactProps.push('checked');
                  vueProps.push('v-model="isChecked"');
                }
                if (knobs.indeterminate) {
                  reactProps.push('indeterminate');
                  vueProps.push(':indeterminate="true"');
                }
                if (knobs.disabled) {
                  reactProps.push('disabled');
                  vueProps.push('disabled');
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

                const htmlClass = `neuron-checkbox neuron-checkbox--${knobs.size} neuron-checkbox--${knobs.shape} neuron-checkbox--${knobs.variant} ${knobs.checked ? 'is-checked' : 'is-unchecked'}`;

                return {
                  react: `<NeuronCheckbox${reactAttr}/>`,
                  vue: `<NeuronCheckbox${vueAttr}/>`,
                  html: `<label class="neuron-checkbox-wrapper neuron-checkbox-wrapper--${knobs.size}">\n  <button type="button" role="checkbox" class="${htmlClass}">\n    <span class="neuron-checkbox__box"></span>\n  </button>\n  <div class="neuron-checkbox-label-wrap">\n    <span class="neuron-checkbox-label">${knobs.label}</span>\n${knobs.hasDescription && knobs.description ? `    <span class="neuron-checkbox-description">${knobs.description}</span>\n` : ''}  </div>\n</label>`,
                };
              }}
            >
              {(knobs) => (
                <div style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'center' }}>
                  <NeuronCheckbox
                    size={knobs.size as NeuronCheckboxSize}
                    shape={knobs.shape as NeuronCheckboxShape}
                    variant={knobs.variant as NeuronCheckboxVariant}
                    checked={knobs.checked as boolean}
                    indeterminate={knobs.indeterminate as boolean}
                    disabled={knobs.disabled as boolean}
                    label={knobs.label as string}
                    description={knobs.hasDescription ? (knobs.description as string) : undefined}
                  />
                </div>
              )}
            </Playground>
          </div>

          {/* ── 5. API REFERENCE ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.apiReference}</h2>
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
                    <td>{cb.apiChecked}</td>
                  </tr>
                  <tr>
                    <td><code>defaultChecked</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{cb.apiDefaultChecked}</td>
                  </tr>
                  <tr>
                    <td><code>indeterminate</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{cb.apiIndeterminate}</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(checked: boolean) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>{cb.apiOnChange}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>{cb.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>shape</code></td>
                    <td><code>'rounded-sm' | 'rounded-md' | 'rounded-full'</code></td>
                    <td><code>'rounded-md'</code></td>
                    <td>{cb.apiShape}</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'brand' | 'gray' | 'error' | 'warning' | 'success' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange'</code></td>
                    <td><code>'brand'</code></td>
                    <td>{cb.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{cb.apiDisabled}</td>
                  </tr>
                  <tr>
                    <td><code>label</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{cb.apiLabel}</td>
                  </tr>
                  <tr>
                    <td><code>description</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{cb.apiDescription}</td>
                  </tr>
                  <tr>
                    <td><code>labelPosition</code></td>
                    <td><code>'right' | 'left'</code></td>
                    <td><code>'right'</code></td>
                    <td>{cb.apiLabelPosition}</td>
                  </tr>
                  <tr>
                    <td><code>isCard</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{cb.apiIsCard}</td>
                  </tr>
                  <tr>
                    <td><code>required</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{cb.apiRequired}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ── Next / Previous Navigation Footer ── */}
      <NextPrevious
        prev={{ id: 'comp-card', label: t.nav.compCard }}
        next={{ id: 'comp-datepicker', label: t.nav.compDatePicker }}
        setActiveTab={setActiveTab}
      />

    </div>
  );
};

export default CheckboxView;
