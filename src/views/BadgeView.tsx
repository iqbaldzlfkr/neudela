import React, { useState } from 'react';
import NeuronBadge, { NeuronBadgeVariant, NeuronBadgeSize } from '../components/NeuronBadge';
import NeuronBadgeGroup from '../components/NeuronBadgeGroup';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowUp, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface BadgeViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────
// Sample avatar image for demo
// ─────────────────────────────────────────────
const AVATAR_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces';

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

export default function BadgeView({ setActiveTab }: BadgeViewProps) {
  const { t } = useLanguage();
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');
  const [overviewFilter, setOverviewFilter] = useState<'all' | 'brand' | 'semantic' | 'accent'>('all');
  const gl = t.badge.guideline;

  // Interactive demo dismissal state
  const [dismissedTags, setDismissedTags] = useState<string[]>([]);
  const handleDismiss = (id: string) => {
    setDismissedTags(prev => [...prev, id]);
  };
  const resetDismissed = () => setDismissedTags([]);

  const COLOR_VARIANTS: NeuronBadgeVariant[] = [
    'gray',
    'brand',
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

  const getColorLabel = (v: NeuronBadgeVariant): string => {
    const labelMap: Record<string, string> = {
      gray: t.badge.gray,
      brand: t.badge.brand,
      error: t.badge.error,
      warning: t.badge.warning,
      success: t.badge.success,
      blue: t.badge.blue,
      indigo: t.badge.indigo,
      purple: t.badge.purple,
      pink: t.badge.pink,
      orange: t.badge.orange,
    };
    return labelMap[v] || v;
  };

  return (
    <div className="badge-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.badge.pageTitle}</h1>
            <p className="page-subtitle">{t.badge.pageSubtitle}</p>
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

          {/* ── Overview & Exact Design Reference Frame ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.overviewTitle}</h2>
            <p className="section-description">{gl.overviewDesc}</p>

            {/* 1. Badge Design Spec Canvas */}
            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">{gl.overviewBadgeHeading}</div>
                  <div className="badge-spec-subtitle">10 Color Themes × 7 Anatomy Variations · sm (22px), md (24px), lg (28px)</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
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

                  {dismissedTags.length > 0 && (
                    <button 
                      onClick={resetDismissed} 
                      style={{ 
                        fontSize: '12px', 
                        color: 'var(--color-primary)', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Reset Dismissed
                    </button>
                  )}
                </div>
              </div>

              {/* Master Matrix Table Grid */}
              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  {/* Table Header */}
                  <thead>
                    <tr>
                      <th style={{ width: '140px', minWidth: '140px' }}>Theme</th>
                      <th style={{ width: '220px', minWidth: '220px' }}>Text (sm · md · lg)</th>
                      <th style={{ width: '230px', minWidth: '230px' }}>Dot Indicator</th>
                      <th style={{ width: '240px', minWidth: '240px' }}>Avatar Image</th>
                      <th style={{ width: '240px', minWidth: '240px' }}>Dismissible (✕)</th>
                      <th style={{ width: '230px', minWidth: '230px' }}>Navigation (→)</th>
                      <th style={{ width: '230px', minWidth: '230px' }}>Leading Icon</th>
                      <th style={{ width: '120px', minWidth: '120px' }}>Icon Only</th>
                    </tr>
                  </thead>

                  {/* Table Data Rows */}
                  <tbody>
                    {filteredVariants.map((c) => (
                      <tr key={c}>
                        {/* Theme Label */}
                        <td>
                          <div className="badge-theme-cell">
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

                        {/* 1. Text only (sm, md, lg) */}
                        <td>
                          <div className="badge-cell-flex">
                            <NeuronBadge variant={c} size="sm">Label</NeuronBadge>
                            <NeuronBadge variant={c} size="md">Label</NeuronBadge>
                            <NeuronBadge variant={c} size="lg">Label</NeuronBadge>
                          </div>
                        </td>

                        {/* 2. With Dot (sm, md, lg) */}
                        <td>
                          <div className="badge-cell-flex">
                            <NeuronBadge variant={c} size="sm" dot>Label</NeuronBadge>
                            <NeuronBadge variant={c} size="md" dot>Label</NeuronBadge>
                            <NeuronBadge variant={c} size="lg" dot>Label</NeuronBadge>
                          </div>
                        </td>

                        {/* 3. With Avatar (sm, md, lg) */}
                        <td>
                          <div className="badge-cell-flex">
                            <NeuronBadge variant={c} size="sm" avatar={AVATAR_URL}>Label</NeuronBadge>
                            <NeuronBadge variant={c} size="md" avatar={AVATAR_URL}>Label</NeuronBadge>
                            <NeuronBadge variant={c} size="lg" avatar={AVATAR_URL}>Label</NeuronBadge>
                          </div>
                        </td>

                        {/* 4. With Closeable ✕ (sm, md, lg) */}
                        <td>
                          <div className="badge-cell-flex">
                            {!dismissedTags.includes(`${c}-sm`) && (
                              <NeuronBadge variant={c} size="sm" onClose={() => handleDismiss(`${c}-sm`)}>Label</NeuronBadge>
                            )}
                            {!dismissedTags.includes(`${c}-md`) && (
                              <NeuronBadge variant={c} size="md" onClose={() => handleDismiss(`${c}-md`)}>Label</NeuronBadge>
                            )}
                            {!dismissedTags.includes(`${c}-lg`) && (
                              <NeuronBadge variant={c} size="lg" onClose={() => handleDismiss(`${c}-lg`)}>Label</NeuronBadge>
                            )}
                          </div>
                        </td>

                        {/* 5. With Arrow → (sm, md, lg) */}
                        <td>
                          <div className="badge-cell-flex">
                            <NeuronBadge variant={c} size="sm" arrow>Label</NeuronBadge>
                            <NeuronBadge variant={c} size="md" arrow>Label</NeuronBadge>
                            <NeuronBadge variant={c} size="lg" arrow>Label</NeuronBadge>
                          </div>
                        </td>

                        {/* 6. With Leading Icon (sm, md, lg) */}
                        <td>
                          <div className="badge-cell-flex">
                            <NeuronBadge variant={c} size="sm" leadingIcon={<ArrowUp size={11} />}>Label</NeuronBadge>
                            <NeuronBadge variant={c} size="md" leadingIcon={<ArrowUp size={12} />}>Label</NeuronBadge>
                            <NeuronBadge variant={c} size="lg" leadingIcon={<ArrowUp size={14} />}>Label</NeuronBadge>
                          </div>
                        </td>

                        {/* 7. Icon only (sm, md, lg) */}
                        <td>
                          <div className="badge-cell-flex">
                            <NeuronBadge variant={c} size="sm" iconOnly leadingIcon={<Plus size={12} />} aria-label="Add" />
                            <NeuronBadge variant={c} size="md" iconOnly leadingIcon={<Plus size={13} />} aria-label="Add" />
                            <NeuronBadge variant={c} size="lg" iconOnly leadingIcon={<Plus size={14} />} aria-label="Add" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Badge Group (Announcement Banners) Reference Frame */}
            <div className="badge-spec-card" style={{ marginTop: 'var(--space-8)' }}>
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">{gl.overviewBadgeGroupHeading}</div>
                  <div className="badge-spec-subtitle">Composite Announcement Banners · Leading Pill, Trailing Pill, and Actionable Links</div>
                </div>
              </div>

              <div className="badge-spec-table-wrap">
                <table className="badge-group-matrix-table">
                  {/* Header Row */}
                  <thead>
                    <tr>
                      <th style={{ width: '120px', minWidth: '120px' }}>Theme</th>
                      <th style={{ minWidth: '320px' }}>Leading Pill</th>
                      <th style={{ minWidth: '340px' }}>Leading Pill + Arrow</th>
                      <th style={{ minWidth: '320px' }}>Trailing Pill</th>
                      <th style={{ minWidth: '340px' }}>Trailing Pill + Arrow</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* 1. Brand theme */}
                    <tr>
                      <td>
                        <div className="badge-theme-cell">
                          <span className="badge-theme-dot" style={{ backgroundColor: 'var(--brand-500)' }} />
                          <span>{t.badge.brand}</span>
                        </div>
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="brand"
                          badge="New feature"
                          title="We've just released a new feature"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="brand"
                          badge="New feature"
                          title="We've just released a new feature"
                          arrow={true}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="brand"
                          badge="New feature"
                          title="We've just released a new feature"
                          badgePosition="trailing"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="brand"
                          badge="New feature"
                          title="We've just released a new feature"
                          badgePosition="trailing"
                          arrow={true}
                        />
                      </td>
                    </tr>

                    {/* 2. Neutral theme */}
                    <tr>
                      <td>
                        <div className="badge-theme-cell">
                          <span className="badge-theme-dot" style={{ backgroundColor: 'var(--slate-500)' }} />
                          <span>{t.badge.gray}</span>
                        </div>
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="gray"
                          badge="New feature"
                          title="We've just released a new feature"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="gray"
                          badge="New feature"
                          title="We've just released a new feature"
                          arrow={true}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="gray"
                          badge="New feature"
                          title="We've just released a new feature"
                          badgePosition="trailing"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="gray"
                          badge="New feature"
                          title="We've just released a new feature"
                          badgePosition="trailing"
                          arrow={true}
                        />
                      </td>
                    </tr>

                    {/* 3. Error theme */}
                    <tr>
                      <td>
                        <div className="badge-theme-cell">
                          <span className="badge-theme-dot" style={{ backgroundColor: 'var(--red-500)' }} />
                          <span>{t.badge.error}</span>
                        </div>
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="error"
                          badge="Error"
                          title="There was a problem with that action"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="error"
                          badge="Error"
                          title="There was a problem with that action"
                          arrow={true}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="error"
                          badge="Fix now"
                          title="There was a problem with that action"
                          badgePosition="trailing"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="error"
                          badge="Fix now"
                          title="There was a problem with that action"
                          badgePosition="trailing"
                          arrow={true}
                        />
                      </td>
                    </tr>

                    {/* 4. Warning theme */}
                    <tr>
                      <td>
                        <div className="badge-theme-cell">
                          <span className="badge-theme-dot" style={{ backgroundColor: 'var(--amber-500)' }} />
                          <span>{t.badge.warning}</span>
                        </div>
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="warning"
                          badge="Warning"
                          title="Just to let you know this might be a problem"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="warning"
                          badge="Warning"
                          title="Just to let you know this might be a problem"
                          arrow={true}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="warning"
                          badge="Warning"
                          title="Just to let you know this might be a problem"
                          badgePosition="trailing"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="warning"
                          badge="Warning"
                          title="Just to let you know this might be a problem"
                          badgePosition="trailing"
                          arrow={true}
                        />
                      </td>
                    </tr>

                    {/* 5. Success theme */}
                    <tr>
                      <td>
                        <div className="badge-theme-cell">
                          <span className="badge-theme-dot" style={{ backgroundColor: 'var(--emerald-500)' }} />
                          <span>{t.badge.success}</span>
                        </div>
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="success"
                          badge="Success"
                          title="You've updated your profile and details"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="success"
                          badge="Success"
                          title="You've updated your profile and details"
                          arrow={true}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="success"
                          badge="Success"
                          title="You've updated your profile and details"
                          badgePosition="trailing"
                          arrow={false}
                        />
                      </td>
                      <td>
                        <NeuronBadgeGroup 
                          variant="success"
                          badge="Success"
                          title="You've updated your profile and details"
                          badgePosition="trailing"
                          arrow={true}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* ── Anatomy Section ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.anatomyTitle}</h2>
            <p className="section-description">{gl.anatomyDesc}</p>
            
            <div className="anatomy-diagram">
              <div className="anatomy-preview" style={{ padding: 'var(--space-10) var(--space-6)', flexDirection: 'column', gap: 'var(--space-8)' }}>
                
                {/* 1. Single Badge Anatomy */}
                <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '16px 44px' }}>
                  {/* Marker 1: Container (pointing left) */}
                  <div style={{ position: 'absolute', left: '0px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="anatomy-marker">1</span>
                    <span style={{ width: '16px', height: '1px', background: 'var(--color-text-primary)' }} />
                  </div>

                  {/* Badge Component Target */}
                  <NeuronBadge variant="brand" size="lg" dot onClose={() => {}}>
                    Active Status
                  </NeuronBadge>

                  {/* Marker 2: Dot Indicator (pointing from top) */}
                  <div style={{ position: 'absolute', top: '-14px', left: '60px', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="anatomy-marker">2</span>
                    <span style={{ width: '1px', height: '10px', background: 'var(--color-text-primary)' }} />
                  </div>

                  {/* Marker 3: Label Text (pointing from bottom) */}
                  <div style={{ position: 'absolute', bottom: '-14px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ width: '1px', height: '10px', background: 'var(--color-text-primary)' }} />
                    <span className="anatomy-marker">3</span>
                  </div>

                  {/* Marker 4: Trailing Action (pointing right) */}
                  <div style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '16px', height: '1px', background: 'var(--color-text-primary)' }} />
                    <span className="anatomy-marker">4</span>
                  </div>
                </div>

                {/* 2. Badge Group Anatomy */}
                <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '16px 44px', marginTop: 'var(--space-4)' }}>
                  {/* Marker 5: Badge Group Container */}
                  <div style={{ position: 'absolute', left: '0px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="anatomy-marker">5</span>
                    <span style={{ width: '16px', height: '1px', background: 'var(--color-text-primary)' }} />
                  </div>

                  <NeuronBadgeGroup
                    variant="brand"
                    badge="New update"
                    title="Explore Version 2.0"
                    arrow
                  />
                </div>

              </div>

              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={gl.anatomyContainerLabel} desc={gl.anatomyContainerDesc} />
                <AnatomyLabel number={2} label={gl.anatomyIndicatorLabel} desc={gl.anatomyIndicatorDesc} />
                <AnatomyLabel number={3} label={gl.anatomyTextLabel} desc={gl.anatomyTextDesc} />
                <AnatomyLabel number={4} label={gl.anatomyActionLabel} desc={gl.anatomyActionDesc} />
                <AnatomyLabel number={5} label={gl.anatomyGroupContainerLabel} desc={gl.anatomyGroupContainerDesc} />
              </div>
            </div>
          </div>

          {/* ── When to Use ── */}
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
                  preview: <NeuronBadge variant="success" size="md" dot>Verified</NeuronBadge>,
                  desc: gl.whenBadgeDesc
                },
                {
                  preview: (
                    <NeuronBadgeGroup 
                      variant="brand" 
                      badge="Changelog" 
                      title="See latest updates" 
                      arrow 
                    />
                  ),
                  desc: gl.whenBadgeGroupDesc
                },
                {
                  preview: (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <NeuronBadge variant="gray" size="sm" onClose={() => {}}>React</NeuronBadge>
                      <NeuronBadge variant="gray" size="sm" onClose={() => {}}>TypeScript</NeuronBadge>
                    </div>
                  ),
                  desc: gl.whenTagDesc
                },
                {
                  preview: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: '6px', fontSize: '12px', color: 'var(--red-700)', fontWeight: 600 }}>
                      <AlertCircle size={14} /> System Outage
                    </div>
                  ),
                  desc: gl.whenAlertDesc
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

          {/* ── Do / Don't ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.dodontTitle}</h2>
            <p className="section-description">{gl.dodontDesc}</p>

            {/* Pair 1 */}
            <div className="rule-pair">
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronBadge variant="brand" size="md">Beta Release</NeuronBadge>
                </div>
                <p><strong>{gl.do1Title}</strong>: {gl.do1Desc}</p>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-preview">
                  <NeuronBadge variant="brand" size="md">Beta release is now available for all registered accounts</NeuronBadge>
                </div>
                <p><strong>{gl.dont1Title}</strong>: {gl.dont1Desc}</p>
              </RuleCard>
            </div>

            {/* Pair 2 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <NeuronBadge variant="success" size="sm" dot>Published</NeuronBadge>
                    <NeuronBadge variant="error" size="sm" dot>Failed</NeuronBadge>
                  </div>
                </div>
                <p><strong>{gl.do2Title}</strong>: {gl.do2Desc}</p>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-preview">
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <NeuronBadge variant="error" size="sm" dot>Operation Successful</NeuronBadge>
                    <NeuronBadge variant="success" size="sm" dot>Critical Error</NeuronBadge>
                  </div>
                </div>
                <p><strong>{gl.dont2Title}</strong>: {gl.dont2Desc}</p>
              </RuleCard>
            </div>

            {/* Pair 3 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronBadge variant="blue" size="md" dot>Online Support</NeuronBadge>
                </div>
                <p><strong>{gl.do3Title}</strong>: {gl.do3Desc}</p>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-preview">
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} />
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
                { size: 'sm' as const, label: `${t.badge.small} (sm)`, height: '22px', usage: gl.sizeSmUsage },
                { size: 'md' as const, label: `${t.badge.medium} (md)`, height: '24px', usage: gl.sizeMdUsage },
                { size: 'lg' as const, label: `${t.badge.large} (lg)`, height: '28px', usage: gl.sizeLgUsage },
              ].map(({ size, label, height, usage }) => (
                <div key={size} className="size-guide-row">
                  <div className="size-guide-preview">
                    <NeuronBadge variant="brand" size={size} dot>
                      Status Label
                    </NeuronBadge>
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
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yContrastTitle}</div>
                  <div className="a11y-desc">{gl.a11yContrastDesc}</div>
                </div>
              </div>

              <div className="a11y-item">
                <div className="a11y-icon">
                  <Check size={16} />
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yDismissTitle}</div>
                  <div className="a11y-desc">{gl.a11yDismissDesc}</div>
                </div>
              </div>

              <div className="a11y-item">
                <div className="a11y-icon">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yScreenReaderTitle}</div>
                  <div className="a11y-desc">{gl.a11yScreenReaderDesc}</div>
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
            <h2 className="section-title">{t.badge.colorsTitle}</h2>
            <p className="section-description">{t.badge.colorsDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {COLOR_VARIANTS.map((v) => {
                const labelMap: Record<string, string> = {
                  gray: t.badge.gray,
                  brand: t.badge.brand,
                  error: t.badge.error,
                  warning: t.badge.warning,
                  success: t.badge.success,
                  blue: t.badge.blue,
                  indigo: t.badge.indigo,
                  purple: t.badge.purple,
                  pink: t.badge.pink,
                  orange: t.badge.orange,
                };
                const colorLabel = labelMap[v] || v;

                return (
                  <div key={v} className="showcase-item">
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <NeuronBadge variant={v} size="md">{colorLabel}</NeuronBadge>
                      <NeuronBadge variant={v} size="md" dot>{colorLabel}</NeuronBadge>
                    </div>
                    <span className="showcase-label">{colorLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 2. BADGE GROUPS (ANNOUNCEMENT BANNERS) ── */}
          <div className="section-card">
            <h2 className="section-title">{t.badge.badgeGroup}</h2>
            <p className="section-description">{t.badge.badgeGroupDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              <div className="showcase-item" style={{ gridColumn: '1 / -1', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%' }}>
                  <NeuronBadgeGroup 
                    variant="brand"
                    badge="New feature"
                    title="We've just released a new feature"
                    arrow
                  />
                  <NeuronBadgeGroup 
                    variant="gray"
                    badge="Documentation"
                    title="Read our updated API reference guide"
                    arrow
                  />
                  <NeuronBadgeGroup 
                    variant="success"
                    badge="Success"
                    title="Your subscription plan has been updated"
                    arrow
                  />
                  <NeuronBadgeGroup 
                    variant="error"
                    badge="Action Required"
                    title="Please update your billing payment method"
                    badgePosition="trailing"
                    arrow
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. SIZES ── */}
          <div className="section-card">
            <h2 className="section-title">{t.badge.sizesTitle}</h2>
            <p className="section-description">{t.badge.sizesDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {([
                { size: 'sm' as const, label: `${t.badge.small} (sm)` },
                { size: 'md' as const, label: `${t.badge.medium} (md)` },
                { size: 'lg' as const, label: `${t.badge.large} (lg)` },
              ]).map(({ size, label }) => (
                <div key={size} className="showcase-item">
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <NeuronBadge variant="brand" size={size}>Label</NeuronBadge>
                    <NeuronBadge variant="brand" size={size} dot>Label</NeuronBadge>
                    <NeuronBadge variant="brand" size={size} onClose={() => {}}>Label</NeuronBadge>
                  </div>
                  <span className="showcase-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. ANATOMY VARIATIONS ── */}
          <div className="section-card">
            <h2 className="section-title">{t.badge.typesTitle}</h2>
            <p className="section-description">{t.badge.typesDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {/* Text Only */}
              <div className="showcase-item">
                <NeuronBadge variant="brand" size="md">Text Only</NeuronBadge>
                <span className="showcase-label">{t.badge.textOnly}</span>
              </div>

              {/* With Dot */}
              <div className="showcase-item">
                <NeuronBadge variant="success" size="md" dot>Online Now</NeuronBadge>
                <span className="showcase-label">{t.badge.withDot}</span>
              </div>

              {/* With Avatar */}
              <div className="showcase-item">
                <NeuronBadge variant="gray" size="md" avatar={AVATAR_URL}>Sarah Jenkins</NeuronBadge>
                <span className="showcase-label">{t.badge.withAvatar}</span>
              </div>

              {/* With Close */}
              <div className="showcase-item">
                <NeuronBadge variant="brand" size="md" onClose={() => alert('Closed!')}>Removable Tag</NeuronBadge>
                <span className="showcase-label">{t.badge.withClose}</span>
              </div>

              {/* With Arrow */}
              <div className="showcase-item">
                <NeuronBadge variant="blue" size="md" arrow>View Changelog</NeuronBadge>
                <span className="showcase-label">{t.badge.withArrow}</span>
              </div>

              {/* Icon Only */}
              <div className="showcase-item">
                <div style={{ display: 'flex', gap: '6px' }}>
                  <NeuronBadge variant="brand" size="md" iconOnly leadingIcon={<Plus size={13} />} />
                  <NeuronBadge variant="success" size="md" iconOnly leadingIcon={<Check size={13} />} />
                </div>
                <span className="showcase-label">{t.badge.iconOnly}</span>
              </div>
            </div>
          </div>

          {/* ── 5. INTERACTIVE PLAYGROUND: NEURON BADGE ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronBadge {t.compShared.playground}</h2>
            <Playground
              name="NeuronBadge"
              knobs={[
                { 
                  name: 'variant', 
                  type: 'select', 
                  options: ['gray', 'brand', 'error', 'warning', 'success', 'blue', 'indigo', 'purple', 'pink', 'orange'], 
                  default: 'brand', 
                  label: t.badge.knobVariant 
                },
                { 
                  name: 'size', 
                  type: 'select', 
                  options: ['sm', 'md', 'lg'], 
                  default: 'md', 
                  label: t.badge.knobSize 
                },
                { 
                  name: 'pill', 
                  type: 'boolean', 
                  default: true, 
                  label: t.badge.knobPill 
                },
                { 
                  name: 'dot', 
                  type: 'boolean', 
                  default: false, 
                  label: t.badge.knobDot 
                },
                { 
                  name: 'avatar', 
                  type: 'boolean', 
                  default: false, 
                  label: t.badge.knobAvatar 
                },
                { 
                  name: 'closeable', 
                  type: 'boolean', 
                  default: false, 
                  label: t.badge.knobCloseable 
                },
                { 
                  name: 'arrow', 
                  type: 'boolean', 
                  default: false, 
                  label: t.badge.knobArrow 
                },
                { 
                  name: 'text', 
                  type: 'text', 
                  default: 'Active Status', 
                  label: t.badge.knobText 
                },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.variant !== 'gray') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }
                if (!knobs.pill) {
                  reactProps.push('pill={false}');
                  vueProps.push(':pill="false"');
                }
                if (knobs.dot) {
                  reactProps.push('dot');
                  vueProps.push('dot');
                }
                if (knobs.avatar) {
                  reactProps.push(`avatar="${AVATAR_URL}"`);
                  vueProps.push(`avatar="${AVATAR_URL}"`);
                }
                if (knobs.arrow) {
                  reactProps.push('arrow');
                  vueProps.push('arrow');
                }
                if (knobs.closeable) {
                  reactProps.push('onClose={() => console.log("closed") }');
                  vueProps.push('@close="handleClose"');
                }

                const reactAttr = reactProps.length ? ` ${reactProps.join(' ')}` : '';
                const vueAttr = vueProps.length ? ` ${vueProps.join(' ')}` : '';

                let htmlClass = `neuron-badge neuron-badge--${knobs.variant} neuron-badge--${knobs.size}`;
                if (knobs.pill) htmlClass += ' neuron-badge--pill';

                let innerHtml = '';
                if (knobs.dot) innerHtml += '<span class="neuron-badge__dot"></span>\n  ';
                if (knobs.avatar) innerHtml += `<img src="${AVATAR_URL}" class="neuron-badge__avatar" />\n  `;
                innerHtml += knobs.text;
                if (knobs.arrow) innerHtml += '\n  <span class="neuron-badge__arrow">&rarr;</span>';
                if (knobs.closeable) innerHtml += '\n  <span class="neuron-badge__close">&times;</span>';

                return {
                  react: `<NeuronBadge${reactAttr}>\n  ${knobs.text}\n</NeuronBadge>`,
                  vue: `<NeuronBadge${vueAttr}>\n  ${knobs.text}\n</NeuronBadge>`,
                  html: `<span class="${htmlClass}">\n  ${innerHtml}\n</span>`,
                };
              }}
            >
              {(knobs) => (
                <NeuronBadge
                  variant={knobs.variant as NeuronBadgeVariant}
                  size={knobs.size as NeuronBadgeSize}
                  pill={knobs.pill as boolean}
                  dot={knobs.dot as boolean}
                  avatar={knobs.avatar ? AVATAR_URL : undefined}
                  arrow={knobs.arrow as boolean}
                  onClose={knobs.closeable ? () => alert('Close clicked!') : undefined}
                >
                  {knobs.text as string}
                </NeuronBadge>
              )}
            </Playground>
          </div>

          {/* ── 6. INTERACTIVE PLAYGROUND: NEURON BADGE GROUP ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronBadgeGroup {t.compShared.playground}</h2>
            <Playground
              name="NeuronBadgeGroup"
              knobs={[
                { 
                  name: 'variant', 
                  type: 'select', 
                  options: ['brand', 'gray', 'error', 'warning', 'success', 'blue', 'indigo', 'purple', 'pink', 'orange'], 
                  default: 'brand', 
                  label: t.badge.knobVariant 
                },
                { 
                  name: 'badge', 
                  type: 'text', 
                  default: 'New feature', 
                  label: t.badge.knobBadgeText 
                },
                { 
                  name: 'title', 
                  type: 'text', 
                  default: "We've just released a new feature", 
                  label: t.badge.knobTitleText 
                },
                { 
                  name: 'badgePosition', 
                  type: 'select', 
                  options: ['leading', 'trailing'], 
                  default: 'leading', 
                  label: t.badge.knobPosition 
                },
                { 
                  name: 'arrow', 
                  type: 'boolean', 
                  default: true, 
                  label: t.badge.knobArrow 
                },
                { 
                  name: 'isLink', 
                  type: 'boolean', 
                  default: false, 
                  label: 'As Anchor Link (href)' 
                },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.variant !== 'brand') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                reactProps.push(`badge="${knobs.badge}"`);
                vueProps.push(`badge="${knobs.badge}"`);
                reactProps.push(`title="${knobs.title}"`);
                vueProps.push(`title="${knobs.title}"`);

                if (knobs.badgePosition !== 'leading') {
                  reactProps.push(`badgePosition="${knobs.badgePosition}"`);
                  vueProps.push(`badge-position="${knobs.badgePosition}"`);
                }
                if (!knobs.arrow) {
                  reactProps.push('arrow={false}');
                  vueProps.push(':arrow="false"');
                }
                if (knobs.isLink) {
                  reactProps.push('href="/changelog"');
                  vueProps.push('href="/changelog"');
                }

                const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
                const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

                let htmlTag = knobs.isLink ? 'a href="/changelog"' : 'div';
                let htmlCloseTag = knobs.isLink ? 'a' : 'div';
                let htmlClass = `neuron-badge-group neuron-badge-group--${knobs.variant}`;
                if (knobs.badgePosition === 'trailing') htmlClass += ' neuron-badge-group--trailing';

                const badgeHtml = `<span class="neuron-badge neuron-badge--${knobs.variant} neuron-badge--sm neuron-badge--pill">${knobs.badge}</span>`;
                const textHtml = `<span class="neuron-badge-group__text">${knobs.title}</span>`;
                const arrowHtml = knobs.arrow ? '\n  <span class="neuron-badge-group__arrow">&rarr;</span>' : '';

                let innerHtml = '';
                if (knobs.badgePosition === 'leading') {
                  innerHtml = `  ${badgeHtml}\n  ${textHtml}${arrowHtml}`;
                } else {
                  innerHtml = `  ${textHtml}\n  ${badgeHtml}${arrowHtml}`;
                }

                return {
                  react: `<NeuronBadgeGroup${reactAttr}/>`,
                  vue: `<NeuronBadgeGroup${vueAttr}/>`,
                  html: `<${htmlTag} class="${htmlClass}">\n${innerHtml}\n</${htmlCloseTag}>`,
                };
              }}
            >
              {(knobs) => (
                <NeuronBadgeGroup
                  variant={knobs.variant as NeuronBadgeVariant}
                  badge={knobs.badge as string}
                  title={knobs.title as string}
                  badgePosition={knobs.badgePosition as 'leading' | 'trailing'}
                  arrow={knobs.arrow as boolean}
                  onClick={knobs.isLink ? undefined : () => alert(`Clicked: ${knobs.title}`)}
                  href={knobs.isLink ? '#changelog' : undefined}
                />
              )}
            </Playground>
          </div>

          {/* ── 6. API REFERENCE TABLES ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronBadge {t.compShared.apiReference}</h2>
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
                    <td><code>'gray' | 'brand' | 'error' | 'warning' | 'success' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange'</code></td>
                    <td><code>'gray'</code></td>
                    <td>{t.badge.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>{t.badge.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>pill</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>{t.badge.apiPill}</td>
                  </tr>
                  <tr>
                    <td><code>fill</code></td>
                    <td><code>'subtle' | 'solid' | 'outline'</code></td>
                    <td><code>'subtle'</code></td>
                    <td>{t.badge.apiFill}</td>
                  </tr>
                  <tr>
                    <td><code>dot</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.badge.apiDot}</td>
                  </tr>
                  <tr>
                    <td><code>avatar</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.badge.apiAvatar}</td>
                  </tr>
                  <tr>
                    <td><code>leadingIcon</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.badge.apiLeadingIcon}</td>
                  </tr>
                  <tr>
                    <td><code>arrow</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.badge.apiArrow}</td>
                  </tr>
                  <tr>
                    <td><code>onClose</code></td>
                    <td><code>(e: MouseEvent) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.badge.apiOnClose}</td>
                  </tr>
                  <tr>
                    <td><code>iconOnly</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.badge.apiIconOnly}</td>
                  </tr>
                  <tr>
                    <td><code>children</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.badge.apiChildren}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="section-card">
            <h2 className="section-title">NeuronBadgeGroup {t.compShared.apiReference}</h2>
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
                    <td><code>'gray' | 'brand' | 'error' | 'warning' | 'success' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange'</code></td>
                    <td><code>'brand'</code></td>
                    <td>{t.badge.apiGroupVariant}</td>
                  </tr>
                  <tr>
                    <td><code>badge</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>required</code></td>
                    <td>{t.badge.apiGroupBadge}</td>
                  </tr>
                  <tr>
                    <td><code>title</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>required</code></td>
                    <td>{t.badge.apiGroupTitle}</td>
                  </tr>
                  <tr>
                    <td><code>badgePosition</code></td>
                    <td><code>'leading' | 'trailing'</code></td>
                    <td><code>'leading'</code></td>
                    <td>{t.badge.apiGroupPosition}</td>
                  </tr>
                  <tr>
                    <td><code>arrow</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>{t.badge.apiGroupArrow}</td>
                  </tr>
                  <tr>
                    <td><code>href</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.badge.apiGroupHref}</td>
                  </tr>
                  <tr>
                    <td><code>onClick</code></td>
                    <td><code>(e: MouseEvent) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.badge.apiGroupOnClick}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-card', label: t.nav.compCard }}
        next={{ id: 'comp-toggle', label: t.nav.compToggle }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
