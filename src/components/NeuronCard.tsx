import React from 'react';

export type NeuronCardVariant = 
  | 'default' 
  | 'outlined' 
  | 'elevated' 
  | 'flat' 
  | 'glass' 
  | 'gradient' 
  | 'gradient-border' 
  | 'brand' 
  | 'ghost';

export type NeuronCardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type NeuronCardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type NeuronCardHoverEffect = 'auto' | 'none' | 'lift' | 'glow' | 'border' | 'tint' | 'scale';

export interface NeuronCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: NeuronCardVariant;
  hoverable?: boolean;
  hoverEffect?: NeuronCardHoverEffect;
  padding?: NeuronCardPadding;
  radius?: NeuronCardRadius;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  header?: React.ReactNode;
  media?: React.ReactNode;
  mediaPosition?: 'top' | 'bottom';
  footer?: React.ReactNode;
  href?: string;
  isClickable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const NeuronCard: React.FC<NeuronCardProps> = ({
  variant = 'default',
  hoverable = false,
  hoverEffect,
  padding = 'md',
  radius = 'lg',
  title,
  subtitle,
  header,
  media,
  mediaPosition = 'top',
  footer,
  href,
  isClickable = false,
  children,
  className = '',
  onClick,
  ...props
}) => {
  // Determine effective hover style: tailored per variant by default
  const isHoverEnabled = hoverEffect ? hoverEffect !== 'none' : (hoverable || Boolean(href) || isClickable || Boolean(onClick));
  const effectiveHover: NeuronCardHoverEffect = hoverEffect 
    ? hoverEffect 
    : isHoverEnabled 
      ? 'auto' 
      : 'none';

  const isInteractive = isHoverEnabled || Boolean(href) || Boolean(onClick) || isClickable;

  const cardClasses = [
    'neuron-card',
    `neuron-card--${variant}`,
    `neuron-card--pad-${padding}`,
    `neuron-card--radius-${radius}`,
    effectiveHover !== 'none' ? (effectiveHover === 'auto' ? 'neuron-card--hover-auto' : `neuron-card--hover-${effectiveHover}`) : '',
    isInteractive ? 'neuron-card--interactive' : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {media && mediaPosition === 'top' && (
        <div className="neuron-card-media">{media}</div>
      )}
      
      {(header || title || subtitle) && (
        <div className="neuron-card-header">
          {header ? (
            header
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: 'var(--space-3)' }}>
              {title && <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</h4>}
              {subtitle && <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{subtitle}</p>}
            </div>
          )}
        </div>
      )}

      {children && (
        <div className="neuron-card-body">{children}</div>
      )}

      {media && mediaPosition === 'bottom' && (
        <div className="neuron-card-media">{media}</div>
      )}

      {footer && (
        <div className="neuron-card-footer">{footer}</div>
      )}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={`${cardClasses} neuron-card--as-link`}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      role={onClick || isClickable ? 'button' : undefined}
      tabIndex={onClick || isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if ((onClick || isClickable) && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      {...props}
    >
      {content}
    </div>
  );
};

export default NeuronCard;
