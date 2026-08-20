import React from 'react';
import NeuronBadge, { NeuronBadgeVariant } from './NeuronBadge';
import { ArrowRight } from 'lucide-react';

export interface NeuronBadgeGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Color theme applied to the badge group */
  variant?: NeuronBadgeVariant;
  /** Label or custom component for the inner badge pill */
  badge: React.ReactNode;
  /** Main announcement / description text */
  title: React.ReactNode;
  /** Position of the badge pill: 'leading' (left) or 'trailing' (right) */
  badgePosition?: 'leading' | 'trailing';
  /** Whether to render the trailing navigation arrow */
  arrow?: boolean;
  /** Optional link URL */
  href?: string;
  /** Click callback */
  onClick?: (e: React.MouseEvent) => void;
}

export default function NeuronBadgeGroup({
  variant = 'brand',
  badge,
  title,
  badgePosition = 'leading',
  arrow = true,
  href,
  onClick,
  className = '',
  ...props
}: NeuronBadgeGroupProps) {
  // Normalize alias variants
  const normalizedVariant = 
    variant === 'default' ? 'gray' :
    variant === 'primary' ? 'brand' :
    variant === 'danger' ? 'error' : variant;

  const groupClasses = [
    'neuron-badge-group',
    `neuron-badge-group--${normalizedVariant}`,
    badgePosition === 'trailing' ? 'neuron-badge-group--trailing' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {badgePosition === 'leading' && (
        <NeuronBadge 
          variant={variant} 
          size="sm" 
          pill 
          className="neuron-badge-group__badge"
        >
          {badge}
        </NeuronBadge>
      )}

      <span className="neuron-badge-group__text">
        {title}
      </span>

      {badgePosition === 'trailing' && (
        <NeuronBadge 
          variant={variant} 
          size="sm" 
          pill 
          className="neuron-badge-group__badge"
        >
          {badge}
        </NeuronBadge>
      )}

      {arrow && (
        <span className="neuron-badge-group__arrow" aria-hidden="true">
          <ArrowRight size={14} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={groupClasses} 
        onClick={onClick}
        {...(props as any)}
      >
        {content}
      </a>
    );
  }

  return (
    <div 
      className={groupClasses} 
      onClick={onClick} 
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e as any);
        }
      }}
      {...props}
    >
      {content}
    </div>
  );
}
