import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export type TabBarVariant = 'line' | 'pills' | 'enclosed' | 'segment' | 'soft';
export type TabBarSize = 'sm' | 'md' | 'lg';
export type TabBarOrientation = 'horizontal' | 'vertical';

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Tab label text or custom ReactNode */
  label: React.ReactNode;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Optional trailing icon */
  trailingIcon?: React.ReactNode;
  /** Optional badge or counter (e.g. number, "New", or status dot) */
  badge?: React.ReactNode;
  /** Disable interaction with this tab */
  disabled?: boolean;
  /** Allow tab to be closed with an 'x' action button */
  closable?: boolean;
  /** Associated panel content when using self-contained tab panels */
  content?: React.ReactNode;
  /** Optional link href (if acting as navigation links) */
  href?: string;
  /** Accessible label description */
  ariaLabel?: string;
  /** Custom CSS class for specific tab */
  className?: string;
}

export interface NeuronTabBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Array of tab configuration items */
  items: TabItem[];
  /** Controlled active tab ID */
  value?: string;
  /** Uncontrolled default active tab ID (defaults to first item) */
  defaultValue?: string;
  /** Callback fired when active tab changes */
  onChange?: (activeId: string) => void;
  /** Visual appearance style */
  variant?: TabBarVariant;
  /** Scale sizing */
  size?: TabBarSize;
  /** Layout orientation */
  orientation?: TabBarOrientation;
  /** Expand tabs to fill entire container width (horizontal only) */
  fullWidth?: boolean;
  /** Enable scroll controls and smooth scrolling on overflow */
  scrollable?: boolean;
  /** Enable close button on all tabs */
  closable?: boolean;
  /** Callback fired when a tab close button is clicked */
  onTabClose?: (tabId: string, event: React.MouseEvent) => void;
  /** Extra content rendered at the end of tab header (e.g., action buttons or search) */
  extra?: React.ReactNode;
  /** Accessible label for the tablist container */
  ariaLabel?: string;
  /** Render tab panels automatically for items that provide content */
  renderPanels?: boolean;
  /** Custom tab panel container className */
  panelClassName?: string;
  /** Custom children (e.g., manually placed NeuronTabPanel elements) */
  children?: React.ReactNode;
}

export interface NeuronTabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab ID matching corresponding TabItem.id */
  id: string;
  /** Whether panel is currently visible */
  active?: boolean;
  /** Panel content */
  children?: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponent: NeuronTabPanel
// ─────────────────────────────────────────────────────────────────────────────

export function NeuronTabPanel({
  id,
  active = false,
  className = '',
  children,
  ...rest
}: NeuronTabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={`neuron-tabpanel-${id}`}
      aria-labelledby={`neuron-tab-${id}`}
      hidden={!active}
      className={`neuron-tab-panel ${active ? 'neuron-tab-panel--active' : ''} ${className}`.trim()}
      tabIndex={0}
      {...rest}
    >
      {active ? children : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component: NeuronTabBar
// ─────────────────────────────────────────────────────────────────────────────

export default function NeuronTabBar({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'line',
  size = 'md',
  orientation = 'horizontal',
  fullWidth = false,
  scrollable = true,
  closable = false,
  onTabClose,
  extra,
  ariaLabel = 'Tabs navigation',
  renderPanels = true,
  panelClassName = '',
  className = '',
  children,
  ...rest
}: NeuronTabBarProps) {
  // First non-disabled item fallback
  const firstEnabledId = items.find(item => !item.disabled)?.id || (items[0] ? items[0].id : '');

  const [internalValue, setInternalValue] = useState<string>(
    defaultValue !== undefined ? defaultValue : (value !== undefined ? value : firstEnabledId)
  );

  const activeId = value !== undefined ? value : internalValue;

  const tabsNavRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Overflow scroll buttons visibility state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Active indicator position state (for line and segment variants)
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  const checkScroll = useCallback(() => {
    if (orientation === 'vertical' || !tabsNavRef.current) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const el = tabsNavRef.current;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, [orientation]);

  useEffect(() => {
    checkScroll();
    const el = tabsNavRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll, items]);

  // Update animated indicator position
  useEffect(() => {
    const activeEl = tabRefs.current.get(activeId);
    const navEl = tabsNavRef.current;
    if (activeEl && navEl) {
      if (orientation === 'horizontal') {
        const navRect = navEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        const left = activeRect.left - navRect.left + navEl.scrollLeft;
        const width = activeRect.width;

        setIndicatorStyle({
          left: `${left}px`,
          width: `${width}px`,
          opacity: 1,
        });
      } else {
        const navRect = navEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        const top = activeRect.top - navRect.top + navEl.scrollTop;
        const height = activeRect.height;

        setIndicatorStyle({
          top: `${top}px`,
          height: `${height}px`,
          opacity: 1,
        });
      }
    } else {
      setIndicatorStyle({ opacity: 0 });
    }
  }, [activeId, items, orientation, variant, size]);

  const handleSelectTab = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (value === undefined) {
      setInternalValue(id);
    }
    onChange?.(id);

    // Scroll selected tab into view smoothly
    const activeEl = tabRefs.current.get(id);
    if (activeEl && tabsNavRef.current && orientation === 'horizontal') {
      const nav = tabsNavRef.current;
      const navLeft = nav.getBoundingClientRect().left;
      const navRight = nav.getBoundingClientRect().right;
      const tabLeft = activeEl.getBoundingClientRect().left;
      const tabRight = activeEl.getBoundingClientRect().right;

      if (tabLeft < navLeft + 40) {
        nav.scrollTo({ left: nav.scrollLeft - (navLeft - tabLeft + 60), behavior: 'smooth' });
      } else if (tabRight > navRight - 40) {
        nav.scrollTo({ left: nav.scrollLeft + (tabRight - navRight + 60), behavior: 'smooth' });
      }
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!tabsNavRef.current) return;
    const offset = direction === 'left' ? -200 : 200;
    tabsNavRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Keyboard navigation complying with WAI-ARIA APG Tabs pattern
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const enabledTabs = items.filter(i => !i.disabled);
    if (enabledTabs.length === 0) return;

    const currentIndex = enabledTabs.findIndex(i => i.id === items[index]?.id);
    let nextIndex = -1;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % enabledTabs.length;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
      }
    } else {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % enabledTabs.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
      }
    }

    if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = enabledTabs.length - 1;
    }

    if (nextIndex !== -1 && enabledTabs[nextIndex]) {
      const nextTab = enabledTabs[nextIndex];
      handleSelectTab(nextTab.id);
      tabRefs.current.get(nextTab.id)?.focus();
    }
  };

  const handleClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose?.(tabId, e);
  };

  const rootClasses = [
    'neuron-tab-bar',
    `neuron-tab-bar--${variant}`,
    `neuron-tab-bar--${size}`,
    `neuron-tab-bar--${orientation}`,
    fullWidth && orientation === 'horizontal' ? 'neuron-tab-bar--full-width' : '',
    scrollable ? 'neuron-tab-bar--scrollable' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClasses} {...rest}>
      {/* ── Tab Bar Navigation Header ── */}
      <div className="neuron-tab-bar__header-wrap">
        {/* Scroll Left Button */}
        {scrollable && orientation === 'horizontal' && (
          <button
            type="button"
            className={`neuron-tab-bar__scroll-btn neuron-tab-bar__scroll-btn--prev ${!canScrollLeft ? 'is-disabled' : ''}`}
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll tabs left"
            tabIndex={-1}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Tab List */}
        <div
          ref={tabsNavRef}
          className="neuron-tab-bar__nav"
          role="tablist"
          aria-label={ariaLabel}
          aria-orientation={orientation}
        >
          {items.map((tab, idx) => {
            const isActive = tab.id === activeId;
            const isTabClosable = tab.closable ?? closable;

            const tabItemClasses = [
              'neuron-tab',
              isActive ? 'neuron-tab--active' : '',
              tab.disabled ? 'neuron-tab--disabled' : '',
              isTabClosable ? 'neuron-tab--closable' : '',
              tab.className || '',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={tab.id}
                ref={el => {
                  if (el) tabRefs.current.set(tab.id, el);
                  else tabRefs.current.delete(tab.id);
                }}
                role="tab"
                id={`neuron-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`neuron-tabpanel-${tab.id}`}
                aria-disabled={tab.disabled}
                tabIndex={isActive ? 0 : -1}
                disabled={tab.disabled}
                className={tabItemClasses}
                onClick={() => handleSelectTab(tab.id, tab.disabled)}
                onKeyDown={e => handleKeyDown(e, idx)}
                type="button"
                aria-label={tab.ariaLabel}
              >
                {/* Leading Icon */}
                {tab.icon && <span className="neuron-tab__icon neuron-tab__icon--lead">{tab.icon}</span>}

                {/* Tab Label */}
                <span className="neuron-tab__label">{tab.label}</span>

                {/* Badge or Counter */}
                {tab.badge !== undefined && tab.badge !== null && (
                  <span className="neuron-tab__badge">{tab.badge}</span>
                )}

                {/* Trailing Icon */}
                {tab.trailingIcon && (
                  <span className="neuron-tab__icon neuron-tab__icon--trail">{tab.trailingIcon}</span>
                )}

                {/* Closable Action Button */}
                {isTabClosable && !tab.disabled && (
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Close ${typeof tab.label === 'string' ? tab.label : 'tab'}`}
                    className="neuron-tab__close-btn"
                    onClick={e => handleClose(e, tab.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        onTabClose?.(tab.id, e as unknown as React.MouseEvent);
                      }
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}

          {/* Active Highlight Slider / Underline Indicator */}
          {(variant === 'line' || variant === 'segment') && (
            <span
              className="neuron-tab-bar__active-indicator"
              style={indicatorStyle}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Scroll Right Button */}
        {scrollable && orientation === 'horizontal' && (
          <button
            type="button"
            className={`neuron-tab-bar__scroll-btn neuron-tab-bar__scroll-btn--next ${!canScrollRight ? 'is-disabled' : ''}`}
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll tabs right"
            tabIndex={-1}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Extra Action Slot */}
        {extra && <div className="neuron-tab-bar__extra">{extra}</div>}
      </div>

      {/* ── Tab Content Panels ── */}
      {renderPanels && (
        <div className={`neuron-tab-bar__panels ${panelClassName}`.trim()}>
          {items.map(tab => {
            if (tab.content === undefined && !children) return null;
            return (
              <NeuronTabPanel
                key={tab.id}
                id={tab.id}
                active={tab.id === activeId}
              >
                {tab.content}
              </NeuronTabPanel>
            );
          })}
          {children}
        </div>
      )}
    </div>
  );
}

// Alias for flexibility
export { NeuronTabBar as NeuronTabs };
