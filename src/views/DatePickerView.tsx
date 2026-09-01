import React, { useState } from 'react';
import NeuronDatePicker, {
  DatePickerMode,
  DatePickerSize,
  DatePickerVariant,
  DateRange,
} from '../components/NeuronDatePicker';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck,
  Check,
  Keyboard,
  Filter,
  Plane,
} from 'lucide-react';

interface DatePickerViewProps {
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
// Component View
// ─────────────────────────────────────────────
export default function DatePickerView({ setActiveTab }: DatePickerViewProps) {
  const { t } = useLanguage();
  const [activeViewTab, setViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // Demos state
  const [demoSingleDate, setDemoSingleDate] = useState<Date | null>(new Date(2025, 0, 6));
  const [demoRange, setDemoRange] = useState<DateRange>({
    startDate: new Date(2025, 0, 6),
    endDate: new Date(2025, 0, 13),
  });
  const [demoDoubleRange, setDemoDoubleRange] = useState<DateRange>({
    startDate: new Date(2025, 0, 6),
    endDate: new Date(2025, 0, 13),
  });
  const [demoPopoverDate, setDemoPopoverDate] = useState<Date | null>(new Date(2025, 0, 15));

  return (
    <div className="badge-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">Date Picker</h1>
            <p className="page-subtitle">
              Interactive calendar component allowing users to select a single date, date range, or multi-month periods with preset shortcuts for forms, filters, and scheduling interfaces.
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
              The Date Picker provides an intuitive visual calendar interface for date input. It supports single-date selection, date range selection, multi-month navigation, quick preset shortcuts, and both inline and popover trigger presentations.
            </p>

            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">Date Picker Specification Matrix</div>
                  <div className="badge-spec-subtitle">3 Modes × 3 Sizes × 3 Variants — Inline & Popover Support</div>
                </div>
              </div>

              {/* Master Matrix Table */}
              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th>Mode</th>
                      <th>Use Case</th>
                      <th>Header / Inputs</th>
                      <th>Calendars</th>
                      <th>Presets Sidebar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>'single'</code></td>
                      <td>Appointments, birthdates, due dates, single event day</td>
                      <td>Date input field + quick "Today" button</td>
                      <td>1 Month</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td><code>'range'</code></td>
                      <td>Booking stays, report date intervals, sprint cycles</td>
                      <td>Start Date — End Date inputs</td>
                      <td>1 Month</td>
                      <td>Optional</td>
                    </tr>
                    <tr>
                      <td><code>'double'</code></td>
                      <td>Analytics filters, travel schedules, multi-week periods</td>
                      <td>Start Date — End Date in footer</td>
                      <td>2 Months side-by-side</td>
                      <td>Supported (Today, Yesterday, Last week, etc.)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── 2. Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">Anatomy</h2>
            <p className="section-description">
              The Date Picker consists of a month navigation header, weekday column headers, a 7-column day matrix with range strip highlight connectors, an optional presets sidebar, and action buttons.
            </p>

            {/* Blueprint Schematic with SVG Orthogonal Lines */}
            <div
              style={{
                position: 'relative',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: '48px 32px 36px',
                marginBottom: 'var(--space-6)',
                overflow: 'visible',
              }}
            >
              {/* Central Component Preview */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <NeuronDatePicker
                  mode="double"
                  size="md"
                  rangeValue={{
                    startDate: new Date(2025, 0, 6),
                    endDate: new Date(2025, 0, 13),
                  }}
                  activePreset="last_week"
                  showPresets={true}
                  showActions={true}
                />
              </div>

              {/* SVG Connector Lines */}
              <svg
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
              >
                {/* 1. Presets Sidebar (left: x=190, y=140) */}
                <line x1="80" y1="140" x2="190" y2="140" stroke="#111827" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="190" cy="140" r="3.5" fill="#111827" />

                {/* 2. Month Navigation Header (top left: x=340, y=90) */}
                <line x1="340" y1="36" x2="340" y2="90" stroke="#111827" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="340" cy="90" r="3.5" fill="#111827" />

                {/* 3. Weekday Column Header (x=410, y=126) */}
                <line x1="560" y1="40" x2="410" y2="40" stroke="#111827" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="410" y1="40" x2="410" y2="126" stroke="#111827" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="410" cy="126" r="3.5" fill="#111827" />

                {/* 4. Range Start Endpoint (x=384, y=198) */}
                <line x1="280" y1="340" x2="280" y2="198" stroke="#111827" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="280" y1="198" x2="384" y2="198" stroke="#111827" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="384" cy="198" r="3.5" fill="#111827" />

                {/* 5. Range Connector Strip (x=390, y=228) */}
                <line x1="720" y1="228" x2="400" y2="228" stroke="#111827" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="400" cy="228" r="3.5" fill="#111827" />

                {/* 6. Footer Inputs & Actions (bottom: x=520, y=390) */}
                <line x1="520" y1="440" x2="520" y2="390" stroke="#111827" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="520" cy="390" r="3.5" fill="#111827" />
              </svg>

              {/* Number Badges */}
              <div
                style={{
                  position: 'absolute',
                  left: '60px',
                  top: '128px',
                  zIndex: 10,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                1
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '328px',
                  top: '16px',
                  zIndex: 10,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                2
              </div>

              <div
                style={{
                  position: 'absolute',
                  right: '60px',
                  top: '28px',
                  zIndex: 10,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                3
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '268px',
                  bottom: '24px',
                  zIndex: 10,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                4
              </div>

              <div
                style={{
                  position: 'absolute',
                  right: '80px',
                  top: '216px',
                  zIndex: 10,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                5
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '508px',
                  bottom: '8px',
                  zIndex: 10,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                6
              </div>
            </div>

            {/* Anatomy Description Grid */}
            <div className="anatomy-grid">
              <AnatomyLabel
                number={1}
                label="Presets Shortcut Sidebar"
                desc="Quick selection list (Today, Yesterday, Last week, etc.) to set date ranges in one click."
              />
              <AnatomyLabel
                number={2}
                label="Month Navigation Header"
                desc="Month & year title with previous and next chevron buttons for paging through calendar months."
              />
              <AnatomyLabel
                number={3}
                label="Weekday Header Grid"
                desc="7-column column headers (Mo to Su) establishing the calendar column layout."
              />
              <AnatomyLabel
                number={4}
                label="Selected Date Endpoint"
                desc="High-contrast solid terracotta filled circle with white text marking the start or end date."
              />
              <AnatomyLabel
                number={5}
                label="Range Connector Strip"
                desc="Continuous soft reddish background connecting start and end dates across weeks."
              />
              <AnatomyLabel
                number={6}
                label="Footer Actions & Formatted Inputs"
                desc="Formatted read-only date inputs displaying the selected span alongside Cancel and Apply buttons."
              />
            </div>
          </div>

          {/* ── 3. When to Use & When Not to Use ── */}
          <div className="section-card">
            <h2 className="section-title">When to Use & When Not to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-soft p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-3 text-emerald-600 font-semibold">
                  <Check size={18} />
                  <span>When to Use</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Selecting specific calendar dates or scheduled events (e.g. Booking flights, hotels, webinars).</li>
                  <li>• Filtering analytics, logs, and billing reports across a specific historical range.</li>
                  <li>• Providing predefined shortcuts (Today, Last 7 Days, This Month) for rapid data filtering.</li>
                  <li>• When visual context of days of the week, weekends, and month boundaries is helpful to the user.</li>
                </ul>
              </div>

              <div className="card-soft p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-3 text-red-600 font-semibold">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>When Not to Use</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Entering highly memorable dates like Birth Dates (use structured text input fields with masks instead).</li>
                  <li>• Selecting whole years or decades (use a Year dropdown or segmented slider).</li>
                  <li>• Compact mobile contexts where a full two-month calendar exceeds screen width (use Single Month Range mode).</li>
                  <li>• Simple relative time selections like "In 15 minutes" (use predefined chips or relative selectors).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── 4. Do's and Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">Do's and Don'ts</h2>
            <div className="dos-donts-grid">
              <RuleCard type="do">
                <strong>Always display the selected date range in human-readable format</strong>
                <p>Provide clear read-only inputs showing <code>Jan 6, 2025 — Jan 13, 2025</code> so users can verify their selection without mental calculation.</p>
              </RuleCard>

              <RuleCard type="dont">
                <strong>Don't hide the calendar navigation controls</strong>
                <p>Never lock the user to only the current month unless strictly required by the application workflow.</p>
              </RuleCard>

              <RuleCard type="do">
                <strong>Provide instant hover feedback during range selection</strong>
                <p>Show a tentative range strip between the start date and cursor position so users know what range will be selected upon clicking.</p>
              </RuleCard>

              <RuleCard type="dont">
                <strong>Don't allow selecting disabled or invalid dates</strong>
                <p>Clearly gray out past dates for bookings or future dates for historical logs, and prevent click events on disabled cells.</p>
              </RuleCard>
            </div>
          </div>

          {/* ── 5. Size Guidelines ── */}
          <div className="section-card">
            <h2 className="section-title">Size Guidelines</h2>
            <p className="section-description">
              Choose the appropriate size scale according to interface density and user device context.
            </p>

            <div className="badge-spec-card">
              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Day Cell Size</th>
                      <th>Input Height</th>
                      <th>Calendar Width</th>
                      <th>Recommended Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="badge-spec-tag">Small (sm)</span></td>
                      <td><code>28px × 28px</code></td>
                      <td><code>32px</code></td>
                      <td><code>224px</code></td>
                      <td>Dense data tables, compact filter bars, compact desktop dashboards.</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="badge-spec-tag">Medium (md)</span>
                        <span className="badge-spec-default" style={{ marginLeft: 6 }}>Default</span>
                      </td>
                      <td><code>32px × 32px</code></td>
                      <td><code>36px</code></td>
                      <td><code>252px</code></td>
                      <td>Standard forms, modal dialogs, general application filter dropdowns.</td>
                    </tr>
                    <tr>
                      <td><span className="badge-spec-tag">Large (lg)</span></td>
                      <td><code>38px × 38px</code></td>
                      <td><code>40px</code></td>
                      <td><code>294px</code></td>
                      <td>Touch screens, prominent travel booking portals, mobile full-width modals.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── 6. Accessibility ── */}
          <div className="section-card">
            <h2 className="section-title">Accessibility & Keyboard Interaction</h2>
            <p className="section-description">
              NeuronDatePicker implements WAI-ARIA Datepicker Grid design patterns to ensure full keyboard navigation and screen reader support.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-soft p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-3 text-brand-600 font-semibold">
                  <Keyboard size={18} />
                  <span>Keyboard Shortcuts</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-xs">←</kbd> / <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-xs">→</kbd> — Navigate to previous / next day</li>
                  <li><kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-xs">↑</kbd> / <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-xs">↓</kbd> — Navigate to same day in previous / next week</li>
                  <li><kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-xs">Enter</kbd> / <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-xs">Space</kbd> — Select focused date</li>
                  <li><kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-xs">Escape</kbd> — Dismiss datepicker popover without applying</li>
                </ul>
              </div>

              <div className="card-soft p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-3 text-brand-600 font-semibold">
                  <ShieldCheck size={18} />
                  <span>ARIA Semantics</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <code>role="grid"</code> applied to the days container matrix.</li>
                  <li>• <code>role="columnheader"</code> on weekday header cells (Mo–Su).</li>
                  <li>• <code>aria-selected="true"</code> on chosen dates and in-range dates.</li>
                  <li>• <code>aria-haspopup="dialog"</code> on the popover input trigger.</li>
                </ul>
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
          {/* ── 1. Single Date Picker ── */}
          <div className="section-card">
            <h2 className="section-title">1. Single Date Picker</h2>
            <p className="section-description">
              Compact single-month calendar with quick input field, "Today" jump button, and Cancel/Apply action triggers.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 'var(--space-6)',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <NeuronDatePicker
                mode="single"
                value={demoSingleDate}
                onChange={setDemoSingleDate}
                showTodayButton={true}
                showActions={true}
              />
            </div>
          </div>

          {/* ── 2. Date Range Picker (Single Month) ── */}
          <div className="section-card">
            <h2 className="section-title">2. Date Range Picker (Single Month)</h2>
            <p className="section-description">
              Single-month calendar with range start and end circular endpoints and continuous soft reddish highlight strip connecting the selected days.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 'var(--space-6)',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <NeuronDatePicker
                mode="range"
                rangeValue={demoRange}
                onRangeChange={setDemoRange}
                showActions={true}
              />
            </div>
          </div>

          {/* ── 3. Double Month Range Picker with Presets ── */}
          <div className="section-card">
            <h2 className="section-title">3. Double Month Range Picker with Presets Sidebar</h2>
            <p className="section-description">
              Dual-calendar view with a left-hand preset shortcuts sidebar (Today, Yesterday, Last week, This month, etc.) and footer range inputs with action buttons.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 'var(--space-6)',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                overflowX: 'auto',
              }}
            >
              <NeuronDatePicker
                mode="double"
                rangeValue={demoDoubleRange}
                onRangeChange={setDemoDoubleRange}
                activePreset="last_week"
                showPresets={true}
                showActions={true}
              />
            </div>
          </div>

          {/* ── 4. Popover / Input Trigger ── */}
          <div className="section-card">
            <h2 className="section-title">4. Form Popover Trigger</h2>
            <p className="section-description">
              Interactive form field trigger with calendar icon, clear action, and floating datepicker card.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
                padding: 'var(--space-6)',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ maxWidth: '320px' }}>
                <NeuronDatePicker
                  mode="single"
                  trigger="popover"
                  label="Appointment Date"
                  helperText="Choose an available date for your consultation."
                  value={demoPopoverDate}
                  onChange={setDemoPopoverDate}
                />
              </div>

              <div style={{ maxWidth: '360px' }}>
                <NeuronDatePicker
                  mode="double"
                  trigger="popover"
                  label="Reporting Period"
                  helperText="Select a date span to generate your analytics summary."
                  rangeValue={demoDoubleRange}
                  onRangeChange={setDemoDoubleRange}
                  showPresets={true}
                />
              </div>
            </div>
          </div>

          {/* ── 5. Real-World Patterns ── */}
          <div className="section-card">
            <h2 className="section-title">5. Real-World Patterns</h2>
            <p className="section-description">
              Common application patterns featuring the Neudela Date Picker in realistic UI contexts.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pattern 1: Flight & Hotel Booking */}
              <div className="card-soft p-5 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm">
                  <Plane size={16} />
                  <span>Flight & Hotel Stay Selection</span>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col gap-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Flight Itinerary</div>
                  <div className="flex gap-3">
                    <NeuronDatePicker
                      mode="range"
                      trigger="popover"
                      label="Trip Dates (Roundtrip)"
                      rangeValue={{
                        startDate: new Date(2025, 0, 10),
                        endDate: new Date(2025, 0, 17),
                      }}
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              {/* Pattern 2: Dashboard Analytics Filter */}
              <div className="card-soft p-5 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm">
                  <Filter size={16} />
                  <span>Dashboard Metrics Filter</span>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue Analytics</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-medium">Live</span>
                  </div>
                  <NeuronDatePicker
                    mode="double"
                    trigger="popover"
                    label="Date Range"
                    rangeValue={{
                      startDate: new Date(2025, 0, 1),
                      endDate: new Date(2025, 0, 15),
                    }}
                    showPresets={true}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. Interactive Playground ── */}
          <div className="section-card">
            <h2 className="section-title">6. Interactive Playground</h2>
            <p className="section-description">
              Test different modes, variants, sizes, and configurations live with automatic code generation.
            </p>

            <Playground
              name="NeuronDatePicker"
              knobs={[
                {
                  name: 'mode',
                  type: 'select',
                  options: ['single', 'range', 'double'],
                  default: 'single',
                  label: 'Mode',
                },
                {
                  name: 'size',
                  type: 'select',
                  options: ['sm', 'md', 'lg'],
                  default: 'md',
                  label: 'Size',
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: ['default', 'bordered', 'flat'],
                  default: 'default',
                  label: 'Variant',
                },
                {
                  name: 'showPresets',
                  type: 'boolean',
                  default: true,
                  label: 'Show Presets',
                },
                {
                  name: 'showTodayButton',
                  type: 'boolean',
                  default: true,
                  label: 'Show Today Button',
                },
                {
                  name: 'showActions',
                  type: 'boolean',
                  default: true,
                  label: 'Show Actions',
                },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.mode !== 'single') {
                  reactProps.push(`mode="${knobs.mode}"`);
                  vueProps.push(`mode="${knobs.mode}"`);
                }
                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }
                if (knobs.variant !== 'default') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (!knobs.showPresets) {
                  reactProps.push('showPresets={false}');
                  vueProps.push(':show-presets="false"');
                }
                if (!knobs.showTodayButton) {
                  reactProps.push('showTodayButton={false}');
                  vueProps.push(':show-today-button="false"');
                }
                if (!knobs.showActions) {
                  reactProps.push('showActions={false}');
                  vueProps.push(':show-actions="false"');
                }

                const rp = reactProps.length > 0 ? '\n  ' + reactProps.join('\n  ') + '\n' : ' ';
                const vp = vueProps.length > 0 ? '\n  ' + vueProps.join('\n  ') + '\n' : ' ';

                return {
                  react: `<NeuronDatePicker${rp}/>`,
                  vue: `<NeuronDatePicker${vp}/>`,
                  html: `<div class="neuron-datepicker neuron-datepicker--${knobs.mode} neuron-datepicker--${knobs.size}">\n  <!-- Datepicker markup -->\n</div>`,
                };
              }}
            >
              {(knobs) => (
                <NeuronDatePicker
                  mode={knobs.mode as DatePickerMode}
                  size={knobs.size as DatePickerSize}
                  variant={knobs.variant as DatePickerVariant}
                  showPresets={knobs.showPresets as boolean}
                  showTodayButton={knobs.showTodayButton as boolean}
                  showActions={knobs.showActions as boolean}
                  defaultValue={new Date(2025, 0, 6)}
                  defaultRangeValue={{
                    startDate: new Date(2025, 0, 6),
                    endDate: new Date(2025, 0, 13),
                  }}
                />
              )}
            </Playground>
          </div>

          {/* ── 7. API Reference ── */}
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
                    <td><code>mode</code></td>
                    <td><code>'single' | 'range' | 'double'</code></td>
                    <td><code>'single'</code></td>
                    <td>Operational mode: single date selection, single month range, or double month with presets.</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>Controls the day cell size, font size, and component padding scale.</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'default' | 'bordered' | 'flat'</code></td>
                    <td><code>'default'</code></td>
                    <td>Visual style variant controlling elevation, borders, and background.</td>
                  </tr>
                  <tr>
                    <td><code>value</code></td>
                    <td><code>Date | null</code></td>
                    <td>—</td>
                    <td>Controlled selected date for single mode.</td>
                  </tr>
                  <tr>
                    <td><code>rangeValue</code></td>
                    <td><code>DateRange</code></td>
                    <td>—</td>
                    <td>Controlled selected start and end dates for range or double mode.</td>
                  </tr>
                  <tr>
                    <td><code>trigger</code></td>
                    <td><code>'inline' | 'popover'</code></td>
                    <td><code>'inline'</code></td>
                    <td>Render directly as an embedded calendar card or as a form input popover trigger.</td>
                  </tr>
                  <tr>
                    <td><code>showPresets</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Whether to show the left presets shortcut sidebar in range or double mode.</td>
                  </tr>
                  <tr>
                    <td><code>showTodayButton</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Whether to render the "Today" quick selection button in single mode.</td>
                  </tr>
                  <tr>
                    <td><code>showActions</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Whether to render the Cancel and Apply footer action buttons.</td>
                  </tr>
                  <tr>
                    <td><code>minDate</code></td>
                    <td><code>Date</code></td>
                    <td>—</td>
                    <td>Minimum selectable date. Earlier dates are disabled.</td>
                  </tr>
                  <tr>
                    <td><code>maxDate</code></td>
                    <td><code>Date</code></td>
                    <td>—</td>
                    <td>Maximum selectable date. Later dates are disabled.</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(date: Date | null) =&gt; void</code></td>
                    <td>—</td>
                    <td>Callback fired when a single date is selected.</td>
                  </tr>
                  <tr>
                    <td><code>onRangeChange</code></td>
                    <td><code>(range: DateRange) =&gt; void</code></td>
                    <td>—</td>
                    <td>Callback fired when a start date or end date is selected in range mode.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Page Footer Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-checkbox', label: t.nav.compCheckbox }}
        next={{ id: 'comp-input', label: t.nav.compInput }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
