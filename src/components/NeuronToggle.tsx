import React, { useState, useId } from 'react';
import { Check, X } from 'lucide-react';

export type NeuronToggleSize = 'sm' | 'md' | 'lg';
export type NeuronToggleVariant = 
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

export interface NeuronToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: NeuronToggleSize;
  variant?: NeuronToggleVariant;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  labelPosition?: 'left' | 'right';
  hasIcon?: boolean;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  isCard?: boolean;
  id?: string;
  name?: string;
  value?: string;
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const NeuronToggle: React.FC<NeuronToggleProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  size = 'md',
  variant = 'brand',
  disabled = false,
  label,
  description,
  labelPosition = 'right',
  hasIcon = false,
  iconOn,
  iconOff,
  isCard = false,
  id: customId,
  name,
  value,
  'aria-label': ariaLabel,
  className = '',
  style,
}) => {
  const generatedId = useId();
  const toggleId = customId || generatedId;

  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled) return;

    const nextChecked = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onChange?.(nextChecked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle(e);
    }
  };

  // Icon sizing based on toggle size
  const iconSize = size === 'sm' ? 10 : size === 'md' ? 12 : 14;

  const defaultIconOn = <Check size={iconSize} strokeWidth={3} />;
  const defaultIconOff = <X size={iconSize} strokeWidth={2.5} />;

  const renderedIcon = isChecked
    ? (iconOn ?? defaultIconOn)
    : (iconOff ?? defaultIconOff);

  const toggleButton = (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      id={toggleId}
      name={name}
      value={value}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`neuron-toggle neuron-toggle--${size} neuron-toggle--${variant} ${
        isChecked ? 'is-checked' : 'is-unchecked'
      } ${disabled ? 'is-disabled' : ''}`}
    >
      <span className="neuron-toggle__thumb">
        {hasIcon && (
          <span className="neuron-toggle__icon" aria-hidden="true">
            {renderedIcon}
          </span>
        )}
      </span>
    </button>
  );

  // If no label or description, return standalone switch button
  if (!label && !description) {
    return toggleButton;
  }

  const labelContent = (
    <div className="neuron-toggle-label-wrap">
      {label && <span className="neuron-toggle-label">{label}</span>}
      {description && <span className="neuron-toggle-description">{description}</span>}
    </div>
  );

  return (
    <label
      htmlFor={toggleId}
      className={`neuron-toggle-wrapper neuron-toggle-wrapper--${size} ${
        labelPosition === 'left' ? 'neuron-toggle-wrapper--left' : 'neuron-toggle-wrapper--right'
      } ${disabled ? 'neuron-toggle-wrapper--disabled' : ''} ${
        isCard ? 'neuron-toggle-card' : ''
      } ${className}`}
      style={style}
    >
      {labelPosition === 'left' ? (
        <>
          {labelContent}
          {toggleButton}
        </>
      ) : (
        <>
          {toggleButton}
          {labelContent}
        </>
      )}
    </label>
  );
};

export default NeuronToggle;
