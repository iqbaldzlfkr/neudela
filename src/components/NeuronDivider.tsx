import React from 'react';

export type NeuronDividerOrientation = 'horizontal' | 'vertical';
export type NeuronDividerVariant = 'solid' | 'dashed' | 'dotted' | 'gradient' | 'double';
export type NeuronDividerThickness = 'hairline' | 'thin' | 'medium' | 'thick';
export type NeuronDividerColor = 
  | 'default' 
  | 'subtle' 
  | 'strong' 
  | 'brand' 
  | 'accent' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';
export type NeuronDividerContentPosition = 'center' | 'left' | 'right';
export type NeuronDividerSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface NeuronDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Divider layout direction */
  orientation?: NeuronDividerOrientation;
  /** Visual line style */
  variant?: NeuronDividerVariant;
  /** Line weight/stroke thickness */
  thickness?: NeuronDividerThickness;
  /** Color theme and semantic intent */
  color?: NeuronDividerColor;
  /** Alignment of children/label content when present (horizontal only) */
  contentPosition?: NeuronDividerContentPosition;
  /** Margin spacing applied around the divider */
  spacing?: NeuronDividerSpacing;
  /** Inset margin from container edges (boolean for default 16px or custom string/number) */
  inset?: boolean | number | string;
  /** Optional content/label (text, badge, or icon) rendered along the divider */
  children?: React.ReactNode;
}

export default function NeuronDivider({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color = 'default',
  contentPosition = 'center',
  spacing = 'md',
  inset = false,
  className = '',
  style,
  children,
  ...props
}: NeuronDividerProps) {
  const hasContent = Boolean(children);

  // Inset calculation
  const getInsetStyles = (): React.CSSProperties => {
    if (!inset) return {};
    const insetValue = typeof inset === 'boolean' ? '16px' : typeof inset === 'number' ? `${inset}px` : inset;
    
    if (orientation === 'horizontal') {
      return {
        marginLeft: insetValue,
        marginRight: insetValue,
        width: `calc(100% - (${insetValue} * 2))`,
      };
    } else {
      return {
        marginTop: insetValue,
        marginBottom: insetValue,
        height: `calc(100% - (${insetValue} * 2))`,
      };
    }
  };

  const classNames = [
    'neuron-divider',
    `neuron-divider--${orientation}`,
    `neuron-divider--${variant}`,
    `neuron-divider--${thickness}`,
    `neuron-divider--color-${color}`,
    `neuron-divider--spacing-${spacing}`,
    hasContent ? 'neuron-divider--with-content' : '',
    hasContent ? `neuron-divider--content-${contentPosition}` : '',
    inset ? 'neuron-divider--inset' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: React.CSSProperties = {
    ...getInsetStyles(),
    ...style,
  };

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={classNames}
        style={mergedStyle}
        {...props}
      >
        {hasContent && <span className="neuron-divider__content">{children}</span>}
      </div>
    );
  }

  // Horizontal with content
  if (hasContent) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={classNames}
        style={mergedStyle}
        {...props}
      >
        <span className="neuron-divider__line neuron-divider__line--start" />
        <span className="neuron-divider__content">{children}</span>
        <span className="neuron-divider__line neuron-divider__line--end" />
      </div>
    );
  }

  // Horizontal without content
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={classNames}
      style={mergedStyle}
      {...props}
    />
  );
}
