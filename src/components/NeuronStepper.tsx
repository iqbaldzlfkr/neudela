import React from 'react';
import { Check, X } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────
export type StepStatus = 'upcoming' | 'active' | 'completed' | 'error';
export type StepperVariant = 'default' | 'numbered' | 'icon' | 'dot' | 'minimal' | 'compact';
export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperSize = 'sm' | 'md' | 'lg';
export type StepperConnector = 'solid' | 'dashed' | 'dotted' | 'gradient';
export type StepperLabelPlacement = 'bottom' | 'inline';

export interface StepperStep {
  id: string | number;
  label: string;
  description?: string;
  status?: StepStatus;
  icon?: React.ReactNode;
  completedIcon?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface NeuronStepperProps {
  steps: StepperStep[];
  activeStep?: number;
  variant?: StepperVariant;
  orientation?: StepperOrientation;
  size?: StepperSize;
  labelPlacement?: StepperLabelPlacement;
  clickable?: boolean;
  onStepClick?: (index: number, step: StepperStep) => void;
  showStepCount?: boolean;
  connectorStyle?: StepperConnector;
  completedIconMode?: 'check' | 'icon';
  className?: string;
  ariaLabel?: string;
}

function deriveStatus(index: number, activeStep: number, manualStatus?: StepStatus): StepStatus {
  if (manualStatus) return manualStatus;
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'upcoming';
}

interface StepIndicatorProps {
  index: number;
  status: StepStatus;
  variant: StepperVariant;
  size: StepperSize;
  icon?: React.ReactNode;
  completedIcon?: React.ReactNode;
  completedIconMode?: 'check' | 'icon';
}

function StepIndicator({
  index,
  status,
  variant,
  size,
  icon,
  completedIcon,
  completedIconMode = 'check',
}: StepIndicatorProps) {
  const isMinimal = variant === 'minimal' || variant === 'dot';

  if (isMinimal) {
    return (
      <span
        className={`neuron-step__dot neuron-step__dot--${status} neuron-step__dot--${size}`}
        aria-hidden="true"
      />
    );
  }

  const dimMap: Record<StepperSize, number> = {
    sm: 28,
    md: 36,
    lg: 44,
  };
  const iconSizeMap: Record<StepperSize, number> = {
    sm: 13,
    md: 17,
    lg: 21,
  };
  const fontSizeMap: Record<StepperSize, number> = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const dim = dimMap[size];
  const iconSize = iconSizeMap[size];
  const fontSize = fontSizeMap[size];

  // Render indicator content based on status and variant
  let content: React.ReactNode = null;

  if (status === 'error') {
    content = <X size={iconSize} strokeWidth={2.75} />;
  } else if (status === 'completed') {
    if (completedIcon) {
      content = completedIcon;
    } else if (completedIconMode === 'icon' && (icon || variant === 'icon')) {
      content = icon || <Check size={iconSize} strokeWidth={2.75} />;
    } else {
      content = <Check size={iconSize} strokeWidth={2.75} />;
    }
  } else if (icon || variant === 'icon') {
    content = icon || (
      <span style={{ fontSize, fontWeight: 700, lineHeight: 1 }}>{index + 1}</span>
    );
  } else {
    content = (
      <span style={{ fontSize, fontWeight: 700, lineHeight: 1 }}>{index + 1}</span>
    );
  }

  return (
    <span
      className={[
        'neuron-step__indicator',
        `neuron-step__indicator--${status}`,
        `neuron-step__indicator--${size}`,
        `neuron-step__indicator--${variant}`,
      ].join(' ')}
      style={{ width: dim, height: dim, minWidth: dim, minHeight: dim }}
      aria-hidden="true"
    >
      {content}
    </span>
  );
}

export default function NeuronStepper({
  steps,
  activeStep = 0,
  variant = 'default',
  orientation = 'horizontal',
  size = 'md',
  labelPlacement,
  clickable = false,
  onStepClick,
  showStepCount = false,
  connectorStyle = 'solid',
  completedIconMode = 'check',
  className = '',
  ariaLabel,
}: NeuronStepperProps) {
  const totalSteps = steps.length;
  const isVertical = orientation === 'vertical';
  const effectiveLabelPlacement: StepperLabelPlacement = isVertical
    ? 'inline'
    : labelPlacement || 'bottom';

  const handleStepClick = (index: number, step: StepperStep) => {
    if (!clickable || step.disabled) return;
    onStepClick?.(index, step);
  };

  // ── Compact variant ──────────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <nav
        aria-label={ariaLabel || 'Progress steps'}
        className={[
          'neuron-stepper',
          'neuron-stepper--compact',
          `neuron-stepper--${size}`,
          className,
        ].join(' ')}
      >
        {showStepCount && (
          <span className="neuron-stepper__count">
            Step {Math.min(activeStep + 1, totalSteps)} of {totalSteps}
          </span>
        )}
        <div className="neuron-stepper-compact__track" role="list">
          {steps.map((step, i) => {
            const status = deriveStatus(i, activeStep, step.status);
            return (
              <div
                key={step.id}
                role="listitem"
                aria-current={status === 'active' ? 'step' : undefined}
                aria-label={`Step ${i + 1}: ${step.label} — ${status}`}
                title={step.label}
                className={[
                  'neuron-stepper-compact__segment',
                  `neuron-stepper-compact__segment--${status}`,
                  clickable && !step.disabled ? 'is-clickable' : '',
                ].join(' ')}
                onClick={() => handleStepClick(i, step)}
              />
            );
          })}
        </div>
        {steps[activeStep] && (
          <div className="neuron-stepper-compact__label">
            <span className="neuron-stepper-compact__step-name">{steps[activeStep].label}</span>
            {steps[activeStep].description && (
              <span className="neuron-stepper-compact__step-desc">{steps[activeStep].description}</span>
            )}
          </div>
        )}
      </nav>
    );
  }

  // ── Standard / Numbered / Icon / Minimal variants ────────────────────────
  return (
    <nav
      aria-label={ariaLabel || 'Progress steps'}
      className={[
        'neuron-stepper',
        `neuron-stepper--${variant}`,
        `neuron-stepper--${orientation}`,
        `neuron-stepper--${size}`,
        `neuron-stepper--placement-${effectiveLabelPlacement}`,
        className,
      ].join(' ')}
    >
      {showStepCount && (
        <div className="neuron-stepper__count">
          Step {Math.min(activeStep + 1, totalSteps)} of {totalSteps}
        </div>
      )}

      <ol
        className={[
          'neuron-stepper__list',
          isVertical
            ? 'neuron-stepper__list--vertical'
            : `neuron-stepper__list--horizontal neuron-stepper__list--placement-${effectiveLabelPlacement}`,
        ].join(' ')}
        aria-label="Steps"
      >
        {steps.map((step, i) => {
          const status = deriveStatus(i, activeStep, step.status);
          const isFirst = i === 0;
          const isLast = i === totalSteps - 1;
          const isClickableStep = clickable && !step.disabled;

          // Compute connection completion status:
          // The line leading into step i is completed if the previous step (i-1) was completed.
          const prevStepStatus = i > 0 ? deriveStatus(i - 1, activeStep, steps[i - 1].status) : null;
          const isStartCompleted = prevStepStatus === 'completed';
          const isEndCompleted = status === 'completed';

          // ── 1. Vertical layout ──
          if (isVertical) {
            return (
              <li
                key={step.id}
                className={[
                  'neuron-step',
                  'neuron-step--vertical',
                  `neuron-step--${status}`,
                  `neuron-step--${variant}`,
                  isClickableStep ? 'neuron-step--clickable' : '',
                  step.disabled ? 'neuron-step--disabled' : '',
                ].join(' ')}
                aria-current={status === 'active' ? 'step' : undefined}
              >
                <div className="neuron-step__vertical-rail">
                  <button
                    type="button"
                    className="neuron-step__indicator-btn"
                    onClick={() => handleStepClick(i, step)}
                    disabled={!isClickableStep}
                    aria-label={`Step ${i + 1}: ${step.label}${step.description ? ' — ' + step.description : ''} (${status})`}
                    tabIndex={isClickableStep ? 0 : -1}
                  >
                    <StepIndicator
                      index={i}
                      status={status}
                      variant={variant}
                      size={size}
                      icon={step.icon}
                      completedIcon={step.completedIcon}
                      completedIconMode={completedIconMode}
                    />
                  </button>

                  {!isLast && (
                    <div
                      className={[
                        'neuron-step__line',
                        'neuron-step__line--vertical',
                        `neuron-step__line--${connectorStyle}`,
                        isEndCompleted ? 'neuron-step__line--completed' : '',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="neuron-step__vertical-body">
                  <div className="neuron-step__text">
                    <span className={`neuron-step__label neuron-step__label--${status}`}>
                      {step.label}
                    </span>
                    {step.description && (
                      <span className="neuron-step__description">{step.description}</span>
                    )}
                  </div>
                  {step.content && (
                    <div className="neuron-step__content">{step.content}</div>
                  )}
                </div>
              </li>
            );
          }

          // ── 2. Horizontal layout with label inline ──
          if (effectiveLabelPlacement === 'inline') {
            return (
              <li
                key={step.id}
                className={[
                  'neuron-step',
                  'neuron-step--horizontal',
                  'neuron-step--label-inline',
                  `neuron-step--${status}`,
                  `neuron-step--${variant}`,
                  isClickableStep ? 'neuron-step--clickable' : '',
                  step.disabled ? 'neuron-step--disabled' : '',
                ].join(' ')}
                aria-current={status === 'active' ? 'step' : undefined}
              >
                <div className="neuron-step__inline-group">
                  <button
                    type="button"
                    className="neuron-step__indicator-btn"
                    onClick={() => handleStepClick(i, step)}
                    disabled={!isClickableStep}
                    aria-label={`Step ${i + 1}: ${step.label}${step.description ? ' — ' + step.description : ''} (${status})`}
                    tabIndex={isClickableStep ? 0 : -1}
                  >
                    <StepIndicator
                      index={i}
                      status={status}
                      variant={variant}
                      size={size}
                      icon={step.icon}
                      completedIcon={step.completedIcon}
                      completedIconMode={completedIconMode}
                    />
                  </button>
                  <div className="neuron-step__text neuron-step__text--inline">
                    <span className={`neuron-step__label neuron-step__label--${status}`}>
                      {step.label}
                    </span>
                    {step.description && (
                      <span className="neuron-step__description">{step.description}</span>
                    )}
                  </div>
                </div>

                {!isLast && (
                  <div
                    className={[
                      'neuron-step__line',
                      'neuron-step__line--inline-bridge',
                      `neuron-step__line--${connectorStyle}`,
                      isEndCompleted ? 'neuron-step__line--completed' : '',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          }

          // ── 3. Horizontal layout with label bottom (Continuous, Unbroken Line) ──
          return (
            <li
              key={step.id}
              className={[
                'neuron-step',
                'neuron-step--horizontal',
                'neuron-step--label-bottom',
                `neuron-step--${status}`,
                `neuron-step--${variant}`,
                isClickableStep ? 'neuron-step--clickable' : '',
                step.disabled ? 'neuron-step--disabled' : '',
              ].join(' ')}
              aria-current={status === 'active' ? 'step' : undefined}
            >
              <div className="neuron-step__head">
                <div
                  className={[
                    'neuron-step__line',
                    'neuron-step__line--start',
                    `neuron-step__line--${connectorStyle}`,
                    isFirst ? 'neuron-step__line--hidden' : '',
                    isStartCompleted ? 'neuron-step__line--completed' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  className="neuron-step__indicator-btn"
                  onClick={() => handleStepClick(i, step)}
                  disabled={!isClickableStep}
                  aria-label={`Step ${i + 1}: ${step.label}${step.description ? ' — ' + step.description : ''} (${status})`}
                  tabIndex={isClickableStep ? 0 : -1}
                >
                  <StepIndicator
                    index={i}
                    status={status}
                    variant={variant}
                    size={size}
                    icon={step.icon}
                    completedIcon={step.completedIcon}
                    completedIconMode={completedIconMode}
                  />
                </button>

                <div
                  className={[
                    'neuron-step__line',
                    'neuron-step__line--end',
                    `neuron-step__line--${connectorStyle}`,
                    isLast ? 'neuron-step__line--hidden' : '',
                    isEndCompleted ? 'neuron-step__line--completed' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </div>

              {variant !== 'minimal' && variant !== 'dot' && (
                <div className="neuron-step__text neuron-step__text--centered">
                  <span className={`neuron-step__label neuron-step__label--${status}`}>
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="neuron-step__description">{step.description}</span>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
