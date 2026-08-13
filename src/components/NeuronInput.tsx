import React from 'react';

type InputState = 'default' | 'success' | 'error';

interface NeuronInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  state?: InputState;
  helperText?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

export default function NeuronInput({
  label,
  placeholder = '',
  disabled = false,
  state = 'default', // 'default', 'success', 'error'
  helperText = '',
  value,
  onChange,
  type = 'text',
  ...props
}: NeuronInputProps) {
  const inputClass = `neuron-input ${
    state === 'success' ? 'neuron-input--success' : ''
  } ${state === 'error' ? 'neuron-input--error' : ''}`;

  const groupClass = `neuron-form-group ${
    state === 'success' ? 'neuron-form-group--success' : ''
  } ${state === 'error' ? 'neuron-form-group--error' : ''}`;

  return (
    <div className={groupClass}>
      {label && <label className="neuron-label">{label}</label>}
      <div className="neuron-input-wrapper">
        <input
          type={type}
          className={inputClass}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
      {helperText && <span className="neuron-helper-text">{helperText}</span>}
    </div>
  );
}
