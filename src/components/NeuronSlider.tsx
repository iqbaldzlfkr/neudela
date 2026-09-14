import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  useId,
} from 'react';

export type NeuronSliderSize = 'sm' | 'md' | 'lg';
export type NeuronSliderVariant = 'brand' | 'neutral' | 'success' | 'warning' | 'error';
export type SliderTooltipPlacement = 'top' | 'bottom';
export type SliderTooltipVisible = 'always' | 'hover' | 'never';

export interface NeuronSliderProps {
  /** Dual-thumb range slider mode */
  range?: boolean;
  /** Current value (number for single slider, [number, number] for range slider) */
  value?: number | [number, number];
  /** Default value for uncontrolled usage */
  defaultValue?: number | [number, number];
  /** Minimum slider value (default: 0) */
  min?: number;
  /** Maximum slider value (default: 100) */
  max?: number;
  /** Step increment (default: 1) */
  step?: number;
  /** Theme / color variant */
  variant?: NeuronSliderVariant;
  /** Size modifier */
  size?: NeuronSliderSize;
  /** Show speech bubble tooltips (columns 3 & 4 in reference matrix) */
  showTooltip?: boolean;
  /** Tooltip position: 'top' (downward arrow) or 'bottom' (upward arrow) */
  tooltipPlacement?: SliderTooltipPlacement;
  /** Tooltip visibility rule: 'always' | 'hover' | 'never' */
  tooltipVisible?: SliderTooltipVisible;
  /** Show text value directly beneath thumb (column 2 in reference matrix) */
  showLabels?: boolean;
  /** Formatter for displaying values in tooltips/labels */
  formatValue?: (val: number) => string;
  /** Discrete step marks along the track */
  marks?: boolean | number[] | Record<number, React.ReactNode>;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Top label */
  label?: React.ReactNode;
  /** Show current formatted value in the top header */
  showValueInHeader?: boolean;
  /** Helper text displayed beneath the slider */
  helperText?: React.ReactNode;
  /** Error message displayed beneath the slider */
  error?: React.ReactNode;
  /** Value change callback */
  onChange?: (val: any) => void;
  /** Change commitment callback on pointer release */
  onChangeEnd?: (val: any) => void;
  /** Form field name */
  name?: string;
  /** Custom container class */
  className?: string;
  /** Custom container style */
  style?: React.CSSProperties;
  /** Accessibility label */
  'aria-label'?: string;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function roundToStep(val: number, step: number, min: number): number {
  const steps = Math.round((val - min) / step);
  return Number((min + steps * step).toFixed(10));
}

const NeuronSlider = forwardRef<HTMLDivElement, NeuronSliderProps>(
  (
    {
      range = false,
      value: controlledValue,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      variant = 'brand',
      size = 'md',
      showTooltip = false,
      tooltipPlacement = 'top',
      tooltipVisible = 'hover',
      showLabels = false,
      formatValue,
      marks,
      disabled = false,
      readOnly = false,
      label,
      showValueInHeader = false,
      helperText,
      error,
      onChange,
      onChangeEnd,
      name,
      className = '',
      style,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const defaultFormat = useCallback((v: number) => `${v}%`, []);
    const formatter = formatValue || defaultFormat;

    // Initial state setup
    const getInitialVal = (): [number, number] => {
      if (range) {
        if (Array.isArray(controlledValue)) return controlledValue;
        if (Array.isArray(defaultValue)) return defaultValue;
        return [min + (max - min) * 0.25, min + (max - min) * 0.75];
      }
      const single = typeof controlledValue === 'number'
        ? controlledValue
        : typeof defaultValue === 'number'
        ? defaultValue
        : min;
      return [single, single];
    };

    const [internalVal, setInternalVal] = useState<[number, number]>(getInitialVal);
    const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
    const [hoveredThumb, setHoveredThumb] = useState<'min' | 'max' | null>(null);

    const railRef = useRef<HTMLDivElement>(null);
    const currentValuesRef = useRef<[number, number]>(internalVal);

    // Sync controlled updates
    useEffect(() => {
      if (isControlled) {
        if (range && Array.isArray(controlledValue)) {
          setInternalVal(controlledValue);
          currentValuesRef.current = controlledValue;
        } else if (!range && typeof controlledValue === 'number') {
          setInternalVal([controlledValue, controlledValue]);
          currentValuesRef.current = [controlledValue, controlledValue];
        }
      }
    }, [controlledValue, isControlled, range]);

    const val0 = internalVal[0];
    const val1 = internalVal[1];

    // Compute percent for positioning
    const rangeSpan = max - min || 1;
    const p0 = clamp(((val0 - min) / rangeSpan) * 100, 0, 100);
    const p1 = clamp(((val1 - min) / rangeSpan) * 100, 0, 100);

    const fillLeft = range ? Math.min(p0, p1) : 0;
    const fillWidth = range ? Math.abs(p1 - p0) : p0;

    // Value calculation from pointer coordinates
    const getValueFromPointer = useCallback(
      (clientX: number): number => {
        if (!railRef.current) return min;
        const rect = railRef.current.getBoundingClientRect();
        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
        const raw = min + ratio * (max - min);
        const snapped = roundToStep(raw, step, min);
        return clamp(snapped, min, max);
      },
      [min, max, step]
    );

    const updateValue = useCallback(
      (newVal: number, thumb: 'min' | 'max') => {
        if (disabled || readOnly) return;
        const [prev0, prev1] = currentValuesRef.current;

        if (!range) {
          const clamped = clamp(newVal, min, max);
          if (clamped !== prev0) {
            currentValuesRef.current = [clamped, clamped];
            if (!isControlled) setInternalVal([clamped, clamped]);
            onChange?.(clamped);
          }
        } else {
          let next0 = prev0;
          let next1 = prev1;
          if (thumb === 'min') {
            next0 = clamp(newVal, min, prev1);
          } else {
            next1 = clamp(newVal, prev0, max);
          }
          if (next0 !== prev0 || next1 !== prev1) {
            const nextTuple: [number, number] = [next0, next1];
            currentValuesRef.current = nextTuple;
            if (!isControlled) setInternalVal(nextTuple);
            onChange?.(nextTuple);
          }
        }
      },
      [disabled, readOnly, range, min, max, isControlled, onChange]
    );

    // Pointer event handlers for smooth click and drag
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || readOnly) return;
      if (e.button !== 0) return; // only primary mouse button
      e.preventDefault();

      const clickVal = getValueFromPointer(e.clientX);
      let targetThumb: 'min' | 'max' = 'max';

      if (!range) {
        targetThumb = 'min';
        updateValue(clickVal, 'min');
      } else {
        const d0 = Math.abs(clickVal - val0);
        const d1 = Math.abs(clickVal - val1);
        if (d0 < d1) {
          targetThumb = 'min';
          updateValue(clickVal, 'min');
        } else if (d1 < d0) {
          targetThumb = 'max';
          updateValue(clickVal, 'max');
        } else {
          targetThumb = clickVal < val0 ? 'min' : 'max';
          updateValue(clickVal, targetThumb);
        }
      }

      setActiveThumb(targetThumb);
      const targetThumbCaptured = targetThumb;

      const onPointerMove = (moveEvent: PointerEvent) => {
        const nextVal = getValueFromPointer(moveEvent.clientX);
        updateValue(nextVal, targetThumbCaptured);
      };

      const onPointerUp = () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        setActiveThumb(null);
        if (range) {
          onChangeEnd?.(currentValuesRef.current);
        } else {
          onChangeEnd?.(currentValuesRef.current[0]);
        }
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    };

    // Keyboard support
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, thumb: 'min' | 'max') => {
      if (disabled || readOnly) return;
      const current = thumb === 'min' ? val0 : val1;
      let next = current;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          next = current + step;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          next = current - step;
          break;
        case 'PageUp':
          next = current + step * 10;
          break;
        case 'PageDown':
          next = current - step * 10;
          break;
        case 'Home':
          next = thumb === 'min' ? min : val0;
          break;
        case 'End':
          next = thumb === 'max' ? max : val1;
          break;
        default:
          return;
      }

      e.preventDefault();
      updateValue(next, thumb);
      if (range) {
        onChangeEnd?.(currentValuesRef.current);
      } else {
        onChangeEnd?.(currentValuesRef.current[0]);
      }
    };

    // Normalized marks
    const markList: { value: number; label?: React.ReactNode }[] = [];
    if (Array.isArray(marks)) {
      marks.forEach((m) => markList.push({ value: m }));
    } else if (typeof marks === 'object' && marks !== null) {
      Object.entries(marks).forEach(([k, v]) => {
        markList.push({ value: Number(k), label: v });
      });
    } else if (marks === true) {
      // 5 default ticks: 0%, 25%, 50%, 75%, 100%
      const quarter = (max - min) / 4;
      for (let i = 0; i <= 4; i++) {
        markList.push({ value: Math.round(min + i * quarter) });
      }
    }

    const hasMarkLabels = markList.some((m) => m.label !== undefined);

    // Tooltip display logic
    const isTooltipVisible = (thumb: 'min' | 'max') => {
      if (!showTooltip || tooltipVisible === 'never') return false;
      if (tooltipVisible === 'always') return true;
      return activeThumb === thumb || hoveredThumb === thumb;
    };

    const inputId = useId();

    return (
      <div
        ref={ref}
        className={`neuron-slider-group ${className}`}
        style={style}
      >
        {/* Optional Header with Label and tabular value display */}
        {(label || showValueInHeader) && (
          <div className="neuron-slider-header">
            {label && (
              <label htmlFor={inputId} className="neuron-slider-label">
                {label}
              </label>
            )}
            {showValueInHeader && (
              <span className="neuron-slider-header-value">
                {range ? `${formatter(val0)} – ${formatter(val1)}` : formatter(val0)}
              </span>
            )}
          </div>
        )}

        {/* Interaction container */}
        <div
          id={inputId}
          className={[
            'neuron-slider-root',
            `neuron-slider--variant-${variant}`,
            `neuron-slider--size-${size}`,
            disabled && 'neuron-slider-root--disabled',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div
            className="neuron-slider-track-area"
            onPointerDown={handlePointerDown}
          >
            {/* Rail */}
            <div ref={railRef} className="neuron-slider-rail">
              {/* Active Fill Segment */}
              <div
                className="neuron-slider-fill"
                style={{
                  left: `${fillLeft}%`,
                  width: `${fillWidth}%`,
                }}
              />

              {/* Step Marks / Ticks */}
              {markList.length > 0 && (
                <div className="neuron-slider-marks-container">
                  {markList.map((m) => {
                    const mp = clamp(((m.value - min) / rangeSpan) * 100, 0, 100);
                    const isActive = range
                      ? m.value >= Math.min(val0, val1) && m.value <= Math.max(val0, val1)
                      : m.value <= val0;
                    return (
                      <span
                        key={m.value}
                        className={`neuron-slider-tick ${isActive ? 'neuron-slider-tick--active' : ''}`}
                        style={{ left: `${mp}%` }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Thumb 1 (Left / Single) */}
              <div
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-label={range ? `${ariaLabel || 'Minimum'}` : ariaLabel}
                aria-valuemin={min}
                aria-valuemax={range ? val1 : max}
                aria-valuenow={val0}
                aria-valuetext={formatter(val0)}
                aria-orientation="horizontal"
                aria-disabled={disabled}
                className={[
                  'neuron-slider-thumb',
                  activeThumb === 'min' && 'neuron-slider-thumb--active',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ left: `${p0}%` }}
                onKeyDown={(e) => handleKeyDown(e, 'min')}
                onPointerEnter={() => setHoveredThumb('min')}
                onPointerLeave={() => setHoveredThumb(null)}
              >
                {/* Tooltip Speech Bubble (Columns 3 & 4) */}
                {showTooltip && (
                  <div
                    className={[
                      'neuron-slider-tooltip',
                      `neuron-slider-tooltip--${tooltipPlacement}`,
                      isTooltipVisible('min') && 'neuron-slider-tooltip--visible',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-hidden="true"
                  >
                    {formatter(val0)}
                  </div>
                )}

                {/* Text Value Below Thumb (Column 2) */}
                {showLabels && (
                  <span className="neuron-slider-thumb-label-below" aria-hidden="true">
                    {formatter(val0)}
                  </span>
                )}
              </div>

              {/* Thumb 2 (Right thumb in Range mode) */}
              {range && (
                <div
                  role="slider"
                  tabIndex={disabled ? -1 : 0}
                  aria-label={`${ariaLabel || 'Maximum'}`}
                  aria-valuemin={val0}
                  aria-valuemax={max}
                  aria-valuenow={val1}
                  aria-valuetext={formatter(val1)}
                  aria-orientation="horizontal"
                  aria-disabled={disabled}
                  className={[
                    'neuron-slider-thumb',
                    activeThumb === 'max' && 'neuron-slider-thumb--active',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{ left: `${p1}%` }}
                  onKeyDown={(e) => handleKeyDown(e, 'max')}
                  onPointerEnter={() => setHoveredThumb('max')}
                  onPointerLeave={() => setHoveredThumb(null)}
                >
                  {/* Tooltip Speech Bubble */}
                  {showTooltip && (
                    <div
                      className={[
                        'neuron-slider-tooltip',
                        `neuron-slider-tooltip--${tooltipPlacement}`,
                        isTooltipVisible('max') && 'neuron-slider-tooltip--visible',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-hidden="true"
                    >
                      {formatter(val1)}
                    </div>
                  )}

                  {/* Text Value Below Thumb */}
                  {showLabels && (
                    <span className="neuron-slider-thumb-label-below" aria-hidden="true">
                      {formatter(val1)}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mark Labels beneath track if provided */}
          {hasMarkLabels && (
            <div className="neuron-slider-marks-labels">
              {markList.map((m) => {
                if (m.label === undefined) return null;
                const mp = clamp(((m.value - min) / rangeSpan) * 100, 0, 100);
                const isActive = range
                  ? m.value >= Math.min(val0, val1) && m.value <= Math.max(val0, val1)
                  : m.value <= val0;
                const handleMarkSelect = (e: React.SyntheticEvent) => {
                  e.stopPropagation();
                  if (disabled || readOnly) return;
                  if (range) {
                    const d0 = Math.abs(val0 - m.value);
                    const d1 = Math.abs(val1 - m.value);
                    if (d0 <= d1) {
                      updateValue(m.value, 'min');
                    } else {
                      updateValue(m.value, 'max');
                    }
                    onChangeEnd?.(currentValuesRef.current);
                  } else {
                    updateValue(m.value, 'min');
                    onChangeEnd?.(currentValuesRef.current[0]);
                  }
                };

                return (
                  <span
                    key={m.value}
                    className={`neuron-slider-mark-label ${isActive ? 'neuron-slider-mark-label--active' : ''}`}
                    style={{
                      left: `${mp}%`,
                      transform: `translateX(-${mp}%)`,
                    }}
                    onPointerDown={handleMarkSelect}
                    onClick={handleMarkSelect}
                  >
                    {m.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Hidden inputs for native form submissions */}
        {name && (
          range ? (
            <>
              <input type="hidden" name={`${name}[0]`} value={val0} />
              <input type="hidden" name={`${name}[1]`} value={val1} />
            </>
          ) : (
            <input type="hidden" name={name} value={val0} />
          )
        )}

        {/* Helper text or Error message */}
        {error ? (
          <div className="neuron-slider-error" role="alert">
            {error}
          </div>
        ) : helperText ? (
          <div className="neuron-slider-helper">
            {helperText}
          </div>
        ) : null}
      </div>
    );
  }
);

NeuronSlider.displayName = 'NeuronSlider';

export default NeuronSlider;
