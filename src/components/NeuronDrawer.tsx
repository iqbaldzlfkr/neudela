import React, { useEffect, useRef, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import NeuronButton, { NeuronButtonProps } from './NeuronButton';

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DrawerVariant = 'default' | 'elevated' | 'floating';
export type DrawerBackdropVariant = 'dimmed' | 'blur' | 'transparent';

export interface NeuronDrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Called when the drawer requests to close */
  onClose: () => void;
  /** Edge of the viewport the drawer slides in from */
  placement?: DrawerPlacement;
  /** Dimension scale of the drawer */
  size?: DrawerSize;
  /** Visual presentation style */
  variant?: DrawerVariant;
  /** Drawer headline title */
  title?: ReactNode;
  /** Optional subtitle or descriptive copy */
  description?: ReactNode;
  /** Optional leading circular icon or icon node displayed beside title */
  icon?: ReactNode;
  /** Extra interactive elements rendered in the header beside close button */
  headerActions?: ReactNode;
  /** Body content of the drawer */
  children?: ReactNode;
  /** Custom footer slot replacing default confirm/cancel action buttons */
  footer?: ReactNode;
  /** Confirm button label */
  confirmText?: ReactNode;
  /** Cancel button label */
  cancelText?: ReactNode;
  /** Called when default confirm button is clicked */
  onConfirm?: () => void;
  /** Variant style for confirm button */
  confirmVariant?: NeuronButtonProps['variant'];
  /** Loading state for confirm button */
  confirmLoading?: boolean;
  /** Whether confirm button is disabled */
  confirmDisabled?: boolean;
  /** Whether to render the accessible close X button */
  showCloseButton?: boolean;
  /** Whether clicking the backdrop overlay closes the drawer */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape key closes the drawer */
  closeOnEscape?: boolean;
  /** Whether backdrop overlay is displayed */
  backdrop?: boolean;
  /** Backdrop appearance style */
  backdropVariant?: DrawerBackdropVariant;
  /** Lock document body scroll when open */
  preventScroll?: boolean;
  /** Optional custom CSS class name for drawer panel */
  className?: string;
  /** Optional inline styles for drawer panel */
  style?: React.CSSProperties;
  /** Optional CSS class name for scrollable body */
  bodyClassName?: string;
  /** Optional inline styles for scrollable body */
  bodyStyle?: React.CSSProperties;
  /** Optional CSS class name for header */
  headerClassName?: string;
  /** Optional CSS class name for footer */
  footerClassName?: string;
  /** Render inside document.body portal (set false for inline documentation preview) */
  portal?: boolean;
  /** Render as an inline embedded preview for documentation or containers */
  isInlinePreview?: boolean;
}

export default function NeuronDrawer({
  open,
  onClose,
  placement = 'right',
  size = 'md',
  variant = 'default',
  title,
  description,
  icon,
  headerActions,
  children,
  footer,
  confirmText,
  cancelText,
  onConfirm,
  confirmVariant = 'primary',
  confirmLoading = false,
  confirmDisabled = false,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  backdrop = true,
  backdropVariant = 'dimmed',
  preventScroll = true,
  className = '',
  style,
  bodyClassName = '',
  bodyStyle,
  headerClassName = '',
  footerClassName = '',
  portal = true,
  isInlinePreview = false,
}: NeuronDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Keyboard navigation (Escape to close)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        e.preventDefault();
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Manage keyboard navigation and background scroll prevention without resetting page scroll
  useEffect(() => {
    if (isInlinePreview) return;

    if (open) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      document.addEventListener('keydown', handleKeyDown);

      // Prevent background scrolling while drawer is open without altering window.scrollY
      let cleanupScrollPrevention: (() => void) | undefined;

      if (preventScroll) {
        const preventWheelAndTouch = (e: Event) => {
          // Allow scrolling inside the drawer panel itself
          if (panelRef.current && panelRef.current.contains(e.target as Node)) {
            return;
          }
          // Prevent wheel/touch from scrolling the background page
          e.preventDefault();
        };

        window.addEventListener('wheel', preventWheelAndTouch, { passive: false });
        window.addEventListener('touchmove', preventWheelAndTouch, { passive: false });

        cleanupScrollPrevention = () => {
          window.removeEventListener('wheel', preventWheelAndTouch);
          window.removeEventListener('touchmove', preventWheelAndTouch);
        };
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        cleanupScrollPrevention?.();
      };
    } else {
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus?.({ preventScroll: true });
      }
    }
  }, [open, handleKeyDown, preventScroll, isInlinePreview]);

  // Focus panel on open without scrolling the background window
  useEffect(() => {
    if (open && panelRef.current && !isInlinePreview) {
      panelRef.current.focus({ preventScroll: true });
    }
  }, [open, isInlinePreview]);

  if (!open && !isInlinePreview) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  const hasHeader = title || description || icon || headerActions || showCloseButton;
  const hasCustomFooter = Boolean(footer);
  const hasDefaultFooter = Boolean(confirmText || cancelText || onConfirm);
  const showFooter = hasCustomFooter || hasDefaultFooter;

  const drawerContent = (
    <div
      className={[
        'neuron-drawer-root',
        `neuron-drawer-root--${placement}`,
        `neuron-drawer-root--${variant}`,
        isInlinePreview ? 'neuron-drawer-root--inline' : '',
        open ? 'neuron-drawer-root--open' : 'neuron-drawer-root--closed',
      ]
        .filter(Boolean)
        .join(' ')}
      role={isInlinePreview ? undefined : 'presentation'}
    >
      {/* Backdrop overlay */}
      {backdrop && !isInlinePreview && (
        <div
          className={[
            'neuron-drawer-backdrop',
            `neuron-drawer-backdrop--${backdropVariant}`,
            open ? 'neuron-drawer-backdrop--open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal={isInlinePreview ? undefined : true}
        aria-labelledby={title ? 'neuron-drawer-title' : undefined}
        aria-describedby={description ? 'neuron-drawer-desc' : undefined}
        tabIndex={-1}
        className={[
          'neuron-drawer',
          `neuron-drawer--${placement}`,
          `neuron-drawer--${size}`,
          `neuron-drawer--${variant}`,
          open ? 'neuron-drawer--open' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
      >
        {/* Header */}
        {hasHeader && (
          <header className={`neuron-drawer__header ${headerClassName}`.trim()}>
            <div className="neuron-drawer__header-main">
              {icon && <div className="neuron-drawer__icon">{icon}</div>}
              <div className="neuron-drawer__header-text">
                {title && (
                  <h2 id="neuron-drawer-title" className="neuron-drawer__title">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="neuron-drawer-desc" className="neuron-drawer__description">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className="neuron-drawer__header-actions">
              {headerActions}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="neuron-drawer__close-btn"
                  aria-label="Close drawer"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </header>
        )}

        {/* Scrollable Body */}
        <div
          className={`neuron-drawer__body ${bodyClassName}`.trim()}
          style={bodyStyle}
        >
          {children}
        </div>

        {/* Footer Action Bar */}
        {showFooter && (
          <footer className={`neuron-drawer__footer ${footerClassName}`.trim()}>
            {hasCustomFooter ? (
              footer
            ) : (
              <div className="neuron-drawer__footer-actions">
                {cancelText && (
                  <NeuronButton
                    variant="outline"
                    size="md"
                    onClick={onClose}
                    className="neuron-drawer__btn-cancel"
                  >
                    {cancelText}
                  </NeuronButton>
                )}
                {confirmText && (
                  <NeuronButton
                    variant={confirmVariant}
                    size="md"
                    onClick={onConfirm}
                    loading={confirmLoading}
                    disabled={confirmDisabled}
                    className="neuron-drawer__btn-confirm"
                  >
                    {confirmText}
                  </NeuronButton>
                )}
              </div>
            )}
          </footer>
        )}
      </div>
    </div>
  );

  // If inline preview mode, render directly in container
  if (isInlinePreview || !portal || typeof document === 'undefined') {
    return drawerContent;
  }

  // Otherwise render into portal
  return createPortal(drawerContent, document.body);
}
