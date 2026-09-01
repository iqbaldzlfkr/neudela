import React, { useState } from 'react';
import NeuronBreadcrumb, { BreadcrumbVariant, BreadcrumbSize, BreadcrumbSeparator } from '../components/NeuronBreadcrumb';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Check, Keyboard, Home, Settings, Users, FileText, FolderOpen, ChevronRight, Globe } from 'lucide-react';

interface BreadcrumbViewProps {
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
        {isDo ? 'Do' : "Don't"}
      </div>
      <div className="rule-card__content">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Anatomy Label
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

// ─────────────────────────────────────────────
// Demo data
// ─────────────────────────────────────────────
const DEMO_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Electronics', href: '#' },
  { label: 'Smartphones' },
];

const LONG_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Organization', href: '#' },
  { label: 'Engineering', href: '#' },
  { label: 'Frontend', href: '#' },
  { label: 'Design System', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Breadcrumb' },
];

const ICON_ITEMS = [
  { label: 'Home', href: '#', icon: <Home size={14} /> },
  { label: 'Settings', href: '#', icon: <Settings size={14} /> },
  { label: 'Team', href: '#', icon: <Users size={14} /> },
  { label: 'Profile' },
];

const FILE_ITEMS = [
  { label: 'root', href: '#', icon: <FolderOpen size={13} /> },
  { label: 'src', href: '#', icon: <FolderOpen size={13} /> },
  { label: 'components', href: '#', icon: <FolderOpen size={13} /> },
  { label: 'NeuronBreadcrumb.tsx', icon: <FileText size={13} /> },
];

const VARIANTS: BreadcrumbVariant[] = ['default', 'filled', 'bordered', 'pills'];
const SIZES: BreadcrumbSize[] = ['sm', 'md', 'lg'];
const SEPARATORS: BreadcrumbSeparator[] = ['chevron', 'slash', 'arrow', 'dot', 'dash'];

export default function BreadcrumbView({ setActiveTab }: BreadcrumbViewProps) {
  const { t } = useLanguage();
  const [activeViewTab, setViewTab] = useState<'guideline' | 'playbook'>('guideline');

  return (
    <div className="badge-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">Breadcrumb</h1>
            <p className="page-subtitle">
              Hierarchical navigation trail that reveals the user's current location within a multi-level information architecture, enabling quick traversal to any ancestor page.
            </p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
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

      {/* ══════════════════════════════════════
          TAB 1 – GUIDELINE
      ══════════════════════════════════════ */}
      {activeViewTab === 'guideline' && (
        <div className="tab-content">

          {/* ── 1. Overview / Spec Matrix ── */}
          <div className="section-card">
            <h2 className="section-title">Overview</h2>
            <p className="section-description">
              Breadcrumbs provide a secondary navigation pattern that shows the page hierarchy from root to the current location.
              They are especially useful in applications with deep navigation structures such as e-commerce catalogs, content management systems, and enterprise dashboards.
            </p>

            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">Breadcrumb Specification Matrix</div>
                  <div className="badge-spec-subtitle">4 Variants × 3 Sizes × 5 Separators — Collapsible & Icon Support</div>
                </div>
              </div>

              {/* Master Matrix Table */}
              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th style={{ width: '120px', minWidth: '100px' }}>Variant</th>
                      <th style={{ minWidth: '300px' }}>Chevron (Default)</th>
                      <th style={{ minWidth: '300px' }}>Slash</th>
                      <th style={{ minWidth: '300px' }}>Arrow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VARIANTS.map((v) => (
                      <tr key={v}>
                        <td>
                          <div className="badge-theme-cell">
                            <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{v}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <NeuronBreadcrumb items={DEMO_ITEMS} variant={v} separator="chevron" size="sm" />
                        </td>
                        <td style={{ padding: '12px' }}>
                          <NeuronBreadcrumb items={DEMO_ITEMS} variant={v} separator="slash" size="sm" />
                        </td>
                        <td style={{ padding: '12px' }}>
                          <NeuronBreadcrumb items={DEMO_ITEMS} variant={v} separator="arrow" size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── 2. Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">Anatomy</h2>
            <p className="section-description">
              A breadcrumb trail is composed of interactive ancestor links, visual separators, and a terminal current page indicator — all wrapped in a semantic nav landmark.
            </p>

            <div className="anatomy-diagram">
              <div className="anatomy-preview" style={{ minHeight: '320px', padding: 'var(--space-8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* Precision Blueprint Schematic Diagram Frame */}
                <div style={{
                  position: 'relative',
                  width: '580px',
                  height: '260px',
                  background: 'var(--color-bg-surface)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xs)',
                  overflow: 'visible'
                }}>

                  {/* SVG Precision Connector Lines & Terminals */}
                  <svg
                    width="580"
                    height="260"
                    viewBox="0 0 580 260"
                    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}
                  >
                    {/* Marker 1: Nav Container (Left straight to outer container border) */}
                    <line x1="38" y1="127" x2="80" y2="127" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="80" cy="127" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 2: Leading Icon (Top straight down to Home icon) */}
                    <line x1="100" y1="44" x2="100" y2="112" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="100" cy="112" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 3: Ancestor Link (Bottom straight up to Products link) */}
                    <line x1="206" y1="212" x2="206" y2="142" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="206" cy="142" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 4: Hierarchy Separator (Top straight down to Chevron separator) */}
                    <line x1="372" y1="44" x2="372" y2="118" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="372" cy="118" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 5: Current Page Indicator (Bottom straight up to Current Page item) */}
                    <line x1="436" y1="212" x2="436" y2="142" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="436" cy="142" r="3" fill="var(--color-text-primary)" />
                  </svg>

                  {/* Target Component positioned in the center */}
                  <div style={{
                    position: 'absolute',
                    left: '80px',
                    top: '110px',
                    zIndex: 5
                  }}>
                    <NeuronBreadcrumb
                      items={[
                        { label: 'Home', href: '#', icon: <Home size={14} /> },
                        { label: 'Products', href: '#' },
                        { label: 'Electronics', href: '#' },
                        { label: 'Smartphones' },
                      ]}
                      variant="bordered"
                      size="md"
                      separator="chevron"
                      showHomeIcon
                    />
                  </div>

                  {/* Marker 1: Nav Container (Far Left) */}
                  <div style={{ position: 'absolute', left: '16px', top: '116px', zIndex: 20 }}>
                    <span className="anatomy-marker">1</span>
                  </div>

                  {/* Marker 2: Leading Icon (Top Left) */}
                  <div style={{ position: 'absolute', left: '89px', top: '22px', zIndex: 20 }}>
                    <span className="anatomy-marker">2</span>
                  </div>

                  {/* Marker 3: Ancestor Link (Bottom Left) */}
                  <div style={{ position: 'absolute', left: '195px', top: '212px', zIndex: 20 }}>
                    <span className="anatomy-marker">3</span>
                  </div>

                  {/* Marker 4: Hierarchy Separator (Top Right) */}
                  <div style={{ position: 'absolute', left: '361px', top: '22px', zIndex: 20 }}>
                    <span className="anatomy-marker">4</span>
                  </div>

                  {/* Marker 5: Current Page Indicator (Bottom Right) */}
                  <div style={{ position: 'absolute', left: '425px', top: '212px', zIndex: 20 }}>
                    <span className="anatomy-marker">5</span>
                  </div>
                </div>
              </div>

              <div className="anatomy-labels">
                <AnatomyLabel number={1} label="Nav Container" desc="Semantic <nav> element with aria-label='Breadcrumb' for assistive technologies." />
                <AnatomyLabel number={2} label="Leading / Home Icon" desc="Visual waypoint icon providing immediate recognition of the root directory or parent section." />
                <AnatomyLabel number={3} label="Ancestor Page Link" desc="Interactive clickable link allowing one-click traversal upward to ancestor hierarchy levels." />
                <AnatomyLabel number={4} label="Hierarchy Separator" desc="Visual glyph (chevron, slash, arrow, dot) dividing sequential hierarchy tiers." />
                <AnatomyLabel number={5} label="Current Page Indicator" desc="Terminal non-clickable item with aria-current='page' and bold typography emphasis." />
              </div>
            </div>
          </div>

          {/* ── 3. When to Use ── */}
          <div className="section-card">
            <h2 className="section-title">When to Use</h2>
            <p className="section-description">Choose the right breadcrumb pattern based on your navigation structure and information architecture.</p>

            <div className="usage-table">
              <div className="usage-row usage-row--header">
                <span>Pattern</span>
                <span>When to Use</span>
              </div>
              {[
                {
                  preview: <NeuronBreadcrumb items={[{ label: 'Dashboard', href: '#' }, { label: 'Analytics', href: '#' }, { label: 'Revenue' }]} size="sm" />,
                  desc: 'Standard hierarchy breadcrumb for pages with 2–4 levels of depth. Use on dashboards, settings panels, and detail views.',
                },
                {
                  preview: <NeuronBreadcrumb items={LONG_ITEMS} size="sm" maxItems={3} />,
                  desc: 'Collapsible breadcrumb for deep hierarchies (5+ levels). Middle items are collapsed into an ellipsis that expands on click.',
                },
                {
                  preview: <NeuronBreadcrumb items={ICON_ITEMS} size="sm" showHomeIcon />,
                  desc: 'Icon-enhanced breadcrumbs for interfaces where visual landmarks improve wayfinding. Ideal for file browsers and admin panels.',
                },
                {
                  preview: <NeuronBreadcrumb items={FILE_ITEMS} size="sm" separator="slash" />,
                  desc: 'File system or path-style breadcrumbs using slash separators. Best for code editors, file managers, and developer tools.',
                },
              ].map(({ preview, desc }, idx) => (
                <div key={idx} className="usage-row">
                  <div className="usage-preview">{preview}</div>
                  <p className="usage-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. Do / Don't ── */}
          <div className="section-card">
            <h2 className="section-title">Do's and Don'ts</h2>
            <p className="section-description">Follow these guidelines to ensure breadcrumbs remain useful, consistent, and accessible.</p>

            {/* Pair 1 */}
            <div className="rule-pair">
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronBreadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Shop', href: '#' }, { label: 'Running Shoes' }]} size="sm" />
                </div>
                <p><strong>Keep labels short and descriptive</strong>: Use concise page titles that match the actual page heading. Users should recognize each level instantly.</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <NeuronBreadcrumb items={[{ label: 'Go back to the main page of our application', href: '#' }, { label: 'Navigate to the Shopping Section', href: '#' }, { label: 'You are currently viewing Running Shoes' }]} size="sm" />
                </div>
                <p><strong>Don't use verbose or instructional labels</strong>: Breadcrumb labels should be page names, not sentences or actions. Keep them under 3–4 words.</p>
              </RuleCard>
            </div>

            {/* Pair 2 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronBreadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Products', href: '#' }, { label: 'Electronics', href: '#' }, { label: 'Smartphones' }]} size="sm" />
                </div>
                <p><strong>Show the complete hierarchy path</strong>: Include all ancestor levels so users understand the full navigation context at a glance.</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <NeuronBreadcrumb items={[{ label: 'Smartphones' }]} size="sm" />
                </div>
                <p><strong>Don't show only the current page</strong>: A breadcrumb with a single item provides no navigational value. Use breadcrumbs only when there are at least 2 hierarchy levels.</p>
              </RuleCard>
            </div>

            {/* Pair 3 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronBreadcrumb items={LONG_ITEMS} size="sm" maxItems={4} />
                </div>
                <p><strong>Use collapse for deep hierarchies</strong>: When there are more than 4–5 levels, use maxItems to collapse middle items into an expandable ellipsis.</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview" style={{ overflow: 'hidden' }}>
                  <NeuronBreadcrumb items={[...LONG_ITEMS, { label: 'Properties', href: '#' }, { label: 'Variants', href: '#' }, { label: 'Default' }]} size="sm" />
                </div>
                <p><strong>Don't let breadcrumbs overflow</strong>: Extremely long trails push content off-screen and create visual clutter. Always collapse deep paths.</p>
              </RuleCard>
            </div>
          </div>

          {/* ── 5. Size Guidelines ── */}
          <div className="section-card">
            <h2 className="section-title">Size Guidelines</h2>
            <p className="section-description">Select breadcrumb sizes that match the density and visual weight of the surrounding interface.</p>
            
            <div className="size-guide-list">
              {[
                {
                  size: 'sm' as const,
                  name: 'Small',
                  code: 'sm',
                  fontSize: '12px (text-xs)',
                  gap: '4px',
                  icon: '10px / 12px',
                  usage: 'Compact UIs, dense data table headers, nested modal navigation, and mobile viewports.',
                  items: [
                    { label: 'Home', href: '#' },
                    { label: 'Docs', href: '#' },
                    { label: 'Overview' },
                  ],
                },
                {
                  size: 'md' as const,
                  name: 'Medium',
                  code: 'md',
                  isDefault: true,
                  fontSize: '14px (text-sm)',
                  gap: '6px',
                  icon: '12px / 14px',
                  usage: 'Standard page-level breadcrumbs for web applications, SaaS dashboards, and content management.',
                  items: [
                    { label: 'Home', href: '#' },
                    { label: 'Docs', href: '#' },
                    { label: 'Overview' },
                  ],
                },
                {
                  size: 'lg' as const,
                  name: 'Large',
                  code: 'lg',
                  fontSize: '16px (text-md)',
                  gap: '8px',
                  icon: '14px / 16px',
                  usage: 'Hero banners, portal landing pages, documentation title bars, and prominent section headers.',
                  items: [
                    { label: 'Home', href: '#' },
                    { label: 'Docs', href: '#' },
                    { label: 'Overview' },
                  ],
                },
              ].map((item) => (
                <div key={item.size} className="size-guide-row" style={{ gridTemplateColumns: 'minmax(280px, 320px) 1fr' }}>
                  <div className="size-guide-preview" style={{ flexShrink: 0, overflow: 'visible', whiteSpace: 'nowrap' }}>
                    <NeuronBreadcrumb items={item.items} size={item.size} />
                  </div>
                  <div className="size-guide-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span className="size-guide-name" style={{ margin: 0 }}>
                        {item.name} ({item.code})
                      </span>
                      {item.isDefault && (
                        <span style={{
                          fontSize: '10px',
                          padding: '1px 6px',
                          background: 'rgba(223, 126, 48, 0.12)',
                          color: 'var(--brand-600)',
                          borderRadius: 'var(--radius-full)',
                          fontWeight: 600,
                          border: '1px solid rgba(223, 126, 48, 0.25)'
                        }}>
                          Default
                        </span>
                      )}
                      <span style={{
                        fontSize: '11px',
                        padding: '1px 6px',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'monospace'
                      }}>
                        {item.fontSize}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        padding: '1px 6px',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'monospace'
                      }}>
                        Gap: {item.gap}
                      </span>
                    </div>
                    <div className="size-guide-usage">{item.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 6. Accessibility ── */}
          <div className="section-card">
            <h2 className="section-title">Accessibility</h2>
            <p className="section-description">NeuronBreadcrumb follows WAI-ARIA breadcrumb design pattern for full assistive technology support.</p>
            <div className="a11y-list">
              <div className="a11y-item">
                <div className="a11y-icon"><Globe size={16} /></div>
                <div>
                  <div className="a11y-title">ARIA Navigation Landmark</div>
                  <div className="a11y-desc">Wrapped in a {'<nav>'} element with aria-label="Breadcrumb" so screen readers announce it as a navigation region.</div>
                </div>
              </div>
              <div className="a11y-item">
                <div className="a11y-icon"><Check size={16} /></div>
                <div>
                  <div className="a11y-title">aria-current="page"</div>
                  <div className="a11y-desc">The last item in the trail is marked with aria-current="page" so screen readers correctly identify the current location.</div>
                </div>
              </div>
              <div className="a11y-item">
                <div className="a11y-icon"><Keyboard size={16} /></div>
                <div>
                  <div className="a11y-title">Keyboard Navigation</div>
                  <div className="a11y-desc">All ancestor links and the ellipsis expand button are fully keyboard-focusable and operable with Tab and Enter keys.</div>
                </div>
              </div>
              <div className="a11y-item">
                <div className="a11y-icon"><ShieldCheck size={16} /></div>
                <div>
                  <div className="a11y-title">Semantic Ordered List</div>
                  <div className="a11y-desc">Uses {'<ol>'} + {'<li>'} markup so screen readers announce the hierarchy position (e.g., "item 2 of 4").</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2 – PLAYBOOK
      ══════════════════════════════════════ */}
      {activeViewTab === 'playbook' && (
        <div className="tab-content">

          {/* ── 1. VARIANTS ── */}
          <div className="section-card">
            <h2 className="section-title">Variants</h2>
            <p className="section-description">Four visual styles to match different surface treatments and interface density levels.</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {VARIANTS.map(v => (
                <div key={v} className="showcase-item" style={{ alignItems: 'flex-start', gridColumn: '1 / -1' }}>
                  <NeuronBreadcrumb items={DEMO_ITEMS} variant={v} />
                  <span className="showcase-label" style={{ textTransform: 'capitalize' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2. SIZES ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.sizes}</h2>
            <p className="section-description">Available in 3 standard scales: sm (Small), md (Medium — default), and lg (Large).</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {SIZES.map(sz => (
                <div key={sz} className="showcase-item" style={{ alignItems: 'flex-start', gridColumn: '1 / -1' }}>
                  <NeuronBreadcrumb items={DEMO_ITEMS} size={sz} />
                  <span className="showcase-label">{sz === 'sm' ? 'Small (sm)' : sz === 'md' ? 'Medium (md)' : 'Large (lg)'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. SEPARATORS ── */}
          <div className="section-card">
            <h2 className="section-title">Separator Styles</h2>
            <p className="section-description">Five built-in separator styles — chevron (default), slash, arrow, dot, and dash — plus support for custom separators.</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {SEPARATORS.map(sep => (
                <div key={sep} className="showcase-item" style={{ alignItems: 'flex-start', gridColumn: '1 / -1' }}>
                  <NeuronBreadcrumb items={DEMO_ITEMS} separator={sep} />
                  <span className="showcase-label" style={{ textTransform: 'capitalize' }}>{sep}</span>
                </div>
              ))}
              {/* Custom separator */}
              <div className="showcase-item" style={{ alignItems: 'flex-start', gridColumn: '1 / -1' }}>
                <NeuronBreadcrumb items={DEMO_ITEMS} customSeparator={<span style={{ fontSize: '10px' }}>▸</span>} />
                <span className="showcase-label">Custom (▸)</span>
              </div>
            </div>
          </div>

          {/* ── 4. WITH ICONS ── */}
          <div className="section-card">
            <h2 className="section-title">With Icons</h2>
            <p className="section-description">Add leading icons to breadcrumb items for enhanced visual recognition and wayfinding.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div>
                <div style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                  Home Icon Only
                </div>
                <NeuronBreadcrumb items={DEMO_ITEMS} showHomeIcon />
              </div>
              <div>
                <div style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                  Per-Item Icons
                </div>
                <NeuronBreadcrumb items={ICON_ITEMS} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                  File System Path
                </div>
                <NeuronBreadcrumb items={FILE_ITEMS} separator="slash" variant="bordered" />
              </div>
            </div>
          </div>

          {/* ── 5. COLLAPSIBLE ── */}
          <div className="section-card">
            <h2 className="section-title">Collapsible (maxItems)</h2>
            <p className="section-description">
              For deep navigation hierarchies, use the maxItems prop to collapse intermediate levels into an expandable ellipsis button. 
              Click the "•••" button to reveal all hidden items.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div>
                <div style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                  maxItems=3 (7 total items)
                </div>
                <NeuronBreadcrumb items={LONG_ITEMS} maxItems={3} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                  maxItems=4 (7 total items)
                </div>
                <NeuronBreadcrumb items={LONG_ITEMS} maxItems={4} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                  Full breadcrumb (no collapse)
                </div>
                <NeuronBreadcrumb items={LONG_ITEMS} />
              </div>
            </div>
          </div>

          {/* ── 6. REAL-WORLD PATTERNS ── */}
          <div className="section-card">
            <h2 className="section-title">Real-World Patterns</h2>
            <p className="section-description">Production-ready breadcrumb patterns for common enterprise interfaces.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {/* E-Commerce */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                background: 'var(--color-bg-surface)'
              }}>
                <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  🛒 E-Commerce Product Page
                </strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', margin: '0 0 12px 0' }}>
                  Deep catalog navigation with category hierarchy
                </p>
                <NeuronBreadcrumb
                  items={[
                    { label: 'Home', href: '#' },
                    { label: 'Women', href: '#' },
                    { label: 'Clothing', href: '#' },
                    { label: 'Dresses', href: '#' },
                    { label: 'Summer Collection' },
                  ]}
                  showHomeIcon
                  variant="default"
                />
              </div>

              {/* Admin Dashboard */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                background: 'var(--color-bg-surface)'
              }}>
                <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  📊 Admin Dashboard Settings
                </strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', margin: '0 0 12px 0' }}>
                  Enterprise settings panel with icon-enhanced trail
                </p>
                <NeuronBreadcrumb
                  items={[
                    { label: 'Dashboard', href: '#', icon: <Home size={13} /> },
                    { label: 'Settings', href: '#', icon: <Settings size={13} /> },
                    { label: 'Users & Permissions', icon: <Users size={13} /> },
                  ]}
                  variant="filled"
                />
              </div>

              {/* Documentation */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                background: 'var(--color-bg-surface)'
              }}>
                <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  📖 Documentation Site
                </strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', margin: '0 0 12px 0' }}>
                  Deep documentation hierarchy with pill variant
                </p>
                <NeuronBreadcrumb
                  items={[
                    { label: 'Docs', href: '#' },
                    { label: 'Components', href: '#' },
                    { label: 'Navigation', href: '#' },
                    { label: 'Breadcrumb' },
                  ]}
                  variant="pills"
                  separator="chevron"
                />
              </div>

              {/* File System */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                background: 'var(--color-bg-surface)'
              }}>
                <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                  💻 Code Editor / File Browser
                </strong>
                <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', margin: '0 0 12px 0' }}>
                  File path breadcrumb with folder icons and slash separators
                </p>
                <NeuronBreadcrumb
                  items={FILE_ITEMS}
                  separator="slash"
                  variant="bordered"
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* ── 7. INTERACTIVE PLAYGROUND ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.playground}</h2>
            <Playground
              name="NeuronBreadcrumb"
              knobs={[
                { name: 'variant', type: 'select', options: ['default', 'filled', 'bordered', 'pills'], default: 'default', label: 'Variant' },
                { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md', label: 'Size' },
                { name: 'separator', type: 'select', options: ['chevron', 'slash', 'arrow', 'dot', 'dash'], default: 'chevron', label: 'Separator' },
                { name: 'showHomeIcon', type: 'boolean', default: false, label: 'Show Home Icon' },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.variant !== 'default') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }
                if (knobs.separator !== 'chevron') {
                  reactProps.push(`separator="${knobs.separator}"`);
                  vueProps.push(`separator="${knobs.separator}"`);
                }
                if (knobs.showHomeIcon) {
                  reactProps.push('showHomeIcon');
                  vueProps.push('show-home-icon');
                }

                const rp = reactProps.length > 0 ? '\n  ' + reactProps.join('\n  ') + '\n  ' : ' ';
                const vp = vueProps.length > 0 ? '\n  ' + vueProps.join('\n  ') + '\n  ' : ' ';

                return {
                  react: `<NeuronBreadcrumb${rp}items={[\n    { label: 'Home', href: '/' },\n    { label: 'Products', href: '/products' },\n    { label: 'Electronics' },\n  ]}\n/>`,
                  vue: `<NeuronBreadcrumb${vp}:items="[\n    { label: 'Home', href: '/' },\n    { label: 'Products', href: '/products' },\n    { label: 'Electronics' },\n  ]"\n/>`,
                  html: `<nav aria-label="Breadcrumb">\n  <ol class="neuron-breadcrumb neuron-breadcrumb--${knobs.variant} neuron-breadcrumb--${knobs.size}">\n    <li><a href="/">Home</a></li>\n    <li><a href="/products">Products</a></li>\n    <li aria-current="page">Electronics</li>\n  </ol>\n</nav>`,
                };
              }}
            >
              {(knobs) => (
                <NeuronBreadcrumb
                  items={DEMO_ITEMS}
                  variant={knobs.variant as BreadcrumbVariant}
                  size={knobs.size as BreadcrumbSize}
                  separator={knobs.separator as BreadcrumbSeparator}
                  showHomeIcon={knobs.showHomeIcon as boolean}
                />
              )}
            </Playground>
          </div>

          {/* ── 8. API REFERENCE ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.apiReference}</h2>
            <div className="badge-spec-table-wrap">
              <table className="badge-matrix-table">
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
                    <td><code>items</code></td>
                    <td><code>BreadcrumbItem[]</code></td>
                    <td>—</td>
                    <td>Array of breadcrumb items ordered from root ancestor to the current page. <em>Required.</em></td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'default' | 'filled' | 'bordered' | 'pills'</code></td>
                    <td><code>'default'</code></td>
                    <td>Visual style variant controlling background, border, and item treatments.</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>Size scale controlling font size, padding, and separator spacing.</td>
                  </tr>
                  <tr>
                    <td><code>separator</code></td>
                    <td><code>'slash' | 'chevron' | 'arrow' | 'dot' | 'dash'</code></td>
                    <td><code>'chevron'</code></td>
                    <td>Built-in separator style rendered between each breadcrumb item.</td>
                  </tr>
                  <tr>
                    <td><code>customSeparator</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>Custom separator element. When provided, overrides the separator prop.</td>
                  </tr>
                  <tr>
                    <td><code>maxItems</code></td>
                    <td><code>number</code></td>
                    <td>—</td>
                    <td>Maximum visible items before collapsing middle items into an expandable ellipsis button.</td>
                  </tr>
                  <tr>
                    <td><code>showHomeIcon</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>When true, renders a home icon before the first item's label.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-3)' }}>BreadcrumbItem Interface</h3>
              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th>{t.compShared.prop}</th>
                      <th>{t.compShared.type}</th>
                      <th>{t.compShared.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>label</code></td>
                      <td><code>string</code></td>
                      <td>Display text for the breadcrumb item. <em>Required.</em></td>
                    </tr>
                    <tr>
                      <td><code>href</code></td>
                      <td><code>string</code></td>
                      <td>Navigation target URL. Omit for the current/active (last) item.</td>
                    </tr>
                    <tr>
                      <td><code>icon</code></td>
                      <td><code>ReactNode</code></td>
                      <td>Optional leading icon rendered before the label.</td>
                    </tr>
                    <tr>
                      <td><code>onClick</code></td>
                      <td><code>() =&gt; void</code></td>
                      <td>Click handler (prevents default navigation when provided).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}

      <NextPrevious
        prev={{ id: 'comp-badge', label: t.nav.compBadge }}
        next={{ id: 'comp-button', label: t.nav.compButton }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
