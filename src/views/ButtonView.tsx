import { useState } from 'react';
import NeuronButton from '../components/NeuronButton';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface ButtonViewProps {
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

// ─────────────────────────────────────────────
// Main view
// ─────────────────────────────────────────────
export default function ButtonView({ setActiveTab }: ButtonViewProps) {
  const { t } = useLanguage();
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');
  const gl = t.button.guideline;

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">Components</span>
            <h1 className="page-title">{t.button.pageTitle}</h1>
            <p className="page-subtitle">{t.button.pageSubtitle}</p>
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

          {/* ── Overview ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.overviewTitle}</h2>
            <p className="section-description">{gl.overviewDesc}</p>
            <div className="guideline-overview-grid">
              <div className="guideline-overview-item">
                <div className="guideline-overview-preview">
                  <NeuronButton>{gl.overviewBtn1}</NeuronButton>
                </div>
                <p className="guideline-overview-caption">{gl.overviewCaption1}</p>
              </div>
              <div className="guideline-overview-item">
                <div className="guideline-overview-preview">
                  <NeuronButton variant="secondary">{gl.overviewBtn2}</NeuronButton>
                </div>
                <p className="guideline-overview-caption">{gl.overviewCaption2}</p>
              </div>
            </div>
          </div>

          {/* ── Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.anatomyTitle}</h2>
            <p className="section-description">{gl.anatomyDesc}</p>
            <div className="anatomy-diagram">
              <div className="anatomy-preview" style={{ flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
                <div className="anatomy-btn-wrapper">
                  <div className="anatomy-marker anatomy-marker--1">1</div>
                  <NeuronButton>
                    {gl.anatomySave}
                  </NeuronButton>
                  <div className="anatomy-marker anatomy-marker--2">2</div>
                </div>
                <div className="anatomy-btn-wrapper">
                  <div className="anatomy-marker anatomy-marker--3">3</div>
                  <NeuronButton leadingIcon={
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  }>
                    {gl.anatomyUpload}
                  </NeuronButton>
                </div>
                <div className="anatomy-btn-wrapper">
                  <NeuronButton trailingIcon={
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  }>
                    {gl.anatomyContinue}
                  </NeuronButton>
                  <div className="anatomy-marker anatomy-marker--4">4</div>
                </div>
                <div className="anatomy-btn-wrapper">
                  <div className="anatomy-marker anatomy-marker--1">1</div>
                  <NeuronButton iconOnly aria-label={gl.anatomyDelete} leadingIcon={
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  } />
                </div>
              </div>
              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={gl.anatomyContainerLabel} desc={gl.anatomyContainerDesc} />
                <AnatomyLabel number={2} label={gl.anatomyTextLabel} desc={gl.anatomyTextDesc} />
                <AnatomyLabel number={3} label={gl.anatomyLeadingIconLabel} desc={gl.anatomyLeadingIconDesc} />
                <AnatomyLabel number={4} label={gl.anatomyTrailingIconLabel} desc={gl.anatomyTrailingIconDesc} />
              </div>
            </div>
          </div>

          {/* ── When to use ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.whenToUseTitle}</h2>
            <p className="section-description">{gl.whenToUseDesc}</p>
            <div className="usage-table">
              <div className="usage-row usage-row--header">
                <span>{gl.tableColVariant}</span>
                <span>{gl.tableColWhenToUse}</span>
              </div>
              {[
                { variant: 'primary' as const, label: t.button.primary, color: 'var(--color-primary)', desc: gl.whenPrimaryDesc },
                { variant: 'secondary' as const, label: t.button.secondary, color: 'var(--color-text-secondary)', desc: gl.whenSecondaryDesc },
                { variant: 'outline' as const, label: t.button.outline, color: 'var(--color-primary)', desc: gl.whenOutlineDesc },
                { variant: 'text' as const, label: t.button.text, color: 'var(--color-text-secondary)', desc: gl.whenTextDesc },
              ].map(({ variant, label, desc }) => (
                <div key={variant} className="usage-row">
                  <div className="usage-preview">
                    <NeuronButton variant={variant}>{label}</NeuronButton>
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

            {/* Do/Dont Row 1 */}
            <div className="rule-pair">
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronButton>{gl.do1Btn}</NeuronButton>
                </div>
                <p>{gl.do1Desc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <NeuronButton>{gl.dont1Btn}</NeuronButton>
                </div>
                <p>{gl.dont1Desc}</p>
              </RuleCard>
            </div>

            {/* Do/Dont Row 2 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <NeuronButton>{gl.do2Save}</NeuronButton>
                    <NeuronButton variant="secondary">{gl.do2Cancel}</NeuronButton>
                  </div>
                </div>
                <p>{gl.do2Desc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <NeuronButton>{gl.dont2Save}</NeuronButton>
                    <NeuronButton>{gl.dont2Publish}</NeuronButton>
                    <NeuronButton>{gl.dont2Export}</NeuronButton>
                  </div>
                </div>
                <p>{gl.dont2Desc}</p>
              </RuleCard>
            </div>

            {/* Do/Dont Row 3 */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronButton loading>{gl.do3Saving}</NeuronButton>
                </div>
                <p>{gl.do3Desc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <NeuronButton disabled>{gl.dont3Disabled}</NeuronButton>
                </div>
                <p>{gl.dont3Desc}</p>
              </RuleCard>
            </div>
          </div>

          {/* ── Size Guidelines ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.sizeTitle}</h2>
            <p className="section-description">{gl.sizeDesc}</p>
            <div className="size-guide-list">
              {[
                { size: 'xs' as const, label: `${t.button.extraSmall} (xs)`, height: '32px', usage: gl.sizeXsUsage },
                { size: 'sm' as const, label: `${t.button.small} (sm)`, height: '36px', usage: gl.sizeSmUsage },
                { size: 'md' as const, label: `${t.button.medium} (md)`, height: '40px', usage: gl.sizeMdUsage },
                { size: 'lg' as const, label: `${t.button.large} (lg)`, height: '44px', usage: gl.sizeLgUsage },
                { size: 'xl' as const, label: `${t.button.extraLarge} (xl)`, height: '48px', usage: gl.sizeXlUsage },
              ].map(({ size, label, height, usage }) => (
                <div key={size} className="size-guide-row">
                  <div className="size-guide-preview">
                    <NeuronButton size={size}>{t.button.pageTitle}</NeuronButton>
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
                  <div className="a11y-title">{gl.a11yAriaTitle}</div>
                  <div className="a11y-desc">{gl.a11yAriaDesc}</div>
                </div>
              </div>
              <div className="a11y-item">
                <div className="a11y-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="a11y-title">{gl.a11yContrastTitle}</div>
                  <div className="a11y-desc">{gl.a11yContrastDesc}</div>
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

          {/* ── Icon Usage ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.iconUsageTitle}</h2>
            <p className="section-description">{gl.iconUsageDesc}</p>
            <div className="icon-usage-grid">
              <div className="icon-usage-item">
                <div className="icon-usage-preview">
                  <NeuronButton
                    leadingIcon={
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    }
                  >{gl.overviewBtn1}</NeuronButton>
                </div>
                <div className="icon-usage-label">{gl.iconLeadingTitle}</div>
                <div className="icon-usage-desc">{gl.iconLeadingDesc}</div>
              </div>
              <div className="icon-usage-item">
                <div className="icon-usage-preview">
                  <NeuronButton
                    trailingIcon={
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    }
                  >{gl.anatomyContinue}</NeuronButton>
                </div>
                <div className="icon-usage-label">{gl.iconTrailingTitle}</div>
                <div className="icon-usage-desc">{gl.iconTrailingDesc}</div>
              </div>
              <div className="icon-usage-item">
                <div className="icon-usage-preview">
                  <NeuronButton
                    iconOnly
                    aria-label={gl.anatomyDelete}
                    variant="outline"
                    leadingIcon={
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    }
                  />
                </div>
                <div className="icon-usage-label">{gl.iconOnlyTitle}</div>
                <div className="icon-usage-desc">{gl.iconOnlyDesc}</div>
              </div>
            </div>
            <div className="rule-pair" style={{ marginTop: 'var(--space-5)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <NeuronButton
                    leadingIcon={
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    }
                  >{gl.doIconBtn}</NeuronButton>
                </div>
                <p>{gl.doIconDesc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <NeuronButton
                    leadingIcon={
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    }
                    trailingIcon={
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    }
                  >{gl.dontIconBtn}</NeuronButton>
                </div>
                <p>{gl.dontIconDesc}</p>
              </RuleCard>
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2 – PLAYBOOK
      ══════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">

          {/* ── VARIANTS ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.variants}</h2>
            <p className="section-description">{t.button.variantsDesc}</p>
            <div className="component-showcase-grid">
              {([
                { variant: 'primary', label: t.button.primary, desc: t.button.primaryDesc },
                { variant: 'secondary', label: t.button.secondary, desc: t.button.secondaryDesc },
                { variant: 'outline', label: t.button.outline, desc: t.button.outlineDesc },
                { variant: 'text', label: t.button.text, desc: t.button.textDesc },
              ] as const).map(({ variant, label, desc }) => (
                <div key={variant} className="showcase-item">
                  <NeuronButton variant={variant}>{label}</NeuronButton>
                  <span className="showcase-label">{label}</span>
                  <span className="showcase-desc">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── SIZES ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.sizes}</h2>
            <p className="section-description">{t.button.sizesDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--align-end">
              {([
                { size: 'xs', label: t.button.extraSmall },
                { size: 'sm', label: t.button.small },
                { size: 'md', label: t.button.medium },
                { size: 'lg', label: t.button.large },
                { size: 'xl', label: t.button.extraLarge },
              ] as const).map(({ size, label }) => (
                <div key={size} className="showcase-item">
                  <NeuronButton size={size}>{label}</NeuronButton>
                  <span className="showcase-label">{label} ({size})</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── ICONS ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.iconUsageTitle}</h2>
            <p className="section-description">{gl.iconUsageDesc}</p>
            <div className="component-showcase-grid">
              <div className="showcase-item">
                <NeuronButton
                  leadingIcon={
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  }
                >{gl.overviewBtn1}</NeuronButton>
                <span className="showcase-label">{gl.iconLeadingTitle}</span>
              </div>
              <div className="showcase-item">
                <NeuronButton
                  trailingIcon={
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  }
                >{gl.anatomyContinue}</NeuronButton>
                <span className="showcase-label">{gl.iconTrailingTitle}</span>
              </div>
              <div className="showcase-item">
                <NeuronButton
                  dot
                >{t.button.primary}</NeuronButton>
                <span className="showcase-label">{t.button.primary} + Dot</span>
              </div>
              <div className="showcase-item">
                <NeuronButton
                  iconOnly
                  aria-label={gl.iconOnlyTitle}
                  leadingIcon={
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                />
                <span className="showcase-label">{gl.iconOnlyTitle}</span>
              </div>
              <div className="showcase-item">
                <NeuronButton
                  variant="secondary"
                  leadingIcon={
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  }
                >{gl.anatomyUpload}</NeuronButton>
                <span className="showcase-label">{t.button.secondary} + {gl.iconLeadingTitle}</span>
              </div>
            </div>
          </div>

          {/* ── STATES ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.states}</h2>
            <p className="section-description">{t.button.statesDesc}</p>
            <div className="component-showcase-grid">
              <div className="showcase-item">
                <NeuronButton>{t.button.defaultState}</NeuronButton>
                <span className="showcase-label">{t.button.defaultState}</span>
              </div>
              <div className="showcase-item">
                <NeuronButton loading>{t.button.loading}</NeuronButton>
                <span className="showcase-label">{t.button.loading}</span>
              </div>
              <div className="showcase-item">
                <NeuronButton disabled>{t.button.disabled}</NeuronButton>
                <span className="showcase-label">{t.button.disabled}</span>
              </div>
            </div>
          </div>

          {/* ── INTERACTIVE PLAYGROUND ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.playground}</h2>
            <Playground
              name="NeuronButton"
              knobs={[
                { name: 'variant', type: 'select', options: ['primary', 'secondary', 'outline', 'text'], default: 'primary' },
                { name: 'size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
                { name: 'icon', type: 'select', options: ['none', 'leading', 'trailing', 'dot', 'only'], default: 'none', label: 'icon' },
                { name: 'loading', type: 'boolean', default: false, label: t.button.loading },
                { name: 'disabled', type: 'boolean', default: false, label: t.button.disabled },
                { name: 'text', type: 'text', default: t.button.knobText },
              ]}
              codeTemplates={(knobs) => {
                const icon = knobs.icon as string;
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.variant !== 'primary') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }
                if (icon === 'leading') { reactProps.push('leadingIcon={<Icon />}'); vueProps.push(':leading-icon="iconComponent"'); }
                if (icon === 'trailing') { reactProps.push('trailingIcon={<Icon />}'); vueProps.push(':trailing-icon="iconComponent"'); }
                if (icon === 'dot') { reactProps.push('dot'); vueProps.push('dot'); }
                if (icon === 'only') { reactProps.push('iconOnly'); reactProps.push('leadingIcon={<Icon />}'); reactProps.push(`aria-label="${knobs.text}"`); vueProps.push('icon-only'); }
                if (knobs.loading) { reactProps.push('loading'); vueProps.push('loading'); }
                if (knobs.disabled) { reactProps.push('disabled'); vueProps.push('disabled'); }

                const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
                const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';
                const htmlDisabled = knobs.disabled || knobs.loading ? ' disabled' : '';
                const htmlClasses = `neuron-btn neuron-btn--${knobs.variant} neuron-btn--${knobs.size}${icon === 'only' ? ' neuron-btn--icon-only' : ''}`;
                const htmlContent = knobs.loading
                  ? '<span class="neuron-spinner"></span>'
                  : icon === 'only'
                    ? '<span class="neuron-btn-icon"><!-- svg icon --></span>'
                    : [
                        icon === 'leading' ? '<span class="neuron-btn-icon neuron-btn-icon--leading"><!-- svg --></span>' : '',
                        icon === 'dot' ? '<span class="neuron-btn-dot"></span>' : '',
                        `  ${knobs.text}`,
                        icon === 'trailing' ? '<span class="neuron-btn-icon neuron-btn-icon--trailing"><!-- svg --></span>' : '',
                      ].filter(Boolean).join('\n  ');

                const reactChild = icon === 'only' ? '' : `\n  ${knobs.text}\n`;

                return {
                  react: icon === 'only'
                    ? `<NeuronButton${reactAttr}/>`
                    : `<NeuronButton${reactAttr}>${reactChild}</NeuronButton>`,
                  vue: icon === 'only'
                    ? `<NeuronButton${vueAttr}/>`
                    : `<NeuronButton${vueAttr}>\n  ${knobs.text}\n</NeuronButton>`,
                  html: `<button\n  class="${htmlClasses}"${htmlDisabled}\n>\n  ${htmlContent}\n</button>`,
                };
              }}
            >
              {(knobs) => {
                const icon = knobs.icon as string;
                const svgLeading = (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                );
                const svgTrailing = (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                );
                return (
                  <NeuronButton
                    variant={knobs.variant as 'primary' | 'secondary' | 'outline' | 'text'}
                    size={knobs.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
                    loading={knobs.loading as boolean}
                    disabled={knobs.disabled as boolean}
                    leadingIcon={icon === 'leading' || icon === 'only' ? svgLeading : undefined}
                    trailingIcon={icon === 'trailing' ? svgTrailing : undefined}
                    dot={icon === 'dot'}
                    iconOnly={icon === 'only'}
                    aria-label={icon === 'only' ? String(knobs.text) : undefined}
                  >
                    {knobs.text}
                  </NeuronButton>
                );
              }}
            </Playground>
          </div>


          {/* ── API REFERENCE ── */}
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
                    <td><code>'primary' | 'secondary' | 'outline' | 'text'</code></td>
                    <td><code>'primary'</code></td>
                    <td>{t.button.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
                    <td><code>'md'</code></td>
                    <td>{t.button.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>loading</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.button.apiLoading}</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.button.apiDisabled}</td>
                  </tr>
                  <tr>
                    <td><code>children</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>{t.button.apiChildren}</td>
                  </tr>
                  <tr>
                    <td><code>onClick</code></td>
                    <td><code>() =&gt; void</code></td>
                    <td>—</td>
                    <td>{t.button.apiOnClick}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      <NextPrevious
        prev={{ id: 'comp-breadcrumb', label: t.nav.compBreadcrumb }}
        next={{ id: 'comp-button-group', label: t.nav.compButtonGroup }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
