'use client';

/**
 * Neudela Design System - Enterprise React UI Component Library
 * 
 * Export all public components, interfaces, and design tokens
 */

import './styles/neudela.css';

// ── Button & Navigation ──
export { default as NeuronButton, GenericIcon } from './components/NeuronButton';
export type { NeuronButtonProps } from './components/NeuronButton';

export { default as NeuronButtonGroup } from './components/NeuronButtonGroup';
export type { NeuronButtonGroupProps, ButtonGroupOption } from './components/NeuronButtonGroup';

export { default as NeuronBreadcrumb } from './components/NeuronBreadcrumb';
export type { 
  NeuronBreadcrumbProps, 
  BreadcrumbItem, 
  BreadcrumbVariant, 
  BreadcrumbSize, 
  BreadcrumbSeparator 
} from './components/NeuronBreadcrumb';

// ── Badges & Avatars ──
export { default as NeuronBadge } from './components/NeuronBadge';
export type { 
  NeuronBadgeProps, 
  NeuronBadgeVariant, 
  NeuronBadgeSize, 
  NeuronBadgeFill 
} from './components/NeuronBadge';

export { default as NeuronBadgeGroup } from './components/NeuronBadgeGroup';
export type { NeuronBadgeGroupProps } from './components/NeuronBadgeGroup';

export { 
  default as NeuronAvatar, 
  NeuronAvatarGroup, 
  NeuronAvatarVerifiedBadge, 
  getInitials 
} from './components/NeuronAvatar';
export type { 
  NeuronAvatarProps, 
  NeuronAvatarGroupProps, 
  NeuronAvatarSize, 
  NeuronAvatarShape, 
  NeuronAvatarStatus, 
  NeuronAvatarVariant 
} from './components/NeuronAvatar';

// ── Cards & Containers ──
export { default as NeuronCard } from './components/NeuronCard';
export type { 
  NeuronCardProps, 
  NeuronCardVariant, 
  NeuronCardPadding, 
  NeuronCardRadius, 
  NeuronCardHoverEffect 
} from './components/NeuronCard';

// ── Inputs & Form Controls ──
export { default as NeuronInput } from './components/NeuronInput';
export type { NeuronInputProps, InputState } from './components/NeuronInput';

export { default as NeuronCheckbox } from './components/NeuronCheckbox';
export type { 
  NeuronCheckboxProps, 
  NeuronCheckboxSize, 
  NeuronCheckboxShape, 
  NeuronCheckboxVariant 
} from './components/NeuronCheckbox';

export { 
  default as NeuronRadio, 
  NeuronRadioGroup, 
  RadioGroupContext 
} from './components/NeuronRadio';
export type { 
  NeuronRadioProps, 
  NeuronRadioGroupProps, 
  NeuronRadioSize, 
  NeuronRadioVariant, 
  RadioGroupContextType 
} from './components/NeuronRadio';

export { default as NeuronToggle } from './components/NeuronToggle';
export type { 
  NeuronToggleProps, 
  NeuronToggleSize, 
  NeuronToggleVariant 
} from './components/NeuronToggle';

export { default as NeuronDropdown } from './components/NeuronDropdown';
export type { 
  NeuronDropdownProps, 
  DropdownOption, 
  SelectOption, 
  NeuronDropdownSize, 
  NeuronSelectSize, 
  NeuronDropdownState, 
  NeuronSelectState, 
  NeuronSelectProps 
} from './components/NeuronDropdown';

export { default as NeuronDropdownMenu } from './components/NeuronDropdownMenu';
export type { 
  NeuronDropdownMenuProps, 
  DropdownMenuItem, 
  DropdownMenuGroup, 
  DropdownMenuHeader 
} from './components/NeuronDropdownMenu';

export { default as NeuronSelect } from './components/NeuronSelect';

export { 
  default as NeuronDatePicker, 
  formatDate, 
  isSameDay, 
  isDateInRange, 
  getDaysInMonth, 
  generateCalendarGrid, 
  getDefaultPresets, 
  DEFAULT_PRESETS 
} from './components/NeuronDatePicker';
export type { 
  NeuronDatePickerProps, 
  DatePickerMode, 
  DatePickerSize, 
  DatePickerVariant, 
  DateRange, 
  DatePresetId, 
  DatePreset 
} from './components/NeuronDatePicker';

// ── Data Display ──
export { default as NeuronTable } from './components/NeuronTable';
export type { 
  NeuronTableProps, 
  NeuronTableColumn, 
  NeuronTablePaginationConfig 
} from './components/NeuronTable';

export { default as NeuronProgress } from './components/NeuronProgress';
export type { 
  NeuronProgressProps, 
  NeuronProgressType, 
  NeuronProgressSize, 
  NeuronProgressVariant, 
  NeuronProgressValuePosition 
} from './components/NeuronProgress';

export { default as NeuronTooltip } from './components/NeuronTooltip';
export type { 
  NeuronTooltipProps, 
  NeuronTooltipPlacement, 
  NeuronTooltipVariant, 
  NeuronTooltipSize, 
  NeuronTooltipTrigger 
} from './components/NeuronTooltip';

// ── Feedback & Overlays ──
export { default as NeuronAlert } from './components/NeuronAlert';
export type { 
  NeuronAlertProps, 
  AlertVariant, 
  AlertSize, 
  AlertFill, 
  AlertAction 
} from './components/NeuronAlert';

export { default as NeuronModal } from './components/NeuronModal';
export type { 
  NeuronModalProps, 
  ModalSize, 
  ModalVariant 
} from './components/NeuronModal';
