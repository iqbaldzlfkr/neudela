import React, { useState, useId } from 'react';
import { Check, Minus } from 'lucide-react';

export type NeuronCheckboxSize = 'sm' | 'md' | 'lg';
export type NeuronCheckboxShape = 'rounded-sm' | 'rounded-md' | 'rounded-full';
export type NeuronCheckboxVariant = 
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

export interface NeuronCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  size?: NeuronCheckboxSize;
  shape?: NeuronCheckboxShape;
  variant?: NeuronCheckboxVariant;
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

export const NeuronCheckbox: React.FC<NeuronCheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  size = 'md',
  shape = 'rounded-md',
  variant = 'brand',
  disabled = false,
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
  const checkboxId = customId || generatedId;

  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const [isFocused, setIsFocused] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled) return;

    const nextChecked = indeterminate ? true : !isChecked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onChange?.(nextChecked);
    // Hilangkan ring setelah state berubah
    setIsFocused(false);
    (e.currentTarget as HTMLButtonElement).blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle(e);
    }
  };

  // Icon sizing based on checkbox size
  const iconSize = size === 'sm' ? 10 : size === 'md' ? 12 : 14;

  const checkboxButton = (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : isChecked}
      aria-disabled={disabled || undefined}
      aria-required={required || undefined}
      disabled={disabled}
      id={checkboxId}
      name={name}
      value={value}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      onMouseDown={(e) => { e.preventDefault(); if (!disabled) setIsFocused(true); }}
      className={`neuron-checkbox neuron-checkbox--${size} neuron-checkbox--${shape} neuron-checkbox--${variant} ${
        indeterminate ? 'is-indeterminate' : isChecked ? 'is-checked' : 'is-unchecked'
      } ${disabled ? 'is-disabled' : ''} ${isFocused ? 'is-focused' : ''}`}
    >
      <span className="neuron-checkbox__box">
        {indeterminate ? (
          <Minus className="neuron-checkbox__icon" size={iconSize} strokeWidth={3.5} />
        ) : isChecked ? (
          <Check className="neuron-checkbox__icon" size={iconSize} strokeWidth={3.5} />
        ) : null}
      </span>
    </button>
  );

  // If no label or description, return standalone checkbox button
  if (!label && !description) {
    return checkboxButton;
  }

  const labelContent = (
    <div className="neuron-checkbox-label-wrap">
      {label && <span className="neuron-checkbox-label">{label}</span>}
      {description && <span className="neuron-checkbox-description">{description}</span>}
    </div>
  );

  return (
    <label
      htmlFor={checkboxId}
      className={`neuron-checkbox-wrapper neuron-checkbox-wrapper--${size} ${
        labelPosition === 'left' ? 'neuron-checkbox-wrapper--left' : 'neuron-checkbox-wrapper--right'
      } ${disabled ? 'neuron-checkbox-wrapper--disabled' : ''} ${
        isCard ? 'neuron-checkbox-card' : ''
      } ${isCard && (isChecked || indeterminate) ? 'neuron-checkbox-card--active' : ''} ${className}`}
      style={style}
    >
      {labelPosition === 'left' ? (
        <>
          {labelContent}
          {checkboxButton}
        </>
      ) : (
        <>
          {checkboxButton}
          {labelContent}
        </>
      )}
    </label>
  );
};

export default NeuronCheckbox;
