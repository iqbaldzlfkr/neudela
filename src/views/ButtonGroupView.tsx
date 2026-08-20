import React, { useState } from 'react';
import NeuronButton from '../components/NeuronButton';
import NeuronButtonGroup, { ButtonGroupOption } from '../components/NeuronButtonGroup';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowLeft, 
  Plus, 
  ArrowRight, 
  ChevronDown, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold,
  Italic,
  Underline,
  Layers,
  Sparkles
} from 'lucide-react';

interface ButtonGroupViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────
// Do / Don't item component
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
// Anatomy label component
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

export default function ButtonGroupView({ setActiveTab }: ButtonGroupViewProps) {
  const { t } = useLanguage();
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');
  const gl = t.buttonGroup.guideline;

  // Overview canvas interactive demo states (clicking changes active button immediately)
  const [overviewTextVal, setOverviewTextVal] = useState('text1');
  const [overviewRadioVal, setOverviewRadioVal] = useState('text1');

  // Secondary interactive demo states
  const [formatVals, setFormatVals] = useState<string[]>(['bold']);
  const [dateRangeVal, setDateRangeVal] = useState('week');
  const [viewModeVal, setViewModeVal] = useState('grid');
  const [pillVal, setPillVal] = useState('day');

  const standardOptions: ButtonGroupOption[] = [
    { value: 'text1', label: t.buttonGroup.knobText1 },
    { value: 'text2', label: t.buttonGroup.knobText2 },
    { value: 'text3', label: t.buttonGroup.knobText3 },
  ];

  return (
    <div className="button-group-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.buttonGroup.pageTitle}</h1>
            <p className="page-subtitle">{t.buttonGroup.pageSubtitle}</p>
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

          {/* ── Overview & Design Frame (Neudela Clean Style) ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.overviewTitle}</h2>
            <p className="section-description">{gl.overviewDesc}</p>

            {/* Design Spec Canvas Frame in clean Neudela style */}
            <div style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-8)',
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
            }}>
              <div style={{
                fontSize: 'var(--fs-text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-6)',
                paddingBottom: 'var(--space-2)',
                borderBottom: '1px solid var(--color-border)'
              }}>
                {gl.overviewPreviewHeading}
              </div>

              {/* Clean Neudela component preview card */}
              <div style={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {/* 1. Standard text button group (Interactive switching on click) */}
                <div>
                  <NeuronButtonGroup
                    variant="outline"
                    size="md"
                    type="radio"
                    options={standardOptions}
                    value={overviewTextVal}
                    onChange={setOverviewTextVal}
                  />
                </div>

                {/* 2. Radio indicator button group (Interactive switching on click) */}
                <div>
                  <NeuronButtonGroup
                    variant="outline"
                    size="md"
                    type="radio-indicator"
                    options={standardOptions}
                    value={overviewRadioVal}
                    onChange={setOverviewRadioVal}
                  />
                </div>

                {/* 3. Icon action button group (Momentary actions: previous, add, next) */}
                <div>
                  <NeuronButtonGroup variant="outline" size="md">
                    <NeuronButton 
                      iconOnly 
                      aria-label="Previous"
                      leadingIcon={<ArrowLeft size={16} />}
                    />
                    <NeuronButton 
                      iconOnly 
                      aria-label="Add item"
                      leadingIcon={<Plus size={16} />}
                    />
                    <NeuronButton 
                      iconOnly 
                      aria-label="Next"
                      leadingIcon={<ArrowRight size={16} />}
                    />
                  </NeuronButtonGroup>
                </div>
              </div>
            </div>

            {/* Overview grid explanations */}
            <div className="component-showcase-grid component-showcase-grid--wide" style={{ marginTop: 'var(--space-8)' }}>
              <div className="showcase-item">
                <NeuronButtonGroup
                  variant="outline"
                  size="sm"
                  type="radio"
                  options={[
                    { value: '1', label: 'Day' },
                    { value: '2', label: 'Week' },
                    { value: '3', label: 'Month' }
                  ]}
                  value="2"
                />
                <span className="showcase-desc">{gl.overviewTextGroupCaption}</span>
              </div>

              <div className="showcase-item">
                <NeuronButtonGroup
                  variant="outline"
                  size="sm"
                  type="radio-indicator"
                  options={[
                    { value: '1', label: 'List' },
                    { value: '2', label: 'Grid' }
                  ]}
                  value="2"
                />
                <span className="showcase-desc">{gl.overviewRadioGroupCaption}</span>
              </div>

              <div className="showcase-item">
                <NeuronButtonGroup
                  variant="outline"
                  size="sm"
                  type="radio"
                  options={[
                    { value: '1', icon: <AlignLeft size={15} />, ariaLabel: 'Align Left', iconOnly: true },
                    { value: '2', icon: <AlignCenter size={15} />, ariaLabel: 'Align Center', iconOnly: true },
                    { value: '3', icon: <AlignRight size={15} />, ariaLabel: 'Align Right', iconOnly: true },
                  ]}
                  value="2"
                />
                <span className="showcase-desc">{gl.overviewIconGroupCaption}</span>
              </div>
            </div>
          </div>

          {/* ── Anatomy (Clean, Pristine Layout) ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.anatomyTitle}</h2>
            <p className="section-description">{gl.anatomyDesc}</p>
            
            <div className="anatomy-diagram">
              <div className="anatomy-preview" style={{ padding: 'var(--space-10) var(--space-6)' }}>
                <div className="anatomy-group-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', width: '100%', alignItems: 'center' }}>
                  
                  {/* Row 1: Standard Group with Marker 1 (Container), Marker 2 (Segment), Marker 3 (Divider) */}
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '16px 44px' }}>
                    {/* Marker 1: Container (pointing left) */}
                    <div style={{ position: 'absolute', left: '0px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="anatomy-marker">1</span>
                      <span style={{ width: '16px', height: '1px', background: 'var(--color-text-primary)' }} />
                    </div>

                    {/* Button Group Container */}
                    <NeuronButtonGroup variant="outline" size="md">
                      <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                      <NeuronButton>{t.buttonGroup.knobText2}</NeuronButton>
                      <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                    </NeuronButtonGroup>

                    {/* Marker 3: Shared Divider (pointing from top to middle divider) */}
                    <div style={{ position: 'absolute', top: '-14px', left: 'calc(44px + 33.33%)', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="anatomy-marker">3</span>
                      <span style={{ width: '1px', height: '10px', background: 'var(--color-text-primary)' }} />
                    </div>

                    {/* Marker 2: Segment Label (pointing from bottom to middle button) */}
                    <div style={{ position: 'absolute', bottom: '-14px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ width: '1px', height: '10px', background: 'var(--color-text-primary)' }} />
                      <span className="anatomy-marker">2</span>
                    </div>
                  </div>

                  {/* Row 2: Radio Indicator with Marker 4 */}
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '0 44px' }}>
                    {/* Marker 4: Radio Indicator Circle */}
                    <div style={{ position: 'absolute', left: '0px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="anatomy-marker">4</span>
                      <span style={{ width: '16px', height: '1px', background: 'var(--color-text-primary)' }} />
                    </div>

                    <NeuronButtonGroup
                      variant="outline"
                      size="md"
                      type="radio-indicator"
                      options={[
                        { value: '1', label: t.buttonGroup.knobText1 },
                        { value: '2', label: t.buttonGroup.knobText2 },
                        { value: '3', label: t.buttonGroup.knobText3 },
                      ]}
                      value="1"
                    />
                  </div>

                  {/* Row 3: Icon Group with Marker 5 */}
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '0 44px' }}>
                    {/* Marker 5: Icon Action */}
                    <div style={{ position: 'absolute', left: '0px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="anatomy-marker">5</span>
                      <span style={{ width: '16px', height: '1px', background: 'var(--color-text-primary)' }} />
                    </div>

                    <NeuronButtonGroup variant="outline" size="md">
                      <NeuronButton iconOnly aria-label="Previous" leadingIcon={<ArrowLeft size={16} />} />
                      <NeuronButton iconOnly aria-label="Add" leadingIcon={<Plus size={16} />} />
                      <NeuronButton iconOnly aria-label="Next" leadingIcon={<ArrowRight size={16} />} />
                    </NeuronButtonGroup>
                  </div>

                </div>
              </div>

              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={gl.anatomyContainerLabel} desc={gl.anatomyContainerDesc} />
                <AnatomyLabel number={2} label={gl.anatomySegmentLabel} desc={gl.anatomySegmentDesc} />
                <AnatomyLabel number={3} label={gl.anatomyDividerLabel} desc={gl.anatomyDividerDesc} />
                <AnatomyLabel number={4} label={gl.anatomyIndicatorLabel} desc={gl.anatomyIndicatorDesc} />
                <AnatomyLabel number={5} label={gl.anatomyIconLabel} desc={gl.anatomyIconDesc} />
              </div>
            </div>
          </div>

          {/* ── When to use ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.whenToUseTitle}</h2>
            <p className="section-description">{gl.whenToUseDesc}</p>
            <div className="usage-table">
              <div className="usage-row usage-row--header">
                <span>{gl.tableColType}</span>
                <span>{gl.tableColWhenToUse}</span>
              </div>
              {[
                {
                  preview: (
                    <NeuronButtonGroup variant="outline" size="sm">
                      <NeuronButton iconOnly leadingIcon={<Bold size={14} />} aria-label="Bold" active />
                      <NeuronButton iconOnly leadingIcon={<Italic size={14} />} aria-label="Italic" />
                      <NeuronButton iconOnly leadingIcon={<Underline size={14} />} aria-label="Underline" />
                    </NeuronButtonGroup>
                  ),
                  desc: gl.whenStandardDesc
                },
                {
                  preview: (
                    <NeuronButtonGroup
                      variant="outline"
                      size="sm"
                      type="radio-indicator"
                      options={[
                        { value: 'd', label: 'Day' },
                        { value: 'w', label: 'Week' },
                        { value: 'm', label: 'Month' }
                      ]}
                      value="d"
                    />
                  ),
                  desc: gl.whenRadioDesc
                },
                {
                  preview: (
                    <NeuronButtonGroup variant="secondary" size="sm">
                      <NeuronButton>Publish</NeuronButton>
                      <NeuronButton iconOnly leadingIcon={<ChevronDown size={14} />} aria-label="Options" className="neuron-btn-split-trigger" />
                    </NeuronButtonGroup>
                  ),
                  desc: gl.whenSplitDesc
                },
                {
                  preview: (
                    <div style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--slate-700)', paddingBottom: '4px', fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                      Overview Tabs
                    </div>
                  ),
                  desc: gl.whenTabsDesc
                },
              ].map(({ preview, desc }, idx) => (
                <div key={idx} className="usage-row">
                  <div className="usage-preview">
                    {preview}
                  </div>
                  <p className="usage-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Split Button Pattern (Neutral Styling) ── */}
          <div className="section-card">
            <h2 className="section-title">{t.buttonGroup.splitButton}</h2>
            <p className="section-description">{t.buttonGroup.splitButtonDesc}</p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              padding: 'var(--space-6)',
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              alignItems: 'center'
            }}>
              <NeuronButtonGroup variant="outline" size="md">
                <NeuronButton>Save Changes</NeuronButton>
                <NeuronButton iconOnly leadingIcon={<ChevronDown size={16} />} aria-label="More publishing options" className="neuron-btn-split-trigger" />
              </NeuronButtonGroup>

              <NeuronButtonGroup variant="secondary" size="md">
                <NeuronButton>Export Data</NeuronButton>
                <NeuronButton iconOnly leadingIcon={<ChevronDown size={16} />} aria-label="Export format options" className="neuron-btn-split-trigger" />
              </NeuronButtonGroup>

              <NeuronButtonGroup variant="outline" size="md">
                <NeuronButton>Merge Pull Request</NeuronButton>
                <NeuronButton iconOnly leadingIcon={<ChevronDown size={16} />} aria-label="Merge strategy options" className="neuron-btn-split-trigger" />
              </NeuronButtonGroup>
            </div>
          </div>

          {/* ── Do / Don't ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.dodontTitle}</h2>
            <p className="section-description">{gl.dodontDesc}</p>

            {/* Pair 1 */}
            <div className="rule-pair">
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronButtonGroup variant="outline" size="sm">
                    <NeuronButton iconOnly leadingIcon={<AlignLeft size={16} />} aria-label="Align Left" />
                    <NeuronButton iconOnly leadingIcon={<AlignCenter size={16} />} aria-label="Align Center" active />
                    <NeuronButton iconOnly leadingIcon={<AlignRight size={16} />} aria-label="Align Right" />
                  </NeuronButtonGroup>
                </div>
                <p><strong>{gl.do1Title}</strong>: {gl.do1Desc}</p>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-preview">
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <NeuronButtonGroup variant="outline" size="sm">
                      <NeuronButton>Create</NeuronButton>
                      <NeuronButton style={{ color: 'var(--color-danger)' }}>Delete All</NeuronButton>
                    </NeuronButtonGroup>
                  </div>
                </div>
                <p><strong>{gl.dont1Title}</strong>: {gl.dont1Desc}</p>
              </RuleCard>
            </div>

            {/* Pair 2 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronButtonGroup
                    variant="outline"
                    size="sm"
                    type="radio-indicator"
                    options={[
                      { value: 'day', label: 'Day' },
                      { value: 'week', label: 'Week' },
                      { value: 'month', label: 'Month' },
                    ]}
                    value="week"
                  />
                </div>
                <p><strong>{gl.do2Title}</strong>: {gl.do2Desc}</p>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-preview">
                  <div style={{ display: 'flex', overflowX: 'auto', maxWidth: '280px' }}>
                    <NeuronButtonGroup variant="outline" size="xs">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => (
                        <NeuronButton key={m}>{m}</NeuronButton>
                      ))}
                    </NeuronButtonGroup>
                  </div>
                </div>
                <p><strong>{gl.dont2Title}</strong>: {gl.dont2Desc}</p>
              </RuleCard>
            </div>

            {/* Pair 3 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronButtonGroup variant="outline" size="sm">
                    <NeuronButton iconOnly aria-label="Previous Page" leadingIcon={<ArrowLeft size={16} />} />
                    <NeuronButton iconOnly aria-label="Add Filter" leadingIcon={<Plus size={16} />} />
                    <NeuronButton iconOnly aria-label="Next Page" leadingIcon={<ArrowRight size={16} />} />
                  </NeuronButtonGroup>
                </div>
                <p><strong>{gl.do3Title}</strong>: {gl.do3Desc}</p>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-preview">
                  <NeuronButtonGroup variant="outline" size="sm">
                    <NeuronButton iconOnly leadingIcon={<Sparkles size={16} />} />
                    <NeuronButton iconOnly leadingIcon={<Layers size={16} />} />
                  </NeuronButtonGroup>
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
                { size: 'xs' as const, label: `${t.buttonGroup.extraSmall} (xs)`, height: '32px', usage: gl.sizeXsUsage },
                { size: 'sm' as const, label: `${t.buttonGroup.small} (sm)`, height: '36px', usage: gl.sizeSmUsage },
                { size: 'md' as const, label: `${t.buttonGroup.medium} (md)`, height: '40px', usage: gl.sizeMdUsage },
                { size: 'lg' as const, label: `${t.buttonGroup.large} (lg)`, height: '44px', usage: gl.sizeLgUsage },
                { size: 'xl' as const, label: `${t.buttonGroup.extraLarge} (xl)`, height: '48px', usage: gl.sizeXlUsage },
              ].map(({ size, label, height, usage }) => (
                <div key={size} className="size-guide-row">
                  <div className="size-guide-preview">
                    <NeuronButtonGroup variant="outline" size={size}>
                      <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                      <NeuronButton active>{t.buttonGroup.knobText2}</NeuronButton>
                      <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                    </NeuronButtonGroup>
                  </div>
                  <div className="size-guide-info">
                    <div className="size-guide-name">{label} · {height}</div>
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
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yKeyboardTitle}</div>
                  <div className="a11y-desc">{gl.a11yKeyboardDesc}</div>
                </div>
              </div>

              <div className="a11y-item">
                <div className="a11y-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yRoleTitle}</div>
                  <div className="a11y-desc">{gl.a11yRoleDesc}</div>
                </div>
              </div>

              <div className="a11y-item">
                <div className="a11y-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yFocusTitle}</div>
                  <div className="a11y-desc">{gl.a11yFocusDesc}</div>
                </div>
              </div>

              <div className="a11y-item">
                <div className="a11y-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yDisabledTitle}</div>
                  <div className="a11y-desc">{gl.a11yDisabledDesc}</div>
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

          {/* ── VARIANTS (NEUTRAL STYLING) ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.variants}</h2>
            <p className="section-description">{t.buttonGroup.variantsDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {/* Outline (Default) */}
              <div className="showcase-item">
                <NeuronButtonGroup variant="outline" size="md">
                  <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                  <NeuronButton active>{t.buttonGroup.knobText2}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                </NeuronButtonGroup>
                <span className="showcase-label">{t.button.outline} (Default)</span>
                <span className="showcase-desc">{t.button.outlineDesc}</span>
              </div>

              {/* Secondary */}
              <div className="showcase-item">
                <NeuronButtonGroup variant="secondary" size="md">
                  <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                  <NeuronButton active>{t.buttonGroup.knobText2}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                </NeuronButtonGroup>
                <span className="showcase-label">{t.button.secondary}</span>
                <span className="showcase-desc">{t.button.secondaryDesc}</span>
              </div>

              {/* Text */}
              <div className="showcase-item">
                <NeuronButtonGroup variant="text" size="md">
                  <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                  <NeuronButton active>{t.buttonGroup.knobText2}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                </NeuronButtonGroup>
                <span className="showcase-label">{t.button.text}</span>
                <span className="showcase-desc">{t.button.textDesc}</span>
              </div>

              {/* Pill Segmented */}
              <div className="showcase-item">
                <NeuronButtonGroup
                  pill
                  variant="text"
                  size="sm"
                  type="radio"
                  options={[
                    { value: 'day', label: 'Day' },
                    { value: 'week', label: 'Week' },
                    { value: 'month', label: 'Month' },
                  ]}
                  value="day"
                />
                <span className="showcase-label">{t.buttonGroup.pill}</span>
                <span className="showcase-desc">{t.buttonGroup.pillDesc}</span>
              </div>
            </div>
          </div>

          {/* ── CORE DESIGN STYLES (MATCHING USER MOCKUP) ── */}
          <div className="section-card">
            <h2 className="section-title">{t.buttonGroup.standardGroup} &amp; {t.buttonGroup.radioGroup}</h2>
            <p className="section-description">{t.buttonGroup.pageSubtitle}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {/* 1. Text Group */}
              <div className="showcase-item">
                <NeuronButtonGroup
                  variant="outline"
                  size="md"
                  type="radio"
                  options={standardOptions}
                  value={dateRangeVal}
                  onChange={setDateRangeVal}
                />
                <span className="showcase-label">{t.buttonGroup.standardGroup}</span>
                <span className="showcase-desc">{t.buttonGroup.standardGroupDesc}</span>
              </div>

              {/* 2. Radio Indicator Group */}
              <div className="showcase-item">
                <NeuronButtonGroup
                  variant="outline"
                  size="md"
                  type="radio-indicator"
                  options={standardOptions}
                  value={viewModeVal}
                  onChange={setViewModeVal}
                />
                <span className="showcase-label">{t.buttonGroup.radioGroup}</span>
                <span className="showcase-desc">{t.buttonGroup.radioGroupDesc}</span>
              </div>

              {/* 3. Icon Toolbar */}
              <div className="showcase-item">
                <NeuronButtonGroup variant="outline" size="md">
                  <NeuronButton iconOnly aria-label="Previous" leadingIcon={<ArrowLeft size={16} />} />
                  <NeuronButton iconOnly aria-label="Add" leadingIcon={<Plus size={16} />} />
                  <NeuronButton iconOnly aria-label="Next" leadingIcon={<ArrowRight size={16} />} />
                </NeuronButtonGroup>
                <span className="showcase-label">{t.buttonGroup.iconGroup}</span>
                <span className="showcase-desc">{t.buttonGroup.iconGroupDesc}</span>
              </div>

              {/* 4. Split Button */}
              <div className="showcase-item">
                <NeuronButtonGroup variant="outline" size="md">
                  <NeuronButton>Save Changes</NeuronButton>
                  <NeuronButton iconOnly leadingIcon={<ChevronDown size={16} />} aria-label="Options" className="neuron-btn-split-trigger" />
                </NeuronButtonGroup>
                <span className="showcase-label">{t.buttonGroup.splitButton}</span>
                <span className="showcase-desc">{t.buttonGroup.splitButtonDesc}</span>
              </div>

              {/* 5. Pill Segmented Control */}
              <div className="showcase-item">
                <NeuronButtonGroup
                  pill
                  variant="text"
                  size="sm"
                  type="radio"
                  options={[
                    { value: 'day', label: 'Day' },
                    { value: 'week', label: 'Week' },
                    { value: 'month', label: 'Month' },
                    { value: 'year', label: 'Year' },
                  ]}
                  value={pillVal}
                  onChange={setPillVal}
                />
                <span className="showcase-label">{t.buttonGroup.pill}</span>
                <span className="showcase-desc">{t.buttonGroup.pillDesc}</span>
              </div>

              {/* 6. Multi-select Formatting Toolbar */}
              <div className="showcase-item">
                <NeuronButtonGroup
                  variant="outline"
                  size="md"
                  type="checkbox"
                  options={[
                    { value: 'bold', icon: <Bold size={16} />, ariaLabel: 'Bold', iconOnly: true },
                    { value: 'italic', icon: <Italic size={16} />, ariaLabel: 'Italic', iconOnly: true },
                    { value: 'underline', icon: <Underline size={16} />, ariaLabel: 'Underline', iconOnly: true },
                  ]}
                  value={formatVals}
                  onChange={setFormatVals}
                />
                <span className="showcase-label">Checkbox Multi-Select</span>
                <span className="showcase-desc">Multiple items can be selected simultaneously</span>
              </div>
            </div>
          </div>

          {/* ── SIZES ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.sizes}</h2>
            <p className="section-description">{t.buttonGroup.sizesDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {([
                { size: 'xs', label: t.buttonGroup.extraSmall },
                { size: 'sm', label: t.buttonGroup.small },
                { size: 'md', label: t.buttonGroup.medium },
                { size: 'lg', label: t.buttonGroup.large },
                { size: 'xl', label: t.buttonGroup.extraLarge },
              ] as const).map(({ size, label }) => (
                <div key={size} className="showcase-item">
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto', padding: 'var(--space-2) 0' }}>
                    <NeuronButtonGroup variant="outline" size={size}>
                      <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                      <NeuronButton active>{t.buttonGroup.knobText2}</NeuronButton>
                      <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                    </NeuronButtonGroup>
                  </div>
                  <span className="showcase-label">{label} ({size})</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── ORIENTATION & FULL WIDTH ── */}
          <div className="section-card">
            <h2 className="section-title">{t.buttonGroup.orientationDesc}</h2>
            <div className="component-showcase-grid component-showcase-grid--wide">
              <div className="showcase-item">
                <NeuronButtonGroup variant="outline" size="md" orientation="horizontal">
                  <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                  <NeuronButton active>{t.buttonGroup.knobText2}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                </NeuronButtonGroup>
                <span className="showcase-label">{t.buttonGroup.horizontal}</span>
              </div>

              <div className="showcase-item">
                <NeuronButtonGroup variant="outline" size="md" orientation="vertical" style={{ width: '160px' }}>
                  <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                  <NeuronButton active>{t.buttonGroup.knobText2}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                </NeuronButtonGroup>
                <span className="showcase-label">{t.buttonGroup.vertical}</span>
              </div>

              <div className="showcase-item" style={{ gridColumn: '1 / -1', alignItems: 'stretch' }}>
                <div style={{
                  width: '100%',
                  padding: 'var(--space-5)',
                  border: '1.5px dashed var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-bg-surface)',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)'
                }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                    Parent Container (100% Width)
                  </div>
                  <NeuronButtonGroup variant="outline" size="md" fullWidth>
                    <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                    <NeuronButton active>{t.buttonGroup.knobText2}</NeuronButton>
                    <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                  </NeuronButtonGroup>
                </div>
                <span className="showcase-label" style={{ marginTop: 'var(--space-2)' }}>{t.buttonGroup.fullWidth} (100% Parent Width)</span>
                <span className="showcase-desc">All buttons stretch evenly (flex: 1) to fill the entire width of the container.</span>
              </div>
            </div>
          </div>

          {/* ── STATES ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.states}</h2>
            <p className="section-description">{t.buttonGroup.statesDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              <div className="showcase-item">
                <NeuronButtonGroup variant="outline" size="md">
                  <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText2}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                </NeuronButtonGroup>
                <span className="showcase-label">{t.buttonGroup.defaultState}</span>
              </div>

              <div className="showcase-item">
                <NeuronButtonGroup variant="outline" size="md">
                  <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                  <NeuronButton active>{t.buttonGroup.activeState}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                </NeuronButtonGroup>
                <span className="showcase-label">{t.buttonGroup.activeState}</span>
              </div>

              <div className="showcase-item">
                <NeuronButtonGroup variant="outline" size="md">
                  <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                  <NeuronButton disabled>{t.buttonGroup.disabledItem}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                </NeuronButtonGroup>
                <span className="showcase-label">{t.buttonGroup.disabledItem}</span>
              </div>

              <div className="showcase-item">
                <NeuronButtonGroup variant="outline" size="md" disabled>
                  <NeuronButton>{t.buttonGroup.knobText1}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText2}</NeuronButton>
                  <NeuronButton>{t.buttonGroup.knobText3}</NeuronButton>
                </NeuronButtonGroup>
                <span className="showcase-label">{t.buttonGroup.disabledGroup}</span>
              </div>
            </div>
          </div>

          {/* ── INTERACTIVE PLAYGROUND (NEUTRAL VARIANTS) ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.playground}</h2>
            <Playground
              name="NeuronButtonGroup"
              knobs={[
                { name: 'variant', type: 'select', options: ['outline', 'secondary', 'text'], default: 'outline' },
                { name: 'size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
                { name: 'type', type: 'select', options: ['standard', 'radio', 'radio-indicator', 'checkbox'], default: 'standard' },
                { name: 'orientation', type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal' },
                { name: 'attached', type: 'boolean', default: true },
                { name: 'fullWidth', type: 'boolean', default: false },
                { name: 'pill', type: 'boolean', default: false },
                { name: 'disabled', type: 'boolean', default: false },
                { name: 'itemCount', type: 'select', options: ['2', '3', '4'], default: '3' },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.variant !== 'outline') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }
                if (knobs.type !== 'standard') {
                  reactProps.push(`type="${knobs.type}"`);
                  vueProps.push(`type="${knobs.type}"`);
                }
                if (knobs.orientation !== 'horizontal') {
                  reactProps.push(`orientation="${knobs.orientation}"`);
                  vueProps.push(`orientation="${knobs.orientation}"`);
                }
                if (!knobs.attached) {
                  reactProps.push('attached={false}');
                  vueProps.push(':attached="false"');
                }
                if (knobs.fullWidth) {
                  reactProps.push('fullWidth');
                  vueProps.push('full-width');
                }
                if (knobs.pill) {
                  reactProps.push('pill');
                  vueProps.push('pill');
                }
                if (knobs.disabled) {
                  reactProps.push('disabled');
                  vueProps.push('disabled');
                }

                const count = parseInt(knobs.itemCount as string, 10) || 3;
                const items = Array.from({ length: count }, (_, i) => ({
                  value: `opt${i + 1}`,
                  label: `Text ${i + 1}`
                }));

                const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
                const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

                const optionsStr = JSON.stringify(items, null, 2).replace(/"([^"]+)":/g, '$1:');

                let htmlGroupClass = `neuron-btn-group neuron-btn-group--${knobs.orientation} neuron-btn-group--${knobs.variant} neuron-btn-group--${knobs.size}`;
                if (knobs.attached) htmlGroupClass += ' neuron-btn-group--attached';
                else htmlGroupClass += ' neuron-btn-group--spaced';
                if (knobs.fullWidth) htmlGroupClass += ' neuron-btn-group--full-width';
                if (knobs.pill) htmlGroupClass += ' neuron-btn-group--pill';

                const htmlItems = items.map((it, idx) => {
                  const activeClass = idx === 0 ? ' neuron-btn--active is-active' : '';
                  const disabledAttr = knobs.disabled ? ' disabled' : '';
                  const radioHtml = knobs.type === 'radio-indicator'
                    ? `<span class="neuron-btn-radio-indicator"><span class="neuron-btn-radio-indicator__circle${idx === 0 ? ' is-selected' : ''}">${idx === 0 ? '<span class="neuron-btn-radio-indicator__dot"></span>' : ''}</span></span>`
                    : '';
                  return `  <button class="neuron-btn neuron-btn--${knobs.variant} neuron-btn--${knobs.size} neuron-btn-group-item${activeClass}"${disabledAttr}>\n    ${radioHtml}${it.label}\n  </button>`;
                }).join('\n');

                return {
                  react: `<NeuronButtonGroup${reactAttr}  options={${optionsStr}}\n  value="opt1"\n  onChange={(val) => console.log(val)}\n/>`,
                  vue: `<NeuronButtonGroup${vueAttr}  :options="items"\n  v-model="selected"\n/>`,
                  html: `<div class="${htmlGroupClass}" role="group">\n${htmlItems}\n</div>`,
                };
              }}
            >
              {(knobs) => {
                const count = parseInt(knobs.itemCount as string, 10) || 3;
                const items: ButtonGroupOption[] = Array.from({ length: count }, (_, i) => ({
                  value: `opt${i + 1}`,
                  label: `Text ${i + 1}`
                }));

                return (
                  <NeuronButtonGroup
                    variant={knobs.variant as 'outline' | 'secondary' | 'text'}
                    size={knobs.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
                    type={knobs.type as 'standard' | 'radio' | 'radio-indicator' | 'checkbox'}
                    orientation={knobs.orientation as 'horizontal' | 'vertical'}
                    attached={knobs.attached as boolean}
                    fullWidth={knobs.fullWidth as boolean}
                    pill={knobs.pill as boolean}
                    disabled={knobs.disabled as boolean}
                    options={items}
                    defaultValue="opt1"
                  />
                );
              }}
            </Playground>
          </div>

          {/* ── API REFERENCE TABLE ── */}
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
                    <td><code>variant</code></td>
                    <td><code>'outline' | 'secondary' | 'text'</code></td>
                    <td><code>'outline'</code></td>
                    <td>{t.buttonGroup.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
                    <td><code>'md'</code></td>
                    <td>{t.buttonGroup.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>type</code></td>
                    <td><code>'standard' | 'radio' | 'radio-indicator' | 'checkbox'</code></td>
                    <td><code>'standard'</code></td>
                    <td>{t.buttonGroup.apiType}</td>
                  </tr>
                  <tr>
                    <td><code>orientation</code></td>
                    <td><code>'horizontal' | 'vertical'</code></td>
                    <td><code>'horizontal'</code></td>
                    <td>{t.buttonGroup.apiOrientation}</td>
                  </tr>
                  <tr>
                    <td><code>attached</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>{t.buttonGroup.apiAttached}</td>
                  </tr>
                  <tr>
                    <td><code>fullWidth</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.buttonGroup.apiFullWidth}</td>
                  </tr>
                  <tr>
                    <td><code>pill</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.buttonGroup.apiPill}</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.buttonGroup.apiDisabled}</td>
                  </tr>
                  <tr>
                    <td><code>options</code></td>
                    <td><code>ButtonGroupOption[]</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.buttonGroup.apiOptions}</td>
                  </tr>
                  <tr>
                    <td><code>value</code></td>
                    <td><code>string | string[]</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.buttonGroup.apiValue}</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(value: any) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.buttonGroup.apiOnChange}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-button', label: t.nav.compButton }}
        next={{ id: 'comp-input', label: t.nav.compInput }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
