import React, { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type BreadcrumbVariant = 'default' | 'filled' | 'bordered' | 'pills';
export type BreadcrumbSize = 'sm' | 'md' | 'lg';
export type BreadcrumbSeparator = 'slash' | 'chevron' | 'arrow' | 'dot' | 'dash';

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Navigation target — omit for the current/active item */
  href?: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Click handler (overrides href) */
  onClick?: () => void;
}

export interface NeuronBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of breadcrumb items (ordered ancestor → current) */
  items: BreadcrumbItem[];
  /** Visual style variant */
  variant?: BreadcrumbVariant;
  /** Size scale */
  size?: BreadcrumbSize;
  /** Separator style between items */
  separator?: BreadcrumbSeparator;
  /** Custom separator ReactNode (overrides separator prop) */
  customSeparator?: React.ReactNode;
  /** Maximum visible items before collapsing middle items into ellipsis */
  maxItems?: number;
  /** Show home icon for the first item */
  showHomeIcon?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Separator renderers
// ─────────────────────────────────────────────────────────────────────────────

function SeparatorIcon({ type, size }: { type: BreadcrumbSeparator; size: BreadcrumbSize }) {
  const iconSize = size === 'sm' ? 10 : size === 'md' ? 12 : 14;

  switch (type) {
    case 'chevron':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      );
    case 'arrow':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      );
    case 'dot':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'dash':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 12h14" />
        </svg>
      );
    case 'slash':
    default:
      return <span aria-hidden="true">/</span>;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Home icon
// ─────────────────────────────────────────────────────────────────────────────

function HomeIcon({ size }: { size: BreadcrumbSize }) {
  const iconSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16;
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function NeuronBreadcrumb({
  items,
  variant = 'default',
  size = 'md',
  separator = 'chevron',
  customSeparator,
  maxItems,
  showHomeIcon = false,
  className,
  ...rest
}: NeuronBreadcrumbProps) {
  const [expanded, setExpanded] = useState(false);

  // Collapse logic
  let visibleItems = items;
  let isCollapsed = false;

  if (maxItems && maxItems > 1 && items.length > maxItems && !expanded) {
    isCollapsed = true;
    const firstCount = 1;
    const lastCount = maxItems - 1;
    visibleItems = [
      ...items.slice(0, firstCount),
      { label: '…', onClick: () => setExpanded(true) } as BreadcrumbItem,
      ...items.slice(items.length - lastCount),
    ];
  }

  const rootClasses = [
    'neuron-breadcrumb',
    `neuron-breadcrumb--${variant}`,
    `neuron-breadcrumb--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const renderSeparator = () => {
    if (customSeparator) return <span className="neuron-breadcrumb__separator" aria-hidden="true">{customSeparator}</span>;
    return (
      <span className="neuron-breadcrumb__separator" aria-hidden="true">
        <SeparatorIcon type={separator} size={size} />
      </span>
    );
  };

  return (
    <nav aria-label="Breadcrumb" className={rootClasses} {...rest}>
      <ol className="neuron-breadcrumb__list">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isFirst = index === 0;
          const isEllipsis = isCollapsed && index === 1;

          return (
            <li
              key={index}
              className={[
                'neuron-breadcrumb__item',
                isLast ? 'neuron-breadcrumb__item--active' : '',
                isEllipsis ? 'neuron-breadcrumb__item--ellipsis' : '',
              ].filter(Boolean).join(' ')}
            >
              {index > 0 && renderSeparator()}

              {isEllipsis ? (
                <button
                  className="neuron-breadcrumb__ellipsis-btn"
                  onClick={() => setExpanded(true)}
                  aria-label="Show all breadcrumb items"
                  type="button"
                >
                  •••
                </button>
              ) : isLast ? (
                <span className="neuron-breadcrumb__current" aria-current="page">
                  {item.icon && <span className="neuron-breadcrumb__icon">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || '#'}
                  className="neuron-breadcrumb__link"
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                >
                  {isFirst && showHomeIcon ? (
                    <span className="neuron-breadcrumb__icon"><HomeIcon size={size} /></span>
                  ) : item.icon ? (
                    <span className="neuron-breadcrumb__icon">{item.icon}</span>
                  ) : null}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
