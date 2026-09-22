import React, {
  createContext,
  useContext,
  useState,
  useId,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { ChevronDown, Plus, Minus, ArrowRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export type AccordionType = 'single' | 'multiple';
export type AccordionVariant =
  | 'default'
  | 'separated'
  | 'flush'
  | 'boxed'
  | 'minimal'
  | 'gradient'
  | 'accent-left'
  | 'floating'
  | 'pill'
  | 'numbered';
export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionIconPosition = 'left' | 'right';
export type AccordionIconType = 'chevron' | 'plus-minus' | 'arrow' | 'none';

export interface AccordionItem {
  id: string | number;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  number?: string | number;
  avatarIcon?: boolean;
  content: React.ReactNode;
  disabled?: boolean;
  defaultOpen?: boolean;
}

export interface NeuronAccordionProps {
  /** Array of accordion items for data-driven usage */
  items?: AccordionItem[];
  /** React children for compound component usage */
  children?: React.ReactNode;
  /** Single item can be open, or multiple items concurrently */
  type?: AccordionType;
  /** In single mode, whether all items can be collapsed (no open item) */
  collapsible?: boolean;
  /** Controlled open item id(s) */
  value?: string | string[];
  /** Uncontrolled default open item id(s) */
  defaultValue?: string | string[];
  /** Callback fired when open item(s) change */
  onChange?: (value: string | string[]) => void;
  /** Radix / shadcn compatible alias for onChange */
  onValueChange?: (value: string | string[]) => void;
  /** Visual appearance variant */
  variant?: AccordionVariant;
  /** Sizing scale affecting padding, typography, and icon size */
  size?: AccordionSize;
  /** Grid column layout: 1 (default) or 2 for two-column side-by-side grid */
  columns?: 1 | 2;
  /** Automatically prefix item index number (01, 02, etc.) */
  numberPrefix?: boolean;
  /** Expansion indicator placement */
  iconPosition?: AccordionIconPosition;
  /** Icon glyph style for toggle indicator */
  iconType?: AccordionIconType;
  /** Disable the entire accordion */
  disabled?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Custom accessible label */
  ariaLabel?: string;
  /** Accessible heading level (2-6) for triggers, defaults to none (plain button) */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

// ─────────────────────────────────────────────────────────────────────────────
// Context for Compound Components
// ─────────────────────────────────────────────────────────────────────────────

interface AccordionContextValue {
  type: AccordionType;
  collapsible: boolean;
  variant: AccordionVariant;
  size: AccordionSize;
  iconPosition: AccordionIconPosition;
  iconType: AccordionIconType;
  openValues: string[];
  toggleItem: (id: string) => void;
  isDisabled: boolean;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  registerTrigger: (id: string, el: HTMLButtonElement | null) => void;
  handleKeyDown: (e: React.KeyboardEvent, currentId: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('Accordion compound components must be used within <NeuronAccordion>');
  }
  return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────
// Expansion Indicator Icon
// ─────────────────────────────────────────────────────────────────────────────

interface AccordionIconProps {
  isOpen: boolean;
  iconType: AccordionIconType;
  size: AccordionSize;
}

function AccordionIcon({ isOpen, iconType, size }: AccordionIconProps) {
  if (iconType === 'none') return null;

  const iconDimensions: Record<AccordionSize, number> = {
    sm: 15,
    md: 18,
    lg: 21,
  };

  const dim = iconDimensions[size];

  if (iconType === 'plus-minus') {
    return (
      <span className={`neuron-accordion__icon-glyph neuron-accordion__icon-glyph--plus-minus ${isOpen ? 'is-open' : ''}`}>
        {isOpen ? (
          <Minus size={dim} strokeWidth={2.25} />
        ) : (
          <Plus size={dim} strokeWidth={2.25} />
        )}
      </span>
    );
  }

  if (iconType === 'arrow') {
    return (
      <span className={`neuron-accordion__icon-glyph neuron-accordion__icon-glyph--arrow ${isOpen ? 'is-open' : ''}`}>
        <ArrowRight size={dim} strokeWidth={2.25} />
      </span>
    );
  }

  // Default: chevron
  return (
    <span className={`neuron-accordion__icon-glyph neuron-accordion__icon-glyph--chevron ${isOpen ? 'is-open' : ''}`}>
      <ChevronDown size={dim} strokeWidth={2.25} />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Compound Item Component: NeuronAccordionItem
// ─────────────────────────────────────────────────────────────────────────────

export interface NeuronAccordionItemProps {
  value: string | number;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ItemContextValue {
  itemId: string;
  isOpen: boolean;
  itemDisabled: boolean;
  headerId: string;
  panelId: string;
}

const ItemContext = createContext<ItemContextValue | null>(null);

export function useAccordionItemContext() {
  const ctx = useContext(ItemContext);
  if (!ctx) {
    throw new Error('NeuronAccordionTrigger and NeuronAccordionContent must be used within <NeuronAccordionItem>');
  }
  return ctx;
}

export function NeuronAccordionItem({
  value,
  disabled = false,
  children,
  className = '',
}: NeuronAccordionItemProps) {
  const { openValues, isDisabled: groupDisabled, variant } = useAccordionContext();
  const rawId = String(value);
  const autoId = useId();
  const headerId = `neuron-accordion-header-${autoId}`;
  const panelId = `neuron-accordion-panel-${autoId}`;

  const isOpen = openValues.includes(rawId);
  const itemDisabled = groupDisabled || disabled;

  const itemClasses = [
    'neuron-accordion__item',
    isOpen ? 'is-open' : '',
    itemDisabled ? 'is-disabled' : '',
    `neuron-accordion__item--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ItemContext.Provider
      value={{
        itemId: rawId,
        isOpen,
        itemDisabled,
        headerId,
        panelId,
      }}
    >
      <div className={itemClasses} data-state={isOpen ? 'open' : 'collapsed'}>
        {children}
      </div>
    </ItemContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Compound Trigger Component: NeuronAccordionTrigger
// ─────────────────────────────────────────────────────────────────────────────

export interface NeuronAccordionTriggerProps {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  number?: React.ReactNode;
  avatarIcon?: boolean;
  className?: string;
}

export function NeuronAccordionTrigger({
  children,
  subtitle,
  icon,
  badge,
  number,
  avatarIcon = false,
  className = '',
}: NeuronAccordionTriggerProps) {
  const {
    variant,
    size,
    iconPosition,
    iconType,
    toggleItem,
    headingLevel,
    registerTrigger,
    handleKeyDown,
  } = useAccordionContext();
  const { itemId, isOpen, itemDisabled, headerId, panelId } = useAccordionItemContext();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    registerTrigger(itemId, buttonRef.current);
    return () => registerTrigger(itemId, null);
  }, [itemId, registerTrigger]);

  const triggerContent = (
    <button
      ref={buttonRef}
      type="button"
      id={headerId}
      aria-expanded={isOpen}
      aria-controls={panelId}
      aria-disabled={itemDisabled}
      disabled={itemDisabled}
      className={[
        'neuron-accordion__trigger',
        `neuron-accordion__trigger--${variant}`,
        `neuron-accordion__trigger--${size}`,
        `neuron-accordion__trigger--icon-${iconPosition}`,
        isOpen ? 'is-open' : '',
        itemDisabled ? 'is-disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => {
        if (!itemDisabled) {
          toggleItem(itemId);
        }
      }}
      onKeyDown={(e) => handleKeyDown(e, itemId)}
    >
      {/* Left indicator if iconPosition is left */}
      {iconPosition === 'left' && (
        <span className="neuron-accordion__indicator neuron-accordion__indicator--left" aria-hidden="true">
          <AccordionIcon isOpen={isOpen} iconType={iconType} size={size} />
        </span>
      )}

      {/* Optional Number prefix (Style 3, 10) */}
      {number && (
        <span className="neuron-accordion__number" aria-hidden="true">
          {number}
        </span>
      )}

      {/* Optional Leading Icon (or Circular Avatar for Style 6) */}
      {icon && (
        <span
          className={`neuron-accordion__leading-icon ${
            avatarIcon || variant === 'floating' ? 'neuron-accordion__leading-icon--avatar' : ''
          }`}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      {/* Title & Subtitle Stack */}
      <div className="neuron-accordion__title-group">
        <span className="neuron-accordion__title">{children}</span>
        {subtitle && <span className="neuron-accordion__subtitle">{subtitle}</span>}
      </div>

      {/* Trailing Slot: Badge + Right Indicator */}
      {(badge || iconPosition === 'right') && (
        <div className="neuron-accordion__trailing">
          {badge && <span className="neuron-accordion__badge">{badge}</span>}
          {iconPosition === 'right' && (
            <span className="neuron-accordion__indicator neuron-accordion__indicator--right" aria-hidden="true">
              <AccordionIcon isOpen={isOpen} iconType={iconType} size={size} />
            </span>
          )}
        </div>
      )}
    </button>
  );

  // Wrap in heading tag if headingLevel specified
  if (headingLevel) {
    const HeadingTag = `h${headingLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    return <HeadingTag className="neuron-accordion__header">{triggerContent}</HeadingTag>;
  }

  return <div className="neuron-accordion__header">{triggerContent}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Compound Content Component: NeuronAccordionContent
// ─────────────────────────────────────────────────────────────────────────────

export interface NeuronAccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function NeuronAccordionContent({
  children,
  className = '',
}: NeuronAccordionContentProps) {
  const { variant, size } = useAccordionContext();
  const { isOpen, headerId, panelId } = useAccordionItemContext();

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={headerId}
      aria-hidden={!isOpen}
      className={[
        'neuron-accordion__collapse',
        isOpen ? 'is-open' : 'is-collapsed',
      ].join(' ')}
    >
      <div className="neuron-accordion__collapse-wrapper">
        <div
          className={[
            'neuron-accordion__content',
            `neuron-accordion__content--${variant}`,
            `neuron-accordion__content--${size}`,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main NeuronAccordion Component
// ─────────────────────────────────────────────────────────────────────────────

export default function NeuronAccordion({
  items,
  children,
  type = 'single',
  collapsible = true,
  value: controlledValue,
  defaultValue,
  onChange,
  onValueChange,
  variant = 'default',
  size = 'md',
  columns = 1,
  numberPrefix = false,
  iconPosition = 'right',
  iconType = 'chevron',
  disabled = false,
  className = '',
  ariaLabel,
  headingLevel,
}: NeuronAccordionProps) {
  // Normalize initial open items state
  const getInitialValues = useCallback((): string[] => {
    if (defaultValue !== undefined) {
      if (Array.isArray(defaultValue)) {
        return defaultValue.map(String);
      }
      return defaultValue !== '' && defaultValue !== null ? [String(defaultValue)] : [];
    }
    if (items && items.length > 0) {
      const defaultOpened = items
        .filter((item) => item.defaultOpen)
        .map((item) => String(item.id));
      if (defaultOpened.length > 0) {
        return type === 'single' ? [defaultOpened[0]] : defaultOpened;
      }
    }
    return [];
  }, [defaultValue, items, type]);

  const [internalValues, setInternalValues] = useState<string[]>(getInitialValues);

  // Controlled vs uncontrolled resolution
  const isControlled = controlledValue !== undefined;
  const openValues = isControlled
    ? Array.isArray(controlledValue)
      ? controlledValue.map(String)
      : controlledValue !== '' && controlledValue !== null && controlledValue !== undefined
        ? [String(controlledValue)]
        : []
    : internalValues;

  // Toggle item handler with single/multiple and collapsible rules
  const toggleItem = useCallback(
    (id: string) => {
      let nextValues: string[];

      if (type === 'single') {
        const isCurrentlyOpen = openValues.includes(id);
        if (isCurrentlyOpen) {
          if (collapsible) {
            nextValues = [];
          } else {
            // Cannot collapse the only open item when collapsible is false
            return;
          }
        } else {
          nextValues = [id];
        }
      } else {
        // multiple
        const isCurrentlyOpen = openValues.includes(id);
        if (isCurrentlyOpen) {
          nextValues = openValues.filter((v) => v !== id);
        } else {
          nextValues = [...openValues, id];
        }
      }

      if (!isControlled) {
        setInternalValues(nextValues);
      }

      const emittedValue = type === 'single' ? (nextValues[0] ?? '') : nextValues;
      if (onChange) {
        onChange(emittedValue);
      }
      if (onValueChange) {
        onValueChange(emittedValue);
      }
    },
    [type, collapsible, openValues, isControlled, onChange, onValueChange]
  );

  // Accessible Keyboard Navigation across triggers
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const registerTrigger = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) {
      triggerRefs.current.set(id, el);
    } else {
      triggerRefs.current.delete(id);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentId: string) => {
      const activeKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
      if (!activeKeys.includes(e.key)) return;

      const entries = Array.from(triggerRefs.current.entries()).filter(
        ([_, btn]) => !btn.disabled
      );
      if (entries.length === 0) return;

      const currentIndex = entries.findIndex(([id]) => id === currentId);
      if (currentIndex === -1) return;

      e.preventDefault();

      let targetIndex = currentIndex;

      if (e.key === 'ArrowDown') {
        targetIndex = (currentIndex + 1) % entries.length;
      } else if (e.key === 'ArrowUp') {
        targetIndex = (currentIndex - 1 + entries.length) % entries.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = entries.length - 1;
      }

      const [_, targetButton] = entries[targetIndex];
      targetButton.focus();
    },
    []
  );

  const containerClasses = [
    'neuron-accordion',
    `neuron-accordion--${variant}`,
    `neuron-accordion--${size}`,
    `neuron-accordion--icon-${iconPosition}`,
    columns === 2 ? 'neuron-accordion--columns-2' : '',
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contextValue: AccordionContextValue = {
    type,
    collapsible,
    variant,
    size,
    iconPosition,
    iconType,
    openValues,
    toggleItem,
    isDisabled: disabled,
    headingLevel,
    registerTrigger,
    handleKeyDown,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={containerClasses} aria-label={ariaLabel}>
        {/* Render either data-driven items or compound children */}
        {items && items.length > 0
          ? items.map((item, index) => {
              const formattedNumber =
                item.number !== undefined
                  ? item.number
                  : numberPrefix || variant === 'numbered'
                    ? String(index + 1).padStart(2, '0')
                    : undefined;

              return (
                <NeuronAccordionItem
                  key={item.id}
                  value={item.id}
                  disabled={item.disabled}
                >
                  <NeuronAccordionTrigger
                    subtitle={item.subtitle}
                    icon={item.icon}
                    badge={item.badge}
                    number={formattedNumber}
                    avatarIcon={item.avatarIcon}
                  >
                    {item.title}
                  </NeuronAccordionTrigger>
                  <NeuronAccordionContent>
                    {item.content}
                  </NeuronAccordionContent>
                </NeuronAccordionItem>
              );
            })
          : children}
      </div>
    </AccordionContext.Provider>
  );
}
