import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type DatePickerMode = 'single' | 'range' | 'double';
export type DatePickerSize = 'sm' | 'md' | 'lg';
export type DatePickerVariant = 'default' | 'bordered' | 'flat';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export type DatePresetId =
  | 'today'
  | 'yesterday'
  | 'this_week'
  | 'last_week'
  | 'this_month'
  | 'last_month'
  | 'this_year'
  | 'last_year'
  | 'all_time';

export interface DatePreset {
  id: DatePresetId;
  label: string;
  getRange: () => DateRange;
}

export interface NeuronDatePickerProps {
  /** Mode: single date, range selection, or double calendar with presets */
  mode?: DatePickerMode;
  /** Size scale */
  size?: DatePickerSize;
  /** Visual variant */
  variant?: DatePickerVariant;
  /** Value for single mode */
  value?: Date | null;
  /** Value for range or double mode */
  rangeValue?: DateRange;
  /** Default value for single mode (uncontrolled) */
  defaultValue?: Date | null;
  /** Default value for range mode (uncontrolled) */
  defaultRangeValue?: DateRange;
  /** Callback when single date changes */
  onChange?: (date: Date | null) => void;
  /** Callback when date range changes */
  onRangeChange?: (range: DateRange) => void;
  /** Callback when Apply button is clicked */
  onApply?: (value: Date | null | DateRange) => void;
  /** Callback when Cancel button is clicked */
  onCancel?: () => void;
  /** Show preset sidebar (only for double or range mode) */
  showPresets?: boolean;
  /** Custom presets array */
  presets?: DatePreset[];
  /** Active preset id */
  activePreset?: DatePresetId | null;
  /** Show quick 'Today' button in single mode header */
  showTodayButton?: boolean;
  /** Show Cancel / Apply footer action buttons */
  showActions?: boolean;
  /** Render mode: inline card or popup trigger */
  trigger?: 'inline' | 'popover';
  /** Placeholder text for popover trigger input */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Label for form trigger */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Min selectable date */
  minDate?: Date;
  /** Max selectable date */
  maxDate?: Date;
  /** Custom class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];

export function formatDate(d: Date | null | undefined): string {
  if (!d || isNaN(d.getTime())) return '';
  const month = MONTH_NAMES[d.getMonth()].slice(0, 3);
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const time = date.getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  const [min, max] = s <= e ? [s, e] : [e, s];
  return time > min && time < max;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns an array of calendar grid cells (42 cells: 6 weeks × 7 days)
 * Monday is day 0, Sunday is day 6.
 */
interface CalendarCell {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function generateCalendarGrid(year: number, month: number): CalendarCell[] {
  const firstDayOfMonth = new Date(year, month, 1);
  // getDay(): 0 = Sun, 1 = Mon, ..., 6 = Sat
  // We want Monday = 0, Sunday = 6
  let startingDay = firstDayOfMonth.getDay() - 1;
  if (startingDay < 0) startingDay = 6;

  const totalDaysCurrentMonth = getDaysInMonth(year, month);
  const totalDaysPrevMonth = getDaysInMonth(year, month - 1);

  const cells: CalendarCell[] = [];
  const today = new Date();

  // Previous month trailing days
  for (let i = startingDay - 1; i >= 0; i--) {
    const dayNumber = totalDaysPrevMonth - i;
    const date = new Date(year, month - 1, dayNumber);
    cells.push({
      date,
      dayNumber,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
    });
  }

  // Current month days
  for (let i = 1; i <= totalDaysCurrentMonth; i++) {
    const date = new Date(year, month, i);
    cells.push({
      date,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
    });
  }

  // Next month leading days to complete 42 cells
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const date = new Date(year, month + 1, i);
    cells.push({
      date,
      dayNumber: i,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
    });
  }

  return cells;
}

export const DEFAULT_PRESETS: DatePreset[] = [
  {
    id: 'today',
    label: 'Today',
    getRange: () => {
      const now = new Date();
      return { startDate: now, endDate: now };
    },
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    getRange: () => {
      const y = new Date();
      y.setDate(y.getDate() - 1);
      return { startDate: y, endDate: y };
    },
  },
  {
    id: 'this_week',
    label: 'This week',
    getRange: () => {
      const now = new Date();
      const day = now.getDay() || 7;
      const start = new Date(now);
      start.setDate(now.getDate() - day + 1);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { startDate: start, endDate: end };
    },
  },
  {
    id: 'last_week',
    label: 'Last week',
    getRange: () => {
      const now = new Date();
      const day = now.getDay() || 7;
      const start = new Date(now);
      start.setDate(now.getDate() - day - 6);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { startDate: start, endDate: end };
    },
  },
  {
    id: 'this_month',
    label: 'This month',
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { startDate: start, endDate: end };
    },
  },
  {
    id: 'last_month',
    label: 'Last month',
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { startDate: start, endDate: end };
    },
  },
  {
    id: 'this_year',
    label: 'This year',
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31);
      return { startDate: start, endDate: end };
    },
  },
  {
    id: 'last_year',
    label: 'Last year',
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear() - 1, 0, 1);
      const end = new Date(now.getFullYear() - 1, 11, 31);
      return { startDate: start, endDate: end };
    },
  },
  {
    id: 'all_time',
    label: 'All time',
    getRange: () => {
      const start = new Date(2020, 0, 1);
      const end = new Date();
      return { startDate: start, endDate: end };
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component Implementation
// ─────────────────────────────────────────────────────────────────────────────

export default function NeuronDatePicker({
  mode = 'single',
  size = 'md',
  variant = 'default',
  value,
  rangeValue,
  defaultValue = null,
  defaultRangeValue = { startDate: null, endDate: null },
  onChange,
  onRangeChange,
  onApply,
  onCancel,
  showPresets = true,
  presets = DEFAULT_PRESETS,
  activePreset: initialActivePreset = null,
  showTodayButton = true,
  showActions = true,
  trigger = 'inline',
  placeholder = 'Select date...',
  disabled = false,
  error = false,
  errorMessage,
  label,
  helperText,
  minDate,
  maxDate,
  className = '',
  style,
}: NeuronDatePickerProps) {
  const uniqueId = useId();

  // Internal selection state
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? defaultValue);
  const [selectedRange, setSelectedRange] = useState<DateRange>(rangeValue ?? defaultRangeValue);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [activePreset, setActivePreset] = useState<DatePresetId | null>(initialActivePreset);

  // Popover state
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Current view month/year
  const initialDate = selectedDate || selectedRange.startDate || new Date(2025, 0, 1);
  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth());

  // Synchronize controlled props
  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
      if (value) {
        setViewYear(value.getFullYear());
        setViewMonth(value.getMonth());
      }
    }
  }, [value]);

  useEffect(() => {
    if (rangeValue !== undefined) {
      setSelectedRange(rangeValue);
      if (rangeValue.startDate) {
        setViewYear(rangeValue.startDate.getFullYear());
        setViewMonth(rangeValue.startDate.getMonth());
      }
    }
  }, [rangeValue]);

  // Click outside to close popover
  useEffect(() => {
    if (trigger !== 'popover' || !isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, trigger]);

  // Month navigation
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  // Next month for double calendar
  const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;
  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;

  // Day click handler
  const handleDayClick = (cellDate: Date) => {
    if (disabled) return;

    if (minDate && cellDate < minDate) return;
    if (maxDate && cellDate > maxDate) return;

    if (mode === 'single') {
      setSelectedDate(cellDate);
      onChange?.(cellDate);
    } else {
      // Range or Double Range mode
      if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
        // Start new range selection
        const newRange = { startDate: cellDate, endDate: null };
        setSelectedRange(newRange);
        setActivePreset(null);
        onRangeChange?.(newRange);
      } else {
        // Complete range selection
        let start = selectedRange.startDate;
        let end = cellDate;
        if (end < start) {
          const temp = start;
          start = end;
          end = temp;
        }
        const newRange = { startDate: start, endDate: end };
        setSelectedRange(newRange);
        setActivePreset(null);
        onRangeChange?.(newRange);
      }
    }
  };

  // Quick Today Button
  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    onChange?.(today);
  };

  // Preset click
  const handlePresetClick = (preset: DatePreset) => {
    const range = preset.getRange();
    setSelectedRange(range);
    setActivePreset(preset.id);
    if (range.startDate) {
      setViewYear(range.startDate.getFullYear());
      setViewMonth(range.startDate.getMonth());
    }
    onRangeChange?.(range);
  };

  // Action Buttons
  const handleApply = () => {
    if (mode === 'single') {
      onApply?.(selectedDate);
    } else {
      onApply?.(selectedRange);
    }
    if (trigger === 'popover') {
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    if (trigger === 'popover') {
      setIsOpen(false);
    }
  };

  // Generate grids
  const primaryGrid = generateCalendarGrid(viewYear, viewMonth);
  const secondaryGrid = mode === 'double' ? generateCalendarGrid(nextMonthYear, nextMonth) : [];

  // Determine selection state for day cell
  const getCellState = (cellDate: Date) => {
    if (mode === 'single') {
      const isSelected = isSameDay(cellDate, selectedDate);
      return {
        isSelected,
        isRangeStart: false,
        isRangeEnd: false,
        isInRange: false,
      };
    } else {
      const isRangeStart = isSameDay(cellDate, selectedRange.startDate);
      const isRangeEnd = isSameDay(cellDate, selectedRange.endDate);
      const isSelected = isRangeStart || isRangeEnd;

      // Range in between
      let inRange = false;
      if (selectedRange.startDate && selectedRange.endDate) {
        inRange = isDateInRange(cellDate, selectedRange.startDate, selectedRange.endDate);
      } else if (selectedRange.startDate && hoverDate && !selectedRange.endDate) {
        inRange = isDateInRange(cellDate, selectedRange.startDate, hoverDate);
      }

      return {
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange: inRange,
      };
    }
  };

  // Render a Single Calendar Month
  const renderCalendar = (
    year: number,
    month: number,
    grid: CalendarCell[],
    showNav: { prev: boolean; next: boolean }
  ) => {
    return (
      <div className="neuron-datepicker-calendar">
        {/* Month Header Navigation */}
        <div className="neuron-datepicker-header">
          {showNav.prev ? (
            <button
              type="button"
              className="neuron-datepicker-nav-btn"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
          ) : (
            <div className="neuron-datepicker-nav-placeholder" />
          )}

          <div className="neuron-datepicker-month-title">
            {MONTH_NAMES[month]} {year}
          </div>

          {showNav.next ? (
            <button
              type="button"
              className="neuron-datepicker-nav-btn"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          ) : (
            <div className="neuron-datepicker-nav-placeholder" />
          )}
        </div>

        {/* Weekday Row */}
        <div className="neuron-datepicker-weekdays" role="row">
          {WEEKDAY_NAMES.map(day => (
            <div key={day} className="neuron-datepicker-weekday" role="columnheader">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="neuron-datepicker-days" role="grid">
          {grid.map((cell, idx) => {
            const { isSelected, isRangeStart, isRangeEnd, isInRange } = getCellState(cell.date);
            const isMuted = !cell.isCurrentMonth;

            const isStartHovered =
              selectedRange.startDate &&
              !selectedRange.endDate &&
              hoverDate &&
              hoverDate < selectedRange.startDate &&
              isSameDay(cell.date, hoverDate);

            const isEndHovered =
              selectedRange.startDate &&
              !selectedRange.endDate &&
              hoverDate &&
              hoverDate > selectedRange.startDate &&
              isSameDay(cell.date, hoverDate);

            return (
              <div
                key={idx}
                className={[
                  'neuron-datepicker-day-wrapper',
                  isInRange ? 'neuron-datepicker-day-wrapper--in-range' : '',
                  isRangeStart || isStartHovered ? 'neuron-datepicker-day-wrapper--range-start' : '',
                  isRangeEnd || isEndHovered ? 'neuron-datepicker-day-wrapper--range-end' : '',
                ].filter(Boolean).join(' ')}
              >
                <button
                  type="button"
                  className={[
                    'neuron-datepicker-day',
                    isMuted ? 'neuron-datepicker-day--muted' : '',
                    cell.isToday ? 'neuron-datepicker-day--today' : '',
                    isSelected ? 'neuron-datepicker-day--selected' : '',
                    isRangeStart ? 'neuron-datepicker-day--range-start' : '',
                    isRangeEnd ? 'neuron-datepicker-day--range-end' : '',
                    isInRange ? 'neuron-datepicker-day--in-range' : '',
                    (isStartHovered || isEndHovered) ? 'neuron-datepicker-day--hover-endpoint' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleDayClick(cell.date)}
                  onMouseEnter={() => setHoverDate(cell.date)}
                  onMouseLeave={() => setHoverDate(null)}
                  tabIndex={cell.isCurrentMonth ? 0 : -1}
                  aria-label={`${cell.date.toDateString()}`}
                  aria-selected={isSelected || isInRange}
                  disabled={disabled}
                >
                  <span className="neuron-datepicker-day-text">{cell.dayNumber}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Inner Picker Card
  const renderPickerCard = () => {
    return (
      <div
        className={[
          'neuron-datepicker',
          `neuron-datepicker--${mode}`,
          `neuron-datepicker--${size}`,
          `neuron-datepicker--${variant}`,
          disabled ? 'neuron-datepicker--disabled' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={style}
      >
        <div className="neuron-datepicker-body">
          {/* Presets Sidebar (for Double or Range mode when showPresets=true) */}
          {(mode === 'double' || (mode === 'range' && showPresets)) && (
            <div className="neuron-datepicker-presets" role="listbox" aria-label="Date presets">
              {presets.map(preset => {
                const isActive = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={`neuron-datepicker-preset-btn ${isActive ? 'neuron-datepicker-preset-btn--active' : ''}`}
                    onClick={() => handlePresetClick(preset)}
                    role="option"
                    aria-selected={isActive}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Calendar Main Section */}
          <div className="neuron-datepicker-main">
            {/* Top Date Input Header Bar (for Single Mode or Single-Month Range Mode) */}
            {mode === 'single' && (
              <div className="neuron-datepicker-input-row">
                <div className="neuron-datepicker-input-field">
                  <input
                    type="text"
                    readOnly
                    value={formatDate(selectedDate)}
                    placeholder="Select date"
                    className="neuron-datepicker-text-input"
                    aria-label="Selected date"
                  />
                </div>
                {showTodayButton && (
                  <button
                    type="button"
                    className="neuron-datepicker-today-btn"
                    onClick={handleTodayClick}
                  >
                    Today
                  </button>
                )}
              </div>
            )}

            {mode === 'range' && (
              <div className="neuron-datepicker-input-row neuron-datepicker-input-row--range">
                <div className="neuron-datepicker-input-field">
                  <input
                    type="text"
                    readOnly
                    value={formatDate(selectedRange.startDate)}
                    placeholder="Start date"
                    className="neuron-datepicker-text-input"
                    aria-label="Start date"
                  />
                </div>
                <span className="neuron-datepicker-range-sep">—</span>
                <div className="neuron-datepicker-input-field">
                  <input
                    type="text"
                    readOnly
                    value={formatDate(selectedRange.endDate)}
                    placeholder="End date"
                    className="neuron-datepicker-text-input"
                    aria-label="End date"
                  />
                </div>
              </div>
            )}

            {/* Calendars Container */}
            <div className="neuron-datepicker-calendars">
              {/* Primary Calendar */}
              {renderCalendar(
                viewYear,
                viewMonth,
                primaryGrid,
                mode === 'double'
                  ? { prev: true, next: false }
                  : { prev: true, next: true }
              )}

              {/* Secondary Calendar (for double mode) */}
              {mode === 'double' && (
                <div className="neuron-datepicker-secondary-cal">
                  {renderCalendar(
                    nextMonthYear,
                    nextMonth,
                    secondaryGrid,
                    { prev: false, next: true }
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            {showActions && (
              <div className="neuron-datepicker-footer">
                {mode === 'double' ? (
                  <>
                    <div className="neuron-datepicker-footer-inputs">
                      <div className="neuron-datepicker-input-field">
                        <input
                          type="text"
                          readOnly
                          value={formatDate(selectedRange.startDate)}
                          placeholder="Start date"
                          className="neuron-datepicker-text-input"
                          aria-label="Start date"
                        />
                      </div>
                      <span className="neuron-datepicker-range-sep">—</span>
                      <div className="neuron-datepicker-input-field">
                        <input
                          type="text"
                          readOnly
                          value={formatDate(selectedRange.endDate)}
                          placeholder="End date"
                          className="neuron-datepicker-text-input"
                          aria-label="End date"
                        />
                      </div>
                    </div>
                    <div className="neuron-datepicker-footer-btns">
                      <button
                        type="button"
                        className="neuron-datepicker-btn neuron-datepicker-btn--cancel"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="neuron-datepicker-btn neuron-datepicker-btn--apply"
                        onClick={handleApply}
                      >
                        Apply
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="neuron-datepicker-footer-btns neuron-datepicker-footer-btns--full">
                    <button
                      type="button"
                      className="neuron-datepicker-btn neuron-datepicker-btn--cancel"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="neuron-datepicker-btn neuron-datepicker-btn--apply"
                      onClick={handleApply}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // If Inline trigger, render directly
  if (trigger === 'inline') {
    return (
      <div className="neuron-datepicker-wrapper">
        {label && <label className="neuron-datepicker-label">{label}</label>}
        {renderPickerCard()}
        {error && errorMessage && (
          <div className="neuron-datepicker-error-msg">{errorMessage}</div>
        )}
        {!error && helperText && (
          <div className="neuron-datepicker-helper-msg">{helperText}</div>
        )}
      </div>
    );
  }

  // If Popover trigger
  const displayTriggerText =
    mode === 'single'
      ? selectedDate ? formatDate(selectedDate) : ''
      : selectedRange.startDate && selectedRange.endDate
      ? `${formatDate(selectedRange.startDate)} - ${formatDate(selectedRange.endDate)}`
      : selectedRange.startDate
      ? `${formatDate(selectedRange.startDate)} - ...`
      : '';

  return (
    <div className={`neuron-datepicker-popover-wrap ${className}`} style={style}>
      {label && (
        <label htmlFor={uniqueId} className="neuron-datepicker-label">
          {label}
        </label>
      )}

      {/* Popover Input Button Trigger */}
      <button
        ref={triggerRef}
        id={uniqueId}
        type="button"
        className={[
          'neuron-datepicker-trigger-btn',
          `neuron-datepicker-trigger-btn--${size}`,
          isOpen ? 'neuron-datepicker-trigger-btn--open' : '',
          error ? 'neuron-datepicker-trigger-btn--error' : '',
          disabled ? 'neuron-datepicker-trigger-btn--disabled' : '',
        ].filter(Boolean).join(' ')}
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        disabled={disabled}
      >
        <span className="neuron-datepicker-trigger-icon">
          <CalendarIcon size={16} />
        </span>
        <span className={`neuron-datepicker-trigger-text ${!displayTriggerText ? 'neuron-datepicker-trigger-placeholder' : ''}`}>
          {displayTriggerText || placeholder}
        </span>
        {displayTriggerText && (
          <span
            className="neuron-datepicker-trigger-clear"
            onClick={(e) => {
              e.stopPropagation();
              if (mode === 'single') {
                setSelectedDate(null);
                onChange?.(null);
              } else {
                const empty = { startDate: null, endDate: null };
                setSelectedRange(empty);
                onRangeChange?.(empty);
              }
            }}
            title="Clear date"
          >
            <X size={14} />
          </span>
        )}
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div ref={popoverRef} className="neuron-datepicker-dropdown" role="dialog" aria-modal="true">
          {renderPickerCard()}
        </div>
      )}

      {error && errorMessage && (
        <div className="neuron-datepicker-error-msg">{errorMessage}</div>
      )}
      {!error && helperText && (
        <div className="neuron-datepicker-helper-msg">{helperText}</div>
      )}
    </div>
  );
}
