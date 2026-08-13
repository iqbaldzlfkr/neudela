import React from 'react';

interface NeuronCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function NeuronCard({
  hoverable = false,
  header,
  footer,
  children,
  ...props
}: NeuronCardProps) {
  const cardClass = `neuron-card ${hoverable ? 'neuron-card--hoverable' : ''}`;

  return (
    <div className={cardClass} {...props}>
      {header && <div className="neuron-card-header">{header}</div>}
      <div className="neuron-card-body">{children}</div>
      {footer && <div className="neuron-card-footer">{footer}</div>}
    </div>
  );
}
