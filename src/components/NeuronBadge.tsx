import React from 'react';

interface NeuronBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  pill?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function NeuronBadge({
  variant = 'default',
  pill = false,
  children,
  onClose,
  ...props
}: NeuronBadgeProps) {
  const badgeClass = `neuron-badge neuron-badge--${variant} ${
    pill ? 'neuron-badge--pill' : ''
  }`;

  return (
    <span className={badgeClass} {...props}>
      {children}
      {onClose && (
        <span className="neuron-badge-close" onClick={onClose} aria-label="Close badge">
          &times;
        </span>
      )}
    </span>
  );
}
