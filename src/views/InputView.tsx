import React, { useState } from 'react';
import NeuronInput from '../components/NeuronInput';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface InputViewProps {
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

// Reusable SVG icons for demos
const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const LockIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

export default function InputView({ setActiveTab }: InputViewProps) {
  const { t } = useLanguage();
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');
  const gl = t.input.guideline;

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">Components</span>
            <h1 className="page-title">{t.input.pageTitle}</h1>
            <p className="page-subtitle">{t.input.pageSubtitle}</p>
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
                  <div style={{ width: '100%', maxWidth: '320px' }}>
                    <NeuronInput
                      label="Email Address"
                      placeholder="email@company.com"
                      leadingIcon={<MailIcon />}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <p className="guideline-overview-caption">{gl.overviewCaption1}</p>
              </div>
              <div className="guideline-overview-item">
                <div className="guideline-overview-preview">
                  <div style={{ width: '100%', maxWidth: '320px' }}>
                    <NeuronInput
                      label="Password"
                      placeholder="Min 8 characters"
                      hintText="Must contain letters and numbers."
                      type="password"
                      leadingIcon={<LockIcon />}
                      trailingIcon={<EyeIcon />}
                      onChange={() => {}}
                    />
                  </div>
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
              <div className="anatomy-preview" style={{ flexDirection: 'column', gap: 'var(--space-8)', alignItems: 'center' }}>
                {/* Anatomy Showcase Item 1: Label (1), Container (2), Addon (5), Caption (6) */}
                <div className="anatomy-input-card">
                  {/* Label Row */}
                  <div className="anatomy-input-row">
                    <span className="anatomy-marker anatomy-marker--line-right">1</span>
                    <label className="neuron-label" style={{ margin: 0 }}>Website URL <span className="neuron-label__required">*</span></label>
                  </div>

                  {/* Input Container Row */}
                  <div className="anatomy-input-row">
                    <span className="anatomy-marker anatomy-marker--line-right">2</span>
                    <div className="anatomy-input-target">
                      <NeuronInput
                        leadingText="https://"
                        trailingText=".com"
                        placeholder="company"
                        onChange={() => {}}
                      />
                    </div>
                    <span className="anatomy-marker anatomy-marker--line-left">5</span>
                  </div>

                  {/* Caption / Helper Row */}
                  <div className="anatomy-input-row">
                    <span className="anatomy-marker anatomy-marker--line-right">6</span>
                    <span className="neuron-helper-text" style={{ margin: 0 }}>Enter your organization custom subdomain.</span>
                  </div>
                </div>

                {/* Anatomy Showcase Item 2: Leading Icon (4), Value (3), Trailing Icon (4) */}
                <div className="anatomy-input-card">
                  {/* Label Row */}
                  <div className="anatomy-input-row">
                    <span className="anatomy-marker anatomy-marker--line-right">1</span>
                    <label className="neuron-label" style={{ margin: 0 }}>Password</label>
                  </div>

                  {/* Input Container Row */}
                  <div className="anatomy-input-row">
                    <span className="anatomy-marker anatomy-marker--line-right-deep">4</span>
                    <div className="anatomy-input-target">
                      <NeuronInput
                        type="password"
                        value="SecretPassword123"
                        leadingIcon={<LockIcon />}
                        trailingIcon={<EyeIcon />}
                        onChange={() => {}}
                      />
                    </div>
                    <span className="anatomy-marker anatomy-marker--line-left-deep">3</span>
                  </div>
                </div>
              </div>

              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={gl.anatomyLabelMarker} desc={gl.anatomyLabelDesc} />
                <AnatomyLabel number={2} label={gl.anatomyContainerMarker} desc={gl.anatomyContainerDesc} />
                <AnatomyLabel number={3} label={gl.anatomyPlaceholderMarker} desc={gl.anatomyPlaceholderDesc} />
                <AnatomyLabel number={4} label={gl.anatomyIconMarker} desc={gl.anatomyIconDesc} />
                <AnatomyLabel number={5} label={gl.anatomyAddonMarker} desc={gl.anatomyAddonDesc} />
                <AnatomyLabel number={6} label={gl.anatomyHelperMarker} desc={gl.anatomyHelperDesc} />
              </div>
            </div>
          </div>

          {/* ── When to Use ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.whenToUseTitle}</h2>
            <p className="section-description">{gl.whenToUseDesc}</p>
            <div className="usage-table">
              <div className="usage-row usage-row--header">
                <span>{gl.whenToUseColType}</span>
                <span>{gl.whenToUseColDesc}</span>
              </div>
              <div className="usage-row">
                <div className="usage-preview">
                  <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-success)' }}>✓ {gl.whenUse1Title}</span>
                </div>
                <p className="usage-desc">{gl.whenUse1Desc}</p>
              </div>
              <div className="usage-row">
                <div className="usage-preview">
                  <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-success)' }}>✓ {gl.whenUse2Title}</span>
                </div>
                <p className="usage-desc">{gl.whenUse2Desc}</p>
              </div>
              <div className="usage-row">
                <div className="usage-preview">
                  <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-danger)' }}>✕ {gl.whenNotUse1Title}</span>
                </div>
                <p className="usage-desc">{gl.whenNotUse1Desc}</p>
              </div>
              <div className="usage-row">
                <div className="usage-preview">
                  <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-danger)' }}>✕ {gl.whenNotUse2Title}</span>
                </div>
                <p className="usage-desc">{gl.whenNotUse2Desc}</p>
              </div>
            </div>
          </div>

          {/* ── Do's and Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.dodontTitle}</h2>
            <p className="section-description">{gl.dodontDesc}</p>

            {/* Pair 1: Always use a label */}
            <div className="rule-pair">
              <RuleCard type="do">
                <div className="rule-preview">
                  <div style={{ width: '100%', maxWidth: '280px' }}>
                    <NeuronInput
                      label="Full Name"
                      placeholder="e.g. Jane Doe"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <p><strong>{gl.doLabelTitle}:</strong> {gl.doLabelDesc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <div style={{ width: '100%', maxWidth: '280px' }}>
                    <NeuronInput
                      placeholder="Full Name (no label above)"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <p><strong>{gl.dontLabelTitle}:</strong> {gl.dontLabelDesc}</p>
              </RuleCard>
            </div>

            {/* Pair 2: Uniform Field Sizes */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '280px' }}>
                    <NeuronInput label="First Name" placeholder="Jane" onChange={() => {}} />
                    <NeuronInput label="Last Name" placeholder="Doe" onChange={() => {}} />
                  </div>
                </div>
                <p><strong>{gl.doConsistentTitle}:</strong> {gl.doConsistentDesc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '280px' }}>
                    <NeuronInput label="First Name" placeholder="Jane" onChange={() => {}} />
                    <input style={{ padding: '2px', border: '1px solid #ccc', borderRadius: '2px', fontSize: '11px' }} placeholder="Mismatched small input" readOnly />
                  </div>
                </div>
                <p><strong>{gl.dontConsistentTitle}:</strong> {gl.dontConsistentDesc}</p>
              </RuleCard>
            </div>

            {/* Pair 3: Error state with helper */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="rule-preview">
                  <div style={{ width: '100%', maxWidth: '280px' }}>
                    <NeuronInput
                      label="Email"
                      value="invalid-email"
                      destructive
                      helperText="Please include an '@' in the email address."
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <p><strong>{gl.doErrorHelperTitle}:</strong> {gl.doErrorHelperDesc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <div className="rule-preview">
                  <div style={{ width: '100%', maxWidth: '280px' }}>
                    <NeuronInput
                      label="Email"
                      value="invalid-email"
                      destructive
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <p><strong>{gl.dontErrorHelperTitle}:</strong> {gl.dontErrorHelperDesc}</p>
              </RuleCard>
            </div>
          </div>

          {/* ── Content & Best Practices ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.contentTitle}</h2>
            <p className="section-description">{gl.contentDesc}</p>
            <div className="a11y-list">
              <div className="a11y-item">
                <div className="a11y-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="a11y-title">{gl.bestPractice1Title}</div>
                  <div className="a11y-desc">{gl.bestPractice1Desc}</div>
                </div>
              </div>
              <div className="a11y-item">
                <div className="a11y-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="a11y-title">{gl.bestPractice2Title}</div>
                  <div className="a11y-desc">{gl.bestPractice2Desc}</div>
                </div>
              </div>
              <div className="a11y-item">
                <div className="a11y-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="a11y-title">{gl.bestPractice3Title}</div>
                  <div className="a11y-desc">{gl.bestPractice3Desc}</div>
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

          {/* ── INPUT TYPES ── */}
          <div className="section-card">
            <h2 className="section-title">Input Types</h2>
            <p className="section-description">All available input field configurations based on the design system specification.</p>

            {/* Row 1: Basic */}
            <div className="component-showcase-grid component-showcase-grid--wide" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  placeholder="Enter text..."
                  onChange={() => {}}
                />
                <span className="showcase-label">Basic</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  placeholder="Enter text..."
                  value="Filled value"
                  onChange={() => {}}
                />
                <span className="showcase-label">Filled</span>
              </div>
            </div>

            {/* Row 2: With Label */}
            <div className="component-showcase-grid component-showcase-grid--wide" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Email Address"
                  placeholder="email@company.com"
                  onChange={() => {}}
                />
                <span className="showcase-label">With Label</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Email Address"
                  placeholder="email@company.com"
                  required
                  onChange={() => {}}
                />
                <span className="showcase-label">Required</span>
              </div>
            </div>

            {/* Row 3: With Leading Text (URL / Prefix Addon) */}
            <div className="component-showcase-grid component-showcase-grid--wide" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  leadingText="http://"
                  placeholder="www.neuronworks.com"
                  onChange={() => {}}
                />
                <span className="showcase-label">Leading Text (Placeholder)</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  leadingText="http://"
                  value="www.neuronworks.com"
                  onChange={() => {}}
                />
                <span className="showcase-label">Leading Text (Filled)</span>
              </div>
            </div>

            {/* Row 4: With Leading & Trailing Text */}
            <div className="component-showcase-grid component-showcase-grid--wide" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Website"
                  leadingText="https://"
                  trailingText=".com"
                  placeholder="company"
                  onChange={() => {}}
                />
                <span className="showcase-label">Leading + Trailing Text</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Amount"
                  leadingText="USD"
                  placeholder="0.00"
                  trailingText=".00"
                  onChange={() => {}}
                />
                <span className="showcase-label">Currency Prefix & Suffix</span>
              </div>
            </div>

            {/* Row 5: With Leading Icon */}
            <div className="component-showcase-grid component-showcase-grid--wide" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Search"
                  placeholder="Search anything..."
                  leadingIcon={<SearchIcon />}
                  onChange={() => {}}
                />
                <span className="showcase-label">Leading Icon</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Email"
                  placeholder="email@company.com"
                  leadingIcon={<MailIcon />}
                  onChange={() => {}}
                />
                <span className="showcase-label">Leading Icon (Mail)</span>
              </div>
            </div>

            {/* Row 6: With Trailing Icon */}
            <div className="component-showcase-grid component-showcase-grid--wide" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  leadingIcon={<LockIcon />}
                  trailingIcon={<EyeIcon />}
                  onChange={() => {}}
                />
                <span className="showcase-label">Leading + Trailing Icon</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Username"
                  placeholder="Enter username"
                  leadingIcon={<UserIcon />}
                  onChange={() => {}}
                />
                <span className="showcase-label">Leading Icon (User)</span>
              </div>
            </div>

            {/* Row 7: With Hint Text */}
            <div className="component-showcase-grid component-showcase-grid--wide" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Email Address"
                  placeholder="email@company.com"
                  hintText="We will never share your email."
                  leadingIcon={<MailIcon />}
                  onChange={() => {}}
                />
                <span className="showcase-label">With Hint Text</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Password"
                  placeholder="Min 8 characters"
                  hintText="Use letters, numbers, and symbols."
                  leadingIcon={<LockIcon />}
                  type="password"
                  onChange={() => {}}
                />
                <span className="showcase-label">Hint Text (Password)</span>
              </div>
            </div>

            {/* Row 8: With Help Icon */}
            <div className="component-showcase-grid component-showcase-grid--wide" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="API Key"
                  placeholder="sk-xxxx-xxxx-xxxx"
                  helpIcon
                  helpTooltip="Find your API key in Settings > Developer"
                  onChange={() => {}}
                />
                <span className="showcase-label">With Help Icon</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Webhook URL"
                  placeholder="example.com/webhook"
                  leadingText="https://"
                  helpIcon
                  helpTooltip="The endpoint where we'll send event notifications."
                  hintText="Must be a valid HTTPS URL."
                  onChange={() => {}}
                />
                <span className="showcase-label">Leading Text + Help Icon + Hint</span>
              </div>
            </div>

            {/* Row 9: Destructive */}
            <div className="component-showcase-grid component-showcase-grid--wide">
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Email Address"
                  placeholder="email@company.com"
                  value="invalid-email"
                  destructive
                  helperText="Please enter a valid email address."
                  leadingIcon={<MailIcon />}
                  onChange={() => {}}
                />
                <span className="showcase-label">Destructive</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Website"
                  leadingText="http://"
                  value="invalid url format"
                  destructive
                  helperText="URL contains invalid characters."
                  onChange={() => {}}
                />
                <span className="showcase-label">Destructive (Leading Text)</span>
              </div>
            </div>
          </div>

          {/* ── STATES ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.states}</h2>
            <p className="section-description">{t.input.statesDesc}</p>
            <div className="component-showcase-grid component-showcase-grid--wide">
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Default"
                  leadingText="http://"
                  placeholder="www.neuronworks.com"
                  onChange={() => {}}
                />
                <span className="showcase-label">Default (Leading Text)</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Filled"
                  leadingText="http://"
                  value="www.neuronworks.com"
                  onChange={() => {}}
                />
                <span className="showcase-label">Filled (Leading Text)</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Disabled"
                  leadingText="http://"
                  value="www.neuronworks.com"
                  disabled
                  onChange={() => {}}
                />
                <span className="showcase-label">{t.input.disabled}</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Read Only"
                  leadingText="http://"
                  value="www.neuronworks.com"
                  readOnly
                  onChange={() => {}}
                />
                <span className="showcase-label">Read Only</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Success"
                  leadingText="http://"
                  value="www.neuronworks.com"
                  state="success"
                  helperText="Domain is available."
                  onChange={() => {}}
                />
                <span className="showcase-label">{t.input.success}</span>
              </div>
              <div className="showcase-item showcase-item--wide">
                <NeuronInput
                  label="Error"
                  leadingText="http://"
                  value="invalid-domain"
                  state="error"
                  helperText="Domain format is invalid."
                  onChange={() => {}}
                />
                <span className="showcase-label">{t.input.error}</span>
              </div>
            </div>
          </div>

          {/* ── INTERACTIVE PLAYGROUND ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.playground}</h2>
            <Playground
              name="NeuronInput"
              knobs={[
                {
                  name: 'type',
                  type: 'select',
                  options: ['Default', 'Leading text', 'Trailing text', 'Leading & Trailing text'],
                  default: 'Leading text',
                  label: 'Type',
                },
                {
                  name: 'leadingIcon',
                  type: 'boolean',
                  default: false,
                  label: 'Leading icon',
                },
                {
                  name: 'label',
                  type: 'boolean',
                  default: true,
                  label: 'Label',
                },
                {
                  name: 'hintText',
                  type: 'boolean',
                  default: false,
                  label: 'Hint text',
                },
                {
                  name: 'helpIcon',
                  type: 'boolean',
                  default: false,
                  label: 'Help icon',
                },
                {
                  name: 'destructive',
                  type: 'boolean',
                  default: false,
                  label: 'Destructive',
                },
                {
                  name: 'state',
                  type: 'select',
                  options: ['Placeholder', 'Filled', 'Disabled', 'Read only', 'Success', 'Error'],
                  default: 'Placeholder',
                  label: 'State',
                },
              ]}
              codeTemplates={(knobs) => {
                const hasLeadingText = knobs.type === 'Leading text' || knobs.type === 'Leading & Trailing text';
                const hasTrailingText = knobs.type === 'Trailing text' || knobs.type === 'Leading & Trailing text';
                const leadingTextVal = hasLeadingText ? 'http://' : undefined;
                const trailingTextVal = hasTrailingText ? '.com' : undefined;
                const hasLabel = Boolean(knobs.label);
                const labelVal = hasLabel ? 'Website URL' : undefined;
                const hasHint = Boolean(knobs.hintText);
                const hintVal = hasHint ? 'This is a hint text.' : undefined;
                const hasLeadingIcon = Boolean(knobs.leadingIcon);
                const hasHelpIcon = Boolean(knobs.helpIcon);
                const isDestructive = Boolean(knobs.destructive);
                const inputState = knobs.state === 'Success' ? 'success' : (knobs.state === 'Error' ? 'error' : 'default');
                const isDisabled = knobs.state === 'Disabled';
                const isReadOnly = knobs.state === 'Read only';
                const isFilled = knobs.state !== 'Placeholder';

                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (labelVal) {
                  reactProps.push(`label="${labelVal}"`);
                  vueProps.push(`label="${labelVal}"`);
                }
                if (leadingTextVal) {
                  reactProps.push(`leadingText="${leadingTextVal}"`);
                  vueProps.push(`leading-text="${leadingTextVal}"`);
                }
                if (trailingTextVal) {
                  reactProps.push(`trailingText="${trailingTextVal}"`);
                  vueProps.push(`trailing-text="${trailingTextVal}"`);
                }
                if (!isFilled) {
                  reactProps.push('placeholder="www.neuronworks.com"');
                  vueProps.push('placeholder="www.neuronworks.com"');
                } else {
                  reactProps.push('value="www.neuronworks.com"');
                  vueProps.push('v-model="inputValue"');
                }
                if (inputState !== 'default') {
                  reactProps.push(`state="${inputState}"`);
                  vueProps.push(`state="${inputState}"`);
                }
                if (hintVal) {
                  reactProps.push(`hintText="${hintVal}"`);
                  vueProps.push(`hint-text="${hintVal}"`);
                }
                if (hasLeadingIcon) {
                  reactProps.push(`leadingIcon={<SearchIcon />}`);
                  vueProps.push(`:leading-icon="SearchIcon"`);
                }
                if (hasHelpIcon) {
                  reactProps.push('helpIcon');
                  vueProps.push('help-icon');
                }
                if (isDestructive) {
                  reactProps.push('destructive');
                  vueProps.push('destructive');
                }
                if (isDisabled) {
                  reactProps.push('disabled');
                  vueProps.push('disabled');
                }
                if (isReadOnly) {
                  reactProps.push('readOnly');
                  vueProps.push('read-only');
                }

                const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
                const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

                let htmlInputClass = 'neuron-input';
                let htmlGroupClass = 'neuron-form-group';
                const hasAddon = Boolean(leadingTextVal || trailingTextVal);
                let htmlWrapperClass = 'neuron-input-wrapper';

                if (hasAddon) {
                  htmlWrapperClass += ' neuron-input-wrapper--has-addon';
                }
                if (isDestructive || inputState === 'error') {
                  htmlInputClass += ' neuron-input--error';
                  htmlGroupClass += ' neuron-form-group--error';
                  if (hasAddon) htmlWrapperClass += ' neuron-input-wrapper--error';
                } else if (inputState === 'success') {
                  htmlInputClass += ' neuron-input--success';
                  htmlGroupClass += ' neuron-form-group--success';
                  if (hasAddon) htmlWrapperClass += ' neuron-input-wrapper--success';
                }
                if (hasLeadingIcon) htmlInputClass += ' neuron-input--has-leading';

                return {
                  react: `<NeuronInput${reactAttr}/>`,
                  vue: `<NeuronInput${vueAttr}/>`,
                  html: `<div class="${htmlGroupClass}">\n  ${labelVal ? `<label class="neuron-label">${labelVal}</label>\n  ` : ''}<div class="${htmlWrapperClass}">\n    ${leadingTextVal ? `<span class="neuron-input-addon neuron-input-addon--leading">${leadingTextVal}</span>\n    ` : ''}<div class="neuron-input-inner">\n      ${hasLeadingIcon ? '<span class="neuron-input-icon neuron-input-icon--leading"><!-- svg --></span>\n      ' : ''}<input\n        type="text"\n        class="${htmlInputClass}"\n        ${isFilled ? 'value="www.neuronworks.com"' : 'placeholder="www.neuronworks.com"'}${isDisabled ? ' disabled' : ''}${isReadOnly ? ' readonly' : ''}\n      />\n    </div>\n    ${trailingTextVal ? `<span class="neuron-input-addon neuron-input-addon--trailing">${trailingTextVal}</span>\n    ` : ''}</div>\n  ${hintVal ? `<span class="neuron-helper-text">${hintVal}</span>\n` : ''}</div>`,
                };
              }}
            >
              {(knobs) => {
                const hasLeadingText = knobs.type === 'Leading text' || knobs.type === 'Leading & Trailing text';
                const hasTrailingText = knobs.type === 'Trailing text' || knobs.type === 'Leading & Trailing text';
                const leadingTextVal = hasLeadingText ? 'http://' : undefined;
                const trailingTextVal = hasTrailingText ? '.com' : undefined;
                const hasLabel = Boolean(knobs.label);
                const labelVal = hasLabel ? 'Website URL' : undefined;
                const hasHint = Boolean(knobs.hintText);
                const hintVal = hasHint ? 'This is a hint text.' : undefined;
                const hasLeadingIcon = Boolean(knobs.leadingIcon);
                const hasHelpIcon = Boolean(knobs.helpIcon);
                const isDestructive = Boolean(knobs.destructive);
                const inputState = knobs.state === 'Success' ? 'success' : (knobs.state === 'Error' ? 'error' : 'default');
                const isDisabled = knobs.state === 'Disabled';
                const isReadOnly = knobs.state === 'Read only';
                const isFilled = knobs.state !== 'Placeholder';

                return (
                  <div style={{ width: '100%', maxWidth: '380px' }}>
                    <NeuronInput
                      label={labelVal}
                      placeholder={!isFilled ? 'www.neuronworks.com' : undefined}
                      value={isFilled ? 'www.neuronworks.com' : undefined}
                      leadingText={leadingTextVal}
                      trailingText={trailingTextVal}
                      state={inputState}
                      hintText={hintVal}
                      leadingIcon={hasLeadingIcon ? <SearchIcon /> : undefined}
                      helpIcon={hasHelpIcon}
                      destructive={isDestructive}
                      disabled={isDisabled}
                      readOnly={isReadOnly}
                      onChange={() => {}}
                    />
                  </div>
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
                    <td><code>label</code></td>
                    <td><code>string</code></td>
                    <td>—</td>
                    <td>{t.input.apiLabel}</td>
                  </tr>
                  <tr>
                    <td><code>placeholder</code></td>
                    <td><code>string</code></td>
                    <td>—</td>
                    <td>{t.input.apiPlaceholder}</td>
                  </tr>
                  <tr>
                    <td><code>leadingText</code></td>
                    <td><code>string</code></td>
                    <td>—</td>
                    <td>Text addon/prefix attached to the left of the input (e.g. "http://", "https://", "USD").</td>
                  </tr>
                  <tr>
                    <td><code>trailingText</code></td>
                    <td><code>string</code></td>
                    <td>—</td>
                    <td>Text addon/suffix attached to the right of the input (e.g. ".com", ".00").</td>
                  </tr>
                  <tr>
                    <td><code>state</code></td>
                    <td><code>'default' | 'success' | 'error'</code></td>
                    <td><code>'default'</code></td>
                    <td>{t.input.apiState}</td>
                  </tr>
                  <tr>
                    <td><code>helperText</code> / <code>hintText</code></td>
                    <td><code>string</code></td>
                    <td>—</td>
                    <td>{t.input.apiHelperText}</td>
                  </tr>
                  <tr>
                    <td><code>leadingIcon</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>Icon displayed inside the input on the left side.</td>
                  </tr>
                  <tr>
                    <td><code>trailingIcon</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>Icon displayed inside the input on the right side.</td>
                  </tr>
                  <tr>
                    <td><code>helpIcon</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Shows a help (?) icon next to the label with optional tooltip.</td>
                  </tr>
                  <tr>
                    <td><code>helpTooltip</code></td>
                    <td><code>string</code></td>
                    <td>—</td>
                    <td>Tooltip text displayed when hovering over the help icon.</td>
                  </tr>
                  <tr>
                    <td><code>destructive</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Applies destructive (error) styling to the input. Overrides state.</td>
                  </tr>
                  <tr>
                    <td><code>required</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Shows a red asterisk (*) next to the label.</td>
                  </tr>
                  <tr>
                    <td><code>readOnly</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Makes the input read-only with subtle background styling.</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.input.apiDisabled}</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(e) =&gt; void</code></td>
                    <td>—</td>
                    <td>{t.input.apiOnChange}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      <NextPrevious
        prev={{ id: 'comp-dropdown', label: t.nav.compDropdown || 'Dropdown' }}
        next={{ id: 'comp-modal', label: t.nav.compModal }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
