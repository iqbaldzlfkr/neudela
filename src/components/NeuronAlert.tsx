import React, { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type AlertSize    = 'sm' | 'md' | 'lg';
export type AlertFill   = 'subtle' | 'solid' | 'outlined';

export interface AlertAction {
  label: string;
  onClick: () => void;
  /** Render as ghost/link style */
  ghost?: boolean;
}

export interface NeuronAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic severity variant */
  variant?: AlertVariant;
  /** Size scale */
  size?: AlertSize;
  /** Visual fill treatment */
  fill?: AlertFill;
  /** Bold title text */
  title?: string;
  /** Descriptive body text or ReactNode */
  description?: React.ReactNode;
  /** Override default icon. Pass `null` to hide icon entirely */
  icon?: React.ReactNode | null;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback fired after dismiss animation completes */
  onDismiss?: () => void;
  /** @deprecated Use dismissible + onDismiss instead */
  onClose?: () => void;
  /** CTA actions rendered below description */
  actions?: AlertAction[];
}


// ─────────────────────────────────────────────────────────────────────────────
// Default Variant Icons
// ─────────────────────────────────────────────────────────────────────────────

function DefaultIcon({ variant }: { variant: AlertVariant }) {
  const base = { fill: 'currentColor', viewBox: '0 0 20 20' };
  switch (variant) {
    case 'success':
      return (
        <svg {...base}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case 'warning':
      return (
        <svg {...base}>
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    case 'danger':
      return (
        <svg {...base}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    case 'info':
    default:
      return (
        <svg {...base}>
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function NeuronAlert({
  variant     = 'info',
  size        = 'md',
  fill        = 'subtle',
  title,
  description,
  icon,
  dismissible = false,
  onDismiss,
  onClose,        // legacy
  actions,
  className   = '',
  ...props
}: NeuronAlertProps) {
  const [dismissed, setDismissed]  = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleDismiss = () => {
    setAnimating(true);
    setTimeout(() => {
      setDismissed(true);
      onDismiss?.();
      onClose?.();     // backward-compat
    }, 250);
  };

  if (dismissed) return null;

  const classes = [
    'neuron-alert',
    `neuron-alert--${variant}`,
    `neuron-alert--${size}`,
    `neuron-alert--${fill}`,
    animating ? 'neuron-alert--dismissing' : '',
    className,
  ].filter(Boolean).join(' ');

  // icon === null → hide; icon === undefined → use default; icon = ReactNode → custom
  const resolvedIcon = icon === null ? null : icon !== undefined ? icon : <DefaultIcon variant={variant} />;

  const showClose = dismissible || !!onClose;

  return (
    <div className={classes} role="alert" {...props}>
      {/* ── Leading Icon ── */}
      {resolvedIcon && (
        <span className="neuron-alert__icon-wrap" aria-hidden="true">
          {resolvedIcon}
        </span>
      )}

      {/* ── Body ── */}
      <div className="neuron-alert__body">
        {title && <div className="neuron-alert__title">{title}</div>}
        {description && <div className="neuron-alert__desc">{description}</div>}

        {/* ── Actions Row ── */}
        {actions && actions.length > 0 && (
          <div className="neuron-alert__actions">
            {actions.map((action, i) => (
              <button
                key={i}
                className={`neuron-alert__action${action.ghost ? ' neuron-alert__action--ghost' : ''}`}
                onClick={action.onClick}
                type="button"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Dismiss Button ── */}
      {showClose && (
        <button
          className="neuron-alert__close"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          type="button"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
