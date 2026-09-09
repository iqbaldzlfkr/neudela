import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Calendar as CalendarIcon, X } from 'lucide-react';
import NeuronButton from './NeuronButton';
import { useLanguage } from '../context/LanguageContext';

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
  /** Explicit locale override */
  locale?: 'en' | 'id';
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
  /** Dropdown popover placement / alignment ('bottom-start', 'bottom-end', or 'auto') */
  placement?: 'bottom-start' | 'bottom-end' | 'auto';
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

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const WEEKDAY_NAMES_EN = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];
const WEEKDAY_NAMES_ID = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export function formatDate(d: Date | null | undefined, locale: 'en' | 'id' = 'en'): string {
  if (!d || isNaN(d.getTime())) return '';
  const monthNames = locale === 'id' ? MONTH_NAMES_ID : MONTH_NAMES_EN;
  const month = monthNames[d.getMonth()].slice(0, 3);
  const day = d.getDate();
  const year = d.getFullYear();
  return locale === 'id' ? `${day} ${month} ${year}` : `${month} ${day}, ${year}`;
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

  for (let i = 1; i <= totalDaysCurrentMonth; i++) {
    const date = new Date(year, month, i);
    cells.push({
      date,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
    });
  }

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

export function getDefaultPresets(isId: boolean): DatePreset[] {
  return [
    {
      id: 'today',
      label: isId ? 'Hari ini' : 'Today',
      getRange: () => {
        const now = new Date();
        return { startDate: now, endDate: now };
      },
    },
    {
      id: 'yesterday',
      label: isId ? 'Kemarin' : 'Yesterday',
      getRange: () => {
        const y = new Date();
        y.setDate(y.getDate() - 1);
        return { startDate: y, endDate: y };
      },
    },
    {
      id: 'this_week',
      label: isId ? 'Minggu ini' : 'This week',
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
      label: isId ? 'Minggu lalu' : 'Last week',
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
      label: isId ? 'Bulan ini' : 'This month',
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { startDate: start, endDate: end };
      },
    },
    {
      id: 'last_month',
      label: isId ? 'Bulan lalu' : 'Last month',
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return { startDate: start, endDate: end };
      },
    },
    {
      id: 'this_year',
      label: isId ? 'Tahun ini' : 'This year',
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear(), 11, 31);
        return { startDate: start, endDate: end };
      },
    },
    {
      id: 'last_year',
      label: isId ? 'Tahun lalu' : 'Last year',
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear() - 1, 0, 1);
        const end = new Date(now.getFullYear() - 1, 11, 31);
        return { startDate: start, endDate: end };
      },
    },
    {
      id: 'all_time',
      label: isId ? 'Semua waktu' : 'All time',
      getRange: () => {
        const start = new Date(2020, 0, 1);
        const end = new Date();
        return { startDate: start, endDate: end };
      },
    },
  ];
}

export const DEFAULT_PRESETS: DatePreset[] = getDefaultPresets(false);

// ─────────────────────────────────────────────────────────────────────────────
// Component Implementation
// ─────────────────────────────────────────────────────────────────────────────

export default function NeuronDatePicker({
  mode = 'single',
  size = 'md',
  variant = 'default',
  locale,
  value,
  rangeValue,
  defaultValue = null,
  defaultRangeValue = { startDate: null, endDate: null },
  onChange,
  onRangeChange,
  onApply,
  onCancel,
  showPresets = true,
  presets,
  activePreset: initialActivePreset = null,
  showTodayButton = true,
  showActions = true,
  trigger = 'inline',
  placeholder,
  placement = 'auto',
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

  let contextLanguage: 'en' | 'id' = 'en';
  try {
    const langContext = useLanguage();
    if (langContext && langContext.language) {
      contextLanguage = langContext.language;
    }
  } catch {
    // fallback if used outside LanguageProvider
  }

  const effectiveLocale = locale || contextLanguage;
  const isId = effectiveLocale === 'id';
  const monthNames = isId ? MONTH_NAMES_ID : MONTH_NAMES_EN;
  const weekdayNames = isId ? WEEKDAY_NAMES_ID : WEEKDAY_NAMES_EN;
  const effectivePresets = presets ?? getDefaultPresets(isId);

  // Internal selection state
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? defaultValue);
  const [selectedRange, setSelectedRange] = useState<DateRange>(rangeValue ?? defaultRangeValue);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [activePreset, setActivePreset] = useState<DatePresetId | null>(initialActivePreset);

  // Popover state
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownAlign, setDropdownAlign] = useState<'start' | 'end'>('start');
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Current view month/year
  const initialDate = selectedDate || selectedRange.startDate || new Date();
  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth());

  // Month-Year quick popup overlay state
  const [activeMonthYearPicker, setActiveMonthYearPicker] = useState<'primary' | 'secondary' | null>(null);
  const [pickerYear, setPickerYear] = useState<number>(initialDate.getFullYear());
  const [pickerMode, setPickerMode] = useState<'month' | 'year'>('month');

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

  // Click outside to close popover & calculate alignment
  useEffect(() => {
    if (trigger !== 'popover' || !isOpen) return;

    if (placement === 'bottom-end') {
      setDropdownAlign('end');
    } else if (placement === 'bottom-start') {
      setDropdownAlign('start');
    } else {
      // Auto placement: measure viewport bounds
      const checkPlacement = () => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          const estimatedWidth = mode === 'double' ? 680 : mode === 'range' ? 320 : 300;
          const popoverWidth = popoverRef.current ? popoverRef.current.offsetWidth || estimatedWidth : estimatedWidth;
          const rightSpace = window.innerWidth - rect.left;

          if (rightSpace < popoverWidth + 24) {
            setDropdownAlign('end');
          } else {
            setDropdownAlign('start');
          }
        }
      };

      checkPlacement();
      window.addEventListener('resize', checkPlacement);
      return () => window.removeEventListener('resize', checkPlacement);
    }
  }, [isOpen, trigger, placement, mode]);

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

  // Cancel & Apply handlers
  const handleCancel = () => {
    if (mode === 'single') {
      setSelectedDate(value ?? defaultValue);
    } else {
      setSelectedRange(rangeValue ?? defaultRangeValue);
    }
    onCancel?.();
    if (trigger === 'popover') setIsOpen(false);
  };

  const handleApply = () => {
    if (mode === 'single') {
      onApply?.(selectedDate);
    } else {
      onApply?.(selectedRange);
    }
    if (trigger === 'popover') setIsOpen(false);
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

  // Month & Year Quick Selector Handlers
  const handleToggleMonthYearPicker = (calendarKey: 'primary' | 'secondary') => {
    if (activeMonthYearPicker === calendarKey) {
      setActiveMonthYearPicker(null);
    } else {
      setActiveMonthYearPicker(calendarKey);
      setPickerYear(calendarKey === 'primary' ? viewYear : nextMonthYear);
      setPickerMode('month');
    }
  };

  const handleSelectMonth = (selectedMonth: number, targetYear: number, calendarKey: 'primary' | 'secondary') => {
    if (calendarKey === 'primary') {
      setViewYear(targetYear);
      setViewMonth(selectedMonth);
    } else {
      if (selectedMonth === 0) {
        setViewYear(targetYear - 1);
        setViewMonth(11);
      } else {
        setViewYear(targetYear);
        setViewMonth(selectedMonth - 1);
      }
    }
    setActiveMonthYearPicker(null);
  };

  const handleSelectYear = (selectedYear: number) => {
    setPickerYear(selectedYear);
    setPickerMode('month');
  };

  const yearRangeStart = Math.floor(pickerYear / 12) * 12;

  // Render a Single Calendar Month
  const renderCalendar = (
    year: number,
    month: number,
    grid: CalendarCell[],
    showNav: { prev: boolean; next: boolean },
    calendarKey: 'primary' | 'secondary' = 'primary'
  ) => {
    const isPickerOpen = activeMonthYearPicker === calendarKey;

    return (
      <div className="neuron-datepicker-calendar">
        {/* Month Header Navigation */}
        <div className="neuron-datepicker-header">
          {!isPickerOpen && showNav.prev ? (
            <button
              type="button"
              className="neuron-datepicker-nav-btn"
              onClick={handlePrevMonth}
              aria-label={isId ? "Bulan sebelumnya" : "Previous month"}
            >
              <ChevronLeft size={16} />
            </button>
          ) : (
            <div className="neuron-datepicker-nav-placeholder" />
          )}

          <button
            type="button"
            className={`neuron-datepicker-month-btn ${isPickerOpen ? 'neuron-datepicker-month-btn--active' : ''}`}
            onClick={() => handleToggleMonthYearPicker(calendarKey)}
            aria-expanded={isPickerOpen}
            aria-label={isId ? "Pilih bulan dan tahun" : "Select month and year"}
          >
            <span>{monthNames[month]} {year}</span>
            <ChevronDown size={14} className={`neuron-datepicker-month-chevron ${isPickerOpen ? 'neuron-datepicker-month-chevron--open' : ''}`} />
          </button>

          {!isPickerOpen && showNav.next ? (
            <button
              type="button"
              className="neuron-datepicker-nav-btn"
              onClick={handleNextMonth}
              aria-label={isId ? "Bulan berikutnya" : "Next month"}
            >
              <ChevronRight size={16} />
            </button>
          ) : (
            <div className="neuron-datepicker-nav-placeholder" />
          )}
        </div>

        {isPickerOpen ? (
          /* Month & Year Quick Selector Overlay */
          <div className="neuron-datepicker-my-view" role="dialog" aria-label={isId ? "Pemilih bulan dan tahun" : "Month and year selector"}>
            {/* Year / Range Nav Header */}
            <div className="neuron-datepicker-my-header">
              <button
                type="button"
                className="neuron-datepicker-nav-btn"
                onClick={() => {
                  if (pickerMode === 'month') {
                    setPickerYear(y => y - 1);
                  } else {
                    setPickerYear(y => y - 12);
                  }
                }}
                aria-label={isId ? "Tahun sebelumnya" : "Previous year"}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                className="neuron-datepicker-my-year-title"
                onClick={() => setPickerMode(m => m === 'month' ? 'year' : 'month')}
                title={isId ? "Klik untuk memilih rentang tahun" : "Click to select year range"}
              >
                <span>{pickerMode === 'month' ? pickerYear : `${yearRangeStart} - ${yearRangeStart + 11}`}</span>
                <ChevronDown size={12} className={`neuron-datepicker-month-chevron ${pickerMode === 'year' ? 'neuron-datepicker-month-chevron--open' : ''}`} />
              </button>

              <button
                type="button"
                className="neuron-datepicker-nav-btn"
                onClick={() => {
                  if (pickerMode === 'month') {
                    setPickerYear(y => y + 1);
                  } else {
                    setPickerYear(y => y + 12);
                  }
                }}
                aria-label={isId ? "Tahun berikutnya" : "Next year"}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Months Grid */}
            {pickerMode === 'month' ? (
              <div className="neuron-datepicker-my-grid">
                {monthNames.map((mName, mIdx) => {
                  const isCurrentMonthView = mIdx === month && pickerYear === year;
                  const now = new Date();
                  const isThisMonth = mIdx === now.getMonth() && pickerYear === now.getFullYear();

                  return (
                    <button
                      key={mIdx}
                      type="button"
                      className={[
                        'neuron-datepicker-my-cell',
                        isCurrentMonthView ? 'neuron-datepicker-my-cell--selected' : '',
                        isThisMonth && !isCurrentMonthView ? 'neuron-datepicker-my-cell--current' : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => handleSelectMonth(mIdx, pickerYear, calendarKey)}
                    >
                      {mName.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Years Grid */
              <div className="neuron-datepicker-my-grid">
                {Array.from({ length: 12 }, (_, i) => yearRangeStart + i).map((yr) => {
                  const isCurrentViewYear = yr === pickerYear;
                  const isThisYear = yr === new Date().getFullYear();

                  return (
                    <button
                      key={yr}
                      type="button"
                      className={[
                        'neuron-datepicker-my-cell',
                        isCurrentViewYear ? 'neuron-datepicker-my-cell--selected' : '',
                        isThisYear && !isCurrentViewYear ? 'neuron-datepicker-my-cell--current' : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => handleSelectYear(yr)}
                    >
                      {yr}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Quick Footer */}
            <div className="neuron-datepicker-my-quick-footer">
              <button
                type="button"
                className="neuron-datepicker-my-back-btn"
                onClick={() => {
                  const now = new Date();
                  handleSelectMonth(now.getMonth(), now.getFullYear(), calendarKey);
                }}
              >
                {isId ? 'Bulan Ini' : 'This Month'}
              </button>
              <button
                type="button"
                className="neuron-datepicker-my-back-btn"
                onClick={() => setActiveMonthYearPicker(null)}
              >
                {isId ? 'Kembali' : 'Back'}
              </button>
            </div>
          </div>
        ) : (
          /* Normal Calendar Days Grid */
          <>
            {/* Weekday Row */}
            <div className="neuron-datepicker-weekdays" role="row">
              {weekdayNames.map(day => (
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
          </>
        )}
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
              {effectivePresets.map(preset => {
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
                    value={formatDate(selectedDate, effectiveLocale)}
                    placeholder={isId ? "Pilih tanggal" : "Select date"}
                    className="neuron-datepicker-text-input"
                    aria-label="Selected date"
                  />
                </div>
                {showTodayButton && (
                  <NeuronButton
                    type="button"
                    variant="outline"
                    size={size === 'lg' ? 'md' : 'sm'}
                    onClick={handleTodayClick}
                  >
                    {isId ? 'Hari Ini' : 'Today'}
                  </NeuronButton>
                )}
              </div>
            )}

            {mode === 'range' && (
              <div className="neuron-datepicker-input-row neuron-datepicker-input-row--range">
                <div className="neuron-datepicker-input-field">
                  <input
                    type="text"
                    readOnly
                    value={formatDate(selectedRange.startDate, effectiveLocale)}
                    placeholder={isId ? "Tanggal mulai" : "Start date"}
                    className="neuron-datepicker-text-input"
                    aria-label="Start date"
                  />
                </div>
                <span className="neuron-datepicker-range-sep">—</span>
                <div className="neuron-datepicker-input-field">
                  <input
                    type="text"
                    readOnly
                    value={formatDate(selectedRange.endDate, effectiveLocale)}
                    placeholder={isId ? "Tanggal selesai" : "End date"}
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
                  : { prev: true, next: true },
                'primary'
              )}

              {/* Secondary Calendar (for double mode) */}
              {mode === 'double' && (
                <div className="neuron-datepicker-secondary-cal">
                  {renderCalendar(
                    nextMonthYear,
                    nextMonth,
                    secondaryGrid,
                    { prev: false, next: true },
                    'secondary'
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
                          value={formatDate(selectedRange.startDate, effectiveLocale)}
                          placeholder={isId ? "Tanggal mulai" : "Start date"}
                          className="neuron-datepicker-text-input"
                          aria-label="Start date"
                        />
                      </div>
                      <span className="neuron-datepicker-range-sep">—</span>
                      <div className="neuron-datepicker-input-field">
                        <input
                          type="text"
                          readOnly
                          value={formatDate(selectedRange.endDate, effectiveLocale)}
                          placeholder={isId ? "Tanggal selesai" : "End date"}
                          className="neuron-datepicker-text-input"
                          aria-label="End date"
                        />
                      </div>
                    </div>
                    <div className="neuron-datepicker-footer-btns">
                      <NeuronButton
                        type="button"
                        variant="outline"
                        size={size === 'lg' ? 'md' : 'sm'}
                        onClick={handleCancel}
                      >
                        {isId ? 'Batal' : 'Cancel'}
                      </NeuronButton>
                      <NeuronButton
                        type="button"
                        variant="primary"
                        size={size === 'lg' ? 'md' : 'sm'}
                        onClick={handleApply}
                      >
                        {isId ? 'Terapkan' : 'Apply'}
                      </NeuronButton>
                    </div>
                  </>
                ) : (
                  <div className="neuron-datepicker-footer-btns neuron-datepicker-footer-btns--full">
                    <NeuronButton
                      type="button"
                      variant="outline"
                      size={size === 'lg' ? 'md' : 'sm'}
                      onClick={handleCancel}
                    >
                      {isId ? 'Batal' : 'Cancel'}
                    </NeuronButton>
                    <NeuronButton
                      type="button"
                      variant="primary"
                      size={size === 'lg' ? 'md' : 'sm'}
                      onClick={handleApply}
                    >
                      {isId ? 'Terapkan' : 'Apply'}
                    </NeuronButton>
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
      ? selectedDate ? formatDate(selectedDate, effectiveLocale) : ''
      : selectedRange.startDate && selectedRange.endDate
      ? `${formatDate(selectedRange.startDate, effectiveLocale)} - ${formatDate(selectedRange.endDate, effectiveLocale)}`
      : selectedRange.startDate
      ? `${formatDate(selectedRange.startDate, effectiveLocale)} - ...`
      : '';

  const defaultPlaceholder = isId ? 'Pilih tanggal...' : 'Select date...';

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
          {displayTriggerText || placeholder || defaultPlaceholder}
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
            title={isId ? "Hapus tanggal" : "Clear date"}
          >
            <X size={14} />
          </span>
        )}
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`neuron-datepicker-dropdown neuron-datepicker-dropdown--${dropdownAlign}`}
          role="dialog"
          aria-modal="true"
        >
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
