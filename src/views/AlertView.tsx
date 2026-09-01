import React, { useState } from 'react';
import NeuronAlert, { AlertVariant, AlertSize, AlertFill } from '../components/NeuronAlert';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Check, Bell } from 'lucide-react';

interface AlertViewProps {
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
// Size Guide Row
// ─────────────────────────────────────────────
function SizeGuideRow({ size, label, usage, variant }: { size: AlertSize; label: string; usage: string; variant: AlertVariant }) {
  return (
    <div className="size-guide-row">
      <div className="size-guide-preview">
        <NeuronAlert variant={variant} size={size} title={label} />
      </div>
      <div className="size-guide-info">
        <div className="size-guide-name">{label}</div>
        <div className="size-guide-usage">{usage}</div>
      </div>
    </div>
  );
}

const VARIANTS: AlertVariant[]   = ['info', 'success', 'warning', 'danger'];
const SIZES: AlertSize[]         = ['sm', 'md', 'lg'];
const FILLS: AlertFill[]         = ['subtle', 'solid', 'outlined'];

export default function AlertView({ setActiveTab }: AlertViewProps) {
  const { t } = useLanguage();
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');
  const gl = t.alert.guideline;

  // Dismiss demo state
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const handleDismiss = (key: string) => setDismissed(prev => ({ ...prev, [key]: true }));
  const resetDismissed = () => setDismissed({});

  const variantLabel: Record<AlertVariant, string> = {
    info: t.alert.info,
    success: t.alert.success,
    warning: t.alert.warning,
    danger: t.alert.danger,
  };

  const variantDesc: Record<AlertVariant, string> = {
    info: t.alert.infoDesc,
    success: t.alert.successDesc,
    warning: t.alert.warningDesc,
    danger: t.alert.dangerDesc,
  };

  const fillLabel: Record<AlertFill, string> = {
    subtle: t.alert.subtle,
    solid: t.alert.solid,
    outlined: t.alert.outlined,
  };

  return (
    <div className="badge-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.alert.pageTitle}</h1>
            <p className="page-subtitle">{t.alert.pageSubtitle}</p>
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

          {/* ── 1. Overview / Spec Matrix ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.overviewTitle}</h2>
            <p className="section-description">{gl.overviewDesc}</p>

            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">{gl.overviewAlertHeading}</div>
                  <div className="badge-spec-subtitle">{gl.overviewSubtitle}</div>
                </div>

                {Object.values(dismissed).some(Boolean) && (
                  <button
                    onClick={resetDismissed}
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-primary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Reset Dismissed
                  </button>
                )}
              </div>

              {/* Master Matrix Table */}
              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th style={{ width: '120px', minWidth: '100px' }}>Variant</th>
                      <th style={{ minWidth: '260px' }}>Subtle (sm · md · lg)</th>
                      <th style={{ minWidth: '260px' }}>Solid</th>
                      <th style={{ minWidth: '260px' }}>Outlined</th>
                      <th style={{ minWidth: '200px' }}>Dismissible</th>
                      <th style={{ minWidth: '220px' }}>With Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VARIANTS.map((v) => (
                      <tr key={v}>
                        {/* Variant label */}
                        <td>
                          <div className="badge-theme-cell">
                            <span
                              className="badge-theme-dot"
                              style={{
                                backgroundColor: v === 'info' ? 'var(--sky-500)'
                                  : v === 'success' ? 'var(--emerald-500)'
                                  : v === 'warning' ? 'var(--amber-500)'
                                  : 'var(--red-500)'
                              }}
                            />
                            <span style={{ textTransform: 'capitalize' }}>{variantLabel[v]}</span>
                          </div>
                        </td>

                        {/* Subtle – sm, md, lg */}
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {SIZES.map(sz => (
                              <NeuronAlert key={sz} variant={v} size={sz} fill="subtle" title={variantLabel[v]} description={variantDesc[v]} />
                            ))}
                          </div>
                        </td>

                        {/* Solid */}
                        <td>
                          <NeuronAlert variant={v} fill="solid" title={variantLabel[v]} description={variantDesc[v]} />
                        </td>

                        {/* Outlined */}
                        <td>
                          <NeuronAlert variant={v} fill="outlined" title={variantLabel[v]} description={variantDesc[v]} />
                        </td>

                        {/* Dismissible */}
                        <td>
                          {!dismissed[v] ? (
                            <NeuronAlert
                              variant={v}
                              title={variantLabel[v]}
                              description={variantDesc[v]}
                              dismissible
                              onDismiss={() => handleDismiss(v)}
                            />
                          ) : (
                            <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
                              Dismissed
                            </span>
                          )}
                        </td>

                        {/* With Actions */}
                        <td>
                          <NeuronAlert
                            variant={v}
                            title={variantLabel[v]}
                            description={variantDesc[v]}
                            actions={[
                              { label: 'Learn more', onClick: () => {} },
                              { label: 'Dismiss', onClick: () => {}, ghost: true },
                            ]}
                          />
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
            <h2 className="section-title">{gl.anatomyTitle}</h2>
            <p className="section-description">{gl.anatomyDesc}</p>

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
                    {/* Marker 1: Container (Left border) */}
                    <line x1="36" y1="125" x2="55" y2="125" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="55" cy="125" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 2: Leading Icon (Top directly to icon center-top) */}
                    <line x1="80" y1="34" x2="80" y2="67" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="80" cy="67" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 3: Content Body (Top directly to title text) */}
                    <line x1="200" y1="34" x2="200" y2="67" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="200" cy="67" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 4: Action Buttons (Bottom directly into primary action button pill) */}
                    <line x1="148" y1="168" x2="148" y2="224" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="148" cy="168" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 5: Dismiss Button (Right line entering inside alert directly to the ✕ close button) */}
                    <line x1="482" y1="77" x2="542" y2="77" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="482" cy="77" r="3" fill="var(--color-text-primary)" />
                  </svg>

                  {/* Target Component positioned in the center */}
                  <div style={{
                    position: 'absolute',
                    left: '55px',
                    top: '55px',
                    width: '450px',
                    zIndex: 2
                  }}>
                    <NeuronAlert
                      variant="info"
                      size="md"
                      title="System Update Available"
                      description="A new version of the design system is available for download."
                      dismissible
                      onDismiss={() => {}}
                      actions={[
                        { label: 'Update Now', onClick: () => {} },
                        { label: 'Remind Later', onClick: () => {}, ghost: true },
                      ]}
                    />
                  </div>

                  {/* Marker 1: Container (Far Left) */}
                  <div style={{ position: 'absolute', left: '14px', top: '114px', zIndex: 20 }}>
                    <span className="anatomy-marker">1</span>
                  </div>

                  {/* Marker 2: Leading Icon (Top Left) */}
                  <div style={{ position: 'absolute', left: '69px', top: '12px', zIndex: 20 }}>
                    <span className="anatomy-marker">2</span>
                  </div>

                  {/* Marker 3: Content Body (Top Middle) */}
                  <div style={{ position: 'absolute', left: '189px', top: '12px', zIndex: 20 }}>
                    <span className="anatomy-marker">3</span>
                  </div>

                  {/* Marker 4: Action Buttons (Bottom Left) */}
                  <div style={{ position: 'absolute', left: '137px', top: '224px', zIndex: 20 }}>
                    <span className="anatomy-marker">4</span>
                  </div>

                  {/* Marker 5: Dismiss Button (Far Right) */}
                  <div style={{ position: 'absolute', left: '542px', top: '66px', zIndex: 20 }}>
                    <span className="anatomy-marker">5</span>
                  </div>
                </div>
              </div>

              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={gl.anatomyContainerLabel} desc={gl.anatomyContainerDesc} />
                <AnatomyLabel number={2} label={gl.anatomyIconLabel} desc={gl.anatomyIconDesc} />
                <AnatomyLabel number={3} label={gl.anatomyBodyLabel} desc={gl.anatomyBodyDesc} />
                <AnatomyLabel number={4} label={gl.anatomyActionsLabel} desc={gl.anatomyActionsDesc} />
                <AnatomyLabel number={5} label={gl.anatomyCloseLabel} desc={gl.anatomyCloseDesc} />
              </div>
            </div>
          </div>

          {/* ── 3. When to Use ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.whenToUseTitle}</h2>
            <p className="section-description">{gl.whenToUseDesc}</p>

            <div className="usage-table">
              <div className="usage-row usage-row--header">
                <span>Component</span>
                <span>When to Use</span>
              </div>
              {[
                {
                  preview: <NeuronAlert variant="info" size="sm" title={gl.whenInfoTitle} />,
                  desc: gl.whenInfoDesc,
                },
                {
                  preview: <NeuronAlert variant="success" size="sm" title={gl.whenSuccessTitle} />,
                  desc: gl.whenSuccessDesc,
                },
                {
                  preview: <NeuronAlert variant="warning" size="sm" title={gl.whenWarningTitle} />,
                  desc: gl.whenWarningDesc,
                },
                {
                  preview: <NeuronAlert variant="danger" size="sm" title={gl.whenDangerTitle} />,
                  desc: gl.whenDangerDesc,
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
            <h2 className="section-title">{gl.dodontTitle}</h2>
            <p className="section-description">{gl.dodontDesc}</p>

            {/* Pair 1 */}
            <div className="rule-pair">
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronAlert variant="danger" size="sm" title="Payment failed" description="Your card was declined." />
                </div>
                <p><strong>{gl.do1Title}</strong>: {gl.do1Desc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <NeuronAlert variant="info" size="sm" title="Payment failed" description="Your card was declined." />
                </div>
                <p><strong>{gl.dont1Title}</strong>: {gl.dont1Desc}</p>
              </RuleCard>
            </div>

            {/* Pair 2 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronAlert variant="warning" size="sm" title="Unsaved changes" description="Save before leaving this page." />
                </div>
                <p><strong>{gl.do2Title}</strong>: {gl.do2Desc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <NeuronAlert variant="warning" size="sm" title="Please be advised" description="This is a very long paragraph that explains all the details of the situation at length, including every possible nuance and edge case that the team has encountered..." />
                </div>
                <p><strong>{gl.dont2Title}</strong>: {gl.dont2Desc}</p>
              </RuleCard>
            </div>

            {/* Pair 3 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronAlert
                    variant="danger"
                    size="sm"
                    title="Subscription expired"
                    description="Renew to keep access."
                    actions={[{ label: 'Renew Now', onClick: () => {} }]}
                  />
                </div>
                <p><strong>{gl.do3Title}</strong>: {gl.do3Desc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  {/* Only a red box with no text - color-only pattern */}
                  <div style={{ height: '36px', borderRadius: '6px', background: 'var(--red-100)', border: '1px solid var(--red-200)' }} />
                </div>
                <p><strong>{gl.dont3Title}</strong>: {gl.dont3Desc}</p>
              </RuleCard>
            </div>
          </div>

          {/* ── 5. Size Guidelines ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.sizeTitle}</h2>
            <p className="section-description">{gl.sizeDesc}</p>
            <div className="size-guide-list">
              <SizeGuideRow size="sm" label={t.alert.small} usage={gl.sizeSmUsage} variant="info" />
              <SizeGuideRow size="md" label={t.alert.medium} usage={gl.sizeMdUsage} variant="success" />
              <SizeGuideRow size="lg" label={t.alert.large} usage={gl.sizeLgUsage} variant="warning" />
            </div>
          </div>

          {/* ── 6. Fill Styles ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.fillTitle}</h2>
            <p className="section-description">{gl.fillDesc}</p>
            <div className="size-guide-list">
              {FILLS.map(fill => (
                <div key={fill} className="size-guide-row">
                  <div className="size-guide-preview" style={{ minWidth: '280px' }}>
                    <NeuronAlert variant="info" fill={fill} title={fillLabel[fill]} description={
                      fill === 'subtle' ? gl.fillSubtleUsage :
                      fill === 'solid' ? gl.fillSolidUsage :
                      gl.fillOutlinedUsage
                    } />
                  </div>
                  <div className="size-guide-info">
                    <div className="size-guide-name" style={{ textTransform: 'capitalize' }}>{fillLabel[fill]}</div>
                    <div className="size-guide-usage">
                      {fill === 'subtle' ? gl.fillSubtleUsage : fill === 'solid' ? gl.fillSolidUsage : gl.fillOutlinedUsage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 7. Accessibility ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.a11yTitle}</h2>
            <p className="section-description">{gl.a11yDesc}</p>
            <div className="a11y-list">
              <div className="a11y-item">
                <div className="a11y-icon"><Bell size={16} /></div>
                <div>
                  <div className="a11y-title">{gl.a11yRoleTitle}</div>
                  <div className="a11y-desc">{gl.a11yRoleDesc}</div>
                </div>
              </div>
              <div className="a11y-item">
                <div className="a11y-icon"><Check size={16} /></div>
                <div>
                  <div className="a11y-title">{gl.a11yKeyboardTitle}</div>
                  <div className="a11y-desc">{gl.a11yKeyboardDesc}</div>
                </div>
              </div>
              <div className="a11y-item">
                <div className="a11y-icon"><ShieldCheck size={16} /></div>
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

          {/* ── 1. VARIANTS ── */}
          <div className="section-card">
            <h2 className="section-title">Variants</h2>
            <p className="section-description">Four semantic severity levels to match the nature of the system message.</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {VARIANTS.map(v => (
                <div key={v} className="showcase-item" style={{ alignItems: 'flex-start', gridColumn: '1 / -1' }}>
                  <NeuronAlert variant={v} title={variantLabel[v]} description={variantDesc[v]} />
                  <span className="showcase-label" style={{ textTransform: 'capitalize' }}>{variantLabel[v]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2. SIZES ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.sizes}</h2>
            <p className="section-description">Available in 3 standard heights: sm (Small), md (Medium · default), and lg (Large).</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              {SIZES.map(sz => (
                <div key={sz} className="showcase-item" style={{ alignItems: 'flex-start', gridColumn: '1 / -1' }}>
                  <NeuronAlert
                    variant="info"
                    size={sz}
                    title={`${sz === 'sm' ? t.alert.small : sz === 'md' ? t.alert.medium : t.alert.large}`}
                    description={`Demonstration of the ${sz.toUpperCase()} size scale with calibrated typography and internal spacing.`}
                  />
                  <span className="showcase-label">{sz === 'sm' ? t.alert.small : sz === 'md' ? t.alert.medium : t.alert.large}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. FILL STYLES ── */}
          <div className="section-card">
            <h2 className="section-title">Fill Styles</h2>
            <p className="section-description">Three visual treatments — subtle, solid, and outlined — across all four severity variants.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {FILLS.map(fill => (
                <div key={fill}>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)', textTransform: 'capitalize' }}>
                    {fillLabel[fill]}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {VARIANTS.map(v => (
                      <NeuronAlert key={v} variant={v} fill={fill} title={variantLabel[v]} description={variantDesc[v]} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. DISMISSIBLE ── */}
          <div className="section-card">
            <h2 className="section-title">Dismissible</h2>
            <p className="section-description">Alerts with dismissible=true render a close button and animate out smoothly when dismissed.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {VARIANTS.map(v => (
                <NeuronAlert
                  key={v}
                  variant={v}
                  title={`${variantLabel[v]} — Dismissible`}
                  description={variantDesc[v]}
                  dismissible
                  onDismiss={() => {}}
                />
              ))}
            </div>
          </div>

          {/* ── 5. WITH ACTIONS ── */}
          <div className="section-card">
            <h2 className="section-title">With Actions</h2>
            <p className="section-description">Use the actions prop to add primary and ghost CTA buttons for actionable alerts.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <NeuronAlert
                variant="info"
                title="Neudela v2.0 is available"
                description="A new version of the design system is available. Update to access new components and improvements."
                actions={[
                  { label: 'See Changelog', onClick: () => {} },
                  { label: 'Remind me later', onClick: () => {}, ghost: true },
                ]}
              />
              <NeuronAlert
                variant="warning"
                title="Subscription ending soon"
                description="Your Pro plan expires in 7 days. Renew now to avoid service interruption."
                actions={[
                  { label: 'Renew Plan', onClick: () => {} },
                  { label: 'Dismiss', onClick: () => {}, ghost: true },
                ]}
                dismissible
                onDismiss={() => {}}
              />
              <NeuronAlert
                variant="danger"
                fill="solid"
                title="Account suspended"
                description="Your account has been suspended due to multiple failed payment attempts."
                actions={[
                  { label: 'Update Billing', onClick: () => {} },
                  { label: 'Contact Support', onClick: () => {}, ghost: true },
                ]}
              />
              <NeuronAlert
                variant="success"
                title="Profile updated"
                description="Your changes have been saved and are now live."
                dismissible
                onDismiss={() => {}}
                actions={[{ label: 'View Profile', onClick: () => {} }]}
              />
            </div>
          </div>

          {/* ── 6. ICON OVERRIDE ── */}
          <div className="section-card">
            <h2 className="section-title">Custom & Hidden Icons</h2>
            <p className="section-description">Pass a custom ReactNode to override the default icon, or pass icon=null to hide it entirely.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <NeuronAlert
                variant="info"
                title="Custom Icon"
                description="This alert uses a custom bell icon instead of the default info circle."
                icon={<Bell size={18} />}
              />
              <NeuronAlert
                variant="success"
                title="No Icon"
                description="This alert has icon=null, hiding the leading icon entirely for a text-only layout."
                icon={null}
              />
            </div>
          </div>

          {/* ── 7. INTERACTIVE PLAYGROUND ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.playground}</h2>
            <Playground
              name="NeuronAlert"
              knobs={[
                { name: 'variant', type: 'select', options: ['info', 'success', 'warning', 'danger'], default: 'info', label: 'Variant' },
                { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md', label: t.alert.knobSize },
                { name: 'fill', type: 'select', options: ['subtle', 'solid', 'outlined'], default: 'subtle', label: t.alert.knobFill },
                { name: 'title', type: 'text', default: t.alert.knobTitle },
                { name: 'description', type: 'text', default: t.alert.knobDescription },
                { name: 'dismissible', type: 'boolean', default: false, label: t.alert.knobCloseable },
                { name: 'hasActions', type: 'boolean', default: false, label: t.alert.knobHasActions },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.variant !== 'info') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }
                if (knobs.fill !== 'subtle') {
                  reactProps.push(`fill="${knobs.fill}"`);
                  vueProps.push(`fill="${knobs.fill}"`);
                }
                if (knobs.title) {
                  reactProps.push(`title="${knobs.title}"`);
                  vueProps.push(`title="${knobs.title}"`);
                }
                if (knobs.description) {
                  reactProps.push(`description="${knobs.description}"`);
                  vueProps.push(`description="${knobs.description}"`);
                }
                if (knobs.dismissible) {
                  reactProps.push('dismissible');
                  reactProps.push('onDismiss={() => {}}');
                  vueProps.push('dismissible');
                  vueProps.push('@dismiss="handleDismiss"');
                }
                if (knobs.hasActions) {
                  reactProps.push('actions={[{ label: "Learn more", onClick: () => {} }, { label: "Dismiss", onClick: () => {}, ghost: true }]}');
                  vueProps.push(':actions="alertActions"');
                }

                const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
                const vueAttr   = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

                return {
                  react: `<NeuronAlert${reactAttr}/>`,
                  vue:   `<NeuronAlert${vueAttr}/>`,
                  html:  `<div class="neuron-alert neuron-alert--${knobs.variant} neuron-alert--${knobs.size} neuron-alert--${knobs.fill}" role="alert">\n  <span class="neuron-alert__icon-wrap"><!-- svg icon --></span>\n  <div class="neuron-alert__body">\n    ${knobs.title ? `<div class="neuron-alert__title">${knobs.title}</div>\n    ` : ''}<div class="neuron-alert__desc">${knobs.description}</div>\n  </div>\n  ${knobs.dismissible ? '<button class="neuron-alert__close" aria-label="Dismiss alert">&#10005;</button>' : ''}\n</div>`,
                };
              }}
            >
              {(knobs) => (
                <div style={{ width: '100%' }}>
                  <NeuronAlert
                    variant={knobs.variant as AlertVariant}
                    size={knobs.size as AlertSize}
                    fill={knobs.fill as AlertFill}
                    title={knobs.title as string}
                    description={knobs.description as string}
                    dismissible={knobs.dismissible as boolean}
                    onDismiss={() => {}}
                    actions={knobs.hasActions ? [
                      { label: 'Learn more', onClick: () => {} },
                      { label: 'Dismiss', onClick: () => {}, ghost: true },
                    ] : undefined}
                  />
                </div>
              )}
            </Playground>
          </div>

          {/* ── 8. API REFERENCE ── */}
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
                    <td><code>'info' | 'success' | 'warning' | 'danger'</code></td>
                    <td><code>'info'</code></td>
                    <td>{t.alert.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>{t.alert.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>fill</code></td>
                    <td><code>'subtle' | 'solid' | 'outlined'</code></td>
                    <td><code>'subtle'</code></td>
                    <td>{t.alert.apiFill}</td>
                  </tr>
                  <tr>
                    <td><code>title</code></td>
                    <td><code>string</code></td>
                    <td>—</td>
                    <td>{t.alert.apiTitle}</td>
                  </tr>
                  <tr>
                    <td><code>description</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>{t.alert.apiDescription}</td>
                  </tr>
                  <tr>
                    <td><code>icon</code></td>
                    <td><code>ReactNode | null</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.alert.apiIcon}</td>
                  </tr>
                  <tr>
                    <td><code>dismissible</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.alert.apiDismissible}</td>
                  </tr>
                  <tr>
                    <td><code>onDismiss</code></td>
                    <td><code>() =&gt; void</code></td>
                    <td>—</td>
                    <td>{t.alert.apiOnDismiss}</td>
                  </tr>
                  <tr>
                    <td><code>actions</code></td>
                    <td><code>AlertAction[]</code></td>
                    <td>—</td>
                    <td>{t.alert.apiActions}</td>
                  </tr>
                  <tr>
                    <td><code>onClose</code></td>
                    <td><code>() =&gt; void</code></td>
                    <td>—</td>
                    <td><em>{t.alert.apiOnClose}</em></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      <NextPrevious
        prev={{ id: 'components-overview', label: t.nav.componentsOverview }}
        next={{ id: 'comp-avatar', label: t.nav.compAvatar }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
