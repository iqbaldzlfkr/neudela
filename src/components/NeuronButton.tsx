import React from 'react';

export interface NeuronButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  active?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  iconOnly?: boolean;
  dot?: boolean;
  children?: React.ReactNode;
}

// Reusable generic icon for playground demos
export const GenericIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function NeuronButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  active = false,
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  dot = false,
  children,
  onClick,
  className = '',
  ...props
}: NeuronButtonProps) {
  const isDisabled = disabled || loading;

  const activeClasses = active ? 'neuron-btn--active is-active' : '';
  const iconOnlyClass = iconOnly ? 'neuron-btn--icon-only' : '';
  const combinedClassName = `neuron-btn neuron-btn--${variant} neuron-btn--${size} ${iconOnlyClass} ${activeClasses} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <button
      className={combinedClassName}
      disabled={isDisabled}
      aria-pressed={active ? true : undefined}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="neuron-spinner" />}
      {!loading && leadingIcon && (
        <span className="neuron-btn-icon neuron-btn-icon--leading">{leadingIcon}</span>
      )}
      {dot && !loading && <span className="neuron-btn-dot" />}
      {!iconOnly && children}
      {!loading && trailingIcon && (
        <span className="neuron-btn-icon neuron-btn-icon--trailing">{trailingIcon}</span>
      )}
    </button>
  );
}
