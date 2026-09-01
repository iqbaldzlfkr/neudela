import React from 'react';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
export type NeuronProgressType    = 'bar' | 'circle' | 'half-circle';
export type NeuronProgressSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type NeuronProgressVariant = 'brand' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type NeuronProgressValuePosition = 'top' | 'right' | 'bubble' | 'none';

export interface NeuronProgressProps {
  /** Bar, full circle, or half-circle (gauge) indicator */
  type?: NeuronProgressType;
  /** 0–100 */
  value?: number;
  /** Visual size */
  size?: NeuronProgressSize;
  /** Color variant */
  variant?: NeuronProgressVariant;
  /** Show percentage label */
  showValue?: boolean;
  /** Where to position the percentage value (bar only) */
  valuePosition?: NeuronProgressValuePosition;
  /** Optional supporting label (e.g. "Active users") */
  label?: string;
  /** Optional pin/dot indicator at the start */
  showPin?: boolean;
  /** Animate the fill on mount */
  animated?: boolean;
  /** Striped fill (bar only) */
  striped?: boolean;
  /** Indeterminate / loading state */
  indeterminate?: boolean;
  /** aria-label for accessibility */
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ─────────────────────────────────────────────────────────────
// Size maps
// ─────────────────────────────────────────────────────────────
const BAR_HEIGHT: Record<NeuronProgressSize, number> = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
};

const CIRCLE_SIZE: Record<NeuronProgressSize, number> = {
  xs: 48,
  sm: 82,
  md: 112,
  lg: 148,
  xl: 184,
};

const CIRCLE_STROKE: Record<NeuronProgressSize, number> = {
  xs: 4,
  sm: 6.5,
  md: 9.5,
  lg: 12,
  xl: 15,
};

const CIRCLE_FONT: Record<NeuronProgressSize, string> = {
  xs: '11px',
  sm: '15px',
  md: '20px',
  lg: '26px',
  xl: '32px',
};

const CIRCLE_LABEL_FONT: Record<NeuronProgressSize, string> = {
  xs: '8px',
  sm: '8.5px',
  md: '11px',
  lg: '12px',
  xl: '14px',
};

// ─────────────────────────────────────────────────────────────
// Color map (uses CSS tokens)
// ─────────────────────────────────────────────────────────────
const VARIANT_COLOR: Record<NeuronProgressVariant, string> = {
  brand:   'var(--brand-500)',
  success: 'var(--emerald-500)',
  warning: 'var(--amber-500)',
  error:   'var(--red-500)',
  info:    'var(--blue-500)',
  neutral: 'var(--slate-400)',
};

const VARIANT_TRACK: Record<NeuronProgressVariant, string> = {
  brand:   'var(--color-bg-subtle, #f1f5f9)',
  success: 'var(--color-bg-subtle, #f1f5f9)',
  warning: 'var(--color-bg-subtle, #f1f5f9)',
  error:   'var(--color-bg-subtle, #f1f5f9)',
  info:    'var(--color-bg-subtle, #f1f5f9)',
  neutral: 'var(--color-bg-subtle, #f1f5f9)',
};

// ─────────────────────────────────────────────────────────────
// Progress Bar
// ─────────────────────────────────────────────────────────────
function ProgressBar({
  value = 0,
  size = 'md',
  variant = 'brand',
  showValue = false,
  valuePosition = 'top',
  label,
  showPin = false,
  animated = true,
  striped = false,
  indeterminate = false,
  ariaLabel,
  className = '',
  style,
}: NeuronProgressProps) {
  const clamp = Math.min(100, Math.max(0, value));
  const height = BAR_HEIGHT[size];
  const fillColor = VARIANT_COLOR[variant];
  const trackColor = VARIANT_TRACK[variant];

  const fillStyle: React.CSSProperties = {
    width: indeterminate ? '40%' : `${clamp}%`,
    height: '100%',
    borderRadius: 'inherit',
    backgroundColor: fillColor,
    backgroundImage: striped
      ? `repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.25),
          rgba(255, 255, 255, 0.25) 8px,
          transparent 8px,
          transparent 16px
        )`
      : undefined,
    backgroundSize: striped ? '22.63px 22.63px' : undefined,
    animation: indeterminate
      ? 'neuron-progress-indeterminate 1.5s ease infinite'
      : striped
      ? 'neuron-progress-stripes 1s linear infinite'
      : undefined,
    transition: animated && !indeterminate ? 'width 0.12s linear' : undefined,
  };

  return (
    <div
      className={`neuron-progress neuron-progress--bar neuron-progress--${size} neuron-progress--${variant} ${className}`}
      style={{ width: '100%', ...style }}
    >
      {/* Top Header if position is top or label exists */}
      {(label || (showValue && valuePosition === 'top')) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, gap: 8 }}>
          {label && (
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              {label}
            </span>
          )}
          {showValue && valuePosition === 'top' && (
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)', marginLeft: 'auto' }}>
              {indeterminate ? '—' : `${clamp}%`}
            </span>
          )}
        </div>
      )}

      {/* Floating Tooltip/Bubble Value (Figma Spec) */}
      {showValue && valuePosition === 'bubble' && !indeterminate && (
        <div style={{ position: 'relative', height: 26, marginBottom: 4 }}>
          <div
            style={{
              position: 'absolute',
              left: `${clamp}%`,
              transform: 'translateX(-50%)',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '2px 7px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              boxShadow: 'var(--shadow-sm)',
              whiteSpace: 'nowrap',
              transition: animated ? 'left 0.6s cubic-bezier(0.4,0,0.2,1)' : undefined,
            }}
          >
            {clamp}%
            <div
              style={{
                position: 'absolute',
                bottom: -4,
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: 6,
                height: 6,
                background: 'var(--color-bg-surface)',
                borderRight: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
              }}
            />
          </div>
        </div>
      )}

      {/* Main Track Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
        {showPin && (
          <div
            style={{
              width: height + 2,
              height: height + 2,
              borderRadius: '50%',
              background: fillColor,
              flexShrink: 0,
            }}
          />
        )}
        <div
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : clamp}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={ariaLabel ?? label ?? 'Progress'}
          aria-valuetext={indeterminate ? 'Loading' : `${clamp}%`}
          style={{
            flex: 1,
            height,
            borderRadius: height / 2,
            background: trackColor,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={fillStyle} />
        </div>
        {showValue && valuePosition === 'right' && (
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)', minWidth: '32px', textAlign: 'right', flexShrink: 0 }}>
            {indeterminate ? '—' : `${clamp}%`}
          </span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Progress Circle & Half-Circle (Gauge)
// ─────────────────────────────────────────────────────────────
function ProgressCircle({
  type = 'circle',
  value = 0,
  size = 'md',
  variant = 'brand',
  showValue = true,
  label,
  animated = true,
  indeterminate = false,
  ariaLabel,
  className = '',
  style,
}: NeuronProgressProps) {
  const clamp = Math.min(100, Math.max(0, value));
  const diameter = CIRCLE_SIZE[size];
  const stroke = CIRCLE_STROKE[size];
  const radius = (diameter - stroke) / 2;
  const isHalf = type === 'half-circle';

  const fillColor = VARIANT_COLOR[variant];
  const trackColor = VARIANT_TRACK[variant];
  const valueFontSize = CIRCLE_FONT[size];
  const labelFontSize = CIRCLE_LABEL_FONT[size];

  // Half Circle (Gauge) Parameters
  const cx = diameter / 2;
  const cy = diameter / 2;
  const halfSvgHeight = diameter / 2 + stroke;
  const semiArcLength = Math.PI * radius;
  const semiOffset = (1 - clamp / 100) * semiArcLength;

  // Full Circle Parameters
  const fullCircumference = 2 * Math.PI * radius;
  const fullOffset = (1 - clamp / 100) * fullCircumference;

  // Handle small size label placement (xs places label underneath outside)
  const isXs = size === 'xs';
  const showOutsideLabel = isXs && !!label;

  return (
    <div
      className={`neuron-progress neuron-progress--${type} neuron-progress--${size} neuron-progress--${variant} ${className}`}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...style }}
    >
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamp}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? label ?? 'Progress'}
        style={{
          position: 'relative',
          width: diameter,
          height: isHalf ? halfSvgHeight : diameter,
          flexShrink: 0,
        }}
      >
        {isHalf ? (
          // ── Semi-Circle / Half Gauge Arc (Sweeps from left 180° to right 0° over the top) ──
          <svg
            width={diameter}
            height={halfSvgHeight}
            viewBox={`0 0 ${diameter} ${halfSvgHeight}`}
            style={{ display: 'block' }}
          >
            {/* Track Arc */}
            <path
              d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
              fill="none"
              stroke={trackColor}
              strokeWidth={stroke}
              strokeLinecap="round"
            />
            {/* Fill Arc */}
            <path
              d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
              fill="none"
              stroke={fillColor}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={semiArcLength}
              strokeDashoffset={indeterminate ? semiArcLength * 0.5 : semiOffset}
              style={{
                transition: animated && !indeterminate ? 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)' : undefined,
              }}
            />
          </svg>
        ) : (
          // ── Full Radial Circle ──
          <svg
            width={diameter}
            height={diameter}
            viewBox={`0 0 ${diameter} ${diameter}`}
            style={{
              display: 'block',
              animation: indeterminate ? 'neuron-progress-spin 1.2s linear infinite' : undefined,
            }}
          >
            {/* Track Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={trackColor}
              strokeWidth={stroke}
              strokeLinecap="round"
            />
            {/* Fill Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={fillColor}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={fullCircumference}
              strokeDashoffset={indeterminate ? fullCircumference * 0.75 : fullOffset}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                transition: animated && !indeterminate ? 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)' : undefined,
              }}
            />
          </svg>
        )}

        {/* Center content */}
        {showValue && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: isHalf ? 'flex-end' : 'center',
              paddingBottom: isHalf ? (size === 'sm' ? 2 : size === 'xs' ? 1 : 4) : 0,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            {label && !isXs && (
              <span
                style={{
                  fontSize: isHalf && size === 'sm' ? '8px' : labelFontSize,
                  color: 'var(--color-text-secondary)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  marginBottom: isHalf ? 0 : 1,
                  maxWidth: isHalf ? diameter * 0.65 : diameter * 0.72,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  letterSpacing: isHalf && size === 'sm' ? '-0.02em' : 'normal',
                }}
              >
                {label}
              </span>
            )}
            <span
              style={{
                fontSize: isHalf && size === 'sm' ? '14px' : valueFontSize,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                lineHeight: 1.1,
              }}
            >
              {indeterminate ? '…' : `${clamp}%`}
            </span>
          </div>
        )}
      </div>

      {/* Outside Sub-Label for xs size (matching Figma spec) */}
      {showOutsideLabel && (
        <span
          style={{
            fontSize: '9px',
            color: 'var(--color-text-secondary)',
            fontWeight: 500,
            marginTop: 3,
            textAlign: 'center',
          }}
        >
          {label === 'Active users' ? 'Users' : label}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────
export default function NeuronProgress({ type = 'bar', ...props }: NeuronProgressProps) {
  if (type === 'circle' || type === 'half-circle') {
    return <ProgressCircle type={type} {...props} />;
  }
  return <ProgressBar {...props} />;
}
