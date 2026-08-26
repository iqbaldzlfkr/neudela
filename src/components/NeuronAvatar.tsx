import React, { createContext, useContext, useState } from 'react';
import { User, Check } from 'lucide-react';

export type NeuronAvatarSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type NeuronAvatarShape = 'circle' | 'square';
export type NeuronAvatarStatus = 'online' | 'offline' | 'busy' | 'away';
export type NeuronAvatarVariant = 
  | 'brand' 
  | 'gray' 
  | 'blue' 
  | 'indigo' 
  | 'purple' 
  | 'pink' 
  | 'orange' 
  | 'success' 
  | 'warning' 
  | 'error';

export interface NeuronAvatarProps {
  /** Image source URL */
  src?: string;
  /** Image alternative description */
  alt?: string;
  /** Full name (used for initials calculation if initials prop is omitted) */
  name?: string;
  /** Explicit initials to display if no image is available */
  initials?: string;
  /** Custom fallback icon node (defaults to User icon) */
  icon?: React.ReactNode;
  /** Avatar size */
  size?: NeuronAvatarSize;
  /** Avatar shape: circular or rounded squircle */
  shape?: NeuronAvatarShape;
  /** Online presence status dot */
  status?: NeuronAvatarStatus;
  /** Position of status indicator */
  statusPosition?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';
  /** Custom badge node (e.g. verified check badge, company icon, or notification) */
  badge?: React.ReactNode;
  /** Position of badge */
  badgePosition?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';
  /** Color theme variant for initials and fallback icon background */
  variant?: NeuronAvatarVariant;
  /** Whether to show a 2px contrast ring outline */
  contrastBorder?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Inline CSS styles */
  style?: React.CSSProperties;
}

// Group Context
interface AvatarGroupContextProps {
  size?: NeuronAvatarSize;
  shape?: NeuronAvatarShape;
  contrastBorder?: boolean;
}

const AvatarGroupContext = createContext<AvatarGroupContextProps | null>(null);

/** Helper to extract up to 2 uppercase initials from a name */
export function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Icon size mapper */
function getIconSize(size: NeuronAvatarSize): number {
  switch (size) {
    case '2xs': return 10;
    case 'xs': return 12;
    case 'sm': return 16;
    case 'md': return 20;
    case 'lg': return 24;
    case 'xl': return 28;
    case '2xl': return 32;
    default: return 20;
  }
}

export const NeuronAvatar: React.FC<NeuronAvatarProps> = ({
  src,
  alt = '',
  name,
  initials,
  icon,
  size = 'md',
  shape = 'circle',
  status,
  statusPosition = 'bottom-right',
  badge,
  badgePosition = 'bottom-right',
  variant = 'brand',
  contrastBorder,
  onClick,
  className = '',
  style,
}) => {
  const groupContext = useContext(AvatarGroupContext);
  const effectiveSize = groupContext?.size || size;
  const effectiveShape = groupContext?.shape || shape;
  const effectiveContrastBorder = contrastBorder ?? (groupContext?.contrastBorder || false);

  const [imageError, setImageError] = useState(false);

  // Compute initials fallback
  const computedInitials = initials || (name ? getInitials(name) : '');
  const hasImage = Boolean(src && !imageError);

  const isClickable = Boolean(onClick);

  return (
    <div
      className={`neuron-avatar neuron-avatar--${effectiveSize} neuron-avatar--${effectiveShape} neuron-avatar--${variant} ${
        effectiveContrastBorder ? 'neuron-avatar--contrast-ring' : ''
      } ${isClickable ? 'neuron-avatar--clickable' : ''} ${className}`}
      style={style}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={name || alt || (computedInitials ? `Avatar for ${computedInitials}` : 'Avatar')}
    >
      {/* 1. Image View */}
      {hasImage ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="neuron-avatar__image"
          onError={() => setImageError(true)}
        />
      ) : computedInitials ? (
        /* 2. Initials Fallback */
        <span className="neuron-avatar__initials">{computedInitials}</span>
      ) : (
        /* 3. Icon Fallback */
        <span className="neuron-avatar__icon">
          {icon || <User size={getIconSize(effectiveSize)} strokeWidth={2} />}
        </span>
      )}

      {/* 4. Status Indicator Dot */}
      {status && (
        <span
          className={`neuron-avatar__status neuron-avatar__status--${status} neuron-avatar__status--${statusPosition}`}
          title={`Status: ${status}`}
          aria-label={`Status: ${status}`}
        />
      )}

      {/* 5. Custom Badge / Verified Icon */}
      {badge && (
        <span className={`neuron-avatar__badge neuron-avatar__badge--${badgePosition}`}>
          {badge}
        </span>
      )}
    </div>
  );
};

// ─── Avatar Group ─────────────────────────────────────────────────────────────
export interface NeuronAvatarGroupProps {
  /** Maximum number of avatars to display before showing +N counter */
  max?: number;
  /** Size for all avatars in group */
  size?: NeuronAvatarSize;
  /** Shape for all avatars in group */
  shape?: NeuronAvatarShape;
  /** Total count of members (if greater than passed children) */
  total?: number;
  /** Spacing between avatars: tight (-10px), normal (-8px), relaxed (-6px) */
  spacing?: 'tight' | 'normal' | 'relaxed';
  /** Click handler for overflow counter */
  onOverflowClick?: () => void;
  /** Children avatar elements */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline CSS styles */
  style?: React.CSSProperties;
}

export const NeuronAvatarGroup: React.FC<NeuronAvatarGroupProps> = ({
  max = 4,
  size = 'md',
  shape = 'circle',
  total,
  spacing = 'normal',
  onOverflowClick,
  children,
  className = '',
  style,
}) => {
  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const totalCount = total || childrenArray.length;
  const visibleChildren = childrenArray.slice(0, max);
  const excessCount = totalCount - max;

  return (
    <AvatarGroupContext.Provider value={{ size, shape, contrastBorder: true }}>
      <div
        className={`neuron-avatar-group neuron-avatar-group--${spacing} ${className}`}
        style={style}
        role="group"
        aria-label={`Avatar group of ${totalCount} members`}
      >
        {visibleChildren}

        {/* Overflow Counter Avatar */}
        {excessCount > 0 && (
          <div
            className={`neuron-avatar neuron-avatar--${size} neuron-avatar--${shape} neuron-avatar--overflow neuron-avatar--contrast-ring ${
              onOverflowClick ? 'neuron-avatar--clickable' : ''
            }`}
            onClick={onOverflowClick}
            title={`${excessCount} more members`}
            aria-label={`${excessCount} more members`}
          >
            <span className="neuron-avatar__initials">+{excessCount}</span>
          </div>
        )}
      </div>
    </AvatarGroupContext.Provider>
  );
};

// ─── Verified Checkmark Badge Helper ──────────────────────────────────────────
export const NeuronAvatarVerifiedBadge: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const iconSize = size === 'sm' ? 8 : size === 'lg' ? 12 : 10;
  return (
    <span className={`neuron-avatar-verified-badge neuron-avatar-verified-badge--${size}`}>
      <Check size={iconSize} strokeWidth={3} color="#ffffff" />
    </span>
  );
};

export default NeuronAvatar;
