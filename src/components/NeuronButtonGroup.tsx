import React, { useState } from 'react';
import type { NeuronButtonProps } from './NeuronButton';

export interface ButtonGroupOption {
  value: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  iconOnly?: boolean;
}

export interface NeuronButtonGroupProps {
  /** Visual variant applied to all buttons in the group (neutral styling) */
  variant?: 'outline' | 'secondary' | 'text';
  /** Size of all buttons in the group */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Interaction mode: standard actions, radio toggle, radio indicator circle, or multi-select checkbox */
  type?: 'standard' | 'radio' | 'radio-indicator' | 'checkbox';
  /** Seamlessly join buttons with shared borders (true) or separate with gap (false) */
  attached?: boolean;
  /** Whether the group expands to fill full container width */
  fullWidth?: boolean;
  /** Rounded pill design style */
  pill?: boolean;
  /** Disable all buttons in the group */
  disabled?: boolean;
  /** Declarative options list for toggle / radio groups */
  options?: ButtonGroupOption[];
  /** Controlled active value for radio (string) or checkbox (string[]) */
  value?: string | string[];
  /** Default active value */
  defaultValue?: string | string[];
  /** Change callback when selection changes */
  onChange?: (value: any) => void;
  /** Accessible label for the group */
  ariaLabel?: string;
  /** Custom className */
  className?: string;
  /** Inline style */
  style?: React.CSSProperties;
  /** Custom children (e.g. NeuronButton elements) */
  children?: React.ReactNode;
}

export default function NeuronButtonGroup({
  variant = 'outline',
  size = 'md',
  orientation = 'horizontal',
  type = 'standard',
  attached = true,
  fullWidth = false,
  pill = false,
  disabled = false,
  options,
  value,
  defaultValue,
  onChange,
  ariaLabel,
  className = '',
  style,
  children,
}: NeuronButtonGroupProps) {
  const isControlled = value !== undefined;
  
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) return defaultValue;
    if (type === 'checkbox') return [];
    if (options && options.length > 0 && (type === 'radio' || type === 'radio-indicator')) {
      return options[0].value;
    }
    return '';
  });

  const activeValue = isControlled ? value : internalValue;

  const handleOptionClick = (optValue: string, optDisabled?: boolean) => {
    if (disabled || optDisabled) return;

    if (type === 'checkbox') {
      const currentList = Array.isArray(activeValue) ? activeValue : [];
      const nextList = currentList.includes(optValue)
        ? currentList.filter(v => v !== optValue)
        : [...currentList, optValue];
      
      if (!isControlled) setInternalValue(nextList);
      onChange?.(nextList);
    } else {
      if (!isControlled) setInternalValue(optValue);
      onChange?.(optValue);
    }
  };

  const groupRole = (type === 'radio' || type === 'radio-indicator') ? 'radiogroup' : 'group';

  const groupClasses = [
    'neuron-btn-group',
    `neuron-btn-group--${orientation}`,
    `neuron-btn-group--${variant}`,
    `neuron-btn-group--${size}`,
    attached ? 'neuron-btn-group--attached' : 'neuron-btn-group--spaced',
    fullWidth ? 'neuron-btn-group--full-width' : '',
    pill ? 'neuron-btn-group--pill' : '',
    type === 'radio-indicator' ? 'neuron-btn-group--has-radio-indicator' : '',
    className,
  ].filter(Boolean).join(' ');

  // If options array is provided, render declarative option buttons
  if (options && options.length > 0) {
    return (
      <div
        className={groupClasses}
        style={style}
        role={groupRole}
        aria-label={ariaLabel}
        aria-disabled={disabled ? true : undefined}
      >
        {options.map((option) => {
          const isSelected = type === 'checkbox'
            ? Array.isArray(activeValue) && activeValue.includes(option.value)
            : activeValue === option.value;

          const isItemDisabled = disabled || option.disabled;

          return (
            <button
              key={option.value}
              type="button"
              role={type === 'checkbox' ? 'checkbox' : type.startsWith('radio') ? 'radio' : 'button'}
              aria-checked={type.startsWith('radio') || type === 'checkbox' ? isSelected : undefined}
              aria-pressed={type === 'standard' ? isSelected : undefined}
              aria-label={option.ariaLabel}
              disabled={isItemDisabled}
              className={[
                'neuron-btn',
                `neuron-btn--${variant}`,
                `neuron-btn--${size}`,
                'neuron-btn-group-item',
                isSelected ? 'neuron-btn--active is-active' : '',
                option.iconOnly ? 'neuron-btn--icon-only' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => handleOptionClick(option.value, option.disabled)}
            >
              {/* Radio Circle Indicator for radio-indicator mode */}
              {type === 'radio-indicator' && (
                <span className="neuron-btn-radio-indicator" aria-hidden="true">
                  <span className={`neuron-btn-radio-indicator__circle ${isSelected ? 'is-selected' : ''}`}>
                    {isSelected && <span className="neuron-btn-radio-indicator__dot" />}
                  </span>
                </span>
              )}

              {/* Leading Icon */}
              {option.icon && (
                <span className="neuron-btn-icon neuron-btn-icon--leading">
                  {option.icon}
                </span>
              )}

              {/* Button Label */}
              {!option.iconOnly && option.label && (
                <span className="neuron-btn-label">{option.label}</span>
              )}

              {/* Trailing Icon */}
              {option.trailingIcon && (
                <span className="neuron-btn-icon neuron-btn-icon--trailing">
                  {option.trailingIcon}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // If children are provided, clone them to ensure uniform size and variant if not explicitly set
  return (
    <div
      className={groupClasses}
      style={style}
      role={groupRole}
      aria-label={ariaLabel}
      aria-disabled={disabled ? true : undefined}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<NeuronButtonProps>(child)) return child;

        return React.cloneElement(child, {
          variant: child.props.variant || variant,
          size: child.props.size || size,
          disabled: disabled || child.props.disabled,
          className: `neuron-btn-group-item ${child.props.className || ''}`.trim(),
        });
      })}
    </div>
  );
}
