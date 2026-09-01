import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NeuronToggle, NeuronToggleSize, NeuronToggleVariant } from '../components/NeuronToggle';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';

interface ToggleViewProps {
  setActiveTab: (tab: string) => void;
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
        {isDo ? 'Do' : "Don't"}
      </div>
      <div className="rule-card__content">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Anatomy Label Item
// ─────────────────────────────────────────────
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

export default function ToggleView({ setActiveTab }: ToggleViewProps) {
  const { t } = useLanguage();
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');
  const [overviewFilter, setOverviewFilter] = useState<'all' | 'brand' | 'semantic' | 'accent'>('all');
  const gl = t.toggle.guideline;

  // Interactive demo states
  const [demoChecked2, setDemoChecked2] = useState(false);
  const [demoChecked3, setDemoChecked3] = useState(true);
  const [demoChecked4, setDemoChecked4] = useState(false);

  const COLOR_VARIANTS: NeuronToggleVariant[] = [
    'brand',
    'gray',
    'error',
    'warning',
    'success',
    'blue',
    'indigo',
    'purple',
    'pink',
    'orange'
  ];

  const filteredVariants = COLOR_VARIANTS.filter((c) => {
    if (overviewFilter === 'brand') return c === 'brand' || c === 'gray';
    if (overviewFilter === 'semantic') return c === 'error' || c === 'warning' || c === 'success';
    if (overviewFilter === 'accent') return c === 'blue' || c === 'indigo' || c === 'purple' || c === 'pink' || c === 'orange';
    return true;
  });

  const getColorLabel = (v: NeuronToggleVariant): string => {
    const labelMap: Record<string, string> = {
      gray: t.toggle.gray,
      brand: t.toggle.brand,
      error: t.toggle.error,
      warning: t.toggle.warning,
      success: t.toggle.success,
      blue: t.toggle.blue,
      indigo: t.toggle.indigo,
      purple: t.toggle.purple,
      pink: t.toggle.pink,
      orange: t.toggle.orange,
    };
    return labelMap[v] || v;
  };

  return (
    <div className="toggle-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.toggle.pageTitle}</h1>
            <p className="page-subtitle">{t.toggle.pageSubtitle}</p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setTab('guideline')}
          >
            {gl.tabName}
          </button>
          <button
            className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setTab('playbook')}
          >
            {gl.playbookTabName}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TAB 1 – GUIDELINE
      ══════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">

          {/* ── Overview Visual Specification ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.overviewTitle}</h2>
            <p className="section-description">{gl.overviewDesc}</p>

            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">{t.toggle.overviewToggleHeading}</div>
                  <div className="badge-spec-subtitle">
                    10 Color Themes × 6 State Configurations · sm (36×20px), md (44×24px), lg (52×28px)
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
                      <th style={{ width: '130px', minWidth: '130px' }}>Theme</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>Unchecked (sm · md · lg)</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>Checked (sm · md · lg)</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>Disabled Off</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>Disabled On</th>
                      <th style={{ width: '190px', minWidth: '190px' }}>With Thumb Icon</th>
                      <th style={{ minWidth: '220px' }}>With Label & Subtitle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVariants.map((c) => (
                      <tr key={c}>
                        {/* Theme Label */}
                        <td>
                          <div className="toggle-theme-cell">
                            <span 
                              className="badge-theme-dot" 
                              style={{ 
                                backgroundColor: `var(--${
                                  c === 'gray' ? 'slate-500' :
                                  c === 'brand' ? 'brand-500' :
                                  c === 'error' ? 'red-500' :
                                  c === 'warning' ? 'amber-500' :
                                  c === 'success' ? 'emerald-500' :
                                  c === 'indigo' ? 'sky-500' :
                                  `${c}-500`
                                })` 
                              }} 
                            />
                            <span>{getColorLabel(c)}</span>
                          </div>
                        </td>

                        {/* 1. Unchecked (sm, md, lg) */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronToggle variant={c} size="sm" defaultChecked={false} />
                            <NeuronToggle variant={c} size="md" defaultChecked={false} />
                            <NeuronToggle variant={c} size="lg" defaultChecked={false} />
                          </div>
                        </td>

                        {/* 2. Checked (sm, md, lg) */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronToggle variant={c} size="sm" defaultChecked={true} />
                            <NeuronToggle variant={c} size="md" defaultChecked={true} />
                            <NeuronToggle variant={c} size="lg" defaultChecked={true} />
                          </div>
                        </td>

                        {/* 3. Disabled Off */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronToggle variant={c} size="sm" defaultChecked={false} disabled />
                            <NeuronToggle variant={c} size="md" defaultChecked={false} disabled />
                            <NeuronToggle variant={c} size="lg" defaultChecked={false} disabled />
                          </div>
                        </td>

                        {/* 4. Disabled On */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronToggle variant={c} size="sm" defaultChecked={true} disabled />
                            <NeuronToggle variant={c} size="md" defaultChecked={true} disabled />
                            <NeuronToggle variant={c} size="lg" defaultChecked={true} disabled />
                          </div>
                        </td>

                        {/* 5. With Thumb Icon */}
                        <td>
                          <div className="toggle-cell-flex">
                            <NeuronToggle variant={c} size="sm" defaultChecked={true} hasIcon />
                            <NeuronToggle variant={c} size="md" defaultChecked={true} hasIcon />
                            <NeuronToggle variant={c} size="lg" defaultChecked={true} hasIcon />
                          </div>
                        </td>

                        {/* 6. With Label & Description */}
                        <td>
                          <NeuronToggle 
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

          {/* ── Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.anatomyTitle}</h2>
            <p className="section-description">{gl.anatomyDesc}</p>

            <div className="anatomy-diagram">
              <div className="anatomy-preview" style={{ minHeight: '260px', padding: 'var(--space-8)' }}>
                
                {/* Unified Blueprint Diagram */}
                <div style={{ 
                  position: 'relative', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  padding: '48px 48px 48px 64px',
                  background: 'var(--color-bg-surface)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-xl)'
                }}>
                  
                  {/* Marker 1: Track (pointing from far left) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '8px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px' 
                  }}>
                    <span className="anatomy-marker">1</span>
                    <span style={{ width: '22px', height: '1px', background: 'var(--color-text-primary)' }} />
                  </div>

                  {/* Marker 3: Thumb Icon (pointing from top of knob) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '98px', 
                    top: '6px', 
                    transform: 'translateX(-50%)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '3px' 
                  }}>
                    <span className="anatomy-marker">3</span>
                    <span style={{ width: '1px', height: '16px', background: 'var(--color-text-primary)' }} />
                  </div>

                  {/* Marker 2: Thumb Knob (pointing from bottom of knob) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '98px', 
                    bottom: '6px', 
                    transform: 'translateX(-50%)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '3px' 
                  }}>
                    <span style={{ width: '1px', height: '16px', background: 'var(--color-text-primary)' }} />
                    <span className="anatomy-marker">2</span>
                  </div>

                  {/* Switch Component Target */}
                  <NeuronToggle
                    size="lg"
                    variant="brand"
                    defaultChecked={true}
                    hasIcon
                    label="Push Notifications"
                    description="Receive real-time alerts on your device"
                  />

                  {/* Marker 4: Title Label (pointing from top of label text) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '230px', 
                    top: '6px', 
                    transform: 'translateX(-50%)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '3px' 
                  }}>
                    <span className="anatomy-marker">4</span>
                    <span style={{ width: '1px', height: '16px', background: 'var(--color-text-primary)' }} />
                  </div>

                  {/* Marker 5: Supporting Description (pointing from bottom of description text) */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '230px', 
                    bottom: '6px', 
                    transform: 'translateX(-50%)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '3px' 
                  }}>
                    <span style={{ width: '1px', height: '16px', background: 'var(--color-text-primary)' }} />
                    <span className="anatomy-marker">5</span>
                  </div>

                </div>

              </div>

              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={gl.anatomyTrackLabel} desc={gl.anatomyTrackDesc} />
                <AnatomyLabel number={2} label={gl.anatomyThumbLabel} desc={gl.anatomyThumbDesc} />
                <AnatomyLabel number={3} label={gl.anatomyIconLabel} desc={gl.anatomyIconDesc} />
                <AnatomyLabel number={4} label={gl.anatomyLabelLabel} desc={gl.anatomyLabelDesc} />
                <AnatomyLabel number={5} label={gl.anatomyDescLabel} desc={gl.anatomyDescDesc} />
              </div>
            </div>
          </div>

          {/* ── When to Use Table ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.whenToUseTitle}</h2>
            <p className="section-description">{gl.whenToUseDesc}</p>
            <div className="usage-table">
              {/* 1. Instant System Preferences */}
              <div className="usage-row">
                <div className="usage-component">
                  <div className="usage-component-name">{gl.whenInstantTitle}</div>
                  <div className="usage-component-preview">
                    <NeuronToggle size="sm" variant="brand" defaultChecked={true} />
                  </div>
                </div>
                <div className="usage-description">{gl.whenInstantDesc}</div>
              </div>

              {/* 2. Feature & Service Activation */}
              <div className="usage-row">
                <div className="usage-component">
                  <div className="usage-component-name">{gl.whenFeatureTitle}</div>
                  <div className="usage-component-preview">
                    <NeuronToggle size="sm" variant="blue" defaultChecked={true} />
                  </div>
                </div>
                <div className="usage-description">{gl.whenFeatureDesc}</div>
              </div>

              {/* 3. Security & Privacy Controls */}
              <div className="usage-row">
                <div className="usage-component">
                  <div className="usage-component-name">{gl.whenSecurityTitle}</div>
                  <div className="usage-component-preview">
                    <NeuronToggle size="sm" variant="success" defaultChecked={true} />
                  </div>
                </div>
                <div className="usage-description">{gl.whenSecurityDesc}</div>
              </div>

              {/* 4. Settings List & Card Rows */}
              <div className="usage-row">
                <div className="usage-component">
                  <div className="usage-component-name">{gl.whenCardRowTitle}</div>
                  <div className="usage-component-preview">
                    <NeuronToggle size="sm" variant="purple" defaultChecked={true} />
                  </div>
                </div>
                <div className="usage-description">{gl.whenCardRowDesc}</div>
              </div>
            </div>
          </div>

          {/* ── Do's and Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.dodontTitle}</h2>
            <p className="section-description">{gl.dodontDesc}</p>
            <div className="dodont-grid">
              {/* Rule 1 */}
              <RuleCard type="do">
                <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <NeuronToggle 
                    size="md" 
                    variant="brand" 
                    defaultChecked={true} 
                    label="Auto-save changes" 
                    description="Saves automatically in the cloud"
                  />
                </div>
                <p><strong>{gl.do1Title}</strong>: {gl.do1Desc}</p>
              </RuleCard>

              <RuleCard type="dont">
                <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <NeuronToggle size="md" variant="brand" defaultChecked={false} label="Agree to Terms" />
                    <button className="neuron-btn neuron-btn--primary neuron-btn--sm" style={{ padding: '2px 8px' }}>Submit</button>
                  </div>
                </div>
                <p><strong>{gl.dont1Title}</strong>: {gl.dont1Desc}</p>
              </RuleCard>

              {/* Rule 2 */}
              <RuleCard type="do">
                <div style={{ padding: 'var(--space-4)' }}>
                  <NeuronToggle size="md" variant="brand" defaultChecked={true} label="Enable dark theme" />
                </div>
                <p><strong>{gl.do2Title}</strong>: {gl.do2Desc}</p>
              </RuleCard>

              <RuleCard type="dont">
                <div style={{ padding: 'var(--space-4)' }}>
                  <NeuronToggle size="md" variant="brand" defaultChecked={false} label="Disable light mode?" />
                </div>
                <p><strong>{gl.dont2Title}</strong>: {gl.dont2Desc}</p>
              </RuleCard>

              {/* Rule 3 */}
              <RuleCard type="do">
                <div style={{ padding: 'var(--space-4)' }}>
                  <NeuronToggle 
                    size="md" 
                    variant="brand" 
                    defaultChecked={true} 
                    label="Two-factor authentication"
                    description="Require verification code upon login"
                  />
                </div>
                <p><strong>{gl.do3Title}</strong>: {gl.do3Desc}</p>
              </RuleCard>

              <RuleCard type="dont">
                <div style={{ padding: 'var(--space-4)' }}>
                  <NeuronToggle 
                    size="md" 
                    variant="brand" 
                    defaultChecked={true} 
                    label="Security"
                    description="When this feature is enabled, a proprietary cryptographic TOTP token protocol will be initiated every time a login attempt is performed across multiple untrusted client endpoints."
                  />
                </div>
                <p><strong>{gl.dont3Title}</strong>: {gl.dont3Desc}</p>
              </RuleCard>
            </div>
          </div>

          {/* ── Size Guidelines ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.sizeTitle}</h2>
            <p className="section-description">{gl.sizeDesc}</p>
            <div className="size-guide-list">
              {[
                { size: 'sm' as const, label: `${t.toggle.small} (sm)`, dims: '36 × 20px · 16px knob', usage: gl.sizeSmUsage },
                { size: 'md' as const, label: `${t.toggle.medium} (md)`, dims: '44 × 24px · 20px knob', usage: gl.sizeMdUsage },
                { size: 'lg' as const, label: `${t.toggle.large} (lg)`, dims: '52 × 28px · 24px knob', usage: gl.sizeLgUsage },
              ].map(({ size, label, dims, usage }) => (
                <div key={size} className="size-guide-row">
                  <div className="size-guide-preview">
                    <NeuronToggle size={size} variant="brand" defaultChecked={true} hasIcon />
                  </div>
                  <div className="size-guide-info">
                    <div className="size-guide-name">{label} · {dims}</div>
                    <div className="size-guide-usage">{usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Accessibility ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.a11yTitle}</h2>
            <p className="section-description">{gl.a11yDesc}</p>
            <div className="a11y-list">
              <div className="a11y-item">
                <div className="a11y-icon">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yAriaTitle}</div>
                  <div className="a11y-desc">{gl.a11yAriaDesc}</div>
                </div>
              </div>

              <div className="a11y-item">
                <div className="a11y-icon">
                  <Check size={16} />
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yKeyboardTitle}</div>
                  <div className="a11y-desc">{gl.a11yKeyboardDesc}</div>
                </div>
              </div>

              <div className="a11y-item">
                <div className="a11y-icon">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yContrastTitle}</div>
                  <div className="a11y-desc">{gl.a11yContrastDesc}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2 – PLAYBOOK
      ══════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">

          {/* ── 1. COLOR INTENTS ── */}
          <div className="section-card">
            <h2 className="section-title">{t.toggle.colorsTitle}</h2>
            <p className="section-description">{t.toggle.colorsDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {COLOR_VARIANTS.map((v) => {
                const colorLabel = getColorLabel(v);
                return (
                  <div key={v} className="showcase-item">
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <NeuronToggle variant={v} size="md" defaultChecked={true} />
                      <NeuronToggle variant={v} size="md" defaultChecked={true} hasIcon />
                    </div>
                    <span className="showcase-label">{colorLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 2. SIZES & THUMB ICONS ── */}
          <div className="section-card">
            <h2 className="section-title">{t.toggle.sizesTitle}</h2>
            <p className="section-description">{t.toggle.sizesDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {(['sm', 'md', 'lg'] as NeuronToggleSize[]).map((s) => (
                <div key={s} className="showcase-item">
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <NeuronToggle size={s} variant="brand" defaultChecked={false} />
                    <NeuronToggle size={s} variant="brand" defaultChecked={true} />
                    <NeuronToggle size={s} variant="brand" defaultChecked={true} hasIcon />
                  </div>
                  <span className="showcase-label">{t.toggle[s === 'sm' ? 'small' : s === 'md' ? 'medium' : 'large']}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. STATE VARIATIONS ── */}
          <div className="section-card">
            <h2 className="section-title">{t.toggle.statesTitle}</h2>
            <p className="section-description">{t.toggle.statesDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {/* Unchecked */}
              <div className="showcase-item">
                <NeuronToggle size="md" variant="brand" checked={demoChecked2} onChange={setDemoChecked2} />
                <span className="showcase-label">{t.toggle.unchecked}</span>
              </div>

              {/* Checked */}
              <div className="showcase-item">
                <NeuronToggle size="md" variant="brand" checked={demoChecked3} onChange={setDemoChecked3} />
                <span className="showcase-label">{t.toggle.checked}</span>
              </div>

              {/* Disabled Unchecked */}
              <div className="showcase-item">
                <NeuronToggle size="md" variant="brand" defaultChecked={false} disabled />
                <span className="showcase-label">{t.toggle.disabled} ({t.toggle.off})</span>
              </div>

              {/* Disabled Checked */}
              <div className="showcase-item">
                <NeuronToggle size="md" variant="brand" defaultChecked={true} disabled />
                <span className="showcase-label">{t.toggle.disabled} ({t.toggle.on})</span>
              </div>

              {/* With Icon */}
              <div className="showcase-item">
                <NeuronToggle size="md" variant="brand" checked={demoChecked4} onChange={setDemoChecked4} hasIcon />
                <span className="showcase-label">{t.toggle.withIcon}</span>
              </div>
            </div>
          </div>

          {/* ── 4. INTERACTIVE PLAYGROUND ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronToggle {t.compShared.playground}</h2>
            <Playground
              name="NeuronToggle"
              knobs={[
                { 
                  name: 'variant', 
                  type: 'select', 
                  options: ['brand', 'gray', 'error', 'warning', 'success', 'blue', 'indigo', 'purple', 'pink', 'orange'], 
                  default: 'brand', 
                  label: t.toggle.knobVariant 
                },
                { 
                  name: 'size', 
                  type: 'select', 
                  options: ['sm', 'md', 'lg'], 
                  default: 'md', 
                  label: t.toggle.knobSize 
                },
                { 
                  name: 'checked', 
                  type: 'boolean', 
                  default: true, 
                  label: t.toggle.knobChecked 
                },
                { 
                  name: 'hasIcon', 
                  type: 'boolean', 
                  default: true, 
                  label: t.toggle.knobHasIcon 
                },
                { 
                  name: 'disabled', 
                  type: 'boolean', 
                  default: false, 
                  label: t.toggle.knobDisabled 
                },
                { 
                  name: 'labelPosition', 
                  type: 'select', 
                  options: ['right', 'left'], 
                  default: 'right', 
                  label: t.toggle.knobPosition 
                },
                { 
                  name: 'isCard', 
                  type: 'boolean', 
                  default: false, 
                  label: t.toggle.knobCard 
                },
                { 
                  name: 'label', 
                  type: 'text', 
                  default: 'Push Notifications', 
                  label: t.toggle.knobLabel 
                },
                { 
                  name: 'description', 
                  type: 'text', 
                  default: 'Receive real-time updates and alerts', 
                  label: t.toggle.knobDescription 
                },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.variant !== 'brand') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }
                if (!knobs.checked) {
                  reactProps.push('checked={false}');
                  vueProps.push(':checked="false"');
                } else {
                  reactProps.push('checked={true}');
                  vueProps.push(':checked="true"');
                }
                if (knobs.hasIcon) {
                  reactProps.push('hasIcon');
                  vueProps.push('has-icon');
                }
                if (knobs.disabled) {
                  reactProps.push('disabled');
                  vueProps.push('disabled');
                }
                if (knobs.labelPosition !== 'right') {
                  reactProps.push(`labelPosition="${knobs.labelPosition}"`);
                  vueProps.push(`label-position="${knobs.labelPosition}"`);
                }
                if (knobs.isCard) {
                  reactProps.push('isCard');
                  vueProps.push('is-card');
                }
                if (knobs.label) {
                  reactProps.push(`label="${knobs.label}"`);
                  vueProps.push(`label="${knobs.label}"`);
                }
                if (knobs.description) {
                  reactProps.push(`description="${knobs.description}"`);
                  vueProps.push(`description="${knobs.description}"`);
                }
                reactProps.push('onChange={(val) => setChecked(val)}');
                vueProps.push('@change="handleChange"');

                const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
                const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

                const isChecked = Boolean(knobs.checked);
                let wrapperClass = `neuron-toggle-wrapper neuron-toggle-wrapper--${knobs.size}`;
                if (knobs.labelPosition === 'left') wrapperClass += ' neuron-toggle-wrapper--left';
                if (knobs.isCard) wrapperClass += ' neuron-toggle-card';
                if (knobs.disabled) wrapperClass += ' neuron-toggle-wrapper--disabled';

                let switchClass = `neuron-toggle neuron-toggle--${knobs.size} neuron-toggle--${knobs.variant}`;
                if (isChecked) switchClass += ' is-checked';
                if (knobs.disabled) switchClass += ' is-disabled';

                const iconHtml = knobs.hasIcon
                  ? `\n    <span class="neuron-toggle__icon">${isChecked ? '✓' : '✕'}</span>`
                  : '';

                const buttonHtml = `<button role="switch" aria-checked="${isChecked}" class="${switchClass}">\n  <span class="neuron-toggle__thumb">${iconHtml}\n  </span>\n</button>`;

                const labelHtml = `<div class="neuron-toggle-label-wrap">\n  <span class="neuron-toggle-label">${knobs.label}</span>\n  <span class="neuron-toggle-description">${knobs.description}</span>\n</div>`;

                let innerHtml = '';
                if (knobs.labelPosition === 'left') {
                  innerHtml = `  ${labelHtml}\n  ${buttonHtml}`;
                } else {
                  innerHtml = `  ${buttonHtml}\n  ${labelHtml}`;
                }

                return {
                  react: `<NeuronToggle${reactAttr}/>`,
                  vue: `<NeuronToggle${vueAttr}/>`,
                  html: `<label class="${wrapperClass}">\n${innerHtml}\n</label>`,
                };
              }}
            >
              {(knobs) => (
                <NeuronToggle
                  variant={knobs.variant as NeuronToggleVariant}
                  size={knobs.size as NeuronToggleSize}
                  checked={knobs.checked as boolean}
                  hasIcon={knobs.hasIcon as boolean}
                  disabled={knobs.disabled as boolean}
                  labelPosition={knobs.labelPosition as 'left' | 'right'}
                  isCard={knobs.isCard as boolean}
                  label={knobs.label as string}
                  description={knobs.description as string}
                />
              )}
            </Playground>
          </div>

          {/* ── 6. API REFERENCE TABLE ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronToggle {t.compShared.apiReference}</h2>
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
                    <td>{t.toggle.apiChecked}</td>
                  </tr>
                  <tr>
                    <td><code>defaultChecked</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.toggle.apiDefaultChecked}</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(checked: boolean) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.toggle.apiOnChange}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>{t.toggle.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'brand' | 'gray' | 'error' | 'warning' | 'success' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange'</code></td>
                    <td><code>'brand'</code></td>
                    <td>{t.toggle.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.toggle.apiDisabled}</td>
                  </tr>
                  <tr>
                    <td><code>label</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.toggle.apiLabel}</td>
                  </tr>
                  <tr>
                    <td><code>description</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.toggle.apiDescription}</td>
                  </tr>
                  <tr>
                    <td><code>labelPosition</code></td>
                    <td><code>'left' | 'right'</code></td>
                    <td><code>'right'</code></td>
                    <td>{t.toggle.apiLabelPosition}</td>
                  </tr>
                  <tr>
                    <td><code>hasIcon</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.toggle.apiHasIcon}</td>
                  </tr>
                  <tr>
                    <td><code>iconOn</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>&lt;Check /&gt;</code></td>
                    <td>{t.toggle.apiIconOn}</td>
                  </tr>
                  <tr>
                    <td><code>iconOff</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>&lt;X /&gt;</code></td>
                    <td>{t.toggle.apiIconOff}</td>
                  </tr>
                  <tr>
                    <td><code>isCard</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.toggle.apiIsCard}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ── Page Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-radio', label: t.nav.compRadio }}
        next={{ id: 'comp-tooltip', label: t.nav.compTooltip }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
