import React, { useState, useRef, useEffect, useCallback } from 'react';
import NeuronCheckbox from './NeuronCheckbox';
import NeuronDropdownMenu, {
  type DropdownMenuItem,
  type DropdownMenuGroup,
  type DropdownMenuHeader,
  type NeuronDropdownMenuProps,
} from './NeuronDropdownMenu';

export {
  NeuronDropdownMenu,
  type DropdownMenuItem,
  type DropdownMenuGroup,
  type DropdownMenuHeader,
  type NeuronDropdownMenuProps,
};

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface DropdownOption {
  value: string;
  label: string;
  avatar?: string;
  username?: string;
  icon?: React.ReactNode;
  dotColor?: string;
  description?: string;
  disabled?: boolean;
}

export type SelectOption = DropdownOption;

export type NeuronDropdownSize = 'sm' | 'md' | 'lg';
export type NeuronSelectSize = NeuronDropdownSize;

export type NeuronDropdownState = 'default' | 'success' | 'error';
export type NeuronSelectState = NeuronDropdownState;

export interface NeuronDropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  maxTagCount?: number;
  searchable?: boolean;
  withAvatar?: boolean;
  leadingIcon?: React.ReactNode;
  withDot?: boolean;
  dotColor?: string;
  leadingType?: 'none' | 'icon' | 'avatar' | 'dot';
  size?: NeuronDropdownSize;
  disabled?: boolean;
  state?: NeuronDropdownState;
  helperText?: string;
  required?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  forceOpen?: boolean;
  isFocused?: boolean;
}

export type NeuronSelectProps = NeuronDropdownProps;

// ─────────────────────────────────────────────
// User silhouette SVG (avatar placeholder)
// ─────────────────────────────────────────────
function UserSilhouetteSvg({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Avatar fallback (initials)
// ─────────────────────────────────────────────
function AvatarCircle({ name, src, size = 24 }: { name: string; src?: string; size?: number }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="neuron-dropdown__avatar neuron-select__avatar"
        style={{ width: size, height: size }}
      />
    );
  }

  // Deterministic background color based on name
  const hue = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <span
      className="neuron-dropdown__avatar neuron-select__avatar neuron-dropdown__avatar--fallback neuron-select__avatar--fallback"
      style={{
        width: size,
        height: size,
        backgroundColor: `hsl(${hue}, 55%, 72%)`,
        fontSize: size * 0.42,
      }}
    >
      {initials}
    </span>
  );
}

// ─────────────────────────────────────────────
// Checkmark SVG
// ─────────────────────────────────────────────
function CheckSvg() {
  return (
    <svg className="neuron-dropdown__check neuron-select__check" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Chevron SVG
// ─────────────────────────────────────────────
function ChevronSvg({ open }: { open: boolean }) {
  return (
    <svg
      className={`neuron-dropdown__chevron neuron-select__chevron ${open ? 'neuron-dropdown__chevron--open neuron-select__chevron--open' : ''}`}
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function NeuronDropdown({
  label,
  placeholder = 'Select...',
  options,
  value,
  onChange,
  multiple = false,
  maxTagCount,
  searchable = false,
  withAvatar = false,
  leadingIcon,
  withDot = false,
  dotColor,
  leadingType = 'none',
  size = 'md',
  disabled = false,
  state = 'default',
  helperText,
  required = false,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  forceOpen = false,
  isFocused = false,
}: NeuronDropdownProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const [isTriggerFocused, setIsTriggerFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [activeOptionValue, setActiveOptionValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Normalise value to array for consistency
  const selectedValues: string[] = Array.isArray(value)
    ? value
    : value !== undefined && value !== ''
      ? [value]
      : [];

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = forceOpen ? true : isControlled ? controlledIsOpen : internalIsOpen;

  // Filtered options
  const filteredOptions = searchQuery
    ? options.filter(
        o =>
          o.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (o.username && o.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (o.description && o.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : options;

  // ── Click outside ──
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (forceOpen) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setInternalIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [forceOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('.neuron-select__option, .neuron-dropdown__option');
      if (items[focusedIndex]) {
        items[focusedIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex]);

  // ── Toggle ──
  const toggleOpen = useCallback(() => {
    if (disabled || forceOpen) return;
    setInternalIsOpen(prev => {
      if (prev) {
        setSearchQuery('');
        setFocusedIndex(-1);
      }
      return !prev;
    });
  }, [disabled, forceOpen]);

  // ── Select handler ──
  const handleSelect = useCallback(
    (optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue];
        onChange?.(newValues);
        if (searchable) {
          setSearchQuery('');
          setTimeout(() => searchRef.current?.focus(), 0);
        }
      } else {
        onChange?.(optionValue);
        if (!forceOpen) {
          setInternalIsOpen(false);
          setSearchQuery('');
          setFocusedIndex(-1);
        }
      }
    },
    [multiple, selectedValues, onChange, forceOpen, searchable]
  );

  // ── Remove tag ──
  const handleRemoveTag = useCallback(
    (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        onChange?.(selectedValues.filter(v => v !== optionValue));
      }
    },
    [multiple, selectedValues, onChange]
  );

  // ── Keyboard ──
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Escape':
          if (!forceOpen) {
            setInternalIsOpen(false);
            setSearchQuery('');
            setFocusedIndex(-1);
          }
          break;
        case 'Enter':
        case ' ':
          if (!isOpen) {
            e.preventDefault();
            setInternalIsOpen(true);
          } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
            e.preventDefault();
            handleSelect(filteredOptions[focusedIndex].value);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setInternalIsOpen(true);
          } else {
            setFocusedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, 0));
          break;
      }
    },
    [disabled, isOpen, forceOpen, focusedIndex, filteredOptions, handleSelect]
  );

  // ── Determine leading elements ──
  const hasIconLeading = leadingType === 'icon' || Boolean(leadingIcon);
  const hasAvatarLeading = leadingType === 'avatar' || withAvatar;
  const hasDotLeading = leadingType === 'dot' || withDot;

  // ── Display value ──
  const getDisplayValue = (): React.ReactNode => {
    if (multiple) {
      const hasLimit = typeof maxTagCount === 'number' && maxTagCount > 0;
      const visibleValues = hasLimit ? selectedValues.slice(0, maxTagCount) : selectedValues;
      const hiddenCount = hasLimit ? Math.max(0, selectedValues.length - maxTagCount) : 0;

      if (selectedValues.length === 0 && !searchable) {
        if (hasIconLeading || hasAvatarLeading || hasDotLeading) {
          return (
            <span className="neuron-dropdown__placeholder-wrap neuron-select__placeholder-wrap">
              {hasIconLeading && (
                <span className="neuron-dropdown__leading neuron-dropdown__leading--icon neuron-select__leading">
                  {leadingIcon}
                </span>
              )}
              {hasAvatarLeading && (
                <span className="neuron-dropdown__avatar neuron-select__avatar neuron-dropdown__avatar--placeholder">
                  <UserSilhouetteSvg size={12} />
                </span>
              )}
              {hasDotLeading && (
                <span
                  className="neuron-dropdown__dot neuron-dropdown__dot--placeholder neuron-select__dot"
                  style={{ backgroundColor: dotColor || 'var(--color-border-hover)' }}
                />
              )}
              <span className="neuron-dropdown__placeholder neuron-select__placeholder">{placeholder}</span>
            </span>
          );
        }
        return <span className="neuron-dropdown__placeholder neuron-select__placeholder">{placeholder}</span>;
      }

      return (
        <span className="neuron-dropdown__tags neuron-select__tags">
          {visibleValues.map(v => {
            const opt = options.find(o => o.value === v);
            if (!opt) return null;
            return (
              <span key={v} className="neuron-dropdown__tag neuron-select__tag">
                {opt.icon ? (
                  <span className="neuron-dropdown__tag-icon neuron-select__tag-icon">{opt.icon}</span>
                ) : hasIconLeading && leadingIcon ? (
                  <span className="neuron-dropdown__tag-icon neuron-select__tag-icon">{leadingIcon}</span>
                ) : null}
                {(hasAvatarLeading || opt.avatar) && (
                  <AvatarCircle name={opt.label} src={opt.avatar} size={18} />
                )}
                {(hasDotLeading || opt.dotColor) && (
                  <span
                    className="neuron-dropdown__dot neuron-select__dot"
                    style={{ backgroundColor: opt.dotColor || dotColor || '#10B981' }}
                  />
                )}
                <span className="neuron-dropdown__tag-label neuron-select__tag-label">{opt.label}</span>
                <button
                  type="button"
                  className="neuron-dropdown__tag-remove neuron-select__tag-remove"
                  onClick={e => handleRemoveTag(v, e)}
                  tabIndex={-1}
                  aria-label={`Remove ${opt.label}`}
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </span>
            );
          })}
          {hiddenCount > 0 && (
            <span
              className="neuron-dropdown__tag neuron-dropdown__tag--more neuron-select__tag neuron-select__tag--more"
              title={selectedValues
                .slice(maxTagCount)
                .map(v => options.find(o => o.value === v)?.label)
                .filter(Boolean)
                .join(', ')}
            >
              +{hiddenCount} more
            </span>
          )}
          {searchable && (
            <input
              ref={searchRef}
              type="text"
              className="neuron-dropdown__search-inline neuron-select__search-inline neuron-dropdown__search-inline--tag"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setFocusedIndex(0);
                if (!isOpen) setInternalIsOpen(true);
              }}
              placeholder={selectedValues.length === 0 ? placeholder : ''}
              onClick={e => {
                e.stopPropagation();
                if (!isOpen) setInternalIsOpen(true);
              }}
              onKeyDown={e => {
                if (e.key === 'Backspace' && searchQuery === '' && selectedValues.length > 0) {
                  onChange?.(selectedValues.slice(0, -1));
                }
              }}
            />
          )}
        </span>
      );
    }

    if (selectedValues.length === 0) {
      if (hasIconLeading || hasAvatarLeading || hasDotLeading) {
        return (
          <span className="neuron-dropdown__placeholder-wrap neuron-select__placeholder-wrap">
            {hasIconLeading && (
              <span className="neuron-dropdown__leading neuron-dropdown__leading--icon neuron-select__leading">
                {leadingIcon}
              </span>
            )}
            {hasAvatarLeading && (
              <span className="neuron-dropdown__avatar neuron-select__avatar neuron-dropdown__avatar--placeholder">
                <UserSilhouetteSvg size={12} />
              </span>
            )}
            {hasDotLeading && (
              <span
                className="neuron-dropdown__dot neuron-dropdown__dot--placeholder neuron-select__dot"
                style={{ backgroundColor: dotColor || 'var(--color-border-hover)' }}
              />
            )}
            <span className="neuron-dropdown__placeholder neuron-select__placeholder">{placeholder}</span>
          </span>
        );
      }
      return <span className="neuron-dropdown__placeholder neuron-select__placeholder">{placeholder}</span>;
    }

    // Single
    const selected = options.find(o => o.value === selectedValues[0]);
    if (!selected) return <span className="neuron-dropdown__placeholder neuron-select__placeholder">{placeholder}</span>;

    const optIcon = selected.icon || (hasIconLeading ? leadingIcon : null);
    const showAvatar = hasAvatarLeading || Boolean(selected.avatar);
    const showDot = hasDotLeading || Boolean(selected.dotColor);

    return (
      <span className="neuron-dropdown__value neuron-select__value">
        {optIcon && (
          <span className="neuron-dropdown__leading neuron-dropdown__leading--icon neuron-select__leading">
            {optIcon}
          </span>
        )}
        {showAvatar && (
          <AvatarCircle name={selected.label} src={selected.avatar} size={20} />
        )}
        {showDot && (
          <span
            className="neuron-dropdown__dot neuron-select__dot"
            style={{ backgroundColor: selected.dotColor || dotColor || '#10B981' }}
          />
        )}
        <span className="neuron-dropdown__value-text neuron-select__value-text">{selected.label}</span>
      </span>
    );
  };

  // ── CSS classes ──
  const rootClass = [
    'neuron-dropdown',
    'neuron-select',
    `neuron-dropdown--${size}`,
    `neuron-select--${size}`,
    multiple && 'neuron-dropdown--multiple neuron-select--multiple',
    isOpen && 'neuron-dropdown--open neuron-select--open',
    (isOpen || isFocused || isTriggerFocused) && 'neuron-dropdown--focused neuron-select--focused',
    disabled && 'neuron-dropdown--disabled neuron-select--disabled',
    state === 'error' && 'neuron-dropdown--error neuron-select--error',
    state === 'success' && 'neuron-dropdown--success neuron-select--success',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="neuron-dropdown-group neuron-select-group" ref={containerRef}>
      {label && (
        <label className="neuron-label">
          {label}
          {required && <span className="neuron-label__required"> *</span>}
        </label>
      )}
      <div className={rootClass} onKeyDown={handleKeyDown}>
        {/* Trigger */}
        <button
          type="button"
          className="neuron-dropdown__trigger neuron-select__trigger"
          onClick={toggleOpen}
          onFocus={() => setIsTriggerFocused(true)}
          onBlur={() => setIsTriggerFocused(false)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          tabIndex={0}
        >
          {searchable && !multiple && isOpen ? (
            <input
              ref={searchRef}
              type="text"
              className="neuron-dropdown__search-inline neuron-select__search-inline"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setFocusedIndex(0);
              }}
              placeholder={selectedValues.length > 0 ? (options.find(o => o.value === selectedValues[0])?.label || placeholder) : placeholder}
              onClick={e => e.stopPropagation()}
            />
          ) : (
            getDisplayValue()
          )}
          <ChevronSvg open={isOpen} />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="neuron-dropdown__menu neuron-dropdown__dropdown neuron-select__dropdown" role="listbox" ref={listRef}>
            {searchable && filteredOptions.length === 0 && (
              <div className="neuron-dropdown__empty neuron-select__empty">No results found</div>
            )}
            {filteredOptions.map((opt, idx) => {
              const isSelected = selectedValues.includes(opt.value);
              const isFocusedItem = focusedIndex === idx;
              const optClass = [
                'neuron-dropdown__option',
                'neuron-select__option',
                isSelected && 'neuron-dropdown__option--selected neuron-select__option--selected',
                isFocusedItem && 'neuron-dropdown__option--focused neuron-select__option--focused',
              ]
                .filter(Boolean)
                .join(' ');

              const optIcon = opt.icon || (hasIconLeading ? leadingIcon : null);
              const showAvatar = hasAvatarLeading || Boolean(opt.avatar);
              const showDot = hasDotLeading || Boolean(opt.dotColor);

              return (
                <div
                  key={opt.value}
                  className={optClass}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={() => {
                    if (!opt.disabled) {
                      setActiveOptionValue(opt.value);
                    }
                  }}
                  onClick={() => {
                    setActiveOptionValue(opt.value);
                    setTimeout(() => setActiveOptionValue(null), 220);
                    handleSelect(opt.value);
                  }}
                  onMouseEnter={() => setFocusedIndex(idx)}
                >
                  {optIcon && (
                    <span className="neuron-dropdown__option-icon neuron-select__option-icon">
                      {optIcon}
                    </span>
                  )}
                  {showAvatar && (
                    <AvatarCircle name={opt.label} src={opt.avatar} size={24} />
                  )}
                  {showDot && (
                    <span
                      className="neuron-dropdown__dot neuron-select__dot"
                      style={{ backgroundColor: opt.dotColor || dotColor || '#10B981' }}
                    />
                  )}
                  <div className="neuron-dropdown__option-text neuron-select__option-text">
                    <div className="neuron-dropdown__option-header neuron-select__option-header">
                      <span className="neuron-dropdown__option-label neuron-select__option-label">{opt.label}</span>
                      {opt.username && (
                        <span className="neuron-dropdown__option-username neuron-select__option-username">@{opt.username}</span>
                      )}
                    </div>
                    {opt.description && (
                      <span className="neuron-dropdown__option-desc neuron-select__option-desc">{opt.description}</span>
                    )}
                  </div>
                  {multiple ? (
                    <span className="neuron-dropdown__option-checkbox" style={{ pointerEvents: 'none', marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                      <NeuronCheckbox
                        checked={isSelected}
                        size="sm"
                        variant="brand"
                        tabIndex={-1}
                        isFocused={activeOptionValue === opt.value}
                      />
                    </span>
                  ) : (
                    isSelected && <CheckSvg />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {helperText && (
        <span className={`neuron-helper-text ${state === 'error' ? 'neuron-helper-text--error' : ''} ${state === 'success' ? 'neuron-helper-text--success' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
}

export { NeuronDropdown as NeuronSelect };
