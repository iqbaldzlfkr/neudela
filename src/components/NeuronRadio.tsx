import React, { useState, useEffect, useId, useContext, createContext } from 'react';

export type NeuronRadioSize = 'sm' | 'md' | 'lg';
export type NeuronRadioVariant =
  | 'brand'
  | 'gray'
  | 'error'
  | 'warning'
  | 'success'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'orange';

export interface RadioGroupContextType {
  value?: string;
  name?: string;
  disabled?: boolean;
  size?: NeuronRadioSize;
  variant?: NeuronRadioVariant;
  onChange?: (val: string) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface NeuronRadioProps {
  /** Controlled selected value */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: NeuronRadioSize;
  variant?: NeuronRadioVariant;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  labelPosition?: 'right' | 'left';
  isCard?: boolean;
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const NeuronRadio: React.FC<NeuronRadioProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  size,
  variant,
  disabled,
  label,
  description,
  labelPosition = 'right',
  isCard = false,
  id: customId,
  name,
  value,
  required = false,
  'aria-label': ariaLabel,
  className = '',
  style,
}) => {
  const generatedId = useId();
  const radioId = customId || generatedId;

  const group = useContext(RadioGroupContext);
  const effectiveName = name || group?.name;
  const effectiveDisabled = disabled !== undefined ? disabled : (group?.disabled || false);
  const effectiveSize: NeuronRadioSize = size || group?.size || 'md';
  const effectiveVariant: NeuronRadioVariant = variant || group?.variant || 'brand';

  const isControlled = controlledChecked !== undefined || group?.value !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);

  const isChecked = group?.value !== undefined
    ? (value !== undefined ? group.value === value : controlledChecked || false)
    : (controlledChecked !== undefined ? controlledChecked : internalChecked);

  const [isFocused, setIsFocused] = useState(false);

  // When uncontrolled with a shared name, listen for peer radio selections to uncheck others
  useEffect(() => {
    if (isControlled || !effectiveName) return;

    const handlePeerChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ name: string; id: string }>;
      if (customEvent.detail && customEvent.detail.name === effectiveName && customEvent.detail.id !== radioId) {
        setInternalChecked(false);
      }
    };

    window.addEventListener('neuron-radio-select', handlePeerChange);
    return () => {
      window.removeEventListener('neuron-radio-select', handlePeerChange);
    };
  }, [isControlled, effectiveName, radioId]);

  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (effectiveDisabled) return;

    if (!isChecked) {
      if (group?.onChange && value !== undefined) {
        group.onChange(value);
      } else {
        if (!isControlled) {
          setInternalChecked(true);
        }
        onChange?.(true);

        if (effectiveName) {
          window.dispatchEvent(
            new CustomEvent('neuron-radio-select', {
              detail: { name: effectiveName, id: radioId },
            })
          );
        }
      }
    }
    // Hilangkan ring setelah state berubah
    setIsFocused(false);
    (e.currentTarget as HTMLButtonElement).blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSelect(e);
    }
  };

  const dotSize = effectiveSize === 'sm' ? 6 : effectiveSize === 'md' ? 8 : 10;

  const radioButton = (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked}
      aria-disabled={effectiveDisabled || undefined}
      aria-required={required || undefined}
      disabled={effectiveDisabled}
      id={radioId}
      name={effectiveName}
      value={value}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      onMouseDown={(e) => { e.preventDefault(); if (!effectiveDisabled) setIsFocused(true); }}
      className={`neuron-radio neuron-radio--${effectiveSize} neuron-radio--${effectiveVariant} ${
        isChecked ? 'is-checked' : 'is-unchecked'
      } ${effectiveDisabled ? 'is-disabled' : ''} ${isFocused ? 'is-focused' : ''}`}
    >
      <span className="neuron-radio__circle">
        {isChecked && (
          <span
            className="neuron-radio__dot"
            style={{ width: dotSize, height: dotSize }}
          />
        )}
      </span>
    </button>
  );

  if (!label && !description) return radioButton;

  const labelContent = (
    <div className="neuron-radio-label-wrap">
      {label && <span className="neuron-radio-label">{label}</span>}
      {description && <span className="neuron-radio-description">{description}</span>}
    </div>
  );

  return (
    <label
      htmlFor={radioId}
      className={`neuron-radio-wrapper neuron-radio-wrapper--${effectiveSize} ${
        labelPosition === 'left' ? 'neuron-radio-wrapper--left' : 'neuron-radio-wrapper--right'
      } ${effectiveDisabled ? 'neuron-radio-wrapper--disabled' : ''} ${
        isCard ? `neuron-radio-card neuron-radio-card--${effectiveVariant}` : ''
      } ${isCard && isChecked ? 'neuron-radio-card--active' : ''} ${className}`}
      style={style}
    >
      {labelPosition === 'left' ? (
        <>{labelContent}{radioButton}</>
      ) : (
        <>{radioButton}{labelContent}</>
      )}
    </label>
  );
};

// ─── Radio Group ──────────────────────────────────────────────────────────────
export interface NeuronRadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  size?: NeuronRadioSize;
  variant?: NeuronRadioVariant;
  disabled?: boolean;
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
}

export const NeuronRadioGroup: React.FC<NeuronRadioGroupProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  name,
  size,
  variant,
  disabled,
  children,
  direction = 'vertical',
  className = '',
  style,
}) => {
  const generatedName = useId();
  const groupName = name || generatedName;

  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const contextValue: RadioGroupContextType = {
    value: currentValue,
    name: groupName,
    size,
    variant,
    disabled,
    onChange: handleChange,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        className={`neuron-radio-group neuron-radio-group--${direction} ${className}`}
        style={style}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export default NeuronRadio;
