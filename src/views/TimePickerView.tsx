import React, { useState } from 'react';
import NeuronTimePicker, {
  TimePickerSize,
  TimePickerVariant,
  TimePickerMode,
  TimeRange,
  TimePreset,
} from '../components/NeuronTimePicker';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import NeuronCheckbox from '../components/NeuronCheckbox';
import NextPrevious from '../components/NextPrevious';
import Playground from '../components/Playground';
import { useLanguage } from '../context/LanguageContext';
import {
  Clock,
  Check,
  XCircle,
  Sparkles,
  Sliders,
  Layers,
  Copy,
  Briefcase,
  Coffee,
  Building,
} from 'lucide-react';

interface TimePickerViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rule Card (Do / Don't)
// ─────────────────────────────────────────────────────────────────────────────
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
      <div className="rule-card__body">{children}</div>
    </div>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// Common Presets
// ─────────────────────────────────────────────────────────────────────────────
const BUSINESS_PRESETS: TimePreset[] = [
  { label: '09:00', value: '09:00' },
  { label: '12:00', value: '12:00' },
  { label: '15:00', value: '15:00' },
  { label: '18:00', value: '18:00' },
];

const SHIFT_PRESETS: TimePreset[] = [
  { label: 'Shift Pagi (08:00)', value: '08:00' },
  { label: 'Shift Siang (14:00)', value: '14:00' },
  { label: 'Shift Malam (22:00)', value: '22:00' },
];

export default function TimePickerView({ setActiveTab }: TimePickerViewProps) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  const [activeViewTab, setActiveViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // Overview showcase interactive states (all 5 Matrix configurations)
  const [overviewSingleTime, setOverviewSingleTime] = useState<string | null>('14:30');
  const [overview12hTime, setOverview12hTime] = useState<string | null>('09:00 AM');
  const [overviewSecondsTime, setOverviewSecondsTime] = useState<string | null>('14:30:45');
  const [overviewRangeTime, setOverviewRangeTime] = useState<TimeRange>({ startTime: '09:00', endTime: '17:00' });
  const [overviewInlineTime, setOverviewInlineTime] = useState<string | null>('08:00');
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'single' | 'range' | 'inline'>('all');

  // Interactive Demo states for Guideline
  const [demo24h, setDemo24h] = useState<string | null>('14:30');
  const [demo12h, setDemo12h] = useState<string | null>('02:30 PM');
  const [demoStep15, setDemoStep15] = useState<string | null>('09:15');
  const [demoSeconds, setDemoSeconds] = useState<string | null>('12:45:30');
  const [demoRange, setDemoRange] = useState<TimeRange>({ startTime: '09:00', endTime: '17:00' });

  // Real-world scenario states
  const [meetingTime, setMeetingTime] = useState<TimeRange>({ startTime: '10:00', endTime: '11:00' });
  const [restaurantTime, setRestaurantTime] = useState<string | null>('19:30');
  const [punchTime, setPunchTime] = useState<string | null>('08:58:24');

  // Playground states
  const [pgSize, setPgSize] = useState<TimePickerSize>('md');
  const [pgVariant, setPgVariant] = useState<TimePickerVariant>('default');
  const [pgMode, setPgMode] = useState<TimePickerMode>('single');
  const [pgSingleVal, setPgSingleVal] = useState<string | null>('10:30');
  const [pgRangeVal, setPgRangeVal] = useState<TimeRange>({ startTime: '09:00', endTime: '11:30' });
  const [pg12Hours, setPg12Hours] = useState<boolean>(false);
  const [pgShowSeconds, setPgShowSeconds] = useState<boolean>(false);
  const [pgMinuteStep, setPgMinuteStep] = useState<number>(1);
  const [pgShowPresets, setPgShowPresets] = useState<boolean>(true);
  const [pgClearable, setPgClearable] = useState<boolean>(true);
  const [pgTrigger, setPgTrigger] = useState<'popover' | 'inline'>('popover');
  const [pgDisabled, setPgDisabled] = useState<boolean>(false);
  const [pgError, setPgError] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const generateReactCode = () => {
    const props: string[] = [];
    if (pgMode === 'range') props.push('mode="range"');
    if (pgSize !== 'md') props.push(`size="${pgSize}"`);
    if (pgVariant !== 'default') props.push(`variant="${pgVariant}"`);
    if (pg12Hours) props.push('use12Hours');
    if (pgShowSeconds) props.push('showSeconds');
    if (pgMinuteStep !== 1) props.push(`minuteStep={${pgMinuteStep}}`);
    if (pgShowPresets) props.push('presets={BUSINESS_PRESETS}');
    if (!pgClearable) props.push('clearable={false}');
    if (pgDisabled) props.push('disabled');
    if (pgError) props.push(`error\n      errorMessage="${isId ? 'Waktu di luar jam operasional' : 'Time outside business hours'}"`);
    if (pgTrigger === 'inline') props.push('trigger="inline"');

    if (pgMode === 'single') {
      props.push('value={time}');
      props.push('onChange={setTime}');
      return `import { NeuronTimePicker } from 'neudela';
import { useState } from 'react';

export default function MyComponent() {
  const [time, setTime] = useState<string | null>('${pgSingleVal || '10:30 AM'}');

  return (
    <NeuronTimePicker
      label="${isId ? 'Waktu Terjadwal' : 'Scheduled Time'}"
      ${props.join('\n      ')}
    />
  );
}`;
    } else {
      props.push('rangeValue={timeRange}');
      props.push('onRangeChange={setTimeRange}');
      return `import { NeuronTimePicker, TimeRange } from 'neudela';
import { useState } from 'react';

export default function MyComponent() {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startTime: '${pgRangeVal.startTime || '09:00'}',
    endTime: '${pgRangeVal.endTime || '11:30'}'
  });

  return (
    <NeuronTimePicker
      label="${isId ? 'Waktu Terjadwal' : 'Scheduled Time'}"
      ${props.join('\n      ')}
    />
  );
}`;
    }
  };

  const generateVueCode = () => {
    const props: string[] = [];
    if (pgMode === 'range') props.push('mode="range"');
    if (pgSize !== 'md') props.push(`size="${pgSize}"`);
    if (pgVariant !== 'default') props.push(`variant="${pgVariant}"`);
    if (pg12Hours) props.push('use-12-hours');
    if (pgShowSeconds) props.push('show-seconds');
    if (pgMinuteStep !== 1) props.push(`:minute-step="${pgMinuteStep}"`);
    if (pgShowPresets) props.push(':presets="businessPresets"');
    if (!pgClearable) props.push(':clearable="false"');
    if (pgDisabled) props.push('disabled');
    if (pgError) props.push(`error\n    error-message="${isId ? 'Waktu di luar jam operasional' : 'Time outside business hours'}"`);
    if (pgTrigger === 'inline') props.push('trigger="inline"');

    if (pgMode === 'single') {
      return `<script setup>
import { ref } from 'vue';
import { NeuronTimePicker } from 'neudela-vue';

const time = ref('${pgSingleVal || '10:30 AM'}');
</script>

<template>
  <NeuronTimePicker
    v-model="time"
    label="${isId ? 'Waktu Terjadwal' : 'Scheduled Time'}"
    ${props.join('\n    ')}
  />
</template>`;
    } else {
      return `<script setup>
import { ref } from 'vue';
import { NeuronTimePicker } from 'neudela-vue';

const timeRange = ref({
  startTime: '${pgRangeVal.startTime || '09:00'}',
  endTime: '${pgRangeVal.endTime || '11:30'}'
});
</script>

<template>
  <NeuronTimePicker
    v-model:range-value="timeRange"
    label="${isId ? 'Waktu Terjadwal' : 'Scheduled Time'}"
    ${props.join('\n    ')}
  />
</template>`;
    }
  };

  const generateHtmlCode = () => {
    const classes = [
      'neuron-time-picker',
      `neuron-time-picker--${pgTrigger}`,
      `neuron-time-picker--${pgSize}`,
      `neuron-time-picker--${pgVariant}`,
    ];
    if (pgDisabled) classes.push('neuron-time-picker--disabled');
    if (pgError) classes.push('neuron-time-picker--error');

    const displayVal = pgMode === 'single'
      ? (pgSingleVal || '10:30 AM')
      : `${pgRangeVal.startTime || '09:00'} - ${pgRangeVal.endTime || '11:30'}`;

    if (pgTrigger === 'inline') {
      return `<!-- Neudela Time Picker (Inline Mode) -->
<div class="${classes.join(' ')}">
  <label class="neuron-time-picker__label">${isId ? 'Waktu Terjadwal' : 'Scheduled Time'}</label>

  <div class="neuron-time-picker__panel">
    <div class="neuron-time-picker__columns">
      <!-- Hours Column -->
      <div class="neuron-time-picker__column-wrapper">
        <div class="neuron-time-picker__column-header">${isId ? 'Jam' : 'Hour'}</div>
        <div class="neuron-time-picker__column">
          <button class="neuron-time-picker__item">09</button>
          <button class="neuron-time-picker__item neuron-time-picker__item--selected">10</button>
          <button class="neuron-time-picker__item">11</button>
        </div>
      </div>

      <!-- Minutes Column -->
      <div class="neuron-time-picker__column-wrapper">
        <div class="neuron-time-picker__column-header">${isId ? 'Menit' : 'Minute'}</div>
        <div class="neuron-time-picker__column">
          <button class="neuron-time-picker__item">00</button>
          <button class="neuron-time-picker__item neuron-time-picker__item--selected">30</button>
          <button class="neuron-time-picker__item">45</button>
        </div>
      </div>
      ${pgShowSeconds ? `
      <!-- Seconds Column -->
      <div class="neuron-time-picker__column-wrapper">
        <div class="neuron-time-picker__column-header">${isId ? 'Detik' : 'Second'}</div>
        <div class="neuron-time-picker__column">
          <button class="neuron-time-picker__item">00</button>
          <button class="neuron-time-picker__item neuron-time-picker__item--selected">15</button>
          <button class="neuron-time-picker__item">30</button>
        </div>
      </div>` : ''}${pg12Hours ? `
      <!-- Period Column -->
      <div class="neuron-time-picker__column-wrapper neuron-time-picker__column-wrapper--period">
        <div class="neuron-time-picker__column-header">AM/PM</div>
        <div class="neuron-time-picker__column">
          <button class="neuron-time-picker__item neuron-time-picker__item--selected">AM</button>
          <button class="neuron-time-picker__item">PM</button>
        </div>
      </div>` : ''}
    </div>
  </div>
</div>`;
    }

    return `<!-- Neudela Time Picker (Popover Trigger) -->
<div class="${classes.join(' ')}">
  <label class="neuron-time-picker__label">${isId ? 'Waktu Terjadwal' : 'Scheduled Time'}</label>

  <div class="neuron-time-picker__trigger" role="combobox" aria-haspopup="dialog" ${pgDisabled ? 'aria-disabled="true"' : 'tabindex="0"'}>
    <svg class="neuron-time-picker__icon-left" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" stroke-width="2"/>
      <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <span class="neuron-time-picker__value">${displayVal}</span>
    <svg class="neuron-time-picker__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="m6 9 6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  ${pgError ? `\n  <span class="neuron-time-picker__error-msg">${isId ? 'Waktu di luar jam operasional' : 'Time outside business hours'}</span>` : ''}
</div>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateReactCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // ───────────────────────────────────────────────────────────────────────────
  // TAB 1: GUIDELINE
  // ───────────────────────────────────────────────────────────────────────────
  const renderGuideline = () => (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* ── 1. Overview & Key Modes ── */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '1. Ikhtisar & Mode Utama' : '1. Overview & Key Modes'}
        </h2>
        <p className="section-description">
          {isId
            ? 'NeuronTimePicker adalah komponen seleksi waktu tingkat enterprise yang dirancang untuk presisi tinggi, kenyamanan gestur, serta fleksibilitas format. Mendukung mode jam tunggal, rentang durasi kerja, interval langkah menit variabel, hingga format 12 jam (AM/PM) dan 24 jam.'
            : 'NeuronTimePicker is an enterprise-grade time selection component designed for high ergonomics, granular accuracy, and temporal flexibility. It supports single moment capture, duration ranges, customizable minute/second steps, and dual 12h/24h clock systems.'}
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
              <Clock size={18} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                {isId ? 'Mode Seleksi' : 'Selection Modes'}
              </div>
              <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? 'Tunggal & Rentang Waktu' : 'Single & Time Range'}
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
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                {isId ? 'Sistem Format Jam' : 'Clock Systems'}
              </div>
              <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                24-Hour & 12-Hour (AM/PM)
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
                {isId ? 'Interval Langkah (Steps)' : 'Step Intervals'}
              </div>
              <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                1m · 5m · 15m · 30m · {isId ? 'Detik' : 'Sec'}
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
                {isId ? 'Format Presentasi' : 'Presentation Formats'}
              </div>
              <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Popover & Inline Card
              </div>
            </div>
          </div>
        </div>

        {/* Core Mode Layouts Cards Showcase */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
            {isId ? 'Pola Tata Letak Mode Utama' : 'Core Mode Layouts Showcase'}
          </h3>

          {/* Core Mode Layouts Showcase (2 Columns) */}
          <div className="timepicker-overview-grid">
            {/* 1. Single 24-Hour Mode Card */}
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
                    {isId ? '1. Mode Waktu Tunggal (24-Hour)' : '1. Single 24-Hour Mode'}
                  </strong>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        color: '#6366f1',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                      }}
                    >
                      single (24h)
                    </span>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '1px 5px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(16, 185, 129, 0.12)',
                        color: '#10b981',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Default
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {isId
                    ? 'Pengambilan waktu titik tunggal dengan siklus standar 24 jam (00–23) dan menit (00–59), navigasi autoscroll instan "Sekarang", serta tombol aksi konfirmasi.'
                    : 'Single point-in-time capture featuring standard 24-hour cycle (00–23) and minutes (00–59), instant "Now" autoscroll shortcut, and commit actions.'}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  gap: 'var(--space-3)',
                }}
              >
                <NeuronTimePicker
                  mode="single"
                  size="sm"
                  trigger="inline"
                  value={overviewSingleTime}
                  onChange={setOverviewSingleTime}
                  showNowButton={true}
                  showActions={true}
                />
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-bg-surface)',
                    padding: '3px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {isId ? `Nilai aktif: ${overviewSingleTime || '--:--'}` : `Active value: ${overviewSingleTime || '--:--'}`}
                </span>
              </div>
            </div>

            {/* 2. Single 12-Hour AM/PM Mode Card */}
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
                    {isId ? '2. Sistem 12-Jam (AM/PM) & Prasetel' : '2. 12-Hour System (AM/PM) & Presets'}
                  </strong>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}
                  >
                    single (12h)
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {isId
                    ? 'Format jam 12 jam (01–12) dengan pemilih AM/PM terpisah serta chip prasetel waktu bisnis standar untuk kebutuhan aplikasi pasar global.'
                    : '12-hour cycle (01–12) with dedicated AM/PM selector and quick-click business hour preset chips engineered for localized applications.'}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  overflowX: 'auto',
                  gap: 'var(--space-3)',
                }}
              >
                <NeuronTimePicker
                  mode="single"
                  size="sm"
                  trigger="inline"
                  use12Hours={true}
                  presets={BUSINESS_PRESETS}
                  value={overview12hTime}
                  onChange={setOverview12hTime}
                  showNowButton={true}
                  showActions={true}
                />
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-bg-surface)',
                    padding: '3px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {isId ? `Nilai aktif: ${overview12hTime || '--:--'}` : `Active value: ${overview12hTime || '--:--'}`}
                </span>
              </div>
            </div>

            {/* 3. Single with Seconds Precision Card */}
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
                    {isId ? '3. Presisi Detik (Seconds Precision)' : '3. High-Precision Seconds Mode'}
                  </strong>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(236, 72, 153, 0.12)',
                      color: '#ec4899',
                      border: '1px solid rgba(236, 72, 153, 0.2)',
                    }}
                  >
                    {isId ? 'single (+ detik)' : 'single (+ sec)'}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {isId
                    ? 'Tiga kolom bergulir simultan (Jam, Menit, Detik 00–59) untuk kebutuhan pencatatan log audit finansial, timestamp transaksi presisi tinggi, dan telemetri server.'
                    : 'Three simultaneous scrollable columns (Hours, Minutes, Seconds 00–59) engineered for financial audit logging, transaction timestamps, and server telemetry.'}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  overflowX: 'auto',
                  gap: 'var(--space-3)',
                }}
              >
                <NeuronTimePicker
                  mode="single"
                  size="sm"
                  trigger="inline"
                  showSeconds={true}
                  value={overviewSecondsTime}
                  onChange={setOverviewSecondsTime}
                  showNowButton={true}
                  showActions={true}
                />
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-bg-surface)',
                    padding: '3px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {isId ? `Nilai aktif: ${overviewSecondsTime || '--:--:--'}` : `Active value: ${overviewSecondsTime || '--:--:--'}`}
                </span>
              </div>
            </div>

            {/* 4. Time Range Mode Card */}
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
                    {isId ? '4. Mode Rentang Waktu (Time Range)' : '4. Time Range Mode'}
                  </strong>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(223, 126, 48, 0.12)',
                      color: 'var(--brand-600)',
                      border: '1px solid rgba(223, 126, 48, 0.25)',
                    }}
                  >
                    range
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {isId
                    ? 'Pemilihan rentang durasi dengan tab Waktu Mulai (Start) dan Selesai (End) terpadu dalam satu panel ringkas, ideal untuk reservasi ruang pertemuan dan shift operasional.'
                    : 'Duration selection with dedicated Start and End time selectors in a cohesive view, engineered for room reservations and team scheduling.'}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  gap: 'var(--space-3)',
                }}
              >
                <NeuronTimePicker
                  mode="range"
                  size="sm"
                  trigger="inline"
                  rangeValue={overviewRangeTime}
                  onRangeChange={setOverviewRangeTime}
                  showActions={true}
                />
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-bg-surface)',
                    padding: '3px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {isId
                    ? `Rentang: ${overviewRangeTime.startTime || '--:--'} — ${overviewRangeTime.endTime || '--:--'}`
                    : `Range: ${overviewRangeTime.startTime || '--:--'} — ${overviewRangeTime.endTime || '--:--'}`}
                </span>
              </div>
            </div>

            {/* 5. Inline Surface Panel Card (Spans 2 columns) */}
            <div
              style={{
                gridColumn: '1 / -1',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-5)',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ fontSize: 'var(--fs-text-md)', color: 'var(--color-text-primary)' }}>
                      {isId ? '5. Panel Tersemat Permukaan (Inline Surface Panel)' : '5. Inline Surface Panel'}
                    </strong>
                    <code style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', background: 'var(--color-bg-subtle)', padding: '1px 6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                      trigger="inline"
                    </code>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(139, 92, 246, 0.12)',
                      color: '#8b5cf6',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                    }}
                  >
                    inline
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0', lineHeight: 1.6 }}>
                  {isId
                    ? 'Panel pemilih waktu terpasang permanen langsung pada permukaan kontainer tanpa memerlukan overlay popover dropdown. Bebas masalah z-index dan sangat ideal untuk panel sidebar jadwal, layar kiosk sentuh mandiri, dan widget dashboard operasional.'
                    : 'Directly mounted time picker panel embedded into a card or form container without popover dropdown overlays, ideal for schedule sidebars, self-service kiosks, and dashboard calendar widgets.'}
                </p>

                {/* Feature highlight tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'var(--space-4)' }}>
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    ✨ {isId ? 'Bebas Tabrakan Z-Index' : 'Zero Popover Z-Index Conflicts'}
                  </span>
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    🖥️ {isId ? 'Optimal untuk Layar Kios & Kasir' : 'Kiosk & POS Terminal Ready'}
                  </span>
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    📐 {isId ? 'Integrasi Kontainer Alami' : 'Native Layout Embedding'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                    {isId ? 'Nilai tersimpan saat ini:' : 'Currently selected value:'}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono, monospace)',
                      color: '#8b5cf6',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      padding: '2px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                    }}
                  >
                    {overviewInlineTime || '--:--'}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  gap: 'var(--space-3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '280px', padding: '6px 12px', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {isId ? 'Panel Kios Layanan' : 'Kiosk Service Panel'}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#8b5cf6', fontFamily: 'var(--font-mono, monospace)' }}>
                    {overviewInlineTime || '--:--'}
                  </span>
                </div>
                <NeuronTimePicker
                  mode="single"
                  size="sm"
                  trigger="inline"
                  value={overviewInlineTime}
                  onChange={setOverviewInlineTime}
                  showNowButton={true}
                  showActions={false}
                />
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-bg-surface)',
                    padding: '3px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {isId ? `Nilai tersemat: ${overviewInlineTime || '--:--'}` : `Embedded value: ${overviewInlineTime || '--:--'}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Specification Matrix */}
        <div className="badge-spec-card">
          <div className="badge-spec-header">
            <div>
              <div className="badge-spec-title">
                {isId ? 'Matriks Spesifikasi Mode Time Picker' : 'Time Picker Master Specification Matrix'}
              </div>
              <div className="badge-spec-subtitle">
                {isId
                  ? '5 Konfigurasi Mode × 2 Sistem Jam — Ringkasan terstruktur kapabilitas, kolom bergulir, format, dan perilaku aksi'
                  : '5 Mode Configurations × 2 Clock Systems — Structured summary of capabilities, scroll columns, formats, and action behaviors'}
              </div>
            </div>

            <div className="badge-spec-filter-group">
              <button
                type="button"
                className={`badge-spec-filter-btn ${matrixFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setMatrixFilter('all')}
              >
                {isId ? 'Semua (5)' : 'All (5)'}
              </button>
              <button
                type="button"
                className={`badge-spec-filter-btn ${matrixFilter === 'single' ? 'is-active' : ''}`}
                onClick={() => setMatrixFilter('single')}
              >
                Single (3)
              </button>
              <button
                type="button"
                className={`badge-spec-filter-btn ${matrixFilter === 'range' ? 'is-active' : ''}`}
                onClick={() => setMatrixFilter('range')}
              >
                Range (1)
              </button>
              <button
                type="button"
                className={`badge-spec-filter-btn ${matrixFilter === 'inline' ? 'is-active' : ''}`}
                onClick={() => setMatrixFilter('inline')}
              >
                Inline (1)
              </button>
            </div>
          </div>

          {/* Master Matrix Table */}
          <div className="badge-spec-table-wrap">
            <table className="badge-matrix-table" style={{ minWidth: '100%', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '14%', padding: '10px 12px' }}>{isId ? 'Mode / Varian' : 'Mode / Variant'}</th>
                  <th style={{ width: '14%', padding: '10px 12px' }}>{isId ? 'Sistem Jam & Format' : 'Clock & Format'}</th>
                  <th style={{ width: '18%', padding: '10px 12px' }}>{isId ? 'Kolom Bergulir' : 'Scroll Columns'}</th>
                  <th style={{ width: '28%', padding: '10px 12px' }}>{isId ? 'Skenario Penggunaan Utama' : 'Primary Use Cases'}</th>
                  <th style={{ width: '13%', padding: '10px 12px' }}>{isId ? 'Interval & Prasetel' : 'Steps & Presets'}</th>
                  <th style={{ width: '13%', padding: '10px 12px' }}>{isId ? 'Aksi Footer' : 'Footer Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. Single 24h */}
                {(matrixFilter === 'all' || matrixFilter === 'single') && (
                  <tr>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontFamily: 'var(--font-mono, monospace)',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: 'rgba(99, 102, 241, 0.1)',
                              color: '#6366f1',
                              border: '1px solid rgba(99, 102, 241, 0.2)',
                            }}
                          >
                            single (24h)
                          </span>
                          <span
                            style={{
                              fontSize: '9.5px',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              padding: '1px 5px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'rgba(16, 185, 129, 0.12)',
                              color: '#10b981',
                              letterSpacing: '0.04em',
                            }}
                          >
                            Default
                          </span>
                        </div>
                        <code style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>mode="single"</code>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          24-Hour
                        </span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <code style={{ fontSize: '10.5px', padding: '1px 5px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                            HH:mm
                          </code>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>14:30</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Jam (00–23)' : 'Hour (00–23)'}
                        </span>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Menit (00–59)' : 'Minute (00–59)'}
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45, whiteSpace: 'normal' }}>
                        {isId
                          ? 'Jam janji temu, absensi kehadiran, dan entri waktu form standar aplikasi enterprise.'
                          : 'Appointment bookings, attendance punch, and standard enterprise form time entries.'}
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
                          1m · 5m · 15m · 30m
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>
                          {isId ? 'Prasetel opsional' : 'Optional presets'}
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          {isId ? 'Sekarang' : 'Now'}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          {isId ? 'Batal' : 'Cancel'}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(223, 126, 48, 0.12)', border: '1px solid rgba(223, 126, 48, 0.25)', color: 'var(--brand-600)' }}>
                          {isId ? 'Selesai' : 'OK'}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* 2. Single 12h AM/PM */}
                {(matrixFilter === 'all' || matrixFilter === 'single') && (
                  <tr>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(16, 185, 129, 0.12)',
                            color: '#10b981',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                          }}
                        >
                          single (12h)
                        </span>
                        <code style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>use12Hours</code>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          12-Hour (AM/PM)
                        </span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <code style={{ fontSize: '10.5px', padding: '1px 5px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                            hh:mm A
                          </code>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>02:30 PM</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Jam (01–12)' : 'Hour (01–12)'}
                        </span>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Menit (00–59)' : 'Minute (00–59)'}
                        </span>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#10b981', fontWeight: 600 }}>
                          AM / PM
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45, whiteSpace: 'normal' }}>
                        {isId
                          ? 'Aplikasi pasar global/US, jadwal penerbangan, reservasi tamu hotel, dan antarmuka multibahasa.'
                          : 'Global and US market applications, flight schedules, hotel guest bookings, and localized UIs.'}
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
                          1m · 5m · 15m · 30m
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>
                          {isId ? 'Prasetel opsional' : 'Optional presets'}
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          {isId ? 'Sekarang' : 'Now'}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          {isId ? 'Batal' : 'Cancel'}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(223, 126, 48, 0.12)', border: '1px solid rgba(223, 126, 48, 0.25)', color: 'var(--brand-600)' }}>
                          {isId ? 'Selesai' : 'OK'}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* 3. Single with Seconds */}
                {(matrixFilter === 'all' || matrixFilter === 'single') && (
                  <tr>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(236, 72, 153, 0.12)',
                            color: '#ec4899',
                            border: '1px solid rgba(236, 72, 153, 0.2)',
                          }}
                        >
                          {isId ? 'single (+ detik)' : 'single (+ sec)'}
                        </span>
                        <code style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>showSeconds</code>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {isId ? '24h / 12h + Detik' : '24h / 12h + Seconds'}
                        </span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <code style={{ fontSize: '10.5px', padding: '1px 5px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                            HH:mm:ss
                          </code>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>14:30:45</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Jam' : 'Hour'}
                        </span>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Menit' : 'Minute'}
                        </span>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.25)', color: '#ec4899', fontWeight: 600 }}>
                          {isId ? 'Detik (00–59)' : 'Second (00–59)'}
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45, whiteSpace: 'normal' }}>
                        {isId
                          ? 'Pencatatan log audit finansial, timestamp transaksi presisi tinggi, dan timer telemetri server.'
                          : 'Financial audit logging, high-precision transaction timestamps, and server telemetry timers.'}
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
                          {isId ? 'Detik: 1s · 5s · 10s' : 'Seconds: 1s · 5s · 10s'}
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>
                          {isId ? 'Presisi audit' : 'High precision'}
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          {isId ? 'Sekarang' : 'Now'}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          {isId ? 'Batal' : 'Cancel'}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(223, 126, 48, 0.12)', border: '1px solid rgba(223, 126, 48, 0.25)', color: 'var(--brand-600)' }}>
                          {isId ? 'Selesai' : 'OK'}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* 4. Range */}
                {(matrixFilter === 'all' || matrixFilter === 'range') && (
                  <tr>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(223, 126, 48, 0.12)',
                            color: 'var(--brand-600)',
                            border: '1px solid rgba(223, 126, 48, 0.25)',
                          }}
                        >
                          range
                        </span>
                        <code style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>mode="range"</code>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {isId ? 'Rentang Waktu' : 'Time Range'}
                        </span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <code style={{ fontSize: '10.5px', padding: '1px 5px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                            Range
                          </code>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>09:00 — 17:00</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Tab Mulai' : 'Start Tab'}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>↔</span>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Tab Selesai' : 'End Tab'}
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45, whiteSpace: 'normal' }}>
                        {isId
                          ? 'Reservasi ruang pertemuan, rotasi shift kerja, durasi sewa fasilitas, dan batas jendela operasional.'
                          : 'Meeting room reservations, shift scheduling, rental durations, and operational time windows.'}
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
                          1m · 5m · 15m · 30m
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>
                          {isId ? 'Navigasi rentang tab' : 'Integrated range tabs'}
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          {isId ? 'Batal' : 'Cancel'}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(223, 126, 48, 0.12)', border: '1px solid rgba(223, 126, 48, 0.25)', color: 'var(--brand-600)' }}>
                          {isId ? 'Selesai' : 'OK'}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* 5. Inline */}
                {(matrixFilter === 'all' || matrixFilter === 'inline') && (
                  <tr>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(139, 92, 246, 0.12)',
                            color: '#8b5cf6',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                          }}
                        >
                          inline
                        </span>
                        <code style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>trigger="inline"</code>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {isId ? 'Panel Tersemat' : 'Surface Panel'}
                        </span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <code style={{ fontSize: '10.5px', padding: '1px 5px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                            Surface
                          </code>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Mounted</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Tersemat langsung di container' : 'Directly embedded in panel'}
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45, whiteSpace: 'normal' }}>
                        {isId
                          ? 'Panel konfigurasi sidebar jadwal, kiosk layar sentuh interaktif, widget kalender dashboard.'
                          : 'Embedded sidebars, schedule configuration panels, touch kiosks, and dashboard widgets.'}
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {isId ? 'Didukung penuh' : 'Fully supported'}
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>
                          {isId ? 'Tanpa overlay dropdown' : 'No popover overlay'}
                        </span>
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          {isId ? 'Aksi terintegrasi' : 'Embedded actions'}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. Clock Systems: 24-Hour vs 12-Hour */}
      <div className="section-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div>
            <h2 className="section-title" style={{ margin: 0 }}>
              {isId ? '2. Sistem Jam (24-Hour vs 12-Hour Format)' : '2. Clock Systems (24-Hour vs 12-Hour Format)'}
            </h2>
            <p className="section-description" style={{ marginTop: 'var(--space-2)' }}>
              {isId
                ? 'NeuronTimePicker mendukung penuh standar waktu 24 jam (standar industri dan enterprise) serta format 12 jam dengan pemilih AM/PM.'
                : 'Comprehensive support for 24-hour enterprise ISO notation and 12-hour civilian clock formats with integrated AM/PM toggle.'}
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 'var(--space-6)',
          marginTop: 'var(--space-6)',
        }}>
          {/* 24-Hour Card */}
          <div style={{
            background: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--space-5)',
            transition: 'all 0.2s ease',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Format 24 Jam' : '24-Hour Clock System'}
                    </h3>
                    <code style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-mono)',
                    }}>HH:mm</code>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {isId
                      ? 'Standar industri dan logistik tanpa ambiguitas waktu, mengadopsi ISO-8601 (rentang 00:00 - 23:59).'
                      : 'Unambiguous industrial & enterprise standard adhering to ISO-8601 notation (00:00 to 23:59).'}
                  </p>
                </div>
                <NeuronBadge size="sm" variant="brand">24-Hour</NeuronBadge>
              </div>

              {/* Form Input Container */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}>
                <div style={{ width: '100%', maxWidth: '280px' }}>
                  <NeuronTimePicker
                    value={demo24h}
                    onChange={setDemo24h}
                    use12Hours={false}
                    label={isId ? 'Waktu Pengiriman (WIB)' : 'Freight Dispatch Time'}
                    placeholder="HH:mm"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--space-3)',
                  borderTop: '1px dashed var(--color-border)',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--brand-500)' }} />
                    {isId ? 'Mode 24 Jam Aktif' : '24-Hour Mode Active'}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span>{isId ? 'Nilai:' : 'Value:'}</span>
                    <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-600)', background: 'var(--color-bg-subtle)', padding: '2px 6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                      {demo24h || '--:--'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 12-Hour Card */}
          <div style={{
            background: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--space-5)',
            transition: 'all 0.2s ease',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Format 12 Jam' : '12-Hour Clock System'}
                    </h3>
                    <code style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-mono)',
                    }}>hh:mm a</code>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {isId
                      ? 'Format ramah pengguna dengan tombol AM/PM untuk aplikasi reservasi, kalender, dan layanan konsumen.'
                      : 'Civilian-friendly schedule format featuring dedicated AM/PM selector columns for appointments & hospitality.'}
                  </p>
                </div>
                <NeuronBadge size="sm" variant="neutral">12-Hour AM/PM</NeuronBadge>
              </div>

              {/* Form Input Container */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}>
                <div style={{ width: '100%', maxWidth: '280px' }}>
                  <NeuronTimePicker
                    value={demo12h}
                    onChange={setDemo12h}
                    use12Hours={true}
                    label={isId ? 'Waktu Janji Temu' : 'Consultation Slot'}
                    placeholder="hh:mm a"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--space-3)',
                  borderTop: '1px dashed var(--color-border)',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-text-tertiary)' }} />
                    {isId ? 'Mode 12 Jam (AM/PM) Aktif' : '12-Hour AM/PM Active'}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span>{isId ? 'Nilai:' : 'Value:'}</span>
                    <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-600)', background: 'var(--color-bg-subtle)', padding: '2px 6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                      {demo12h || '--:-- --'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Granular Precision: Seconds & Minute Steps */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '3. Presisi Waktu & Interval Langkah (Steps)' : '3. Granular Precision & Step Intervals'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Atur interval menit untuk membatasi opsi waktu (misal kelipatan 15 atau 30 menit) atau aktifkan detik untuk kebutuhan audit yang ketat.'
            : 'Configure step intervals to constrain selection options (e.g. 15-minute meeting blocks) or enable seconds for high-precision audit trails.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
          {/* Step 15 Min */}
          <div style={{
            background: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
              {isId ? 'Interval 15 Menit (minuteStep={15})' : '15-Minute Blocks (minuteStep={15})'}
            </h3>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Meringkas pilihan menit menjadi :00, :15, :30, dan :45 untuk penjadwalan efisien.' : 'Limits minute column to :00, :15, :30, and :45 for rapid meeting slot picking.'}
            </p>
            <div style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}>
              <NeuronTimePicker
                value={demoStep15}
                onChange={setDemoStep15}
                minuteStep={15}
                label={isId ? 'Jadwal Rapat' : 'Meeting Schedule'}
              />
            </div>
          </div>

          {/* With Seconds */}
          <div style={{
            background: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
              {isId ? 'Presisi Detik (showSeconds)' : 'Seconds Precision (showSeconds)'}
            </h3>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Menambahkan kolom ketiga untuk pencatatan presisi tinggi seperti absensi atau log server.' : 'Adds a 3rd column for high-accuracy timestamping, shifts, and server telemetries.'}
            </p>
            <div style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}>
              <NeuronTimePicker
                value={demoSeconds}
                onChange={setDemoSeconds}
                showSeconds
                label={isId ? 'Timestamp Kejadian' : 'Event Timestamp'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Range Selection (Start & End Time) */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '4. Pemilihan Rentang Waktu (Time Range)' : '4. Time Range & Duration Selection'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Mode rentang (mode="range") memungkinkan pengguna menentukan waktu mulai dan waktu selesai dalam satu input terpadu.'
            : 'Time range mode enables selecting start and end durations seamlessly within a single unified control.'}
        </p>

        <div style={{
          background: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          marginTop: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                {isId ? 'Reservasi Jam Operasional Kantor' : 'Office Operating Hours Duration'}
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                {isId ? 'Menggunakan tab internal untuk beralih antara waktu mulai dan waktu selesai.' : 'Uses contextual tabs inside popover to toggle between start and end time columns.'}
              </p>
            </div>
            <NeuronBadge size="sm" variant="brand">mode="range"</NeuronBadge>
          </div>

          <div style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}>
            <NeuronTimePicker
              mode="range"
              rangeValue={demoRange}
              onRangeChange={setDemoRange}
              minuteStep={15}
              label={isId ? 'Jam Operasional Toko' : 'Store Working Hours'}
            />
            <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
              {isId
                ? `Mulai: ${demoRange.startTime || '--:--'} | Selesai: ${demoRange.endTime || '--:--'}`
                : `Start: ${demoRange.startTime || '--:--'} | End: ${demoRange.endTime || '--:--'}`}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Sizing & Variants */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '5. Skala Ukuran & Varian Visual' : '5. Sizing Scales & Visual Variants'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Tersedia dalam 3 ukuran proporsional (Small 32px, Medium 38px, Large 44px) dan varian Default, Bordered, serta Flat.'
            : 'Available across 3 proportional scales (SM 32px, MD 38px, LG 44px) and 3 style variants to fit any density.'}
        </p>

        {/* Size Matrix */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-4)',
          marginTop: 'var(--space-6)',
        }}>
          {/* Small */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px' }}>Small (32px)</strong>
              <code>size="sm"</code>
            </div>
            <NeuronTimePicker size="sm" defaultValue="09:00" label={isId ? 'Waktu Mulai (12px)' : 'Start Time (12px)'} />
            <p style={{ margin: '8px 0 0', fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Tabel densitas tinggi, toolbar ringkas' : 'Dense data grids, compact toolbars'}
            </p>
          </div>

          {/* Medium */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px' }}>Medium (38px)</strong>
              <code>size="md"</code>
            </div>
            <NeuronTimePicker size="md" defaultValue="14:30" label={isId ? 'Waktu Sesi (13px)' : 'Session Time (13px)'} />
            <p style={{ margin: '8px 0 0', fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Standar default untuk sebagian besar formulir web' : 'Default standard across web forms'}
            </p>
          </div>

          {/* Large */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px' }}>Large (44px)</strong>
              <code>size="lg"</code>
            </div>
            <NeuronTimePicker size="lg" defaultValue="18:45" label={isId ? 'Waktu Reservasi (13px)' : 'Booking Time (13px)'} />
            <p style={{ margin: '8px 0 0', fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Target sentuh mobile, modal hero checkout' : 'Mobile touch targets, hero dialogs'}
            </p>
          </div>
        </div>
      </div>

      {/* 6. Component States Matrix */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '6. Matriks Status Komponen (States)' : '6. Component States Matrix'}
        </h2>
        <p className="section-description">
          {isId
            ? 'NeuronTimePicker menangani umpan balik interaktif untuk status kosong, terisi, pesan kesalahan (error validation), dan nonaktif (disabled).'
            : 'Handles states across initial empty, filled, validation errors, and disabled pointer locks.'}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 'var(--space-4)',
          marginTop: 'var(--space-6)',
        }}>
          {/* Default / Empty */}
          <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
              Default (Empty)
            </span>
            <div style={{ marginTop: '8px' }}>
              <NeuronTimePicker placeholder={isId ? 'Pilih waktu...' : 'Select time...'} />
            </div>
          </div>

          {/* Filled */}
          <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
              Filled / Clearable
            </span>
            <div style={{ marginTop: '8px' }}>
              <NeuronTimePicker defaultValue="13:45" />
            </div>
          </div>

          {/* Error */}
          <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-error, #ef4444)', fontWeight: 600 }}>
              Error State
            </span>
            <div style={{ marginTop: '8px' }}>
              <NeuronTimePicker
                defaultValue="23:30"
                error
                errorMessage={isId ? 'Di luar jam operasional toko' : 'Outside operational window'}
              />
            </div>
          </div>

          {/* Disabled */}
          <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
              Disabled
            </span>
            <div style={{ marginTop: '8px' }}>
              <NeuronTimePicker defaultValue="10:00" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* 7. Do's and Don'ts */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '7. Panduan Penggunaan (Do & Don\'t)' : '7. Best Practices (Do & Don\'t)'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Prinsip desain penting untuk menjaga kenyamanan interaksi dan kejelasan interpretasi waktu pada antarmuka aplikasi.'
            : 'Essential ergonomics and clarity rules for deploying time pickers in user interfaces.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
          <RuleCard type="do">
            <strong>{isId ? 'Gunakan Format 24 Jam untuk Aplikasi Enterprise' : 'Use 24-Hour Format for Enterprise Apps'}</strong>
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId
                ? 'Gunakan format 24 jam pada dashboard logistik, operasional armada, dan pencatatan audit Indonesia untuk menghindari kesalahan tafsir siang/malam.'
                : 'Default to 24-hour time in enterprise portals, fleet telematics, and audit logs to prevent AM/PM misinterpretations.'}
            </p>
          </RuleCard>

          <RuleCard type="dont">
            <strong>{isId ? 'Jangan Tampilkan Detik Jika Tidak Relevan' : 'Don\'t Show Seconds Unnecessarily'}</strong>
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId
                ? 'Hindari menampilkan kolom detik untuk janji temu biasa atau jam buka restoran karena hanya menambah beban kognitif pengguna.'
                : 'Avoid displaying seconds columns for routine appointment booking or delivery slots where minute precision is sufficient.'}
            </p>
          </RuleCard>

          <RuleCard type="do">
            <strong>{isId ? 'Sediakan Prasetel Cepat (Presets) untuk Jam Populer' : 'Provide Quick Presets for Common Slots'}</strong>
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId
                ? 'Sertakan tombol pintas seperti "Sekarang", "09:00", atau "12:00" untuk mempercepat pengisian data berulang.'
                : 'Include quick preset chips for common business milestones (09:00, 12:00, 18:00) to cut interaction time.'}
            </p>
          </RuleCard>

          <RuleCard type="dont">
            <strong>{isId ? 'Jangan Menggunakan Input Teks Bebas Tanpa Validasi' : 'Don\'t Rely on Unmasked Free Text'}</strong>
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId
                ? 'Jangan biarkan pengguna mengetik string sembarang tanpa format terstruktur untuk mencegah galat waktu tidak valid.'
                : 'Avoid raw unformatted text inputs that lead to malformed timestamps and parsing crashes.'}
            </p>
          </RuleCard>
        </div>
      </div>

      {/* 8. Accessibility & Keyboard Navigation */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '8. Aksesibilitas & Navigasi Keyboard' : '8. Accessibility & Keyboard Navigation'}
        </h2>
        <p className="section-description">
          {isId
            ? 'NeuronTimePicker memenuhi standar WAI-ARIA untuk komponen combobox dialog dengan manajemen fokus otomatis dan pintasan tombol keyboard.'
            : 'Engineered in compliance with WAI-ARIA combobox patterns featuring focus restoration and directional arrow controls.'}
        </p>

        <div className="api-table-wrapper" style={{ marginTop: 'var(--space-4)' }}>
          <table className="api-table">
            <thead>
              <tr>
                <th>{isId ? 'Tombol Keyboard' : 'Key'}</th>
                <th>{isId ? 'Konteks Fokus' : 'Focus Context'}</th>
                <th>{isId ? 'Perilaku & Tindakan' : 'Action & Behavior'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Enter / Spasi</code></td>
                <td>{isId ? 'Trigger Input' : 'Trigger Input'}</td>
                <td>{isId ? 'Membuka popover panel pemilihan waktu.' : 'Opens time picker popover panel.'}</td>
              </tr>
              <tr>
                <td><code>Escape</code></td>
                <td>{isId ? 'Panel Popover Terbuka' : 'Open Popover Panel'}</td>
                <td>{isId ? 'Menutup popover dan mengembalikan fokus ke trigger input.' : 'Closes popover and returns focus to trigger box.'}</td>
              </tr>
              <tr>
                <td><code>Tab / Shift + Tab</code></td>
                <td>{isId ? 'Dalam Panel Kolom' : 'Inside Columns'}</td>
                <td>{isId ? 'Pindah fokus antar kolom (Jam → Menit → Detik → Tombol Selesai).' : 'Traverses focus across column containers and action buttons.'}</td>
              </tr>
              <tr>
                <td><code>Arrow Up / Down</code></td>
                <td>{isId ? 'Kolom Waktu' : 'Time Column List'}</td>
                <td>{isId ? 'Bergulir dan menavigasi angka-angka pada kolom yang aktif.' : 'Scrolls up or down across time digits within active column.'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ───────────────────────────────────────────────────────────────────────────
  // TAB 2: PLAYBOOK
  // ───────────────────────────────────────────────────────────────────────────
  const renderPlaybook = () => (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* 1. Interactive Playground & Code Generator */}
      <div className="section-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 className="section-title" style={{ margin: 0 }}>
              {isId ? 'Interactive Playground & Code Generator' : 'Interactive Playground & Code Generator'}
            </h2>
            <p className="section-description" style={{ margin: '4px 0 0' }}>
              {isId
                ? 'Konfigurasikan properti waktu secara interaktif dan salin kode JSX siap pakai untuk aplikasi Anda.'
                : 'Tweak time picker props dynamically and grab copy-ready React JSX for your application.'}
            </p>
          </div>
          <NeuronButton
            size="sm"
            variant="secondary"
            onClick={handleCopyCode}
            leadingIcon={copiedCode ? <Check size={14} /> : <Copy size={14} />}
          >
            {copiedCode ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin Kode' : 'Copy JSX')}
          </NeuronButton>
        </div>

        <Playground
          preview={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '260px',
              width: '100%',
              padding: '24px',
            }}>
              <NeuronTimePicker
                mode={pgMode}
                size={pgSize}
                variant={pgVariant}
                use12Hours={pg12Hours}
                showSeconds={pgShowSeconds}
                minuteStep={pgMinuteStep}
                clearable={pgClearable}
                disabled={pgDisabled}
                error={pgError}
                errorMessage={pgError ? (isId ? 'Waktu di luar jam operasional' : 'Time outside business hours') : undefined}
                presets={pgShowPresets ? BUSINESS_PRESETS : undefined}
                trigger={pgTrigger}
                value={pgSingleVal}
                onChange={setPgSingleVal}
                rangeValue={pgRangeVal}
                onRangeChange={setPgRangeVal}
                label={isId ? 'Waktu Terjadwal' : 'Scheduled Time'}
                helperText={isId ? 'Pilih slot waktu sesuai ketersediaan tim' : 'Select slot matching team availability'}
              />
            </div>
          }
          codeTemplates={{
            react: generateReactCode(),
            vue: generateVueCode(),
            html: generateHtmlCode(),
          }}
        >
          {/* Controls Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Mode */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>
                Mode
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['single', 'range'] as TimePickerMode[]).map(m => (
                  <NeuronButton
                    key={m}
                    size="xs"
                    variant="secondary"
                    active={pgMode === m}
                    onClick={() => setPgMode(m)}
                    style={{ flex: 1 }}
                  >
                    {m === 'single' ? 'Single' : 'Range'}
                  </NeuronButton>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>
                {isId ? 'Ukuran' : 'Size'}
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['sm', 'md', 'lg'] as TimePickerSize[]).map(s => (
                  <NeuronButton
                    key={s}
                    size="xs"
                    variant="secondary"
                    active={pgSize === s}
                    onClick={() => setPgSize(s)}
                    style={{ flex: 1 }}
                  >
                    {s.toUpperCase()}
                  </NeuronButton>
                ))}
              </div>
            </div>

            {/* Variant */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>
                {isId ? 'Varian' : 'Variant'}
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['default', 'bordered', 'flat'] as TimePickerVariant[]).map(v => (
                  <NeuronButton
                    key={v}
                    size="xs"
                    variant="secondary"
                    active={pgVariant === v}
                    onClick={() => setPgVariant(v)}
                    style={{ flex: 1, padding: '0 4px', textTransform: 'capitalize' }}
                  >
                    {v}
                  </NeuronButton>
                ))}
              </div>
            </div>

            {/* Format & Clock Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
              <NeuronCheckbox
                size="sm"
                variant="brand"
                checked={pg12Hours}
                onChange={setPg12Hours}
                label={isId ? 'Gunakan Format 12 Jam (AM/PM)' : 'Use 12-Hour (AM/PM)'}
              />
              <NeuronCheckbox
                size="sm"
                variant="brand"
                checked={pgShowSeconds}
                onChange={setPgShowSeconds}
                label={isId ? 'Tampilkan Kolom Detik' : 'Show Seconds Column'}
              />
              <NeuronCheckbox
                size="sm"
                variant="brand"
                checked={pgShowPresets}
                onChange={setPgShowPresets}
                label={isId ? 'Tampilkan Tombol Prasetel' : 'Show Quick Presets'}
              />
              <NeuronCheckbox
                size="sm"
                variant="brand"
                checked={pgClearable}
                onChange={setPgClearable}
                label={isId ? 'Tombol Hapus (Clearable)' : 'Clearable'}
              />
            </div>

            {/* Minute Step */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>
                {isId ? 'Interval Menit (Step)' : 'Minute Step'}
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 5, 15, 30].map(step => (
                  <NeuronButton
                    key={step}
                    size="xs"
                    variant="secondary"
                    active={pgMinuteStep === step}
                    onClick={() => setPgMinuteStep(step)}
                    style={{ flex: 1 }}
                  >
                    {step}m
                  </NeuronButton>
                ))}
              </div>
            </div>

            {/* State Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
              <NeuronCheckbox
                size="sm"
                variant="brand"
                checked={pgError}
                onChange={setPgError}
                label={isId ? 'Status Galat (Error)' : 'Error State'}
              />
              <NeuronCheckbox
                size="sm"
                variant="brand"
                checked={pgDisabled}
                onChange={setPgDisabled}
                label={isId ? 'Status Nonaktif (Disabled)' : 'Disabled State'}
              />
              <NeuronCheckbox
                size="sm"
                variant="brand"
                checked={pgTrigger === 'inline'}
                onChange={checked => setPgTrigger(checked ? 'inline' : 'popover')}
                label={isId ? 'Mode Tampilan Inline' : 'Inline Trigger Mode'}
              />
            </div>
          </div>
        </Playground>
      </div>

      {/* 2. Real-World Use Case Scenarios */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '2. Skenario Penggunaan Nyata (Real-World Patterns)' : '2. Real-World Application Scenarios'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Tiga implementasi siap pakai untuk kasus penggunaan umum: Reservasi Ruang Rapat, Pemesanan Meja Restoran, dan Sistem Presensi Karyawan.'
            : 'Production-ready composition patterns for Meeting Schedulers, Restaurant Bookings, and Employee Time-Card Clocks.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
          {/* Pattern A: Meeting Room Schedulers */}
          <div style={{
            background: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <Building size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                  {isId ? 'Reservasi Ruang Rapat' : 'Meeting Room Scheduler'}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Rentang waktu dengan interval 15 menit' : 'Time range with 15-min intervals'}
                </span>
              </div>
            </div>

            <div style={{ background: 'var(--color-bg-surface)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NeuronTimePicker
                mode="range"
                rangeValue={meetingTime}
                onRangeChange={setMeetingTime}
                minuteStep={15}
                label={isId ? 'Waktu Penggunaan Ruangan' : 'Room Usage Duration'}
                helperText={isId ? 'Maksimal durasi rapat 2 jam per sesi' : 'Maximum 2 hours per session'}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--color-text-secondary)', borderTop: '1px dashed var(--color-border)', paddingTop: '8px' }}>
                <span>{isId ? 'Ruang: Executive 4A' : 'Room: Executive 4A'}</span>
                <NeuronBadge size="sm" variant="success">{isId ? 'Tersedia' : 'Available'}</NeuronBadge>
              </div>
            </div>
          </div>

          {/* Pattern B: Restaurant Reservation */}
          <div style={{
            background: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <Coffee size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                  {isId ? 'Reservasi Meja Restoran' : 'Restaurant Table Booking'}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Prasetel jam makan siang & makan malam' : 'Presets for lunch & dinner seatings'}
                </span>
              </div>
            </div>

            <div style={{ background: 'var(--color-bg-surface)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NeuronTimePicker
                value={restaurantTime}
                onChange={setRestaurantTime}
                presets={[
                  { label: 'Lunch (12:30)', value: '12:30' },
                  { label: 'Dinner 1 (18:30)', value: '18:30' },
                  { label: 'Dinner 2 (20:00)', value: '20:00' },
                ]}
                minuteStep={15}
                label={isId ? 'Waktu Kedatangan Tamu' : 'Guest Arrival Time'}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--color-text-secondary)', borderTop: '1px dashed var(--color-border)', paddingTop: '8px' }}>
                <span>{isId ? 'Meja: 4 Orang (Outdoor)' : 'Table: 4 Guests (Outdoor)'}</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{restaurantTime || '--:--'}</span>
              </div>
            </div>
          </div>

          {/* Pattern C: Shift & Attendance Clock */}
          <div style={{
            background: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <Briefcase size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                  {isId ? 'Presensi Karyawan & Detik' : 'Shift Clock-In & Audit'}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Presisi detik untuk validasi jam masuk' : 'Precise second timestamp logging'}
                </span>
              </div>
            </div>

            <div style={{ background: 'var(--color-bg-surface)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NeuronTimePicker
                value={punchTime}
                onChange={setPunchTime}
                showSeconds
                presets={SHIFT_PRESETS}
                label={isId ? 'Waktu Masuk Kantor (Punch In)' : 'Punch In Timestamp'}
                helperText={isId ? 'Waktu tervalidasi dengan NTP Server' : 'NTP server synchronized time'}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--color-text-secondary)', borderTop: '1px dashed var(--color-border)', paddingTop: '8px' }}>
                <span>{isId ? 'Status Absen' : 'Punch Status'}</span>
                <NeuronBadge size="sm" variant="brand">{isId ? 'Tepat Waktu' : 'On Time'}</NeuronBadge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. API Reference Specification */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '3. Referensi Properti API (TypeScript Specification)' : '3. API Property Reference (TypeScript)'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Daftar properti yang dapat dikonfigurasikan pada komponen NeuronTimePicker.'
            : 'Detailed property contracts, data types, and default values for NeuronTimePicker.'}
        </p>

        <div className="api-table-wrapper" style={{ marginTop: 'var(--space-4)' }}>
          <table className="api-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>mode</code></td>
                <td><code>'single' | 'range'</code></td>
                <td><code>'single'</code></td>
                <td>Selects single time or start/end time duration picker.</td>
              </tr>
              <tr>
                <td><code>value</code></td>
                <td><code>string | null</code></td>
                <td><code>undefined</code></td>
                <td>Controlled time value for single mode (e.g. '14:30' or '02:30 PM').</td>
              </tr>
              <tr>
                <td><code>defaultValue</code></td>
                <td><code>string | null</code></td>
                <td><code>null</code></td>
                <td>Initial uncontrolled time value for single mode.</td>
              </tr>
              <tr>
                <td><code>rangeValue</code></td>
                <td><code>TimeRange</code></td>
                <td><code>undefined</code></td>
                <td>Controlled start and end time object for range mode.</td>
              </tr>
              <tr>
                <td><code>onChange</code></td>
                <td><code>(time: string | null) =&gt; void</code></td>
                <td><code>-</code></td>
                <td>Callback invoked when time selection changes.</td>
              </tr>
              <tr>
                <td><code>onRangeChange</code></td>
                <td><code>(range: TimeRange) =&gt; void</code></td>
                <td><code>-</code></td>
                <td>Callback invoked when range time selection changes.</td>
              </tr>
              <tr>
                <td><code>use12Hours</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Enables 12-hour civil clock with AM / PM selector column.</td>
              </tr>
              <tr>
                <td><code>showSeconds</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Renders optional 3rd column for seconds precision (00-59).</td>
              </tr>
              <tr>
                <td><code>minuteStep</code></td>
                <td><code>number</code></td>
                <td><code>1</code></td>
                <td>Minute interval stepping (e.g. 5, 10, 15, 30).</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>'sm' | 'md' | 'lg'</code></td>
                <td><code>'md'</code></td>
                <td>Trigger field dimension: sm (32px), md (38px), lg (44px).</td>
              </tr>
              <tr>
                <td><code>variant</code></td>
                <td><code>'default' | 'bordered' | 'flat'</code></td>
                <td><code>'default'</code></td>
                <td>Visual border style and surface container background.</td>
              </tr>
              <tr>
                <td><code>presets</code></td>
                <td><code>TimePreset[]</code></td>
                <td><code>undefined</code></td>
                <td>Array of preset quick shortcut pills rendered above columns.</td>
              </tr>
              <tr>
                <td><code>trigger</code></td>
                <td><code>'popover' | 'inline'</code></td>
                <td><code>'popover'</code></td>
                <td>Determines whether picker renders as popover dialog or embedded inline card.</td>
              </tr>
              <tr>
                <td><code>clearable</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Shows clear (X) icon when value is selected.</td>
              </tr>
              <tr>
                <td><code>error</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Applies semantic error border styling.</td>
              </tr>
              <tr>
                <td><code>errorMessage</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>Validation message displayed beneath the input when error is true.</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Renders disabled grayed-out field with pointer interactions disabled.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">
              {isId ? 'KOMPONEN UI' : 'UI COMPONENTS'}
            </span>
            <h1 className="page-title">
              {isId ? 'Pemilih Waktu (Time Picker)' : 'Time Picker'}
            </h1>
            <p className="page-subtitle">
              {isId
                ? 'Komponen input dan dialog selektor waktu dengan kolom jam, menit, dan detik bergulir, mendukung format 12 jam (AM/PM), 24 jam, interval langkah, serta rentang durasi.'
                : 'Input field and interactive dropdown picker for granular time selection, supporting 12h/24h formats, step intervals, seconds precision, and duration ranges.'}
            </p>
          </div>
        </div>

        {/* ── Tab Switcher: 2 Tabs (Guideline & Playbook) ── */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeViewTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('guideline')}
          >
            Guideline
          </button>
          <button
            type="button"
            className={`comp-tab ${activeViewTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('playbook')}
          >
            Playbook
          </button>
        </div>
      </div>

      {/* ── Main Tab Content ── */}
      <div style={{ marginTop: 'var(--space-8)' }}>
        {activeViewTab === 'guideline' ? renderGuideline() : renderPlaybook()}
      </div>

      {/* ── Footer Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-textarea', label: t.nav.compTextArea || 'Text Area' }}
        next={{ id: 'comp-toast', label: t.nav.compToast || 'Toast' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
