import React from 'react';
import { X, ArrowRight } from 'lucide-react';

export type NeuronBadgeVariant = 
  | 'gray' 
  | 'brand' 
  | 'error' 
  | 'warning' 
  | 'success' 
  | 'blue' 
  | 'indigo' 
  | 'purple' 
  | 'pink' 
  | 'orange'
  | 'default' // alias for gray
  | 'primary' // alias for brand
  | 'danger'; // alias for error

export type NeuronBadgeSize = 'sm' | 'md' | 'lg';
export type NeuronBadgeFill = 'subtle' | 'solid' | 'outline';

export interface NeuronBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color theme and semantic intent */
  variant?: NeuronBadgeVariant;
  /** Size of the badge */
  size?: NeuronBadgeSize;
  /** Rounded pill border radius */
  pill?: boolean;
  /** Visual fill style */
  fill?: NeuronBadgeFill;
  /** Render status indicator dot on the left */
  dot?: boolean;
  /** Avatar image URL rendered on the left */
  avatar?: string;
  /** Custom icon or element rendered before the label */
  leadingIcon?: React.ReactNode;
  /** Custom icon or element rendered after the label */
  trailingIcon?: React.ReactNode;
  /** Callback when close button (✕) is clicked. Renders close button when provided */
  onClose?: (e: React.MouseEvent) => void;
  /** Render trailing navigation arrow (→) */
  arrow?: boolean;
  /** Whether the badge only contains an icon/symbol with 1:1 aspect ratio */
  iconOnly?: boolean;
  /** Badge content */
  children?: React.ReactNode;
}

export default function NeuronBadge({
  variant = 'gray',
  size = 'md',
  pill = true,
  fill = 'subtle',
  dot = false,
  avatar,
  leadingIcon,
  trailingIcon,
  onClose,
  arrow = false,
  iconOnly = false,
  className = '',
  children,
  ...props
}: NeuronBadgeProps) {
  // Normalize alias variants
  const normalizedVariant = 
    variant === 'default' ? 'gray' :
    variant === 'primary' ? 'brand' :
    variant === 'danger' ? 'error' : variant;

  const badgeClasses = [
    'neuron-badge',
    `neuron-badge--${normalizedVariant}`,
    `neuron-badge--${size}`,
    `neuron-badge--${fill}`,
    pill ? 'neuron-badge--pill' : '',
    iconOnly ? 'neuron-badge--icon-only' : '',
    className,
  ].filter(Boolean).join(' ');

  const iconSize = size === 'sm' ? 11 : size === 'lg' ? 14 : 12;

  return (
    <span className={badgeClasses} {...props}>
      {/* 1. Dot Indicator */}
      {dot && <span className="neuron-badge__dot" aria-hidden="true" />}

      {/* 2. Avatar Image */}
      {avatar && (
        <img 
          src={avatar} 
          alt="" 
          className="neuron-badge__avatar" 
          aria-hidden="true"
        />
      )}

      {/* 3. Leading Icon */}
      {leadingIcon && (
        <span className="neuron-badge__leading-icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}

      {/* 4. Text Content / Children */}
      {children && <span className="neuron-badge__text">{children}</span>}

      {/* 5. Trailing Icon */}
      {trailingIcon && (
        <span className="neuron-badge__trailing-icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}

      {/* 6. Navigation Arrow */}
      {arrow && (
        <span className="neuron-badge__arrow" aria-hidden="true">
          <ArrowRight size={iconSize} />
        </span>
      )}

      {/* 7. Dismissible Close Button */}
      {onClose && (
        <span 
          className="neuron-badge__close" 
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }} 
          role="button"
          tabIndex={0}
          aria-label="Remove badge"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClose(e as any);
            }
          }}
        >
          <X size={iconSize} />
        </span>
      )}
    </span>
  );
}
