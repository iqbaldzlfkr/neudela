import React, { useState, useRef, useEffect, useId, useCallback, useMemo } from 'react';
import { Clock, ChevronDown, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import NeuronButton from './NeuronButton';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type TimePickerSize = 'sm' | 'md' | 'lg';
export type TimePickerVariant = 'default' | 'bordered' | 'flat';
export type TimePickerMode = 'single' | 'range';
export type TimePeriod = 'AM' | 'PM';

export interface TimeRange {
  startTime: string | null;
  endTime: string | null;
}

export interface TimePreset {
  label: string;
  value: string;
}

export interface NeuronTimePickerProps {
  /** Mode: single time or time range */
  mode?: TimePickerMode;
  /** Size scale */
  size?: TimePickerSize;
  /** Visual variant */
  variant?: TimePickerVariant;
  /** Value for single mode (e.g. '14:30' or '02:30 PM') */
  value?: string | null;
  /** Default value for single mode (uncontrolled) */
  defaultValue?: string | null;
  /** Value for range mode */
  rangeValue?: TimeRange;
  /** Default value for range mode (uncontrolled) */
  defaultRangeValue?: TimeRange;
  /** Callback when single time changes */
  onChange?: (time: string | null) => void;
  /** Callback when range time changes */
  onRangeChange?: (range: TimeRange) => void;
  /** Use 12-hour format with AM/PM (default: false for 24-hour) */
  use12Hours?: boolean;
  /** Whether to show seconds column */
  showSeconds?: boolean;
  /** Interval step for minutes (e.g. 1, 5, 10, 15, 30) */
  minuteStep?: number;
  /** Interval step for seconds (e.g. 1, 5, 10, 15, 30) */
  secondStep?: number;
  /** Interval step for hours */
  hourStep?: number;
  /** Quick time presets */
  presets?: TimePreset[];
  /** Show 'Now' button in footer */
  showNowButton?: boolean;
  /** Show confirm/clear action buttons in popup */
  showActions?: boolean;
  /** Render mode: popup trigger or embedded inline */
  trigger?: 'popover' | 'inline';
  /** Placeholder text for input */
  placeholder?: string;
  /** Whether the time value can be cleared via (X) button */
  clearable?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Form label */
  label?: string;
  /** Helper text beneath input */
  helperText?: string;
  /** Function returning list of disabled hours */
  disabledHours?: () => number[];
  /** Function returning list of disabled minutes for a given hour */
  disabledMinutes?: (selectedHour: number) => number[];
  /** Function returning list of disabled seconds for a given hour and minute */
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  /** Dropdown placement */
  placement?: 'bottom-start' | 'bottom-end' | 'auto';
  /** Callback when user clicks OK/Done */
  onOk?: () => void;
  /** Additional custom CSS class */
  className?: string;
  /** Additional custom inline styles */
  style?: React.CSSProperties;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function parseTimeString(
  str: string | null | undefined,
  use12Hours: boolean,
  _showSeconds?: boolean
): { hour: number; minute: number; second: number; period: TimePeriod } | null {
  if (!str) return null;
  const trimmed = str.trim();
  const is12 = /am|pm/i.test(trimmed) || use12Hours;
  let period: TimePeriod = 'AM';
  let cleanStr = trimmed;

  if (/pm/i.test(trimmed)) {
    period = 'PM';
    cleanStr = trimmed.replace(/pm/i, '').trim();
  } else if (/am/i.test(trimmed)) {
    period = 'AM';
    cleanStr = trimmed.replace(/am/i, '').trim();
  }

  const parts = cleanStr.split(':').map(p => parseInt(p, 10));
  if (parts.some(p => isNaN(p))) return null;

  let hour = parts[0] || 0;
  const minute = parts[1] || 0;
  const second = parts[2] || 0;

  if (is12) {
    if (hour === 0) hour = 12;
    if (hour > 12) {
      hour -= 12;
      period = 'PM';
    }
  }

  return { hour, minute, second, period };
}

export function formatTimeString(
  hour: number,
  minute: number,
  second: number,
  period: TimePeriod,
  use12Hours: boolean,
  showSeconds: boolean
): string {
  const mStr = padZero(minute);
  const sStr = padZero(second);

  if (use12Hours) {
    let h = hour;
    if (h === 0) h = 12;
    if (h > 12) h = h % 12 || 12;
    const hStr = padZero(h);
    return showSeconds ? `${hStr}:${mStr}:${sStr} ${period}` : `${hStr}:${mStr} ${period}`;
  } else {
    let h = hour;
    if (period === 'PM' && h < 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    const hStr = padZero(h);
    return showSeconds ? `${hStr}:${mStr}:${sStr}` : `${hStr}:${mStr}`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// NeuronTimePicker Component
// ─────────────────────────────────────────────────────────────────────────────

export default function NeuronTimePicker({
  mode = 'single',
  size = 'md',
  variant = 'default',
  value: controlledValue,
  defaultValue = null,
  rangeValue: controlledRangeValue,
  defaultRangeValue = { startTime: null, endTime: null },
  onChange,
  onRangeChange,
  use12Hours = false,
  showSeconds = false,
  minuteStep = 1,
  secondStep = 1,
  hourStep = 1,
  presets,
  showNowButton = true,
  showActions = true,
  trigger = 'popover',
  placeholder,
  clearable = true,
  disabled = false,
  readOnly = false,
  error = false,
  errorMessage,
  label,
  helperText,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  placement = 'bottom-start',
  className = '',
  style,
  onOk,
}: NeuronTimePickerProps) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const instanceId = useId();

  // Internal Single State
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const singleValue = controlledValue !== undefined ? controlledValue : internalValue;

  // Internal Range State
  const [internalRange, setInternalRange] = useState<TimeRange>(defaultRangeValue);
  const rangeValue = controlledRangeValue !== undefined ? controlledRangeValue : internalRange;
  const [activeRangeTab, setActiveRangeTab] = useState<'start' | 'end'>('start');

  // Popover State
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Parse active time representation
  const activeTimeString = mode === 'single'
    ? singleValue
    : (activeRangeTab === 'start' ? rangeValue.startTime : rangeValue.endTime);

  const parsed = parseTimeString(activeTimeString, use12Hours, showSeconds);

  // Transient state while panel is open
  const now = new Date();
  const defaultHour = use12Hours ? (now.getHours() % 12 || 12) : now.getHours();
  const defaultPeriod: TimePeriod = now.getHours() >= 12 ? 'PM' : 'AM';

  const [selectedHour, setSelectedHour] = useState<number>(parsed ? parsed.hour : defaultHour);
  const [selectedMinute, setSelectedMinute] = useState<number>(parsed ? parsed.minute : 0);
  const [selectedSecond, setSelectedSecond] = useState<number>(parsed ? parsed.second : 0);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(parsed ? parsed.period : defaultPeriod);

  // Sync transient state when value changes externally
  useEffect(() => {
    if (parsed) {
      setSelectedHour(parsed.hour);
      setSelectedMinute(parsed.minute);
      setSelectedSecond(parsed.second);
      setSelectedPeriod(parsed.period);
    }
  }, [activeTimeString, use12Hours, showSeconds]);

  // Click outside to close popover
  useEffect(() => {
    if (trigger !== 'popover' || !isOpen) return;
    function handlePointerDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen, trigger]);

  // Keyboard navigation (Esc to close)
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-scroll column refs
  const hoursListRef = useRef<HTMLDivElement>(null);
  const minutesListRef = useRef<HTMLDivElement>(null);
  const secondsListRef = useRef<HTMLDivElement>(null);
  const periodListRef = useRef<HTMLDivElement>(null);

  // Generate Hour options
  const hourOptions = useMemo(() => {
    const hoursCount = use12Hours ? 12 : 24;
    const list: number[] = [];
    const startHour = use12Hours ? 1 : 0;
    for (let i = startHour; i < startHour + hoursCount; i += hourStep) {
      list.push(i);
    }
    return list;
  }, [use12Hours, hourStep]);

  // Generate Minute options
  const minuteOptions = useMemo(() => {
    const list: number[] = [];
    for (let i = 0; i < 60; i += minuteStep) {
      list.push(i);
    }
    return list;
  }, [minuteStep]);

  // Generate Second options
  const secondOptions = useMemo(() => {
    const list: number[] = [];
    if (showSeconds) {
      for (let i = 0; i < 60; i += secondStep) {
        list.push(i);
      }
    }
    return list;
  }, [showSeconds, secondStep]);

  const scrollColumnToActive = (columnEl: HTMLDivElement | null, smooth = true) => {
    if (!columnEl) return;
    const activeEl = columnEl.querySelector<HTMLElement>('.neuron-time-picker__item--selected');
    if (activeEl) {
      const containerRect = columnEl.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      const currentScroll = columnEl.scrollTop;
      const targetScrollTop = currentScroll + (itemRect.top - containerRect.top) - (columnEl.clientHeight - activeEl.clientHeight) / 2;
      columnEl.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  const scrollToActive = useCallback((smooth = true) => {
    scrollColumnToActive(hoursListRef.current, smooth);
    scrollColumnToActive(minutesListRef.current, smooth);
    scrollColumnToActive(secondsListRef.current, smooth);
    scrollColumnToActive(periodListRef.current, smooth);
  }, []);

  const scrollToValues = useCallback((h: number, m: number, s?: number, p?: TimePeriod, smooth = true) => {
    const scrollToItem = (columnEl: HTMLDivElement | null, itemText: string) => {
      if (!columnEl) return;
      const items = columnEl.querySelectorAll<HTMLElement>('.neuron-time-picker__item');
      for (let i = 0; i < items.length; i++) {
        if (items[i].textContent?.trim() === itemText) {
          const containerRect = columnEl.getBoundingClientRect();
          const itemRect = items[i].getBoundingClientRect();
          const targetScrollTop = columnEl.scrollTop + (itemRect.top - containerRect.top) - (columnEl.clientHeight - items[i].clientHeight) / 2;
          columnEl.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: smooth ? 'smooth' : 'auto',
          });
          break;
        }
      }
    };

    scrollToItem(hoursListRef.current, padZero(h));
    scrollToItem(minutesListRef.current, padZero(m));
    if (s !== undefined && showSeconds) {
      scrollToItem(secondsListRef.current, padZero(s));
    }
    if (p && use12Hours) {
      scrollToItem(periodListRef.current, p);
    }
  }, [showSeconds, use12Hours]);

  useEffect(() => {
    if (isOpen || trigger === 'inline') {
      const timer = setTimeout(() => scrollToActive(false), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen, trigger, scrollToActive]);

  useEffect(() => {
    if (isOpen || trigger === 'inline') {
      const timer = setTimeout(() => scrollToActive(true), 50);
      return () => clearTimeout(timer);
    }
  }, [activeTimeString, isOpen, trigger, scrollToActive]);

  // Update value helper
  const commitTime = useCallback((h: number, m: number, s: number, p: TimePeriod) => {
    const formatted = formatTimeString(h, m, s, p, use12Hours, showSeconds);
    if (mode === 'single') {
      if (controlledValue === undefined) setInternalValue(formatted);
      onChange?.(formatted);
    } else {
      const nextRange: TimeRange = activeRangeTab === 'start'
        ? { ...rangeValue, startTime: formatted }
        : { ...rangeValue, endTime: formatted };
      if (controlledRangeValue === undefined) setInternalRange(nextRange);
      onRangeChange?.(nextRange);
    }
  }, [mode, activeRangeTab, rangeValue, controlledValue, controlledRangeValue, onChange, onRangeChange, use12Hours, showSeconds]);

  // Handlers for individual item clicks
  const handleHourSelect = (h: number) => {
    setSelectedHour(h);
    commitTime(h, selectedMinute, selectedSecond, selectedPeriod);
  };

  const handleMinuteSelect = (m: number) => {
    setSelectedMinute(m);
    commitTime(selectedHour, m, selectedSecond, selectedPeriod);
  };

  const handleSecondSelect = (s: number) => {
    setSelectedSecond(s);
    commitTime(selectedHour, selectedMinute, s, selectedPeriod);
  };

  const handlePeriodSelect = (p: TimePeriod) => {
    setSelectedPeriod(p);
    commitTime(selectedHour, selectedMinute, selectedSecond, p);
  };

  // 'Now' button handler
  const handleNowClick = () => {
    const currentDate = new Date();
    let currentH = currentDate.getHours();
    let currentM = currentDate.getMinutes();
    const currentS = currentDate.getSeconds();
    let currentP: TimePeriod = 'AM';

    if (use12Hours) {
      currentP = currentH >= 12 ? 'PM' : 'AM';
      currentH = currentH % 12 || 12;
    }

    // Snap to nearest available step option
    const snapToOption = (val: number, options: number[]) => {
      if (options.length === 0 || options.includes(val)) return val;
      return options.reduce((prev, curr) => (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev));
    };

    const targetH = snapToOption(currentH, hourOptions);
    const targetM = snapToOption(currentM, minuteOptions);
    const targetS = showSeconds ? snapToOption(currentS, secondOptions) : currentS;

    setSelectedHour(targetH);
    setSelectedMinute(targetM);
    setSelectedSecond(targetS);
    setSelectedPeriod(currentP);
    commitTime(targetH, targetM, targetS, currentP);

    // Immediately point to and auto-scroll to the indicated time
    scrollToValues(targetH, targetM, targetS, currentP, true);
    setTimeout(() => {
      scrollToActive(true);
    }, 40);
  };

  // Clear handler
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === 'single') {
      if (controlledValue === undefined) setInternalValue(null);
      onChange?.(null);
    } else {
      const emptyRange: TimeRange = { startTime: null, endTime: null };
      if (controlledRangeValue === undefined) setInternalRange(emptyRange);
      onRangeChange?.(emptyRange);
    }
  };

  // Check disabled states
  const disabledH = disabledHours ? disabledHours() : [];
  const disabledM = disabledMinutes ? disabledMinutes(selectedHour) : [];
  const disabledS = disabledSeconds ? disabledSeconds(selectedHour, selectedMinute) : [];

  // Default placeholder text
  const defaultPlaceholder = mode === 'single'
    ? (isId ? 'Pilih waktu' : 'Select time')
    : (isId ? 'Mulai — Selesai' : 'Start — End time');

  const displayPlaceholder = placeholder || defaultPlaceholder;

  // Single display text
  const singleDisplayText = singleValue || '';

  // Range display text
  const rangeDisplayText = rangeValue.startTime || rangeValue.endTime
    ? `${rangeValue.startTime || '--:--'} — ${rangeValue.endTime || '--:--'}`
    : '';

  const inputValue = mode === 'single' ? singleDisplayText : rangeDisplayText;
  const hasValue = Boolean(inputValue);

  // ───────────────────────────────────────────────────────────────────────────
  // Render Picker Columns Content
  // ───────────────────────────────────────────────────────────────────────────
  const renderPickerPanel = () => (
    <div className="neuron-time-picker__panel" role="dialog" aria-modal="true">
      {/* Range Tab Switcher (if in range mode) */}
      {mode === 'range' && (
        <div className="neuron-time-picker__range-tabs">
          <button
            type="button"
            className={`neuron-time-picker__range-tab ${activeRangeTab === 'start' ? 'is-active' : ''}`}
            onClick={() => setActiveRangeTab('start')}
          >
            <span>{isId ? 'Waktu Mulai' : 'Start Time'}</span>
            <strong>{rangeValue.startTime || '--:--'}</strong>
          </button>
          <div className="neuron-time-picker__range-divider">→</div>
          <button
            type="button"
            className={`neuron-time-picker__range-tab ${activeRangeTab === 'end' ? 'is-active' : ''}`}
            onClick={() => setActiveRangeTab('end')}
          >
            <span>{isId ? 'Waktu Selesai' : 'End Time'}</span>
            <strong>{rangeValue.endTime || '--:--'}</strong>
          </button>
        </div>
      )}

      {/* Preset Pills (if provided) */}
      {presets && presets.length > 0 && (
        <div className="neuron-time-picker__presets">
          {presets.map(p => (
            <button
              key={p.value}
              type="button"
              className={`neuron-time-picker__preset-pill ${activeTimeString === p.value ? 'is-active' : ''}`}
              onClick={() => {
                const parsedPreset = parseTimeString(p.value, use12Hours, showSeconds);
                if (parsedPreset) {
                  setSelectedHour(parsedPreset.hour);
                  setSelectedMinute(parsedPreset.minute);
                  setSelectedSecond(parsedPreset.second);
                  setSelectedPeriod(parsedPreset.period);
                  commitTime(parsedPreset.hour, parsedPreset.minute, parsedPreset.second, parsedPreset.period);
                  scrollToValues(parsedPreset.hour, parsedPreset.minute, parsedPreset.second, parsedPreset.period, true);
                  setTimeout(() => scrollToActive(true), 40);
                }
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Columns Container */}
      <div className="neuron-time-picker__columns">
        {/* Hours Column */}
        <div className="neuron-time-picker__column-wrapper">
          <div className="neuron-time-picker__column-header">
            {isId ? 'Jam' : 'Hour'}
          </div>
          <div className="neuron-time-picker__column" ref={hoursListRef} tabIndex={0}>
            {hourOptions.map(h => {
              const isSelected = selectedHour === h;
              const isDisabled = disabledH.includes(h);
              return (
                <button
                  key={`h-${h}`}
                  type="button"
                  disabled={isDisabled}
                  className={`neuron-time-picker__item ${isSelected ? 'neuron-time-picker__item--selected' : ''}`}
                  onClick={() => !isDisabled && handleHourSelect(h)}
                >
                  {padZero(h)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Minutes Column */}
        <div className="neuron-time-picker__column-wrapper">
          <div className="neuron-time-picker__column-header">
            {isId ? 'Menit' : 'Minute'}
          </div>
          <div className="neuron-time-picker__column" ref={minutesListRef} tabIndex={0}>
            {minuteOptions.map(m => {
              const isSelected = selectedMinute === m;
              const isDisabled = disabledM.includes(m);
              return (
                <button
                  key={`m-${m}`}
                  type="button"
                  disabled={isDisabled}
                  className={`neuron-time-picker__item ${isSelected ? 'neuron-time-picker__item--selected' : ''}`}
                  onClick={() => !isDisabled && handleMinuteSelect(m)}
                >
                  {padZero(m)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Seconds Column (Optional) */}
        {showSeconds && (
          <div className="neuron-time-picker__column-wrapper">
            <div className="neuron-time-picker__column-header">
              {isId ? 'Detik' : 'Second'}
            </div>
            <div className="neuron-time-picker__column" ref={secondsListRef} tabIndex={0}>
              {secondOptions.map(s => {
                const isSelected = selectedSecond === s;
                const isDisabled = disabledS.includes(s);
                return (
                  <button
                    key={`s-${s}`}
                    type="button"
                    disabled={isDisabled}
                    className={`neuron-time-picker__item ${isSelected ? 'neuron-time-picker__item--selected' : ''}`}
                    onClick={() => !isDisabled && handleSecondSelect(s)}
                  >
                    {padZero(s)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* AM / PM Column (12-hour mode) */}
        {use12Hours && (
          <div className="neuron-time-picker__column-wrapper neuron-time-picker__column-wrapper--period">
            <div className="neuron-time-picker__column-header">
              AM/PM
            </div>
            <div className="neuron-time-picker__column neuron-time-picker__column--period" ref={periodListRef} tabIndex={0}>
              {(['AM', 'PM'] as TimePeriod[]).map(p => {
                const isSelected = selectedPeriod === p;
                return (
                  <button
                    key={p}
                    type="button"
                    className={`neuron-time-picker__item ${isSelected ? 'neuron-time-picker__item--selected' : ''}`}
                    onClick={() => handlePeriodSelect(p)}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Quick Actions */}
      {showActions && (
        <div className="neuron-time-picker__footer">
          {showNowButton && (
            <button
              type="button"
              className="neuron-time-picker__action-link"
              onClick={handleNowClick}
            >
              {isId ? 'Sekarang' : 'Now'}
            </button>
          )}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            {(trigger === 'popover' || showActions) && (
              <NeuronButton
                type="button"
                size="xs"
                variant="primary"
                className="neuron-time-picker__action-btn neuron-time-picker__action-btn--primary"
                onClick={() => {
                  if (trigger === 'popover') setIsOpen(false);
                  onOk?.();
                }}
                leadingIcon={<Check size={14} />}
              >
                {isId ? 'Selesai' : 'OK'}
              </NeuronButton>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // If Trigger is inline:
  if (trigger === 'inline') {
    return (
      <div
        className={`neuron-time-picker neuron-time-picker--inline neuron-time-picker--${size} neuron-time-picker--${variant} ${disabled ? 'neuron-time-picker--disabled' : ''} ${className}`}
        style={style}
      >
        {label && (
          <label className={`neuron-time-picker__label ${size === 'sm' ? 'neuron-time-picker__label--sm' : ''}`}>
            {label}
          </label>
        )}
        {renderPickerPanel()}
        {error && errorMessage && (
          <span className="neuron-time-picker__error-msg">{errorMessage}</span>
        )}
        {helperText && !error && (
          <span className="neuron-time-picker__helper-msg">{helperText}</span>
        )}
      </div>
    );
  }

  // Trigger is Popover:
  return (
    <div
      ref={containerRef}
      className={`neuron-time-picker neuron-time-picker--popover neuron-time-picker--${size} neuron-time-picker--${variant} ${disabled ? 'neuron-time-picker--disabled' : ''} ${error ? 'neuron-time-picker--error' : ''} ${isOpen ? 'neuron-time-picker--open' : ''} ${className}`}
      style={style}
    >
      {label && (
        <label
          htmlFor={`neuron-tp-input-${instanceId}`}
          className={`neuron-time-picker__label ${size === 'sm' ? 'neuron-time-picker__label--sm' : ''}`}
        >
          {label}
        </label>
      )}

      {/* Input Trigger Box */}
      <div
        id={`neuron-tp-input-${instanceId}`}
        className={`neuron-time-picker__trigger ${isOpen ? 'neuron-time-picker__trigger--open is-open' : ''}`}
        onClick={() => !disabled && !readOnly && setIsOpen(prev => !prev)}
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={e => {
          if (disabled || readOnly) return;
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <Clock className="neuron-time-picker__icon-left" size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />

        <span className={`neuron-time-picker__value ${!hasValue ? 'is-placeholder' : ''}`}>
          {hasValue ? inputValue : displayPlaceholder}
        </span>

        {/* Clearable button */}
        {clearable && hasValue && !disabled && !readOnly && (
          <button
            type="button"
            className="neuron-time-picker__clear-btn"
            onClick={handleClear}
            aria-label={isId ? 'Hapus waktu' : 'Clear time'}
          >
            <X size={14} />
          </button>
        )}

        <ChevronDown
          className={`neuron-time-picker__chevron ${isOpen ? 'is-rotated' : ''}`}
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
        />
      </div>

      {/* Popover Flyout */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`neuron-time-picker__dropdown neuron-time-picker__dropdown--${placement}`}
        >
          {renderPickerPanel()}
        </div>
      )}

      {error && errorMessage && (
        <span className="neuron-time-picker__error-msg">{errorMessage}</span>
      )}
      {helperText && !error && (
        <span className="neuron-time-picker__helper-msg">{helperText}</span>
      )}
    </div>
  );
}
