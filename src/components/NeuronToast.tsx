import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Sparkles,
  Loader2,
  X,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────
export type ToastVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'brand'
  | 'loading';

export type ToastSize = 'sm' | 'md' | 'lg';

export type ToastStyleVariant = 'subtle' | 'filled' | 'outline' | 'glass';

export type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick?: (e?: React.MouseEvent) => void;
  altText?: string;
  disabled?: boolean;
}

export interface ToastOptions {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  size?: ToastSize;
  styleVariant?: ToastStyleVariant;
  duration?: number; // ms, 0 to disable auto-dismiss
  icon?: ReactNode | boolean; // custom node, or false to hide
  dismissible?: boolean;
  action?: ToastAction | ReactNode;
  cancel?: { label: string; onClick?: () => void };
  showProgress?: boolean;
  pauseOnHover?: boolean;
  placement?: ToastPlacement;
  className?: string;
  style?: React.CSSProperties;
  onDismiss?: () => void;
}

export interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Standalone Single Toast Component (<NeuronToast />)
// ─────────────────────────────────────────────────────────────────────────────
export interface NeuronToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  size?: ToastSize;
  styleVariant?: ToastStyleVariant;
  duration?: number;
  icon?: ReactNode | boolean;
  dismissible?: boolean;
  action?: ToastAction | ReactNode;
  cancel?: { label: string; onClick?: () => void };
  showProgress?: boolean;
  pauseOnHover?: boolean;
  onDismiss?: () => void;
  isPaused?: boolean;
  createdAt?: number;
  placement?: ToastPlacement;
  preventDismiss?: boolean;
}

export function NeuronToast({
  id: _id,
  title,
  description,
  variant = 'default',
  size = 'md',
  styleVariant = 'subtle',
  duration = 0,
  icon = true,
  dismissible = true,
  preventDismiss = false,
  action,
  cancel,
  showProgress = false,
  pauseOnHover = true,
  onDismiss,
  isPaused: _isPaused,
  createdAt: _createdAt,
  placement: _placement,
  className = '',
  style,
  ...props
}: NeuronToastProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const durationRef = useRef(duration);
  durationRef.current = duration;

  // Handle dismiss with exit animation
  const handleDismiss = useCallback(
    (e?: React.MouseEvent) => {
      if (preventDismiss) {
        e?.preventDefault();
        e?.stopPropagation();
        return;
      }
      setIsExiting(true);
      setTimeout(() => {
        onDismiss?.();
      }, 220);
    },
    [preventDismiss, onDismiss]
  );

  // Auto-dismiss countdown
  useEffect(() => {
    if (duration <= 0) return;

    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      if (pauseOnHover && isHovered) return;

      setProgress((prev) => {
        const next = prev - step;
        if (next <= 0) {
          clearInterval(timer);
          handleDismiss();
          return 0;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration, isHovered, pauseOnHover, handleDismiss]);

  // Default Icon by Variant
  const renderIcon = () => {
    if (icon === false) return null;
    if (React.isValidElement(icon)) {
      return <span className="neuron-toast__icon-node">{icon}</span>;
    }

    const iconSize = size === 'sm' ? 15 : size === 'lg' ? 20 : 18;

    switch (variant) {
      case 'success':
        return <CheckCircle2 size={iconSize} className="neuron-toast__icon neuron-toast__icon--success" />;
      case 'error':
        return <AlertCircle size={iconSize} className="neuron-toast__icon neuron-toast__icon--error" />;
      case 'warning':
        return <AlertTriangle size={iconSize} className="neuron-toast__icon neuron-toast__icon--warning" />;
      case 'info':
        return <Info size={iconSize} className="neuron-toast__icon neuron-toast__icon--info" />;
      case 'brand':
        return <Sparkles size={iconSize} className="neuron-toast__icon neuron-toast__icon--brand" />;
      case 'loading':
        return <Loader2 size={iconSize} className="neuron-toast__icon neuron-toast__icon--spin" />;
      default:
        return <Info size={iconSize} className="neuron-toast__icon neuron-toast__icon--default" />;
    }
  };

  const isActionObject = (act: any): act is ToastAction => {
    return act && typeof act === 'object' && 'label' in act;
  };

  const classNames = [
    'neuron-toast',
    `neuron-toast--${variant}`,
    `neuron-toast--${size}`,
    `neuron-toast--${styleVariant}`,
    isExiting ? 'neuron-toast--exiting' : 'neuron-toast--entering',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={classNames}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Icon Area */}
      {icon !== false && (
        <div className="neuron-toast__icon-wrap">
          {renderIcon()}
        </div>
      )}

      {/* Content Area */}
      <div className="neuron-toast__content">
        {title && <div className="neuron-toast__title">{title}</div>}
        {description && <div className="neuron-toast__description">{description}</div>}

        {/* Action Buttons if inline under description */}
        {(action || cancel) && (
          <div className="neuron-toast__actions">
            {action && (
              isActionObject(action) ? (
                <button
                  type="button"
                  disabled={action.disabled}
                  onClick={(e) => {
                    if (action.disabled) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                    action.onClick?.(e);
                    handleDismiss(e);
                  }}
                  className={`neuron-toast__action-btn ${action.disabled ? 'neuron-toast__action-btn--disabled' : ''}`}
                >
                  {action.label}
                </button>
              ) : (
                action
              )
            )}
            {cancel && (
              <button
                type="button"
                onClick={(e) => {
                  cancel.onClick?.();
                  handleDismiss(e);
                }}
                className="neuron-toast__cancel-btn"
              >
                {cancel.label}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Close Button */}
      {dismissible && (
        <button
          type="button"
          aria-label={preventDismiss ? 'Display preview (cannot be closed)' : 'Close notification'}
          onClick={(e) => handleDismiss(e)}
          className={`neuron-toast__close-btn ${preventDismiss ? 'neuron-toast__close-btn--static' : ''}`}
          style={preventDismiss ? { cursor: 'default' } : undefined}
          title={preventDismiss ? 'Display preview only' : 'Close notification'}
        >
          <X size={14} />
        </button>
      )}

      {/* Progress Bar (Countdown) */}
      {showProgress && (
        <div className="neuron-toast__progress-track">
          <div
            className="neuron-toast__progress-bar"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Toast Observer / Event Bus (Allows toast() to be called from anywhere)
// ─────────────────────────────────────────────────────────────────────────────
type ToastListener = (toasts: ToastItem[]) => void;

class ToastManager {
  private listeners: Set<ToastListener> = new Set();
  private toasts: ToastItem[] = [];
  private maxToasts: number = 5;

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    listener(this.toasts);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  getToasts(): ToastItem[] {
    return [...this.toasts];
  }

  show(options: ToastOptions | string, variant: ToastVariant = 'default'): string {
    const id = (typeof options === 'object' && options.id) ? options.id : `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const optObj: ToastOptions = typeof options === 'string' ? { description: options } : options;
    const finalVariant: ToastVariant = optObj.variant || variant;

    const newToast: ToastItem = {
      id,
      variant: finalVariant,
      size: 'md',
      styleVariant: 'subtle',
      duration: 4000,
      dismissible: true,
      placement: 'bottom-right',
      pauseOnHover: true,
      showProgress: true,
      ...optObj,
      createdAt: Date.now(),
    };

    // If ID already exists, update in-place
    const existingIndex = this.toasts.findIndex((t) => t.id === id);
    if (existingIndex >= 0) {
      this.toasts[existingIndex] = { ...this.toasts[existingIndex], ...newToast };
    } else {
      // Prepend or limit
      this.toasts = [newToast, ...this.toasts].slice(0, this.maxToasts);
    }

    this.notify();
    return id;
  }

  dismiss(id?: string) {
    if (!id) {
      this.toasts = [];
    } else {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    }
    this.notify();
  }

  setMaxToasts(max: number) {
    this.maxToasts = max;
  }
}

const TOAST_MANAGER_KEY = '__NEUDELA_GLOBAL_TOAST_MANAGER__';

export const toastManager: ToastManager =
  (typeof window !== 'undefined' && (window as any)[TOAST_MANAGER_KEY]) ||
  new ToastManager();

if (typeof window !== 'undefined') {
  (window as any)[TOAST_MANAGER_KEY] = toastManager;
}

// ─────────────────────────────────────────────────────────────────────────────
// Imperative toast API (e.g. toast.success('Saved!'))
// ─────────────────────────────────────────────────────────────────────────────
export interface ToastFunction {
  (message: string | ToastOptions): string;
  success: (message: string | ToastOptions, options?: Omit<ToastOptions, 'description'>) => string;
  error: (message: string | ToastOptions, options?: Omit<ToastOptions, 'description'>) => string;
  warning: (message: string | ToastOptions, options?: Omit<ToastOptions, 'description'>) => string;
  info: (message: string | ToastOptions, options?: Omit<ToastOptions, 'description'>) => string;
  brand: (message: string | ToastOptions, options?: Omit<ToastOptions, 'description'>) => string;
  loading: (message: string | ToastOptions, options?: Omit<ToastOptions, 'description'>) => string;
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string | ToastOptions;
      success: string | ((data: T) => string | ToastOptions);
      error: string | ((err: any) => string | ToastOptions);
    }
  ) => Promise<T>;
  dismiss: (id?: string) => void;
}

const createToastMethod = (variant: ToastVariant) => {
  return (message: string | ToastOptions, options?: Omit<ToastOptions, 'description'>) => {
    if (typeof message === 'string') {
      return toastManager.show({ ...options, description: message }, variant);
    }
    return toastManager.show({ ...options, ...message }, variant);
  };
};

export const toast: ToastFunction = Object.assign(
  (message: string | ToastOptions) => {
    return typeof message === 'string'
      ? toastManager.show({ description: message })
      : toastManager.show(message);
  },
  {
    success: createToastMethod('success'),
    error: createToastMethod('error'),
    warning: createToastMethod('warning'),
    info: createToastMethod('info'),
    brand: createToastMethod('brand'),
    loading: createToastMethod('loading'),
    promise: async <T,>(
      promise: Promise<T>,
      messages: {
        loading: string | ToastOptions;
        success: string | ((data: T) => string | ToastOptions);
        error: string | ((err: any) => string | ToastOptions);
      }
    ) => {
      const id = toast.loading(messages.loading, { duration: 0, dismissible: false });
      try {
        const result = await promise;
        const successMsg = typeof messages.success === 'function' ? messages.success(result) : messages.success;
        if (typeof successMsg === 'string') {
          toastManager.show({ id, description: successMsg, duration: 4000, dismissible: true }, 'success');
        } else {
          toastManager.show({ id, ...successMsg, duration: 4000, dismissible: true }, 'success');
        }
        return result;
      } catch (err) {
        const errorMsg = typeof messages.error === 'function' ? messages.error(err) : messages.error;
        if (typeof errorMsg === 'string') {
          toastManager.show({ id, description: errorMsg, duration: 5000, dismissible: true }, 'error');
        } else {
          toastManager.show({ id, ...errorMsg, duration: 5000, dismissible: true }, 'error');
        }
        throw err;
      }
    },
    dismiss: (id?: string) => toastManager.dismiss(id),
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// Toast Context & Provider
// ─────────────────────────────────────────────────────────────────────────────
interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (options: ToastOptions | string, variant?: ToastVariant) => string;
  dismissToast: (id?: string) => void;
  toast: ToastFunction;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
  defaultPlacement?: ToastPlacement;
}

export function ToastProvider({
  children,
  maxToasts = 5,
  defaultPlacement = 'bottom-right',
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>(() => toastManager.getToasts());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    toastManager.setMaxToasts(maxToasts);
    const unsubscribe = toastManager.subscribe((items) => {
      setToasts([...items]);
    });
    return unsubscribe;
  }, [maxToasts]);

  const showToast = useCallback(
    (options: ToastOptions | string, variant?: ToastVariant) => {
      return toastManager.show(options, variant);
    },
    []
  );

  const dismissToast = useCallback((id?: string) => {
    toastManager.dismiss(id);
  }, []);

  // Group toasts by placement
  const toastsByPlacement: Record<ToastPlacement, ToastItem[]> = {
    'top-left': [],
    'top-center': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-center': [],
    'bottom-right': [],
  };

  toasts.forEach((t) => {
    const p = t.placement || defaultPlacement;
    toastsByPlacement[p].push(t);
  });

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        toast,
      }}
    >
      {children}

      {/* Portals for floating toasts in all 6 standard placements rendered to body via createPortal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <div className="neuron-toast-portal-root" style={{ pointerEvents: 'none' }}>
          {(Object.keys(toastsByPlacement) as ToastPlacement[]).map((placement) => {
            const items = toastsByPlacement[placement];
            if (items.length === 0) return null;

            const isBottom = placement.startsWith('bottom');

            return (
              <aside
                key={placement}
                aria-label="Notifications"
                className={`neuron-toast-container neuron-toast-container--${placement}`}
                style={{
                  flexDirection: isBottom ? 'column-reverse' : 'column',
                }}
              >
                {items.map((item) => (
                  <NeuronToast
                    key={item.id}
                    {...item}
                    onDismiss={() => {
                      item.onDismiss?.();
                      dismissToast(item.id);
                    }}
                  />
                ))}
              </aside>
            );
          })}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    // Graceful fallback: return imperative toast methods directly even if outside provider
    return {
      toasts: [],
      showToast: (opts, variant) => toastManager.show(opts, variant),
      dismissToast: (id) => toastManager.dismiss(id),
      toast,
    };
  }
  return context;
}

export default NeuronToast;
