import React, { useState, useRef, useId, ReactNode } from 'react';
import { Star, Heart, ThumbsUp, Smile, Circle } from 'lucide-react';

export type NeuronRatingSize = 'sm' | 'md' | 'lg' | 'xl';

export type NeuronRatingVariant =
  | 'brand'
  | 'amber'
  | 'yellow'
  | 'red'
  | 'purple'
  | 'blue'
  | 'emerald'
  | 'gray';

export type NeuronRatingIconType = 'star' | 'heart' | 'thumb' | 'smile' | 'circle';

export interface NeuronRatingProps {
  /** Controlled value (supports floating point like 4.5 or 3.7) */
  value?: number;
  /** Initial value for uncontrolled usage */
  defaultValue?: number;
  /** Callback fired when rating value changes */
  onChange?: (value: number) => void;
  /** Callback fired when hovering over items */
  onHoverChange?: (value: number | null) => void;
  /** Total number of items (default: 5) */
  max?: number;
  /** Increment step: 1 for whole numbers, 0.5 for half items, 0.1 for fine decimals */
  precision?: number;
  /** Quick helper to enable 0.5 step selection */
  allowHalf?: boolean;
  /** Visual scale */
  size?: NeuronRatingSize;
  /** Semantic color theme */
  variant?: NeuronRatingVariant;
  /** Icon metaphor: preset string or custom node / render function */
  icon?: NeuronRatingIconType | ReactNode | ((index: number, state: { filled: boolean; active: boolean; half: boolean }) => ReactNode);
  /** Custom empty icon for unselected states */
  emptyIcon?: ReactNode;
  /** Whether the rating is display-only (no clicks or hover updates) */
  readOnly?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether clicking the active value resets it to 0 (default: true for interactive) */
  clearable?: boolean;
  /** Only highlight the hovered/selected item (useful for mood/smileys and thumbs) */
  highlightSelectedOnly?: boolean;
  /** Show numeric value badge/text beside items */
  showValue?: boolean;
  /** Custom formatter for the displayed numeric score */
  valueFormat?: (value: number, max: number) => ReactNode;
  /** Text labels corresponding to each rating step */
  labels?: Record<number, string> | string[];
  /** Whether to show descriptive feedback label dynamically */
  showLabel?: boolean;
  /** Position of the descriptive label relative to stars */
  labelPosition?: 'right' | 'bottom' | 'top';
  /** Total review count to display, e.g. (1,420) */
  count?: number;
  /** Accessible name / form name */
  name?: string;
  /** Custom ID */
  id?: string;
  /** Tooltips to display on hover for each star */
  tooltips?: string[];
  /** Additional CSS class names */
  className?: string;
  /** Inline styling */
  style?: React.CSSProperties;
}

const SIZE_MAP: Record<NeuronRatingSize, { iconSize: number; gap: number; fontSize: number }> = {
  sm: { iconSize: 16, gap: 4, fontSize: 12 },
  md: { iconSize: 22, gap: 6, fontSize: 14 },
  lg: { iconSize: 30, gap: 8, fontSize: 16 },
  xl: { iconSize: 38, gap: 10, fontSize: 18 },
};

const VARIANT_COLORS: Record<NeuronRatingVariant, { fill: string; emptyStroke: string }> = {
  brand: { fill: 'var(--brand-500, #f97316)', emptyStroke: 'var(--color-border, #cbd5e1)' },
  amber: { fill: '#f59e0b', emptyStroke: 'var(--color-border, #cbd5e1)' },
  yellow: { fill: '#eab308', emptyStroke: 'var(--color-border, #cbd5e1)' },
  red: { fill: '#ef4444', emptyStroke: 'var(--color-border, #cbd5e1)' },
  purple: { fill: '#a855f7', emptyStroke: 'var(--color-border, #cbd5e1)' },
  blue: { fill: '#3b82f6', emptyStroke: 'var(--color-border, #cbd5e1)' },
  emerald: { fill: '#10b981', emptyStroke: 'var(--color-border, #cbd5e1)' },
  gray: { fill: '#64748b', emptyStroke: 'var(--color-border, #cbd5e1)' },
};

export const NeuronRating: React.FC<NeuronRatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  onHoverChange,
  max = 5,
  precision: propPrecision,
  allowHalf = false,
  size = 'md',
  variant = 'amber',
  icon = 'star',
  emptyIcon,
  readOnly = false,
  disabled = false,
  clearable = true,
  highlightSelectedOnly = false,
  showValue = false,
  valueFormat,
  labels,
  showLabel = false,
  labelPosition = 'right',
  count,
  name,
  id: customId,
  tooltips,
  className = '',
  style,
}) => {
  const generatedId = useId();
  const ratingId = customId || `neuron-rating-${generatedId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  // Precision calculation
  const precision = propPrecision !== undefined ? propPrecision : allowHalf ? 0.5 : 1;

  // Controlled vs uncontrolled state
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;

  // Hover state
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Effective display value
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const { iconSize, gap } = SIZE_MAP[size];
  const activeColor = VARIANT_COLORS[variant].fill;

  // Handle click on star
  const handleItemClick = (targetValue: number) => {
    if (readOnly || disabled) return;

    let nextValue = targetValue;
    if (clearable && currentValue === targetValue) {
      nextValue = 0;
    }

    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  // Handle mouse move to calculate half or full step
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (readOnly || disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const isHalf = precision === 0.5 && offsetX < rect.width / 2;
    const newHover = isHalf ? index - 0.5 : index;

    if (newHover !== hoverValue) {
      setHoverValue(newHover);
      setActiveItemIndex(index);
      onHoverChange?.(newHover);
    }
  };

  const handleMouseLeave = () => {
    if (readOnly || disabled) return;
    setHoverValue(null);
    setActiveItemIndex(null);
    onHoverChange?.(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || disabled) return;

    let nextVal = currentValue;
    const step = precision;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        nextVal = Math.min(max, Number((currentValue + step).toFixed(2)));
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        nextVal = Math.max(0, Number((currentValue - step).toFixed(2)));
        break;
      case 'Home':
        e.preventDefault();
        nextVal = 0;
        break;
      case 'End':
        e.preventDefault();
        nextVal = max;
        break;
      default:
        return;
    }

    if (!isControlled) {
      setInternalValue(nextVal);
    }
    onChange?.(nextVal);
  };

  // Helper to render icon glyph
  const renderGlyph = (filled: boolean, customColor?: string) => {
    const strokeCol = filled ? (customColor || activeColor) : 'var(--color-border-subtle, #94a3b8)';
    const fillCol = filled ? (customColor || activeColor) : 'transparent';

    if (typeof icon === 'function') {
      return icon(0, { filled, active: false, half: false });
    }

    if (typeof icon !== 'string' && React.isValidElement(icon)) {
      return icon;
    }

    switch (icon) {
      case 'heart':
        return (
          <Heart
            size={iconSize}
            stroke={strokeCol}
            fill={fillCol}
            strokeWidth={2}
            className="neuron-rating__icon-svg"
          />
        );
      case 'thumb':
        return (
          <ThumbsUp
            size={iconSize}
            stroke={strokeCol}
            fill={fillCol}
            strokeWidth={2}
            className="neuron-rating__icon-svg"
          />
        );
      case 'circle':
        return (
          <Circle
            size={iconSize}
            stroke={strokeCol}
            fill={fillCol}
            strokeWidth={2}
            className="neuron-rating__icon-svg"
          />
        );
      case 'smile':
        return (
          <Smile
            size={iconSize}
            stroke={strokeCol}
            fill={fillCol}
            strokeWidth={2}
            className="neuron-rating__icon-svg"
          />
        );
      case 'star':
      default:
        return (
          <Star
            size={iconSize}
            stroke={strokeCol}
            fill={fillCol}
            strokeWidth={1.8}
            className="neuron-rating__icon-svg"
          />
        );
    }
  };

  // Resolve dynamic label text
  const getDynamicLabel = () => {
    if (!labels) return null;
    const rounded = Math.round(displayValue);
    if (Array.isArray(labels)) {
      if (rounded >= 1 && rounded <= labels.length) {
        return labels[rounded - 1];
      }
    } else if (typeof labels === 'object') {
      return labels[rounded] || labels[displayValue] || null;
    }
    return null;
  };

  const dynamicLabel = getDynamicLabel();

  return (
    <div
      id={ratingId}
      ref={containerRef}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={name || `Rating: ${displayValue} of ${max}`}
      aria-valuenow={displayValue}
      aria-valuemin={0}
      aria-valuemax={max}
      tabIndex={readOnly || disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      className={`neuron-rating neuron-rating--size-${size} neuron-rating--variant-${variant} ${
        readOnly ? 'is-readonly' : ''
      } ${disabled ? 'is-disabled' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: labelPosition === 'bottom' ? 'column' : labelPosition === 'top' ? 'column-reverse' : 'row',
        alignItems: labelPosition === 'bottom' || labelPosition === 'top' ? 'flex-start' : 'center',
        gap: labelPosition === 'bottom' || labelPosition === 'top' ? '6px' : '10px',
        ...style,
      }}
    >
      {/* Stars Container */}
      <div
        className="neuron-rating__track"
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {Array.from({ length: max }, (_, idx) => {
          const itemIndex = idx + 1;

          // Fill percentage calculation
          let fillPercent = 0;
          if (highlightSelectedOnly) {
            fillPercent = Math.round(displayValue) === itemIndex ? 100 : 0;
          } else {
            if (displayValue >= itemIndex) {
              fillPercent = 100;
            } else if (displayValue <= itemIndex - 1) {
              fillPercent = 0;
            } else {
              fillPercent = Math.max(0, Math.min(100, (displayValue - (itemIndex - 1)) * 100));
            }
          }

          const isItemHovered = activeItemIndex === itemIndex;
          const tooltipText = tooltips && tooltips[idx];

          return (
            <button
              key={itemIndex}
              type="button"
              role="radio"
              aria-checked={displayValue >= itemIndex}
              aria-label={tooltipText || `${itemIndex} of ${max}`}
              title={tooltipText || `${itemIndex} / ${max}`}
              disabled={disabled || readOnly}
              tabIndex={-1}
              onClick={() => {
                const target = precision === 0.5 && hoverValue !== null ? hoverValue : itemIndex;
                handleItemClick(target);
              }}
              onMouseEnter={(e) => handleMouseMove(e, itemIndex)}
              onMouseMove={(e) => handleMouseMove(e, itemIndex)}
              className={`neuron-rating__item ${fillPercent > 0 ? 'is-filled' : ''} ${
                fillPercent === 100 ? 'is-full' : fillPercent > 0 ? 'is-half' : 'is-empty'
              } ${isItemHovered ? 'is-hovered' : ''}`}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                padding: `0 ${gap / 2}px`,
                margin: 0,
                cursor: readOnly ? 'default' : disabled ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                outline: 'none',
                userSelect: 'none',
                boxSizing: 'content-box',
              }}
            >
              {/* Background: Empty Glyph */}
              <div
                className="neuron-rating__glyph neuron-rating__glyph--empty"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  color: 'var(--color-border-subtle, #cbd5e1)',
                }}
              >
                {emptyIcon || renderGlyph(false)}
              </div>

              {/* Foreground: Clipped Active/Filled Glyph */}
              {fillPercent > 0 && (
                <div
                  className="neuron-rating__overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${gap / 2}px`,
                    height: '100%',
                    width: `${(fillPercent / 100) * iconSize}px`,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      flexShrink: 0,
                    }}
                  >
                    {renderGlyph(true)}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Label and Info Group */}
      {(showValue || showLabel || count !== undefined) && (
        <div
          className="neuron-rating__info"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: `${SIZE_MAP[size].fontSize}px`,
            lineHeight: 1.3,
          }}
        >
          {/* Numerical Value Badge */}
          {showValue && (
            <span
              className="neuron-rating__value-badge"
              style={{
                fontWeight: 700,
                color: 'var(--color-text-primary, #0f172a)',
                fontVariantNumeric: 'tabular-nums',
                display: 'inline-block',
                minWidth: '28px',
                textAlign: 'center',
              }}
            >
              {valueFormat ? valueFormat(displayValue, max) : displayValue.toFixed(precision === 1 ? 0 : 1)}
            </span>
          )}

          {/* Dynamic Descriptive Feedback Label */}
          {showLabel && (
            <span
              className="neuron-rating__feedback-label"
              style={{
                fontWeight: 600,
                color: activeColor,
                display: 'inline-block',
                minWidth: '120px',
                textAlign: 'left',
                transition: 'color 0.15s ease',
              }}
            >
              {dynamicLabel || '\u00A0'}
            </span>
          )}

          {/* Review Count e.g. (1,420) */}
          {count !== undefined && (
            <span
              className="neuron-rating__count"
              style={{
                color: 'var(--color-text-secondary, #64748b)',
                fontSize: '0.9em',
              }}
            >
              ({count.toLocaleString()})
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default NeuronRating;
