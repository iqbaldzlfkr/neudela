import React, { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import NeuronButton from './NeuronButton';

export type ModalSize = 'sm' | 'md' | 'lg';
export type ModalVariant = 'default' | 'danger' | 'warning' | 'success' | 'info';

export interface NeuronModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Modal size */
  size?: ModalSize;
  /** Visual variant (affects circular icon background and ring shadow) */
  variant?: ModalVariant;
  /** Modal title text */
  title?: React.ReactNode;
  /** Optional description below the title */
  description?: React.ReactNode;
  /** Optional circular leading icon shown in the top bar with ring shadow */
  icon?: React.ReactNode;
  /** Main body content */
  children?: React.ReactNode;
  /** Footer slot – typically action buttons. If not provided, confirmText/cancelText can be used */
  footer?: React.ReactNode;
  /** Confirm button label (if using default footer) */
  confirmText?: React.ReactNode;
  /** Cancel button label (if using default footer) */
  cancelText?: React.ReactNode;
  /** Called when confirm button is clicked */
  onConfirm?: () => void;
  /** Whether clicking backdrop closes the modal */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
  /** Whether to show the X close button */
  showCloseButton?: boolean;
  /** Optional additional className for the dialog panel */
  className?: string;
}

export default function NeuronModal({
  open,
  onClose,
  size = 'md',
  variant = 'default',
  title,
  description,
  icon,
  children,
  footer,
  confirmText,
  cancelText,
  onConfirm,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
}: NeuronModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  const hasTopBar = icon || showCloseButton;
  const hasFooter = footer || confirmText || cancelText || onConfirm;

  return (
    <div
      className="neuron-modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={`neuron-modal neuron-modal--${size} neuron-modal--${variant} ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'neuron-modal-title' : undefined}
        tabIndex={-1}
      >
        {/* Top bar with circular icon on the left and clean close X on the right */}
        {hasTopBar && (
          <div className="neuron-modal__top-bar">
            {icon ? (
              <div className={`neuron-modal__icon neuron-modal__icon--${variant}`}>
                {icon}
              </div>
            ) : (
              <div />
            )}
            {showCloseButton && (
              <button
                type="button"
                className="neuron-modal__close"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {/* Header content: Title & Description */}
        {(title || description) && (
          <div className="neuron-modal__content">
            {title && (
              <h2 id="neuron-modal-title" className="neuron-modal__title">
                {title}
              </h2>
            )}
            {description && (
              <p className="neuron-modal__description">{description}</p>
            )}
          </div>
        )}

        {/* Optional body */}
        {children && (
          <div className="neuron-modal__body">
            {children}
          </div>
        )}

        {/* Footer with side-by-side equal width buttons */}
        {hasFooter && (
          <div className="neuron-modal__footer">
            {footer ? (
              footer
            ) : (
              <>
                {cancelText !== null && (
                  <NeuronButton
                    variant="secondary"
                    size="md"
                    onClick={onClose}
                  >
                    {cancelText || 'Cancel'}
                  </NeuronButton>
                )}
                {confirmText !== null && (
                  <NeuronButton
                    variant="primary"
                    size="md"
                    onClick={onConfirm || onClose}
                  >
                    {confirmText || 'Confirm'}
                  </NeuronButton>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
