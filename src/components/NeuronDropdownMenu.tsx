import React, { useState, useRef, useEffect, useCallback } from 'react';
import NeuronCheckbox from './NeuronCheckbox';
import {
  User,
  Settings,
  Command,
  Users,
  Layers,
  HelpCircle,
  Code,
  LogOut,
} from 'lucide-react';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  badge?: string | number;
  destructive?: boolean;
  disabled?: boolean;
  checked?: boolean;
  type?: 'item' | 'checkbox' | 'radio' | 'divider';
  description?: string;
  onClick?: () => void;
  trailingIcon?: React.ReactNode;
}

export interface DropdownMenuGroup {
  title?: string;
  items: DropdownMenuItem[];
}

export interface DropdownMenuHeader {
  name: string;
  email?: string;
  avatar?: string;
  badge?: string;
  onClick?: () => void;
}

export const DEFAULT_DROPDOWN_MENU_HEADER: DropdownMenuHeader = {
  name: 'Iqbal Dzulfikar',
  email: 'iqbal.dzulfikar@neudela.design',
  avatar: '/avatars/iqbal.jpg',
};

export const DEFAULT_DROPDOWN_MENU_GROUPS: DropdownMenuGroup[] = [
  {
    items: [
      { id: 'profile', label: 'View profile', icon: <User size={16} />, shortcut: '⌘P' },
      { id: 'settings', label: 'Settings', icon: <Settings size={16} />, shortcut: '⌘S' },
      { id: 'shortcuts', label: 'Keyboard shortcuts', icon: <Command size={16} />, shortcut: '⌘K' },
    ],
  },
  {
    items: [
      { id: 'team', label: 'Team', icon: <Users size={16} />, shortcut: '⇧⌘P' },
      { id: 'invite', label: 'Invite colleagues', icon: <User size={16} /> },
    ],
  },
  {
    items: [
      { id: 'changelog', label: 'Changelog', icon: <Layers size={16} /> },
      { id: 'slack', label: 'Slack Community', icon: <HelpCircle size={16} /> },
      { id: 'support', label: 'Support', icon: <HelpCircle size={16} /> },
      { id: 'api', label: 'API', icon: <Code size={16} /> },
    ],
  },
  {
    items: [
      { id: 'logout', label: 'Log out', icon: <LogOut size={16} />, shortcut: '⌥⇧Q', destructive: true },
    ],
  },
];

export interface NeuronDropdownMenuProps {
  trigger?: React.ReactNode;

  // ── Figma Component Variants (Parity with Untitled UI / Figma) ──
  icon?: boolean;      // Figma variant: Icon (True / False). Default: true if items have icon
  checkbox?: boolean;  // Figma variant: Checkbox (True / False). Default: false
  shortcut?: boolean;  // Figma variant: Shortcut (True / False). Default: true if items have shortcut
  header?: boolean | DropdownMenuHeader; // Figma variant: Header (True / False). If boolean true, uses default header.
  showHeader?: boolean; // Explicit toggle for header

  groups?: DropdownMenuGroup[];
  items?: DropdownMenuItem[]; // Simple flat items option
  align?: 'start' | 'end';
  width?: number | string;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  forceOpen?: boolean;
  embedded?: boolean;
}

export default function NeuronDropdownMenu({
  trigger,
  icon = true,
  checkbox = false,
  shortcut = true,
  header,
  showHeader,
  groups,
  items,
  align = 'start',
  width = 240,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  className = '',
  forceOpen = false,
  embedded = false,
}: NeuronDropdownMenuProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const [internalChecked, setInternalChecked] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Determine whether to display the profile header
  const shouldShowHeader = showHeader !== undefined
    ? showHeader
    : typeof header === 'boolean'
      ? header
      : Boolean(header);

  const activeHeader: DropdownMenuHeader | undefined = shouldShowHeader
    ? (typeof header === 'object' && header !== null ? header : DEFAULT_DROPDOWN_MENU_HEADER)
    : undefined;

  const shouldShowIcons = icon !== false;
  const isCheckboxMode = checkbox === true;
  const shouldShowShortcuts = shortcut !== false;

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = embedded || forceOpen ? true : isControlled ? controlledIsOpen : internalIsOpen;

  const [activeCheckboxItemId, setActiveCheckboxItemId] = useState<string | null>(null);

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setInternalIsOpen(open);
      }
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange]
  );

  const toggleOpen = () => {
    if (forceOpen) return;
    setIsOpen(!isOpen);
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (forceOpen) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [forceOpen, setIsOpen]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen && !forceOpen) {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // Normalize data into groups: fallback to Figma standard default items if none supplied
  const normalizedGroups: DropdownMenuGroup[] = groups && groups.length > 0
    ? groups
    : items && items.length > 0
      ? [{ items }]
      : DEFAULT_DROPDOWN_MENU_GROUPS;

  const isItemChecked = (item: DropdownMenuItem) => {
    if (internalChecked[item.id] !== undefined) {
      return internalChecked[item.id];
    }
    return Boolean(item.checked);
  };

  const toggleItemChecked = (item: DropdownMenuItem) => {
    setInternalChecked(prev => ({
      ...prev,
      [item.id]: !isItemChecked(item),
    }));
  };

  return (
    <div
      ref={containerRef}
      className={`neuron-dropdown-menu-wrapper ${isOpen ? 'is-open' : ''} ${
        embedded ? 'neuron-dropdown-menu-wrapper--embedded' : ''
      } ${className}`.trim()}
      onKeyDown={handleKeyDown}
      style={{ position: 'relative', display: embedded ? 'block' : 'inline-block' }}
    >
      {/* Trigger Slot */}
      {trigger && (
        <div
          className="neuron-dropdown-menu__trigger-slot"
          onClick={toggleOpen}
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          {trigger}
        </div>
      )}

      {/* Menu Floating Panel */}
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className={`neuron-dropdown-menu__panel neuron-dropdown-menu__panel--align-${align} ${
            embedded ? 'neuron-dropdown-menu__panel--embedded' : ''
          }`}
          style={{ width }}
        >
          {/* Optional Profile Header */}
          {activeHeader && (
            <div
              className="neuron-dropdown-menu__header"
              onClick={() => {
                activeHeader.onClick?.();
                if (!forceOpen) setIsOpen(false);
              }}
            >
              {activeHeader.avatar ? (
                <img
                  src={activeHeader.avatar}
                  alt={activeHeader.name}
                  className="neuron-dropdown-menu__header-avatar"
                />
              ) : (
                <span className="neuron-dropdown-menu__header-avatar neuron-dropdown-menu__header-avatar--fallback">
                  {activeHeader.name.slice(0, 2).toUpperCase()}
                </span>
              )}
              <div className="neuron-dropdown-menu__header-info">
                <div className="neuron-dropdown-menu__header-name-row">
                  <span className="neuron-dropdown-menu__header-name">{activeHeader.name}</span>
                  {activeHeader.badge && (
                    <span className="neuron-dropdown-menu__header-badge">{activeHeader.badge}</span>
                  )}
                </div>
                {activeHeader.email && (
                  <span className="neuron-dropdown-menu__header-email">{activeHeader.email}</span>
                )}
              </div>
            </div>
          )}

          {/* Item Groups */}
          <div className="neuron-dropdown-menu__body">
            {normalizedGroups.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {groupIdx > 0 && <div className="neuron-dropdown-menu__divider" />}
                {group.title && (
                  <div className="neuron-dropdown-menu__group-title">{group.title}</div>
                )}
                <div className="neuron-dropdown-menu__group">
                  {group.items.map(item => {
                    if (item.type === 'divider') {
                      return <div key={item.id} className="neuron-dropdown-menu__divider" />;
                    }

                    const showItemCheckbox = isCheckboxMode || item.type === 'checkbox';
                    const isRadio = !isCheckboxMode && item.type === 'radio';
                    const checked = isItemChecked(item);

                    return (
                      <div
                        key={item.id}
                        role="menuitem"
                        tabIndex={item.disabled ? -1 : 0}
                        aria-disabled={item.disabled}
                        className={`neuron-dropdown-menu__item ${
                          item.destructive ? 'neuron-dropdown-menu__item--destructive' : ''
                        } ${item.disabled ? 'is-disabled' : ''}`}
                        onMouseDown={() => {
                          if (!item.disabled && showItemCheckbox) {
                            setActiveCheckboxItemId(item.id);
                          }
                        }}
                        onMouseLeave={() => {
                          setActiveCheckboxItemId(null);
                        }}
                        onClick={(e) => {
                          if (item.disabled) return;
                          if (showItemCheckbox) {
                            setActiveCheckboxItemId(item.id);
                            setTimeout(() => setActiveCheckboxItemId(null), 220);
                            toggleItemChecked(item);
                          }
                          item.onClick?.();
                          if (!forceOpen && !showItemCheckbox) {
                            setIsOpen(false);
                          }
                          // Release focus so :focus CSS does not persist after mouse click
                          (e.currentTarget as HTMLElement).blur();
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            if (item.disabled) return;
                            if (showItemCheckbox) {
                              setActiveCheckboxItemId(item.id);
                              setTimeout(() => setActiveCheckboxItemId(null), 220);
                              toggleItemChecked(item);
                            }
                            item.onClick?.();
                            if (!forceOpen && !showItemCheckbox) {
                              setIsOpen(false);
                            }
                          }
                        }}
                      >
                        {/* Leading Element (Checkbox, Radio, Icon) */}
                        {showItemCheckbox && (
                          <span
                            className="neuron-dropdown-menu__checkbox-wrapper"
                            style={{ display: 'inline-flex', alignItems: 'center', pointerEvents: 'none', flexShrink: 0 }}
                          >
                            <NeuronCheckbox
                              checked={checked}
                              size="sm"
                              variant="brand"
                              tabIndex={-1}
                              disabled={item.disabled}
                              isFocused={activeCheckboxItemId === item.id}
                            />
                          </span>
                        )}

                        {isRadio && (
                          <span
                            className={`neuron-dropdown-menu__radio ${
                              checked ? 'is-checked' : ''
                            }`}
                          >
                            {checked && <span className="neuron-dropdown-menu__radio-dot" />}
                          </span>
                        )}

                        {!showItemCheckbox && !isRadio && shouldShowIcons && item.icon && (
                          <span className="neuron-dropdown-menu__item-icon">{item.icon}</span>
                        )}

                        {/* Label & Description */}
                        <div className="neuron-dropdown-menu__item-content">
                          <span className="neuron-dropdown-menu__item-label">{item.label}</span>
                          {item.description && (
                            <span className="neuron-dropdown-menu__item-desc">
                              {item.description}
                            </span>
                          )}
                        </div>

                        {/* Trailing Elements (Shortcut, Badge, Icon) */}
                        {item.badge && (
                          <span className="neuron-dropdown-menu__item-badge">{item.badge}</span>
                        )}

                        {shouldShowShortcuts && item.shortcut && (
                          <kbd className="neuron-dropdown-menu__shortcut">{item.shortcut}</kbd>
                        )}

                        {item.trailingIcon && (
                          <span className="neuron-dropdown-menu__item-trailing">
                            {item.trailingIcon}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
