import React from 'react';

export type InputState = 'default' | 'success' | 'error';

export interface NeuronInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  state?: InputState;
  helperText?: string;
  hintText?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leadingText?: string;
  trailingText?: string;
  helpIcon?: boolean;
  helpTooltip?: string;
  destructive?: boolean;
  required?: boolean;
}

// Reusable help icon SVG
const HelpIconSvg = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function NeuronInput({
  label,
  placeholder = '',
  disabled = false,
  state = 'default',
  helperText = '',
  hintText,
  value,
  onChange,
  type = 'text',
  leadingIcon,
  trailingIcon,
  leadingText,
  trailingText,
  helpIcon = false,
  helpTooltip,
  destructive = false,
  required = false,
  readOnly,
  ...props
}: NeuronInputProps) {
  // Destructive overrides state to error
  const effectiveState = destructive ? 'error' : state;
  const hasAddon = Boolean(leadingText || trailingText);

  const inputClass = [
    'neuron-input',
    effectiveState === 'success' && 'neuron-input--success',
    effectiveState === 'error' && 'neuron-input--error',
    leadingIcon && 'neuron-input--has-leading',
    trailingIcon && 'neuron-input--has-trailing',
  ].filter(Boolean).join(' ');

  const groupClass = [
    'neuron-form-group',
    effectiveState === 'success' && 'neuron-form-group--success',
    effectiveState === 'error' && 'neuron-form-group--error',
  ].filter(Boolean).join(' ');

  const wrapperClass = [
    'neuron-input-wrapper',
    hasAddon && 'neuron-input-wrapper--has-addon',
    disabled && 'neuron-input-wrapper--disabled',
    readOnly && 'neuron-input-wrapper--readonly',
    effectiveState === 'success' && 'neuron-input-wrapper--success',
    effectiveState === 'error' && 'neuron-input-wrapper--error',
  ].filter(Boolean).join(' ');

  const displayHelper = hintText || helperText;

  return (
    <div className={groupClass}>
      {label && (
        <label className="neuron-label">
          {label}
          {required && <span className="neuron-label__required"> *</span>}
          {helpIcon && (
            <span className="neuron-label__help-icon" title={helpTooltip}>
              <HelpIconSvg />
            </span>
          )}
        </label>
      )}
      <div className={wrapperClass}>
        {leadingText && (
          <span className="neuron-input-addon neuron-input-addon--leading">{leadingText}</span>
        )}
        <div className="neuron-input-inner">
          {leadingIcon && (
            <span className="neuron-input-icon neuron-input-icon--leading">{leadingIcon}</span>
          )}
          <input
            type={type}
            className={inputClass}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            onChange={onChange}
            {...props}
          />
          {trailingIcon && (
            <span className="neuron-input-icon neuron-input-icon--trailing">{trailingIcon}</span>
          )}
        </div>
        {trailingText && (
          <span className="neuron-input-addon neuron-input-addon--trailing">{trailingText}</span>
        )}
      </div>
      {displayHelper && <span className="neuron-helper-text">{displayHelper}</span>}
    </div>
  );
}
