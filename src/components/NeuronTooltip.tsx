import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  ReactNode,
  CSSProperties,
} from 'react';

export type NeuronTooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export type NeuronTooltipVariant = 'dark' | 'light' | 'brand' | 'success' | 'warning' | 'danger';
export type NeuronTooltipSize = 'sm' | 'md' | 'lg';
export type NeuronTooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

export interface NeuronTooltipProps {
  /** Simple text or custom node (can be used alone or alongside title/description) */
  content?: ReactNode;
  /** Primary Title (rendered at 12px, font-weight 600 SemiBold) */
  title?: ReactNode;
  /** Supporting Text / Body description (rendered at 12px, font-weight 400 Regular) */
  description?: ReactNode;
  children: ReactNode;
  placement?: NeuronTooltipPlacement;
  variant?: NeuronTooltipVariant;
  /** @deprecated Size is unified to 12px typography across all tooltips */
  size?: NeuronTooltipSize;
  arrow?: boolean;
  delay?: number;
  closeDelay?: number;
  trigger?: NeuronTooltipTrigger;
  isOpen?: boolean;
  disabled?: boolean;
  maxWidth?: number;
  interactive?: boolean;
  className?: string;
  id?: string;
}

// ─── Positioning Helpers ──────────────────────────────────────────────────────

function getOppositeAxis(placement: NeuronTooltipPlacement): string {
  if (placement.startsWith('top')) return 'bottom';
  if (placement.startsWith('bottom')) return 'top';
  if (placement.startsWith('left')) return 'right';
  return 'left';
}

function computePosition(
  placement: NeuronTooltipPlacement,
  triggerRect: DOMRect,
  tooltipWidth: number,
  tooltipHeight: number,
  gap = 4
): { x: number; y: number } {
  const { top, left, width, height } = triggerRect;
  const tw = tooltipWidth;
  const th = tooltipHeight;
  let x = 0, y = 0;

  // Primary axis
  if (placement.startsWith('top'))         y = top - th - gap;
  else if (placement.startsWith('bottom')) y = top + height + gap;
  else                                     y = top + height / 2 - th / 2;

  if (placement.startsWith('left'))        x = left - tw - gap;
  else if (placement.startsWith('right'))  x = left + width + gap;
  else                                     x = left + width / 2 - tw / 2;

  // Alignment
  if (placement.endsWith('-start')) {
    if (placement.startsWith('top') || placement.startsWith('bottom')) x = left;
    else y = top;
  } else if (placement.endsWith('-end')) {
    if (placement.startsWith('top') || placement.startsWith('bottom')) x = left + width - tw;
    else y = top + height - th;
  }

  // Viewport clamp
  const vpw = window.innerWidth;
  const vph = window.innerHeight;
  if (x < 8) x = 8;
  if (x + tw > vpw - 8) x = vpw - tw - 8;
  if (y < 8) y = 8;
  if (y + th > vph - 8) y = vph - th - 8;

  return { x, y };
}

function getArrowStyle(placement: NeuronTooltipPlacement, bg: string): CSSProperties {
  const axis = getOppositeAxis(placement);
  const S = 6;
  const base: CSSProperties = { position: 'absolute', width: 0, height: 0, pointerEvents: 'none' };

  if (axis === 'bottom') {
    let horizontal: CSSProperties = { left: '50%', transform: 'translateX(-50%)' };
    if (placement.endsWith('-start')) horizontal = { left: 16, transform: 'none' };
    if (placement.endsWith('-end'))   horizontal = { right: 16, left: 'auto', transform: 'none' };
    return {
      ...base,
      bottom: -S,
      ...horizontal,
      borderLeft: `${S}px solid transparent`,
      borderRight: `${S}px solid transparent`,
      borderTop: `${S}px solid ${bg}`,
    };
  }

  if (axis === 'top') {
    let horizontal: CSSProperties = { left: '50%', transform: 'translateX(-50%)' };
    if (placement.endsWith('-start')) horizontal = { left: 16, transform: 'none' };
    if (placement.endsWith('-end'))   horizontal = { right: 16, left: 'auto', transform: 'none' };
    return {
      ...base,
      top: -S,
      ...horizontal,
      borderLeft: `${S}px solid transparent`,
      borderRight: `${S}px solid transparent`,
      borderBottom: `${S}px solid ${bg}`,
    };
  }

  if (axis === 'right') {
    let vertical: CSSProperties = { top: '50%', transform: 'translateY(-50%)' };
    if (placement.endsWith('-start')) vertical = { top: 10, transform: 'none' };
    if (placement.endsWith('-end'))   vertical = { bottom: 10, top: 'auto', transform: 'none' };
    return {
      ...base,
      right: -S,
      ...vertical,
      borderTop: `${S}px solid transparent`,
      borderBottom: `${S}px solid transparent`,
      borderLeft: `${S}px solid ${bg}`,
    };
  }

  // axis === 'left'
  let vertical: CSSProperties = { top: '50%', transform: 'translateY(-50%)' };
  if (placement.endsWith('-start')) vertical = { top: 10, transform: 'none' };
  if (placement.endsWith('-end'))   vertical = { bottom: 10, top: 'auto', transform: 'none' };
  return {
    ...base,
    left: -S,
    ...vertical,
    borderTop: `${S}px solid transparent`,
    borderBottom: `${S}px solid transparent`,
    borderRight: `${S}px solid ${bg}`,
  };
}

// ─── Style Maps ──────────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<NeuronTooltipVariant, { bg: string; color: string; border?: string; shadow: string }> = {
  dark:    { bg: '#1a1a2e',                color: '#f0f0f8',                          shadow: '0 8px 24px rgba(0,0,0,0.30)' },
  light:   { bg: 'var(--color-bg-surface)', color: 'var(--color-text-primary)',        shadow: 'var(--shadow-md)' },
  brand:   { bg: 'var(--color-primary)',    color: '#fff',                             shadow: '0 4px 16px rgba(223,126,48,0.35)' },
  success: { bg: '#059669',                color: '#fff',                             shadow: '0 4px 16px rgba(5,150,105,0.30)' },
  warning: { bg: '#f59e0b',                color: '#1a1a2e',                          shadow: '0 4px 16px rgba(245,158,11,0.30)' },
  danger:  { bg: '#dc2626',                color: '#fff',                             shadow: '0 4px 16px rgba(220,38,38,0.30)' },
};

const SIZE_STYLES: Record<NeuronTooltipSize, { maxWidth: number; fontSize: string; padding: string; borderRadius: string }> = {
  sm: { maxWidth: 160, fontSize: '11px', padding: '5px 10px',  borderRadius: '6px' },
  md: { maxWidth: 240, fontSize: '12px', padding: '7px 12px',  borderRadius: '8px' },
  lg: { maxWidth: 360, fontSize: '13px', padding: '10px 14px', borderRadius: '10px' },
};

// ─── Component ────────────────────────────────────────────────────────────────

const NeuronTooltip: React.FC<NeuronTooltipProps> = ({
  content,
  title,
  description,
  children,
  placement = 'top',
  variant = 'dark',
  size = 'md',
  arrow = true,
  delay = 150,
  closeDelay = 80,
  trigger = 'hover',
  isOpen: controlledOpen,
  disabled = false,
  maxWidth,
  interactive = false,
  className = '',
  id,
}) => {
  const isControlled = controlledOpen !== undefined;
  const shouldBeOpen = isControlled ? controlledOpen : false;

  const [mounted, setMounted] = useState<boolean>(shouldBeOpen);
  const [active, setActive] = useState<boolean>(shouldBeOpen);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [positioned, setPositioned] = useState<boolean>(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const openTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef      = useRef(id || `ntt-${Math.random().toString(36).slice(2, 8)}`);

  const clearTimers = () => {
    if (openTimer.current)  { clearTimeout(openTimer.current);  openTimer.current = null; }
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    if (hideTimer.current)  { clearTimeout(hideTimer.current);  hideTimer.current = null; }
  };

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const tRect = triggerRef.current.getBoundingClientRect();
    const ttEl  = tooltipRef.current;
    const tw = ttEl.offsetWidth || 140;
    const th = ttEl.offsetHeight || 34;
    const { x, y } = computePosition(placement, tRect, tw, th, 4);
    setCoords({ x, y });
    setPositioned(true);
  }, [placement]);

  // Synchronously compute position on mount/layout
  useLayoutEffect(() => {
    if (mounted) {
      calculatePosition();
    }
  }, [mounted, calculatePosition]);

  // Handle Controlled Mode
  useEffect(() => {
    if (!isControlled) return;
    if (controlledOpen) {
      setMounted(true);
      // Fade in on next tick once mounted
      const t = setTimeout(() => {
        calculatePosition();
        setActive(true);
      }, 10);
      return () => clearTimeout(t);
    } else {
      setActive(false);
      const t = setTimeout(() => {
        setMounted(false);
        setPositioned(false);
      }, 160);
      return () => clearTimeout(t);
    }
  }, [controlledOpen, isControlled, calculatePosition]);

  // Continuous tracking on scroll / resize / placement change / animation
  useEffect(() => {
    if (!mounted) return;
    calculatePosition();

    let frameId: number;
    const startTime = performance.now();
    const loop = (now: number) => {
      calculatePosition();
      if (now - startTime < 450) {
        frameId = requestAnimationFrame(loop);
      }
    };
    frameId = requestAnimationFrame(loop);

    const onScrollOrResize = () => calculatePosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [mounted, placement, calculatePosition]);

  // Keyboard Escape dismissal
  useEffect(() => {
    if (!mounted || isControlled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActive(false);
        setTimeout(() => setMounted(false), 160);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mounted, isControlled]);

  // Click outside dismissal (for trigger='click')
  useEffect(() => {
    if (!mounted || trigger !== 'click' || isControlled) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !tooltipRef.current?.contains(target)) {
        setActive(false);
        setTimeout(() => setMounted(false), 160);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [mounted, trigger, isControlled]);

  // Uncontrolled interaction handlers
  const doOpen = useCallback(() => {
    if (disabled || isControlled) return;
    clearTimers();
    if (delay > 0) {
      openTimer.current = setTimeout(() => {
        setMounted(true);
        setTimeout(() => {
          calculatePosition();
          setActive(true);
        }, 16);
      }, delay);
    } else {
      setMounted(true);
      setTimeout(() => {
        calculatePosition();
        setActive(true);
      }, 16);
    }
  }, [disabled, isControlled, delay, calculatePosition]);

  const doClose = useCallback(() => {
    if (isControlled) return;
    clearTimers();
    if (closeDelay > 0) {
      closeTimer.current = setTimeout(() => {
        setActive(false);
        hideTimer.current = setTimeout(() => {
          setMounted(false);
          setPositioned(false);
        }, 160);
      }, closeDelay);
    } else {
      setActive(false);
      hideTimer.current = setTimeout(() => {
        setMounted(false);
        setPositioned(false);
      }, 160);
    }
  }, [isControlled, closeDelay]);

  const doToggle = useCallback(() => {
    if (disabled || isControlled) return;
    if (active) doClose(); else doOpen();
  }, [disabled, isControlled, active, doOpen, doClose]);

  useEffect(() => () => clearTimers(), []);

  // ── Trigger event props ───────────────────────────────────────────────────
  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};
  if (!isControlled) {
    if (trigger === 'hover') {
      triggerProps.onMouseEnter = doOpen;
      triggerProps.onMouseLeave = doClose;
      triggerProps.onFocus      = doOpen;
      triggerProps.onBlur       = doClose;
    } else if (trigger === 'click') {
      triggerProps.onClick = doToggle;
    } else if (trigger === 'focus') {
      triggerProps.onFocus = doOpen;
      triggerProps.onBlur  = doClose;
    }
  }

  // ── Styles ───────────────────────────────────────────────────────────────
  const v = VARIANT_STYLES[variant];
  const hasRichContent = Boolean(title || description);

  const bubbleStyle: CSSProperties = {
    position: 'fixed',
    top:  coords.y,
    left: coords.x,
    zIndex: 9999,
    // variant
    background:   v.bg,
    color:        v.color,
    border:       v.border || 'none',
    boxShadow:    positioned ? v.shadow : 'none',
    // uniform size specs (All tooltips use standard 12px font & 260px maxWidth)
    maxWidth:     maxWidth || 260,
    fontSize:     '12px',
    padding:      hasRichContent && title && description ? '8px 12px' : '6px 10px',
    borderRadius: '6px',
    // typography & layout
    lineHeight:   1.4,
    fontFamily:   'var(--font-family)',
    fontWeight:   400,
    wordBreak:    'break-word',
    pointerEvents: (interactive || trigger === 'click' || trigger === 'manual' || isControlled) ? 'auto' : 'none',
    // smooth animation
    opacity:      positioned && active ? 1 : 0,
    transform:    positioned && active ? 'scale(1) translateY(0px)' : 'scale(0.94) translateY(3px)',
    transition:   'opacity 0.16s ease, transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1)',
    willChange:   'opacity, transform',
  };

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: 'inline-flex', alignItems: 'center' }}
        aria-describedby={active ? idRef.current : undefined}
        {...triggerProps}
      >
        {children}
      </div>

      {mounted && (
        <div
          ref={tooltipRef}
          id={idRef.current}
          role="tooltip"
          aria-hidden={!active}
          className={`neuron-tooltip neuron-tooltip--${variant} ${className}`}
          style={bubbleStyle}
        >
          {hasRichContent ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {title && (
                <div style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.35, color: 'inherit' }}>
                  {title}
                </div>
              )}
              {description && (
                <div style={{ fontSize: '12px', fontWeight: 400, lineHeight: 1.4, color: 'inherit', opacity: variant === 'light' ? 0.75 : 0.88 }}>
                  {description}
                </div>
              )}
            </div>
          ) : (
            content
          )}
          {arrow && (
            <span aria-hidden="true" style={getArrowStyle(placement, v.bg)} />
          )}
        </div>
      )}
    </>
  );
};

export default NeuronTooltip;
