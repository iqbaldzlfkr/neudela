import React, { useState } from 'react';
import NeuronDatePicker, {
  DatePickerMode,
  DatePickerSize,
  DatePickerVariant,
  DateRange,
  formatDate,
} from '../components/NeuronDatePicker';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import NeuronButtonGroup from '../components/NeuronButtonGroup';
import NeuronAvatar, { NeuronAvatarGroup } from '../components/NeuronAvatar';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import {
  Calendar,
  ShieldCheck,
  Check,
  Keyboard,
  Filter,
  Plane,
  Layers,
  Clock,
  Sliders,
  CheckCircle2,
  XCircle,
  Info,
  CalendarCheck,
  BarChart2,
  Zap,
  UserCheck,
  SlidersHorizontal,
  Smartphone,
  ArrowRight,
  Download,
  Search,
  Sparkles,
  RefreshCw,
  MapPin,
  Users,
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
          <>
            <Check size={12} />
            <span>DO</span>
          </>
        ) : (
          <>
            <XCircle size={12} />
            <span>DON'T</span>
          </>
        )}
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
  const { t, language } = useLanguage();
  const dp = t.datePicker;
  const isId = language === 'id';
  const [activeViewTab, setViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // Playbook Interactive Mode Showcase Tab
  const [showcaseMode, setShowcaseMode] = useState<'single' | 'range' | 'double' | 'popover'>('single');

  // Showcase Demos state
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

  // Pattern 1: Flight & Hotel Booking State
  const [flightTripType, setFlightTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [flightRange, setFlightRange] = useState<DateRange>({
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 22),
  });
  const [flightSingleDate, setFlightSingleDate] = useState<Date | null>(new Date(2025, 4, 15));
  const [flightOrigin] = useState('CGK · Jakarta');
  const [flightDestination] = useState('DPS · Bali');
  const [isFlightSearched, setIsFlightSearched] = useState(false);

  // Pattern 2: Financial Telemetry & Analytics State
  const [analyticsPreset, setAnalyticsPreset] = useState<'7d' | '30d' | '90d' | 'ytd'>('30d');
  const [analyticsRange, setAnalyticsRange] = useState<DateRange>({
    startDate: new Date(2025, 3, 1),
    endDate: new Date(2025, 3, 30),
  });
  const [isExporting, setIsExporting] = useState(false);

  // Pattern 3: Doctor Consultation State
  const [consultDate, setConsultDate] = useState<Date | null>(new Date(2025, 4, 18));
  const [consultSlot, setConsultSlot] = useState<string>('11:30 AM');
  const [isConsultBooked, setIsConsultBooked] = useState(false);

  // Pattern 4: Sprint Milestone Timeline State
  const [sprintRange, setSprintRange] = useState<DateRange>({
    startDate: new Date(2025, 0, 6),
    endDate: new Date(2025, 0, 20),
  });

  return (
    <div className="badge-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{dp.pageTitle}</h1>
            <p className="page-subtitle">
              {dp.pageSubtitle}
            </p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            className={`comp-tab ${activeViewTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setViewTab('guideline')}
          >
            {dp.tabGuideline}
          </button>
          <button
            className={`comp-tab ${activeViewTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setViewTab('playbook')}
          >
            {dp.tabPlaybook}
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
            <h2 className="section-title">{dp.overviewTitle}</h2>
            <p className="section-description">
              {dp.overviewDesc}
            </p>

            {/* Quick Capability Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-4)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(223, 126, 48, 0.12)',
                    color: 'var(--brand-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Calendar size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                    Selection Modes
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Single, Range, Double
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                    Preset Shortcuts
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    9 Quick Intervals
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Sliders size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                    Size Scales
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    sm (28px) · md (32px) · lg (38px)
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(236, 72, 153, 0.12)',
                    color: '#ec4899',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Layers size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                    Presentation Formats
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Inline Card & Popover
                  </div>
                </div>
              </div>
            </div>

            {/* Core Mode Layouts Cards Showcase */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                {dp.showcaseTitle}
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                {/* 1. Single Date Mode Card */}
                <div
                  style={{
                    padding: 'var(--space-5)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ fontSize: 'var(--fs-text-md)', color: 'var(--color-text-primary)' }}>
                        {dp.cardSingleTitle}
                      </strong>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'rgba(99, 102, 241, 0.1)',
                          color: '#6366f1',
                        }}
                      >
                        Single Mode
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {dp.cardSingleDesc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 'var(--space-4)',
                      backgroundColor: 'var(--color-bg-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <NeuronDatePicker
                      mode="single"
                      size="sm"
                      value={new Date(2025, 0, 6)}
                      showTodayButton={true}
                      showActions={true}
                    />
                  </div>
                </div>

                {/* 2. Date Range Mode Card */}
                <div
                  style={{
                    padding: 'var(--space-5)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ fontSize: 'var(--fs-text-md)', color: 'var(--color-text-primary)' }}>
                        {dp.cardRangeTitle}
                      </strong>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'rgba(223, 126, 48, 0.12)',
                          color: 'var(--brand-600)',
                        }}
                      >
                        Range Mode
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {dp.cardRangeDesc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 'var(--space-4)',
                      backgroundColor: 'var(--color-bg-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <NeuronDatePicker
                      mode="range"
                      size="md"
                      rangeValue={{
                        startDate: new Date(2025, 0, 6),
                        endDate: new Date(2025, 0, 13),
                      }}
                      showActions={true}
                    />
                  </div>
                </div>

                {/* 3. Double Month with Presets Card */}
                <div
                  style={{
                    padding: 'var(--space-5)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                    gridColumn: '1 / -1',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ fontSize: 'var(--fs-text-md)', color: 'var(--color-text-primary)' }}>
                        {dp.cardDoubleTitle}
                      </strong>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'rgba(16, 185, 129, 0.12)',
                          color: '#10b981',
                        }}
                      >
                        Multi-Month & Presets
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {dp.cardDoubleDesc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 'var(--space-4)',
                      backgroundColor: 'var(--color-bg-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      overflowX: 'auto',
                    }}
                  >
                    <NeuronDatePicker
                      mode="double"
                      size="sm"
                      rangeValue={{
                        startDate: new Date(2025, 0, 6),
                        endDate: new Date(2025, 0, 13),
                      }}
                      activePreset="last_week"
                      showPresets={true}
                      showActions={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Master Specification Matrix */}
            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">{dp.matrixTitle}</div>
                  <div className="badge-spec-subtitle">{dp.matrixSubtitle}</div>
                </div>
              </div>

              {/* Master Matrix Table */}
              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th>{dp.matrixColMode}</th>
                      <th>{dp.matrixColUse}</th>
                      <th>{dp.matrixColInputs}</th>
                      <th>{dp.matrixColMonths}</th>
                      <th>{dp.matrixColPresets}</th>
                      <th>{dp.matrixColFooter}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="badge-spec-tag">single</span>
                        <span className="badge-spec-default" style={{ marginLeft: 6 }}>Default</span>
                      </td>
                      <td>Appointments, birthdates, due dates, single event day</td>
                      <td><code>[ Jan 6, 2025 ]</code> + <code>[ Today ]</code></td>
                      <td>1 Month</td>
                      <td>—</td>
                      <td>Cancel / Apply</td>
                    </tr>
                    <tr>
                      <td><span className="badge-spec-tag">range</span></td>
                      <td>Booking stays, report date intervals, sprint cycles</td>
                      <td><code>[ Start Date ] — [ End Date ]</code></td>
                      <td>1 Month</td>
                      <td>Optional</td>
                      <td>Cancel / Apply</td>
                    </tr>
                    <tr>
                      <td><span className="badge-spec-tag">double</span></td>
                      <td>Analytics filters, travel schedules, multi-week periods</td>
                      <td><code>[ Start Date ] — [ End Date ]</code> in footer</td>
                      <td>2 Months (Dual)</td>
                      <td>9 Preset Shortcuts</td>
                      <td>Cancel / Apply</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── 2. Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">{dp.anatomyTitle}</h2>
            <p className="section-description">
              {dp.anatomyDesc}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              {/* Top Blueprint Preview with horizontal scroll if needed */}
              <div
                className="anatomy-preview"
                style={{
                  width: '100%',
                  minHeight: '520px',
                  padding: 'var(--space-8) var(--space-4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflowX: 'auto',
                }}
              >
                {/* Precision Blueprint Schematic Diagram Frame (Fixed 840x480) */}
                <div style={{
                  position: 'relative',
                  width: '840px',
                  height: '480px',
                  background: 'var(--color-bg-surface)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xs)',
                  overflow: 'visible',
                  flexShrink: 0,
                }}>

                  {/* SVG Precision Connector Lines & Terminals */}
                  <svg
                    width="840"
                    height="480"
                    viewBox="0 0 840 480"
                    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}
                  >
                    {/* Marker 1: Presets Sidebar (Left straight to "Last week" active button) */}
                    <line x1="38" y1="184" x2="138" y2="184" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="138" cy="184" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 2: Month Navigation Header (Top straight down to "January 2025") */}
                    <line x1="352" y1="36" x2="352" y2="92" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="352" cy="92" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 3: Weekday Header Grid (Top straight down to "Fr Sat Su") */}
                    <line x1="682" y1="36" x2="682" y2="118" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="682" cy="118" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 4: Selected Date Endpoint (Bottom orthogonal up to Day 6) */}
                    <line x1="230" y1="428" x2="230" y2="280" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <line x1="230" y1="280" x2="388" y2="280" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <line x1="388" y1="280" x2="388" y2="198" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="388" cy="198" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 5: Range Connector Strip (Right straight to Days 7-8 range strip) */}
                    <line x1="792" y1="186" x2="424" y2="186" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="424" cy="186" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 6: Action Buttons & Range Display (Bottom straight up to Footer Buttons) */}
                    <line x1="682" y1="428" x2="682" y2="388" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="682" cy="388" r="3" fill="var(--color-text-primary)" />
                  </svg>

                  {/* Target Component positioned in the exact center frame */}
                  <div style={{
                    position: 'absolute',
                    left: '70px',
                    top: '60px',
                    zIndex: 5,
                  }}>
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

                  {/* Marker 1: Presets Sidebar (Far Left) */}
                  <div style={{ position: 'absolute', left: '16px', top: '172px', zIndex: 20 }}>
                    <span className="anatomy-marker">1</span>
                  </div>

                  {/* Marker 2: Month Navigation Header (Top Center-Left) */}
                  <div style={{ position: 'absolute', left: '340px', top: '16px', zIndex: 20 }}>
                    <span className="anatomy-marker">2</span>
                  </div>

                  {/* Marker 3: Weekday Column Header (Top Right) */}
                  <div style={{ position: 'absolute', left: '670px', top: '16px', zIndex: 20 }}>
                    <span className="anatomy-marker">3</span>
                  </div>

                  {/* Marker 4: Selected Date Endpoint (Bottom Left) */}
                  <div style={{ position: 'absolute', left: '218px', top: '430px', zIndex: 20 }}>
                    <span className="anatomy-marker">4</span>
                  </div>

                  {/* Marker 5: Range Connector Strip (Far Right) */}
                  <div style={{ position: 'absolute', left: '794px', top: '174px', zIndex: 20 }}>
                    <span className="anatomy-marker">5</span>
                  </div>

                  {/* Marker 6: Footer Inputs & Action Buttons (Bottom Right) */}
                  <div style={{ position: 'absolute', left: '670px', top: '430px', zIndex: 20 }}>
                    <span className="anatomy-marker">6</span>
                  </div>
                </div>
              </div>

              {/* Anatomy Description Grid (Placed cleanly below) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                <AnatomyLabel
                  number={1}
                  label={dp.anatomyItem1}
                  desc={dp.anatomyDesc1}
                />
                <AnatomyLabel
                  number={2}
                  label={dp.anatomyItem2}
                  desc={dp.anatomyDesc2}
                />
                <AnatomyLabel
                  number={3}
                  label={dp.anatomyItem3}
                  desc={dp.anatomyDesc3}
                />
                <AnatomyLabel
                  number={4}
                  label={dp.anatomyItem4}
                  desc={dp.anatomyDesc4}
                />
                <AnatomyLabel
                  number={5}
                  label={dp.anatomyItem5}
                  desc={dp.anatomyDesc5}
                />
                <AnatomyLabel
                  number={6}
                  label={dp.anatomyItem6}
                  desc={dp.anatomyDesc6}
                />
              </div>
            </div>
          </div>

          {/* ── 3. When to Use & When Not to Use ── */}
          <div className="section-card">
            <h2 className="section-title">{dp.whenToUseTitle}</h2>
            <p className="section-description">
              {dp.whenToUseDesc}
            </p>

            {/* Usage Key Rules Banner */}
            <div
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4) var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--brand-500)', flexShrink: 0 }} />
                <strong>{dp.usageRulePrimary}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--slate-400)', flexShrink: 0 }} />
                <span>{dp.usageRuleModality}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                <Info size={14} style={{ flexShrink: 0 }} />
                <em>{dp.usageRulePlacements}</em>
              </div>
            </div>

            {/* Side-by-Side Comparison Columns */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-6)',
                marginBottom: 'var(--space-6)',
              }}
            >
              {/* When to Use Column (Emerald Theme) */}
              <div
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                  <CheckCircle2 size={20} />
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                    {dp.whenColTitle}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', flexShrink: 0, marginTop: '2px' }}>
                      <Plane size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        {dp.whenItem1Title}
                      </div>
                      <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {dp.whenItem1Desc}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', flexShrink: 0, marginTop: '2px' }}>
                      <BarChart2 size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        {dp.whenItem2Title}
                      </div>
                      <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {dp.whenItem2Desc}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', flexShrink: 0, marginTop: '2px' }}>
                      <Zap size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        {dp.whenItem3Title}
                      </div>
                      <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {dp.whenItem3Desc}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', flexShrink: 0, marginTop: '2px' }}>
                      <CalendarCheck size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        {dp.whenItem4Title}
                      </div>
                      <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {dp.whenItem4Desc}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* When Not to Use Column (Red / Rose Theme) */}
              <div
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                  <XCircle size={20} />
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                    {dp.whenNotColTitle}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', flexShrink: 0, marginTop: '2px' }}>
                      <UserCheck size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        {dp.whenNotItem1Title}
                      </div>
                      <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {dp.whenNotItem1Desc}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', flexShrink: 0, marginTop: '2px' }}>
                      <SlidersHorizontal size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        {dp.whenNotItem2Title}
                      </div>
                      <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {dp.whenNotItem2Desc}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', flexShrink: 0, marginTop: '2px' }}>
                      <Smartphone size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        {dp.whenNotItem3Title}
                      </div>
                      <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {dp.whenNotItem3Desc}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ padding: '6px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', flexShrink: 0, marginTop: '2px' }}>
                      <Clock size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        {dp.whenNotItem4Title}
                      </div>
                      <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {dp.whenNotItem4Desc}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Solutions Recommendation Cards */}
            <div>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                {dp.altTitle}
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                <div
                  style={{
                    padding: 'var(--space-4)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{dp.alt1Title}</strong>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--brand-50)', color: 'var(--brand-700)' }}>
                      {dp.alt1Tag}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {dp.alt1Desc}
                  </p>
                </div>

                <div
                  style={{
                    padding: 'var(--space-4)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{dp.alt2Title}</strong>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                      {dp.alt2Tag}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {dp.alt2Desc}
                  </p>
                </div>

                <div
                  style={{
                    padding: 'var(--space-4)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{dp.alt3Title}</strong>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                      {dp.alt3Tag}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {dp.alt3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. Do's and Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">{dp.dosDontsTitle}</h2>
            <p className="section-description">
              {dp.dosDontsDesc}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              
              {/* Pair 1: Format Keterbacaan & Konfirmasi Eksplisit */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px', fontSize: 'var(--fs-text-sm)' }}>
                    {dp.do1Title}
                  </div>
                  <p>
                    {dp.do1Desc}
                  </p>
                </RuleCard>

                <RuleCard type="dont">
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px', fontSize: 'var(--fs-text-sm)' }}>
                    {dp.dont1Title}
                  </div>
                  <p>
                    {dp.dont1Desc}
                  </p>
                </RuleCard>
              </div>

              {/* Pair 2: Strip Penghubung Rentang Kontinu */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px', fontSize: 'var(--fs-text-sm)' }}>
                    {dp.do2Title}
                  </div>
                  <p>
                    {dp.do2Desc}
                  </p>
                </RuleCard>

                <RuleCard type="dont">
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px', fontSize: 'var(--fs-text-sm)' }}>
                    {dp.dont2Title}
                  </div>
                  <p>
                    {dp.dont2Desc}
                  </p>
                </RuleCard>
              </div>

              {/* Pair 3: Pencegahan Akses Tanggal Nonaktif */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px', fontSize: 'var(--fs-text-sm)' }}>
                    {dp.do3Title}
                  </div>
                  <p>
                    {dp.do3Desc}
                  </p>
                </RuleCard>

                <RuleCard type="dont">
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px', fontSize: 'var(--fs-text-sm)' }}>
                    {dp.dont3Title}
                  </div>
                  <p>
                    {dp.dont3Desc}
                  </p>
                </RuleCard>
              </div>

              {/* Pair 4: Quick Presets Curation */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px', fontSize: 'var(--fs-text-sm)' }}>
                    {dp.do4Title}
                  </div>
                  <p>
                    {dp.do4Desc}
                  </p>
                </RuleCard>

                <RuleCard type="dont">
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px', fontSize: 'var(--fs-text-sm)' }}>
                    {dp.dont4Title}
                  </div>
                  <p>
                    {dp.dont4Desc}
                  </p>
                </RuleCard>
              </div>

            </div>
          </div>

          {/* ── 5. Size Guidelines ── */}
          <div className="section-card">
            <h2 className="section-title">{dp.sizeTitle}</h2>
            <p className="section-description">
              {dp.sizeDesc}
            </p>

            <div className="badge-spec-card">
              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th>{dp.sizeColSize}</th>
                      <th>{dp.sizeColDayCell}</th>
                      <th>{dp.sizeColInputH}</th>
                      <th>{dp.sizeColWidth}</th>
                      <th>{dp.sizeColUse}</th>
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

          {/* ── 6. Accessibility & Keyboard Navigation ── */}
          <div className="section-card">
            <h2 className="section-title">{dp.a11yTitle}</h2>
            <p className="section-description">
              {dp.a11yDesc}
            </p>

            {/* 1. Keyboard Navigation Matrix Table */}
            <div className="badge-spec-card" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Keyboard size={18} style={{ color: 'var(--brand-600)' }} />
                    <span>{dp.a11yKbdTitle}</span>
                  </div>
                  <div className="badge-spec-subtitle">{dp.a11yKbdSubtitle}</div>
                </div>
              </div>

              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th style={{ width: '220px' }}>{dp.a11yColKey}</th>
                      <th>{dp.a11yColAction}</th>
                      <th style={{ width: '180px' }}>{dp.a11yColScope}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <kbd className="kbd-shortcut">←</kbd> <kbd className="kbd-shortcut">→</kbd>
                      </td>
                      <td>{dp.a11yAction1}</td>
                      <td><span className="badge-spec-tag">{dp.a11yScope1}</span></td>
                    </tr>
                    <tr>
                      <td>
                        <kbd className="kbd-shortcut">↑</kbd> <kbd className="kbd-shortcut">↓</kbd>
                      </td>
                      <td>{dp.a11yAction2}</td>
                      <td><span className="badge-spec-tag">{dp.a11yScope2}</span></td>
                    </tr>
                    <tr>
                      <td>
                        <kbd className="kbd-shortcut">Home</kbd> <kbd className="kbd-shortcut">End</kbd>
                      </td>
                      <td>{dp.a11yAction3}</td>
                      <td><span className="badge-spec-tag">{dp.a11yScope3}</span></td>
                    </tr>
                    <tr>
                      <td>
                        <kbd className="kbd-shortcut">PageUp</kbd> <kbd className="kbd-shortcut">PageDown</kbd>
                      </td>
                      <td>{dp.a11yAction4}</td>
                      <td><span className="badge-spec-tag">{dp.a11yScope4}</span></td>
                    </tr>
                    <tr>
                      <td>
                        <kbd className="kbd-shortcut">Shift</kbd> + <kbd className="kbd-shortcut">PageUp / PageDown</kbd>
                      </td>
                      <td>{dp.a11yAction5}</td>
                      <td><span className="badge-spec-tag">{dp.a11yScope5}</span></td>
                    </tr>
                    <tr>
                      <td>
                        <kbd className="kbd-shortcut">Enter</kbd> <kbd className="kbd-shortcut">Space</kbd>
                      </td>
                      <td>{dp.a11yAction6}</td>
                      <td><span className="badge-spec-tag">{dp.a11yScope6}</span></td>
                    </tr>
                    <tr>
                      <td>
                        <kbd className="kbd-shortcut">Escape</kbd>
                      </td>
                      <td>{dp.a11yAction7}</td>
                      <td><span className="badge-spec-tag">{dp.a11yScope7}</span></td>
                    </tr>
                    <tr>
                      <td>
                        <kbd className="kbd-shortcut">Tab</kbd> / <kbd className="kbd-shortcut">Shift + Tab</kbd>
                      </td>
                      <td>{dp.a11yAction8}</td>
                      <td><span className="badge-spec-tag">{dp.a11yScope8}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. WAI-ARIA Semantics & Assistive Standards Cards Grid */}
            <div style={{ marginTop: 'var(--space-6)' }}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} style={{ color: '#10b981' }} />
                  <span>{dp.a11ySemanticsTitle}</span>
                </h3>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
                  {dp.a11ySemanticsSubtitle}
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                {/* Card 1 */}
                <div
                  style={{
                    padding: 'var(--space-5)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--brand-500)', flexShrink: 0 }} />
                    <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                      {dp.a11yCard1Title}
                    </strong>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    {dp.a11yCard1Desc}
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  style={{
                    padding: 'var(--space-5)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#6366f1', flexShrink: 0 }} />
                    <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                      {dp.a11yCard2Title}
                    </strong>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    {dp.a11yCard2Desc}
                  </p>
                </div>

                {/* Card 3 */}
                <div
                  style={{
                    padding: 'var(--space-5)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981', flexShrink: 0 }} />
                    <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                      {dp.a11yCard3Title}
                    </strong>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    {dp.a11yCard3Desc}
                  </p>
                </div>

                {/* Card 4 */}
                <div
                  style={{
                    padding: 'var(--space-5)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ec4899', flexShrink: 0 }} />
                    <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                      {dp.a11yCard4Title}
                    </strong>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    {dp.a11yCard4Desc}
                  </p>
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
          {/* ── 1. Core Modes Interactive Showcase ── */}
          <div className="section-card">
            <h2 className="section-title">{dp.showcaseTitle}</h2>
            <p className="section-description">
              {dp.showcaseDesc}
            </p>

            {/* Mode Switcher Segmented Button Group */}
            <div style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-5)', display: 'flex', flexWrap: 'wrap' }}>
              <NeuronButtonGroup
                variant="outline"
                size="md"
                type="radio"
                options={[
                  {
                    value: 'single',
                    label: isId ? 'Tanggal Tunggal' : 'Single Date',
                    icon: <Calendar size={16} />,
                  },
                  {
                    value: 'range',
                    label: isId ? 'Rentang 1 Bulan' : '1-Month Range',
                    icon: <CalendarCheck size={16} />,
                  },
                  {
                    value: 'double',
                    label: isId ? 'Dua Bulan + Preset' : 'Dual-Month + Presets',
                    icon: <Sparkles size={16} />,
                  },
                  {
                    value: 'popover',
                    label: isId ? 'Form Popover' : 'Form Popover Trigger',
                    icon: <Clock size={16} />,
                  },
                ]}
                value={showcaseMode}
                onChange={(val) => setShowcaseMode(val as any)}
              />
            </div>

            {/* Showcase Stage Container */}
            <div
              style={{
                padding: 'var(--space-6)',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-5)',
              }}
            >
              {/* Live State Inspector Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  boxShadow: 'var(--shadow-xs)',
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--brand-500)' }} />
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Nilai Aktif:' : 'Active Value:'}
                  </span>
                </div>
                <code style={{ color: 'var(--brand-700)', fontWeight: 700 }}>
                  {showcaseMode === 'single' && (demoSingleDate ? formatDate(demoSingleDate, isId ? 'id' : 'en') : 'None')}
                  {showcaseMode === 'range' && (
                    demoRange.startDate && demoRange.endDate
                      ? `${formatDate(demoRange.startDate, isId ? 'id' : 'en')} — ${formatDate(demoRange.endDate, isId ? 'id' : 'en')}`
                      : 'Selecting...'
                  )}
                  {showcaseMode === 'double' && (
                    demoDoubleRange.startDate && demoDoubleRange.endDate
                      ? `${formatDate(demoDoubleRange.startDate, isId ? 'id' : 'en')} — ${formatDate(demoDoubleRange.endDate, isId ? 'id' : 'en')}`
                      : 'Selecting...'
                  )}
                  {showcaseMode === 'popover' && (demoPopoverDate ? formatDate(demoPopoverDate, isId ? 'id' : 'en') : 'None')}
                </code>
              </div>

              {/* Mode Renderer */}
              {showcaseMode === 'single' && (
                <NeuronDatePicker
                  mode="single"
                  size="md"
                  value={demoSingleDate}
                  onChange={setDemoSingleDate}
                  showTodayButton={true}
                  showActions={true}
                />
              )}

              {showcaseMode === 'range' && (
                <NeuronDatePicker
                  mode="range"
                  size="md"
                  rangeValue={demoRange}
                  onRangeChange={setDemoRange}
                  showActions={true}
                />
              )}

              {showcaseMode === 'double' && (
                <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                  <NeuronDatePicker
                    mode="double"
                    size="md"
                    rangeValue={demoDoubleRange}
                    onRangeChange={setDemoDoubleRange}
                    activePreset="last_week"
                    showPresets={true}
                    showActions={true}
                  />
                </div>
              )}

              {showcaseMode === 'popover' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%', maxWidth: '340px' }}>
                  <NeuronDatePicker
                    mode="single"
                    trigger="popover"
                    label={isId ? "Tanggal Janji Temu" : "Consultation Date"}
                    helperText={isId ? "Klik kotak input untuk membuka popup kalender." : "Click the input box to open the floating calendar popup."}
                    value={demoPopoverDate}
                    onChange={setDemoPopoverDate}
                  />
                  <NeuronDatePicker
                    mode="double"
                    trigger="popover"
                    label={isId ? "Periode Analitik Bisnis" : "Reporting Range Period"}
                    helperText={isId ? "Pilih rentang tanggal lengkap dengan pintasan sidebar." : "Select a multi-month range with left sidebar preset shortcuts."}
                    rangeValue={demoDoubleRange}
                    onRangeChange={setDemoDoubleRange}
                    showPresets={true}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── 2. Real-World Enterprise Production Patterns ── */}
          <div className="section-card">
            <h2 className="section-title">{dp.patternsTitle}</h2>
            <p className="section-description">
              {dp.patternsDesc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              {/* Pattern 1: Flight & Hotel Itinerary Booking */}
              <div
                style={{
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(223, 126, 48, 0.12)', color: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plane size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {dp.pattern1Title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                        Flight & Hotel Booking Portal
                      </div>
                    </div>
                  </div>
                  <NeuronBadge size="sm" variant="brand">Roundtrip</NeuronBadge>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {dp.pattern1Desc}
                </p>

                {/* Booking Form Card */}
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {/* Trip Type Switcher */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setFlightTripType('roundtrip')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: flightTripType === 'roundtrip' ? 'var(--brand-500)' : 'var(--color-border)',
                        backgroundColor: flightTripType === 'roundtrip' ? 'var(--color-bg-surface)' : 'transparent',
                        color: flightTripType === 'roundtrip' ? 'var(--brand-600)' : 'var(--color-text-secondary)',
                        cursor: 'pointer',
                      }}
                    >
                      {isId ? 'Pulang-Pergi (Roundtrip)' : 'Roundtrip'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlightTripType('oneway')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: flightTripType === 'oneway' ? 'var(--brand-500)' : 'var(--color-border)',
                        backgroundColor: flightTripType === 'oneway' ? 'var(--color-bg-surface)' : 'transparent',
                        color: flightTripType === 'oneway' ? 'var(--brand-600)' : 'var(--color-text-secondary)',
                        cursor: 'pointer',
                      }}
                    >
                      {isId ? 'Sekali Jalan (One-way)' : 'One-way'}
                    </button>
                  </div>

                  {/* Route Bar */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <label style={{ position: 'absolute', top: '4px', left: '12px', fontSize: '9px', fontWeight: 600, color: 'var(--color-text-tertiary)', pointerEvents: 'none', zIndex: 1 }}>
                        {isId ? 'DARI' : 'FROM'}
                      </label>
                      <input
                        type="text"
                        value={flightOrigin}
                        onChange={(e) => setFlightOrigin(e.target.value)}
                        className="neuron-input"
                        style={{ paddingTop: '18px', paddingBottom: '4px', fontSize: '12px', fontWeight: 600, height: '42px' }}
                        aria-label="Departure Airport"
                      />
                    </div>
                    <div style={{ color: 'var(--color-text-tertiary)', display: 'flex', justifyContent: 'center' }}>⇄</div>
                    <div style={{ position: 'relative' }}>
                      <label style={{ position: 'absolute', top: '4px', left: '12px', fontSize: '9px', fontWeight: 600, color: 'var(--color-text-tertiary)', pointerEvents: 'none', zIndex: 1 }}>
                        {isId ? 'KE' : 'TO'}
                      </label>
                      <input
                        type="text"
                        value={flightDestination}
                        onChange={(e) => setFlightDestination(e.target.value)}
                        className="neuron-input"
                        style={{ paddingTop: '18px', paddingBottom: '4px', fontSize: '12px', fontWeight: 600, height: '42px' }}
                        aria-label="Destination Airport"
                      />
                    </div>
                  </div>

                  {/* Date Picker Popover */}
                  {flightTripType === 'roundtrip' ? (
                    <NeuronDatePicker
                      mode="range"
                      trigger="popover"
                      label={isId ? "Jadwal Keberangkatan & Kepulangan" : "Departure & Return Dates"}
                      rangeValue={flightRange}
                      onRangeChange={setFlightRange}
                      size="sm"
                    />
                  ) : (
                    <NeuronDatePicker
                      mode="single"
                      trigger="popover"
                      label={isId ? "Tanggal Keberangkatan" : "Departure Date"}
                      value={flightSingleDate}
                      onChange={setFlightSingleDate}
                      size="sm"
                    />
                  )}

                  {/* Action Button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-border)' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{isId ? 'Mulai dari' : 'Starting from'} </span>
                      <strong style={{ fontSize: '13px', color: 'var(--brand-700)' }}>Rp 1.850.000</strong>
                    </div>
                    <NeuronButton
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => setIsFlightSearched(true)}
                    >
                      <Search size={13} style={{ marginRight: 4 }} />
                      {isId ? 'Cari Tiket' : 'Search Flights'}
                    </NeuronButton>
                  </div>

                  {isFlightSearched && (
                    <div style={{ padding: '8px 12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '11px', color: '#065f46', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={14} />
                      <span>{isId ? '24 Penerbangan langsung ditemukan untuk jadwal ini!' : '24 Direct flights found for your selected schedule!'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pattern 2: Financial Telemetry & Analytics Filter */}
              <div
                style={{
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BarChart2 size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {dp.pattern2Title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                        Telemetry & Metrics Pipeline
                      </div>
                    </div>
                  </div>
                  <NeuronBadge size="sm" variant="indigo">Live Data</NeuronBadge>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {dp.pattern2Desc}
                </p>

                {/* Telemetry Filter Stage */}
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {/* Preset Pills */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[
                        { id: '7d', label: '7D' },
                        { id: '30d', label: '30D' },
                        { id: '90d', label: '90D' },
                        { id: 'ytd', label: 'YTD' },
                      ].map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setAnalyticsPreset(p.id as any);
                            const now = new Date();
                            const past = new Date();
                            past.setDate(now.getDate() - (p.id === '7d' ? 7 : p.id === '30d' ? 30 : 90));
                            setAnalyticsRange({ startDate: past, endDate: now });
                          }}
                          style={{
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '11px',
                            fontWeight: 600,
                            border: '1px solid',
                            borderColor: analyticsPreset === p.id ? '#6366f1' : 'var(--color-border)',
                            backgroundColor: analyticsPreset === p.id ? 'rgba(99, 102, 241, 0.12)' : 'var(--color-bg-surface)',
                            color: analyticsPreset === p.id ? '#6366f1' : 'var(--color-text-secondary)',
                            cursor: 'pointer',
                          }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>

                    <NeuronButton
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsExporting(true);
                        setTimeout(() => setIsExporting(false), 1200);
                      }}
                    >
                      <Download size={12} style={{ marginRight: 4 }} />
                      {isExporting ? (isId ? 'Mengekspor...' : 'Exporting...') : (isId ? 'Ekspor CSV' : 'Export CSV')}
                    </NeuronButton>
                  </div>

                  {/* Dual Month Popover */}
                  <NeuronDatePicker
                    mode="double"
                    trigger="popover"
                    label={isId ? "Filter Rentang Analitik Kustom" : "Custom Analytics Time Horizon"}
                    rangeValue={analyticsRange}
                    onRangeChange={setAnalyticsRange}
                    showPresets={true}
                    size="sm"
                    placement="bottom-end"
                  />

                  {/* Live KPI Metric Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '4px' }}>
                    <div style={{ padding: '8px', backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{isId ? 'Pendapatan' : 'Revenue'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>$128.4K</div>
                      <div style={{ fontSize: '9px', color: '#10b981' }}>+14.2% MoM</div>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{isId ? 'Permintaan API' : 'Requests'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>1.42M</div>
                      <div style={{ fontSize: '9px', color: '#6366f1' }}>99.98% Up</div>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{isId ? 'Error Rate' : 'Error Rate'}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>0.02%</div>
                      <div style={{ fontSize: '9px', color: '#10b981' }}>Healthy</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pattern 3: Doctor Consultation & Healthcare Scheduler */}
              <div
                style={{
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <UserCheck size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {dp.pattern3Title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                        Telehealth & Hospital Appointment
                      </div>
                    </div>
                  </div>
                  <NeuronBadge size="sm" variant="success">Available</NeuronBadge>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {dp.pattern3Desc}
                </p>

                {/* Doctor Scheduler Box */}
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {/* Doctor Profile Banner */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                    <NeuronAvatar name="Dr. Sophia Reynolds" variant="brand" size="md" status="online" />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Dr. Sophia Reynolds, Sp.JP</div>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>Spesialis Jantung & Pembuluh Darah · ⭐ 4.9 (142 Ulasan)</div>
                    </div>
                  </div>

                  {/* Consultation Date Popover */}
                  <NeuronDatePicker
                    mode="single"
                    trigger="popover"
                    label={isId ? "Pilih Tanggal Konsultasi" : "Select Consultation Date"}
                    value={consultDate}
                    onChange={setConsultDate}
                    size="sm"
                  />

                  {/* Available Time Slots Chips */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>
                      {isId ? "Pilih Slot Waktu Tersedia" : "Available Time Slots"}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                      {['09:00 WIB', '11:30 WIB', '14:00 WIB', '16:30 WIB'].map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setConsultSlot(slot)}
                          style={{
                            padding: '6px 4px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '11px',
                            fontWeight: 600,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: consultSlot === slot ? '#10b981' : 'var(--color-border)',
                            backgroundColor: consultSlot === slot ? 'rgba(16, 185, 129, 0.12)' : 'var(--color-bg-surface)',
                            color: consultSlot === slot ? '#065f46' : 'var(--color-text-secondary)',
                            cursor: 'pointer',
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <NeuronButton
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => setIsConsultBooked(true)}
                  >
                    <CheckCircle2 size={13} style={{ marginRight: 4 }} />
                    {isId ? 'Konfirmasi Jadwal Konsultasi' : 'Confirm Consultation Booking'}
                  </NeuronButton>

                  {isConsultBooked && (
                    <div style={{ padding: '8px 12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '11px', color: '#065f46' }}>
                      ✓ {isId ? `Janji temu terkonfirmasi pada ${formatDate(consultDate, 'id')} jam ${consultSlot}.` : `Appointment confirmed on ${formatDate(consultDate, 'en')} at ${consultSlot}.`}
                    </div>
                  )}
                </div>
              </div>

              {/* Pattern 4: Sprint Milestone & Engineering Timeline */}
              <div
                style={{
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CalendarCheck size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {dp.pattern4Title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                        Agile Project Management
                      </div>
                    </div>
                  </div>
                  <NeuronBadge size="sm" variant="pink">Active Sprint</NeuronBadge>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {dp.pattern4Desc}
                </p>

                {/* Sprint Timeline Box */}
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Sprint 42: Design System Core</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>14 Days Duration · 25 Issues</div>
                    </div>
                    <NeuronAvatarGroup size="xs" max={3}>
                      <NeuronAvatar name="Iqbal Dzulfikar" variant="brand" />
                      <NeuronAvatar name="Marcus Vance" variant="blue" />
                      <NeuronAvatar name="Sophia Reynolds" variant="purple" />
                      <NeuronAvatar name="Alex Hunter" variant="indigo" />
                    </NeuronAvatarGroup>
                  </div>

                  {/* Sprint Date Range Picker */}
                  <NeuronDatePicker
                    mode="range"
                    trigger="popover"
                    label={isId ? "Linimasa Durasi Siklus Sprint" : "Sprint Cycle Duration Span"}
                    rangeValue={sprintRange}
                    onRangeChange={setSprintRange}
                    size="sm"
                    placement="bottom-end"
                  />

                  {/* Progress Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                      <span>{isId ? 'Progres Penyelesaian' : 'Milestone Completion'}</span>
                      <strong style={{ color: 'var(--color-text-primary)' }}>72% (18/25 Closed)</strong>
                    </div>
                    <div style={{ height: 6, backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ width: '72%', height: '100%', backgroundColor: 'var(--brand-500)', borderRadius: 'var(--radius-full)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Interactive Component Playground ── */}
          <div className="section-card">
            <h2 className="section-title">{dp.playgroundTitle}</h2>
            <p className="section-description">
              {dp.playgroundDesc}
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
                  name: 'trigger',
                  type: 'select',
                  options: ['inline', 'popover'],
                  default: 'inline',
                  label: 'Trigger Mode',
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
                if (knobs.trigger !== 'inline') {
                  reactProps.push(`trigger="${knobs.trigger}"`);
                  reactProps.push(`label="Select Date"`);
                  vueProps.push(`trigger="${knobs.trigger}"`);
                  vueProps.push(`label="Select Date"`);
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
                  trigger={knobs.trigger as 'inline' | 'popover'}
                  label={knobs.trigger === 'popover' ? (isId ? 'Pilih Tanggal' : 'Select Date') : undefined}
                  helperText={knobs.trigger === 'popover' ? (isId ? 'Klik untuk memilih tanggal.' : 'Click to select date.') : undefined}
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

          {/* ── 4. Comprehensive API Reference Table ── */}
          <div className="section-card">
            <h2 className="section-title">{dp.apiTitle}</h2>
            <p className="section-description">{dp.apiDesc}</p>

            <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)', color: 'var(--color-text-primary)' }}>
              NeuronDatePicker Props
            </h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th style={{ width: '18%' }}>{t.compShared.prop}</th>
                    <th style={{ width: '28%' }}>{t.compShared.type}</th>
                    <th style={{ width: '14%' }}>{t.compShared.default}</th>
                    <th style={{ width: '40%' }}>{t.compShared.description}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>mode</code></td>
                    <td><code className="api-type-code">'single' | 'range' | 'double'</code></td>
                    <td><code className="api-default-code">'single'</code></td>
                    <td>{isId ? 'Mode operasional kalender: tanggal tunggal, rentang 1 bulan, atau kalender 2 bulan dengan preset.' : 'Operational mode: single date selection, single month range, or double month with presets.'}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code className="api-type-code">'sm' | 'md' | 'lg'</code></td>
                    <td><code className="api-default-code">'md'</code></td>
                    <td>{isId ? 'Skala ukuran komponen yang mempengaruhi sel hari, tinggi input pemicu, dan padding.' : 'Controls the day cell size, font size, input height, and component padding scale.'}</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code className="api-type-code">'default' | 'bordered' | 'flat'</code></td>
                    <td><code className="api-default-code">'default'</code></td>
                    <td>{isId ? 'Gaya visual yang mengontrol elevasi bayangan, garis batas (border), dan latar belakang kartu.' : 'Visual style variant controlling elevation, borders, and card background.'}</td>
                  </tr>
                  <tr>
                    <td><code>trigger</code></td>
                    <td><code className="api-type-code">'inline' | 'popover'</code></td>
                    <td><code className="api-default-code">'inline'</code></td>
                    <td>{isId ? 'Format render: kartu kalender tersemat inline atau tombol input pemicu popup dropdown mengambang.' : 'Render mode: embedded inline calendar card or floating form input dropdown trigger.'}</td>
                  </tr>
                  <tr>
                    <td><code>placement</code></td>
                    <td><code className="api-type-code">'bottom-start' | 'bottom-end' | 'auto'</code></td>
                    <td><code className="api-default-code">'auto'</code></td>
                    <td>{isId ? 'Posisi perataan horizontal popover dropdown terhadap tombol pemicu.' : 'Horizontal alignment position of the floating popover relative to the trigger button.'}</td>
                  </tr>
                  <tr>
                    <td><code>value</code></td>
                    <td><code className="api-type-code">Date | null</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Nilai tanggal terpilih terkontrol untuk mode single.' : 'Controlled selected date for single mode.'}</td>
                  </tr>
                  <tr>
                    <td><code>defaultValue</code></td>
                    <td><code className="api-type-code">Date | null</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Nilai awal tanggal terpilih (uncontrolled) untuk mode single.' : 'Initial selected date value for uncontrolled single mode.'}</td>
                  </tr>
                  <tr>
                    <td><code>rangeValue</code></td>
                    <td><code className="api-type-code">DateRange</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Nilai rentang tanggal mulai dan selesai terkontrol untuk mode range atau double.' : 'Controlled selected start and end dates for range or double mode.'}</td>
                  </tr>
                  <tr>
                    <td><code>defaultRangeValue</code></td>
                    <td><code className="api-type-code">DateRange</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Nilai awal rentang tanggal (uncontrolled) untuk mode range atau double.' : 'Initial selected range values for uncontrolled range or double mode.'}</td>
                  </tr>
                  <tr>
                    <td><code>showPresets</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">true</code></td>
                    <td>{isId ? 'Menentukan apakah sidebar pintasan preset (Hari Ini, Minggu Ini, dll.) ditampilkan.' : 'Whether to show the left presets shortcut sidebar in range or double mode.'}</td>
                  </tr>
                  <tr>
                    <td><code>presets</code></td>
                    <td><code className="api-type-code">DatePreset[]</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Daftar preset kustom yang menggantikan preset standar bawaan sistem.' : 'Custom presets array to override default built-in date interval shortcuts.'}</td>
                  </tr>
                  <tr>
                    <td><code>activePreset</code></td>
                    <td><code className="api-type-code">DatePresetId | null</code></td>
                    <td><code className="api-default-code">null</code></td>
                    <td>{isId ? 'ID preset aktif yang terpilih pada sidebar.' : 'Active preset identifier highlighted in the sidebar.'}</td>
                  </tr>
                  <tr>
                    <td><code>showTodayButton</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">true</code></td>
                    <td>{isId ? 'Menentukan apakah tombol cepat "Hari Ini" ditampilkan pada header mode single.' : 'Whether to render the "Today" quick selection button in single mode.'}</td>
                  </tr>
                  <tr>
                    <td><code>showActions</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">true</code></td>
                    <td>{isId ? 'Menentukan apakah bilah tombol aksi konfirmasi Batal dan Terapkan ditampilkan di bagian bawah.' : 'Whether to render the Cancel and Apply footer action buttons.'}</td>
                  </tr>
                  <tr>
                    <td><code>minDate</code></td>
                    <td><code className="api-type-code">Date</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Tanggal paling awal yang dapat dipilih. Tanggal sebelumnya akan dinonaktifkan secara otomatis.' : 'Minimum selectable date. Earlier dates are disabled and grayed out.'}</td>
                  </tr>
                  <tr>
                    <td><code>maxDate</code></td>
                    <td><code className="api-type-code">Date</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Tanggal paling akhir yang dapat dipilih. Tanggal setelahnya akan dinonaktifkan secara otomatis.' : 'Maximum selectable date. Later dates are disabled and grayed out.'}</td>
                  </tr>
                  <tr>
                    <td><code>label</code></td>
                    <td><code className="api-type-code">string</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Label teks judul formulir saat menggunakan trigger popover.' : 'Form field label string displayed above the popover input trigger.'}</td>
                  </tr>
                  <tr>
                    <td><code>placeholder</code></td>
                    <td><code className="api-type-code">string</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Teks placeholder pemicu popover saat belum ada tanggal yang dipilih.' : 'Placeholder text for popover trigger when no date is selected.'}</td>
                  </tr>
                  <tr>
                    <td><code>helperText</code></td>
                    <td><code className="api-type-code">string</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Teks petunjuk atau keterangan tambahan yang tampil di bawah input trigger.' : 'Supporting helper caption text displayed beneath the trigger button.'}</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">false</code></td>
                    <td>{isId ? 'Menonaktifkan interaksi seluruh komponen kalender.' : 'Whether the date picker is disabled and unresponsive to user interaction.'}</td>
                  </tr>
                  <tr>
                    <td><code>error</code></td>
                    <td><code className="api-type-code">boolean</code></td>
                    <td><code className="api-default-code">false</code></td>
                    <td>{isId ? 'Menandai status validasi gagal dengan garis batas merah.' : 'Displays the component in an invalid/error state with red accent styling.'}</td>
                  </tr>
                  <tr>
                    <td><code>errorMessage</code></td>
                    <td><code className="api-type-code">string</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Pesan teks kesalahan yang ditampilkan saat prop error bernilai true.' : 'Error validation message text displayed when error is true.'}</td>
                  </tr>
                  <tr>
                    <td><code>locale</code></td>
                    <td><code className="api-type-code">'en' | 'id'</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Pengaturan bahasa kalender (nama bulan, hari, dan format tanggal).' : 'Language locale override for month names, day abbreviations, and format strings.'}</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code className="api-type-code">(date: Date | null) =&gt; void</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Fungsi callback yang dipanggil saat tanggal tunggal dipilih atau diubah.' : 'Callback fired when a single date value changes.'}</td>
                  </tr>
                  <tr>
                    <td><code>onRangeChange</code></td>
                    <td><code className="api-type-code">(range: DateRange) =&gt; void</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Fungsi callback yang dipanggil saat rentang tanggal mulai atau selesai dipilih.' : 'Callback fired when a date range selection changes.'}</td>
                  </tr>
                  <tr>
                    <td><code>onApply</code></td>
                    <td><code className="api-type-code">(value: Date | null | DateRange) =&gt; void</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Fungsi callback yang dipanggil saat tombol Terapkan diklik.' : 'Callback fired when user clicks the Apply confirmation button.'}</td>
                  </tr>
                  <tr>
                    <td><code>onCancel</code></td>
                    <td><code className="api-type-code">() =&gt; void</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Fungsi callback yang dipanggil saat tombol Batal diklik.' : 'Callback fired when user clicks the Cancel button.'}</td>
                  </tr>
                  <tr>
                    <td><code>className</code></td>
                    <td><code className="api-type-code">string</code></td>
                    <td><code className="api-default-code">''</code></td>
                    <td>{isId ? 'Kelas CSS kustom tambahan pada kontainer pembungkus.' : 'Additional custom CSS class names applied to the container.'}</td>
                  </tr>
                  <tr>
                    <td><code>style</code></td>
                    <td><code className="api-type-code">CSSProperties</code></td>
                    <td><code className="api-default-code">undefined</code></td>
                    <td>{isId ? 'Objek gaya CSS inline kustom.' : 'Custom inline styles applied to the outer wrapper element.'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Supporting TypeScript Interfaces */}
            <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, marginTop: 'var(--space-8)', marginBottom: 'var(--space-3)', color: 'var(--color-text-primary)' }}>
              Supporting TypeScript Interfaces & Types
            </h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>Type / Interface</th>
                    <th style={{ width: '42%' }}>Definition</th>
                    <th style={{ width: '38%' }}>{t.compShared.description}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>DateRange</code></td>
                    <td><code className="api-type-code">{'{ startDate: Date | null; endDate: Date | null; }'}</code></td>
                    <td>{isId ? 'Objek rentang tanggal yang menampung tanggal awal dan akhir.' : 'Object representing a date span interval with start and end dates.'}</td>
                  </tr>
                  <tr>
                    <td><code>DatePreset</code></td>
                    <td><code className="api-type-code">{'{ id: DatePresetId; label: string; getRange: () => DateRange; }'}</code></td>
                    <td>{isId ? 'Objek konfigurasi preset pintasan rentang tanggal pada sidebar.' : 'Preset configuration object defining label and dynamic interval generator.'}</td>
                  </tr>
                  <tr>
                    <td><code>DatePresetId</code></td>
                    <td><code className="api-type-code">'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month' | 'this_year' | 'last_year' | 'all_time'</code></td>
                    <td>{isId ? 'Kumpulan pengenal unik string untuk opsi pintasan rentang waktu.' : 'Union of unique identifiers for built-in time horizon shortcuts.'}</td>
                  </tr>
                  <tr>
                    <td><code>CalendarCell</code></td>
                    <td><code className="api-type-code">{'{ date: Date; isCurrentMonth: boolean; isToday: boolean; dayNumber: number; }'}</code></td>
                    <td>{isId ? 'Struktur data sel matriks 2D kalender untuk perhitungan rendering hari.' : 'Internal cell data structure computed for 2D calendar grid rendering.'}</td>
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
        next={{ id: 'comp-dropdown', label: t.nav.compDropdown || 'Dropdown' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
