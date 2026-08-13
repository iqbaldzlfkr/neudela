import React from 'react';

interface NeuronButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function NeuronButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  ...props
}: NeuronButtonProps) {
  const isDisabled = disabled || loading;
  
  return (
    <button
      className={`neuron-btn neuron-btn--${variant} neuron-btn--${size}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="neuron-spinner" />}
      {children}
    </button>
  );
}
